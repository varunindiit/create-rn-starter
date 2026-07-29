import React, {useCallback} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {SIZES} from '../../theme/spacing';
import {useTheme} from '../../theme/ThemeProvider';
import {ChevronLeftIcon} from '../Icon/SvgIcons';
import RNText from '../Text/RNText';

export interface HeaderProps {
  title?: string;
  titleColor?: string;
  rightLabel?: string;
  onRightPress?: () => void;
  rightIcon?: React.ReactNode;
  rightAccessibilityLabel?: string;
  leftIcon?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  safeArea?: boolean;
  background?: string;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  titleColor,
  rightLabel,
  onRightPress,
  rightIcon,
  rightAccessibilityLabel,
  leftIcon,
  onBack,
  showBack = true,
  safeArea = true,
  background = 'transparent',
  containerStyle,
  testID = 'header',
}) => {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  const handleBack = useCallback(() => {
    if (onBack) return onBack();
    if (nav.canGoBack()) nav.goBack();
  }, [onBack, nav]);

  return (
    <View
      testID={testID}
      // Groups the row as a header landmark so assistive tech can jump to it.
      accessibilityRole="header"
      style={[
        styles.container,
        {backgroundColor: background},
        safeArea && {paddingTop: insets.top + moderateScale(6)},
        containerStyle,
      ]}>
      <View style={styles.side}>
        {showBack || leftIcon ? (
          <TouchableOpacity
            testID={`${testID}-back`}
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.iconBtn}>
            {leftIcon ?? (
              <ChevronLeftIcon size={moderateScale(22)} color={colors.text} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.titleWrap}>
        {title ? (
          <RNText
            font="semibold"
            size={17}
            color={titleColor ?? colors.text}
            numberOfLines={1}
            textAlign="center"
            // The visual title is also the screen's accessible heading.
            accessibilityRole="header"
            testID={`${testID}-title`}>
            {title}
          </RNText>
        ) : null}
      </View>

      <View style={[styles.side, styles.sideRight]}>
        {rightLabel ? (
          <TouchableOpacity
            testID={`${testID}-action`}
            onPress={onRightPress}
            activeOpacity={0.7}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={rightAccessibilityLabel ?? rightLabel}>
            <RNText font="medium" size={14} color={colors.primary}>
              {rightLabel}
            </RNText>
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            testID={`${testID}-action`}
            onPress={onRightPress}
            activeOpacity={0.7}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={rightAccessibilityLabel ?? 'Header action'}
            style={styles.iconBtn}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: SIZES.headerHeight,
    paddingHorizontal: moderateScale(8),
    paddingBottom: moderateScale(8),
  },
  side: {
    width: moderateScale(56),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideRight: {alignItems: 'flex-end'},
  iconBtn: {
    // 40x40 keeps the touch target at/above the 44dp guideline once hitSlop
    // is applied, which a bare icon would not.
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
