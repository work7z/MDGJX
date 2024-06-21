/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Convert mass operation
 */
class ConvertMass extends Operation {

    /**
     * ConvertMass constructor
     */
    constructor() {
        super();

        this.name = "单位转换：质量";
        this.module = "Default";
        this.description = "转换质量单位。";
        this.infoURL = "https://wikipedia.org/wiki/Orders_of_magnitude_(mass)";
        this.inputType = "BigNumber";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "输入单位",
                "type": "option",
                "value": MASS_UNITS
            },
            {
                "name": "输出单位",
                "type": "option",
                "value": MASS_UNITS
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

        input = input.times(MASS_FACTOR[inputUnits]);
        return input.div(MASS_FACTOR[outputUnits]);
    }

}


const MASS_UNITS = [
    "[公制]", "幺克 (yg)", "仄克 (zg)", "阿克 (ag)", "飞克 (fg)", "皮克 (pg)", "纳克 (ng)", "微克 (μg)", "毫克 (mg)", "厘克 (cg)", "分克 (dg)", "克 (g)", "十克 (dag)", "百克 (hg)", "千克 (kg)", "兆克 (Mg)", "吨 (t)", "吉克 (Gg)", "太克 (Tg)", "拍克 (Pg)", "艾克 (Eg)", "泽克 (Zg)", "尧克 (Yg)", "[/公制]",
    "[常衡制]", "格令 (gr)", "打兰 (dr)", "盎司 (oz)", "磅 (lb)", "Nail", "英石 (st)", "夸脱 (gr)", "Tod", "短担 (cwt)", "长担 (cwt)", "短吨 (t)", "长吨 (t)", "[/常衡制]",
    "[金衡制]", "格令 (gr)", "英钱 (dwt)", "金衡制打兰 (dr t)", "金衡制盎司 (oz t)", "金衡制磅 (lb t)", "Mark", "[/金衡制]",
    "[过时单位]", "Wey", "Wool wey", "Suffolk wey", "Wool sack", "Coal sack", "Load", "Last", "Flax or feather last", "Gunpowder last", "Picul", "Rice last", "[/过时单位]",
    "[重量比较]", "大本钟 (14吨)", "蓝鲸 (180吨)", "国际空间站 (417吨)", "航天飞机 (2,041吨)", "泰坦尼克号 (52,000吨)", "吉萨金字塔群 (6,000,000吨)", "地球海洋 (1.4尧克)", "[/重量比较]",
    "[天文]", "一茶匙中子星 (55亿吨)", "月球质量 (ML)", "地球质量 (M⊕)", "木星质量 (MJ)", "太阳质量 (M☉)", "人马座A* (约7.5 x 10^36千克)", "银河系 (1.2 x 10^42 千克)", "可观测宇宙 (1.45 x 10^53 千克)", "[/天文]",
];

const MASS_FACTOR = { // Multiples of a gram
    // 公制
    "幺克 (yg)":     1e-24,
    "仄克 (zg)":     1e-21,
    "阿克 (ag)":      1e-18,
    "飞克 (fg)":     1e-15,
    "皮克 (pg)":      1e-12,
    "纳克 (ng)":      1e-9,
    "微克 (μg)":     1e-6,
    "毫克 (mg)":     1e-3,
    "厘克 (cg)":     1e-2,
    "分克 (dg)":      1e-1,
    "克 (g)":           1,
    "十克 (dag)":     10,
    "百克 (hg)":     100,
    "千克 (kg)":      1000,
    "兆克 (Mg)":      1e6,
    "吨 (t)":          1e6,
    "吉克 (Gg)":      1e9,
    "太克 (Tg)":      1e12,
    "拍克 (Pg)":      1e15,
    "艾克 (Eg)":       1e18,
    "泽克 (Zg)":     1e21,
    "尧克 (Yg)":     1e24,

    // 常衡制
    "格令 (gr)":         64.79891e-3,
    "打兰 (dr)":          1.7718451953125,
    "盎司 (oz)":         28.349523125,
    "磅 (lb)":         453.59237,
    "Nail":               3175.14659,
    "英石 (st)":         6.35029318e3,
    "夸脱 (gr)":       12700.58636,
    "Tod":                12700.58636,
    "短担 (cwt)": 45.359237e3,
    "长担 (cwt)": 50.80234544e3,
    "短吨 (t)":         907.18474e3,
    "长吨 (t)":   1016.0469088e3,

    // 金衡制
    "英钱 (dwt)":  1.55517384,
    "金衡制打兰 (dr t)":   3.8879346,
    "金衡制盎司 (oz t)":  31.1034768,
    "金衡制磅 (lb t)":  373.2417216,
    "Mark":               248.8278144,

    // 过时单位
    "Wey":                76.5e3,
    "Wool wey":           101.7e3,
    "Suffolk wey":        161.5e3,
    "Wool sack":          153000,
    "Coal sack":          50.80234544e3,
    "Load":               918000,
    "Last":               1836000,
    "Flax or feather last": 770e3,
    "Gunpowder last":     1090e3,
    "Picul":              60.478982e3,
    "Rice last":          1200e3,

    // 重量比较
    "大本钟 (14吨)": 14e6,
    "蓝鲸 (180吨)": 180e6,
    "国际空间站 (417吨)": 417e6,
    "航天飞机 (2,041吨)": 2041e6,
    "泰坦尼克号 (52,000吨)": 52000e6,
    "吉萨金字塔群 (6,000,000吨)": 6e12,
    "地球海洋 (1.4尧克)": 1.4e24,

    // 天文
    "一茶匙中子星 (55亿吨)": 5.5e15,
    "月球质量 (ML)":    7.342e25,
    "地球质量 (M⊕)":    5.97219e27,
    "木星质量 (MJ)":  1.8981411476999997e30,
    "太阳质量 (M☉)":    1.98855e33,
    "人马座A* (约7.5 x 10^36千克)": 7.5e39,
    "银河系 (1.2 x 10^42 千克)": 1.2e45,
    "可观测宇宙 (1.45 x 10^53 千克)": 1.45e56,
};


export default ConvertMass;
