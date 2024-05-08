// LafTools
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { OneOf } from "protobufjs";
import CommonRef, { DotType } from "./common_ref";
import { ToolHandler, ToolHandlerClass } from "./r_handler";
import { FAQItem } from './faq/types'
import _ from "lodash";
import { CodeImplMap } from "./code/types";
import Operation from "../core/Operation.tsx";
import { AppOpFnMapTypeKeys } from "./g_optlist.tsx";
import { satisfies } from "semver";
import { Dot } from "../../utils/cTranslationUtils.tsx";

export type StrFnType = (Dot: DotType) => string
export type StrArrFnType = (Dot: DotType) => string[]
export type AppInfoType = {
    LabelFn: StrFnType;
    FeaturesFns?: StrArrFnType[];

    ImportImpl?: () => Promise<{
        default: ToolHandlerClass
    }>
    ImportFAQ?: () => Promise<{
        default: () => FAQItem[]
    }>
    ImportCode?: () => Promise<{
        default: () => CodeImplMap
    }>
}
let passInfo = (obj: AppInfoType): AppInfoType => {
    return obj;
}

let featuresObj: { [key: string]: StrArrFnType } = {
    json: (Dot: DotType) => {
        return [
            Dot("wVApSGGdZ", "Emoji and Chinese characters support"),
            Dot("wVApSGGdZ", "Supports comments and trailing commas"),
            Dot("wVApSGGdZ", "Supports JSON5 and JSON with comments"),
        ]
    }
}
// NOTE: do not add typing for appToolInfoObj, it will be inferred from the object
let appToolInfoObj = {
    "bcd": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7qe", "BCD")
    }),
    "edc_base64": passInfo({
        LabelFn: (Dot: DotType) => Dot("gkC8t", "Base64")
    }),
    "edc_base32": passInfo({
        LabelFn: (Dot: DotType) => Dot("gkqC8t", "Base32")
    }),
    "edc_base45": passInfo({
        LabelFn: (Dot: DotType) => Dot("gkdqqC8t", "Base45")
    }),
    "edc_base58": passInfo({
        LabelFn: (Dot: DotType) => Dot("egkqC8t", "Base58")
    }),
    "edc_base62": passInfo({
        LabelFn: (Dot: DotType) => Dot("egkqCd8t", "Base62")
    }),
    "edc_base85": passInfo({
        LabelFn: (Dot: DotType) => Dot("e4Cd8t", "Base85")
    }),
    "CSSBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "CSS")
    }),
    "JSONBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "JSON"),
        FeaturesFns: [
            featuresObj.json
        ]
    }),
    "JavaScriptBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "JavaScript")
    }),
    "XMLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "XML")
    }),
    "YAMLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "YAML"),
    }),
    "GenericCodeBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", Dot("Vvt09V2Qo", "Generic Code"))
    }),
    "SQLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "SQL")
    }),
    "HTMLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "HTML")
    }),
    "MarkdownBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "Markdown")
    }),
    "TypeScriptBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "TypeScript")
    }),
    // GraphqlBeautify
    "GraphQLBeautify": passInfo({
        // ext: {
        //     parser: "graphql",
        //     plugins: [parserGraphql],
        // },
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "GraphQL")
    }),
    "SCSSBeautify": passInfo({

        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "SCSS")
    }),
    "LessBeautify": passInfo({
        // {
        //     parser: "scss"|"less"|"css",
        //     plugins: [parserPostcss],
        // }
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "Less")
    }),
    "md5": passInfo({
        LabelFn: (Dot: DotType) => "MD5"
    }),
    "md2": passInfo({
        LabelFn: (Dot: DotType) => "MD2"
    }),
    "md4": passInfo({
        LabelFn: (Dot: DotType) => "MD4"
    }),
    "md6": passInfo({
        LabelFn: (Dot: DotType) => "MD6"
    }),
    "JSONMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "JSON"),
        FeaturesFns: [
            featuresObj.json
        ]
    }),
    "XMLMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "XML")
    }),
    "CSSMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "CSS")
    }),
    "SQLMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "SQL")
    }),
    "JavaScriptMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("UVvJp-vtF", "{0} Minify", "JavaScript")
    }),
    hex: passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8wx7", "Hex String")
    }),
    SHA0: passInfo({
        LabelFn: (Dot: DotType) => "SHA-0"
    }),
    SHA1: passInfo({
        LabelFn: (Dot: DotType) => "SHA-1"
    }),
    SHA2: passInfo({
        LabelFn: (Dot: DotType) => "SHA-2"
    }),
    SHA3: passInfo({
        LabelFn: (Dot: DotType) => "SHA-3"
    }),
    Tail: passInfo({
        LabelFn: (Dot: DotType) => Dot("tail", "Tail")
    }),
    RemoveWhitespace: passInfo({
        LabelFn: (Dot: DotType) => Dot("remove-whitespace", "Remove Whitespace")
    }),
    RemoveLineNumbers: passInfo({
        LabelFn: (Dot: DotType) => Dot("1fd8x7dqw", "Remove Line Numbers")
    }),
    Reverse: passInfo({
        LabelFn: (Dot: DotType) => Dot("reverse.text", "Reverse Text")
    }),
    CSVToJSON: passInfo({
        LabelFn: (Dot: DotType) => Dot("1X8x7dqw", "CSV to JSON")
    }),
    JSONToCSV: passInfo({
        LabelFn: (Dot: DotType) => Dot("UaDAW3Puf", "JSON to CSV")
    }),
    // Example
    "Example": passInfo({
        LabelFn: (Dot: DotType) => Dot("1X8x7", "Example")
    }),
    JSONEscape: passInfo({
        LabelFn: (Dot: DotType) => Dot("l3k11X8qw", "JSON Escape")
    }),
    SHA512: passInfo({
        LabelFn: (Dot: DotType) => "SHA-512"
    }),
    SHA384: passInfo({
        LabelFn: (Dot: DotType) => "SHA-384"
    }),
    SHA256: passInfo({
        LabelFn: (Dot: DotType) => "SHA-256"
    }),
    SHA224: passInfo({
        LabelFn: (Dot: DotType) => "SHA-224"
    }),
    URLEncode: passInfo({
        LabelFn: (Dot: DotType) => Dot("EPSPCHhsa", "URL Encode")
    }),
    URLToEncode: passInfo({
        LabelFn: (Dot: DotType) => Dot("EPSPCHhsa", "URL Encode")
    }),
    URLToDecode: passInfo({
        LabelFn: (Dot: DotType) => Dot("EPSdPCHhsa", "URL Decode")
    }),
    ToHexdump: passInfo({
        LabelFn: (Dot: DotType) => Dot("dqwew", "To {0}", Dot("Hexdump", "Hexdump"))
    }),
    FromHexdump: passInfo({
        LabelFn: (Dot: DotType) => Dot("d33qw", "From {0}", Dot("Hexdump", "Hexdump"))
    }),
    HTMLMinify: passInfo({
        LabelFn: (Dot: DotType) => Dot("N6-IVLWRV", "{0} Minify", "HTML")
    }),
    // JSONViewer: passInfo({
    //     LabelFn: (Dot: DotType) => Dot("1Xdsqwqw", "JSON Viewer")
    // }),
    // new items on 2024-04-08

    SnakeCase: passInfo({
        LabelFn: (Dot: DotType) => Dot("snakecasecon", "Snake Case Converter")
    }),
    MorseCode: passInfo({
        LabelFn: (Dot: DotType) => Dot("to.morsecode.conve", "Morse Code Converter")
    }),
    MessagePack: passInfo({
        LabelFn: (Dot: DotType) => Dot("to.Jdzc-Fj9e", "MessagePack Converter")
    }),
    ToLowerCase: passInfo({
        LabelFn: (Dot: DotType) => Dot("to.lowercase", "To Lower Case")
    }),
    KebabCase: passInfo({
        LabelFn: (Dot: DotType) => Dot("to.kebabcasconvee", "Kebab Case Converter")
    }),
    HTMLEntity: passInfo({
        LabelFn: (Dot: DotType) => Dot("to.OIPWU3egZ", "HTML Entity Formats")
    }),
    CharCode: passInfo({
        LabelFn: (Dot: DotType) => Dot("to.ch314mU8VGl", "Char Code")
    }),
    CamelCase: passInfo({
        LabelFn: (Dot: DotType) => Dot("to.camelcase.conv", "Camel Case Converter")
    }),
    Binary: passInfo({
        LabelFn: (Dot: DotType) => Dot("tmutZD17dx", "Binary Formats")
    }),
    Octal: passInfo({
        LabelFn: (Dot: DotType) => Dot("from.022s5i1Yn", "Octal Formats")
    }),
    LowerCase: passInfo({
        LabelFn: (Dot: DotType) => Dot("from.02YEuozhq16", "Upper Lower Cases")
    }),
    Decimal: passInfo({
        LabelFn: (Dot: DotType) => Dot("from.0s5i1Yn", "Decimal Formats")
    }),
} satisfies Record<string, AppInfoType>

