/**
 * @author Danh4 [dan.h4@ncsc.gov.uk]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Cbor from "cbor";

/**
 * CBOR Decode operation
 */
class CBORDecode extends Operation {

    /**
     * CBORDecode constructor
     */
    constructor() {
        super();

        this.name = "CBOR解码";
        this.module = "Serialise";
        this.description = "简明二进制对象展现（CBOR，Concise Binary Object Representation）是一种提供良好压缩性，扩展性强，不需要进行版本协商的二进制数据交换形式。这些特性使它有别于早期的ASN.1和MessagePack等二进制序列化方式。IETF RFC 8949定义了详细的CBOR格式与说明。";
        this.infoURL = "https://wikipedia.org/wiki/CBOR";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        return Cbor.decodeFirstSync(Buffer.from(input).toString("hex"));
    }

}

export default CBORDecode;
