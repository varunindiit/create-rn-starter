import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme';
import {useLanguage} from '../../localization';
import BottomSheet from '../BottomSheet/BottomSheet';
import {RNButton, RNText} from '../index';
import {ChevronLeftIcon, ChevronRightIcon} from '../Icon/SvgIcons';
import {useTheme, useThemedStyles} from '../../theme/ThemeProvider';
import type {ColorScheme} from '../../theme/palettes';

interface DatePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  value?: Date | null;
  minimumDate?: Date;
  maximumDate?: Date;
  onConfirm: (date: Date) => void;
  title?: string;
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const startOfDay = (d: Date) => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const isSameDay = (a?: Date | null, b?: Date | null) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const buildCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

const DatePickerSheet: React.FC<DatePickerSheetProps> = ({
  visible,
  onClose,
  value,
  minimumDate,
  maximumDate,
  onConfirm,
  title,
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);
  const {t} = useLanguage();
  const titleText = title ?? t('common.selectDate');
  const today = useMemo(() => startOfDay(new Date()), []);
  const minDate = useMemo(
    () => (minimumDate ? startOfDay(minimumDate) : today),
    [minimumDate, today],
  );
  const maxDate = useMemo(
    () => (maximumDate ? startOfDay(maximumDate) : null),
    [maximumDate],
  );

  const initial = value ? startOfDay(value) : today;
  const [selected, setSelected] = useState<Date>(initial);
  const [viewMonth, setViewMonth] = useState<number>(initial.getMonth());
  const [viewYear, setViewYear] = useState<number>(initial.getFullYear());

  useEffect(() => {
    if (visible) {
      const start = value ? startOfDay(value) : today;
      setSelected(start);
      setViewMonth(start.getMonth());
      setViewYear(start.getFullYear());
    }
  }, [visible, value, today]);

  const cells = useMemo(
    () => buildCalendar(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const canGoPrev = useMemo(() => {
    const firstOfView = new Date(viewYear, viewMonth, 1);
    const firstOfMin = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    return firstOfView > firstOfMin;
  }, [viewYear, viewMonth, minDate]);

  const canGoNext = useMemo(() => {
    if (!maxDate) return true;
    const firstOfView = new Date(viewYear, viewMonth, 1);
    const firstOfMax = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    return firstOfView < firstOfMax;
  }, [viewYear, viewMonth, maxDate]);

  const goPrev = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const goNext = () => {
    if (!canGoNext) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const setQuick = (offsetDays: number) => {
    const next = startOfDay(new Date());
    next.setDate(next.getDate() + offsetDays);
    setSelected(next);
    setViewMonth(next.getMonth());
    setViewYear(next.getFullYear());
  };

  const todaySelected = isSameDay(selected, today);
  const tomorrow = startOfDay(new Date(today));
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowSelected = isSameDay(selected, tomorrow);

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      contentStyle={styles.sheet}>
      <View style={styles.header}>
        <RNText font="semibold" size={18} color={colors.text}>
          {titleText}
        </RNText>
      </View>

      <View style={styles.quickRow}>
        <QuickChip
          label={t('common.today')}
          active={todaySelected}
          onPress={() => setQuick(0)}
        />
        <QuickChip
          label={t('common.tomorrow')}
          active={tomorrowSelected}
          onPress={() => setQuick(1)}
        />
      </View>

      <View style={styles.monthRow}>
        <TouchableOpacity
          onPress={goPrev}
          disabled={!canGoPrev}
          activeOpacity={0.7}
          style={[styles.navBtn, !canGoPrev && styles.navBtnDisabled]}
          hitSlop={10}>
          <ChevronLeftIcon
            size={moderateScale(16)}
            color={canGoPrev ? colors.primary : colors.textPlaceholder}
          />
        </TouchableOpacity>
        <Animated.View
          key={`${viewMonth}-${viewYear}`}
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}>
          <RNText font="semibold" size={16} color={colors.text}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </RNText>
        </Animated.View>
        <TouchableOpacity
          onPress={goNext}
          disabled={!canGoNext}
          activeOpacity={0.7}
          style={[styles.navBtn, !canGoNext && styles.navBtnDisabled]}
          hitSlop={10}>
          <ChevronRightIcon
            size={moderateScale(16)}
            color={canGoNext ? colors.primary : colors.textPlaceholder}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAY_LABELS.map((d, idx) => (
          <View key={idx} style={styles.weekCell}>
            <RNText size={11} font="medium" color={colors.textMuted}>
              {d}
            </RNText>
          </View>
        ))}
      </View>

      <Animated.View
        key={`grid-${viewMonth}-${viewYear}`}
        entering={FadeIn.duration(160)}
        layout={Layout.duration(140)}
        style={styles.grid}>
        {cells.map((date, idx) => {
          if (!date) {
            return <View key={`e-${idx}`} style={styles.dayCell} />;
          }
          const disabled = date < minDate || (maxDate ? date > maxDate : false);
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selected);
          return (
            <View key={date.toISOString()} style={styles.dayCell}>
              <Pressable
                onPress={() => !disabled && setSelected(date)}
                disabled={disabled}
                style={({pressed}) => [
                  styles.dayBtn,
                  isSelected && styles.dayBtnSelected,
                  isToday && !isSelected && styles.dayBtnToday,
                  pressed && !disabled && !isSelected && styles.dayBtnPressed,
                ]}>
                <RNText
                  size={14}
                  font={
                    isSelected ? 'semibold' : isToday ? 'semibold' : 'regular'
                  }
                  color={
                    disabled
                      ? colors.textPlaceholder
                      : isSelected
                      ? colors.textOnPrimary
                      : isToday
                      ? colors.primary
                      : colors.text
                  }>
                  {date.getDate()}
                </RNText>
              </Pressable>
            </View>
          );
        })}
      </Animated.View>

      <RNButton
        title={t('common.confirm')}
        onPress={handleConfirm}
        containerStyle={styles.confirmBtn}
      />
    </BottomSheet>
  );
};

