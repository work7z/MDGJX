/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * URL Encode operation
 */
class URLEncode extends Operation {

    /**
     * URLEncode constructor
     */
    constructor() {
        super();

        this.name = "URL编码";
        this.module = "URL";
        this.description = "把特殊字符编码为百分号开头的形式，即URI/URL编码。<br><br>例： <code>=</code> 编码为 <code>%3d</code>";
        this.infoURL = "https://wikipedia.org/wiki/Percent-encoding";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "编码所有特殊字符",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const encodeAll = args[0];
        return encodeAll ? this.encodeAllChars(input) : encodeURI(input);
    }

    /**
     * Encode characters in URL outside of encodeURI() function spec
     *
     * @param {string} str
     * @returns {string}
     */
    encodeAllChars (str) {
        // TODO Do this programmatically
        return encodeURIComponent(str)
            .replace(/!/g, "%21")
            .replace(/#/g, "%23")
            .replace(/'/g, "%27")
            .replace(/\(/g, "%28")
            .replace(/\)/g, "%29")
            .replace(/\*/g, "%2A")
            .replace(/-/g, "%2D")
            .replace(/\./g, "%2E")
            .replace(/_/g, "%5F")
            .replace(/~/g, "%7E");
    }

}


export default URLEncode;
