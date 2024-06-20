/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Yara from "libyara-wasm";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * YARA Rules operation
 */
class YARARules extends Operation {

    /**
     * YARARules constructor
     */
    constructor() {
        super();

        this.name = "YARA规则";
        this.module = "Yara";
        this.description = "YARA是VirusTotal制作的一个主要用于恶意软件研究和检测的工具。它提供了一种创建基于文本或二进制模式的恶意软件系列的描述方法。一个描述本质上是一个 YARA 规则名称，其中这些规则由字符串集和一个布尔表达式组成。使用的语言具有与 Perl 兼容的正则表达式的特点。对于规则编写，请参考：<a href='https://yara.readthedocs.io/en/latest/writingrules.html'>YARA文档</a>。";
        this.infoURL = "https://wikipedia.org/wiki/YARA";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "规则",
                type: "text",
                value: "",
                rows: 5
            },
            {
                name: "显示字符串",
                type: "boolean",
                value: false
            },
            {
                name: "显示字符串长度",
                type: "boolean",
                value: false
            },
            {
                name: "显示元数据",
                type: "boolean",
                value: false
            },
            {
                name: "显示计数",
                type: "boolean",
                value: true
            },
            {
                name: "显示规则警告",
                type: "boolean",
                value: true
            },
            {
                name: "显示控制台模块消息",
                type: "boolean",
                value: true
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        if (isWorkerEnvironment())
            self.sendStatusMessage("YARA载入中……");
        const [rules, showStrings, showLengths, showMeta, showCounts, showRuleWarns, showConsole] = args;
        return new Promise((resolve, reject) => {
            Yara().then(yara => {
                if (isWorkerEnvironment()) self.sendStatusMessage("为 YARA 转换数据");
                let matchString = "";

                const inpArr = new Uint8Array(input); // Turns out embind knows that JS uint8array <==> C++ std::string

                if (isWorkerEnvironment()) self.sendStatusMessage("执行 YARA 匹配");

                const resp = yara.run(inpArr, rules);

                if (isWorkerEnvironment()) self.sendStatusMessage("处理数据");

                if (resp.compileErrors.size() > 0) {
                    for (let i = 0; i < resp.compileErrors.size(); i++) {
                        const compileError = resp.compileErrors.get(i);
                        if (!compileError.warning) {
                            reject(new OperationError(`行 ${compileError.lineNumber} 报错： ${compileError.message}`));
                        } else if (showRuleWarns) {
                            matchString += `行 ${compileError.lineNumber} 警告： ${compileError.message}\n`;
                        }
                    }
                }

                if (showConsole) {
                    const consoleLogs = resp.consoleLogs;
                    for (let i = 0; i < consoleLogs.size(); i++) {
                        matchString += consoleLogs.get(i) + "\n";
                    }
                }

                const matchedRules = resp.matchedRules;
                for (let i = 0; i < matchedRules.size(); i++) {
                    const rule = matchedRules.get(i);
                    const matches = rule.resolvedMatches;
                    let meta = "";
                    if (showMeta && rule.metadata.size() > 0) {
                        meta += " [";
                        for (let j = 0; j < rule.metadata.size(); j++) {
                            meta += `${rule.metadata.get(j).identifier}: ${rule.metadata.get(j).data}, `;
                        }
                        meta = meta.slice(0, -2) + "]";
                    }
                    const countString = matches.size() === 0 ? "" : (showCounts ? ` (${matches.size()} 次)` : "");
                    if (matches.size() === 0 || !(showStrings || showLengths)) {
                        matchString += `输入匹配规则 "${rule.ruleName}"${meta}${countString.length > 0 ? ` ${countString}`: ""}.\n`;
                    } else {
                        matchString += `规则 "${rule.ruleName}"${meta} 匹配${countString}:\n`;
                        for (let j = 0; j < matches.size(); j++) {
                            const match = matches.get(j);
                            if (showStrings || showLengths) {
                                matchString += `位置 ${match.location}, ${showLengths ? `长度 ${match.matchLength}, ` : ""}标识符 ${match.stringIdentifier}${showStrings ? `, 数据: "${match.data}"` : ""}\n`;
                            }
                        }
                    }
                }
                resolve(matchString);
            });
        });
    }

}

export default YARARules;
