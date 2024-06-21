/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {FORMATS, convertCoordinates} from "../lib/ConvertCoordinates.mjs";

/**
 * Convert co-ordinate format operation
 */
class ConvertCoordinateFormat extends Operation {

    /**
     * ConvertCoordinateFormat constructor
     */
    constructor() {
        super();

        this.name = "坐标格式转换";
        this.module = "Hashing";
        this.description = "转换地理坐标格式。<br><br>支持的格式：<ul><li>度分秒 (DMS)</li><li>度分 (DDM)</li><li>度数 (DD)</li><li>Geohash</li><li>军事格网参考系统 (MGRS)</li><li>地形测量局国家格网参考系统 (OSNG)</li><li>通用横轴墨卡托投影 (UTM)</li></ul><br>此操作会尝试检测输入的坐标格式，但不保证正确。";
        this.infoURL = "https://wikipedia.org/wiki/Geographic_coordinate_conversion";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输入格式",
                "type": "option",
                "value": ["自动"].concat(FORMATS)
            },
            {
                "name": "输入分隔符",
                "type": "option",
                "value": [
                    "自动",
                    "方向在前",
                    "方向在后",
                    "\\n",
                    "逗号",
                    "分号",
                    "冒号"
                ]
            },
            {
                "name": "输出格式",
                "type": "option",
                "value": FORMATS
            },
            {
                "name": "输出分隔符",
                "type": "option",
                "value": [
                    "空格",
                    "\\n",
                    "逗号",
                    "分号",
                    "冒号"
                ]
            },
            {
                "name": "包括罗盘方向",
                "type": "option",
                "value": [
                    "无",
                    "在前",
                    "在后"
                ]
            },
            {
                "name": "精度",
                "type": "number",
                "value": 3
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (input.replace(/[\s+]/g, "") !== "") {
            const [inFormat, inDelim, outFormat, outDelim, incDirection, precision] = args;
            const result = convertCoordinates(input, inFormat, inDelim, outFormat, outDelim, incDirection, precision);
            return result;
        } else {
            return input;
        }
    }
}

export default ConvertCoordinateFormat;
