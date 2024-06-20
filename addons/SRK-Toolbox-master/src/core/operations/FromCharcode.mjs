/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { DELIM_OPTIONS } from "../lib/Delim.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * From Charcode operation
 */
class FromCharcode extends Operation {

    /**
     * FromCharcode constructor
     */
    constructor() {
        super();

        this.name = "从字符码提取";
        this.module = "Default";
        this.description = "把Unicode字符码还原为字符。<br><br>例： <code>0393 03b5 03b9 03ac 20 03c3 03bf 03c5</code> 解码为 <code>Γειά σου</code>";
        this.infoURL = "https://wikipedia.org/wiki/Plane_(Unicode)";
        this.inputType = "string";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "分隔符",
                "type": "option",
                "value": DELIM_OPTIONS
            },
            {
                "name": "进制",
                "type": "number",
                "value": 16
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     *
     * @throws {OperationError} if base out of range
     */
    run(input, args) {
        const delim = Utils.charRep(args[0] || "空格"),
            base = args[1];
        let bites = input.split(delim),
            i = 0;

        if (base < 2 || base > 36) {
            throw new OperationError("错误：进制必须在2~36之间");
        }

        if (input.length === 0) {
            return new ArrayBuffer;
        }

        if (base !== 16 && isWorkerEnvironment()) self.setOption("attemptHighlight", false);

        // Split into groups of 2 if the whole string is concatenated and
        // too long to be a single character
        if (bites.length === 1 && input.length > 17) {
            bites = [];
            for (i = 0; i < input.length; i += 2) {
                bites.push(input.slice(i, i+2));
            }
        }

        let latin1 = "";
        for (i = 0; i < bites.length; i++) {
            latin1 += Utils.chr(parseInt(bites[i], base));
        }
        return Utils.strToArrayBuffer(latin1);
    }

}

export default FromCharcode;
