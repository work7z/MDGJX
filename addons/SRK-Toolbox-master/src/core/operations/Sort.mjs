/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {INPUT_DELIM_OPTIONS} from "../lib/Delim.mjs";
import {caseInsensitiveSort, ipSort, numericSort, hexadecimalSort, lengthSort} from "../lib/Sort.mjs";

/**
 * Sort operation
 */
class Sort extends Operation {

    /**
     * Sort constructor
     */
    constructor() {
        super();

        this.name = "排序";
        this.module = "Default";
        this.description = "按字母顺序对给定分隔符分隔的字符串进行排序。<br><br>IP地址排序仅限IPv4。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "分隔符",
                "type": "option",
                "value": INPUT_DELIM_OPTIONS
            },
            {
                "name": "反向排序",
                "type": "boolean",
                "value": false
            },
            {
                "name": "顺序",
                "type": "option",
                "value": ["字母顺序（区分大小写）", "字母顺序（不区分大小写）", "IP地址", "数字", "数字（十六进制）", "长度"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0]),
            sortReverse = args[1],
            order = args[2];
        let sorted = input.split(delim);

        if (order === "字母顺序（区分大小写）") {
            sorted = sorted.sort();
        } else if (order === "字母顺序（不区分大小写）") {
            sorted = sorted.sort(caseInsensitiveSort);
        } else if (order === "IP地址") {
            sorted = sorted.sort(ipSort);
        } else if (order === "数字") {
            sorted = sorted.sort(numericSort);
        } else if (order === "数字（十六进制）") {
            sorted = sorted.sort(hexadecimalSort);
        } else if (order === "长度") {
            sorted = sorted.sort(lengthSort);
        }

        if (sortReverse) sorted.reverse();
        return sorted.join(delim);
    }

}

export default Sort;
