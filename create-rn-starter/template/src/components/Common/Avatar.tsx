import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { THEME } from "../../theme";
import RNText from "../Text/RNText";

interface AvatarProps {
  uri?: string;
  source?: ImageSourcePropType;
  size?: number;
  name?: string;
  style?: StyleProp<ViewStyle>;
  ring?: boolean;
}

const initials = (n?: string) =>
  (n || "")
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const DEFAULT_AVATAR_URI = "https://picsum.photos/200/300";

const Avatar: React.FC<AvatarProps> = ({
  uri = DEFAULT_AVATAR_URI,
  source,
  size = 44,
  name,
  style,
  ring,
}) => {
  const radius = size / 2;
  const wrap = [
    {
      width: size,
      height: size,
      borderRadius: radius,
      backgroundColor: THEME.primaryLight,
    },
    ring && { borderWidth: 2, borderColor: THEME.surface },
    styles.center,
    style,
  ];
  if (uri || source) {
    return (
      <View style={wrap}>
        <Image
          source={source ?? { uri }}
          style={{ width: size, height: size, borderRadius: radius }}
        />
      </View>
    );
  }
  return (
    <View style={wrap}>
      <RNText
        font="semibold"
        size={Math.round(size * 0.36)}
        color={THEME.primary}
      >
        {initials(name) || "U"}
      </RNText>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", overflow: "hidden" },
});
