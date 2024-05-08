
import { LabelHrefType, NavigatorPassProp } from "@/[lang]/[category]/src/parts"
import { getAppDevIcon, getAppKeywords } from "@/__CORE__/config/imgconfig"
import { Dot } from "@/__CORE__/utils/TranslationUtils"
import { fmtURL_Server } from "@/__CORE__/utils/routeUtils"
import appToolInfoObj, { AppToolKeyType } from "./d_meta"
import COMMON_FN_REF from "./common_ref"
import { GithubRepoLink } from "@/__CORE__/meta/constants"
import { PortalDefinitionTbabGroup, PortalDefinitionType } from "./d_portal"
import { CategorySearchProps } from "@/[lang]/page"
import { tw } from "../../types/styles"
import { ifnil } from "@/__CORE__/meta/fn"
import _ from "lodash"
import { useListenMainDot } from "@/__CORE__/utils/i18n-for-dynamic-loadDOT"
// import { ifnil } from "../../pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/ProcessPanel/hooks"

export type CategoryType = "" | "tools" | "resources" | "docs" | "ai" | "user"

export let getSubCategoryByProps = (props: CategorySearchProps): PortalDefinitionType[] => {
    let a = __getSubCategoryByProps(props)
    let allSubTabs: PortalDefinitionTbabGroup[] = []
    _.forEach(a, x => {
        allSubTabs = allSubTabs.concat(x.subTabs || [])
    })
    return [
        {
            id: 'all',
            label: Dot("IzUedAcWt", "All"),
            longLabel: Dot("IzUedAcsWt", "All"),
            seoTitle: Dot("IzUedAcW", "All"),
            subTabs: allSubTabs
        },
        ...a
    ]
}
export let __getSubCategoryByProps = (props: CategorySearchProps): PortalDefinitionType[] => {
    switch (props.params.category) {
        case 'ai':
            return getAISubCategory()
        case 'docs':
            return getDocsSubCategory()
        case 'resources':
            return getResourcesSubCategory()
        case 'user':
            return getUserSubCategory()
        case 'tools':
        default:
            return getToolSubCategory()
    }
}

export let getCategoryParentTwClz = (category: CategoryType): string => {
    // let parentClz = tw` dark:bg-sky-900 bg-sky-600 `
    let parentClz = tw` dark:bg-blue-700 bg-blue-500 `
    if (category == 'ai') {
        parentClz = tw` dark:bg-violet-900 bg-violet-900 `
    } else if (category == 'docs') {
        parentClz = tw` dark:bg-teal-900 bg-teal-700 `
    } else if (category == 'resources') {
        parentClz = tw` dark:bg-yellow-900 bg-yellow-700 `
    } else if (category == 'user') {
        // parentClz = tw` dark:bg-zinc-900 bg-zinc- `
        // do nothing
    }
    return parentClz
}
export let getIconImgAndBannerTextByCategory = (category: CategoryType, props: NavigatorPassProp): {
    backgroundImage: string,
    textColor: string,
    bgSize: string, iconImg: string, crtTitleBanner: string
} => {
    let backgroundImage = 'linear-gradient(rgb(7 50 88 / 0%), rgb(13 56 163 / 42%)), url(/static/bg/p1.png)'
    let bgSize = '100%'
    let textColor = '#e2e2ff'
    let iconImg = ''
    let crtTitleBanner = ''
    if (ifnil(category, 'tools') == 'tools') {
        iconImg = 'icon-dev.png'
        crtTitleBanner = (
            Dot("OyZLZokUQ", "Empower Development with LafTools!")
        )
    } else if (category == 'ai') {
        backgroundImage = 'linear-gradient(rgb(95 0 62 / 32%), rgb(42 0 99 / 26%)), url(/static/bg/p-ai.png)'
        textColor = 'rgb(238 226 255)'

        iconImg = 'icon-ailab.png'
        crtTitleBanner = (
            Dot("OP2Ogtd1O", "Experience AI Features with LafTools!")
        )
    } else if (category == 'docs') {
        backgroundImage = 'linear-gradient(rgb(0 0 0 / 32%), rgb(43 117 108 / 55%)), url(/static/bg/p-docs.png)'
        textColor = 'rgb(208 234 231)'

        iconImg = 'icon-docs.png'
        crtTitleBanner = (
            Dot("Tj2A9ou2k", "Read Documentations with LafTools!")
        )
    } else if (category == 'resources') {
        // bgSize = '100% 100%'
        backgroundImage = 'linear-gradient(rgb(204 10 10 / 32%), rgb(154 96 16 / 40%)), url(/static/bg/p-resource.png)'
        textColor = 'rgb(255 252 244)'

        iconImg = 'icon-rsce.png'
        crtTitleBanner = (
            Dot("sr9eCEJ0b6M", "Get Resources with LafTools!")
        )
    } else if (category == 'user') {
        iconImg = 'icon.png'
        let name_map = {
            'sign-in': Dot("sign.in", "Sign In"),
            'sign-up': Dot("sign.up", "Sign Up"),
            'reset-password': Dot("forgot.password", "Forgot Password"),
        }
        crtTitleBanner = (
            Dot("sjod7G6WL", "User Centre") + ' - ' + name_map[props.params.id]
        )
    }
    crtTitleBanner = Dot("DkOlPSZ0t", "LafTools")
    return {
        bgSize,
        iconImg,
        backgroundImage,
        textColor,
        crtTitleBanner
    }
}

