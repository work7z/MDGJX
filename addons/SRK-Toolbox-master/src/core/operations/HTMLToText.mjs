/**
 * @author tlwr [toby@toby.codes]
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * HTML To Text operation
 */
class HTMLToText extends Operation {

    /**
     * HTMLToText constructor
     */
    constructor() {
        super();

        this.name = "HTML转文本";
        this.module = "Default";
        this.description = "将某个操作输出的HTML转换为纯文本形式，不在输出框进行渲染。";
        this.infoURL = "";
        this.inputType = "html";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {html} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return input;
    }

}

export default HTMLToText;
