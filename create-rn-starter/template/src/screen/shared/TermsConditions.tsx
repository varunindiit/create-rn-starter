import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { Card, Header, MainContainer, RNText } from '../../components';
import { SPACING, THEME } from '../../theme';
import { useLanguage } from '../../localization';
import { FileTextIcon } from '../../components/Icon/SvgIcons';

interface Term {
  title: string;
  body: string;
}

const TERMS: Term[] = [
  {
    title: 'Acceptance of Terms',
    body: 'By downloading, accessing, or using HD WAKA, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the platform.',
  },
  {
    title: 'Account Registration',
    body: 'You must provide accurate, current and complete information when creating an account. You are responsible for safeguarding your password and for any activities or actions under your account.',
  },
  {
    title: 'Use of the Service',
    body: 'HD WAKA connects passengers with independent drivers for ride-sharing services. The platform is for personal, non-commercial use unless explicitly authorised. You agree not to misuse the service in any way.',
  },
  {
    title: 'Bookings & Payments',
    body: 'When booking a ride, you agree to pay the displayed fare including applicable taxes and service fees. Payments are processed through our secure third-party providers. Cash payments may be offered for specific routes at the driver’s discretion.',
  },
  {
    title: 'Cancellations & Refunds',
    body: 'You may cancel a booking before the driver arrives. Late cancellations or no-shows may incur a fee. Refunds for eligible cancellations are processed back to the original payment method within 5–7 business days.',
  },
  {
    title: 'User Conduct',
    body: 'You agree to treat drivers and other passengers with respect, follow safety guidelines, and not engage in unlawful, abusive or disruptive behaviour. Violations may result in suspension or permanent account termination.',
  },
  {
    title: 'Driver Responsibilities',
    body: 'Drivers must hold a valid licence, maintain a roadworthy vehicle, and comply with all traffic laws. HD WAKA reserves the right to verify documents, conduct background checks and remove drivers who breach platform policies.',
  },
  {
    title: 'Liability & Disclaimers',
    body: 'HD WAKA acts as a technology platform connecting users. We are not a transportation provider and are not liable for any loss, injury or damage arising from a trip, except to the extent required by law.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content, logos, trademarks and software within HD WAKA are the exclusive property of the company or its licensors. You may not copy, modify or distribute any part of the service without prior written consent.',
  },
  {
    title: 'Account Termination',
    body: 'We may suspend or terminate your access at any time for breach of these Terms, fraudulent activity, or actions that pose risk to other users. You may close your account at any time from the Profile screen.',
  },
  {
    title: 'Changes to Terms',
    body: 'We may update these Terms periodically. Material changes will be communicated through the app or via email. Your continued use of HD WAKA following any update constitutes acceptance of the revised Terms.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms are governed by the laws of the country in which the service is offered, without regard to its conflict-of-law principles. Any disputes shall be resolved in the competent local courts.',
  },
];

