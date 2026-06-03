import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { Card, Header, MainContainer, RNText } from '../../components';
import { SPACING, THEME } from '../../theme';
import { useLanguage } from '../../localization';
import { ShieldCheckIcon, PrivacyIcon } from '../../components/Icon/SvgIcons';

interface Section {
  title: string;
  body: string;
}

const SECTIONS: Section[] = [
  {
    title: 'Information We Collect',
    body: 'When you use HD WAKA we collect information you provide directly — your name, phone number, email, profile photo, government ID and payment details. We also collect data automatically while you use the app, including device information, approximate and precise location, ride history and in-app interactions.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your information helps us match you with rides, verify driver and passenger identities, process payments, prevent fraud, and improve safety. We also use it to personalise your experience, send service updates, and ensure compliance with applicable laws.',
  },
  {
    title: 'Sharing & Disclosure',
    body: 'We share limited information with drivers or passengers to complete a trip, with payment partners to process transactions, and with trusted service providers under strict confidentiality. We never sell your personal data to advertisers.',
  },
  {
    title: 'Data Security',
    body: 'We protect your data with industry-standard encryption in transit and at rest, restricted access controls, continuous monitoring, and regular security audits. While no system is perfectly secure, we work hard to safeguard your information.',
  },
  {
    title: 'Your Rights & Choices',
    body: 'You can access, update, or delete your account information at any time from the Profile section. You may also opt out of marketing communications, manage notification preferences, and request a copy of your data by contacting our support team.',
  },
  {
    title: 'Location Data',
    body: 'Location is core to HD WAKA. We collect it only when the app is in use or as you’ve allowed in your device settings. You can disable location at any time, although certain features such as ride booking will not work without it.',
  },
  {
    title: 'Children’s Privacy',
    body: 'HD WAKA is not intended for users under 18. We do not knowingly collect personal information from children. If you believe a child has provided us data, please contact us so we can remove it.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. When we do, we’ll notify you in the app and update the “Last Updated” date below. Continued use of HD WAKA after changes means you accept the revised policy.',
  },
];

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  return (
    <MainContainer
      gradient
      gradientColors={['#FBE3CD', '#FFF6EC', '#FFFFFF']}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 0, y: 0.45 }}
    >
      <Header title={t('profile.privacyPolicy')} safeArea={false} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#E87C3E', '#F08F4E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{borderRadius: moderateScale(22),}}
        >
          <View style={styles.hero}>
            <View style={styles.heroIconWrap}>
              <PrivacyIcon size={moderateScale(30)} color="#FFFFFF" />
            </View>
            <RNText
              font="bold"
              size={20}
              color="#FFFFFF"
              style={styles.heroTitle}
            >
              Your Privacy Matters
            </RNText>
            <RNText
              size={13}
              color="rgba(255,255,255,0.92)"
              style={styles.heroSubtitle}
              lineHeight={moderateScale(19)}
            >
              We’re committed to keeping your data safe and being transparent
              about how we use it.
            </RNText>
            <View style={styles.updatedPill}>
              <View style={styles.updatedDot} />
              <RNText font="medium" size={11} color="#FFFFFF">
                Last Updated · May 12, 2026
              </RNText>
            </View>
          </View>
        </LinearGradient>

        <Card padding={moderateScale(16)} style={styles.introCard} shadow>
          <View style={styles.introRow}>
            <View style={styles.introIcon}>
              <ShieldCheckIcon size={moderateScale(18)} color={THEME.primary} />
            </View>
            <RNText
              font="semibold"
              size={14}
              color={THEME.text}
              style={styles.flexOne}
            >
              Overview
            </RNText>
          </View>
          <RNText
            size={13}
            color={THEME.textSecondary}
            lineHeight={moderateScale(20)}
            style={styles.introBody}
          >
            This Privacy Policy explains what information HD WAKA collects when
            you use our ride-sharing platform, how we use it, and the choices
            you have. Please read it carefully — it’s your guide to staying in
            control of your information.
          </RNText>
        </Card>

        {SECTIONS.map((section, idx) => (
          <SectionCard
            key={section.title}
            index={idx + 1}
            title={section.title}
            body={section.body}
          />
        ))}

        <View style={styles.footer}>
          <RNText
            size={12}
            color={THEME.textMuted}
            textAlign="center"
            lineHeight={moderateScale(18)}
          >
            Questions about this policy? Reach our team at{'\n'}
            <RNText font="semibold" size={12} color={THEME.primary}>
              privacy@hdwaka.com
            </RNText>
          </RNText>
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const SectionCard: React.FC<{
  index: number;
  title: string;
  body: string;
}> = ({ index, title, body }) => (
  <Card padding={moderateScale(16)} style={styles.sectionCard} shadow={false}>
    <View style={styles.sectionHead}>
      <View style={styles.indexBadge}>
        <RNText font="bold" size={12} color={THEME.primary}>
          {String(index).padStart(2, '0')}
        </RNText>
      </View>
      <RNText
        font="semibold"
        size={15}
        color={THEME.text}
        style={styles.flexOne}
      >
        {title}
      </RNText>
      <CheckTick size={moderateScale(16)} />
    </View>
    <RNText
      size={13}
      color={THEME.textSecondary}
      lineHeight={moderateScale(20)}
      style={styles.sectionBody}
    >
      {body}
    </RNText>
  </Card>
);

const CheckTick: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 1.67A8.33 8.33 0 1 0 18.33 10 8.34 8.34 0 0 0 10 1.67Zm3.92 6.92-4.58 4.58a.75.75 0 0 1-1.06 0L6.08 11A.75.75 0 0 1 7.14 9.94l1.67 1.67 4.05-4.05a.75.75 0 1 1 1.06 1.06Z"
      fill={THEME.primary}
    />
  </Svg>
);

export default PrivacyPolicy;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: SPACING.hPadding,
    paddingBottom: moderateScale(48),
    paddingTop: moderateScale(6),
  },
  hero: {
    borderRadius: moderateScale(22),
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(22),
    paddingBottom: moderateScale(20),
    overflow: 'hidden',
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 4,
  },
  heroIconWrap: {
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(14),
  },
  heroTitle: {
    marginBottom: moderateScale(6),
  },
  heroSubtitle: {
    marginBottom: moderateScale(16),
    maxWidth: '92%',
  },
  updatedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(999),
  },
  updatedDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#FFFFFF',
    marginRight: moderateScale(8),
  },
  introCard: {
    marginTop: moderateScale(18),
    borderWidth: 1,
    borderColor: 'rgba(232,124,62,0.14)',
  },
  introRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  introIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(10),
    backgroundColor: THEME.primaryFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  introBody: {},
  sectionCard: {
    marginTop: moderateScale(14),
    borderWidth: 1,
    borderColor: 'rgba(44,26,14,0.06)',
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  indexBadge: {
    width: moderateScale(34),
    height: moderateScale(28),
    borderRadius: moderateScale(8),
    backgroundColor: THEME.primaryFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  sectionBody: {},
  footer: {
    marginTop: moderateScale(28),
    alignItems: 'center',
  },
});
