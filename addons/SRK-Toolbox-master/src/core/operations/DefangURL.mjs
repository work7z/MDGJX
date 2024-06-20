/**
 * @author arnydo [arnydo@protonmail.com]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {URL_REGEX, DOMAIN_REGEX} from "../lib/Extract.mjs";

/**
 * DefangURL operation
 */
class DefangURL extends Operation {

    /**
     * DefangURL constructor
     */
    constructor() {
        super();

        this.name = "URL无效化";
        this.module = "Default";
        this.description = "对给定URL进行“无效化（Defang）”操作；意味着URL从形式上被失效，防止误点击有害网址。<br><br>通常用于有害网址和IOC（Indicator of compromise）。<br><br>可与“提取URL”操作配合生成安全的URL列表。";
        this.infoURL = "https://isc.sans.edu/forums/diary/Defang+all+the+things/22744/";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "转义“点”",
                type: "boolean",
                value: true
            },
            {
                name: "转义“http”",
                type: "boolean",
                value: true
            },
            {
                name: "转义“://”",
                type: "boolean",
                value: true
            },
            {
                name: "处理类型",
                type: "option",
                value: ["有效的域名和完整URL", "仅无效化完整URL", "所有匹配内容"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [dots, http, slashes, process] = args;

        switch (process) {
            case "有效的域名和完整URL":
                input = input.replace(URL_REGEX, x => {
                    return defangURL(x, dots, http, slashes);
                });
                input = input.replace(DOMAIN_REGEX, x => {
                    return defangURL(x, dots, http, slashes);
                });
                break;
            case "仅无效化完整URL":
                input = input.replace(URL_REGEX, x => {
                    return defangURL(x, dots, http, slashes);
                });
                break;
            case "所有匹配内容":
                input = defangURL(input, dots, http, slashes);
                break;
        }

        return input;
    }

}


/**
 * Defangs a given URL
 *
 * @param {string} url
 * @param {boolean} dots
 * @param {boolean} http
 * @param {boolean} slashes
 * @returns {string}
 */
function defangURL(url, dots, http, slashes) {
    if (dots) url = url.replace(/\./g, "[.]");
    if (http) url = url.replace(/http/gi, "hxxp");
    if (slashes) url = url.replace(/:\/\//g, "[://]");

    return url;
}

export default DefangURL;