export let getToolSubCategory = ((): PortalDefinitionType[] => {
    let secondBCLabel = Dot("thAvhgee7", "Universal Tools")
    let toolsPortalDefinitions: PortalDefinitionType[] = [
        {
            seoTitle: Dot("format.code.seo", "Format {0} Code", 'JSON/JS/YAML/CSS/C#/SQL'),
            seoKeywords: [
                Dot("formatjavascript", "Format JavaScript"),
                Dot("formatjson", "Format JSON"),
                Dot("formatyaml", "Format YAML"),
                Dot("formatcss", "Format CSS"),
                Dot("formatcsharp", "Format YAML"),
                "preittier",
                "formatter",
                "lint"
            ],
            seoDescription: Dot("seo.description.format", "Efficiently format your code online with our free tool. Supports multiple languages including JSON, JS, YAML, CSS, C#, and SQL. Improve readability and maintain a consistent coding style across your project."),
            label: Dot("str.formatter", "Formatters"),
            longLabel: Dot("str.formatters.long", "Quick Code Formatters"),
            id: 'formatters',
            subTabs: [
                {
                    id: "jsonformatter",
                    toolId: "JSONBeautify",
                    label: Dot("pkprvdA2O", "JSON Formatter"),
                },
                {
                    id: 'javascriptformatter',
                    toolId: 'JavaScriptBeautify',
                    label: Dot("2Y2Y2qY2", "JavaScript Formatter"),
                },
                {
                    id: 'htmlformatter',
                    toolId: 'HTMLBeautify',
                    label: Dot("2Y2eqY2Y2Y2", "HTML Formatter"),
                },
                {
                    id: "xmlformatter",
                    toolId: 'XMLBeautify',
                    label: Dot("v2YyGqwy2Yh", "XML Formatter"),
                },
                {
                    id: 'yamlformatter',
                    toolId: 'YAMLBeautify',
                    label: Dot("h2Y2Y2Yeq2Y", "YAML Formatter"),
                },
                {
                    id: 'cssformatter',
                    toolId: 'CSSBeautify',
                    label: Dot("2Yd2Y2Y2Y2", "CSS Formatter"),
                },
                {
                    id: 'sqlformatter',
                    toolId: "SQLBeautify",
                    label: Dot("2Y2Y2eqY2Y2", "SQL Formatter"),
                },
                // do same for JSONMinify, JavaScriptMinify, HTMLMinify, XMLMinify, YAMLMinify, CSSMinify, SQLMinify, remember to add affix to the id of Dot
                {
                    id: "jsonminify",
                    toolId: "JSONMinify",
                    label: Dot("pkprdvdA2O", "JSON Minifier"),
                },
                {
                    id: "xmlminify",
                    toolId: 'XMLMinify',
                    label: Dot("v2wy2Yh", "XML Minifier"),
                },
                {
                    id: 'javascriptminify',
                    toolId: 'JavaScriptMinify',
                    label: Dot("2Y2Y2qdqY2", "JavaScript Minifier"),
                },
                {
                    id: 'htmlminify',
                    toolId: 'HTMLMinify',
                    label: Dot("2Y2eq2", "HTML Minifier"),
                },
                {
                    id: 'cssminify',
                    toolId: 'CSSMinify',
                    label: Dot("2Ye2Y2Y2", "CSS Minifier"),
                },
                {
                    id: 'sqlminify',
                    toolId: "SQLMinify",
                    label: Dot("2Y2YY2", "SQL Minifier"),
                },
                // do same for MarkdownBeautify, TypeScriptBeautify, GraphQLBeautify, SCSSBeautify, LessBeautify
                {
                    id: 'markdownformatter',
                    toolId: "MarkdownBeautify",
                    label: Dot("2Y2Y2qYd2Y2", "Markdown Formatter"),
                },
                {
                    id: 'typescriptformatter',
                    toolId: "TypeScriptBeautify",
                    label: Dot("2Y2Y2qqY2Y2", "TypeScript Formatter"),
                },
                {
                    id: 'graphqlformatter',
                    toolId: "GraphQLBeautify",
                    label: Dot("2Ye2dqeY2qY2Y2", "GraphQL Formatter"),
                },
                {
                    id: 'scssformatter',
                    toolId: "SCSSBeautify",
                    label: Dot("2Y2Y2eeeqY2Y2", "{0} Formatter", "SCSS"),
                },
                {
                    id: 'lessformatter',
                    toolId: "LessBeautify",
                    label: Dot("2Ye2Yqw2qY2Y2", "{0} Formatter", "Less"),
                },
                {
                    id: "htmlentity",
                    toolId: 'HTMLEntity',
                    label: Dot("gGpTg5Wn_", "HTML Entity Formats")
                }
            ]
        },
        {
            label: Dot("str.codecs", "Codecs"),
            longLabel: Dot("str.codecs.long", "Encryption and Decryption Tools"),
            id: 'codecs',
            seoTitle: Dot("codecs.seo", "Online Codecs - Base64, URL Encoder, MD5, SHA1, SHA256, SHA512"),
            seoKeywords: [
                "base64",
                "url encoder",
                "md5",
                "sha1",
                "sha256",
                "sha512",
                "online codecs",
                "free codecs",
                "secure codecs"
            ],
            seoDescription: Dot("seo.description.codecs", "Use our free online codecs to encode and decode your data. Supports Base64, URL Encoder, MD5, SHA1, SHA256, SHA512."),
            subTabs: [
                {
                    id: 'base64',
                    toolId: 'edc_base64',
                    label: Dot("sdfqw", "Base64"),
                },
                {
                    id: "urlencoder",
                    toolId: "URLEncode",
                    label: Dot("mdhWk4dtid", "URL Encoder"),
                },
                {
                    id: "md5",
                    toolId: "md5",
                    label: Dot("eTJ2EDLfW", "MD5 Hash"),
                },
                {
                    id: "sha224",
                    toolId: "SHA224",
                    args: [
                        '224',
                        64,
                        64
                    ],
                    label: Dot("dqwrq3w13", "{0} Hash", "SHA224"),
                },
                {
                    id: "sha256",
                    toolId: "SHA256",
                    args: [
                        '256',
                        64,
                        64
                    ],
                    label: Dot("dqwrq3w13", "{0} Hash", "SHA256"),
                },
                {
                    id: "sha384",
                    toolId: "SHA384",
                    args: [
                        '384',
                        160,
                        160
                    ],
                    label: Dot("dqwrq3w13", "{0} Hash", "SHA384"),
                },
                {
                    id: "sha512",
                    toolId: "SHA512",
                    args: [
                        '512',
                        160,
                        160
                    ],
                    label: Dot("dqwrq3w13", "{0} Hash", "SHA512"),
                },
                {
                    id: 'fromhexdump',
                    toolId: 'FromHexdump',
                    label: Dot("eYg7ZNBH6", "From Hexdump"),
                },
                {
                    id: 'tohexdump',
                    toolId: 'ToHexdump',
                    label: Dot("z2FxMaOjF", "To Hexdump"),
                }
            ]
        },
        {
            seoTitle: Dot("encoding.seo", "Online Encoding Tools - URL Encoder, Base64, Escape, Unescape, Encode URI, Decode URI"),
            seoKeywords: [
                "url encoder",
                "base64",
                "escape",
                "unescape",
                "encode uri",
                "decode uri",
                "online encoding",
                "free encoding",
                "secure encoding"
            ],
            seoDescription: Dot("seo.description.encoding", "Use our free online encoding tools to encode and decode your data. Supports URL Encoder, Base64, Escape, Unescape, Encode URI, Decode URI."),
            label: Dot("mhWk4ddtid", "Encoding"),
            longLabel: Dot("mhWk4ddtid.long", "Encoding and Decoding Tools"),
            id: 'encoding',
            subTabs: [
                {
                    id: 'base64',
                    toolId: 'edc_base64',
                    label: Dot("2Y2Y2Yd2Y2", "Base64"),
                },
                {
                    id: 'JSONEscape',
                    toolId: 'JSONEscape',
                    label: Dot("vldqwI4", "{0} Escape", 'JSON'),
                },
                {
                    id: 'JSONUnescape',
                    toolId: 'JSONEscape',
                    label: Dot("fdtedX-", "{0} Unescape", 'JSON'),
                },
                {
                    id: 'encodeuri',
                    toolId: 'URLToEncode',
                    label: Dot("2Y2eY2dfY2Y2", "Encode {0}", 'URL'),
                },
                {
                    id: 'decodeuri',
                    toolId: 'URLToDecode',
                    label: Dot("ddf2Y2Y2", "Decode {0}", 'URL'),
                },
                {
                    id: 'base32',
                    toolId: 'edc_base32',
                },
                {
                    id: 'base45',
                    toolId: 'edc_base45',
                },
                {
                    id: 'base58',
                    toolId: 'edc_base58',
                },
                {
                    id: 'base62',
                    toolId: 'edc_base62',
                },
                {
                    id: 'base85',
                    toolId: 'edc_base85',
                },

                {
                    id: 'ToHexdump',
                    toolId: 'ToHexdump',
                    label: Dot("z2FxMaOjF", "To Hexdump"),
                },

                {
                    id: 'FromHexdump',
                    toolId: 'FromHexdump',
                    label: Dot("eYg7ZNBH6", "From Hexdump"),
                },
            ]
        },
        {
            label: Dot("str.converters", "Converters"),
            longLabel: Dot("HxTXHD3lc", "Convert Data Between Different Formats"),
            seoTitle: Dot("converters.seo", "Online Data Converters - JSON to XML, JSON to CSV, JSON to YAML, XML to JSON, YAML to JSON"),
            seoKeywords: [
                "json to xml",
                "json to csv",
                "json to yaml",
                "xml to json",
                "yaml to json",
                "online converters",
                "free converters",
                "secure converters"
            ],
            seoDescription: Dot("seo.description.converters", "Use our free online converters to convert your data between different formats. Supports JSON to XML, JSON to CSV, JSON to YAML, XML to JSON, YAML to JSON."),
            id: 'converters',
            subTabs: [
                {
                    id: 'json2xml',
                    label: Dot("json2xml.t", "JSON to XML")
                },
                {
                    id: 'json2csv',
                    toolId: 'JSONToCSV',
                    label: Dot("jsondf2csv.31", "JSON to CSV")
                },
                {
                    id: 'json2yaml',
                    label: Dot("json2yaml.t", "JSON to YAML")
                },
                {
                    id: 'xml2json',
                    label: Dot("xml2json.t", "XML to JSON")
                },
                {
                    id: 'csv2json',
                    toolId: 'CSVToJSON',
                    label: Dot("json2csv.31", "CSV to JSON")
                },
                {
                    id: 'yaml2json',
                    label: Dot("yaml2json.t", "YAML to JSON")
                },
                {
                    id: 'snakecase',
                    toolId: 'SnakeCase',
                    label: Dot("convert.snakecase", "Snake Case Conversion")
                },
                {
                    id: 'camelcase',
                    toolId: 'CamelCase',
                    label: Dot("convert.camelcase", "Camel Case Conversion")
                },
                {
                    id: 'kebabcase',
                    toolId: 'KebabCase',
                    label: Dot("convert.kebabcase", "Kebab Case Conversion")
                },
                {
                    id: 'uplowcase',
                    toolId: 'LowerCase',
                    label: Dot("fw-66JBSB", "Upper/Lower Case")
                },
                {
                    id: 'messagepack',
                    toolId: 'MessagePack',
                    label: Dot("LQQt5fQ3Q", "MessagePack Converter")
                },
                {
                    id: "charcode",
                    toolId: 'CharCode',
                    label: Dot("LmmJOduQpV", "Charcode Converter")
                },
                {
                    // binary
                    id: 'binary',
                    toolId: 'Binary',
                    label: Dot("dqw3312", "Binary Converter")
                },
                {
                    // octal
                    id: 'octal',
                    toolId: 'Octal',
                    label: Dot("dmqwm312", "Octal Converter")
                },
                {
                    id: 'decimal',
                    toolId: 'Decimal',
                    label: Dot("uX0qFUazR", "Decimal Converter")
                }
            ]
        },
        {
            label: Dot("str.parsers", "Parsers"),
            longLabel: Dot("str.parsers.long", "Parse and Analyze Common Data Formats"),
            id: 'parsers',
            seoTitle: Dot("parsers.seo", "Online SQL Parser"),
            seoKeywords: [
                "sql parser",
                "online sql parser",
                "free sql parser",
                "secure sql parser"
            ],
            seoDescription: Dot("seo.description.parsers", "Use our free online SQL parser to parse your SQL queries and improve your database performance."),
            subTabs: [
                // {
                //     id: 'sqlparser',
                //     label: Dot("2Yq2eqY2Y2", "SQL Parser"),
                // },
                {
                    id: 'fromhexdump',
                    toolId: 'FromHexdump',
                    label: Dot("eYg7ZNBH6", "From Hexdump"),
                },
                {
                    id: 'tohexdump',
                    toolId: 'ToHexdump',
                    label: Dot("z2FxMaOjF", "To Hexdump"),
                }
            ]
        },
        // {
        //     seoTitle: Dot("generators.seo", "Online Generators - UUID Generator, GUID Generator, Random Generator"),
        //     seoKeywords: [
        //         "uuid generator",
        //         "guid generator",
        //         "random generator",
        //         "online generators",
        //         "free generators",
        //         "secure generators"
        //     ],
        //     seoDescription: Dot("seo.description.generators", "Use our free online generators to generate UUIDs, GUIDs, and random values for your applications."),
        //     label: Dot("IEFy5k39X", "Generators"),
        //     longLabel: Dot("IEFy5k39X.long", "Generate Code, UUIDs, GUIDs, and Random Values"),
        //     id: 'generator',
        //     subTabs: [
        //         {
        //             id: 'uuid',
        //             label: Dot("qwwqee", "UUID Generator"),
        //         },
        //         {
        //             id: 'totp',
        //             label: Dot("459Imii79", "{0} Generator", "TOTP"),
        //         },
        //         // {
        //         //     id: 'guid',
        //         //     label: Dot("qeeqw", "GUID Generator"),
        //         // },
        //         // {
        //         //     id: 'random',
        //         //     label: Dot("eqwwew", "Random Generator"),
        //         // },
        //     ]
        // },
        // items for translation
        {
            seoTitle: Dot("translators.seo", "Online Translators - Text Translator, Code Translator"),
            seoKeywords: [
                "text translator",
                "code translator",
                "online translators",
                "free translators",
                "secure translators"
            ],
            seoDescription: Dot("seo.description.translators", "Use our free online translators to translate text or code for your applications."),
            label: Dot("IEsd5kdX", "Translation"),
            longLabel: Dot("IEFy59X.long", "Translate Text, Code, and More"),
            id: 'translator',
            subTabs: [
                {
                    id: 'text',
                    label: Dot("R-W-MKjIk", "Text Translator"),
                },
                // {
                //     id: 'code',
                //     label: Dot("_60CN694v", "{0} Translator", "Code"),
                // },
                // {
                //     id: 'other',
                //     label: Dot("qeeqw", "Other Translator"),
                // },
            ]
        },
    ]
    toolsPortalDefinitions.forEach(x => {
        x.subTabs = (x.subTabs || []).map(x => {
            if (!x.label && x.toolId) {
                let obj = appToolInfoObj[x.toolId]
                if (obj) {
                    x.label = obj.LabelFn(Dot)
                }
            }
            return x;
        })
        x.secondBreadcrumbLabel = secondBCLabel
    })
    return toolsPortalDefinitions;
})


