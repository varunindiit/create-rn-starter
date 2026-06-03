import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';

import { Header, MainContainer, RNButton, RNText } from '../../components';
import { CheckIcon } from '../../components/Icon/SvgIcons';
import { FONT_SIZE, SPACING, THEME } from '../../theme';
import { useLanguage } from '../../localization';
import { LanguageCode, LanguageOption } from '../../localization/languages';

const LOGO = require('../../assets/image/logo.png');

interface LanguageSelectionProps {
  /** "onboarding" = first-launch step, "settings" = change later */
  route?: { params?: { mode?: 'onboarding' | 'settings' } };
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ route }) => {
  const mode = route?.params?.mode ?? 'onboarding';
  const isOnboarding = mode === 'onboarding';

  const { t, current, languages, changeLanguage } = useLanguage();
  const [selected, setSelected] = useState<LanguageCode>(current);

  const onCardPress = (lang: LanguageOption) => {
    setSelected(lang.code);
    if (!isOnboarding && lang.code !== current) {
      // Settings mode applies instantly across the whole app.
      changeLanguage(lang.code);
      showMessage({
        message: t('language.changedTo', { language: lang.nativeLabel }),
        type: 'success',
      });
    }
  };

  const onContinue = () => {
    changeLanguage(selected, { markSelected: true });
    // Onboarding gate (StackNavigation) re-renders into the app automatically.
  };

  return (
    <MainContainer gradient statusBarStyle="light-content">
      {!isOnboarding && (
        <Header title={t('language.settingsTitle')} safeArea={false} />
      )}

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {isOnboarding && (
          <View style={styles.brand}>
            <View style={styles.logoWrap}>
              <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            </View>
          </View>
        )}

        <View style={styles.titleBlock}>
          <RNText font="bold" size={FONT_SIZE.h4} color={THEME.text}>
            {isOnboarding
              ? t('language.onboardingTitle')
              : t('language.settingsTitle')}
          </RNText>
          <RNText
            size={FONT_SIZE.base}
            color={THEME.textSecondary}
            style={styles.subtitle}
          >
            {isOnboarding
              ? t('language.onboardingSubtitle')
              : t('language.settingsSubtitle')}
          </RNText>
        </View>

        <View style={styles.list}>
          {languages.map(lang => (
            <LanguageCard
              key={lang.code}
              lang={lang}
              active={selected === lang.code}
              onPress={() => onCardPress(lang)}
            />
          ))}
        </View>
      </ScrollView>

      {isOnboarding && (
        <View style={styles.footer}>
          <RNButton title={t('common.continue')} onPress={onContinue} />
        </View>
      )}
    </MainContainer>
  );
};

const LanguageCard: React.FC<{
  lang: LanguageOption;
  active: boolean;
  onPress: () => void;
}> = ({ lang, active, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={[styles.card, active && styles.cardActive]}
  >
    <View style={styles.flagWrap}>
      <RNText size={moderateScale(26)}>{lang.flag}</RNText>
    </View>
    <View style={styles.cardText}>
      <RNText font="semibold" size={FONT_SIZE.xl} color={THEME.text}>
        {lang.nativeLabel}
      </RNText>
      <RNText
        size={FONT_SIZE.sm}
        color={THEME.textSecondary}
        style={styles.cardSub}
      >
        {lang.englishLabel}
      </RNText>
    </View>
    <View style={[styles.radio, active && styles.radioActive]}>
      {active ? (
        <CheckIcon size={moderateScale(14)} color={THEME.textOnPrimary} />
      ) : null}
    </View>
  </TouchableOpacity>
);

export default LanguageSelection;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.hPadding,
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(24),
  },
  brand: {
    alignItems: 'center',
    marginTop: moderateScale(24),
    marginBottom: moderateScale(28),
  },
  logoWrap: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(28),
    backgroundColor: THEME.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  logo: {
    width: moderateScale(64),
    height: moderateScale(64),
  },
  titleBlock: {
    marginBottom: moderateScale(24),
  },
  subtitle: {
    marginTop: moderateScale(8),
    lineHeight: moderateScale(20),
  },
  list: {
    gap: moderateScale(14),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.surface,
    borderRadius: moderateScale(18),
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    borderWidth: 1.5,
    borderColor: THEME.border,
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  cardActive: {
    borderColor: THEME.primary,
    backgroundColor: THEME.primaryFaint,
  },
  flagWrap: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(14),
    backgroundColor: THEME.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    marginLeft: moderateScale(14),
  },
  cardSub: {
    marginTop: moderateScale(2),
  },
  radio: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: THEME.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  footer: {
    paddingHorizontal: SPACING.hPadding,
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(8),
  },
});
