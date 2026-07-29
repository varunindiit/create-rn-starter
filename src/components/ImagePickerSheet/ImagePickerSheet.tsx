import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import ImageCropPicker, {
  Image as PickedImage,
  Options,
} from 'react-native-image-crop-picker';
import {moderateScale} from 'react-native-size-matters';
import {CameraIcon, GalleryIcon} from '../Icon/SvgIcons';
import {SPACING} from '../../theme';
import {showToast} from '../../utils/functions';
import {useLanguage} from '../../localization';
import BottomSheet from '../BottomSheet/BottomSheet';
import RNText from '../Text/RNText';
import {useTheme, useThemedStyles} from '../../theme/ThemeProvider';
import type {ColorScheme} from '../../theme/palettes';

export interface ImagePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  onPicked: (image: PickedImage) => void;
  title?: string;
  subtitle?: string;
  cropping?: boolean;
  circular?: boolean;
  width?: number;
  height?: number;
  compressImageQuality?: number;
}

const ImagePickerSheet: React.FC<ImagePickerSheetProps> = ({
  visible,
  onClose,
  onPicked,
  title,
  subtitle,
  cropping = true,
  circular = false,
  width = 1200,
  height = 1200,
  compressImageQuality = 0.85,
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);
  const {t} = useLanguage();
  const [busy, setBusy] = useState<'camera' | 'gallery' | null>(null);

  const titleText = title ?? t('imagePicker.updatePhoto');
  const subtitleText = subtitle ?? t('imagePicker.subtitle');

  const baseOptions: Options = useMemo(
    () => ({
      width,
      height,
      cropping,
      cropperCircleOverlay: circular,
      mediaType: 'photo',
      includeBase64: false,
      compressImageQuality,
      forceJpg: true,
      cropperToolbarTitle: t('imagePicker.cropTitle'),
      cropperActiveWidgetColor: colors.primary,
      cropperStatusBarLight: false,
      cropperToolbarColor: colors.background,
      cropperToolbarWidgetColor: colors.text,
    }),
    [
      width,
      height,
      cropping,
      circular,
      compressImageQuality,
      t,
      // The cropper UI is themed, so its options must be rebuilt when the
      // palette changes — otherwise the native cropper keeps the old colours.
      colors.background,
      colors.primary,
      colors.text,
    ],
  );

  const handleResult = useCallback(
    (image: PickedImage) => {
      onPicked(image);
      onClose();
    },
    [onPicked, onClose],
  );

  const handleError = useCallback(
    (err: any) => {
      const code = err?.code ?? err?.message;
      if (/cancel/i.test(String(code))) return;
      if (
        code === 'E_NO_LIBRARY_PERMISSION' ||
        code === 'E_NO_CAMERA_PERMISSION'
      ) {
        showToast(t('imagePicker.permissionDenied'), 'warning');
        return;
      }
      showToast(t('common.somethingWrong'), 'danger');
    },
    [t],
  );

  const openCamera = useCallback(async () => {
    if (busy) return;
    setBusy('camera');
    try {
      const image = (await ImageCropPicker.openCamera(
        baseOptions,
      )) as PickedImage;
      handleResult(image);
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(null);
    }
  }, [busy, baseOptions, handleResult, handleError]);

  const openGallery = useCallback(async () => {
    if (busy) return;
    setBusy('gallery');
    try {
      const image = (await ImageCropPicker.openPicker(
        baseOptions,
      )) as PickedImage;
      handleResult(image);
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(null);
    }
  }, [busy, baseOptions, handleResult, handleError]);

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <RNText font="semibold" size={18} color={colors.text}>
        {titleText}
      </RNText>
      <RNText size={12} color={colors.textMuted} style={styles.subtitle}>
        {subtitleText}
      </RNText>

      <View style={styles.card}>
        <Row
          icon={<CameraIcon size={moderateScale(20)} color={colors.primary} />}
          label={t('imagePicker.openCamera')}
          caption={t('imagePicker.openCameraCaption')}
          onPress={openCamera}
          disabled={!!busy}
        />
        <View style={styles.divider} />
        <Row
          icon={<GalleryIcon size={moderateScale(20)} color={colors.primary} />}
          label={t('imagePicker.chooseFromGallery')}
          caption={t('imagePicker.galleryCaption')}
          onPress={openGallery}
          disabled={!!busy}
        />
      </View>

      <Pressable onPress={onClose} style={styles.cancel}>
        <RNText font="semibold" size={15} color={colors.text}>
          {t('common.cancel')}
        </RNText>
      </Pressable>
    </BottomSheet>
  );
};

const Row = ({
  icon,
  label,
  caption,
  onPress,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  caption: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.row, disabled && styles.rowDisabled]}>
      <View style={styles.iconBubble}>{icon}</View>
      <View style={styles.rowBody}>
        <RNText font="semibold" size={14} color={colors.text}>
          {label}
        </RNText>
        <RNText size={11} color={colors.textMuted} style={styles.caption}>
          {caption}
        </RNText>
      </View>
    </Pressable>
  );
};

export default ImagePickerSheet;

const makeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    subtitle: {marginTop: moderateScale(4), marginBottom: SPACING.lg},
    card: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: SPACING.radiusLg,
      padding: moderateScale(6),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(14),
      gap: moderateScale(14),
      borderRadius: SPACING.radiusMd,
    },
    rowDisabled: {
      opacity: 0.5,
    },
    divider: {
      height: 1,
      backgroundColor: colors.divider,
      marginHorizontal: moderateScale(10),
    },
    rowBody: {
      flex: 1,
    },
    caption: {
      marginTop: moderateScale(2),
    },
    iconBubble: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(12),
      backgroundColor: colors.primaryFaint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancel: {
      marginTop: SPACING.md,
      height: moderateScale(52),
      borderRadius: SPACING.radiusPill,
      backgroundColor: colors.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
