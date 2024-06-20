/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import r from "jsrsasign";
import { fromBase64 } from "../lib/Base64.mjs";
import { toHex } from "../lib/Hex.mjs";
import { formatByteStr, formatDnObj } from "../lib/PublicKey.mjs";
import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Parse X.509 certificate operation
 */
class ParseX509Certificate extends Operation {

    /**
     * ParseX509Certificate constructor
     */
    constructor() {
        super();

        this.name = "解析X.509证书";
        this.module = "PublicKey";
        this.description = "X.509是密码学里公钥证书的格式标准。X.509证书已应用在包括TLS/SSL在内的众多网络协议里，同时它也用在很多非在线应用场景里，比如电子签名服务。<br><br>此操作把证书内容显示为人类可读的形式，和openssl命令行的效果类似。<br><br>标签： X509, server hello, handshake";
        this.infoURL = "https://wikipedia.org/wiki/X.509";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输入格式",
                "type": "option",
                "value": ["PEM", "DER十六进制", "Base64", "原始"]
            }
        ];
        this.checks = [
            {
                "pattern": "^-+BEGIN CERTIFICATE-+\\r?\\n[\\da-z+/\\n\\r]+-+END CERTIFICATE-+\\r?\\n?$",
                "flags": "i",
                "args": ["PEM"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input.length) {
            return "输入为空";
        }

        const cert = new r.X509(),
            inputFormat = args[0];

        let undefinedInputFormat = false;
        try {
            switch (inputFormat) {
                case "DER十六进制":
                    input = input.replace(/\s/g, "").toLowerCase();
                    cert.readCertHex(input);
                    break;
                case "PEM":
                    cert.readCertPEM(input);
                    break;
                case "Base64":
                    cert.readCertHex(toHex(fromBase64(input, null, "byteArray"), ""));
                    break;
                case "原始":
                    cert.readCertHex(toHex(Utils.strToArrayBuffer(input), ""));
                    break;
                default:
                    undefinedInputFormat = true;
            }
        } catch (e) {
            throw "证书读取错误（输入内容有误？）";
        }
        if (undefinedInputFormat) throw "无效输入格式";

        const sn = cert.getSerialNumberHex(),
            issuer = cert.getIssuer(),
            subject = cert.getSubject(),
            pk = cert.getPublicKey(),
            pkFields = [],
            sig = cert.getSignatureValueHex();

        let pkStr = "",
            sigStr = "",
            extensions = "";

        // Public Key fields
        pkFields.push({
            key: "Algorithm",
            value: pk.type
        });

        if (pk.type === "EC") { // ECDSA
            pkFields.push({
                key: "Curve Name",
                value: pk.curveName
            });
            pkFields.push({
                key: "Length",
                value: (((new r.BigInteger(pk.pubKeyHex, 16)).bitLength()-3) /2) + " bits"
            });
            pkFields.push({
                key: "pub",
                value: formatByteStr(pk.pubKeyHex, 16, 18)
            });
        } else if (pk.type === "DSA") { // DSA
            pkFields.push({
                key: "pub",
                value: formatByteStr(pk.y.toString(16), 16, 18)
            });
            pkFields.push({
                key: "P",
                value: formatByteStr(pk.p.toString(16), 16, 18)
            });
            pkFields.push({
                key: "Q",
                value: formatByteStr(pk.q.toString(16), 16, 18)
            });
            pkFields.push({
                key: "G",
                value: formatByteStr(pk.g.toString(16), 16, 18)
            });
        } else if (pk.e) { // RSA
            pkFields.push({
                key: "Length",
                value: pk.n.bitLength() + " bits"
            });
            pkFields.push({
                key: "Modulus",
                value: formatByteStr(pk.n.toString(16), 16, 18)
            });
            pkFields.push({
                key: "Exponent",
                value: pk.e + " (0x" + pk.e.toString(16) + ")"
            });
        } else {
            pkFields.push({
                key: "Error",
                value: "未知的公钥类型"
            });
        }

        // Format Public Key fields
        for (let i = 0; i < pkFields.length; i++) {
            pkStr += `  ${pkFields[i].key}:${(pkFields[i].value + "\n").padStart(
                18 - (pkFields[i].key.length + 3) + pkFields[i].value.length + 1,
                " "
            )}`;
        }

        // Signature fields
        let breakoutSig = false;
        try {
            breakoutSig = r.ASN1HEX.dump(sig).indexOf("SEQUENCE") === 0;
        } catch (err) {
            // Error processing signature, output without further breakout
        }

        if (breakoutSig) { // DSA or ECDSA
            sigStr = `  r:              ${formatByteStr(r.ASN1HEX.getV(sig, 4), 16, 18)}
  s:              ${formatByteStr(r.ASN1HEX.getV(sig, 48), 16, 18)}`;
        } else { // RSA or unknown
            sigStr = `  签名:      ${formatByteStr(sig, 16, 18)}`;
        }

        // Extensions
        try {
            extensions = cert.getInfo().split("X509v3 Extensions:\n")[1].split("signature")[0];
        } catch (err) {}

        const issuerStr = formatDnObj(issuer, 2),
            nbDate = formatDate(cert.getNotBefore()),
            naDate = formatDate(cert.getNotAfter()),
            subjectStr = formatDnObj(subject, 2);

        return `
版本:              ${cert.version} (0x${Utils.hex(cert.version - 1)})
序列号:            ${new r.BigInteger(sn, 16).toString()} (0x${sn})
算法ID:            ${cert.getSignatureAlgorithmField()}
有效期:
  从:              ${nbDate} (dd-mm-yyyy hh:mm:ss) (${cert.getNotBefore()})
  到:              ${naDate} (dd-mm-yyyy hh:mm:ss) (${cert.getNotAfter()})
颁发者:
${issuerStr}
使用者:
${subjectStr}
公钥:
${pkStr.slice(0, -1)}
证书签名:
  算法:            ${cert.getSignatureAlgorithmName()}
${sigStr}

扩展:
${extensions}`;
    }

}

/**
 * Formats dates.
 *
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate (dateStr) {
    if (dateStr.length === 13) { // UTC Time
        dateStr = (dateStr[0] < "5" ? "20" : "19") + dateStr;
    }
    return dateStr[6] + dateStr[7] + "/" +
        dateStr[4] + dateStr[5] + "/" +
        dateStr[0] + dateStr[1] + dateStr[2] + dateStr[3] + " " +
        dateStr[8] + dateStr[9] + ":" +
        dateStr[10] + dateStr[11] + ":" +
        dateStr[12] + dateStr[13];
}

export default ParseX509Certificate;
