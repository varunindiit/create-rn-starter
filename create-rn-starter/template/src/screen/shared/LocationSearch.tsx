import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import GetLocation from "react-native-get-location";
import {
  EmptyState,
  Header,
  MainContainer,
  RNInput,
  RNText,
} from "../../components";
import {
  CircleXIcon,
  LocateIcon,
  PinIcon,
  SearchIcon,
} from "../../components/Icon/SvgIcons";
import { SPACING, THEME } from "../../theme";
import {
  autocompletePlaces,
  getPlaceDetails,
  newSessionToken,
  reverseGeocode,
  PlaceSuggestion,
} from "../../services/places";
import { showToast } from "../../utils/functions";
import { updateDraft } from "../../redux/slice/ride";
import { DriverStackParamList } from "../../navigation/paramLists";
import RouteKey from "../../navigation/RouteKey";
import { useLanguage } from "../../localization";

const DEBOUNCE_MS = 300;

const LocationSearch: React.FC = () => {
  const nav = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { params } =
    useRoute<RouteProp<DriverStackParamList, RouteKey.LocationSearch>>();
  const field = params?.field ?? "pickup";

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [resolving, setResolving] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  // Device coordinates used only to bias nearby cities to the top of results.
  const biasRef = useRef<{ latitude: number; longitude: number } | null>(null);

  // Open a fresh autocomplete billing session whenever the screen mounts.
  useEffect(() => {
    newSessionToken();
  }, []);

  // Best-effort, silent location fetch to prioritise nearby cities. Any
  // failure / denied permission simply falls back to a global-only search.
  useEffect(() => {
    let active = true;
    GetLocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 8000 })
      .then((pos) => {
        if (active) {
          biasRef.current = {
            latitude: pos.latitude,
            longitude: pos.longitude,
          };
        }
      })
      .catch(() => {
        /* no bias — global search only */
      });
    return () => {
      active = false;
    };
  }, []);

  // Debounced live search.
  useEffect(() => {
    const text = query.trim();
    abortRef.current?.abort();

    if (text.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const controller = new AbortController();
    abortRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const list = await autocompletePlaces(
          text,
          controller.signal,
          biasRef.current ?? undefined,
        );
        setResults(list);
      } catch (err: any) {
        if (err?.name !== "CanceledError" && err?.code !== "ERR_CANCELED") {
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const commit = useCallback(
    (loc: { latitude: number; longitude: number; address: string }) => {
      // Callers managing their own state (e.g. the Home From/To fields) receive
      // the location directly; otherwise fall back to the ride-draft flow.
      if (params?.onSelect) {
        params.onSelect(loc);
      } else if (field === "pickup") {
        dispatch(updateDraft({ from: loc.address, fromLocation: loc }));
      } else {
        dispatch(updateDraft({ to: loc.address, toLocation: loc }));
      }
      nav.goBack();
    },
    [dispatch, field, nav, params],
  );

  const onSelect = useCallback(
    async (item: PlaceSuggestion) => {
      try {
        setResolving(true);
        const detail = await getPlaceDetails(item.placeId);
        commit(detail);
      } catch {
        showToast(t("location.loadError"), "danger");
        setResolving(false);
      }
    },
    [commit, t],
  );

  const onUseCurrentLocation = useCallback(async () => {
    try {
      setResolving(true);
      const position = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      const detail = await reverseGeocode(
        position.latitude,
        position.longitude,
      );
      commit(detail);
    } catch {
      showToast(t("location.currentLocationError"), "danger");
      setResolving(false);
    }
  }, [commit, t]);

  const renderItem = useCallback(
    ({ item, index }: { item: PlaceSuggestion; index: number }) => (
      <Animated.View entering={FadeInDown.delay(index * 30).duration(240)}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => onSelect(item)}
        >
          <View style={styles.rowIcon}>
            <PinIcon size={moderateScale(18)} color={THEME.primary} />
          </View>
          <View style={styles.rowText}>
            <RNText font="semibold" size={14} color={THEME.text} numberOfLines={1}>
              {item.primaryText}
            </RNText>
            {item.secondaryText ? (
              <RNText
                size={12}
                color={THEME.textMuted}
                numberOfLines={1}
                style={styles.rowSub}
              >
                {item.secondaryText}
              </RNText>
            ) : null}
          </View>
        </TouchableOpacity>
      </Animated.View>
    ),
    [onSelect],
  );

  const headerTitle =
    params?.title ??
    (field === "pickup" ? t("location.pickupTitle") : t("location.dropTitle"));

  return (
    <MainContainer gradient statusBarStyle="dark-content">
      <Header title={headerTitle} safeArea={false} />

      <View style={styles.searchWrap}>
        <RNInput
          value={query}
          onChangeText={setQuery}
          placeholder={t("location.searchPlaceholder")}
          autoFocus
          returnKeyType="search"
          leftIcon={
            <SearchIcon size={moderateScale(18)} color={THEME.textMuted} />
          }
          rightIcon={
            query ? (
              <CircleXIcon size={moderateScale(16)} color={THEME.primary} />
            ) : null
          }
          onPressRightIcon={() => setQuery("")}
        />
      </View>

      <TouchableOpacity
        style={styles.currentRow}
        activeOpacity={0.7}
        onPress={onUseCurrentLocation}
      >
        <View style={styles.currentIcon}>
          <LocateIcon size={moderateScale(18)} color={THEME.primary} />
        </View>
        <RNText font="medium" size={14} color={THEME.primary} style={styles.currentText}>
          {t("location.currentLocation")}
        </RNText>
      </TouchableOpacity>

      <View style={styles.listWrap}>
        {searching ? (
          <View style={styles.center}>
            <ActivityIndicator size="small" color={THEME.primary} />
            <RNText size={12} color={THEME.textMuted} style={styles.searchingText}>
              {t("location.searching")}
            </RNText>
          </View>
        ) : results.length ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.placeId}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : query.trim().length >= 2 ? (
          <EmptyState
            icon={<SearchIcon size={moderateScale(34)} color={THEME.textMuted} />}
            title={t("location.noResults")}
            description={t("location.noResultsSubtitle")}
          />
        ) : (
          <EmptyState
            icon={<PinIcon size={moderateScale(34)} color={THEME.primary} />}
            title={t("location.whereToTitle")}
            description={t("location.searchHint")}
          />
        )}
      </View>

      {resolving ? (
        <Animated.View
          entering={FadeIn.duration(150)}
          style={styles.resolveOverlay}
        >
          <View style={styles.resolveCard}>
            <ActivityIndicator size="large" color={THEME.primary} />
            <RNText size={13} color={THEME.text} style={styles.resolveText}>
              {t("common.loading")}
            </RNText>
          </View>
        </Animated.View>
      ) : null}
    </MainContainer>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
  },
  currentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  currentIcon: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: THEME.primaryFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  currentText: { marginLeft: SPACING.md },
  listWrap: { flex: 1 },
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.huge,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: THEME.divider,
  },
  rowIcon: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(10),
    backgroundColor: THEME.primaryFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: { flex: 1, marginLeft: SPACING.md },
  rowSub: { marginTop: moderateScale(2) },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchingText: { marginTop: SPACING.sm },
  resolveOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: THEME.overlay,
    alignItems: "center",
    justifyContent: "center",
  },
  resolveCard: {
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.xl,
    borderRadius: SPACING.radiusLg,
    backgroundColor: THEME.surface,
    alignItems: "center",
  },
  resolveText: { marginTop: SPACING.md },
});
