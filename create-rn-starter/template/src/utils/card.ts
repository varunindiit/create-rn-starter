/**
 * Card helpers — brand detection, formatting and validation for the
 * payment-method flow. Pure functions, no UI / native deps.
 */

export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "card";

/** Human label for a brand, used as the card "type" in the UI. */
export const CARD_BRAND_LABEL: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
  card: "Card",
};

/** Strip everything that is not a digit. */
export const onlyDigits = (value: string) => value.replace(/\D/g, "");

/** Detect the card brand from the (partial) card number. */
export const detectBrand = (rawNumber: string): CardBrand => {
  const n = onlyDigits(rawNumber);
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(6011|65|64[4-9])/.test(n)) return "discover";
  return "card";
};

/** Amex uses 15 digits, everyone else 16. */
export const brandMaxDigits = (brand: CardBrand) =>
  brand === "amex" ? 15 : 16;

/** CVV length per brand (Amex = 4). */
export const brandCvvLength = (brand: CardBrand) =>
  brand === "amex" ? 4 : 3;

/**
 * Format a card number with spaces for display / input.
 * Amex groups as 4-6-5, all others as 4-4-4-4.
 */
export const formatCardNumber = (rawNumber: string): string => {
  const brand = detectBrand(rawNumber);
  const digits = onlyDigits(rawNumber).slice(0, brandMaxDigits(brand));
  const groups = brand === "amex" ? [4, 6, 5] : [4, 4, 4, 4];

  const parts: string[] = [];
  let index = 0;
  for (const size of groups) {
    if (index >= digits.length) break;
    parts.push(digits.slice(index, index + size));
    index += size;
  }
  return parts.join(" ");
};

/** Format expiry input into `MM/YY`. */
export const formatExpiry = (raw: string): string => {
  const digits = onlyDigits(raw).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

/** Last 4 digits of a (possibly formatted) card number. */
export const lastFour = (rawNumber: string) =>
  onlyDigits(rawNumber).slice(-4);

/** Luhn checksum — true when the number is structurally valid. */
export const isLuhnValid = (rawNumber: string): boolean => {
  const digits = onlyDigits(rawNumber);
  if (digits.length < 12) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let d = parseInt(digits[i], 10);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
};

/** Validate `MM/YY` — real month, not in the past. */
export const isExpiryValid = (expiry: string): boolean => {
  const digits = onlyDigits(expiry);
  if (digits.length !== 4) return false;
  const month = parseInt(digits.slice(0, 2), 10);
  const year = 2000 + parseInt(digits.slice(2), 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);
  return endOfMonth >= now;
};
