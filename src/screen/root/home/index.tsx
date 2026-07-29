import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {useIsOnline} from '../../../hooks/useNetworkStatus';
import {useLanguage} from '../../../localization';
import {SIZES, SPACING} from '../../../theme/spacing';
import {useTheme} from '../../../theme/ThemeProvider';
import MainContainer from '../../../components/Container/MainContainer';
import RNText from '../../../components/Text/RNText';
import Card from '../../../components/Common/Card';
import StatusBadge from '../../../components/Common/StatusBadge';

const Home = () => {
  const {t} = useLanguage();
  const {colors} = useTheme();
  const isOnline = useIsOnline();
  const profile = useAppSelector(state => state.userProfile.profile);

  return (
    <MainContainer testID="home-screen" edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <RNText size={13} color={colors.textSecondary}>
              {t('home.greeting', {name: profile.fullName})}
            </RNText>
            <RNText font="bold" size={24} accessibilityRole="header">
              {t('home.title')}
            </RNText>
          </View>
          <StatusBadge
            testID="home-connectivity"
            label={isOnline ? t('common.online') : t('common.offline')}
            tone={isOnline ? 'success' : 'warning'}
          />
        </View>

        <Card testID="home-getting-started" style={styles.card}>
          <RNText font="semibold" size={16}>
            {t('home.startTitle')}
          </RNText>
          <RNText
            size={13}
            color={colors.textSecondary}
            style={styles.cardBody}>
            {t('home.startBody')}
          </RNText>
        </Card>
      </ScrollView>
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.hPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SIZES.tabBarHeight + SPACING.xxxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  headerText: {flex: 1},
  card: {marginTop: SPACING.xl},
  cardBody: {marginTop: SPACING.xs},
});
