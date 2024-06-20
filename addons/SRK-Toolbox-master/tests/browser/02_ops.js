/**
 * Tests for operations.
 * The primary purpose for these test is to ensure that the operations
 * output something vaguely expected (i.e. they aren't completely broken
 * after a dependency update or changes to the UI), rather than to confirm
 * that this output is actually accurate. Accuracy of output and testing
 * of edge cases should be carried out in the operations test suite found
 * in /tests/operations as this is much faster and easier to configure
 * than the UI tests found here.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

const utils = require("./browserUtils.js");

module.exports = {
    before: browser => {
        browser
            .resizeWindow(1280, 800)
            .url(browser.launchUrl)
            .useCss()
            .waitForElementNotPresent("#preloader", 10000)
            .click("#auto-bake-label");
    },

    "Sanity check operations": async browser => {
        const Images = await import("../samples/Images.mjs");
        testOp(browser, "A1Z26密码解密", "20 5 19 20 15 21 20 16 21 20", "testoutput");
        testOp(browser, "A1Z26密码加密", "test input", "20 5 19 20 9 14 16 21 20");
        testOp(browser, "ADD", "test input", "Ê»ÉÊv¿ÄÆËÊ", [{ "option": "十六进制", "string": "56" }]);
        testOp(browser, "AES解密", "b443f7f7c16ac5396a34273f6f639caa", "test output", [{ "option": "十六进制", "string": "00112233445566778899aabbccddeeff" }, { "option": "十六进制", "string": "00000000000000000000000000000000" }, "CBC", "十六进制", "原始", { "option": "十六进制", "string": "" }]);
        testOp(browser, "AES加密", "test input", "e42eb8fbfb7a98fff061cd2c1a794d92", [{"option": "十六进制", "string": "00112233445566778899aabbccddeeff"}, {"option": "十六进制", "string": "00000000000000000000000000000000"}, "CBC", "原始", "十六进制"]);
        testOp(browser, "AND", "test input", "4$04  $044", [{ "option": "十六进制", "string": "34" }]);
        testOp(browser, "添加行号", "test input", "1 test input");
        testOp(browser, ["十六进制转字符", "图像加字", "Base64编码"], Images.PNG_HEX, Images.PNG_CHEF_B64, [[], ["Chef", "居中", "中部", 0, 0, 16], []]);
        testOp(browser, "Adler-32校验和", "test input", "16160411");
        testOp(browser, "仿射密码解密", "test input", "rcqr glnsr", [1, 2]);
        testOp(browser, "仿射密码加密", "test input", "gndg zoujg", [3, 1]);
        testOp(browser, "AMF解码", "\u000A\u0013\u0001\u0003a\u0006\u0009test", /"\$value": "test"/);
        testOp(browser, "AMF编码", '{"a": "test"}', "\u000A\u0013\u0001\u0003a\u0006\u0009test");
        testOp(browser, "哈希分析", "0123456789abcdef", /CRC-64/);
        testOp(browser, "阿特巴希密码", "test input", "gvhg rmkfg");
        // testOp(browser, "Avro to JSON", "test input", "test_output");
        testOp(browser, "BLAKE2b", "test input", "33ebdc8f38177f3f3f334eeb117a84e11f061bbca4db6b8923e5cec85103f59f415551a5d5a933fdb6305dc7bf84671c2540b463dbfa08ee1895cfaa5bd780b5", ["512", "十六进制", { "option": "UTF8", "string": "pass" }]);
        testOp(browser, "BLAKE2s", "test input", "defe73d61dfa6e5807e4f9643e159a09ccda6be3c26dcd65f8a9bb38bfc973a7", ["256", "十六进制", { "option": "UTF8", "string": "pass" }]);
        testOp(browser, "BSON反序列化", "\u0011\u0000\u0000\u0000\u0002a\u0000\u0005\u0000\u0000\u0000test\u0000\u0000", '{\u000A  "a": "test"\u000A}');
        testOp(browser, "BSON序列化", '{"a":"test"}', "\u0011\u0000\u0000\u0000\u0002a\u0000\u0005\u0000\u0000\u0000test\u0000\u0000");
        // testOp(browser, "Bacon Cipher Decode", "test input", "test_output");
        // testOp(browser, "Bacon Cipher Encode", "test input", "test_output");
        testOp(browser, "Bcrypt", "test input", /^\$2a\$06\$.{53}$/, [6]);
        testOp(browser, "Bcrypt比较", "test input", "匹配： test input", ["$2a$05$FCfBSVX7OeRkK.9kQVFCiOYu9XtwtIbePqUiroD1lkASW9q5QClzG"]);
        testOp(browser, "Bcrypt解析", "$2a$05$kXWtAIGB/R8VEzInoM5ocOTBtyc0m2YTIwFiBU/0XoW032f9QrkWW", /轮数： 5/);
        testOp(browser, "双密码解密", "qblb tfovy", "test input", ["pass"]);
        testOp(browser, "双密码加密", "test input", "qblb tfovy", ["pass"]);
        testOp(browser, "按位左移", "test input", "\u00E8\u00CA\u00E6\u00E8@\u00D2\u00DC\u00E0\u00EA\u00E8");
        testOp(browser, "按位右移", "test input", ":29:\u0010478::");
        testOp(browser, "Blowfish解密", "10884e15427dd84ec35204e9c8e921ae", "test_output", [{"option": "十六进制", "string": "1234567801234567"}, {"option": "十六进制", "string": "0011223344556677"}, "CBC", "十六进制", "原始"]);
        testOp(browser, "Blowfish加密", "test input", "f0fadbd1d90d774f714248cf26b96410", [{"option": "十六进制", "string": "1234567801234567"}, {"option": "十六进制", "string": "0011223344556677"}, "CBC", "原始", "十六进制"]);
        testOp(browser, ["十六进制转字符", "模糊图像", "Base64编码"], Images.PNG_HEX, Images.PNG_BLUR_B64);
        testOpHtml(browser, "Bombe", "XTSYN WAEUG EZALY NRQIM AMLZX MFUOD AWXLY LZCUZ QOQBQ JLCPK NDDRW F", "table tr:last-child td:first-child", "ECG", ["3-rotor", "LEYJVCNIXWPBQMDRTAKZGFUHOS", "BDFHJLCPRTXVZNYEIWGAKMUSQO<W", "AJDKSIRUXBLHWTMCQGZNPYFVOE<F", "ESOVPZJAYQUIRHXLNFTGKDCMWB<K", "AY BR CU DH EQ FS GL IP JX KN MO TZ VW", "HELLO CYBER CHEFU SER", 0, true]);
        testOp(browser, ["Bzip2压缩", "字符转十六进制"], "test input", "42 5a 68 39 31 41 59 26 53 59 cf 96 82 1d 00 00 03 91 80 40 00 02 21 4e 00 20 00 21 90 c2 10 c0 88 33 92 8e df 17 72 45 38 50 90 cf 96 82 1d");
        testOp(browser, ["十六进制转字符", "Bzip2解压"], "425a68393141592653597b0884b7000003038000008200ce00200021a647a4218013709517c5dc914e14241ec2212dc0", "test_output", [[], [true]]);
    // testOp(browser, "CBOR Decode", "test input", "test output");
    // testOp(browser, "CBOR Encode", "test input", "test output");
        testOp(browser, "CRC-16校验和", "test input", "77c7");
        testOp(browser, "CRC-32校验和", "test input", "29822bc8");
        testOp(browser, "CRC-8校验和", "test input", "9d");
    // testOp(browser, "CSS Beautify", "test input", "test_output");
    // testOp(browser, "CSS Minify", "test input", "test_output");
        // testOp(browser, "CSS selector", "test input", "test_output");
        // testOp(browser, "CSV to JSON", "test input", "test_output");
    // testOp(browser, "CTPH", "test input", "test_output");
        // testOp(browser, "Cartesian Product", "test input", "test_output");
        // testOp(browser, "Change IP format", "test input", "test_output");
        // testOp(browser, "Chi Square", "test input", "test_output");
        // testOp(browser, "CipherSaber2 Decrypt", "test input", "test_output");
        // testOp(browser, "CipherSaber2 Encrypt", "test input", "test_output");
        // testOp(browser, "Citrix CTX1 Decode", "test input", "test_output");
        // testOp(browser, "Citrix CTX1 Encode", "test input", "test_output");
        testOpHtml(browser, "Colossus", "CTBKJUVXHZ-H3L4QV+YEZUK+SXOZ/N", "table tr:last-child td:first-child", "30", ["", "KH Pattern", "Z", "", "", "None", "Select Program", "Letter Count", "", "", "", "", "", "", false, "", "", "", "", "", "", false, "", "", "", "", "", "", false, "", false, "", false, false, false, false, false, "", false, false, "", "", 0, "", "", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        // testOp(browser, "Comment", "test input", "test_output");
        // testOp(browser, "Compare CTPH hashes", "test input", "test_output");
        // testOp(browser, "Compare SSDEEP hashes", "test input", "test_output");
        // testOp(browser, "Conditional Jump", "test input", "test_output");
        testOpImage(browser, "容纳图像", "files/Hitchhikers_Guide.jpeg");
        // testOp(browser, "Convert area", "test input", "test_output");
    // testOp(browser, "Convert co-ordinate format", "test input", "test_output");
        // testOp(browser, "Convert data units", "test input", "test_output");
        // testOp(browser, "Convert distance", "test input", "test_output");
        testOpImage(browser, "图像格式转换", "files/Hitchhikers_Guide.jpeg");
        // testOp(browser, "Convert mass", "test input", "test_output");
        // testOp(browser, "Convert speed", "test input", "test_output");
        // testOp(browser, "Convert to NATO alphabet", "test input", "test_output");
        // testOp(browser, "Count occurrences", "test input", "test_output");
        testOpImage(browser, "覆盖图像", "files/Hitchhikers_Guide.jpeg");
        testOpImage(browser, "裁剪图像", "files/Hitchhikers_Guide.jpeg");
    // testOp(browser, "CSS Selector", "test input", "test output");
        // testOp(browser, "DES Decrypt", "test input", "test_output");
        // testOp(browser, "DES Encrypt", "test input", "test_output");
        // testOp(browser, "DNS over HTTPS", "test input", "test_output");
        // testOp(browser, "Dechunk HTTP response", "test input", "test_output");
        // testOp(browser, "Decode NetBIOS Name", "test input", "test_output");
        // testOp(browser, "Decode text", "test input", "test_output");
        // testOp(browser, "Defang IP Addresses", "test input", "test_output");
        // testOp(browser, "Defang URL", "test input", "test_output");
        // testOp(browser, "Derive EVP key", "test input", "test_output");
        // testOp(browser, "Derive PBKDF2 key", "test input", "test_output");
        // testOp(browser, "Detect File Type", "test input", "test_output");
        testOpHtml(browser, "Diff", "The cat sat on the mat\n\nThe mat cat on the sat", "ins:first-child", "mat", ["\\n\\n", "单词", true, true, false, false]);
        // testOp(browser, "Disassemble x86", "test input", "test_output");
        testOpImage(browser, "抖动图像", "files/Hitchhikers_Guide.jpeg");
    // testOp(browser, "Divide", "test input", "test_output");
        // testOp(browser, "Drop bytes", "test input", "test_output");
        // testOp(browser, "Encode NetBIOS Name", "test input", "test_output");
        // testOp(browser, "Encode text", "test input", "test_output");
        // testOp(browser, "Enigma", "test input", "test_output");
        testOpHtml(browser, "熵", "test input", "", /香农熵： 2.8464393446710154/);
    // testOp(browser, "Escape string", "test input", "test_output");
        // testOp(browser, "Escape Unicode Characters", "test input", "test_output");
        // testOp(browser, "Expand alphabet range", "test input", "test_output");
        // testOp(browser, "Extract dates", "test input", "test_output");
        // testOp(browser, "Extract domains", "test input", "test_output");
    // testOp(browser, "Extract EXIF", "test input", "test_output");
        // testOp(browser, "Extract email addresses", "test input", "test_output");
        // testOp(browser, "Extract file paths", "test input", "test_output");
        testOpFile(browser, "提取文件", "files/Hitchhikers_Guide.jpeg", ".card:last-child .collapsed", "extracted_at_0x3d38.zlib");
        // This test seems unreliable on GitHub Actions, not reproducible locally.
        // testOpFile(browser, "提取ID3", "files/mp3example.mp3", "tr:last-child td:last-child", "Kevin MacLeod");        // testOp(browser, "Extract IP addresses", "test input", "test_output");
        // testOp(browser, "Extract LSB", "test input", "test_output");
        // testOp(browser, "Extract MAC addresses", "test input", "test_output");
        // testOp(browser, "Extract RGBA", "test input", "test_output");
        // testOp(browser, "Extract URLs", "test input", "test_output");
        // testOp(browser, "Filter", "test input", "test_output");
        // testOp(browser, "Find / Replace", "test input", "test_output");
        // testOp(browser, "Fletcher-16校验和", "test input", "test_output");
        // testOp(browser, "Fletcher-32校验和", "test input", "test_output");
        // testOp(browser, "Fletcher-64校验和", "test input", "test_output");
        // testOp(browser, "Fletcher-8校验和", "test input", "test_output");
        testOpImage(browser, "图像翻转", "files/Hitchhikers_Guide.jpeg");
        // testOp(browser, "Fork", "test input", "test_output");
        // testOp(browser, "Format MAC addresses", "test input", "test_output");
        testOpHtml(browser, "频率分布", "test input", "", /未展示的字节数： 248/);
        // testOp(browser, "From BCD", "test input", "test_output");
    // testOp(browser, "From Base", "test input", "test_output");
        // testOp(browser, "From Base32", "test input", "test_output");
        // testOp(browser, "From Base58", "test input", "test_output");
        // testOp(browser, "From Base62", "test input", "test_output");
        // testOp(browser, "From Base64", "test input", "test_output");
        // testOp(browser, "From Base85", "test input", "test_output");
        // testOp(browser, "From Binary", "test input", "test_output");
        // testOp(browser, "From Braille", "test input", "test_output");
        // testOp(browser, "From Case Insensitive Regex", "test input", "test_output");
        // testOp(browser, "From Charcode", "test input", "test_output");
        // testOp(browser, "From Decimal", "test input", "test_output");
        // testOp(browser, "From HTML Entity", "test input", "test_output");
        // testOp(browser, "十六进制转字符", "test input", "test_output");
        // testOp(browser, "From Hex Content", "test input", "test_output");
        // testOp(browser, "From Hexdump", "test input", "test_output");
    // testOp(browser, "From MessagePack", "test input", "test_output");
        // testOp(browser, "From Morse Code", "test input", "test_output");
        // testOp(browser, "From Octal", "test input", "test_output");
        // testOp(browser, "From Punycode", "test input", "test_output");
        // testOp(browser, "From Quoted Printable", "test input", "test_output");
    // testOp(browser, "From UNIX Timestamp", "test input", "test_output");
        testOpHtml(browser, "模糊匹配", "test input", "b:last-child", "in", ["tein", 15, 30, 30, 15, -5, -15, -1]);
        // testOp(browser, "GOST hash", "test input", "test_output");
        // testOp(browser, "Generate all hashes", "test input", "test_output");
    // testOp(browser, "Generate HOTP", "test input", "test_output");
        testOpHtml(browser, "生成图像", "test input", "img", "");
        // testOp(browser, "Generate Lorem Ipsum", "test input", "test_output");
        // testOp(browser, "Generate PGP Key Pair", "test input", "test_output");
        testOpHtml(browser, "生成二维码", "test input", "img", "");
    // testOp(browser, "Generate TOTP", "test input", "test_output");
        // testOp(browser, "Generate UUID", "test input", "test_output");
        // testOp(browser, "Generic Code Beautify", "test input", "test_output");
        // testOp(browser, "Group IP addresses", "test input", "test_output");
    // testOp(browser, "Gunzip", "test input", "test_output");
    // testOp(browser, "Gzip", "test input", "test_output");
        // testOp(browser, "HAS-160", "test input", "test_output");
        // testOp(browser, "HMAC", "test input", "test_output");
        // testOp(browser, "HTML To Text", "test input", "test_output");
        // testOp(browser, "HTTP request", "test input", "test_output");
        // testOp(browser, "Hamming Distance", "test input", "test_output");
        // testOp(browser, "Haversine distance", "test input", "test_output");
        // testOp(browser, "Head", "test input", "test_output");
        testOpHtml(browser, "热图", "X Y\n0 1\n1 2", "svg", /X/);
        testOpHtml(browser, "六边形密度图", "X Y\n0 1\n1 2", "svg", /X/);
        // testOp(browser, "Hex to Object Identifier", "test input", "test_output");
        // testOp(browser, "Hex to PEM", "test input", "test_output");
        testOpImage(browser, "图像亮度/对比度", "files/Hitchhikers_Guide.jpeg");
        testOpImage(browser, "图像滤镜", "files/Hitchhikers_Guide.jpeg");
        testOpImage(browser, "图像色调/饱和度/明度", "files/Hitchhikers_Guide.jpeg");
        testOpImage(browser, "图像透明度", "files/Hitchhikers_Guide.jpeg");
        testOpHtml(browser, "重合因子", "test input", "", /重合因子： 0.08333333333333333/);
        testOpImage(browser, "图像反色", "files/Hitchhikers_Guide.jpeg");
    // testOp(browser, "JPath expression", "test input", "test_output");
        testOpHtml(browser, "JSON美化", "{a:1}", ".json-dict .json-literal", "1");
        // testOp(browser, "JSON Minify", "test input", "test_output");
    // testOp(browser, "JSON to CSV", "test input", "test_output");
    // testOp(browser, "JWT Decode", "test input", "test_output");
    // testOp(browser, "JWT Sign", "test input", "test_output");
    // testOp(browser, "JWT Verify", "test input", "test_output");
    // testOp(browser, "JavaScript Beautify", "test input", "test_output");
    // testOp(browser, "JavaScript Minify", "test input", "test_output");
    // testOp(browser, "JavaScript Parser", "test input", "test_output");
        // testOp(browser, "Jump", "test input", "test_output");
    // testOp(browser, "Keccak", "test input", "test_output");
        // testOp(browser, "Label", "test input", "test_output");
    // testOp(browser, "LM Hash", "test input", "test output");
        // testOp(browser, "Lorenz", "test input", "test_output");
        // testOp(browser, "Luhn校验和", "test input", "test_output");
    // testOp(browser, "LZ String", "test input", "test output");
    // testOp(browser, "LZ4 Compress", "test input", "test output");
    // testOp(browser, "LZ4 Decompress", "test input", "test output");
    // testOp(browser, "LZMA Compress", "test input", "test output");
    // testOp(browser, "LZMA Decompress", "test input", "test output");
    // testOp(browser, "MD2", "test input", "test_output");
    // testOp(browser, "MD4", "test input", "test_output");
    // testOp(browser, "MD5", "test input", "test_output");
    // testOp(browser, "MD6", "test input", "test_output");
        testOpHtml(browser, "Magic", "dGVzdF9vdXRwdXQ=", "tr:nth-of-type(1) th:nth-of-type(2)", "结果摘要");
        testOpHtml(browser, "Magic", "dGVzdF9vdXRwdXQ=", "tr:nth-of-type(2) td:nth-of-type(2)", "test_output");
        testOpHtml(browser, "Magic", "dGVzdF9vdXRwdXQ=", "tr:nth-of-type(2) td:nth-of-type(1)", /Base64/);
        // testOp(browser, "Mean", "test input", "test_output");
        // testOp(browser, "Median", "test input", "test_output");`
        // testOp(browser, "Merge", "test input", "test_output");`
        // testOp(browser, "Microsoft Script Decoder", "test input", "test_output");
        // testOp(browser, "Multiple Bombe", "test input", "test_output");
        // testOp(browser, "Multiply", "test input", "test_output");
        // testOp(browser, "NOT", "test input", "test_output");
        // testOp(browser, "Normalise Image", "test input", "test_output");
    // testOp(browser, "Normalise Unicode", "test input", "test_output");
        // testOp(browser, "Numberwang", "test input", "test_output");
        // testOp(browser, "OR", "test input", "test_output");
        // testOp(browser, "Object Identifier to Hex", "test input", "test_output");
        testOpHtml(browser, "偏移检测", "test input\n\nbest input", ".hl5", "est input");
    // testOp(browser, "Optical Character Recognition", "test input", "test_output");
        // testOp(browser, "PEM to Hex", "test input", "test_output");
    // testOp(browser, "PGP Decrypt", "test input", "test_output");
    // testOp(browser, "PGP Decrypt and Verify", "test input", "test_output");
    // testOp(browser, "PGP Encrypt", "test input", "test_output");
    // testOp(browser, "PGP Encrypt and Sign", "test input", "test_output");
    // testOp(browser, "PGP Verify", "test input", "test_output");
        // testOp(browser, "PHP Deserialize", "test input", "test_output");
        // testOp(browser, "Pad lines", "test input", "test_output");
    // testOp(browser, "Parse ASN.1 hex string", "test input", "test_output");
        testOpHtml(browser, "解析颜色代码", "#000", ".colorpicker-preview", "rgb(0, 0, 0)");
        testOpHtml(browser, "解析DateTime", "01/12/2000 13:00:00", "", /日期： Friday 1st December 2000/);
        // testOp(browser, "Parse IP range", "test input", "test_output");
        testOpHtml(browser, "解析IPv4首部", "45 c0 00 c4 02 89 00 00 ff 11　1e 8c c0 a8 0c 01 c0 a8 0c 02", "tr:last-child td:last-child", "192.168.12.2");
        // testOp(browser, "Parse IPv6 address", "test input", "test_output");
    // testOp(browser, "Parse ObjectID timestamp", "test input", "test_output");
    // testOp(browser, "Parse QR Code", "test input", "test_output");
        // testOp(browser, "Parse SSH Host Key", "test input", "test_output");
        testOpHtml(browser, "解析TCP", "c2eb0050a138132e70dc9fb9501804025ea70000", "tr:nth-of-type(2) td:last-child", "49899");
        // testOp(browser, "Parse TLV", "test input", "test_output");
        testOpHtml(browser, "解析UDP", "04 89 00 35 00 2c 01 01", "tr:last-child td:last-child", "0x0101");
        // testOp(browser, "Parse UNIX file permissions", "test input", "test_output");
        // testOp(browser, "Parse URI", "test input", "test_output");
    // testOp(browser, "Parse User Agent", "test input", "test_output");
        // testOp(browser, "Parse X.509 certificate", "test input", "test_output");
        testOpFile(browser, "播放媒体文件", "files/mp3example.mp3", "audio", "");
        // testOp(browser, "Power Set", "test input", "test_output");
    // testOp(browser, "Protobuf Decode", "test input", "test_output");
        // testOp(browser, "Pseudo-Random Number Generator", "test input", "test_output");
    // testOp(browser, "RC2 Decrypt", "test input", "test_output");
    // testOp(browser, "RC2 Encrypt", "test input", "test_output");
    // testOp(browser, "RC4", "test input", "test_output");
    // testOp(browser, "RC4 Drop", "test input", "test_output");
        // testOp(browser, "RIPEMD", "test input", "test_output");
        // testOp(browser, "ROT13", "test input", "test_output");
        // testOp(browser, "ROT47", "test input", "test_output");
        // testOp(browser, "ROT8000", "test input", "test_output");
        // testOp(browser, "Rail Fence Cipher Decode", "test input", "test_output");
        // testOp(browser, "Rail Fence Cipher Encode", "test input", "test_output");
        testOpImage(browser, "色板随机化", "files/Hitchhikers_Guide.jpeg");
    // testOp(browser, "Raw Deflate", "test input", "test_output");
    // testOp(browser, "Raw Inflate", "test input", "test_output");
        // testOp(browser, "Register", "test input", "test_output");
        testOpHtml(browser, "正则表达式", "The cat sat on the mat", ".hl2:last-child", "mat", ["自定义", ".at", true, true, false, false, false, false, "高亮匹配"]);
        // testOp(browser, "Remove Diacritics", "test input", "test_output");
        // testOp(browser, "Remove EXIF", "test input", "test_output");
        // testOp(browser, "Remove line numbers", "test input", "test_output");
        // testOp(browser, "Remove null bytes", "test input", "test_output");
        // testOp(browser, "Remove whitespace", "test input", "test_output");
        testOpImage(browser, "渲染图像", "files/Hitchhikers_Guide.jpeg");
        testOpHtml(browser, "渲染Markdown", "# test input", "h1", "test input");
        testOpImage(browser, "图像尺寸修改", "files/Hitchhikers_Guide.jpeg");
        // testOp(browser, "Return", "test input", "test_output");
        // testOp(browser, "Reverse", "test input", "test_output");
        testOpImage(browser, "旋转图像", "files/Hitchhikers_Guide.jpeg");
        // testOp(browser, "Rotate left", "test input", "test_output");
        // testOp(browser, "Rotate right", "test input", "test_output");
    // testOp(browser, "Scrypt", "test input", "test output");
    // testOp(browser, "SHA0", "test input", "test_output");
    // testOp(browser, "SHA1", "test input", "test_output");
    // testOp(browser, "SHA2", "test input", "test_output");
    // testOp(browser, "SHA3", "test input", "test_output");
        // testOp(browser, "SQL Beautify", "test input", "test_output");
        // testOp(browser, "SQL Minify", "test input", "test_output");
    // testOp(browser, "SSDEEP", "test input", "test_output");
        // testOp(browser, "SUB", "test input", "test_output");
        // testOp(browser, "Scan for Embedded Files", "test input", "test_output");
        testOpHtml(browser, "散点图", "a b\n1 2", "svg", /a/);
        // testOp(browser, "Scrypt", "test input", "test_output");
        testOpHtml(browser, "折线图", "1 2 3\n4 5 6", "svg", /3/);
        // testOp(browser, "Set Difference", "test input", "test_output");
        // testOp(browser, "Set Intersection", "test input", "test_output");
        // testOp(browser, "Set Union", "test input", "test_output");
    // testOp(browser, "Shake", "test input", "test_output");
        testOpImage(browser, "锐化图像", "files/Hitchhikers_Guide.jpeg");
        testOpHtml(browser, "显示Base64偏移形式", "test input", "span:nth-last-of-type(2)", "B");
        testOpHtml(browser, "在地图上显示", "51.5007° N, 0.1246° W", "#presentedMap .leaflet-popup-content", "51.5007,-0.1246");
        // testOp(browser, "Sleep", "test input", "test_output");
    // testOp(browser, "SM3", "test input", "test output");
        // testOp(browser, "Snefru", "test input", "test_output");
        // testOp(browser, "Sort", "test input", "test_output");
        // testOp(browser, "Split", "test input", "test_output");
        // testOpImage(browser, "Split Colour Channels", "files/Hitchhikers_Guide.jpeg");
        // testOp(browser, "Standard Deviation", "test input", "test_output");
        // testOp(browser, "Streebog", "test input", "test_output");
        // testOp(browser, "Strings", "test input", "test_output");
        // testOp(browser, "Strip HTML tags", "test input", "test_output");
        // testOp(browser, "Strip HTTP headers", "test input", "test_output");
        // testOp(browser, "Subsection", "test input", "test_output");
        // testOp(browser, "Substitute", "test input", "test_output");
        // testOp(browser, "Subtract", "test input", "test_output");
    // testOp(browser, "Sum", "test input", "test_output");
        // testOp(browser, "Swap endianness", "test input", "test_output");
        // testOp(browser, "Symmetric Difference", "test input", "test_output");
        testOpHtml(browser, "语法高亮", "var a = [4,5,6]", ".hljs-selector-attr", "[4,5,6]");
        // testOp(browser, "TCP/IP校验和", "test input", "test_output");
        // testOp(browser, "Tail", "test input", "test_output");
        // testOp(browser, "Take bytes", "test input", "test_output");
        testOp(browser, "Tar", "test input", /^file\.txt\x00{92}/);
        testOpHtml(browser, "文本编码暴力破解", "test input", "tr:nth-of-type(4) td:last-child", /t\u2400e\u2400s\u2400t\u2400/);
        // testOp(browser, "To BCD", "test input", "test_output");
        // testOp(browser, "To Base", "test input", "test_output");
        // testOp(browser, "To Base32", "test input", "test_output");
        // testOp(browser, "To Base58", "test input", "test_output");
        // testOp(browser, "To Base62", "test input", "test_output");
        // testOp(browser, "Base64编码", "test input", "test_output");
        // testOp(browser, "To Base85", "test input", "test_output");
        // testOp(browser, "To Binary", "test input", "test_output");
        // testOp(browser, "To Braille", "test input", "test_output");
    // testOp(browser, "To Camel case", "test input", "test_output");
        // testOp(browser, "To Case Insensitive Regex", "test input", "test_output");
        // testOp(browser, "To Charcode", "test input", "test_output");
        // testOp(browser, "To Decimal", "test input", "test_output");
        // testOp(browser, "To HTML Entity", "test input", "test_output");
        // testOp(browser, "字符转十六进制", "test input", "test_output");
        // testOp(browser, "To Hex Content", "test input", "test_output");
        // testOp(browser, "To Hexdump", "test input", "test_output");
    // testOp(browser, "To Kebab case", "test input", "test_output");
        // testOp(browser, "To Lower case", "test input", "test_output");
    // testOp(browser, "To MessagePack", "test input", "test_output");
        // testOp(browser, "To Morse Code", "test input", "test_output");
        // testOp(browser, "To Octal", "test input", "test_output");
        // testOp(browser, "To Punycode", "test input", "test_output");
        // testOp(browser, "To Quoted Printable", "test input", "test_output");
    // testOp(browser, "To Snake case", "test input", "test_output");
        testOpHtml(browser, "转换为表格", "a,b,c\n1,2,3", "", /| a | b | c |/);
        // testOp(browser, "To UNIX Timestamp", "test input", "test_output");
        // testOp(browser, "To Upper case", "test input", "test_output");
        // testOp(browser, "Translate DateTime Format", "test input", "test_output");
        // testOp(browser, "Triple DES Decrypt", "test input", "test_output");
        // testOp(browser, "Triple DES Encrypt", "test input", "test_output");
        // testOp(browser, "Typex", "test input", "test_output");
        // testOp(browser, "UNIX Timestamp to Windows Filetime", "test input", "test_output");
        // testOp(browser, "URL Decode", "test input", "test_output");
        // testOp(browser, "URL Encode", "test input", "test_output");
        // testOp(browser, "Unescape string", "test input", "test_output");
        // testOp(browser, "Unescape Unicode Characters", "test input", "test_output");
        // testOp(browser, "Unique", "test input", "test_output");
        testOpHtml(browser, ["Tar", "Untar"], "test input", ".float-right", /10 bytes/);
        testOpHtml(browser, ["Zip", "Unzip"], "test input", "#files span.float-right", /10 bytes/);
        // testOp(browser, "VarInt Decode", "test input", "test_output");
        // testOp(browser, "VarInt Encode", "test input", "test_output");
        testOpImage(browser, "查看位平面", "files/Hitchhikers_Guide.jpeg");
        // testOp(browser, "Vigenère Decode", "test input", "test_output");
        // testOp(browser, "Vigenère Encode", "test input", "test_output");
        testOp(browser, "Whirlpool", "test input", "8a0ee6885ba241353d17cbbe5f06538a7f04c8c955d376c20d6233fd4dd41aaffd13291447090ce781b5f940da266ed6d02cf8b79d4867065d10bdfc04166f38");
        // testOp(browser, "Windows Filetime to UNIX Timestamp", "test input", "test_output");
        testOp(browser, "XKCD Random Number", "test input", "4");
    // testOp(browser, "XML Beautify", "test input", "test_output");
    // testOp(browser, "XML Minify", "test input", "test_output");
        // testOp(browser, "XOR", "test input", "test_output");
        // testOp(browser, "XOR Brute Force", "test input", "test_output");
    // testOp(browser, "XPath expression", "test input", "test_output");
    // testOp(browser, "YARA Rules", "test input", "test_output");
        testOp(browser, "Zip", "test input", /^PK\u0003\u0004\u0014\u0000{3}/);
        // testOp(browser, "Zlib Deflate", "test input", "test_output");
        // testOp(browser, "Zlib Inflate", "test input", "test_output");
    },


    after: browser => {
        browser.end();
    }
};


/** @function
 * Clears the current recipe and bakes a new operation.
 *
 * @param {Browser} browser - Nightwatch client
 * @param {string|Array<string>} opName - name of operation to be tested, array for multiple ops
 * @param {string} input - input text for test
 * @param {Array<string>|Array<Array<string>>} args - arguments, nested if multiple ops
 */
