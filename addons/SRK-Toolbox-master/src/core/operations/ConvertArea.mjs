/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Convert area operation
 */
class ConvertArea extends Operation {

    /**
     * ConvertArea constructor
     */
    constructor() {
        super();

        this.name = "单位转换：面积";
        this.module = "Default";
        this.description = "转换面积单位。";
        this.infoURL = "https://wikipedia.org/wiki/Orders_of_magnitude_(area)";
        this.inputType = "BigNumber";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "输入单位",
                "type": "option",
                "value": AREA_UNITS
            },
            {
                "name": "输出单位",
                "type": "option",
                "value": AREA_UNITS
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

        input = input.times(AREA_FACTOR[inputUnits]);
        return input.div(AREA_FACTOR[outputUnits]);
    }

}


const AREA_UNITS = [
    "[公制]", "平方米 (sq m)", "平方千米 (sq km)", "百分之一公亩 (ca)", "十分之一公亩 (da)", "公亩 (a)", "十公亩 (daa)", "公顷 (ha)", "[/公制]",
    "[英制]", "平方英寸 (sq in)", "平方英尺 (sq ft)", "平方码 (sq yd)", "平方英里 (sq mi)", "Perch (sq per)", "Rood (ro)", "英亩 (ac)", "[/英制]",
    "[美制]", "美国测量英亩 (ac)", "美国测量平方英里 (sq mi)", "US survey township", "[/美制]",
    "[核物理]", "幺靶 (yb)", "仄靶 (zb)", "阿靶 (ab)", "飞靶 (fb)", "皮靶 (pb)", "纳靶 (nb)", "微靶 (μb)", "毫靶 (mb)", "靶 (b)", "千靶 (kb)", "百万靶 (Mb)", "Outhouse", "Shed", "普朗克面积", "[/核物理]",
    "[尺寸比较]", "华盛顿特区", "怀特岛", "威尔士", "得克萨斯州", "[/尺寸比较]",
];

const AREA_FACTOR = { // Multiples of a square metre
    // Metric
    "平方米 (sq m)":      1,
    "平方千米 (sq km)": 1e6,

    "百分之一公亩 (ca)":            1,
    "十分之一公亩 (da)":             10,
    "公亩 (a)":                  100,
    "十公亩 (daa)":             1e3,
    "公顷 (ha)":             1e4,

    // Imperial
    "平方英寸 (sq in)":      0.00064516,
    "平方英尺 (sq ft)":      0.09290304,
    "平方码 (sq yd)":      0.83612736,
    "平方英里 (sq mi)":      2589988.110336,
    "Perch (sq per)":           42.21,
    "Rood (ro)":                1011,
    "英亩 (ac)":  4046.8564224,

    // US customary units
    "美国测量英亩 (ac)":      4046.87261,
    "美国测量平方英里 (sq mi)": 2589998.470305239,
    "US survey township":       93239944.9309886,

    // Nuclear physics
    "幺靶 (yb)":           1e-52,
    "仄靶 (zb)":           1e-49,
    "阿靶 (ab)":            1e-46,
    "飞靶 (fb)":           1e-43,
    "皮靶 (pb)":            1e-40,
    "纳靶 (nb)":            1e-37,
    "微靶 (μb)":           1e-34,
    "毫靶 (mb)":           1e-31,
    "靶 (b)":                 1e-28,
    "千靶 (kb)":            1e-25,
    "百万靶 (Mb)":            1e-22,

    "普朗克面积":              2.6e-70,
    "Shed":                     1e-52,
    "Outhouse":                 1e-34,

    // Comparisons
    "华盛顿特区":          176119191.502848,
    "怀特岛":            380000000,
    "威尔士":                    20779000000,
    "得克萨斯州":                    696241000000,
};


export default ConvertArea;
