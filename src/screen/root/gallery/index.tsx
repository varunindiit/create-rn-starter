import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useLanguage} from '../../../localization';
import {SPACING} from '../../../theme/spacing';
import {useTheme} from '../../../theme/ThemeProvider';
import MainContainer from '../../../components/Container/MainContainer';
import Header from '../../../components/Header';
import RNText from '../../../components/Text/RNText';
import RNButton from '../../../components/Button/RNButton';
import RNInput from '../../../components/Input/RNInput';
import Card from '../../../components/Common/Card';
import Chip from '../../../components/Common/Chip';
import Avatar from '../../../components/Common/Avatar';
import Toggle from '../../../components/Common/Toggle';
import Divider from '../../../components/Common/Divider';
import Loader from '../../../components/Common/Loader';
import EmptyState from '../../../components/Common/EmptyState';
import StatusBadge from '../../../components/Common/StatusBadge';

/**
 * Live component gallery.
 *
 * Every control here is the real component with real props, so it doubles as a
 * visual regression surface: flip the theme on the Profile screen and this
 * screen is where you see, in one scroll, whether anything still hard-codes a
 * colour. Delete the screen (or scaffold with `--preset standard`) once you no
 * longer need it.
 */
const Section: React.FC<{title: string; children: React.ReactNode}> = ({
  title,
  children,
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.section}>
      <RNText
        font="semibold"
        size={13}
        color={colors.textMuted}
        accessibilityRole="header">
        {title.toUpperCase()}
      </RNText>
      <Card style={styles.sectionCard}>{children}</Card>
    </View>
  );
};

const Gallery = () => {
  const {t} = useLanguage();
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState('');
  const [chip, setChip] = useState('one');

  return (
    <MainContainer testID="gallery-screen" edges={['top']}>
      <Header title={t('gallery.title')} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Section title={t('gallery.buttons')}>
          <View style={styles.stack}>
            <RNButton title="Primary" testID="gallery-btn-primary" />
            <RNButton title="Secondary" variant="secondary" />
            <RNButton title="Outline" variant="outline" />
            <RNButton title="Ghost" variant="ghost" />
            <RNButton title="Danger" variant="danger" />
            <RNButton title="Loading" loading />
            <RNButton title="Disabled" disabled />
          </View>
        </Section>

        <Section title={t('gallery.inputs')}>
          <View style={styles.stack}>
            <RNInput
              label="Email"
              placeholder="you@example.com"
              value={text}
              onChangeText={setText}
              testID="gallery-input"
            />
            <RNInput label="Password" placeholder="••••••••" secure />
            <RNInput
              label="With error"
              placeholder="Something"
              error="This field is required"
            />
          </View>
        </Section>

        <Section title={t('gallery.badges')}>
          <View style={styles.row}>
            <StatusBadge label="Success" tone="success" dot />
            <StatusBadge label="Warning" tone="warning" dot />
            <StatusBadge label="Danger" tone="danger" dot />
            <StatusBadge label="Info" tone="info" dot />
            <StatusBadge label="Primary" tone="primary" dot />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.row}>
            {['one', 'two', 'three'].map(value => (
              <Chip
                key={value}
                label={value}
                active={chip === value}
                onPress={() => setChip(value)}
              />
            ))}
          </View>
        </Section>

        <Section title={t('gallery.controls')}>
          <View style={styles.rowBetween}>
            <RNText size={14}>Toggle</RNText>
            <Toggle
              value={toggle}
              onChange={setToggle}
              accessibilityLabel="Example toggle"
              testID="gallery-toggle"
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.row}>
            <Avatar name="Jane Doe" />
            <Avatar name="Sam Ray" ring />
            <Avatar />
          </View>
        </Section>

        <Section title={t('gallery.feedback')}>
          <View style={styles.loaderBox}>
            <Loader size="small" />
          </View>
          <Divider style={styles.divider} />
          <EmptyState
            title={t('gallery.emptyTitle')}
            description={t('gallery.emptyBody')}
            actionLabel={t('common.retry')}
            onAction={() => {}}
          />
        </Section>
      </ScrollView>
    </MainContainer>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.hPadding,
    paddingBottom: SPACING.huge,
  },
  section: {marginTop: SPACING.xl},
  sectionCard: {marginTop: SPACING.sm},
  stack: {gap: SPACING.md},
  row: {flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, alignItems: 'center'},
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {marginVertical: SPACING.lg},
  loaderBox: {height: 60},
});
