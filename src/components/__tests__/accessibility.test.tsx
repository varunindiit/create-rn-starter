import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RNButton from '../Button/RNButton';
import Toggle from '../Common/Toggle';
import RNInput from '../Input/RNInput';
import StatusBadge from '../Common/StatusBadge';
import {ThemeProvider} from '../../theme/ThemeProvider';

/** RNTL v14's `render` is async, so every call site awaits it. */
const wrap = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

/**
 * These assert the accessibility contract, not the visuals. They are what stops
 * a future refactor from quietly dropping a role or a state and making a
 * control unusable with TalkBack/VoiceOver.
 */
describe('component accessibility', () => {
  it('exposes a button with its label and reports disabled state', async () => {
    const {getByRole} = await wrap(
      <RNButton title="Continue" disabled testID="btn" />,
    );
    const button = getByRole('button', {name: 'Continue'});
    expect(button).toBeTruthy();
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('reports busy while loading and does not fire onPress', async () => {
    const onPress = jest.fn();
    const {getByTestId} = await wrap(
      <RNButton title="Save" loading onPress={onPress} testID="btn" />,
    );
    const button = getByTestId('btn');
    expect(button.props.accessibilityState.busy).toBe(true);
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('announces the toggle as a switch with a checked state', async () => {
    const onChange = jest.fn();
    const {getByRole} = await wrap(
      <Toggle
        value={false}
        onChange={onChange}
        accessibilityLabel="Dark mode"
        testID="toggle"
      />,
    );
    const toggle = getByRole('switch', {name: 'Dark mode'});
    expect(toggle.props.accessibilityState.checked).toBe(false);
    fireEvent.press(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('names the input from its visible label and surfaces the error', async () => {
    const {getByLabelText, getByTestId} = await wrap(
      <RNInput label="Email" error="Enter a valid email" testID="email" />,
    );
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByTestId('email-error').props.children).toBe(
      'Enter a valid email',
    );
  });

  it('carries status meaning in text, not colour alone', async () => {
    const {getByLabelText} = await wrap(
      <StatusBadge label="Offline" tone="warning" testID="badge" />,
    );
    expect(getByLabelText('Offline')).toBeTruthy();
  });
});