const QuickChip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.chip, active && styles.chipActive]}>
      <RNText
        size={13}
        font="medium"
        color={active ? colors.textOnPrimary : colors.text}>
        {label}
      </RNText>
    </TouchableOpacity>
  );
};

export default DatePickerSheet;

const makeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    sheet: {
      paddingHorizontal: SPACING.lg,
      paddingBottom: SPACING.xl,
    },
    header: {
      alignItems: 'center',
      marginBottom: moderateScale(12),
    },
    quickRow: {
      flexDirection: 'row',
      gap: moderateScale(8),
      marginBottom: moderateScale(16),
    },
    chip: {
      paddingVertical: moderateScale(8),
      paddingHorizontal: moderateScale(16),
      borderRadius: moderateScale(20),
      backgroundColor: colors.primaryFaint,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    monthRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateScale(12),
      paddingHorizontal: moderateScale(4),
    },
    navBtn: {
      width: moderateScale(34),
      height: moderateScale(34),
      borderRadius: moderateScale(17),
      backgroundColor: colors.primaryFaint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navBtnDisabled: {
      backgroundColor: colors.surfaceMuted,
    },
    weekRow: {
      flexDirection: 'row',
      marginBottom: moderateScale(6),
    },
    weekCell: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: moderateScale(6),
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      padding: moderateScale(3),
    },
    dayBtn: {
      flex: 1,
      borderRadius: moderateScale(999),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayBtnSelected: {
      backgroundColor: colors.primary,
    },
    dayBtnToday: {
      borderWidth: 1.2,
      borderColor: colors.primary,
    },
    dayBtnPressed: {
      backgroundColor: colors.primaryFaint,
    },
    confirmBtn: {
      marginTop: moderateScale(16),
    },
  });
