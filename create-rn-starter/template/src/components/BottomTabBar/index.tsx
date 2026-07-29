import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {SvgProps} from 'react-native-svg';
import {useTheme} from '../../theme/ThemeProvider';
import RNText from '../Text/RNText';

import HomeActive from '../../assets/svg/homeActive.svg';
import HomeUnActive from '../../assets/svg/homeUnActive.svg';
import UserActive from '../../assets/svg/userActive.svg';
import UserUnActive from '../../assets/svg/userUnActive.svg';

type TabIcon = React.FC<SvgProps>;

/**
 * Icons per route name. A route with no entry falls back to `DEFAULT_ICONS`
 * rather than rendering the wrong tab's icon — the previous version mapped
 * anything that wasn't "Home" to the profile icon, so a third tab silently
 * showed the wrong glyph.
 */
const ICONS: Record<string, {Active: TabIcon; Inactive: TabIcon}> = {
  Home: {Active: HomeActive, Inactive: HomeUnActive},
  Profile: {Active: UserActive, Inactive: UserUnActive},
};

const DEFAULT_ICONS = {Active: HomeActive, Inactive: HomeUnActive};

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View
      testID="bottom-tab-bar"
      style={[
        styles.wrapper,
        {paddingBottom: Math.max(insets.bottom, moderateScale(12))},
      ]}>
      <View
        // `tablist` lets assistive tech treat the row as a set, so it can
        // announce "tab 2 of 3" as the user moves through it.
        accessibilityRole="tablist"
        style={[
          styles.bar,
          {backgroundColor: colors.tabBg, shadowColor: colors.shadow},
        ]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const {Active, Inactive} = ICONS[route.name] ?? DEFAULT_ICONS;
          const Icon = isFocused ? Active : Inactive;

          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({type: 'tabLongPress', target: route.key});
          };

          return (
            <Pressable
              key={route.key}
              testID={options.tabBarButtonTestID ?? `tab-${route.name}`}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}
              hitSlop={8}
              accessibilityRole="tab"
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              accessibilityState={{selected: isFocused}}>
              <View style={styles.iconWrap}>
                <Icon width={moderateScale(24)} height={moderateScale(24)} />
                <RNText
                  size={10}
                  font={isFocused ? 'semibold' : 'regular'}
                  color={isFocused ? colors.primary : colors.textMuted}
                  style={styles.label}>
                  {label}
                </RNText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(8),
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(8),
    ...Platform.select({
      ios: {
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: {width: 0, height: 4},
      },
      android: {elevation: 8},
    }),
  },
  item: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(2),
  },
  label: {marginTop: moderateScale(2)},
});
