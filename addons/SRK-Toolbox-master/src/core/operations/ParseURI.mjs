/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import url from "url";

/**
 * Parse URI operation
 */
class ParseURI extends Operation {

    /**
     * ParseURI constructor
     */
    constructor() {
        super();

        this.name = "解析URI";
        this.module = "URL";
        this.description = "将复杂的Uniform Resource Identifier (URI)字符串解析成容易阅读的形式。可用于查看有较多参数的Uniform Resource Locator (URL)。";
        this.infoURL = "https://wikipedia.org/wiki/Uniform_Resource_Identifier";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const uri = url.parse(input, true);

        let output = "";

        if (uri.protocol) output += "协议：\t" + uri.protocol + "\n";
        if (uri.auth) output += "鉴权：\t\t" + uri.auth + "\n";
        if (uri.hostname) output += "主机名称：\t" + uri.hostname + "\n";
        if (uri.port) output += "端口：\t\t" + uri.port + "\n";
        if (uri.pathname) output += "路径名称：\t" + uri.pathname + "\n";
        if (uri.query) {
            const keys = Object.keys(uri.query);
            let padding = 0;

            keys.forEach(k => {
                padding = (k.length > padding) ? k.length : padding;
            });

            output += "参数：\n";
            for (const key in uri.query) {
                output += "\t" + key.padEnd(padding, " ");
                if (uri.query[key].length) {
                    output += " = " + uri.query[key] + "\n";
                } else {
                    output += "\n";
                }
            }
        }
        if (uri.hash) output += "哈希值：\t\t" + uri.hash + "\n";

        return output;
    }

}

export default ParseURI;
