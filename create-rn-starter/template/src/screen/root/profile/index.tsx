import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {logout} from '../../../redux/slice/auth';
import {useLanguage} from '../../../localization';
import {ThemeMode} from '../../../theme/palettes';
import {SIZES, SPACING} from '../../../theme/spacing';
import {useTheme} from '../../../theme/ThemeProvider';
import {showToast} from '../../../utils/functions';
import MainContainer from '../../../components/Container/MainContainer';
import RNText from '../../../components/Text/RNText';
import RNButton from '../../../components/Button/RNButton';
import Card from '../../../components/Common/Card';
import Chip from '../../../components/Common/Chip';
import Avatar from '../../../components/Common/Avatar';
import Divider from '../../../components/Common/Divider';
// crns:if imagePicker
import {setAvatarUri} from '../../../redux/slice/userProfile';
import {ImagePickerSheet} from '../../../components/ImagePickerSheet';
// crns:endif
// crns:if gallery
import {useNavigation} from '@react-navigation/native';
import RouteKey from '../../../navigation/RouteKey';
// crns:endif

const THEME_MODES: ThemeMode[] = ['light', 'dark', 'system'];

const Profile = () => {
  const dispatch = useAppDispatch();
  const {t, current, languages, changeLanguage} = useLanguage();
  const {colors, mode, setMode} = useTheme();
  const profile = useAppSelector(state => state.userProfile.profile);
  // crns:if gallery
  const navigation = useNavigation<any>();
  // crns:endif
  // crns:if imagePicker
  const [pickerOpen, setPickerOpen] = React.useState(false);
  // crns:endif

  const onLogout = useCallback(() => {
    // The slice clears every session key; the auth guard swaps the tree back.
    dispatch(logout());
  }, [dispatch]);

  return (
    <MainContainer testID="profile-screen" edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <RNText font="bold" size={24} accessibilityRole="header">
          {t('profile.title')}
        </RNText>

        <Card style={styles.card} testID="profile-identity">
          <View style={styles.identityRow}>
            <Avatar
              uri={profile.avatarUri}
              name={profile.fullName}
              size={SIZES.avatarLg}
              ring
            />
            <View style={styles.identityText}>
              <RNText font="semibold" size={16}>
                {profile.fullName}
              </RNText>
              <RNText size={12} color={colors.textSecondary}>
                {profile.email}
              </RNText>
            </View>
          </View>
          {/* crns:if imagePicker */}
          <RNButton
            title={t('imagePicker.updatePhoto')}
            variant="ghost"
            onPress={() => setPickerOpen(true)}
            testID="profile-change-photo"
            containerStyle={styles.photoButton}
          />
          {/* crns:endif */}
        </Card>

        <Card style={styles.card} testID="profile-appearance">
          <RNText font="semibold" size={15}>
            {t('profile.appearance')}
          </RNText>
          <RNText size={12} color={colors.textSecondary} style={styles.hint}>
            {t('profile.appearanceHint')}
          </RNText>
          <View style={styles.chipRow}>
            {THEME_MODES.map(option => (
              <Chip
                key={option}
                testID={`theme-mode-${option}`}
                label={t(`profile.theme_${option}` as never)}
                active={mode === option}
                onPress={() => setMode(option)}
              />
            ))}
          </View>
        </Card>

        <Card style={styles.card} testID="profile-language">
          <RNText font="semibold" size={15}>
            {t('profile.language')}
          </RNText>
          <RNText size={12} color={colors.textSecondary} style={styles.hint}>
            {t('language.settingsSubtitle')}
          </RNText>
          <View style={styles.chipRow}>
            {languages.map(option => (
              <Chip
                key={option.code}
                testID={`language-${option.code}`}
                label={`${option.flag}  ${option.nativeLabel}`}
                active={current === option.code}
                onPress={() => {
                  changeLanguage(option.code);
                  showToast(
                    t('language.changedTo', {language: option.nativeLabel}),
                    'success',
                  );
                }}
              />
            ))}
          </View>
        </Card>

        {/* crns:if gallery */}
        <Card style={styles.card} testID="profile-gallery-link">
          <RNText font="semibold" size={15}>
            {t('gallery.title')}
          </RNText>
          <RNText size={12} color={colors.textSecondary} style={styles.hint}>
            {t('gallery.subtitle')}
          </RNText>
          <RNButton
            title={t('gallery.open')}
            variant="secondary"
            onPress={() => navigation.navigate(RouteKey.Gallery)}
            testID="profile-open-gallery"
            containerStyle={styles.galleryButton}
          />
        </Card>
        {/* crns:endif */}

        <Divider style={styles.divider} />

        <RNButton
          title={t('auth.logout')}
          variant="danger"
          onPress={onLogout}
          testID="profile-logout"
        />
      </ScrollView>

      {/* crns:if imagePicker */}
      <ImagePickerSheet
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPicked={(image: {path: string}) => dispatch(setAvatarUri(image.path))}
      />
      {/* crns:endif */}
    </MainContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.hPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SIZES.tabBarHeight + SPACING.xxxl,
  },
  card: {marginTop: SPACING.lg},
  identityRow: {flexDirection: 'row', alignItems: 'center', gap: SPACING.lg},
  identityText: {flex: 1, gap: SPACING.xxs},
  photoButton: {marginTop: SPACING.md, height: SIZES.buttonHeightSm},
  galleryButton: {marginTop: SPACING.md, height: SIZES.buttonHeightSm},
  hint: {marginTop: SPACING.xxs},
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  divider: {marginVertical: SPACING.xl},
});
