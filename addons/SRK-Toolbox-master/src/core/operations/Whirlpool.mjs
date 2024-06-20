/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * Whirlpool operation
 */
class Whirlpool extends Operation {

    /**
     * Whirlpool constructor
     */
    constructor() {
        super();

        this.name = "Whirlpool";
        this.module = "Crypto";
        this.description = "Whirlpool是由Vincent Rijmen和Paulo S. L. M. Barreto在2000年公开的加密算法。<br><br>存在多个变种：<ul><li>Whirlpool-0是2000年发布的最初版本。</li><li>Whirlpool-T是在2001年发布的第一个更新版本，改进了s-box的生成过程。</li><li>Whirlpool是最新版本，于2003年发布，修复了diffusion matrix中的缺陷。</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/Whirlpool_(cryptography)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "变种",
                type: "option",
                value: ["Whirlpool", "Whirlpool-T", "Whirlpool-0"]
            },
            {
                name: "轮数",
                type: "number",
                value: 10,
                min: 1,
                max: 10
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const variant = args[0].toLowerCase();
        return runHash(variant, input, {rounds: args[1]});
    }

}

export default Whirlpool;
