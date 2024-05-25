export type I18nItem = {
  langInHttpLocaleCode?: string[];
  label: string[];
  labelByLang: string;
  value: string;
  labelInEnglish: string;
  LangInExplicitURL?: string;
};

let i18nItems: I18nItem[] = [
  {
    langInHttpLocaleCode: ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA'],
    label: ['f7akol', '英语'],
    labelByLang: 'English',
    value: 'en',
    LangInExplicitURL: 'en',
    labelInEnglish: 'English',
  },
  {
    langInHttpLocaleCode: ['zh-cn', 'zh-sg', 'zh-hans'],
    label: ['spdh98', '简体中文'],
    labelByLang: '简体中文',
    value: 'zh',
    LangInExplicitURL: 'cn',
    labelInEnglish: 'Simplified Chinese',
  },
  {
    langInHttpLocaleCode: ['zh-hk', 'zh-tw', 'zh-mo', 'zh-my'],
    label: ['7dm0d8', '繁体中文(中国台湾)'],
    labelByLang: '繁體中文(中国台湾)',
    value: 'zh-TW',
    LangInExplicitURL: 'hk',
    labelInEnglish: 'Traditional Chinese',
  },
  {
    langInHttpLocaleCode: ['zh-hk', 'zh-tw', 'zh-mo', 'zh-my'],
    label: ['7dm0d8', '繁体中文(中国香港)'],
    labelByLang: '繁體中文(中国香港)',
    value: 'zh-HK',
    LangInExplicitURL: 'hk',
    labelInEnglish: 'Traditional Chinese',
  },
  {
    langInHttpLocaleCode: ['zh-hk', 'zh-tw', 'zh-mo', 'zh-my'],
    label: ['7dm0d8', '繁体中文(中国澳门)'],
    labelByLang: '繁體中文(中国澳门)',
    value: 'zh-TR',
    LangInExplicitURL: 'hk',
    labelInEnglish: 'Traditional Chinese',
  },
  {
    label: ['aj3nhd', '德语'],
    labelByLang: 'Deutsch',
    value: 'de',
    labelInEnglish: 'German',
    langInHttpLocaleCode: ['de-DE', 'de-AT', 'de-CH', 'de-LU', 'de-LI'],
  },
  {
    label: ['d5x1rl', '西班牙语'],
    value: 'es',
    labelByLang: 'Español',
    labelInEnglish: 'Spanish',
    langInHttpLocaleCode: [
      'es-ES',
      'es-AR',
      'es-BO',
      'es-CL',
      'es-CO',
      'es-CR',
      'es-DO',
      'es-EC',
      'es-GT',
      'es-HN',
      'es-MX',
      'es-NI',
      'es-PA',
      'es-PE',
      'es-PR',
      'es-PY',
      'es-SV',
      'es-UY',
      'es-VE',
    ],
  },
  {
    label: ['o1umzi', '法语'],
    value: 'fr',
    labelByLang: 'Français',
    labelInEnglish: 'French',
    langInHttpLocaleCode: ['fr-FR', 'fr-BE', 'fr-CA', 'fr-CH', 'fr-LU'],
  },
  {
    label: ['1jj0ri', '日语'],
    value: 'ja',
    labelByLang: '日本語',
    labelInEnglish: 'Japanese',
    langInHttpLocaleCode: ['ja-JP'],
  },
  {
    label: ['5ggegx', '韩语'],
    value: 'ko',
    labelByLang: '한국어',
    labelInEnglish: 'Korean',
    langInHttpLocaleCode: ['ko-KR'],
  },
  {
    label: ['vci8rd', '马来西亚语'],
    value: 'ms',
    labelByLang: 'Nederlands',
    labelInEnglish: 'Dutch',
    langInHttpLocaleCode: ['nl-NL', 'nl-BE'],
  },
  {
    label: ['w92j07', '俄语'],
    value: 'ru',
    labelByLang: 'Русский',
    labelInEnglish: 'Russian',
    langInHttpLocaleCode: ['ru-RU'],
  },

  {
    label: ['vrfjnf', '意大利语'],
    value: 'it',
    labelByLang: 'Italiano',
    labelInEnglish: 'Italian',
    langInHttpLocaleCode: ['it-IT', 'it-CH'],
  },
  {
    label: ['a4jbpq', '葡萄牙语'],
    value: 'pt',
    labelByLang: 'Čeština',
    labelInEnglish: 'Czech',
    langInHttpLocaleCode: ['cs-CZ'],
  },
  {
    label: ['2lhcqwp', '土耳其语'],
    value: 'tr',
    labelByLang: 'Türkçe',
    labelInEnglish: 'Turkish',
    langInHttpLocaleCode: ['tr-TR'],
  },
  {
    label: ['2lhqqwp', '印尼语'],
    value: 'id',
    labelByLang: 'Bahasa Indonesia',
    labelInEnglish: 'Indonesian',
    langInHttpLocaleCode: ['id-ID'],
  },
  {
    label: ['2lehqwp', '越南语'],
    value: 'vi',
    labelByLang: 'Tiếng Việt',
    labelInEnglish: 'Vietnamese',
    langInHttpLocaleCode: ['vi-VN'],
  },
  {
    label: ['2lhqwwp', '泰语'],
    value: 'th',
    labelByLang: 'ภาษาไทย',
    labelInEnglish: 'Thai',
    langInHttpLocaleCode: ['th-TH'],
  },
];

export let useGetI18nLangList = () => {
  return i18nItems;
};

export default i18nItems;
