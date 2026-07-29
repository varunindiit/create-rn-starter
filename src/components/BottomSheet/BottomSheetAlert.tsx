import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme';
import {RNButton} from '../Button';
import RNText from '../Text/RNText';
import BottomSheet from './BottomSheet';
import {useTheme} from '../../theme/ThemeProvider';

interface BottomSheetAlertProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  destructive?: boolean;
}

const BottomSheetAlert: React.FC<BottomSheetAlertProps> = ({
  visible,
  onClose,
  title,
  description,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
  loading,
  destructive,
}) => {
  const {colors} = useTheme();
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} showHandle>
      <RNText
        font="semibold"
        size={20}
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

      <View style={styles.btnRow}>
        <RNButton
          title={cancelText}
          variant="outline"
          containerStyle={styles.btn}
          onPress={handleCancel}
          disabled={loading}
        />
        <RNButton
          title={confirmText}
          containerStyle={styles.btn}
          variant={destructive ? 'primary' : 'primary'}
          onPress={onConfirm}
          loading={loading}
        />
      </View>
    </BottomSheet>
  );
};

export default BottomSheetAlert;

const styles = StyleSheet.create({
  title: {marginTop: moderateScale(6)},
  description: {
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    lineHeight: moderateScale(20),
  },
  btnRow: {
    flexDirection: 'row',
    gap: moderateScale(10),
    marginTop: moderateScale(20),
  },
  btn: {
    width: '50%',
    borderRadius: SPACING.radiusPill,
  },
});
