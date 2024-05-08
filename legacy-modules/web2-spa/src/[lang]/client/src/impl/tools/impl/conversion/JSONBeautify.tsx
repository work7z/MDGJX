// LafTools
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author n1474335 [n1474335@gmail.com]
 * @author Phillip Nordwall [phillip.nordwall@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import JSON5 from "json5";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import _ from "lodash";

/**
 * JSON Beautify operation
 */
class JSONBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'json',
            config: {
                "module": "Code",
                "description": "Indents and pretty prints JavaScript Object Notation (JSON) code.<br><br>Tags: json viewer, prettify, syntax highlighting",
                "infoURL": null,
                "inputType": "string",
                "outputType": "html",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("isti", "Indent string"),
                        "type": "binaryShortString",
                        "value": "    "
                    },
                    {
                        "name": Dot("k12k3", "Sort Object Keys"),
                        "type": "boolean",
                        "value": false
                    },
                    {
                        "name": Dot("gRm8pxMSS", "Formatted"),
                        "type": "boolean",
                        "value": true
                    }
                ]
            },
            nousenouseID: 'json-beautify',
            optName: Dot("json-beautify.text.93kq", "Format {0}", 'JSON'),
            optDescription: Dot(
                "json-beautify.desc.0912",
                "This operation formats JSON data to improve readability by adding proper indentation, line breaks, and sorting keys consistently.",
            ),
            infoURL: 'https://www.json.org/json-en.html',
            exampleInput: '{"data":[{"key2":123}]}',
            exampleOutput: '{\n  "data": [\n    {\n      "key2": 123\n    }\n  ]\n}'
        }
    }

    /**
     * JSONBeautify constructor
     */
    constructor() {
        super();

        this.module = "Code";
        this.inputType = "string";
        this.outputType = "string";
        this.presentType = "html";
        this.args = [
            {
                name: Dot("isti", "Indent string"),
                type: "binaryShortString",
                value: "    "
            },
            {
                name: Dot("NLXUGv5gF", "Sort Object Keys"),
                type: "boolean",
                value: false
            },
            {
                name: Dot("7n9nxrgrr", "Formatted"),
                type: "boolean",
                value: true
            }
        ];
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "json",
            outputLang: "json",
            // inputLang: "javascript",
            // outputLang: "javascript",
        }
    }
    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input) return "";

        const [indentStr, sortBool] = args;
        let json = null;

        try {
            json = JSON5.parse(input);
        } catch (err) {
            throw new OperationError("Unable to parse input as JSON.\n" + err);
        }

        if (sortBool) json = sortKeys(json);

        return JSON.stringify(json, null, indentStr);
    }

    /**
     * Adds various dynamic features to the JSON blob
     *
     * @param {string} data
     * @param {Object[]} args
     * @returns {html}
     */
    present(data, args) {
        const formatted = args[2];
        if (!formatted) return Utils.escapeHtml(data);

        const json = JSON5.parse(data);
        const options = {
            withLinks: true,
            bigNumbers: true
        };
        let html = '<div class="json-document">';

        if (isCollapsable(json)) {
            const isArr = json instanceof Array;
            html += '<details open class="json-details">' +
                `<summary class="json-summary ${isArr ? "json-arr" : "json-obj"}"></summary>` +
                json2html(json, options) +
                "</details>";
        } else {
            html += json2html(json, options);
        }

        html += "</div>";
        return html;
    }
}

/**
 * Sort keys in a JSON object
 *
 * @author Phillip Nordwall [phillip.nordwall@gmail.com]
 * @param {object} o
 * @returns {object}
 */
function sortKeys(o) {
    if (Array.isArray(o)) {
        return o.map(sortKeys);
    } else if ("[object Object]" === Object.prototype.toString.call(o)) {
        return Object.keys(o).sort().reduce(function (a, k) {
            a[k] = sortKeys(o[k]);
            return a;
        }, {});
    }
    return o;
}


/**
 * Check if arg is either an array with at least 1 element, or a dict with at least 1 key
 * @returns {boolean}
 */
