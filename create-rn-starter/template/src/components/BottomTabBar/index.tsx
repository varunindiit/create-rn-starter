import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { THEME } from "../../theme";

import HomeActive from "../../assets/svg/homeActive.svg";
import HomeUnActive from "../../assets/svg/homeUnActive.svg";
import TripActive from "../../assets/svg/tripActive.svg";
import TripUnActive from "../../assets/svg/tripUnActive.svg";
import ChatActive from "../../assets/svg/chatActive.svg";
import ChatUnActive from "../../assets/svg/chatUnActive.svg";
import UserActive from "../../assets/svg/userActive.svg";
import UserUnActive from "../../assets/svg/userUnActive.svg";

interface BottomTabBarProps {
  state: any;
  navigation: any;
}

const ICON_MAP: Record<
  string,
  { Active: React.FC<any>; Inactive: React.FC<any> }
> = {
  Home: { Active: HomeActive, Inactive: HomeUnActive },
  Trips: { Active: TripActive, Inactive: TripUnActive },
  Messages: { Active: ChatActive, Inactive: ChatUnActive },
  Profile: { Active: UserActive, Inactive: UserUnActive },
};

const tabKey = (name: string) => {
  if (name.includes("Home")) return "Home";
  if (name.includes("Trips")) return "Trips";
  if (name.includes("Messages")) return "Messages";
  return "Profile";
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, moderateScale(12)) },
      ]}
    >
      <View style={styles.bar}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const key = tabKey(route.name);
          const cfg = ICON_MAP[key];
          const Icon = isFocused ? cfg.Active : cfg.Inactive;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented)
              navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.item}
              hitSlop={8}
            >
              <View
                style={[
                  styles.iconWrap,
                  isFocused && styles.iconWrapActive,
                ]}
              >
                <Icon
                  width={moderateScale(26)}
                  height={moderateScale(26)}
                />
                {isFocused && <View style={styles.activeNotch} />}
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
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(8),
    backgroundColor: "transparent",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.tabBg,
    borderRadius: moderateScale(32),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
    ...Platform.select({ android: { elevation: 14 } }),
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(18),
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: THEME.primary,
    overflow: "hidden",
    borderRadius: moderateScale(18),
  },
  activeNotch: {
    position: "absolute",
    bottom: -1,
    alignSelf: "center",
    width: moderateScale(11.55),
    height: moderateScale(4.23),
    backgroundColor: THEME.tabBg,
    borderTopLeftRadius: moderateScale(2),
    borderTopRightRadius: moderateScale(2),
  },
});
