import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme';
import {RNButton} from '../Button';
import RNText from '../Text/RNText';
import {CloseIcon} from '../Icon/SvgIcons';
import {useTheme, useThemedStyles} from '../../theme/ThemeProvider';
import type {ColorScheme} from '../../theme/palettes';

interface CenterAlertProps {
  visible: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => void;
  loading?: boolean;
  confirmDisabled?: boolean;
  children?: React.ReactNode;
}

const CenterAlert: React.FC<CenterAlertProps> = ({
  visible,
  onClose,
  title,
  description,
  confirmText = 'Yes, Cancel',
  onConfirm,
  loading,
  confirmDisabled,
  children,
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      // onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Pressable style={styles.card} onPress={() => {}}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              hitSlop={10}
              activeOpacity={0.7}>
              <View style={styles.closeCircle}>
                <CloseIcon size={moderateScale(12)} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <RNText
              font="semibold"
              size={18}
              color={colors.text}
              textAlign="center"
              style={styles.title}>
              {title}
            </RNText>

            {description ? (
              <RNText
                size={13}
                color={colors.textSecondary}
                textAlign="center"
                style={styles.description}>
                {description}
              </RNText>
            ) : null}

            {children ? <View style={styles.content}>{children}</View> : null}

            <RNButton
              title={confirmText}
              onPress={onConfirm}
              loading={loading}
              disabled={confirmDisabled}
              containerStyle={styles.btn}
            />
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CenterAlert;

const makeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    flex1: {
      flex: 1,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(36),
    },
    card: {
      width: '100%',
      backgroundColor: colors.surface,
      borderRadius: moderateScale(20),
      paddingHorizontal: moderateScale(20),
      paddingTop: moderateScale(28),
      paddingBottom: moderateScale(20),
      alignItems: 'center',
    },
    closeBtn: {
      position: 'absolute',
      top: moderateScale(10),
      right: moderateScale(10),
      padding: moderateScale(4),
    },
    closeCircle: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(10),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      marginTop: moderateScale(2),
    },
    description: {
      marginTop: moderateScale(10),
      lineHeight: moderateScale(20),
      paddingHorizontal: moderateScale(4),
    },
    content: {
      width: '100%',
      marginTop: moderateScale(16),
    },
    btn: {
      marginTop: moderateScale(20),
      width: '100%',
      borderRadius: SPACING.radiusPill,
    },
  });
