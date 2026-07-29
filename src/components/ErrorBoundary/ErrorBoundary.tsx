import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SPACING} from '../../theme/spacing';
import {lightColors} from '../../theme/palettes';
import RNText from '../Text/RNText';
import RNButton from '../Button/RNButton';

interface Props {
  children: React.ReactNode;
  /** Report to Sentry/Crashlytics here. */
  onError?: (error: Error, info: React.ErrorInfo) => void;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render-time crashes so one bad screen shows a recoverable message
 * instead of a white screen with no way out.
 *
 * Must be a class: `componentDidCatch`/`getDerivedStateFromError` have no hook
 * equivalent. It also cannot use `useTheme()` for the same reason, so the
 * fallback is styled from the static light palette — a theme lookup is exactly
 * the kind of thing that might itself be broken when this renders.
 *
 * Note this catches render errors only. Rejected promises in an event handler
 * or effect are not React errors; those belong in `normaliseError` + a toast.
 */
class ErrorBoundary extends React.Component<Props, State> {
  state: State = {error: null};

  static getDerivedStateFromError(error: Error): State {
    return {error};
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
    if (__DEV__) console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({error: null});

  render() {
    const {error} = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <View style={styles.root} testID="error-boundary-fallback">
        <RNText
          font="bold"
          size={20}
          color={lightColors.text}
          textAlign="center">
          Something went wrong
        </RNText>
        <RNText
          size={13}
          color={lightColors.textSecondary}
          textAlign="center"
          style={styles.body}>
          The app hit an unexpected error. You can try again — if it keeps
          happening, restart the app.
        </RNText>

        {__DEV__ ? (
          <ScrollView style={styles.details}>
            <RNText size={11} color={lightColors.danger}>
              {error.message}
            </RNText>
          </ScrollView>
        ) : null}

        <RNButton
          title="Try again"
          onPress={this.reset}
          testID="error-boundary-retry"
          containerStyle={styles.button}
        />
      </View>
    );
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: lightColors.background,
  },
  body: {marginTop: SPACING.sm},
  details: {maxHeight: 160, marginTop: SPACING.lg, alignSelf: 'stretch'},
  button: {marginTop: SPACING.xxl, alignSelf: 'stretch'},
});
