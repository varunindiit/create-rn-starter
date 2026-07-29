import {showMessage, MessageType} from 'react-native-flash-message';
import {FONTS} from '../theme/fonts';
import {errorMessage} from '../services/apiError';

/** Toast helper. Prefer this over calling `showMessage` directly. */
export const showToast = (
  message: string,
  type: MessageType = 'info',
  duration = 2500,
) => {
  showMessage({
    message,
    type,
    icon: type,
    floating: true,
    style: {alignItems: 'center'},
    duration,
    titleStyle: {fontFamily: FONTS.medium, fontWeight: '500'},
  });
};

/**
 * Show whatever went wrong, without any screen having to know the difference
 * between an AxiosError, an ApiError and a plain throw.
 */
export const showErrorToast = (error: unknown) => {
  showToast(errorMessage(error), 'danger');
};

/** Zero-pad to two digits: 7 -> "07". */
export const pad2 = (n: number) => n.toString().padStart(2, '0');

/** Locale-aware thousands separator: 4400 -> "4,400". */
export const formatNumber = (n?: number, locale?: string) =>
  (n ?? 0).toLocaleString(locale, {maximumFractionDigits: 0});

/** Initials for an avatar fallback: "Jane Doe" -> "JD". */
export const initials = (name?: string) =>
  (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');
