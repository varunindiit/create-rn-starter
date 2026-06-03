import React from "react";
import type { TFunction } from "i18next";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import RNText from "../Text/RNText";
import { CheckCircleIcon } from "../Icon/SvgIcons";
import { THEME } from "../../theme";
import { useLanguage } from "../../localization";
import { Trip, TripStatus } from "../../redux/slice/trip";

interface DriverTripCardProps {
  trip: Trip;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Filled circle with a white ✕ — used for the Cancelled badge. */
const FilledXCircle: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} fill={color} />
    <Path
      d="M8.5 8.5l7 7M15.5 8.5l-7 7"
      stroke="#FFFFFF"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type Variant = {
  /** Color of the timeline dots. */
  dotColor: string;
  /** Whether the route/header text is dimmed. */
  muted: boolean;
  /** Inline status icon + label (renders instead of the pill badge). */
  badge?: { icon: React.ReactNode; label: string; color: string };
  /** Footer (divider + label); omitted means no footer. */
  footer?: { label: string; color: string };
};

const buildVariant = (trip: Trip, t: TFunction): Variant => {
  const iconSize = moderateScale(16);
  const seatsLeft = Math.max(trip.totalSeats - trip.bookedSeats, 0);
  const seatLabel = t("common.seatsLeftCount", { count: seatsLeft });

  switch (trip.status) {
    case "completed":
      return {
        dotColor: THEME.success,
        muted: false,
        badge: {
          icon: <CheckCircleIcon size={iconSize} color={THEME.primary} />,
          label: t("tripStatus.completed"),
          color: THEME.primary,
        },
      };
    case "cancelled":
      return {
        dotColor: THEME.primaryLight,
        muted: true,
        badge: {
          icon: <FilledXCircle size={iconSize} color={THEME.text} />,
          label: t("tripStatus.cancelled"),
          color: THEME.text,
        },
      };
    case "confirmed":
      return {
        dotColor: THEME.primary,
        muted: false,
        badge: {
          icon: <CheckCircleIcon size={iconSize} color={THEME.success} />,
          label: t("tripStatus.confirmed"),
          color: THEME.success,
        },
        footer: { label: seatLabel, color: THEME.primary },
      };
    default:
      // available / fully_booked / in_progress
      return {
        dotColor: THEME.primary,
        muted: false,
        footer: { label: seatLabel, color: THEME.primary },
      };
  }
};

const STATUS_BADGE_TONE: Record<
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

const DriverTripCard: React.FC<DriverTripCardProps> = ({
  trip,
  onPress,
  style,
}) => {
  const { t } = useLanguage();
  const variant = buildVariant(trip, t);
  const textColor = variant.muted ? THEME.textMuted : THEME.text;
  const timeColor = variant.muted ? THEME.textMuted : THEME.textSecondary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={!onPress}>
      <Card shadow padding={moderateScale(16)} style={[styles.card, style]}>
        {/* Header: date + status */}
        <View style={styles.headerRow}>
          <RNText font="bold" size={17} color={textColor}>
            {trip.date}, {trip.weekday}
          </RNText>
          {variant.badge ? (
            <View style={styles.statusRow}>
              {variant.badge.icon}
              <RNText
                font="semibold"
                size={14}
                color={variant.badge.color}
                style={styles.statusLabel}
              >
                {variant.badge.label}
              </RNText>
            </View>
          ) : (
            <StatusBadge
              label={statusLabel(t, trip.status)}
              tone={STATUS_BADGE_TONE[trip.status]}
            />
          )}
        </View>

        <View style={styles.divider} />

        {/* Route timeline */}
        <View style={styles.timelineWrap}>
          <View style={styles.timelineRow}>
            <RNText
              font="medium"
              size={14}
              color={timeColor}
              style={styles.timelineTime}
            >
              {trip.from.time || "--:--"}
            </RNText>
            <View
              style={[styles.timelineDot, { backgroundColor: variant.dotColor }]}
            />
            <RNText
              font="medium"
              size={15}
              color={textColor}
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
                <View
                  key={i}
                  style={[
                    styles.timelineDashSegment,
                    { backgroundColor: variant.dotColor },
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.timelineRow}>
            <RNText
              font="medium"
              size={14}
              color={timeColor}
              style={styles.timelineTime}
            >
              {trip.to.time || "--:--"}
            </RNText>
            <View
              style={[styles.timelineDot, { backgroundColor: variant.dotColor }]}
            />
            <RNText
              font="medium"
              size={15}
              color={textColor}
              style={styles.timelinePlace}
            >
              {trip.to.city}
              {trip.to.area ? `, ${trip.to.area}` : ""}
            </RNText>
          </View>
        </View>

        {/* Footer (only when there are seats to show) */}
        {variant.footer ? (
          <>
            <View style={styles.divider} />
            <RNText font="semibold" size={15} color={variant.footer.color}>
              {variant.footer.label}
            </RNText>
          </>
        ) : null}
      </Card>
    </TouchableOpacity>
  );
};

export default DriverTripCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(20),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    marginLeft: moderateScale(5),
  },
  divider: {
    height: 1,
    backgroundColor: THEME.divider,
    marginVertical: moderateScale(14),
  },
  timelineWrap: {},
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timelineTime: {
    width: moderateScale(48),
  },
  timelinePlace: {
    flex: 1,
    marginLeft: moderateScale(14),
  },
  timelineDot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
  },
  timelineConnector: {
    flexDirection: "row",
  },
  timeColSpacer: {
    width: moderateScale(48),
  },
  timelineDashCol: {
    width: moderateScale(10),
    alignItems: "center",
    paddingVertical: moderateScale(3),
  },
  timelineDashSegment: {
    width: moderateScale(1.5),
    height: moderateScale(3),
    marginVertical: moderateScale(1.5),
    opacity: 0.6,
  },
});
