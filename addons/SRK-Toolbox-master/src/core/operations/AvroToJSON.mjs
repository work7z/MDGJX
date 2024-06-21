/**
 * @author jarrodconnolly [jarrod@nestedquotes.ca]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import avro from "avsc";

/**
 * Avro to JSON operation
 */
class AvroToJSON extends Operation {

    /**
     * AvroToJSON constructor
     */
    constructor() {
        super();

        this.name = "Avro转JSON";
        this.module = "Serialise";
        this.description = "将Apache Avro编码格式转换为JSON。";
        this.infoURL = "https://wikipedia.org/wiki/Apache_Avro";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "强制有效JSON",
                type: "boolean",
                value: true
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (input.byteLength <= 0) {
            throw new OperationError("Please provide an input.");
        }

        const forceJSON = args[0];

        return new Promise((resolve, reject) => {
            const result = [];
            const inpArray = new Uint8Array(input);
            const decoder = new avro.streams.BlockDecoder();

            decoder
                .on("data", function (obj) {
                    result.push(obj);
                })
                .on("error", function () {
                    reject(new OperationError("Error parsing Avro file."));
                })
                .on("end", function () {
                    if (forceJSON) {
                        resolve(result.length === 1 ? JSON.stringify(result[0], null, 4) : JSON.stringify(result, null, 4));
                    } else {
                        const data = result.reduce((result, current) => result + JSON.stringify(current) + "\n", "");
                        resolve(data);
                    }
                });

            decoder.write(inpArray);
            decoder.end();
        });
    }
}

export default AvroToJSON;
