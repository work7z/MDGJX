/**
 * @author jkataja
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import forge from "node-forge";
import Utils from "../Utils.mjs";

/**
 * Parse CSR operation
 */
class ParseCSR extends Operation {

    /**
     * ParseCSR constructor
     */
    constructor() {
        super();

        this.name = "解析CSR";
        this.module = "PublicKey";
        this.description = "解析X.509证书的证书签名申请（Certificate Signing Request，CSR）数据。";
        this.infoURL = "https://wikipedia.org/wiki/Certificate_signing_request";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输入格式",
                "type": "option",
                "value": ["PEM"]
            },
            {
                "name": "密钥类型",
                "type": "option",
                "value": ["RSA"]
            },
            {
                "name": "严格的ASN.1值长度",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                "pattern": "^-+BEGIN CERTIFICATE REQUEST-+\\r?\\n[\\da-z+/\\n\\r]+-+END CERTIFICATE REQUEST-+\\r?\\n?$",
                "flags": "i",
                "args": ["PEM"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string} Human-readable description of a Certificate Signing Request (CSR).
     */
    run(input, args) {
        if (!input.length) {
            return "输入内容为空";
        }

        const csr = forge.pki.certificationRequestFromPem(input, args[1]);

        // RSA algorithm is the only one supported for CSR in node-forge as of 1.3.1
        return `版本：       ${1 + csr.version} (0x${Utils.hex(csr.version)})
主体${formatSubject(csr.subject)}
主体别名${formatSubjectAlternativeNames(csr)}
公钥
  算法：     RSA
  长度：     ${csr.publicKey.n.bitLength()} 位
  模数：     ${formatMultiLine(chop(csr.publicKey.n.toString(16).replace(/(..)/g, "$&:")))}
  指数：     ${csr.publicKey.e} (0x${Utils.hex(csr.publicKey.e)})
签名
  算法：     ${forge.pki.oids[csr.signatureOid]}
  签名：     ${formatMultiLine(Utils.strToByteArray(csr.signature).map(b => Utils.hex(b)).join(":"))}
扩展${formatExtensions(csr)}`;
    }
}

/**
 * Format Subject of the request as a multi-line string
 * @param {*} subject CSR Subject
 * @returns Multi-line string describing Subject
 */
function formatSubject(subject) {
    let out = "\n";

    for (const attribute of subject.attributes) {
        out += `  ${attribute.shortName} = ${attribute.value}\n`;
    }

    return chop(out);
}


/**
 * Format Subject Alternative Names from the name `subjectAltName` extension
 * @param {*} extension CSR object
 * @returns Multi-line string describing Subject Alternative Names
 */
function formatSubjectAlternativeNames(csr) {
    let out = "\n";

    for (const attribute of csr.attributes) {
        for (const extension of attribute.extensions) {
            if (extension.name === "subjectAltName") {
                const names = [];
                for (const altName of extension.altNames) {
                    switch (altName.type) {
                        case 1:
                            names.push(`EMAIL：${altName.value}`);
                            break;
                        case 2:
                            names.push(`DNS：${altName.value}`);
                            break;
                        case 6:
                            names.push(`URI：${altName.value}`);
                            break;
                        case 7:
                            names.push(`IP：${altName.ip}`);
                            break;
                        default:
                            names.push(`（无法格式化的类型名称：${altName.type}）\n`);
                    }
                }
                out += indent(2, names);
            }
        }
    }

    return chop(out);
}

/**
 * Format known extensions of a CSR
 * @param {*} csr CSR object
 * @returns Multi-line string describing attributes
 */
function formatExtensions(csr) {
    let out = "\n";

    for (const attribute of csr.attributes) {
        for (const extension of attribute.extensions) {
            // formatted separately
            if (extension.name === "subjectAltName") {
                continue;
            }
            out += `  ${extension.name}${(extension.critical ? " CRITICAL" : "")}:\n`;
            let parts = [];
            switch (extension.name) {
                case "basicConstraints" :
                    parts = describeBasicConstraints(extension);
                    break;
                case "keyUsage" :
                    parts = describeKeyUsage(extension);
                    break;
                case "extKeyUsage" :
                    parts = describeExtendedKeyUsage(extension);
                    break;
                default :
                    parts = ["（无法格式化的扩展）"];
            }
            out += indent(4, parts);
        }
    }

    return chop(out);
}


/**
 * Format hex string onto multiple lines
 * @param {*} longStr
 * @returns Hex string as a multi-line hex string
 */
function formatMultiLine(longStr) {
    const lines = [];

    for (let remain = longStr ; remain !== "" ; remain = remain.substring(48)) {
        lines.push(remain.substring(0, 48));
    }

    return lines.join("\n                  ");
}

/**
 * Describe Basic Constraints
 * @see RFC 5280 4.2.1.9. Basic Constraints https://www.ietf.org/rfc/rfc5280.txt
 * @param {*} extension CSR extension with the name `basicConstraints`
 * @returns Array of strings describing Basic Constraints
 */
function describeBasicConstraints(extension) {
    const constraints = [];

    constraints.push(`CA = ${extension.cA}`);
    if (extension.pathLenConstraint !== undefined) constraints.push(`PathLenConstraint = ${extension.pathLenConstraint}`);

    return constraints;
}

/**
 * Describe Key Usage extension permitted use cases
 * @see RFC 5280 4.2.1.3. Key Usage https://www.ietf.org/rfc/rfc5280.txt
 * @param {*} extension CSR extension with the name `keyUsage`
 * @returns Array of strings describing Key Usage extension permitted use cases
 */
function describeKeyUsage(extension) {
    const usage = [];

    if (extension.digitalSignature) usage.push("Digital signature");
    if (extension.nonRepudiation) usage.push("Non-repudiation");
    if (extension.keyEncipherment) usage.push("Key encipherment");
    if (extension.dataEncipherment) usage.push("Data encipherment");
    if (extension.keyAgreement) usage.push("Key agreement");
    if (extension.keyCertSign) usage.push("Key certificate signing");
    if (extension.cRLSign) usage.push("CRL signing");
    if (extension.encipherOnly) usage.push("Encipher only");
    if (extension.decipherOnly) usage.push("Decipher only");

    if (usage.length === 0) usage.push("（无）");

    return usage;
}

/**
 * Describe Extended Key Usage extension permitted use cases
 * @see RFC 5280 4.2.1.12. Extended Key Usage https://www.ietf.org/rfc/rfc5280.txt
 * @param {*} extension CSR extension with the name `extendedKeyUsage`
 * @returns Array of strings describing Extended Key Usage extension permitted use cases
 */
function describeExtendedKeyUsage(extension) {
    const usage = [];

    if (extension.serverAuth) usage.push("TLS Web Server Authentication");
    if (extension.clientAuth) usage.push("TLS Web Client Authentication");
    if (extension.codeSigning) usage.push("Code signing");
    if (extension.emailProtection) usage.push("E-mail Protection (S/MIME)");
    if (extension.timeStamping) usage.push("Trusted Timestamping");
    if (extension.msCodeInd) usage.push("Microsoft Individual Code Signing");
    if (extension.msCodeCom) usage.push("Microsoft Commercial Code Signing");
    if (extension.msCTLSign) usage.push("Microsoft Trust List Signing");
    if (extension.msSGC) usage.push("Microsoft Server Gated Crypto");
    if (extension.msEFS) usage.push("Microsoft Encrypted File System");
    if (extension.nsSGC) usage.push("Netscape Server Gated Crypto");

    if (usage.length === 0) usage.push("（无）");

    return usage;
}

/**
 * Join an array of strings and add leading spaces to each line.
 * @param {*} n How many leading spaces
 * @param {*} parts Array of strings
 * @returns Joined and indented string.
 */
function indent(n, parts) {
    const fluff = " ".repeat(n);
    return fluff + parts.join("\n" + fluff) + "\n";
}

/**
 * Remove last character from a string.
 * @param {*} s String
 * @returns Chopped string.
 */
function chop(s) {
    return s.substring(0, s.length - 1);
}

export default ParseCSR;
