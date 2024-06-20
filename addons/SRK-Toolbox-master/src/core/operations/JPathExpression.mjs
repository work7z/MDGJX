/**
 * @author Matt C (matt@artemisbot.uk)
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import {JSONPath} from "jsonpath-plus";
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * JPath expression operation
 */
class JPathExpression extends Operation {

    /**
     * JPathExpression constructor
     */
    constructor() {
        super();

        this.name = "JPath表达式";
        this.module = "Code";
        this.description = "从JSON object中使用给定的JPath表达式进行查询并提取内容。";
        this.infoURL = "http://goessner.net/articles/JsonPath/";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "JPath",
                type: "string",
                value: ""
            },
            {
                name: "查询结果分隔符",
                type: "binaryShortString",
                value: "\\n"
            },
            {
                name: "阻止Eval",
                type: "boolean",
                value: true,
                description: "安全起见，默认阻止表达式的Eval"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [query, delimiter, preventEval] = args;
        let results, jsonObj;

        try {
            jsonObj = JSON.parse(input);
        } catch (err) {
            throw new OperationError(`无效的JSON： ${err.message}`);
        }

        try {
            results = JSONPath({
                path: query,
                json: jsonObj,
                preventEval: preventEval
            });
        } catch (err) {
            throw new OperationError(`无效的JPath表达式： ${err.message}`);
        }

        return results.map(result => JSON.stringify(result)).join(delimiter);
    }

}

export default JPathExpression;
