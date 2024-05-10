export type I18nItem = {
    LangInHttpLocaleCode?: string[];
    LangInExplicitURL?: string;
    Label: string[];
    LabelByLang: string;
    Value: string;
    LabelInEnglish: string;
}

let i18nItems: I18nItem[] = [
    {
        LangInHttpLocaleCode: ["en-US", "en-GB", "en-AU", "en-CA", "en-NZ", "en-ZA"],
        "Label": [
            "f7akol",
            "English"
        ],
        "LabelByLang": "English",
        "Value": "en_US",
        LangInExplicitURL: "en",
        "LabelInEnglish": "English"
    },
    {
        LangInHttpLocaleCode: ["zh-cn", "zh-sg", "zh-hans"],
        "Label": [
            "spdh98",
            "Simplified Chinese"
        ],
        "LabelByLang": "简体中文",
        "Value": "zh_CN",
        LangInExplicitURL: "cn",
        "LabelInEnglish": "Simplified Chinese"
    },
    {
        LangInHttpLocaleCode: ["zh-hk", "zh-tw", "zh-mo", "zh-my"],
        "Label": [
            "7dm0d8",
            "Traditional Chinese"
        ],
        "LabelByLang": "繁體中文",
        "Value": "zh_HK",
        LangInExplicitURL: "hk",
        "LabelInEnglish": "Traditional Chinese"
    },
    {
        "Label": [
            "aj3nhd",
            "German"
        ],
        "LabelByLang": "Deutsch",
        "Value": "de",
        "LabelInEnglish": "German",
        LangInHttpLocaleCode: ["de-DE", "de-AT", "de-CH", "de-LU", "de-LI"]
    },
    {
        "Label": [
            "d5x1rl",
            "Spanish"
        ],
        "Value": "es",
        "LabelByLang": "Español",
        "LabelInEnglish": "Spanish",
        LangInHttpLocaleCode: ["es-ES", "es-AR", "es-BO", "es-CL", "es-CO", "es-CR", "es-DO", "es-EC", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PE", "es-PR", "es-PY", "es-SV", "es-UY", "es-VE"]
    },
    {
        "Label": [
            "o1umzi",
            "French"
        ],
        "Value": "fr",
        "LabelByLang": "Français",
        "LabelInEnglish": "French",
        LangInHttpLocaleCode: ["fr-FR", "fr-BE", "fr-CA", "fr-CH", "fr-LU"]
    },
    {
        "Label": [
            "1jj0ri",
            "Japanese"
        ],
        "Value": "ja",
        "LabelByLang": "日本語",
        "LabelInEnglish": "Japanese",
        LangInHttpLocaleCode: ["ja-JP"]
    },
    {
        "Label": [
            "5ggegx",
            "Korean"
        ],
        "Value": "ko",
        "LabelByLang": "한국어",
        "LabelInEnglish": "Korean",
        LangInHttpLocaleCode: ["ko-KR"]
    },
    {
        "Label": [
            "vci8rd",
            "Dutch"
        ],
        "Value": "nl",
        "LabelByLang": "Nederlands",
        "LabelInEnglish": "Dutch",
        LangInHttpLocaleCode: ["nl-NL", "nl-BE"]
    },
    {
        "Label": [
            "2ybu7j",
            "Norwegian"
        ],
        "Value": "no",
        "LabelByLang": "Norsk",
        "LabelInEnglish": "Norwegian",
        LangInHttpLocaleCode: ["nb-NO", "nn-NO"]
    },
    {
        "Label": [
            "w92j07",
            "Russian"
        ],
        "Value": "ru",
        "LabelByLang": "Русский",
        "LabelInEnglish": "Russian",
        LangInHttpLocaleCode: ["ru-RU"]
    },
    {
        "Label": [
            "2tib5m",
            "Swedish"
        ],
        "Value": "sv",
        "LabelByLang": "Svenska",
        "LabelInEnglish": "Swedish",
        LangInHttpLocaleCode: ["sv-SE", "sv-FI"]
    },
    {
        "Label": [
            "ykganl",
            "Danish"
        ],
        "Value": "da",
        "LabelByLang": "Dansk",
        "LabelInEnglish": "Danish",
        LangInHttpLocaleCode: ["da-DK"]
    },
    {
        "Label": [
            "9tbbkt",
            "Finnish"
        ],
        "Value": "fi",
        "LabelByLang": "Suomi",
        "LabelInEnglish": "Finnish",
        LangInHttpLocaleCode: ["fi-FI"]
    },
    {
        "Label": [
            "vrfjnf",
            "Italian"
        ],
        "Value": "it",
        "LabelByLang": "Italiano",
        "LabelInEnglish": "Italian",
        LangInHttpLocaleCode: ["it-IT", "it-CH"]
    },
    {
        "Label": [
            "n94an4",
            "Polish"
        ],
        "Value": "pl",
        "LabelByLang": "Polski",
        "LabelInEnglish": "Polish",
        LangInHttpLocaleCode: ["pl-PL"]
    },
    {
        "Label": [
            "n24tes",
            "Portuguese (Brazil)"
        ],
        "Value": "pt",
        "LabelByLang": "Português (Brasil)",
        "LabelInEnglish": "Portuguese (Brazil)",
        LangInHttpLocaleCode: ["pt-BR"]
    },
    {
        "Label": [
            "a4jbpq",
            "Czech"
        ],
        "Value": "cs",
        "LabelByLang": "Čeština",
        "LabelInEnglish": "Czech",
        LangInHttpLocaleCode: ["cs-CZ"]
    },
    {
        "Label": [
            "ediql2",
            "Hungarian"
        ],
        "Value": "hu",
        "LabelByLang": "Magyar",
        "LabelInEnglish": "Hungarian",
        LangInHttpLocaleCode: ["hu-HU"]
    },
    {
        "Label": [
            "2lhcqwp",
            "Turkish"
        ],
        "Value": "tr",
        "LabelByLang": "Türkçe",
        "LabelInEnglish": "Turkish",
        LangInHttpLocaleCode: ["tr-TR"]
    },
    {
        "Label": [
            "2lhqqwp",
            "Indonesian"
        ],
        "Value": "id",
        "LabelByLang": "Bahasa Indonesia",
        "LabelInEnglish": "Indonesian",
        LangInHttpLocaleCode: ["id-ID"]
    },
    {
        "Label": [
            "2lehqwp",
            "Vietnamese"
        ],
        "Value": "vi",
        "LabelByLang": "Tiếng Việt",
        "LabelInEnglish": "Vietnamese",
        LangInHttpLocaleCode: ["vi-VN"]
    },
    {
        "Label": [
            "2lhqwwp",
            "Thai"
        ],
        "Value": "th",
        "LabelByLang": "ภาษาไทย",
        "LabelInEnglish": "Thai",
        LangInHttpLocaleCode: ["th-TH"]
    },
    {
        "Label": [
            "2lhqqwqp",
            "Malay"
        ],
        "Value": "ms",
        "LabelByLang": "Bahasa Melayu",
        "LabelInEnglish": "Malay",
        LangInHttpLocaleCode: ["ms-MY"]
    }
].map(x => {
    if (!x.LangInExplicitURL) {
        x.LangInExplicitURL = x.Value;
    }
    return x;
})

export let useGetI18nLangList = () => {
    return i18nItems;
}

export default i18nItems;