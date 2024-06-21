/**
 * @author Jarmo van Lenthe [github.com/jarmovanlenthe]
 * @copyright Jarmo van Lenthe
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * PHP Deserialize operation
 */
class PHPDeserialize extends Operation {

    /**
     * PHPDeserialize constructor
     */
    constructor() {
        super();

        this.name = "PHP反序列化";
        this.module = "Default";
        this.description = "对PHP序列化数据进行反序列化，输出JSON。<br><br>此操作不支持 <code>object</code> 标签。<br><br>例如：<br><code>a:2:{s:1:&quot;a&quot;;i:10;i:0;a:1:{s:2:&quot;ab&quot;;b:1;}}</code><br>反序列化为<br><code>{&quot;a&quot;: 10,0: {&quot;ab&quot;: true}}</code><br><br><u>输出合法JSON：</u> JSON不支持整数作为键，但PHP支持。开启此项会将整数转为字符串。同样也会转义反斜杠。";
        this.infoURL = "http://www.phpinternalsbook.com/classes_objects/serialization.html";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输出合法JSON",
                "type": "boolean",
                "value": true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        /**
         * Recursive method for deserializing.
         * @returns {*}
         */
        function handleInput() {
            /**
             * Read `length` characters from the input, shifting them out the input.
             * @param length
             * @returns {string}
             */
            function read(length) {
                let result = "";
                for (let idx = 0; idx < length; idx++) {
                    const char = inputPart.shift();
                    if (char === undefined) {
                        throw new OperationError("输入内容不完整");
                    }
                    result += char;
                }
                return result;
            }

            /**
             * Read characters from the input until `until` is found.
             * @param until
             * @returns {string}
             */
            function readUntil(until) {
                let result = "";
                for (;;) {
                    const char = read(1);
                    if (char === until) {
                        break;
                    } else {
                        result += char;
                    }
                }
                return result;

            }

            /**
             * Read characters from the input that must be equal to `expect`
             * @param expect
             * @returns {string}
             */
            function expect(expect) {
                const result = read(expect.length);
                if (result !== expect) {
                    throw new OperationError("检测到错误输入内容");
                }
                return result;
            }

            /**
             * Helper function to handle deserialized arrays.
             * @returns {Array}
             */
            function handleArray() {
                const items = parseInt(readUntil(":"), 10) * 2;
                expect("{");
                const result = [];
                let isKey = true;
                let lastItem = null;
                for (let idx = 0; idx < items; idx++) {
                    const item = handleInput();
                    if (isKey) {
                        lastItem = item;
                        isKey = false;
                    } else {
                        const numberCheck = lastItem.match(/[0-9]+/);
                        if (args[0] && numberCheck && numberCheck[0].length === lastItem.length) {
                            result.push('"' + lastItem + '": ' + item);
                        } else {
                            result.push(lastItem + ": " + item);
                        }
                        isKey = true;
                    }
                }
                expect("}");
                return result;
            }


            const kind = read(1).toLowerCase();

            switch (kind) {
                case "n":
                    expect(";");
                    return "null";
                case "i":
                case "d":
                case "b": {
                    expect(":");
                    const data = readUntil(";");
                    if (kind === "b") {
                        return (parseInt(data, 10) !== 0);
                    }
                    return data;
                }

                case "a":
                    expect(":");
                    return "{" + handleArray() + "}";

                case "s": {
                    expect(":");
                    const length = readUntil(":");
                    expect("\"");
                    const value = read(length);
                    expect('";');
                    if (args[0]) {
                        return '"' + value.replace(/"/g, '\\"') + '"'; // lgtm [js/incomplete-sanitization]
                    } else {
                        return '"' + value + '"';
                    }
                }

                default:
                    throw new OperationError("未知类型： " + kind);
            }
        }

        const inputPart = input.split("");
        return handleInput();
    }

}

export default PHPDeserialize;
