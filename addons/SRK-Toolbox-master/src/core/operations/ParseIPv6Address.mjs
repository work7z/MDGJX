/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import {strToIpv6, ipv6ToStr, ipv4ToStr, IPV6_REGEX} from "../lib/IP.mjs";
import BigNumber from "bignumber.js";

/**
 * Parse IPv6 address operation
 */
class ParseIPv6Address extends Operation {

    /**
     * ParseIPv6Address constructor
     */
    constructor() {
        super();

        this.name = "解析IPv6地址";
        this.module = "Default";
        this.description = "显示有效IPv6地址的longhand和shorthand版本。<br><br>可识别所有保留范围以及封装/隧道地址如Teredo和6to4。";
        this.infoURL = "https://wikipedia.org/wiki/IPv6_address";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let match,
            output = "";

        if ((match = IPV6_REGEX.exec(input))) {
            const ipv6 = strToIpv6(match[1]),
                longhand = ipv6ToStr(ipv6),
                shorthand = ipv6ToStr(ipv6, true);

            output += "Longhand:  " + longhand + "\nShorthand: " + shorthand + "\n";

            // Detect reserved addresses
            if (shorthand === "::") {
                // Unspecified address
                output += "\n未指定的地址：对应IPv4的0.0.0.0/32。";
                output += "\n未指定的地址范围： ::/128";
            } else if (shorthand === "::1") {
                // Loopback address
                output += "\n本地回环地址，对应IPv4的127.0.0.1/8。";
                output += "\n本地回环地址范围： ::1/128";
            } else if (ipv6[0] === 0 && ipv6[1] === 0 && ipv6[2] === 0 &&
                ipv6[3] === 0 && ipv6[4] === 0 && ipv6[5] === 0xffff) {
                // IPv4-mapped IPv6 address
                output += "\n检测到IPv4映射地址。对于混合双栈的网络部署，IPv6客户端默认被原生支持，IPv4的客户端展示为位于此类地址的IPv6客户端。";
                output += "\nIPv4映射地址： " + ipv4ToStr((ipv6[6] << 16) + ipv6[7]);
                output += "\nIPv4映射地址范围： ::ffff:0:0/96";
            } else if (ipv6[0] === 0 && ipv6[1] === 0 && ipv6[2] === 0 &&
                ipv6[3] === 0 && ipv6[4] === 0xffff && ipv6[5] === 0) {
                // IPv4-translated address
                output += "\n检测到IPv4翻译地址。无状态IP/ICMP翻译(SIIT)技术。详细信息请参考RFC 6145 和 6052。";
                output += "\nIPv4翻译地址： " + ipv4ToStr((ipv6[6] << 16) + ipv6[7]);
                output += "\nIPv4翻译地址范围： ::ffff:0:0:0/96";
            } else if (ipv6[0] === 0x100) {
                // Discard prefix per RFC 6666
                output += "\n检测到丢弃前缀（Discard Prefix）。一般用于抵御DoS攻击的黑洞路由。详细信息请参考RFC 6666。";
                output += "\n丢弃地址范围： 100::/64";
            } else if (ipv6[0] === 0x64 && ipv6[1] === 0xff9b && ipv6[2] === 0 &&
                ipv6[3] === 0 && ipv6[4] === 0 && ipv6[5] === 0) {
                // IPv4/IPv6 translation per RFC 6052
                output += "\n检测到“Well-Known”前缀的IPv4/IPv6翻译地址。详细信息请参考RFC 6052。";
                output += "\nIPv4翻译地址： " + ipv4ToStr((ipv6[6] << 16) + ipv6[7]);
                output += "\n“Well-Known”前缀范围： 64:ff9b::/96";
            } else if (ipv6[0] === 0x2001 && ipv6[1] === 0) {
                // Teredo tunneling
                output += "\n检测到Teredo隧道IPv6地址。\n";
                const serverIpv4  = (ipv6[2] << 16) + ipv6[3],
                    udpPort     = (~ipv6[5]) & 0xffff,
                    clientIpv4  = ~((ipv6[6] << 16) + ipv6[7]),
                    flagCone    = (ipv6[4] >>> 15) & 1,
                    flagR       = (ipv6[4] >>> 14) & 1,
                    flagRandom1 = (ipv6[4] >>> 10) & 15,
                    flagUg      = (ipv6[4] >>> 8) & 3,
                    flagRandom2 = ipv6[4] & 255;

                output += "\n服务器IPv4地址： " + ipv4ToStr(serverIpv4) +
                    "\n客户端IPv4地址： " + ipv4ToStr(clientIpv4) +
                    "\n客户端UDP端口：  " + udpPort +
                    "\nFlag：" +
                    "\n\tCone:    " + flagCone;

                if (flagCone) {
                    output += " （客户端位于锥形NAT后）";
                } else {
                    output += " （客户端没有位于锥形NAT后）";
                }

                output += "\n\tR:       " + flagR;

                if (flagR) {
                    output += " 错误：这个flag应该设置为0。详细信息请参考RFC 5991 和 4380。";
                }

                output += "\n\tRandom1: " + Utils.bin(flagRandom1, 4) +
                    "\n\tUG:      " + Utils.bin(flagUg, 2);

                if (flagUg) {
                    output += " 错误：这个flag应该设置为00。请参考RFC 4380。";
                }

                output += "\n\tRandom2: " + Utils.bin(flagRandom2, 8);

                if (!flagR && !flagUg && flagRandom1 && flagRandom2) {
                    output += "\n\n有效Teredo地址，符合RFC 4380 和 RFC 5991。";
                } else if (!flagR && !flagUg) {
                    output += "\n\n有效Teredo地址，符合RFC 4380，但不符合RFC 5991 (Teredo Security Updates)，因为Flag字段中不包括随机数值。";
                } else {
                    output += "\n\n无效Teredo地址。";
                }
                output += "\n\nTeredo前缀范围： 2001::/32";
            } else if (ipv6[0] === 0x2001 && ipv6[1] === 0x2 && ipv6[2] === 0) {
                // Benchmarking
                output += "\n分配给Benchmarking Methodology Working Group (BMWG)用于IPv6性能测试。对应IPv4的198.18.0.0/15。详细信息请参考RFC 5180。";
                output += "\nBMWG范围： 2001:2::/48";
            } else if (ipv6[0] === 0x2001 && ipv6[1] >= 0x10 && ipv6[1] <= 0x1f) {
                // ORCHIDv1
                output += "\n废弃的ORCHIDv1 (Overlay Routable Cryptographic Hash Identifiers)地址。\nORCHIDv1范围： 2001:10::/28\nORCHIDv2现在使用2001:20::/28。";
            } else if (ipv6[0] === 0x2001 && ipv6[1] >= 0x20 && ipv6[1] <= 0x2f) {
                // ORCHIDv2
                output += "\nORCHIDv2 (Overlay Routable Cryptographic Hash Identifiers)。\n用于加密哈希标识符（Cryptographic Hash Identifiers）的非路由IPv6地址";
                output += "\nORCHIDv2范围： 2001:20::/28";
            } else if (ipv6[0] === 0x2001 && ipv6[1] === 0xdb8) {
                // Documentation
                output += "\n文档用IPv6地址。此范围用于文档中需要IPv6地址举例用于描述网络场景的时候。对应IPv4的192.0.2.0/24、198.51.100.0/24和203.0.113.0/24。";
                output += "\n文档地址范围： 2001:db8::/32";
            } else if (ipv6[0] === 0x2002) {
                // 6to4
                output += "\n检测到6to4过渡IPv6地址。详细信息请参考RFC 3056。" +
                    "\n6to4前缀范围： 2002::/16";

                const v4Addr = ipv4ToStr((ipv6[1] << 16) + ipv6[2]),
                    slaId = ipv6[3],
                    interfaceIdStr = ipv6[4].toString(16) + ipv6[5].toString(16) + ipv6[6].toString(16) + ipv6[7].toString(16),
                    interfaceId = new BigNumber(interfaceIdStr, 16);

                output += "\n\n封装的IPv4地址： " + v4Addr +
                    "\nSLA ID: " + slaId +
                    "\n接口ID (16进制)： " + interfaceIdStr +
                    "\n接口ID (10进制)： " + interfaceId.toString();
            } else if (ipv6[0] >= 0xfc00 && ipv6[0] <= 0xfdff) {
                // Unique local address
                output += "\n唯一本地地址（Unique local address），类似于IPv4的私有地址范围10.0.0.0/8、172.16.0.0/12和192.168.0.0/16。详细信息请参考RFC 4193。";
                output += "\n唯一本地地址范围： fc00::/7";
            } else if (ipv6[0] >= 0xfe80 && ipv6[0] <= 0xfebf) {
                // Link-local address
                output += "\n链路本地地址（Link-local address），类似于IPv4的自动私有地址范围169.254.0.0/16。";
                output += "\n链路本地地址范围： fe80::/10";
            } else if (ipv6[0] >= 0xff00) {
                // Multicast
                output += "\n保留的多播地址。";
                output += "\n多播地址范围： ff00::/8";

                switch (ipv6[0]) {
                    case 0xff01:
                        output += "\n\n保留的多播地址块，用于接口本地范围（Interface Local Scope）";
                        break;
                    case 0xff02:
                        output += "\n\n保留的多播地址块，用于链路本地范围（Link Local Scope）";
                        break;
                    case 0xff03:
                        output += "\n\n保留的多播地址块，用于地域本地范围（Realm Local Scope）";
                        break;
                    case 0xff04:
                        output += "\n\n保留的多播地址块，用于管理本地范围（Admin Local Scope）";
                        break;
                    case 0xff05:
                        output += "\n\n保留的多播地址块，用于站点本地范围（Site Local Scope）";
                        break;
                    case 0xff08:
                        output += "\n\n保留的多播地址块，用于组织本地范围（Organisation Local Scope）";
                        break;
                    case 0xff0e:
                        output += "\n\n保留的多播地址块，用于全局范围（Global Scope）";
                        break;
                }

                if (ipv6[6] === 1) {
                    if (ipv6[7] === 2) {
                        output += "\n保留的多播地址，用于 'All DHCP Servers and Relay Agents (defined in RFC3315)'";
                    } else if (ipv6[7] === 3) {
                        output += "\n保留的多播地址，用于 'All LLMNR Hosts (defined in RFC4795)'";
                    }
                } else {
                    switch (ipv6[7]) {
                        case 1:
                            output += "\n保留的多播地址，用于 'All nodes'";
                            break;
                        case 2:
                            output += "\n保留的多播地址，用于 'All routers'";
                            break;
                        case 5:
                            output += "\n保留的多播地址，用于 'OSPFv3 - All OSPF routers'";
                            break;
                        case 6:
                            output += "\n保留的多播地址，用于 'OSPFv3 - All Designated Routers'";
                            break;
                        case 8:
                            output += "\n保留的多播地址，用于 'IS-IS for IPv6 Routers'";
                            break;
                        case 9:
                            output += "\n保留的多播地址，用于 'RIP Routers'";
                            break;
                        case 0xa:
                            output += "\n保留的多播地址，用于 'EIGRP Routers'";
                            break;
                        case 0xc:
                            output += "\n保留的多播地址，用于 'Simple Service Discovery Protocol'";
                            break;
                        case 0xd:
                            output += "\n保留的多播地址，用于 'PIM Routers'";
                            break;
                        case 0x16:
                            output += "\n保留的多播地址，用于 'MLDv2 Reports (defined in RFC3810)'";
                            break;
                        case 0x6b:
                            output += "\n保留的多播地址，用于 'Precision Time Protocol v2 Peer Delay Measurement Messages'";
                            break;
                        case 0xfb:
                            output += "\n保留的多播地址，用于 'Multicast DNS'";
                            break;
                        case 0x101:
                            output += "\n保留的多播地址，用于 'Network Time Protocol'";
                            break;
                        case 0x108:
                            output += "\n保留的多播地址，用于 'Network Information Service'";
                            break;
                        case 0x114:
                            output += "\n保留的多播地址，用于 'Experiments'";
                            break;
                        case 0x181:
                            output += "\n保留的多播地址，用于 'Precision Time Protocol v2 Messages (exc. Peer Delay)'";
                            break;
                    }
                }
            }


            // Detect possible EUI-64 addresses
            if (((ipv6[5] & 0xff) === 0xff) && (ipv6[6] >>> 8 === 0xfe)) {
                output += "\n\n此IPv6地址包含修改过的EUI-64地址，由于第12个和第13个八位组是FF:FE。";

                const intIdent = Utils.hex(ipv6[4] >>> 8) + ":" + Utils.hex(ipv6[4] & 0xff) + ":" +
                    Utils.hex(ipv6[5] >>> 8) + ":" + Utils.hex(ipv6[5] & 0xff) + ":" +
                    Utils.hex(ipv6[6] >>> 8) + ":" + Utils.hex(ipv6[6] & 0xff) + ":" +
                    Utils.hex(ipv6[7] >>> 8) + ":" + Utils.hex(ipv6[7] & 0xff),
                    mac = Utils.hex((ipv6[4] >>> 8) ^ 2) + ":" + Utils.hex(ipv6[4] & 0xff) + ":" +
                    Utils.hex(ipv6[5] >>> 8) + ":" + Utils.hex(ipv6[6] & 0xff) + ":" +
                    Utils.hex(ipv6[7] >>> 8) + ":" + Utils.hex(ipv6[7] & 0xff);
                output += "\n接口标识符： " + intIdent +
                    "\nMAC地址：          " + mac;
            }
        } else {
            throw new OperationError("无效IPv6地址");
        }
        return output;
    }

}

export default ParseIPv6Address;
