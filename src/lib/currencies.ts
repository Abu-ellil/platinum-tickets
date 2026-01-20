export const ARABIC_CURRENCIES = [
  {
    code: 'EGP',
    symbol: 'ج.م',
    name: {
      ar: 'جنيه مصري',
      en: 'Egyptian Pound'
    },
    flag: '🇪🇬'
  },
  {
    code: 'SAR',
    symbol: 'ر.س',
    name: {
      ar: 'ريال سعودي',
      en: 'Saudi Riyal'
    },
    flag: '🇸🇦'
  },
  {
    code: 'AED',
    symbol: 'د.إ',
    name: {
      ar: 'درهم إماراتي',
      en: 'UAE Dirham'
    },
    flag: '🇦🇪'
  },
  {
    code: 'QAR',
    symbol: 'ر.ق',
    name: {
      ar: 'ريال قطري',
      en: 'Qatari Riyal'
    },
    flag: '🇶🇦'
  },
  {
    code: 'KWD',
    symbol: 'د.ك',
    name: {
      ar: 'دينار كويتي',
      en: 'Kuwaiti Dinar'
    },
    flag: '🇰🇼'
  },
  {
    code: 'BHD',
    symbol: 'د.ب',
    name: {
      ar: 'دينار بحريني',
      en: 'Bahraini Dinar'
    },
    flag: '🇧🇭'
  },
  {
    code: 'OMR',
    symbol: 'ر.ع',
    name: {
      ar: 'ريال عماني',
      en: 'Omani Rial'
    },
    flag: '🇴🇲'
  },
  {
    code: 'JOD',
    symbol: 'د.أ',
    name: {
      ar: 'دينار أردني',
      en: 'Jordanian Dinar'
    },
    flag: '🇯🇴'
  },
  {
    code: 'LBP',
    symbol: 'ل.ل',
    name: {
      ar: 'ليرة لبنانية',
      en: 'Lebanese Pound'
    },
    flag: '🇱🇧'
  },
  {
    code: 'IQD',
    symbol: 'د.ع',
    name: {
      ar: 'دينار عراقي',
      en: 'Iraqi Dinar'
    },
    flag: '🇮🇶'
  },
  {
    code: 'LYD',
    symbol: 'د.ل',
    name: {
      ar: 'دينار ليبي',
      en: 'Libyan Dinar'
    },
    flag: '🇱🇾'
  },
  {
    code: 'TND',
    symbol: 'د.ت',
    name: {
      ar: 'دينار تونسي',
      en: 'Tunisian Dinar'
    },
    flag: '🇹🇳'
  },
  {
    code: 'DZD',
    symbol: 'د.ج',
    name: {
      ar: 'دينار جزائري',
      en: 'Algerian Dinar'
    },
    flag: '🇩🇿'
  },
  {
    code: 'MAD',
    symbol: 'د.م',
    name: {
      ar: 'درهم مغربي',
      en: 'Moroccan Dirham'
    },
    flag: '🇲🇦'
  },
  {
    code: 'SYP',
    symbol: 'ل.س',
    name: {
      ar: 'ليرة سورية',
      en: 'Syrian Pound'
    },
    flag: '🇸🇾'
  },
  {
    code: 'YER',
    symbol: 'ر.ي',
    name: {
      ar: 'ريال يمني',
      en: 'Yemeni Rial'
    },
    flag: '🇾🇪'
  },
  {
    code: 'SOS',
    symbol: 'ش.ص',
    name: {
      ar: 'شلن صومالي',
      en: 'Somali Shilling'
    },
    flag: '🇸🇴'
  },
  {
    code: 'DJD',
    symbol: 'د.ج',
    name: {
      ar: 'دينار جيبوتي',
      en: 'Djiboutian Franc'
    },
    flag: '🇩🇯'
  },
  {
    code: 'MVR',
    symbol: 'ر.م',
    name: {
      ar: 'روبية مالديفية',
      en: 'Maldivian Rufiyaa'
    },
    flag: '🇲🇻'
  },
  {
    code: 'SAR',
    symbol: 'ر.س',
    name: {
      ar: 'ريال سعودي',
      en: 'Saudi Riyal'
    },
    flag: '🇸🇦'
  },
  {
    code: 'PAB',
    symbol: 'ب.ب',
    name: {
      ar: 'بالبوا',
      en: 'Panamanian Balboa'
    },
    flag: '🇵🇦'
  }
] as const;

export const CURRENCY_CODES = ARABIC_CURRENCIES.map(c => c.code) as readonly string[];
