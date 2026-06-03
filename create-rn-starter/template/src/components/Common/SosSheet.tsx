import React, { useCallback } from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import BottomSheet from "../BottomSheet/BottomSheet";
import RNButton from "../Button/RNButton";
import RNText from "../Text/RNText";
import {
  CloseIcon,
  PhoneIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "../Icon/SvgIcons";
import { THEME } from "../../theme";
import { useLanguage } from "../../localization";
import { showToast } from "../../utils/functions";

export interface EmergencyService {
  id: string;
  /** Localized display name. */
  name: string;
  /** Dialable number. */
  number: string;
  /** Accent color for the leading icon. */
  color: string;
  /** Soft background tint for the leading icon. */
  tint: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  number: string;
}

interface SosSheetProps {
  visible: boolean;
  onClose: () => void;
  /** Emergency services list — falls back to local defaults when omitted. */
  services?: EmergencyService[];
  trustedContacts?: TrustedContact[];
  /** Number dialed by the big primary CTA. Defaults to the universal 112. */
  primaryNumber?: string;
  onAddTrustedContact?: () => void;
}

const sanitize = (number: string) => number.replace(/[^\d+]/g, "");

/**
 * Premium emergency action sheet: emergency services with one-tap call,
 * a trusted-contacts section and a prominent "call emergency" CTA.
 * Reusable across screens — pass `services` / `trustedContacts` to customize.
 */
const SosSheet: React.FC<SosSheetProps> = ({
  visible,
  onClose,
  services,
  trustedContacts = [],
  primaryNumber = "112",
  onAddTrustedContact,
}) => {
  const { t } = useLanguage();

  const defaultServices: EmergencyService[] = [
    {
      id: "police",
      name: t("sos.police"),
      number: "117",
      color: THEME.danger,
      tint: THEME.dangerLight,
    },
    {
      id: "ambulance",
      name: t("sos.ambulance"),
      number: "119",
      color: THEME.info,
      tint: "#E8F1FF",
    },
    {
      id: "fire",
      name: t("sos.fire"),
      number: "118",
      color: THEME.warning,
      tint: THEME.warningLight,
    },
  ];

  const list = services ?? defaultServices;

  const call = useCallback(
    (number: string) => {
      const url = `tel:${sanitize(number)}`;
      Linking.openURL(url).catch(() => showToast(t("sos.callFailed"), "danger"));
    },
    [t],
  );

  return (
    <BottomSheet visible={visible} onClose={onClose} contentStyle={styles.sheet}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerBadge}>
          <ShieldCheckIcon size={moderateScale(22)} color={THEME.textOnPrimary} />
        </View>
        <View style={styles.headerText}>
          <RNText font="bold" size={18} color={THEME.text}>
            {t("sos.title")}
          </RNText>
          <RNText size={12} color={THEME.textMuted} style={styles.headerSubtitle}>
            {t("sos.subtitle")}
          </RNText>
        </View>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={10}
          style={styles.closeBtn}
          activeOpacity={0.7}
        >
          <CloseIcon size={moderateScale(18)} color={THEME.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Warning */}
      <View style={styles.warning}>
        <RNText size={12} color={THEME.danger} style={styles.warningText}>
          {t("sos.warning")}
        </RNText>
      </View>

      {/* Emergency services */}
      <RNText font="semibold" size={13} color={THEME.text} style={styles.sectionLabel}>
        {t("sos.emergencyServices")}
      </RNText>
      {list.map((s) => (
        <View key={s.id} style={styles.row}>
          <View style={[styles.rowIcon, { backgroundColor: s.tint }]}>
            <PhoneIcon size={moderateScale(18)} color={s.color} />
          </View>
          <View style={styles.rowInfo}>
            <RNText font="semibold" size={14} color={THEME.text}>
              {s.name}
            </RNText>
            <RNText size={12} color={THEME.textMuted} style={styles.rowSub}>
              {s.number}
            </RNText>
          </View>
          <TouchableOpacity
            onPress={() => call(s.number)}
            activeOpacity={0.85}
            style={styles.callPill}
          >
            <PhoneIcon size={moderateScale(14)} color={THEME.textOnPrimary} />
            <RNText
              font="semibold"
              size={12}
              color={THEME.textOnPrimary}
              style={styles.callPillText}
            >
              {t("sos.call")}
            </RNText>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.divider} />

      {/* Trusted contacts */}
      <RNText font="semibold" size={13} color={THEME.text} style={styles.sectionLabel}>
        {t("sos.trustedContacts")}
      </RNText>
      {trustedContacts.length > 0 ? (
        trustedContacts.map((c) => (
          <View key={c.id} style={styles.row}>
            <View style={styles.trustedIcon}>
              <UserCircleIcon size={moderateScale(22)} color={THEME.primary} />
            </View>
            <View style={styles.rowInfo}>
              <RNText font="semibold" size={14} color={THEME.text}>
                {c.name}
              </RNText>
              <RNText size={12} color={THEME.textMuted} style={styles.rowSub}>
                {c.number}
              </RNText>
            </View>
            <TouchableOpacity
              onPress={() => call(c.number)}
              activeOpacity={0.85}
              style={styles.callPill}
            >
              <PhoneIcon size={moderateScale(14)} color={THEME.textOnPrimary} />
              <RNText
                font="semibold"
                size={12}
                color={THEME.textOnPrimary}
                style={styles.callPillText}
              >
                {t("sos.call")}
              </RNText>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <RNText size={12} color={THEME.textMuted} style={styles.emptyTrusted}>
          {t("sos.noTrustedContacts")}
        </RNText>
      )}

      {/* <TouchableOpacity
        onPress={onAddTrustedContact}
        activeOpacity={0.8}
        style={styles.addRow}
      >
        <View style={styles.addPlus}>
          <PlusIcon size={moderateScale(15)} color={THEME.primary} />
        </View>
        <RNText font="semibold" size={13} color={THEME.primary}>
          {t("sos.addTrustedContact")}
        </RNText>
      </TouchableOpacity> */}

      {/* Primary CTA */}
      <RNButton
        title={t("sos.callEmergency", { number: primaryNumber })}
        onPress={() => call(primaryNumber)}
        containerStyle={styles.emergencyBtn}
        leftIcon={
          <PhoneIcon size={moderateScale(18)} color={THEME.textOnPrimary} />
        }
      />
    </BottomSheet>
  );
};

export default React.memo(SosSheet);

const styles = StyleSheet.create({
  sheet: {
    paddingBottom: moderateScale(20),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBadge: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: THEME.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    marginLeft: moderateScale(12),
  },
  headerSubtitle: {
    marginTop: moderateScale(2),
  },
  closeBtn: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: THEME.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  warning: {
    backgroundColor: THEME.dangerLight,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginTop: moderateScale(16),
  },
  warningText: {
    lineHeight: moderateScale(17),
  },
  sectionLabel: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(8),
  },
  rowIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  trustedIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: THEME.primaryFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  rowInfo: {
    flex: 1,
    marginLeft: moderateScale(12),
  },
  rowSub: {
    marginTop: moderateScale(2),
  },
  callPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.success,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(999),
  },
  callPillText: {
    marginLeft: moderateScale(6),
  },
  divider: {
    height: 1,
    backgroundColor: THEME.divider,
    marginTop: moderateScale(14),
  },
  emptyTrusted: {
    lineHeight: moderateScale(17),
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(12),
  },
  addPlus: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: THEME.primaryFaint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(8),
  },
  emergencyBtn: {
    backgroundColor: THEME.danger,
    marginTop: moderateScale(22),
  },
});
