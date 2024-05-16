// export type I18nItem = {
//     LangInHttpLocaleCode?: string[];
//     LangInExplicitURL?: string;
//     label: string[];
//     labelByLang: string;
//     value: string;
//     labelInEnglish: string;
// }

// let i18nItems: I18nItem[] = [
//     {
//         LangInHttpLocaleCode: ["en-US", "en-GB", "en-AU", "en-CA", "en-NZ", "en-ZA"],
//         "label": [
//             "f7akol",
//             "英语"
//         ],
//         "labelByLang": "English",
//         "value": "en_US",
//         LangInExplicitURL: "en",
//         "labelInEnglish": "English"
//     },
//     {
//         LangInHttpLocaleCode: ["zh-cn", "zh-sg", "zh-hans"],
//         "label": [
//             "spdh98",
//             "简体中文"
//         ],
//         "labelByLang": "简体中文",
//         "value": "zh_CN",
//         LangInExplicitURL: "cn",
//         "labelInEnglish": "Simplified Chinese"
//     },
//     {
//         LangInHttpLocaleCode: ["zh-hk", "zh-tw", "zh-mo", "zh-my"],
//         "label": [
//             "7dm0d8",
//             "繁体中文"
//         ],
//         "labelByLang": "繁體中文",
//         "value": "zh_HK",
//         LangInExplicitURL: "hk",
//         "labelInEnglish": "Traditional Chinese"
//     },
//     {
//         "label": [
//             "aj3nhd",
//             "德语"
//         ],
//         "labelByLang": "Deutsch",
//         "value": "de",
//         "labelInEnglish": "German",
//         LangInHttpLocaleCode: ["de-DE", "de-AT", "de-CH", "de-LU", "de-LI"]
//     },
//     {
//         "label": [
//             "d5x1rl",
//             "西班牙语"
//         ],
//         "value": "es",
//         "labelByLang": "Español",
//         "labelInEnglish": "Spanish",
//         LangInHttpLocaleCode: ["es-ES", "es-AR", "es-BO", "es-CL", "es-CO", "es-CR", "es-DO", "es-EC", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PE", "es-PR", "es-PY", "es-SV", "es-UY", "es-VE"]
//     },
//     {
//         "label": [
//             "o1umzi",
//             "法语"
//         ],
//         "value": "fr",
//         "labelByLang": "Français",
//         "labelInEnglish": "French",
//         LangInHttpLocaleCode: ["fr-FR", "fr-BE", "fr-CA", "fr-CH", "fr-LU"]
//     },
//     {
//         "label": [
//             "1jj0ri",
//             "日语"
//         ],
//         "value": "ja",
//         "labelByLang": "日本語",
//         "labelInEnglish": "Japanese",
//         LangInHttpLocaleCode: ["ja-JP"]
//     },
//     {
//         "label": [
//             "5ggegx",
//             "韩语"
//         ],
//         "value": "ko",
//         "labelByLang": "한국어",
//         "labelInEnglish": "Korean",
//         LangInHttpLocaleCode: ["ko-KR"]
//     },
//     {
//         "label": [
//             "vci8rd",
//             "荷兰语"
//         ],
//         "value": "nl",
//         "labelByLang": "Nederlands",
//         "labelInEnglish": "Dutch",
//         LangInHttpLocaleCode: ["nl-NL", "nl-BE"]
//     },
//     {
//         "label": [
//             "2ybu7j",
//             "挪威语"
//         ],
//         "value": "no",
//         "labelByLang": "Norsk",
//         "labelInEnglish": "Norwegian",
//         LangInHttpLocaleCode: ["nb-NO", "nn-NO"]
//     },
//     {
//         "label": [
//             "w92j07",
//             "俄语"
//         ],
//         "value": "ru",
//         "labelByLang": "Русский",
//         "labelInEnglish": "Russian",
//         LangInHttpLocaleCode: ["ru-RU"]
//     },
//     {
//         "label": [
//             "2tib5m",
//             "瑞士语"
//         ],
//         "value": "sv",
//         "labelByLang": "Svenska",
//         "labelInEnglish": "Swedish",
//         LangInHttpLocaleCode: ["sv-SE", "sv-FI"]
//     },
//     {
//         "label": [
//             "ykganl",
//             "丹麦语"
//         ],
//         "value": "da",
//         "labelByLang": "Dansk",
//         "labelInEnglish": "Danish",
//         LangInHttpLocaleCode: ["da-DK"]
//     },
//     {
//         "label": [
//             "9tbbkt",
//             "芬兰语"
//         ],
//         "value": "fi",
//         "labelByLang": "Suomi",
//         "labelInEnglish": "Finnish",
//         LangInHttpLocaleCode: ["fi-FI"]
//     },
//     {
//         "label": [
//             "vrfjnf",
//             "意大利语"
//         ],
//         "value": "it",
//         "labelByLang": "Italiano",
//         "labelInEnglish": "Italian",
//         LangInHttpLocaleCode: ["it-IT", "it-CH"]
//     },
//     {
//         "label": [
//             "n94an4",
//             "波兰语"
//         ],
//         "value": "pl",
//         "labelByLang": "Polski",
//         "labelInEnglish": "Polish",
//         LangInHttpLocaleCode: ["pl-PL"]
//     },
//     {
//         "label": [
//             "a4jbpq",
//             "葡萄牙语"
//         ],
//         "value": "cs",
//         "labelByLang": "Čeština",
//         "labelInEnglish": "Czech",
//         LangInHttpLocaleCode: ["cs-CZ"]
//     },
//     {
//         "label": [
//             "ediql2",
//             "匈牙利语"
//         ],
//         "value": "hu",
//         "labelByLang": "Magyar",
//         "labelInEnglish": "Hungarian",
//         LangInHttpLocaleCode: ["hu-HU"]
//     },
//     {
//         "label": [
//             "2lhcqwp",
//             "土耳其语"
//         ],
//         "value": "tr",
//         "labelByLang": "Türkçe",
//         "labelInEnglish": "Turkish",
//         LangInHttpLocaleCode: ["tr-TR"]
//     },
//     {
//         "label": [
//             "2lhqqwp",
//             "印尼语"
//         ],
//         "value": "id",
//         "labelByLang": "Bahasa Indonesia",
//         "labelInEnglish": "Indonesian",
//         LangInHttpLocaleCode: ["id-ID"]
//     },
//     {
//         "label": [
//             "2lehqwp",
//             "越南语"
//         ],
//         "value": "vi",
//         "labelByLang": "Tiếng Việt",
//         "labelInEnglish": "Vietnamese",
//         LangInHttpLocaleCode: ["vi-VN"]
//     },
//     {
//         "label": [
//             "2lhqwwp",
//             "泰语"
//         ],
//         "value": "th",
//         "labelByLang": "ภาษาไทย",
//         "labelInEnglish": "Thai",
//         LangInHttpLocaleCode: ["th-TH"]
//     },
//     {
//         "label": [
//             "2lhqqwqp",
//             "马来西亚"
//         ],
//         "value": "ms",
//         "labelByLang": "Bahasa Melayu",
//         "labelInEnglish": "Malay",
//         LangInHttpLocaleCode: ["ms-MY"]
//     }
// ].map(x => {
//     if (!x.LangInExplicitURL) {
//         x.LangInExplicitURL = x.value;
//     }
//     return x;
// })

// const ic = i18nItems.map(x => {
//     return {
//         label: x.label[1],
//         value: x.value
//     }
// });
// export let useGetI18nLangList = (): { label: string, value: string }[] => {
//     return ic
// }

// export default i18nItems;