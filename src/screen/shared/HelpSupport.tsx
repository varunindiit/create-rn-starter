import React, { useState } from 'react';
import {
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import {
  Card,
  Header,
  MainContainer,
  RNButton,
  RNText,
} from '../../components';
import { SPACING, THEME } from '../../theme';
import { useLanguage } from '../../localization';
import {
  HeadphonesIcon,
  QuestionIcon,
  MailIcon,
  PhoneIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MessageIcon,
} from '../../components/Icon/SvgIcons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SUPPORT_PHONE = '+2348000000000';
const SUPPORT_EMAIL = 'support@hdwaka.com';

interface QuickAction {
  key: string;
  title: string;
  subtitle: string;
  gradient: [string, string];
  icon: (size: number) => React.ReactNode;
  onPress?: () => void;
}

interface Faq {
  q: string;
  a: string;
}

const FAQS: Faq[] = [
  {
    q: 'How do I book a ride on HD WAKA?',
    a: 'Enter your pickup and drop-off locations on the Home screen, choose a ride from the available results, review the trip details and tap Book. You’ll get a confirmation as soon as the driver accepts.',
  },
  {
    q: 'How can I cancel a ride?',
    a: 'Open Trips, select the active booking, and tap Cancel Ride. Cancellations made before the driver arrives are free; late cancellations may incur a small fee.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'HD WAKA supports debit and credit cards, bank transfers, mobile wallets, and cash for select routes. You can manage your saved methods in Profile › Payments.',
  },
  {
    q: 'How do I become a driver?',
    a: 'Switch your account role to Driver from the Profile screen, then upload your vehicle, licence and personal documents. Our team verifies submissions within 24–48 hours.',
  },
  {
    q: 'How are fares calculated?',
    a: 'Fares are based on distance, estimated time, demand and any active surcharges. The full breakdown is shown before you confirm the booking — no hidden fees.',
  },
  {
    q: 'Is my data safe with HD WAKA?',
    a: 'Yes. All your personal and payment information is encrypted in transit and at rest, and we never share it with third parties without your consent.',
  },
];

const HelpSupport: React.FC = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(220, 'easeInEaseOut', 'opacity'),
    );
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  const callSupport = () => Linking.openURL(`tel:${SUPPORT_PHONE}`);
  const emailSupport = () => Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  const openWhatsApp = () =>
    Linking.openURL(
      `https://wa.me/${SUPPORT_PHONE.replace('+', '')}?text=Hi%20HD%20WAKA%20support`,
    );

  const QUICK_ACTIONS: QuickAction[] = [
    {
      key: 'chat',
      title: t('help.liveChat'),
      subtitle: 'Avg reply · 2 min',
      gradient: ['#E87C3E', '#F08F4E'],
      icon: size => <MessageIcon size={size} color="#FFFFFF" />,
      onPress: openWhatsApp,
    },
    {
      key: 'faqs',
      title: t('help.faqs'),
      subtitle: 'Find quick answers',
      gradient: ['#3F8CFF', '#6BA4FF'],
      icon: size => <QuestionIcon size={size} color="#FFFFFF" />,
    },
    {
      key: 'report',
      title: t('help.reportIssue'),
      subtitle: 'We’re on it',
      gradient: ['#E5484D', '#F26E72'],
      icon: size => <ReportFlagIcon size={size} color="#FFFFFF" />,
      onPress: emailSupport,
    },
    {
      key: 'email',
      title: t('help.emailUs'),
      subtitle: 'Reply within 24h',
      gradient: ['#1FA971', '#3FCC8A'],
      icon: size => <MailIcon size={size} color="#FFFFFF" />,
      onPress: emailSupport,
    },
  ];

  return (
    <MainContainer
      gradient
      statusBarStyle="dark-content"
    >
      <Header title={t('help.title')} safeArea={false} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#E87C3E', '#F08F4E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
         <View style={styles.hero}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroIconWrap}>
              <HeadphonesIcon size={moderateScale(26)} color="#FFFFFF" />
            </View>
            <View style={styles.onlinePill}>
              <View style={styles.onlineDot} />
              <RNText font="medium" size={11} color="#FFFFFF">
                Online · 24/7
              </RNText>
            </View>
          </View>
          <RNText
            font="bold"
            size={22}
            color="#FFFFFF"
            style={styles.heroTitle}
          >
            {t('help.heroTitle')}
          </RNText>
          <RNText
            size={13}
            color="rgba(255,255,255,0.9)"
            lineHeight={moderateScale(19)}
            style={styles.heroSubtitle}
          >
            Our support team is here around the clock to make your HD WAKA
            experience smooth, safe and stress-free.
          </RNText>

          <Pressable onPress={callSupport} style={styles.heroCta}>
            <PhoneIcon size={moderateScale(16)} color={THEME.primary} />
            <RNText
              font="semibold"
              size={13}
              color={THEME.primary}
              style={styles.heroCtaLabel}
            >
              Call support now
            </RNText>
          </Pressable>
         </View>
        </LinearGradient>

        <RNText
          font="semibold"
          size={15}
          color={THEME.text}
          style={styles.sectionTitle}
        >
          {t('help.quickActions')}
        </RNText>

        <View style={styles.grid}>
          {QUICK_ACTIONS.map(action => (
            <QuickActionCard key={action.key} action={action} />
          ))}
        </View>

        <View style={styles.sectionHeadRow}>
          <RNText font="semibold" size={15} color={THEME.text}>
            Frequently asked
          </RNText>
          <RNText size={12} color={THEME.textMuted}>
            {FAQS.length} topics
          </RNText>
        </View>

        <View style={styles.faqList}>
          {FAQS.map((faq, idx) => (
            <FaqItem
              key={faq.q}
              open={openIdx === idx}
              onPress={() => toggle(idx)}
              q={faq.q}
              a={faq.a}
              last={idx === FAQS.length - 1}
            />
          ))}
        </View>

        <RNText
          font="semibold"
          size={15}
          color={THEME.text}
          style={styles.sectionTitle}
        >
          {t('help.contactDetails')}
        </RNText>

        <Card padding={0} style={styles.contactCard} shadow={false}>
          <ContactRow
            label={t('common.email')}
            value={SUPPORT_EMAIL}
            onPress={emailSupport}
            icon={
              <View
                style={[styles.contactIcon, styles.contactIconSuccess]}
              >
                <MailIcon
                  size={moderateScale(18)}
                  color={THEME.success}
                />
              </View>
            }
          />
          <View style={styles.contactDivider} />
          <ContactRow
            label={t('common.phone')}
            value="+234 800 000 0000"
            onPress={callSupport}
            icon={
              <View
                style={[styles.contactIcon, styles.contactIconPrimary]}
              >
                <PhoneIcon
                  size={moderateScale(18)}
                  color={THEME.primary}
                />
              </View>
            }
          />
          <View style={styles.contactDivider} />
          <ContactRow
            label={t('help.officeHours')}
            value={t('help.officeHoursValue')}
            icon={
              <View
                style={[styles.contactIcon, styles.contactIconWarning]}
              >
                <ClockIcon
                  size={moderateScale(18)}
                  color={THEME.warning}
                />
              </View>
            }
            chevron={false}
          />
        </Card>

        <View style={styles.bottomCta}>
          <RNText
            font="semibold"
            size={15}
            color={THEME.text}
            textAlign="center"
            style={styles.bottomCtaTitle}
          >
            {t('help.stillNeedHelp')}
          </RNText>
          <RNText
            size={12}
            color={THEME.textMuted}
            textAlign="center"
            lineHeight={moderateScale(18)}
            style={styles.bottomCtaSubtitle}
          >
            Send us a detailed message and we’ll get back within 24 hours.
          </RNText>
          <RNButton title={t('help.emailSupport')} onPress={emailSupport} />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const QuickActionCard: React.FC<{ action: QuickAction }> = ({ action }) => (
  <TouchableOpacity
    style={styles.actionShell}
    onPress={action.onPress}
    activeOpacity={0.85}
  >
    <LinearGradient
      colors={action.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.actionGradient}
    >
     <View style={styles.actionCard}>
      <View style={styles.actionIconWrap}>
        {action.icon(moderateScale(22))}
      </View>
      <RNText
        font="bold"
        size={15}
        color="#FFFFFF"
        style={styles.actionTitle}
      >
        {action.title}
      </RNText>
      <RNText
        size={11}
        color="rgba(255,255,255,0.85)"
        style={styles.actionSubtitle}
      >
        {action.subtitle}
      </RNText>
     </View>
    </LinearGradient>
  </TouchableOpacity>
);

