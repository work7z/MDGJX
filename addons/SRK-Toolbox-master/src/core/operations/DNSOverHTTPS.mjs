/**
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * DNS over HTTPS operation
 */
class DNSOverHTTPS extends Operation {

    /**
     * DNSOverHTTPS constructor
     */
    constructor() {
        super();

        this.name = "DNS over HTTPS";
        this.module = "Default";
        this.description = [
            "使用 DNS over HTTPS 对给定域名发起DNS查询。",
            "<br><br>",
            "默认情况下，支持 <a href='https://developers.cloudflare.com/1.1.1.1/dns-over-https/'>Cloudflare</a> 和 <a href='https://developers.google.com/speed/public-dns/docs/dns-over-https'>Google</a> 的 DNS over HTTPS 服务。",
            "<br><br>",
            "可用于支持 GET 请求参数 <code>name</code> 和 <code>type</code> 的任意 DNS over HTTPS 服务器。"
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/DNS_over_HTTPS";
        this.inputType = "string";
        this.outputType = "JSON";
        this.manualBake = true;
        this.args = [
            {
                name: "解析服务器",
                type: "editableOption",
                value: [
                    {
                        name: "Google",
                        value: "https://dns.google.com/resolve"
                    },
                    {
                        name: "Cloudflare",
                        value: "https://cloudflare-dns.com/dns-query"
                    }
                ]
            },
            {
                name: "查询类型",
                type: "option",
                value: [
                    "A",
                    "AAAA",
                    "ANAME",
                    "CERT",
                    "CNAME",
                    "DNSKEY",
                    "HTTPS",
                    "IPSECKEY",
                    "LOC",
                    "MX",
                    "NS",
                    "OPENPGPKEY",
                    "PTR",
                    "RRSIG",
                    "SIG",
                    "SOA",
                    "SPF",
                    "SRV",
                    "SSHFP",
                    "TA",
                    "TXT",
                    "URI",
                    "ANY"
                ]
            },
            {
                name: "仅显示应答信息",
                type: "boolean",
                value: false
            },
            {
                name: "禁用 DNSSEC 验证",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        const [resolver, requestType, justAnswer, DNSSEC] = args;
        let url = URL;
        try {
            url = new URL(resolver);
        } catch (error) {
            throw new OperationError(error.toString() +
            "\n\n此错误可能由以下原因产生：\n" +
            " - 无效的解析服务器URL\n");
        }
        const params = {name: input, type: requestType, cd: DNSSEC};

        url.search = new URLSearchParams(params);

        return fetch(url, {headers: {"accept": "application/dns-json"}}).then(response => {
            return response.json();
        }).then(data => {
            if (justAnswer) {
                return extractData(data.Answer);
            }
            return data;
        }).catch(e => {
            throw new OperationError(`错误：无法发起请求： ${url}\n${e.toString()}`);
        });

    }
}

/**
 * Construct an array of just data from a DNS Answer section
 *
 * @private
 * @param {JSON} data
 * @returns {JSON}
 */
function extractData(data) {
    if (typeof(data) == "undefined") {
        return [];
    } else {
        const dataValues = [];
        data.forEach(element => {
            dataValues.push(element.data);
        });
        return dataValues;
    }
}

export default DNSOverHTTPS;
