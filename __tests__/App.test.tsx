/**
 * @format
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

it('renders the app and lands on the login screen when signed out', async () => {
  const {getByTestId} = await render(<App />);
  // Signed out, the auth guard must mount the Auth stack — not the tabs.
  expect(getByTestId('login-screen')).toBeTruthy();
});
