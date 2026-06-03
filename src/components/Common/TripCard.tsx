import React from "react";
import type { TFunction } from "i18next";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Avatar from "./Avatar";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import RNText from "../Text/RNText";
import { CheckCircleIcon } from "../Icon/SvgIcons";
import { THEME } from "../../theme";
import { useLanguage } from "../../localization";
import { Trip, TripStatus } from "../../redux/slice/trip";

interface TripCardProps {
  trip: Trip;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_TONE: Record<
  TripStatus,
  "success" | "warning" | "danger" | "info" | "primary"
> = {
  available: "info",
  fully_booked: "warning",
  confirmed: "success",
  in_progress: "primary",
  completed: "success",
  cancelled: "danger",
};

/** Localized status label, falling back to the English literal where no key exists. */
const statusLabel = (t: TFunction, status: TripStatus): string => {
  switch (status) {
    case "confirmed":
      return t("tripStatus.confirmed");
    case "completed":
      return t("tripStatus.completed");
    case "cancelled":
      return t("tripStatus.cancelled");
    case "available":
      return t("tripStatus.available");
    case "fully_booked":
      return t("tripStatus.fullyBooked");
    case "in_progress":
      return t("tripStatus.inProgress");
    default:
      return status;
  }
};

const TripCard: React.FC<TripCardProps> = ({ trip, onPress, style }) => {
  const { t } = useLanguage();
  return (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={!onPress}>
    <Card shadow padding={moderateScale(16)} style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <Avatar
          uri={trip.driverAvatarUri || undefined}
          name={trip.driverName}
          size={moderateScale(44)}
        />
        <View style={styles.headerInfo}>
          <RNText font="semibold" size={15} color={THEME.text}>
            {trip.driverName}
          </RNText>
          <View style={styles.metaRow}>
            <RNText size={12} color={THEME.textMuted}>
              {t("common.tripsCount", { count: trip.driverTrips })}
            </RNText>
            <RNText size={12} color={THEME.textMuted} style={styles.metaDot}>
              ·
            </RNText>
            <RNText size={12} color={THEME.star}>
              ★
            </RNText>
            <RNText
              size={12}
              color={THEME.textMuted}
              style={styles.ratingValue}
            >
              {trip.driverRating}
            </RNText>
          </View>
        </View>
        {trip.status === "confirmed" || trip.status === "completed" ? (
          <View style={styles.confirmedRow}>
            <CheckCircleIcon size={moderateScale(15)} color={THEME.success} />
            <RNText
              font="medium"
              size={12}
              color={THEME.success}
              style={styles.confirmedLabel}
            >
              {statusLabel(t, trip.status)}
            </RNText>
          </View>
        ) : (
          <StatusBadge
            label={statusLabel(t, trip.status)}
            tone={STATUS_TONE[trip.status]}
          />
        )}
      </View>

      <View style={styles.timelineWrap}>
        <View style={styles.timelineRow}>
          <RNText
            size={13}
            font="medium"
            color={THEME.text}
            style={styles.timelineTime}
          >
            {trip.from.time || "08:00"}
          </RNText>
          <View style={styles.timelineDotFilled} />
          <RNText
            size={13}
            color={THEME.text}
            style={styles.timelinePlace}
          >
            {trip.from.city}
            {trip.from.area ? `, ${trip.from.area}` : ""}
          </RNText>
        </View>
        <View style={styles.timelineConnector}>
          <View style={styles.timeColSpacer} />
          <View style={styles.timelineDashCol}>
            {Array.from({ length: 4 }).map((_, i) => (
              <View key={i} style={styles.timelineDashSegment} />
            ))}
          </View>
        </View>
        <View style={styles.timelineRow}>
          <RNText
            size={13}
            font="medium"
            color={THEME.text}
            style={styles.timelineTime}
          >
            {trip.to.time || "11:15"}
          </RNText>
          <View style={styles.timelineDotFilled} />
          <RNText
            size={13}
            color={THEME.text}
            style={styles.timelinePlace}
          >
            {trip.to.city}
            {trip.to.area ? `, ${trip.to.area}` : ""}
          </RNText>
        </View>
      </View>

      <View style={styles.footer}>
        <RNText font="semibold" size={15} color={THEME.text}>
          {trip.date}, {trip.weekday}
        </RNText>
        <RNText font="semibold" size={15} color={THEME.text}>
          {t('common.seatCount', { count: 1 })}
        </RNText>
      </View>
    </Card>
  </TouchableOpacity>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(20),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
    marginLeft: moderateScale(12),
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(2),
  },
  metaDot: {
    marginHorizontal: moderateScale(4),
  },
  ratingValue: {
    marginLeft: moderateScale(3),
  },
  confirmedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmedLabel: {
    marginLeft: moderateScale(4),
  },
  timelineWrap: {
    marginTop: moderateScale(14),
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timelineTime: {
    width: moderateScale(44),
  },
  timelinePlace: {
    flex: 1,
    marginLeft: moderateScale(12),
  },
  timelineDotFilled: {
    width: moderateScale(9),
    height: moderateScale(9),
    borderRadius: moderateScale(5),
    backgroundColor: THEME.primary,
  },
  timelineConnector: {
    flexDirection: "row",
  },
  timeColSpacer: {
    width: moderateScale(44),
  },
  timelineDashCol: {
    width: moderateScale(9),
    alignItems: "center",
    paddingVertical: moderateScale(2),
  },
  timelineDashSegment: {
    width: moderateScale(1.5),
    height: moderateScale(3),
    marginVertical: moderateScale(1.5),
    backgroundColor: THEME.primary,
    opacity: 0.6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(14),
    paddingTop: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: THEME.divider,
  },
});
