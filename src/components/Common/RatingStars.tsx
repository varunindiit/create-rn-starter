import React, { useCallback, useRef } from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";
import { THEME } from "../../theme";

/** Five-pointed star outline path on a 24x24 grid. */
const STAR_PATH =
  "M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.62L12 17.77 6.05 20.8l1.14-6.62L2.38 9.49l6.65-.97L12 2.5Z";

interface RatingStarsProps {
  /** Currently selected rating (0 - `count`). */
  rating: number;
  /** Fired with the new rating (1 - `count`) when a star is tapped. */
  onChange?: (value: number) => void;
  count?: number;
  size?: number;
  /** Fill colour used for selected stars. */
  color?: string;
  /** Outline colour used for unselected stars. */
  emptyColor?: string;
}

/**
 * Animated, tappable star rating. Each star "pops" with a spring when selected,
 * keeping the rating interaction smooth and premium. Reusable across the app.
 */
const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onChange,
  count = 5,
  size = moderateScale(34),
  color = THEME.primary,
  emptyColor = THEME.primaryLight,
}) => {
  const scales = useRef(
    Array.from({ length: count }, () => new Animated.Value(1)),
  ).current;

  const handlePress = useCallback(
    (index: number) => {
      if (!onChange) return;
      Animated.sequence([
        Animated.spring(scales[index], {
          toValue: 1.3,
          useNativeDriver: true,
          speed: 60,
          bounciness: 14,
        }),
        Animated.spring(scales[index], {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 10,
        }),
      ]).start();
      onChange(index + 1);
    },
    [onChange, scales],
  );

  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => {
        const filled = i < rating;
        return (
          <TouchableWithoutFeedback
            key={i}
            disabled={!onChange}
            onPress={() => handlePress(i)}
          >
            <Animated.View
              style={[styles.star, { transform: [{ scale: scales[i] }] }]}
            >
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path
                  d={STAR_PATH}
                  fill={filled ? color : "none"}
                  stroke={filled ? color : emptyColor}
                  strokeWidth={filled ? 0 : 1.6}
                  strokeLinejoin="round"
                />
              </Svg>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    marginHorizontal: moderateScale(6),
  },
});
