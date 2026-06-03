import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Svg, { Circle, Path } from 'react-native-svg';
import { RNText } from '../../../components';
import { THEME } from '../../../theme';
import ChevronRightIcon from '../../../assets/svg/rightArrow.svg';

/* -------------------------------------------------------- */
/* Menu primitives shared by both profile layouts            */
/* -------------------------------------------------------- */

export const MenuSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <RNText
      font="medium"
      size={12}
      color={THEME.labelBrown}
      style={styles.section}
    >
      {title}
    </RNText>
    <View style={styles.list}>{children}</View>
  </>
);

export const MenuRow = ({
  icon,
  label,
  onPress,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  last?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.row, !last && styles.rowBorder]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.rowIcon}>{icon}</View>
    <RNText font="medium" size={14} color={THEME.text} style={styles.flex}>
      {label}
    </RNText>
    <ChevronRightIcon />
  </TouchableOpacity>
);

export const VerifyRow = ({
  verified,
  label,
}: {
  verified: boolean;
  label: string;
}) => (
  <View style={styles.verifyRow}>
    {verified ? (
      <CheckBadge size={moderateScale(18)} />
    ) : (
      <PlusBadge size={moderateScale(18)} />
    )}
    <RNText
      font="medium"
      size={13}
      color={THEME.text}
      style={styles.verifyLabel}
    >
      {label}
    </RNText>
  </View>
);

/* -------------------------------------------------------- */
/* Icons / badges                                            */
/* -------------------------------------------------------- */

export const PlusBadge: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx={10} cy={10} r={9} stroke={THEME.primary} strokeWidth={1.4} fill="none" />
    <Path
      d="M10 6v8M6 10h8"
      stroke={THEME.primary}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const CheckBadge: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx={10} cy={10} r={9} stroke={THEME.text} strokeWidth={1.4} fill="none" />
    <Path
      d="M6.5 10.4 9 12.7l4.5-5"
      stroke={THEME.text}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SolidStarIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 14,
  color = THEME.star,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.6l-5.9 3.07 1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z"
      fill={color}
      stroke={color}
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  </Svg>
);

export const StarOutlineIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = THEME.text,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.6l-5.9 3.07 1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </Svg>
);

export const DollarCircleIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = THEME.text,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9.25} stroke={color} strokeWidth={1.6} />
    <Path
      d="M14.5 9.25c-.5-.95-1.45-1.5-2.55-1.5-1.55 0-2.7.85-2.7 2.05 0 1.1.85 1.65 2.25 1.95l1.05.22c1.5.32 2.45.92 2.45 2.1 0 1.32-1.25 2.18-2.85 2.18-1.3 0-2.4-.55-2.95-1.55"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M12 6.25v1.5M12 16.25v1.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const profileStyles = StyleSheet.create({
  profileCard: {
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(44, 26, 14, 0.1)',
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: moderateScale(14),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
  },
  cardDivider: {
    height: 1,
    backgroundColor: THEME.divider,
    marginVertical: moderateScale(14),
  },
  verifyList: {
    gap: moderateScale(10),
  },
});

const styles = StyleSheet.create({
  flex: { flex: 1 },
  section: {
    marginTop: moderateScale(22),
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(4),
  },
  list: { width: '100%' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: THEME.divider,
  },
  rowIcon: {
    width: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(14),
  },
  verifyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifyLabel: { marginLeft: moderateScale(10) },
});
