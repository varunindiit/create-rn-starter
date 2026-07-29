import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SIZES} from '../../theme/spacing';
import {useTheme} from '../../theme/ThemeProvider';
import {initials} from '../../utils/functions';
import RNText from '../Text/RNText';

interface AvatarProps {
  uri?: string | null;
  source?: ImageSourcePropType;
  size?: number;
  name?: string;
  style?: StyleProp<ViewStyle>;
  ring?: boolean;
  testID?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  source,
  size = SIZES.avatar,
  name,
  style,
  ring = false,
  testID = 'avatar',
}) => {
  const {colors} = useTheme();
  const image = source ?? (uri ? {uri} : undefined);

  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="image"
      // Without a name there is nothing meaningful to announce, so fall back to
      // a generic label rather than reading the raw image URI.
      accessibilityLabel={name ? `${name}'s avatar` : 'Avatar'}
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primaryFaint,
        },
        ring && [styles.ring, {borderColor: colors.primary}],
        style,
      ]}>
      {image ? (
        <Image
          source={image}
          style={{width: size, height: size, borderRadius: size / 2}}
          resizeMode="cover"
        />
      ) : (
        <RNText font="semibold" size={size * 0.34} color={colors.primary}>
          {initials(name) || '?'}
        </RNText>
      )}
    </View>
  );
};

export default Avatar;
export type {AvatarProps};

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center', overflow: 'hidden'},
  ring: {borderWidth: 2},
});