const FaqItem: React.FC<{
  open: boolean;
  onPress: () => void;
  q: string;
  a: string;
  last?: boolean;
}> = ({ open, onPress, q, a, last }) => (
  <TouchableOpacity
    activeOpacity={0.75}
    onPress={onPress}
    style={[styles.faqItem, !last && styles.faqBorder]}
  >
    <View style={styles.faqRow}>
      <RNText
        font="semibold"
        size={14}
        color={THEME.text}
        style={styles.faqQuestion}
      >
        {q}
      </RNText>
      <View
        style={[
          styles.faqChevron,
          {
            backgroundColor: open ? THEME.primary : THEME.primaryFaint,
          },
        ]}
      >
        {open ? (
          <ChevronUpIcon size={moderateScale(14)} color="#FFFFFF" />
        ) : (
          <ChevronDownIcon size={moderateScale(14)} color={THEME.primary} />
        )}
      </View>
    </View>
    {open ? (
      <RNText
        size={13}
        color={THEME.textSecondary}
        lineHeight={moderateScale(20)}
        style={styles.faqAnswer}
      >
        {a}
      </RNText>
    ) : null}
  </TouchableOpacity>
);

const ContactRow: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
  onPress?: () => void;
  chevron?: boolean;
}> = ({ label, value, icon, onPress, chevron = true }) => (
  <TouchableOpacity
    style={styles.contactRow}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    disabled={!onPress}
  >
    {icon}
    <View style={styles.contactBody}>
      <RNText size={11} color={THEME.textMuted}>
        {label}
      </RNText>
      <RNText
        font="semibold"
        size={14}
        color={THEME.text}
        style={styles.contactValue}
      >
        {value}
      </RNText>
    </View>
    {chevron ? (
      <Svg width={moderateScale(14)} height={moderateScale(14)} viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 6l6 6-6 6"
          stroke={THEME.textMuted}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ) : null}
  </TouchableOpacity>
);

const ReportFlagIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = '#FFFFFF',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 21V4M4 4h11l-1.5 4 1.5 4H4"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = THEME.warning,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} />
    <Path
      d="M12 7v5l3 2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HelpSupport;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: SPACING.hPadding,
    paddingBottom: moderateScale(48),
    paddingTop: moderateScale(6),
  },
  heroGradient: {
    borderRadius: moderateScale(22),
  },
  hero: {
    borderRadius: moderateScale(22),
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(18),
    paddingBottom: moderateScale(20),
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 4,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(14),
  },
  heroIconWrap: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(15),
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(999),
  },
  onlineDot: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(4),
    backgroundColor: '#3FCC8A',
    marginRight: moderateScale(7),
  },
  heroTitle: {
    marginBottom: moderateScale(6),
  },
  heroSubtitle: {
    marginBottom: moderateScale(16),
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(999),
  },
  heroCtaLabel: {
    marginLeft: moderateScale(8),
  },
  sectionTitle: {
    marginTop: moderateScale(22),
    marginBottom: moderateScale(12),
  },
  sectionHeadRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: moderateScale(22),
    marginBottom: moderateScale(12),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -moderateScale(6),
  },
  actionShell: {
    width: '50%',
    paddingHorizontal: moderateScale(6),
    marginBottom: moderateScale(12),
  },
  actionGradient: {
    borderRadius: moderateScale(18),
  },
  actionCard: {
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(16),
    minHeight: moderateScale(120),
    justifyContent: 'space-between',
    shadowColor: '#2C1A0E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    // elevation: 3,
  },
  actionIconWrap: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    marginTop: moderateScale(14),
  },
  actionSubtitle: {
    marginTop: moderateScale(2),
  },
  faqList: {
    backgroundColor: THEME.surface,
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(44,26,14,0.06)',
  },
  faqItem: {
    paddingVertical: moderateScale(14),
  },
  faqBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: THEME.divider,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
  },
  faqChevron: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(12),
  },
  faqAnswer: {
    marginTop: moderateScale(10),
    paddingRight: moderateScale(8),
  },
  contactCard: {
    borderWidth: 1,
    borderColor: 'rgba(44,26,14,0.06)',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(14),
  },
  contactIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(14),
  },
  contactIconSuccess: {
    backgroundColor: THEME.successLight,
  },
  contactIconPrimary: {
    backgroundColor: THEME.primaryLight,
  },
  contactIconWarning: {
    backgroundColor: THEME.warningLight,
  },
  contactBody: {
    flex: 1,
  },
  contactValue: {
    marginTop: moderateScale(2),
  },
  contactDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: THEME.divider,
    marginLeft: moderateScale(70),
  },
  bottomCta: {
    marginTop: moderateScale(28),
    paddingHorizontal: moderateScale(10),
  },
  bottomCtaTitle: {
    marginBottom: moderateScale(6),
  },
  bottomCtaSubtitle: {
    marginBottom: moderateScale(14),
  },
});