function bakeOp(browser, opName, input, args=[]) {
    browser.perform(function() {
        console.log(`Current test: ${opName}`);
    });
    utils.loadRecipe(browser, opName, input, args);
    browser.waitForElementVisible("#stale-indicator", 5000);
    utils.bake(browser);
}

/** @function
 * Clears the current recipe and tests a new operation.
 *
 * @param {Browser} browser - Nightwatch client
 * @param {string|Array<string>} opName - name of operation to be tested, array for multiple ops
 * @param {string} input - input text
 * @param {string} output - expected output
 * @param {Array<string>|Array<Array<string>>} args - arguments, nested if multiple ops
 */
function testOp(browser, opName, input, output, args=[]) {
    bakeOp(browser, opName, input, args);
    utils.expectOutput(browser, output);
}

/** @function
 * Clears the current recipe and tests a new operation with HTML output.
 *
 * @param {Browser} browser - Nightwatch client
 * @param {string|Array<string>} opName - name of operation to be tested array for multiple ops
 * @param {string} input - input text
 * @param {string} cssSelector - CSS selector for HTML output
 * @param {string} output - expected output
 * @param {Array<string>|Array<Array<string>>} args - arguments, nested if multiple ops
 */
function testOpHtml(browser, opName, input, cssSelector, output, args=[]) {
    bakeOp(browser, opName, input, args);

    if (typeof output === "string") {
        browser.expect.element("#output-html " + cssSelector).text.that.equals(output);
    } else if (output instanceof RegExp) {
        browser.expect.element("#output-html " + cssSelector).text.that.matches(output);
    }
}

