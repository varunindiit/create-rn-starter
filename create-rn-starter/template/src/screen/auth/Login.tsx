import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useAppDispatch} from '../../redux/hooks';
import {login} from '../../redux/slice/auth';
import {loginSchema, LoginValues} from '../../utils/validation';
import {useLanguage} from '../../localization';
import {showToast} from '../../utils/functions';
import {SPACING} from '../../theme/spacing';
import {useTheme} from '../../theme/ThemeProvider';
import MainContainer from '../../components/Container/MainContainer';
import RNText from '../../components/Text/RNText';
import RNInput from '../../components/Input/RNInput';
import RNButton from '../../components/Button/RNButton';

/**
 * Demo login.
 *
 * The form, validation and error surfacing are real — swap the fake
 * `onSubmit` body for your API call and dispatch `login({token})` with what it
 * returns. Everything downstream (persistence, the auth guard, the 401 handler)
 * already works off that one action.
 */
const Login = () => {
  const dispatch = useAppDispatch();
  const {t} = useLanguage();
  const {colors} = useTheme();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: '', password: ''},
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (values: LoginValues) => {
      try {
        // Replace with: const {token} = await post('/auth/login', values);
        await new Promise<void>(resolve => setTimeout(resolve, 400));
        dispatch(login({token: `demo-token-for-${values.email}`}));
      } catch {
        showToast(t('common.somethingWrong'), 'danger');
      }
    },
    [dispatch, t],
  );

  return (
    <MainContainer testID="login-screen">
      <KeyboardAwareScrollView
        bottomOffset={SPACING.xxl}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <RNText font="bold" size={26} accessibilityRole="header">
          {t('auth.loginTitle')}
        </RNText>
        <RNText size={14} color={colors.textSecondary} style={styles.subtitle}>
          {t('auth.loginSubtitle')}
        </RNText>

        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <RNInput
              testID="login-email"
              label={t('auth.emailAddress')}
              placeholder={t('auth.enterEmail')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              // `errors.email.message` is an i18n key from the zod schema.
              error={errors.email && t(errors.email.message as never)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              containerStyle={styles.field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <RNInput
              testID="login-password"
              label={t('auth.password')}
              placeholder={t('auth.enterPassword')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password && t(errors.password.message as never)}
              secure
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              containerStyle={styles.field}
            />
          )}
        />

        <RNButton
          testID="login-submit"
          title={t('auth.login')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          containerStyle={styles.submit}
        />

        <RNText
          size={11}
          color={colors.textMuted}
          textAlign="center"
          style={styles.terms}>
          {t('auth.agreeTerms')}
        </RNText>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.hPadding,
    paddingVertical: SPACING.xxl,
  },
  subtitle: {marginTop: SPACING.xs, marginBottom: SPACING.xxl},
  field: {marginBottom: SPACING.lg},
  submit: {marginTop: SPACING.md},
  terms: {marginTop: SPACING.xl},
});
