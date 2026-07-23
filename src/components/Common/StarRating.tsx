import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { THEME } from "../../theme";

interface StarRatingProps {
  value: number;
  total?: number;
  size?: number;
  spacing?: number;
  onChange?: (n: number) => void;
  color?: string;
  inactiveColor?: string;
  disabled?: boolean;
}

const Star = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.62L12 17.77 6.05 20.8l1.14-6.62L2.38 9.49l6.65-.97L12 2.5Z"
      fill={color}
    />
  </Svg>
);

const StarRating: React.FC<StarRatingProps> = ({
  value,
  total = 5,
  size = 20,
  spacing = 4,
  onChange,
  color = THEME.star,
  inactiveColor = THEME.unselectedStar,
  disabled,
}) => (
  <View style={styles.row}>
    {Array.from({ length: total }).map((_, i) => {
      const active = i < value;
      const starStyle = { marginRight: i === total - 1 ? 0 : spacing };
      return (
        <Pressable
          key={i}
          disabled={disabled || !onChange}
          onPress={() => onChange?.(i + 1)}
          style={starStyle}
          hitSlop={6}
        >
          <Star size={size} color={active ? color : inactiveColor} />
        </Pressable>
      );
    })}
  </View>
);

export default StarRating;

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
});