/** @function
 * Clears the current recipe and tests a new Image-based operation.
 *
 * @param {Browser} browser - Nightwatch client
 * @param {string|Array<string>} opName - name of operation to be tested array for multiple ops
 * @param {string} filename - filename of image file from samples directory
 * @param {Array<string>|Array<Array<string>>} args - arguments, nested if multiple ops
 */
function testOpImage(browser, opName, filename, args) {
    browser.perform(function() {
        console.log(`Current test: ${opName}`);
    });
    utils.loadRecipe(browser, opName, "", args);
    utils.uploadFile(browser, filename);
    browser.waitForElementVisible("#stale-indicator", 5000);
    utils.bake(browser);

    browser
        .waitForElementVisible("#output-html img")
        .expect.element("#output-html img").to.have.css("width").which.matches(/^[^0]\d*px/);
}

/** @function
 * Clears the current recipe and tests a new File-based operation.
 *
 * @param {Browser} browser - Nightwatch client
 * @param {string|Array<string>} opName - name of operation to be tested array for multiple ops
 * @param {string} filename - filename of file from samples directory
 * @param {string} cssSelector - CSS selector for HTML output
 * @param {string} output - expected output
 * @param {Array<string>|Array<Array<string>>} args - arguments, nested if multiple ops
 */
function testOpFile(browser, opName, filename, cssSelector, output, args) {
    browser.perform(function() {
        console.log(`Current test: ${opName}`);
    });
    utils.loadRecipe(browser, opName, "", args);
    utils.uploadFile(browser, filename);
    browser.pause(100).waitForElementVisible("#stale-indicator", 5000);
    utils.bake(browser);

    if (typeof output === "string") {
        browser.expect.element("#output-html " + cssSelector).text.that.equals(output);
    } else if (output instanceof RegExp) {
        browser.expect.element("#output-html " + cssSelector).text.that.matches(output);
    }
}
