/**
 * Various delimiters
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

/**
 * Generic sequence delimiters.
 */
export const DELIM_OPTIONS = ["空格", "逗号", "分号", "冒号", "换行", "CRLF"];

/**
 * Binary sequence delimiters.
 */
export const BIN_DELIM_OPTIONS = ["空格", "逗号", "分号", "冒号", "换行", "CRLF", "无"];

/**
 * Letter sequence delimiters.
 */
export const LETTER_DELIM_OPTIONS = ["空格", "换行", "CRLF", "斜杠", "反斜杠", "逗号", "分号", "冒号"];

/**
 * Word sequence delimiters.
 */
export const WORD_DELIM_OPTIONS = ["换行", "CRLF", "斜杠", "反斜杠", "逗号", "分号", "冒号"];

/**
 * Input sequence delimiters.
 */
export const INPUT_DELIM_OPTIONS = ["换行", "CRLF", "空格", "逗号", "分号", "冒号", "无"];

/**
 * Arithmetic sequence delimiters
 */
export const ARITHMETIC_DELIM_OPTIONS = ["换行", "空格", "逗号", "分号", "冒号", "CRLF"];

/**
 * Hash delimiters
 */
export const HASH_DELIM_OPTIONS = ["换行", "CRLF", "空格", "逗号"];

/**
 * IP delimiters
 */
export const IP_DELIM_OPTIONS = ["换行", "CRLF", "空格", "逗号", "分号"];

/**
 * Split delimiters.
 */
export const SPLIT_DELIM_OPTIONS = [
    {name: "逗号", value: ","},
    {name: "空格", value: " "},
    {name: "换行", value: "\\n"},
    {name: "CRLF", value: "\\r\\n"},
    {name: "分号", value: ";"},
    {name: "冒号", value: ":"},
    {name: "无", value: ""}
];

/**
 * Join delimiters.
 */
export const JOIN_DELIM_OPTIONS = [
    {name: "换行", value: "\\n"},
    {name: "CRLF", value: "\\r\\n"},
    {name: "空格", value: " "},
    {name: "逗号", value: ","},
    {name: "分号", value: ";"},
    {name: "冒号", value: ":"},
    {name: "无", value: ""}
];

/**
 * RGBA list delimiters.
 */
export const RGBA_DELIM_OPTIONS = [
    {name: "逗号", value: ","},
    {name: "空格", value: " "},
    {name: "CRLF", value: "\\r\\n"},
    {name: "换行", value: "\n"}
];