_.forEach(appToolInfoObj, (x, d, n) => {
    x.ImportImpl = () => import(`./impl/${d}.tsx`)
    x.ImportFAQ = () => import(`./faq/${d}.tsx`)
    x.ImportCode = () => import(`./code/${d}.tsx`)
})

// NOTE: key is the language type or just a prefered id
// let us say we can show related tools for a given tool based on its lang type or prefered id
export const AppToolConversionIdCollectionSet = {
    generate: [],
    json: ['JSONBeautify', 'JSONMinify', 'JSONEscape', 'CSVToJSON'],
    javascript: ['JavaScriptBeautify', 'JavaScriptMinify'],
    css: ['CSSBeautify', 'CSSMinify'],
    sql: ['SQLBeautify', 'SQLMinify'],
    bcd: ['ToBCD', 'FromBCD'],
    hex: ['FromHex', 'ToHex', 'FromHexdump', 'ToHexdump'],
    text: ['RemoveWhitespace', 'Tail', 'Reverse', 'RemoveLineNumbers'],
    beautify: ['JSONBeautify', 'JavaScriptBeautify', 'CSSBeautify', 'XMLBeautify', 'YAMLBeautify', 'SQLBeautify', 'HTMLBeautify'],
    xml: ['XMLBeautify', 'XMLMinify'],
    html: ['HTMLBeautify', 'HTMLMinify', 'ToHTMLEntity', 'FromHTMLEntity'],
    yaml: ['YAMLBeautify'],
    // typescript: ['TypeScriptBeautify', 'JavaScriptBeautify', 'JavaScriptMinify'],
    // url: ['URLEncode', 'URLDecode', 'ToBase64', 'FromBase64'],
    url: ['URLEncode', 'URLDecode'],
    base32: ['FromBase32', 'ToBase32', 'MD5'],
    base64: ['FromBase64', 'ToBase64', 'MD5'],
    base45: ['FromBase45', 'ToBase45', 'MD5'],
    base58: ['FromBase58', 'ToBase58', 'MD5'],
    base62: ['FromBase62', 'ToBase62', 'MD5'],
    base85: ['FromBase85', 'ToBase85', 'MD5'],
    md5: ['MD2', 'MD4', 'MD6', 'SHA3', 'MD5'],
    sha: ['SHA0', 'SHA1', 'SHA2', 'SHA3', 'MD5'],
    sha3s: ['SHA512', 'SHA384', 'SHA256', 'SHA224'],
    nothing: [],
    fromto: [],
} satisfies { [key: string]: AppOpFnMapTypeKeys[] }


// using infer to get the type of the keys for AppToolConversionIdCollectionSet
export type AppToolConversionIdCollectionSetType = keyof typeof AppToolConversionIdCollectionSet

export type AppToolKeyType = keyof typeof appToolInfoObj;

export type AppOpDetail = {
    optOptionalId?: string
    optName: string
    optDescription: string
}

export type AppOpFnMapType = { [key: string]: (p: { Dot: DotType }) => AppOpDetail }


export let loadConversionTSXById = async (id: string): Promise<Operation> => {
    let a = await import(`./impl/conversion/${id}.tsx`)
    let o: Operation = new a['default']()
    o.fileID = id;
    return o
}





export default appToolInfoObj

