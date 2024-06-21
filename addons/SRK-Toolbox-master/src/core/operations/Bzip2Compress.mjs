/**
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Bzip2 from "libbzip2-wasm";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Bzip2 Compress operation
 */
class Bzip2Compress extends Operation {

    /**
     * Bzip2Compress constructor
     */
    constructor() {
        super();

        this.name = "Bzip2压缩";
        this.module = "Compression";
        this.description = "Bzip2 是由 Julian Seward (of GHC fame) 开发的压缩算法库，使用 Burrows-Wheeler 算法。仅支持压缩单个文件且速度较慢，但比 Deflate (.gz & .zip) 算法压缩率更高。";
        this.infoURL = "https://wikipedia.org/wiki/Bzip2";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "块大小 (多少个100kb)",
                type: "number",
                value: 9,
                min: 1,
                max: 9
            },
            {
                name: "Work factor",
                type: "number",
                value: 30
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {File}
     */
    run(input, args) {
        const [blockSize, workFactor] = args;
        if (input.byteLength <= 0) {
            throw new OperationError("输入不能为空。");
        }
        if (isWorkerEnvironment()) self.sendStatusMessage("正在加载 Bzip2...");
        return new Promise((resolve, reject) => {
            Bzip2().then(bzip2 => {
                if (isWorkerEnvironment()) self.sendStatusMessage("压缩数据中...");
                const inpArray = new Uint8Array(input);
                const bzip2cc = bzip2.compressBZ2(inpArray, blockSize, workFactor);
                if (bzip2cc.error !== 0) {
                    reject(new OperationError(bzip2cc.error_msg));
                } else {
                    const output = bzip2cc.output;
                    resolve(output.buffer.slice(output.byteOffset, output.byteLength + output.byteOffset));
                }
            });
        });
    }

}

export default Bzip2Compress;
