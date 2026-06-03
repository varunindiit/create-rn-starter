import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import {
  BottomSheetAlert,
  MainContainer,
  RNText,
  Toggle,
} from '../../components';
import { THEME } from '../../theme';
import { LogoutIcon } from '../../components/Icon/SvgIcons';
import { RootState } from '../../redux/store';
import { resetAuthState, setRole } from '../../redux/slice/auth';
import { useLanguage } from '../../localization';
import DriverProfile from './profile/DriverProfile';
import PassengerProfile from './profile/PassengerProfile';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { role } = useSelector((s: RootState) => s.auth);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const isDriver = role === 'driver';

  const switchRole = () => {
    dispatch(setRole(isDriver ? 'passenger' : 'driver'));
  };

  return (
    <MainContainer
      gradient
      gradientColors={['#FBE3CD', '#FFF6EC', '#FFFFFF']}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 0, y: 0.45 }}
    >
      <View style={styles.headerRow}>
        <RNText font="bold" size={24} color={THEME.text}>
          {t('profile.title')}
        </RNText>
        <View style={styles.headerRight}>
          <RNText font="semibold" size={13} color={THEME.text}>
            {isDriver ? t('role.switchToPassenger') : t('role.switchToDriver')}
          </RNText>
          <Toggle value={isDriver} onChange={switchRole} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {isDriver ? <DriverProfile /> : <PassengerProfile />}

        <TouchableOpacity
          style={styles.logoutRow}
          activeOpacity={0.7}
          onPress={() => setLogoutOpen(true)}
        >
          <LogoutIcon size={moderateScale(20)} color={THEME.danger} />
          <RNText
            font="semibold"
            size={15}
            color={THEME.danger}
            style={styles.logoutLabel}
          >
            {t('profile.logOut')}
          </RNText>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheetAlert
        visible={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title={t('profile.logOut')}
        description={t('profile.logOutConfirm')}
        confirmText={t('profile.logOut')}
        cancelText={t('common.cancel')}
        destructive
        onConfirm={() => {
          setLogoutOpen(false);
          dispatch(resetAuthState());
        }}
      />
    </MainContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    paddingBottom: moderateScale(12),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  scroll: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(120),
    paddingTop: moderateScale(12),
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(16),
    paddingLeft: moderateScale(6),
    marginTop: moderateScale(6),
  },
  logoutLabel: { marginLeft: moderateScale(12) },
});