function isCollapsable(arg) {
    return arg instanceof Object && Object.keys(arg).length > 0;
}

/**
 * Check if a string looks like a URL, based on protocol
 * @returns {boolean}
 */
function isUrl(string) {
    const protocols = ["http", "https", "ftp", "ftps"];
    for (let i = 0; i < protocols.length; i++) {
        if (string.startsWith(protocols[i] + "://")) {
            return true;
        }
    }
    return false;
}

/**
 * Transform a json object into html representation
 *
 * Adapted for CyberChef by @n1474335 from jQuery json-viewer
 * @author Alexandre Bodelot <alexandre.bodelot@gmail.com>
 * @link https://github.com/abodelot/jquery.json-viewer
 * @license MIT
 *
 * @returns {string}
 */
function json2html(json, options) {
    let html = "";
    if (typeof json === "string") {
        // Escape tags and quotes
        json = Utils.escapeHtml(json);

        if (options.withLinks && isUrl(json)) {
            html += `<a href="${json}" class="json-string" target="_blank">${json}</a>`;
        } else {
            // Escape double quotes in the rendered non-URL string.
            json = json.replace(/&quot;/g, "\\&quot;");
            html += `<span class="json-string">"${json}"</span>`;
        }
    } else if (typeof json === "number" || typeof json === "bigint") {
        html += `<span class="json-literal">${json}</span>`;
    } else if (typeof json === "boolean") {
        html += `<span class="json-literal">${json}</span>`;
    } else if (json === null) {
        html += '<span class="json-literal">null</span>';
    } else if (json instanceof Array) {
        if (json.length > 0) {
            html += '<span class="json-bracket">[</span><ol class="json-array">';
            for (let i = 0; i < json.length; i++) {
                html += "<li>";

                // Add toggle button if item is collapsable
                if (isCollapsable(json[i])) {
                    const isArr = json[i] instanceof Array;
                    html += '<details open class="json-details">' +
                        `<summary class="json-summary ${isArr ? "json-arr" : "json-obj"}"></summary>` +
                        json2html(json[i], options) +
                        "</details>";
                } else {
                    html += json2html(json[i], options);
                }

                // Add comma if item is not last
                if (i < json.length - 1) {
                    html += '<span class="json-comma">,</span>';
                }
                html += "</li>";
            }
            html += '</ol><span class="json-bracket">]</span>';
        } else {
            html += '<span class="json-bracket">[]</span>';
        }
    } else if (typeof json === "object") {
        // Optional support different libraries for big numbers
        // json.isLosslessNumber: package lossless-json
        // json.toExponential(): packages bignumber.js, big.js, decimal.js, decimal.js-light, others?
        if (options.bigNumbers && (typeof json.toExponential === "function" || json.isLosslessNumber)) {
            html += `<span class="json-literal">${json.toString()}</span>`;
        } else {
            let keyCount = Object.keys(json).length;
            if (keyCount > 0) {
                html += '<span class="json-brace">{</span><ul class="json-dict">';
                for (const key in json) {
                    if (Object.prototype.hasOwnProperty.call(json, key)) {
                        const safeKey = Utils.escapeHtml(key);
                        html += "<li>";

                        // Add toggle button if item is collapsable
                        if (isCollapsable(json[key])) {
                            const isArr = json[key] instanceof Array;
                            html += '<details open class="json-details">' +
                                `<summary class="json-summary ${isArr ? "json-arr" : "json-obj"}">${safeKey}<span class="json-colon">:</span> </summary>` +
                                json2html(json[key], options) +
                                "</details>";
                        } else {
                            html += safeKey + '<span class="json-colon">:</span> ' + json2html(json[key], options);
                        }

                        // Add comma if item is not last
                        if (--keyCount > 0) {
                            html += '<span class="json-comma">,</span>';
                        }
                        html += "</li>";
                    }
                }
                html += '</ul><span class="json-brace">}</span>';
            } else {
                html += '<span class="json-brace">{}</span>';
            }
        }
    }
    return html;
}

export default JSONBeautify;
