/**
 * @author tlwr [toby@toby.codes]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * HTTP request operation
 */
class HTTPRequest extends Operation {

    /**
     * HTTPRequest constructor
     */
    constructor() {
        super();

        this.name = "HTTP请求";
        this.module = "Default";
        this.description = [
            "发起HTTP请求并接收响应内容。",
            "<br><br>",
            "此操作支持不同的HTTP方法，例如GET、POST、PUT等等。",
            "<br><br>",
            "你可以用 <code>Key: Value</code> 的格式按行添加请求头（Header）。",
            "<br><br>",
            "响应的状态码和一部分响应头可通过勾选“显示响应元数据”查看。由于浏览器安全设置，只能显示一部分响应头。",
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields";
        this.inputType = "string";
        this.outputType = "string";
        this.manualBake = true;
        this.args = [
            {
                "name": "方法",
                "type": "option",
                "value": [
                    "GET", "POST", "HEAD",
                    "PUT", "PATCH", "DELETE",
                    "CONNECT", "TRACE", "OPTIONS"
                ]
            },
            {
                "name": "URL",
                "type": "string",
                "value": ""
            },
            {
                "name": "请求头（Header）",
                "type": "text",
                "value": ""
            },
            {
                "name": "模式",
                "type": "option",
                "value": [
                    "Cross-Origin Resource Sharing",
                    "No CORS (limited to HEAD, GET or POST)",
                ]
            },
            {
                "name": "显示响应元数据",
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
        const [method, url, headersText, mode, showResponseMetadata] = args;

        if (url.length === 0) return "";

        const headers = new Headers();
        headersText.split(/\r?\n/).forEach(line => {
            line = line.trim();

            if (line.length === 0) return;

            const split = line.split(":");
            if (split.length !== 2) throw `无法解析请求头，位于行: ${line}`;

            headers.set(split[0].trim(), split[1].trim());
        });

        const config = {
            method: method,
            headers: headers,
            mode: modeLookup[mode],
            cache: "no-cache",
        };

        if (method !== "GET" && method !== "HEAD") {
            config.body = input;
        }

        return fetch(url, config)
            .then(r => {
                if (r.status === 0 && r.type === "opaque") {
                    throw new OperationError("错误：响应为空。尝试把连接模式设置为CORS。");
                }

                if (showResponseMetadata) {
                    let headers = "";
                    for (const pair of r.headers.entries()) {
                        headers += "    " + pair[0] + ": " + pair[1] + "\n";
                    }
                    return r.text().then(b => {
                        return "####\n  状态: " + r.status + " " + r.statusText +
                            "\n  响应头:\n" + headers + "####\n\n" + b;
                    });
                }
                return r.text();
            })
            .catch(e => {
                throw new OperationError(e.toString() +
                    "\n\n此错误可能由以下原因产生：\n" +
                    " - 无效的URL\n" +
                    " - 从安全来源（HTTPS）发起到不安全来源（HTTP）的请求。\n" +
                    " - 对不支持CORS的服务器发起了跨域请求。\n");
            });
    }

}


/**
 * Lookup table for HTTP modes
 *
 * @private
 */
const modeLookup = {
    "Cross-Origin Resource Sharing": "cors",
    "No CORS (limited to HEAD, GET or POST)": "no-cors",
};


export default HTTPRequest;
