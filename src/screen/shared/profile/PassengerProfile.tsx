import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { Avatar, Card, RNText } from '../../../components';
import { THEME } from '../../../theme';
import {
  BellIcon,
  CardIcon,
  FileTextIcon,
  GlobeIcon,
  HeadphonesIcon,
  ShieldKeyIcon,
  UserCircleIcon,
} from '../../../components/Icon/SvgIcons';
import { RootState } from '../../../redux/store';
import { useLanguage } from '../../../localization';
import RouteKey from '../../../navigation/RouteKey';
import {
  MenuRow,
  MenuSection,
  profileStyles,
  SolidStarIcon,
  StarOutlineIcon,
  VerifyRow,
} from './ProfileParts';

const PassengerProfile: React.FC = () => {
  const nav = useNavigation<any>();
  const { t } = useLanguage();
  const profile = useSelector((s: RootState) => s.userProfile.profile);

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
            <View style={profileStyles.ratingRow}>
              <SolidStarIcon size={moderateScale(13)} color={THEME.star} />
              <RNText
                font="medium"
                size={13}
                color={THEME.text}
                style={{ marginLeft: moderateScale(4) }}
              >
                {(profile.rating ?? 0).toFixed(1)}
              </RNText>
            </View>
          </View>
        </View>

        <View style={profileStyles.cardDivider} />

        <View style={profileStyles.verifyList}>
          <VerifyRow verified={false} label={t('profile.verifyGovtId')} />
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
          icon={<CardIcon size={moderateScale(20)} color={THEME.text} />}
          label={t('profile.paymentMethods')}
          onPress={() =>
            nav.navigate(RouteKey.PaymentMethod, { mode: "manage" })
          }
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

export default PassengerProfile;
