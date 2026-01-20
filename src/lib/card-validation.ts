/**
 * Card Validation Utility
 * Implements Luhn Algorithm and BIN checks for PCI DSS compliance.
 */

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

interface CardValidationResult {
  isValid: boolean;
  cardType: CardType;
  error?: string;
}

/**
 * Validates a card number using the Luhn Algorithm
 */
export const validateLuhn = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Detects card type based on BIN (Bank Identification Number)
 */
export const detectCardType = (cardNumber: string): CardType => {
  const number = cardNumber.replace(/\D/g, '');
  
  const patterns = {
    visa: /^4/,
    mastercard: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  };

  if (patterns.visa.test(number)) return 'visa';
  if (patterns.mastercard.test(number)) return 'mastercard';
  if (patterns.amex.test(number)) return 'amex';
  if (patterns.discover.test(number)) return 'discover';

  return 'unknown';
};

/**
 * Comprehensive card validation
 */
export const validateCard = (
  cardNumber: string,
  cvv: string,
  expiryMonth: string,
  expiryYear: string
): CardValidationResult => {
  const cleanNumber = cardNumber.replace(/\D/g, '');

  // 1. Basic length check
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { isValid: false, cardType: 'unknown', error: 'يرجى إدخال رقم بطاقة دفع حقيقي وصالح' };
  }

  // 2. Luhn Algorithm check
  if (!validateLuhn(cleanNumber)) {
    return { isValid: false, cardType: 'unknown', error: 'تم اكتشاف بطاقة وهمية. يرجى استخدام بطاقة فيزا أو ماستركارد حقيقية' };
  }

  // 3. Card type detection
  const cardType = detectCardType(cleanNumber);
  if (cardType === 'unknown') {
    return { isValid: false, cardType: 'unknown', error: 'عذراً، نوع هذه البطاقة غير مدعوم. يرجى استخدام فيزا أو ماستركارد' };
  }

  // 4. Expiry date check
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  const expMonth = parseInt(expiryMonth, 10);
  const expYear = parseInt(expiryYear, 10);

  if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
    return { isValid: false, cardType, error: 'تاريخ انتهاء غير صالح' };
  }

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return { isValid: false, cardType, error: 'البطاقة منتهية الصلاحية' };
  }

  // 5. CVV check
  const cvvLength = cardType === 'amex' ? 4 : 3;
  if (cvv.length !== cvvLength) {
    return { isValid: false, cardType, error: 'رمز التحقق (CVV) غير صالح' };
  }

  return { isValid: true, cardType };
};
