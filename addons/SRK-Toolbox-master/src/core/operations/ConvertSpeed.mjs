/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Convert speed operation
 */
class ConvertSpeed extends Operation {

    /**
     * ConvertSpeed constructor
     */
    constructor() {
        super();

        this.name = "单位转换：速度";
        this.module = "Default";
        this.description = "转换速度单位。";
        this.infoURL = "https://wikipedia.org/wiki/Orders_of_magnitude_(speed)";
        this.inputType = "BigNumber";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "输入单位",
                "type": "option",
                "value": SPEED_UNITS
            },
            {
                "name": "输出单位",
                "type": "option",
                "value": SPEED_UNITS
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

        input = input.times(SPEED_FACTOR[inputUnits]);
        return input.div(SPEED_FACTOR[outputUnits]);
    }

}

const SPEED_UNITS = [
    "[公制]", "米每秒 (m/s)", "千米每小时 (km/h)", "[/公制]",
    "[英制]", "英里每小时 (mph)", "节 (kn)", "[/英制]",
    "[速度比较]", "人类头发生长", "竹子生长", "世界上最快的蜗牛", "博尔特最高跑速", "喷气式客机巡航速度", "协和客机", "SR-71黑鸟式侦察机", "航天飞机", "国际空间站", "[/速度比较]",
    "[科学]", "标准大气压声速", "水中声速", "月球逃逸速度", "地球逃逸速度", "地球公转", "太阳系公转", "银河系相对宇宙背景辐射", "太阳逃逸速度", "中子星逃逸速度 (0.3c)", "钻石中光速 (0.4136c)", "光纤信号速度 (0.667c)", "光速 (c)", "[/科学]",
];

const SPEED_FACTOR = { // Multiples of m/s
    // 公制
    "米每秒 (m/s)":           1,
    "千米每小时 (km/h)":        0.2778,

    // 英制
    "英里每小时 (mph)":              0.44704,
    "节 (kn)":                        0.5144,

    // 速度比较
    "人类头发生长":            4.8e-9,
    "竹子生长":                1.4e-5,
    "世界上最快的蜗牛":             0.00275,
    "博尔特最高跑速":            12.42,
    "喷气式客机巡航速度":       250,
    "协和客机":                          603,
    "SR-71黑鸟式侦察机":                   981,
    "航天飞机":                     1400,
    "国际空间站":       7700,

    // 科学
    "标准大气压声速":      340.3,
    "水中声速":                    1500,
    "月球逃逸速度":             2375,
    "地球逃逸速度":             11200,
    "地球公转":               29800,
    "太阳系公转":    200000,
    "银河系相对宇宙背景辐射": 552000,
    "太阳逃逸速度":             617700,
    "中子星逃逸速度 (0.3c)": 100000000,
    "钻石中光速 (0.4136c)":      124000000,
    "光纤信号速度 (0.667c)": 200000000,
    "光速 (c)":                         299792458,
};


export default ConvertSpeed;
