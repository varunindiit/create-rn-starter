import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme';
import RNText from '../Text/RNText';
import {CloseIcon, CloudUploadIcon} from '../Icon/SvgIcons';
import {useLanguage} from '../../localization';
import {useTheme, useThemedStyles} from '../../theme/ThemeProvider';
import type {ColorScheme} from '../../theme/palettes';

interface UploadBoxProps {
  title: string;
  hint?: string;
  imageUri?: string | null;
  onPress?: () => void;
  onRemove?: () => void;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Dashed upload card used across the driver onboarding flow
 * (driving license front/back, document uploads). Shows an upload
 * prompt when empty and an image preview with a remove action once filled.
 */
const UploadBox: React.FC<UploadBoxProps> = ({
  title,
  hint,
  imageUri,
  onPress,
  onRemove,
  height = moderateScale(130),
  containerStyle,
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);
  const {t} = useLanguage();
  const hintText = hint ?? t('common.uploadFormatsHint');
  if (imageUri) {
    return (
      <View style={[styles.box, styles.filled, {height}, containerStyle]}>
        <Image source={{uri: imageUri}} style={StyleSheet.absoluteFill} />
        <TouchableOpacity style={styles.remove} onPress={onRemove} hitSlop={8}>
          <CloseIcon size={moderateScale(14)} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.box, {height}, containerStyle]}>
      <CloudUploadIcon size={moderateScale(28)} color={colors.primary} />
      <RNText font="bold" size={14} color={colors.text} style={styles.title}>
        {title}
      </RNText>
      {hintText ? (
        <RNText size={12} color={colors.textSecondary} style={styles.hint}>
          {hintText}
        </RNText>
      ) : null}
    </TouchableOpacity>
  );
};

export default UploadBox;

const makeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    box: {
      borderRadius: SPACING.radiusLg,
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderStyle: 'dashed',
      backgroundColor: colors.primaryFaint,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(16),
    },
    filled: {
      overflow: 'hidden',
      backgroundColor: colors.surfaceMuted,
    },
    title: {marginTop: moderateScale(10)},
    hint: {marginTop: moderateScale(4)},
    remove: {
      position: 'absolute',
      top: moderateScale(8),
      right: moderateScale(8),
      width: moderateScale(24),
      height: moderateScale(24),
      borderRadius: moderateScale(12),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
