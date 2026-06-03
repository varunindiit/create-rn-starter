import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Divider,
  Header,
  MainContainer,
  RNText,
  Toggle,
} from '../../components';
import { moderateScale } from 'react-native-size-matters';
import { THEME, SPACING, FONT_SIZE } from '../../theme';
import { RootState } from '../../redux/store';
import { setNotificationPref } from '../../redux/slice/app';
import { useLanguage } from '../../localization';

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const prefs = useSelector((s: RootState) => s.app.notificationsEnabled);
  return (
    <MainContainer gradient statusBarStyle="dark-content">
      <Header title={t('notifications.title')} safeArea={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card padding={0}>
          <Row
            label={t('notifications.push')}
            value={prefs.push}
            onChange={v => dispatch(setNotificationPref({ push: v }))}
          />
          <Divider />
          <Row
            label={t('notifications.email')}
            value={prefs.email}
            onChange={v => dispatch(setNotificationPref({ email: v }))}
          />
          <Divider />
          <Row
            label={t('notifications.sms')}
            value={prefs.sms}
            onChange={v => dispatch(setNotificationPref({ sms: v }))}
          />
        </Card>
      </ScrollView>
    </MainContainer>
  );
};

const Row = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <View style={styles.row}>
    <RNText
      font="medium"
      size={FONT_SIZE.base}
      color={THEME.text}
      style={styles.rowLabel}
    >
      {label}
    </RNText>
    <Toggle value={value} onChange={onChange} />
  </View>
);

export default Notifications;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: SPACING.hPadding,
    paddingBottom: moderateScale(60),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  rowLabel: { flex: 1 },
});
