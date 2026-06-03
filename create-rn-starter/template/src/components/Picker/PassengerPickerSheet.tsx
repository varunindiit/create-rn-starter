import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import { SPACING, THEME } from "../../theme";
import { useLanguage } from "../../localization";
import BottomSheet from "../BottomSheet/BottomSheet";
import { RNButton, RNText } from "../index";
import {
  MinusIcon,
  PlusIcon,
  UserOutlineIcon,
} from "../Icon/SvgIcons";

interface PassengerPickerSheetProps {
  visible: boolean;
  onClose: () => void;
  value: number;
  onConfirm: (count: number) => void;
  min?: number;
  max?: number;
  title?: string;
  subtitle?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PassengerPickerSheet: React.FC<PassengerPickerSheetProps> = ({
  visible,
  onClose,
  value,
  onConfirm,
  min = 1,
  max = 8,
  title,
  subtitle,
}) => {
  const { t } = useLanguage();
  const titleText = title ?? t("home.passengers");
  const subtitleText = subtitle ?? t("home.passengersSubtitle");
  const [count, setCount] = useState<number>(value);

  useEffect(() => {
    if (visible) setCount(value);
  }, [visible, value]);

  const decrement = () => {
    if (count <= min) return;
    setCount((c) => c - 1);
  };

  const increment = () => {
    if (count >= max) return;
    setCount((c) => c + 1);
  };

  const handleConfirm = () => {
    onConfirm(count);
    onClose();
  };

  const decDisabled = count <= min;
  const incDisabled = count >= max;

  return (
    <BottomSheet visible={visible} onClose={onClose} contentStyle={styles.sheet}>
      <View style={styles.header}>
        <RNText font="semibold" size={18} color={THEME.text}>
          {titleText}
        </RNText>
        <RNText
          size={13}
          color={THEME.textMuted}
          style={styles.subtitle}
          textAlign="center"
        >
          {subtitleText}
        </RNText>
      </View>

      <View style={styles.stepper}>
        <StepperButton
          icon={
            <MinusIcon
              size={moderateScale(20)}
              color={decDisabled ? THEME.textPlaceholder : THEME.primary}
            />
          }
          disabled={decDisabled}
          onPress={decrement}
        />

        <View style={styles.counterWrap}>
          <View style={styles.counterInner}>
            <UserOutlineIcon
              size={moderateScale(20)}
              color={THEME.primary}
            />
            <RNText
              font="bold"
              size={36}
              color={THEME.text}
              style={styles.counterText}
            >
              {count}
            </RNText>
          </View>
          <RNText size={12} color={THEME.textMuted} style={styles.counterLabel}>
            {count === 1 ? t("role.passenger") : t("home.passengers")}
          </RNText>
        </View>

        <StepperButton
          icon={
            <PlusIcon
              size={moderateScale(20)}
              color={incDisabled ? THEME.textPlaceholder : THEME.primary}
            />
          }
          disabled={incDisabled}
          onPress={increment}
        />
      </View>

      <RNText
        size={11}
        color={THEME.textMuted}
        textAlign="center"
        style={styles.limitHint}
      >
        Min {min} · Max {max}
      </RNText>

      <RNButton
        title={t("common.apply")}
        onPress={handleConfirm}
        containerStyle={styles.applyBtn}
      />
    </BottomSheet>
  );
};

const StepperButton = ({
  icon,
  onPress,
  disabled,
}: {
  icon: React.ReactNode;
  onPress: () => void;
  disabled: boolean;
}) => {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => {
        if (disabled) return;
        scale.value = withSpring(0.9, { mass: 0.3, damping: 12 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { mass: 0.3, damping: 12 });
      }}
      style={[
        styles.stepBtn,
        disabled && styles.stepBtnDisabled,
        style,
      ]}
    >
      {icon}
    </AnimatedPressable>
  );
};

export default PassengerPickerSheet;

const styles = StyleSheet.create({
  sheet: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: moderateScale(24),
  },
  subtitle: {
    marginTop: moderateScale(6),
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(8),
  },
  stepBtn: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    backgroundColor: THEME.primaryFaint,
    borderWidth: 1,
    borderColor: THEME.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBtnDisabled: {
    backgroundColor: THEME.surfaceMuted,
    borderColor: THEME.divider,
  },
  counterWrap: {
    flex: 1,
    alignItems: "center",
  },
  counterInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterText: {
    marginLeft: moderateScale(8),
  },
  counterLabel: {
    marginTop: moderateScale(4),
  },
  limitHint: {
    marginTop: moderateScale(16),
  },
  applyBtn: {
    marginTop: moderateScale(20),
  },
});
