/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Convert distance operation
 */
class ConvertDistance extends Operation {

    /**
     * ConvertDistance constructor
     */
    constructor() {
        super();

        this.name = "单位转换：距离";
        this.module = "Default";
        this.description = "转换距离单位。";
        this.infoURL = "https://wikipedia.org/wiki/Orders_of_magnitude_(length)";
        this.inputType = "BigNumber";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "输入单位",
                "type": "option",
                "value": DISTANCE_UNITS
            },
            {
                "name": "输出单位",
                "type": "option",
                "value": DISTANCE_UNITS
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

        input = input.times(DISTANCE_FACTOR[inputUnits]);
        return input.div(DISTANCE_FACTOR[outputUnits]);
    }

}

const DISTANCE_UNITS = [
    "[公制]", "纳米 (nm)", "微米 (µm)", "毫米 (mm)", "厘米 (cm)", "米 (m)", "千米 (km)", "[/公制]",
    "[英制]", "英丝 (th)", "英寸 (in)", "英尺 (ft)", "码 (yd)", "链 (ch)", "浪 (fur)", "英里 (mi)", "里格 (lea)", "[/英制]",
    "[海洋]", "英寻 (ftm)", "链", "海里", "[/海洋]",
    "[尺寸比较]", "香蕉 (0.178m)", "汽车 (4m)", "公交车 (8.4m)", "橄榄球场 (91m)", "足球场 (105m)", "[/尺寸比较]",
    "[天文]", "地月距离", "赤道", "天文单位 (au)", "光年 (ly)", "秒差距 (pc)", "[/天文]",
];

const DISTANCE_FACTOR = { // Multiples of a metre
    "纳米 (nm)":         1e-9,
    "微米 (µm)":        1e-6,
    "毫米 (mm)":        1e-3,
    "厘米 (cm)":        1e-2,
    "米 (m)":              1,
    "千米 (km)":         1e3,

    "英丝 (th)":               0.0000254,
    "英寸 (in)":             0.0254,
    "英尺 (ft)":               0.3048,
    "码 (yd)":              0.9144,
    "链 (ch)":             20.1168,
    "浪 (fur)":          201.168,
    "英里 (mi)":              1609.344,
    "里格 (lea)":           4828.032,

    "英寻 (ftm)":           1.853184,
    "链":                  185.3184,
    "海里":          1853.184,

    "汽车 (4m)":               4,
    "公交车 (8.4m)":            8.4,
    "橄榄球场 (91m)": 91,
    "足球场 (105m)": 105,
    "香蕉 (0.178m)":            0.178,

    "地月距离":          380000000,
    "赤道":        40075016.686,
    "天文单位 (au)": 149597870700,
    "光年 (ly)":                9460730472580800,
    "秒差距 (pc)":              3.0856776e16
};


export default ConvertDistance;
