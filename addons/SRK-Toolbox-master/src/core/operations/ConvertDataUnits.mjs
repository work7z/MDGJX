/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Convert data units operation
 */
class ConvertDataUnits extends Operation {

    /**
     * ConvertDataUnits constructor
     */
    constructor() {
        super();

        this.name = "单位转换：数据";
        this.module = "Default";
        this.description = "转换计算机数据单位。";
        this.infoURL = "https://wikipedia.org/wiki/Orders_of_magnitude_(data)";
        this.inputType = "BigNumber";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "输入单位",
                "type": "option",
                "value": DATA_UNITS
            },
            {
                "name": "输出单位",
                "type": "option",
                "value": DATA_UNITS
            }
        ];
    }

    /**
     * @param {BigNumber} input
     * @param {Object[]} args
     * @returns {BigNumber}
     */
    run(input, args) {
        const [inputUnits, outputUnits] = args;

        input = input.times(DATA_FACTOR[inputUnits]);
        return input.div(DATA_FACTOR[outputUnits]);
    }

}

const DATA_UNITS = [
    "比特 (b)", "四位元组 (Nibble)", "八位元组 (Octet)", "字节 (B)",
    "[二进制比特 (2^n)]", "千比特 (Kib)", "兆比特 (Mib)", "吉比特 (Gib)", "太比特 (Tib)", "拍比特 (Pib)", "艾比特 (Eib)", "泽比特 (Zib)", "尧比特 (Yib)", "[/二进制比特 (2^n)]",
    "[十进制比特 (10^n)]", "十比特", "百比特", "千比特 (Kb)", "兆比特 (Mb)", "吉比特 (Gb)", "太比特 (Tb)", "拍比特 (Pb)", "艾比特 (Eb)", "泽比特 (Zb)", "尧比特 (Yb)", "[/十进制比特 (10^n)]",
    "[二进制字节 (8 x 2^n)]", "千字节 (KiB)", "兆字节 (MiB)", "吉字节 (GiB)", "太字节 (TiB)", "拍字节 (PiB)", "艾字节 (EiB)", "泽字节 (ZiB)", "尧字节 (YiB)", "[/二进制字节 (8 x 2^n)]",
    "[十进制字节 (8 x 10^n)]", "千字节 (KB)", "兆字节 (MB)", "吉字节 (GB)", "太字节 (TB)", "拍字节 (PB)", "艾字节 (EB)", "泽字节 (ZB)", "尧字节 (YB)", "[/十进制字节 (8 x 10^n)]"
];

const DATA_FACTOR = { // Multiples of a bit
    "比特 (b)":        1,
    "四位元组 (Nibble)":         4,
    "八位元组 (Octet)":          8,
    "字节 (B)":       8,

    // 二进制比特 (2^n)
    "千比特 (Kib)":  1024,
    "兆比特 (Mib)":  1048576,
    "吉比特 (Gib)":  1073741824,
    "太比特 (Tib)":  1099511627776,
    "拍比特 (Pib)":  1125899906842624,
    "艾比特 (Eib)":  1152921504606846976,
    "泽比特 (Zib)":  1180591620717411303424,
    "尧比特 (Yib)":  1208925819614629174706176,

    // Decimal 比特 (10^n)
    "十比特":        10,
    "百比特":       100,
    "千比特 (Kb)":   1e3,
    "兆比特 (Mb)":   1e6,
    "吉比特 (Gb)":   1e9,
    "太比特 (Tb)":   1e12,
    "拍比特 (Pb)":   1e15,
    "艾比特 (Eb)":    1e18,
    "泽比特 (Zb)":  1e21,
    "尧比特 (Yb)":  1e24,

    // 二进制字节 (8 x 2^n)
    "千字节 (KiB)": 8192,
    "兆字节 (MiB)": 8388608,
    "吉字节 (GiB)": 8589934592,
    "太字节 (TiB)": 8796093022208,
    "拍字节 (PiB)": 9007199254740992,
    "艾字节 (EiB)": 9223372036854775808,
    "泽字节 (ZiB)": 9444732965739290427392,
    "尧字节 (YiB)": 9671406556917033397649408,

    // 十进制字节 (8 x 10^n)
    "千字节 (KB)":  8e3,
    "兆字节 (MB)":  8e6,
    "吉字节 (GB)":  8e9,
    "太字节 (TB)":  8e12,
    "拍字节 (PB)":  8e15,
    "艾字节 (EB)":   8e18,
    "泽字节 (ZB)": 8e21,
    "尧字节 (YB)": 8e24,
};


export default ConvertDataUnits;
