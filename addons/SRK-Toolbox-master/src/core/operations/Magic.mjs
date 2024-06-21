/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import Dish from "../Dish.mjs";
import MagicLib from "../lib/Magic.mjs";

/**
 * Magic operation
 */
class Magic extends Operation {

    /**
     * Magic constructor
     */
    constructor() {
        super();

        this.name = "Magic";
        this.flowControl = true;
        this.module = "Default";
        this.description = "Magic操作尝试检测输入数据的多种属性来建议对应的操作。<br><br><b>设定</b><br><u>深度：</u>如果某个操作和数据相符，此操作会被运行一次，运行结果会被再次分析。此参数设置递归的最大次数。<br><br><u>加强模式：</u>当此模式开启时，多种操作如XOR、位运算和字符编码会进行暴力破解来检测可能的数据处理方式。为提高性能，仅有前100个字节会被暴力破解。<br><br><u>扩展语言支持：</u>在每个阶段，数据的相对字节频率数据会和各种现实语言的平均频率进行对照。默认情况下仅检测约40种互联网常见语言。扩展语言功能将语言数据提高到284种，这使得数据可以匹配更多语言种类，如果它们的频率数据相近的话。<br><br>支持输入一个正则表达式来过滤输出结果（crib）。";
        this.infoURL = "https://github.com/gchq/CyberChef/wiki/Automatic-detection-of-encoded-data-using-CyberChef-Magic";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.presentType = "html";
        this.args = [
            {
                "name": "深度",
                "type": "number",
                "value": 3
            },
            {
                "name": "加强模式",
                "type": "boolean",
                "value": false
            },
            {
                "name": "扩展语言支持",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Crib（已知明文字符串或正则）",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {Object} state - The current state of the recipe.
     * @param {number} state.progress - The current position in the recipe.
     * @param {Dish} state.dish - The Dish being operated on.
     * @param {Operation[]} state.opList - The list of operations in the recipe.
     * @returns {Object} The updated state of the recipe.
     */
    async run(state) {
        const ings = state.opList[state.progress].ingValues,
            [depth, intensive, extLang, crib] = ings,
            dish = state.dish,
            magic = new MagicLib(await dish.get(Dish.ARRAY_BUFFER)),
            cribRegex = (crib && crib.length) ? new RegExp(crib, "i") : null;
        let options = await magic.speculativeExecution(depth, extLang, intensive, [], false, cribRegex);

        // Filter down to results which matched the crib
        if (cribRegex) {
            options = options.filter(option => option.matchesCrib);
        }

        // Record the current state for use when presenting
        this.state = state;

        dish.set(options, Dish.JSON);
        return state;
    }

    /**
     * Displays Magic results in HTML for web apps.
     *
     * @param {JSON} options
     * @returns {html}
     */
    present(options) {
        const currentRecipeConfig = this.state.opList.map(op => op.config);

        let output = `<table
                class='table table-hover table-sm table-bordered'
                style='table-layout: fixed;'>
            <tr>
                <th>操作（点击加载）</th>
                <th>结果摘要</th>
                <th>属性</th>
            </tr>`;

        /**
         * Returns a CSS colour value based on an integer input.
         *
         * @param {number} val
         * @returns {string}
         */
        function chooseColour(val) {
            if (val < 3) return "green";
            if (val < 5) return "goldenrod";
            return "red";
        }

        options.forEach(option => {
            // Construct recipe URL
            // Replace this Magic op with the generated recipe
            const recipeConfig = currentRecipeConfig.slice(0, this.state.progress)
                    .concat(option.recipe)
                    .concat(currentRecipeConfig.slice(this.state.progress + 1)),
                recipeURL = "recipe=" + Utils.encodeURIFragment(Utils.generatePrettyRecipe(recipeConfig));

            let language = "",
                fileType = "",
                matchingOps = "",
                useful = "";
            const entropy = `<span data-toggle="tooltip" data-container="body" title="香农信息熵是从0到8的一个数值。高熵值意味着数据可能被加密或压缩过。常规文本的信息熵通常在3.5到5之间。">信息熵： <span style="color: ${chooseColour(option.entropy)}">${option.entropy.toFixed(2)}</span></span>`,
                validUTF8 = option.isUTF8 ? "<span data-toggle='tooltip' data-container='body' title='数据可能是有效的UTF8字符串'>有效UTF8</span>\n" : "";

            if (option.languageScores[0].probability > 0) {
                let likelyLangs = option.languageScores.filter(l => l.probability > 0);
                if (likelyLangs.length < 1) likelyLangs = [option.languageScores[0]];
                language = "<span data-toggle='tooltip' data-container='body' title='基于对多种语言字节频率的统计学比较，按相似度从高到低排序。'>" +
                    "可能为以下语言：\n    " +
                    likelyLangs.map(lang => {
                        return MagicLib.codeToLanguage(lang.lang);
                    }).join("\n    ") +
                    "</span>\n";
            }

            if (option.fileType) {
                fileType = `<span data-toggle="tooltip" data-container="body" title="根据魔术字节（Magic bytes）探测得出。">文件类型：${option.fileType.mime} (${option.fileType.ext})</span>\n`;
            }

            if (option.matchingOps.length) {
                matchingOps = `对应操作：${[...new Set(option.matchingOps.map(op => op.op))].join(", ")}\n`;
            }

            if (option.useful) {
                useful = "<span data-toggle='tooltip' data-container='body' title='此操作可能将数据展示为更已读的方式，例如渲染成图像。'>检测到建议操作</span>\n";
            }

            output += `<tr>
                <td><a href="#${recipeURL}">${Utils.generatePrettyRecipe(option.recipe, true)}</a></td>
                <td>${Utils.escapeHtml(Utils.escapeWhitespace(Utils.truncate(option.data, 99)))}</td>
                <td>${language}${fileType}${matchingOps}${useful}${validUTF8}${entropy}</td>
            </tr>`;
        });

        output += "</table><script type='application/javascript'>$('[data-toggle=\"tooltip\"]').tooltip()</script>";

        if (!options.length) {
            output = "针对输入数据未检测到任何可用操作。\n请尝试调整操作参数。";
        }

        return output;
    }

}

export default Magic;