export let getUserSubCategory = ((): PortalDefinitionType[] => {
    return [
        {
            id: 'opt',
            // secondBreadcrumbLabel: Dot("jSZmia6Zl", "Control Panel"),
            label: Dot("SD2VOXLGD", "User Centre"),
            longLabel: Dot("X-u9FCh1I", "User Centre"),
            seoTitle: Dot("sign.in.title", "Sign In to Your Account"),
            seoKeywords: [
                "sign in",
                "login",
                "account",
                "secure login",
                "secure sign in",
                "secure account"
            ],
            seoDescription: Dot("sign.in.description", "Sign in to your account to access your saved data and settings."),
            subTabs: [
                {
                    id: 'sign-in',
                    label: Dot("sign.in", "Sign In"),
                },
                {
                    id: 'sign-up',
                    label: Dot("sign.up", "Sign Up"),
                },
                {
                    id: 'reset-password',
                    label: Dot("forgot.password", "Forgot Password"),
                },
            ]
        }
    ]
})


export let getResourcesSubCategory = ((): PortalDefinitionType[] => {
    return [
        {
            id: 'code',
            label: Dot("code", "Code"),
            longLabel: Dot("code", "Code"),
            seoTitle: Dot("code", "Code"),
            seoKeywords: [
                "code",
                "code snippets",
                "code examples",
                "code samples",
                "code templates",
                "code resources",
                "code tools"
            ],
            seoDescription: Dot("code", "Code"),
            subTabs: [
                {
                    id: 'code-snippets',
                    label: Dot("code.snippets", "Code Snippets"),
                },
                {
                    id: 'code-examples',
                    label: Dot("code.examples", "Code Examples"),
                },
                {
                    id: 'code-samples',
                    label: Dot("code.samples", "Code Samples"),
                },
                {
                    id: 'code-templates',
                    label: Dot("code.templates", "Code Templates"),
                },
                {
                    id: 'code-resources',
                    label: Dot("code.resources", "Code Resources"),
                },
                {
                    id: 'code-tools',
                    label: Dot("code.tools", "Code Tools"),
                },
            ]
        }
    ]
})

