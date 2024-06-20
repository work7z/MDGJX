/**
 * lz-string exports.
 *
 * @author crespyl [peter@crespyl.net]
 * @copyright Peter Jacobs 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import LZString from "lz-string";

export const COMPRESSION_OUTPUT_FORMATS = ["默认", "UTF16", "Base64"];
export const COMPRESSION_FUNCTIONS = {
    "默认": LZString.compress,
    "UTF16":   LZString.compressToUTF16,
    "Base64":  LZString.compressToBase64,
};
export const DECOMPRESSION_FUNCTIONS = {
    "默认": LZString.decompress,
    "UTF16":   LZString.decompressFromUTF16,
    "Base64":  LZString.decompressFromBase64,
};
