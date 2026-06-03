import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { Avatar, Card, RNText } from '../../../components';
import { THEME } from '../../../theme';
import {
  BellIcon,
  CardIcon,
  CarIcon,
  FileTextIcon,
  GlobeIcon,
  HeadphonesIcon,
  ShieldKeyIcon,
  UserCircleIcon,
} from '../../../components/Icon/SvgIcons';
import { RootState } from '../../../redux/store';
import { useLanguage } from '../../../localization';
import RouteKey from '../../../navigation/RouteKey';
import { formatNumber } from '../../../utils/functions';
import {
  CheckBadge,
  DollarCircleIcon,
  MenuRow,
  MenuSection,
  profileStyles,
  SolidStarIcon,
  StarOutlineIcon,
  VerifyRow,
} from './ProfileParts';

const DriverProfile: React.FC = () => {
  const nav = useNavigation<any>();
  const { t } = useLanguage();
  const profile = useSelector((s: RootState) => s.userProfile.profile);
  const earnings = useSelector((s: RootState) => s.earnings);
  const vehicle = profile.vehicles?.[0];

  return (
    <>
      <Card shadow={false} style={profileStyles.profileCard} padding={0}>
        <View style={profileStyles.profileTop}>
          <Avatar
            name={profile.fullName}
            uri={profile.avatarUri || undefined}
            size={moderateScale(56)}
          />
          <View style={profileStyles.profileInfo}>
            <RNText font="bold" size={17} color={THEME.text}>
              {profile.fullName}
            </RNText>
            <View style={styles.verifiedPill}>
              <CheckBadge size={moderateScale(14)} />
              <RNText
                font="semibold"
                size={11}
                color={THEME.success}
                style={{ marginLeft: moderateScale(5) }}
              >
                {t('profile.verifiedDriver')}
              </RNText>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat
            icon={<SolidStarIcon size={moderateScale(16)} color={THEME.star} />}
            value={(profile.rating ?? 0).toFixed(1)}
            label={t('common.rating')}
          />
          <View style={styles.statDivider} />
          <Stat
            value={`${earnings.totalTrips ?? profile.totalTrips ?? 0}`}
            label={t('profile.trips')}
          />
          <View style={styles.statDivider} />
          <Stat
            value={`${formatNumber(earnings.total)} F`}
            label={t('profile.earnings')}
          />
        </View>
      </Card>

      {vehicle ? (
        <Card shadow={false} style={styles.vehicleCard} padding={0}>
          <View style={styles.vehicleIcon}>
            <CarIcon size={moderateScale(22)} color={THEME.primary} />
          </View>
          <View style={profileStyles.profileInfo}>
            <RNText font="bold" size={14} color={THEME.text}>
              {vehicle.model || t('vehicle.yourVehicle')}
            </RNText>
            <RNText
              size={12}
              color={THEME.textSecondary}
              style={{ marginTop: moderateScale(2) }}
            >
              {[vehicle.registration, vehicle.type].filter(Boolean).join(' • ') ||
                t('vehicle.vehicleDetails')}
            </RNText>
          </View>
        </Card>
      ) : null}

      <Card shadow={false} style={[profileStyles.profileCard, styles.verifyCard]} padding={0}>
        <View style={profileStyles.verifyList}>
          <VerifyRow verified label={t('profile.govtIdVerified')} />
          <VerifyRow verified label={t('profile.phoneVerified')} />
          <VerifyRow verified={false} label={t('profile.verifyEmail')} />
        </View>
      </Card>

      <MenuSection title={t('profile.accountSettings')}>
        <MenuRow
          icon={<UserCircleIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.editProfile')}
          onPress={() => nav.navigate(RouteKey.EditProfile)}
        />
        <MenuRow
          icon={<CarIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.vehicleInformation')}
          onPress={() => nav.navigate(RouteKey.ManageVehicle)}
        />
        <MenuRow
          icon={<CardIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.drivingLicense')}
          onPress={() => nav.navigate(RouteKey.ManageLicense)}
        />
        <MenuRow
          icon={<DollarCircleIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.myEarnings')}
          onPress={() => nav.navigate(RouteKey.MyEarnings)}
        />
        <MenuRow
          icon={<BellIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.notifications')}
          onPress={() => nav.navigate(RouteKey.Notifications)}
        />
        <MenuRow
          icon={<StarOutlineIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.ratings')}
          onPress={() => nav.navigate(RouteKey.Ratings)}
          last
        />
      </MenuSection>

      <MenuSection title={t('profile.securityPrivacy')}>
        <MenuRow
          icon={<GlobeIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.language')}
          onPress={() => nav.navigate(RouteKey.LanguageSettings)}
        />
        <MenuRow
          icon={<ShieldKeyIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.privacyPolicy')}
          onPress={() => nav.navigate(RouteKey.PrivacyPolicy)}
        />
        <MenuRow
          icon={<FileTextIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.termsConditions')}
          onPress={() => nav.navigate(RouteKey.TermsConditions)}
        />
        <MenuRow
          icon={<HeadphonesIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.helpSupport')}
          onPress={() => nav.navigate(RouteKey.HelpSupport)}
          last
        />
      </MenuSection>
    </>
  );
};

const Stat = ({
  icon,
  value,
  label,
}: {
  icon?: React.ReactNode;
  value: string;
  label: string;
}) => (
  <View style={styles.stat}>
    <View style={styles.statValue}>
      {icon}
      <RNText
        font="bold"
        size={16}
        color={THEME.text}
        style={icon ? { marginLeft: moderateScale(4) } : undefined}
      >
        {value}
      </RNText>
    </View>
    <RNText
      font="medium"
      size={12}
      color={THEME.textSecondary}
      style={{ marginTop: moderateScale(2) }}
    >
      {label}
    </RNText>
  </View>
);

export default DriverProfile;

const styles = StyleSheet.create({
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: moderateScale(6),
    paddingVertical: moderateScale(3),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(999),
    backgroundColor: THEME.successLight,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(16),
    paddingTop: moderateScale(16),
    borderTopWidth: 1,
    borderTopColor: THEME.divider,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: moderateScale(28),
    backgroundColor: THEME.divider,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(44, 26, 14, 0.1)',
    marginTop: moderateScale(12),
  },
  vehicleIcon: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(12),
    backgroundColor: THEME.primaryFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyCard: {
    marginTop: moderateScale(12),
  },
});