export let getAISubCategory = ((): PortalDefinitionType[] => {
    return [
        {
            id: 'ai-lab',
            label: Dot("AI Lab", "AI Lab"),
            longLabel: Dot("AI Lab", "AI Lab"),
            seoTitle: Dot("AI Lab", "AI Lab"),
            seoKeywords: [
                "ai lab",
                "ai tools",
                "ai models",
                "ai experiments",
                "ai research",
                "ai development"
            ],
            seoDescription: Dot("AI Lab", "AI Lab"),
            subTabs: [
                {
                    id: 'ai-models',
                    label: Dot("AI Models", "AI Models"),
                },
                {
                    id: 'ai-tools',
                    label: Dot("AI Tools", "AI Tools"),
                },
                {
                    id: 'ai-experiments',
                    label: Dot("AI Experiments", "AI Experiments"),
                },
                {
                    id: 'ai-research',
                    label: Dot("AI Research", "AI Research"),
                },
                {
                    id: 'ai-development',
                    label: Dot("AI Development", "AI Development"),
                },
            ]
        }
    ]
})

export let getDocsSubCategory = ((): PortalDefinitionType[] => {
    return [
        // Frontend docs 
        {
            id: 'frontend',
            label: Dot("Frontend", "Frontend"),
            longLabel: Dot("Frontend", "Frontend"),
            seoTitle: Dot("Frontend", "Frontend"),
            seoKeywords: [
                "frontend",
                "frontend docs",
                "frontend guide",
                "frontend tutorials",
                "frontend resources",
                "frontend tools"
            ],
            seoDescription: Dot("Frontend", "Frontend"),
            subTabs: [
                {
                    id: 'html',
                    label: Dot("HTML", "HTML"),
                },
                {
                    id: 'css',
                    label: Dot("CSS", "CSS"),
                },
                {
                    id: 'javascript',
                    label: Dot("JavaScript", "JavaScript"),
                },
                {
                    id: 'typescript',
                    label: Dot("TypeScript", "TypeScript"),
                },
                {
                    id: 'react',
                    label: 'React',
                },
                {
                    id: 'vue',
                    label: 'Vue',
                },
                {
                    id: 'angular',
                    label: 'Angular',
                },
                {
                    id: 'svelte',
                    label: 'Svelte',
                },
                {
                    id: 'web-components',
                    label: Dot("Web Components", "Web Components"),
                },
                {
                    id: 'pwa',
                    label: Dot("PWA", "PWA"),
                },
                {
                    id: 'web-assembly',
                    label: Dot("Web Assembly", "Web Assembly"),
                },
                {
                    id: 'webgl',
                    label: Dot("WebGL", "WebGL"),
                },
                {
                    id: 'webvr',
                    label: Dot("WebVR", "WebVR"),
                },
                {
                    id: 'webxr',
                    label: Dot("WebXR", "WebXR"),
                },
                {
                    id: 'websockets',
                    label: Dot("WebSockets", "WebSockets"),
                },
                {
                    id: 'web-audio',
                    label: Dot("Web Audio", "Web Audio"),
                },
                {
                    id: 'web-rtc',
                    label: Dot("WebRTC", "WebRTC"),
                },
                {
                    id: 'web-storage',
                    label: Dot("Web Storage", "Web Storage"),
                }
            ]
        },
        // backend docs
        {
            id: 'backend',
            label: Dot("Backend", "Backend"),
            longLabel: Dot("Backend", "Backend"),
            seoTitle: Dot("Backend", "Backend"),
            seoKeywords: [
                "backend",
                "backend docs",
                "backend guide",
                "backend tutorials",
                "backend resources",
                "backend tools"
            ],
            seoDescription: Dot("Backend", "Backend"),
            subTabs: [
                {
                    id: 'nodejs',
                    label: "Node.js",
                },
                {
                    id: 'express',
                    label: "Express",
                },
                {
                    id: 'koa',
                    label: "Koa",
                },
                {
                    id: 'hapi',
                    label: "Hapi",
                },
                {
                    id: 'sails',
                    label: "Sails",
                },
                {
                    id: 'meteor',
                    label: "Meteor",
                },
                {
                    id: 'nestjs',
                    label: "NestJS",
                },
                // provide java-based backend docs
                {
                    id: 'java',
                    label: "Java",
                },
                {
                    id: 'spring',
                    label: "Spring",
                },
                {
                    id: 'spring-boot',
                    label: "Spring Boot",
                },
                {
                    id: 'spring-cloud',
                    label: "Spring Cloud",
                },
                {
                    id: 'spring-data',
                    label: "Spring Data",
                },
                {
                    id: 'spring-security',
                    label: "Spring Security",
                },
                {
                    id: 'spring-web',
                    label: "Spring Web",
                },
                {
                    id: 'spring-webflux',
                    label: "Spring WebFlux",
                },
                {
                    id: 'spring-mvc',
                    label: "Spring MVC",
                },
            ]
        },
        // provide database docs
        {
            id: 'database',
            label: Dot("Database", "Database"),
            longLabel: Dot("Database", "Database"),
            seoTitle: Dot("Database", "Database"),
            seoKeywords: [
                "database",
                "database docs",
                "database guide",
                "database tutorials",
                "database resources",
                "database tools"
            ],
            seoDescription: Dot("Database", "Database"),
            subTabs: [
                {
                    id: 'mysql',
                    label: "MySQL",
                },
                {
                    id: 'mariadb',
                    label: "MariaDB",
                },
                {
                    id: 'postgresql',
                    label: "PostgreSQL",
                },
                {
                    id: 'sqlite',
                    label: "SQLite",
                },
                {
                    id: 'mongodb',
                    label: "MongoDB",
                },
                {
                    id: 'couchdb',
                    label: "CouchDB",
                },
                {
                    id: 'cassandra',
                    label: "Cassandra",
                },
                {
                    id: 'redis',
                    label: "Redis",
                },
                {
                    id: 'memcached',
                    label: "Memcached",
                },
                {
                    id: 'elasticsearch',
                    label: "Elasticsearch",
                },
                {
                    id: 'solr',
                    label: "Solr",
                },
                {
                    id: 'neo4j',
                    label: "Neo4j",
                },
                {
                    id: 'orientdb',
                    label: "OrientDB",
                },
                {
                    id: 'arangodb',
                    label: "ArangoDB",
                },
                {
                    id: 'influxdb',
                    label: "InfluxDB",
                },
                {
                    id: 'timescaledb',
                    label: "TimescaleDB",
                },
                {
                    id: 'cockroachdb',
                    label: "CockroachDB",
                },
            ]
        },
        // provide webmaster docs
        {
            id: 'webmaster',
            label: Dot("Webmaster", "Webmaster"),
            longLabel: Dot("Webmaster", "Webmaster"),
            seoTitle: Dot("Webmaster", "Webmaster"),
            seoKeywords: [
                "webmaster",
                "webmaster docs",
                "webmaster guide",
                "webmaster tutorials",
                "webmaster resources",
                "webmaster tools"
            ],
            seoDescription: Dot("Webmaster", "Webmaster"),
            subTabs: [
                {
                    id: 'seo',
                    label: "SEO",
                },
                {
                    id: 'sem',
                    label: "SEM",
                },
                {
                    id: 'smm',
                    label: "SMM",
                },
                {
                    id: 'ppc',
                    label: "PPC",
                },
                {
                    id: 'cro',
                    label: "CRO",
                },
                {
                    id: 'ux',
                    label: "UX",
                },
                {
                    id: 'ui',
                    label: "UI",
                },
                {
                    id: 'usability',
                    label: "Usability",
                },
                {
                    id: 'accessibility',
                    label: "Accessibility",
                },
                {
                    id: 'web-analytics',
                    label: "Web Analytics",
                },
                {
                    id: 'webmaster-tools',
                    label: "Webmaster Tools",
                },
                {
                    id: 'webmaster-resources',
                    label: "Webmaster Resources",
                },
            ]
        },
    ]
})