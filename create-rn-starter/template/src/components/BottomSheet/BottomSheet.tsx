import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Modal} from 'react-native-reanimated-modal';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme';
import {useTheme} from '../../theme/ThemeProvider';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  dismissOnBackdropPress?: boolean;
  showHandle?: boolean;
  animationInTiming?: number;
  backdropOpacity?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  contentStyle,
  dismissOnBackdropPress = true,
  showHandle = true,
  animationInTiming = 280,
  backdropOpacity = 0.5,
}) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      style={styles.modal}
      animation={{type: 'slide', duration: animationInTiming}}
      backdrop={{
        enabled: true,
        color: '#000000',
        opacity: backdropOpacity,
      }}
      swipe={{directions: ['down'], threshold: 150}}
      onBackdropPress={dismissOnBackdropPress ? onClose : false}
      onHide={onClose}>
      <View
        style={[styles.sheet, {backgroundColor: colors.surface}, contentStyle]}>
        {showHandle ? (
          <View style={[styles.handle, {backgroundColor: colors.border}]} />
        ) : null}
        {children}
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    borderTopLeftRadius: SPACING.radiusXxl,
    borderTopRightRadius: SPACING.radiusXxl,
  },
  handle: {
    alignSelf: 'center',
    width: moderateScale(40),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    marginBottom: SPACING.lg,
  },
});
