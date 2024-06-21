/**
 * @author sw5678
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {INPUT_DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * Unique operation
 */
class FileTree extends Operation {

    /**
     * Unique constructor
     */
    constructor() {
        super();

        this.name = "文件树";
        this.module = "Default";
        this.description = "从给定的文件路径列表生成文件树（和Linux的tree命令类似）。";
        this.infoURL = "https://wikipedia.org/wiki/Tree_(command)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "文件路径分隔符",
                type: "binaryString",
                value: "/"
            },
            {
                name: "列表分隔符",
                type: "option",
                value: INPUT_DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {

        // Set up arrow and pipe for nice output display
        const ARROW = "|---";
        const PIPE = "|   ";

        // Get args from input
        const fileDelim = args[0];
        const entryDelim = Utils.charRep(args[1]);

        // Store path to print
        const completedList = [];
        const printList = [];

        // Loop through all entries
        const filePaths = input.split(entryDelim).unique().sort();
        for (let i = 0; i < filePaths.length; i++) {
            // Split by file delimiter
            let path = filePaths[i].split(fileDelim);

            if (path[0] === "") {
                path = path.slice(1, path.length);
            }

            for (let j = 0; j < path.length; j++) {
                let printLine;
                let key;
                if (j === 0) {
                    printLine = path[j];
                    key = path[j];
                } else {
                    printLine = PIPE.repeat(j-1) + ARROW + path[j];
                    key = path.slice(0, j+1).join("/");
                }

                // Check to see we have already added that path
                if (!completedList.includes(key)) {
                    completedList.push(key);
                    printList.push(printLine);
                }
            }
        }
        return printList.join("\n");
    }

}

export default FileTree;
