/**
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";


/**
 * Defang IP Addresses operation
 */
class DefangIPAddresses extends Operation {

    /**
     * DefangIPAddresses constructor
     */
    constructor() {
        super();

        this.name = "IP地址无效化";
        this.module = "Default";
        this.description = "对输入的IPv4或IPv6地址进行无效化（“Defang”）操作，防止误使用或配置此IP。";
        this.infoURL = "https://isc.sans.edu/forums/diary/Defang+all+the+things/22744/";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
        this.checks = [
            {
                pattern: "^\\s*(([0-9]{1,3}\\.){3}[0-9]{1,3}|([0-9a-f]{4}:){7}[0-9a-f]{4})\\s*$",
                flags: "i",
                args: [],
                output: {
                    pattern: "^\\s*(([0-9]{1,3}\\[\\.\\]){3}[0-9]{1,3}|([0-9a-f]{4}\\[\\:\\]){7}[0-9a-f]{4})\\s*$",
                    flags: "i"
                }
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = input.replace(IPV4_REGEX, x => {
            return x.replace(/\./g, "[.]");
        });

        input = input.replace(IPV6_REGEX, x => {
            return x.replace(/:/g, "[:]");
        });

        return input;
    }
}

export default DefangIPAddresses;


/**
 * IPV4 regular expression
 */
const IPV4_REGEX = new RegExp("(?:(?:\\d|[01]?\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d|\\d)(?:\\/\\d{1,2})?", "g");


/**
 * IPV6 regular expression
 */
const IPV6_REGEX = new RegExp("((?=.*::)(?!.*::.+::)(::)?([\\dA-Fa-f]{1,4}:(:|\\b)|){5}|([\\dA-Fa-f]{1,4}:){6})((([\\dA-Fa-f]{1,4}((?!\\3)::|:\\b|(?![\\dA-Fa-f])))|(?!\\2\\3)){2}|(((2[0-4]|1\\d|[1-9])?\\d|25[0-5])\\.?\\b){4})", "g");