const TermsConditions: React.FC = () => {
  const { t } = useLanguage();
  return (
    <MainContainer
      gradient
      gradientColors={['#FBE3CD', '#FFF6EC', '#FFFFFF']}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 0, y: 0.45 }}
    >
      <Header title={t('profile.termsConditions')} safeArea={false} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#2C1A0E', '#4A2C16']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBox}
        >
          <View style={styles.hero}>
            <View style={styles.heroIconWrap}>
              <FileTextIcon size={moderateScale(28)} color="#FFFFFF" />
            </View>
            <RNText
              font="bold"
              size={20}
              color="#FFFFFF"
              style={styles.heroTitle}
            >
              Terms & Conditions
            </RNText>
            <RNText
              size={13}
              color="rgba(255,255,255,0.85)"
              style={styles.heroSubtitle}
              lineHeight={moderateScale(19)}
            >
              Please review these terms carefully — they govern your use of HD
              WAKA and the rides booked through our platform.
            </RNText>
            <View style={styles.heroFooter}>
              <View style={styles.versionPill}>
                <RNText font="medium" size={11} color="#FFFFFF">
                  Version 2.4
                </RNText>
              </View>
              <RNText size={11} color="rgba(255,255,255,0.72)">
                Effective · May 12, 2026
              </RNText>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.tocCard}>
          <RNText
            font="semibold"
            size={13}
            color={THEME.labelBrown}
            style={styles.tocLabel}
          >
            AGREEMENT BETWEEN YOU AND HD WAKA
          </RNText>
          <RNText
            size={13}
            color={THEME.textSecondary}
            lineHeight={moderateScale(20)}
          >
            By using the HD WAKA application, you agree to comply with and be
            legally bound by the terms below. They cover your rights, our
            responsibilities, payments, conduct and how disputes are resolved.
          </RNText>
        </View>

        {TERMS.map((term, idx) => (
          <TermCard
            key={term.title}
            index={idx + 1}
            title={term.title}
            body={term.body}
          />
        ))}

        <Card
          padding={moderateScale(16)}
          style={styles.contactCard}
          shadow={false}
        >
          <RNText
            font="semibold"
            size={14}
            color={THEME.text}
            style={styles.contactTitle}
          >
            Need more clarity?
          </RNText>
          <RNText
            size={13}
            color={THEME.textSecondary}
            lineHeight={moderateScale(20)}
          >
            Our support team is happy to walk you through any clause. Reach us
            at{' '}
            <RNText font="semibold" size={13} color={THEME.primary}>
              legal@hdwaka.com
            </RNText>
            .
          </RNText>
        </Card>
      </ScrollView>
    </MainContainer>
  );
};

const TermCard: React.FC<{
  index: number;
  title: string;
  body: string;
}> = ({ index, title, body }) => (
  <View style={styles.termCard}>
    <View style={styles.termHead}>
      <View style={styles.indexBadge}>
        <RNText font="bold" size={12} color="#FFFFFF">
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
    </View>
    <RNText
      size={13}
      color={THEME.textSecondary}
      lineHeight={moderateScale(20)}
      style={styles.termBody}
    >
      {body}
    </RNText>
  </View>
);

export default TermsConditions;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  contactTitle: {
    marginBottom: moderateScale(6),
  },
  scroll: {
    paddingHorizontal: SPACING.hPadding,
    paddingBottom: moderateScale(48),
    paddingTop: moderateScale(6),
  },
  heroBox: {
    borderRadius: moderateScale(22),
  },
  hero: {
    borderRadius: moderateScale(22),
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(22),
    paddingBottom: moderateScale(20),
    overflow: 'hidden',
    shadowColor: '#2C1A0E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 4,
  },
  heroIconWrap: {
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(14),
  },
  heroTitle: {
    marginBottom: moderateScale(6),
  },
  heroSubtitle: {
    marginBottom: moderateScale(16),
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  versionPill: {
    backgroundColor: THEME.primary,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(999),
  },
  tocCard: {
    marginTop: moderateScale(18),
    backgroundColor: THEME.surface,
    borderRadius: moderateScale(18),
    padding: moderateScale(16),
    borderLeftWidth: moderateScale(3),
    borderLeftColor: THEME.primary,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(44,26,14,0.06)',
    borderRightColor: 'rgba(44,26,14,0.06)',
    borderBottomColor: 'rgba(44,26,14,0.06)',
  },
  tocLabel: {
    letterSpacing: 1,
    marginBottom: moderateScale(8),
  },
  termCard: {
    marginTop: moderateScale(14),
    backgroundColor: THEME.surface,
    borderRadius: moderateScale(18),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(44,26,14,0.06)',
  },
  termHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  indexBadge: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(10),
    backgroundColor: THEME.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  termBody: {},
  contactCard: {
    marginTop: moderateScale(20),
    borderWidth: 1,
    borderColor: 'rgba(232,124,62,0.18)',
    backgroundColor: THEME.primaryFaint,
  },
});
