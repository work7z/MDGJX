/**
 * YARA Rules tests.
 *
 * @author Matt C [matt@artemisbot.uk]
 *
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

const CONSOLE_COMPILE_WARNING_RULE = `import "console"
rule a
{
  strings:
    $s=" "
  condition:
    $s and console.log("log rule a")
}
rule b
{
  strings:
    $s=" "
  condition:
    $s and console.hex("log rule b: int8(0)=", int8(0))
}`;

TestRegister.addTests([
    {
        name: "YARA Match: simple foobar",
        input: "foobar foobar bar foo foobar",
        expectedOutput: "规则 \"foo\" 匹配 (4 次):\n位置 0, 长度 3, 标识符 $re1, 数据: \"foo\"\n位置 7, 长度 3, 标识符 $re1, 数据: \"foo\"\n位置 18, 长度 3, 标识符 $re1, 数据: \"foo\"\n位置 22, 长度 3, 标识符 $re1, 数据: \"foo\"\n规则 \"bar\" 匹配 (4 次):\n位置 3, 长度 3, 标识符 $re1, 数据: \"bar\"\n位置 10, 长度 3, 标识符 $re1, 数据: \"bar\"\n位置 14, 长度 3, 标识符 $re1, 数据: \"bar\"\n位置 25, 长度 3, 标识符 $re1, 数据: \"bar\"\n",
        recipeConfig: [
            {
                "op": "YARA规则",
                "args": ["rule foo {strings: $re1 = /foo/ condition: $re1} rule bar {strings: $re1 = /bar/ condition: $re1}", true, true, true, true],
            }
        ],
    },
    {
        name: "YARA Match: hashing rules",
        input: "Hello World!",
        expectedOutput: "输入匹配规则 \"HelloWorldMD5\".\n输入匹配规则 \"HelloWorldSHA256\".\n",
        recipeConfig: [
            {
                "op": "YARA规则",
                "args": [
                    `import "hash"
                    rule HelloWorldMD5 {
                        condition:
                            hash.md5(0,filesize) == "ed076287532e86365e841e92bfc50d8c"
                    }

                    rule HelloWorldSHA256 {
                        condition:
                            hash.sha256(0,filesize) == "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
                    }`,
                    true, true, true, true, false, false
                ],
            }
        ],
    },
    {
        name: "YARA Match: compile warnings",
        input: "CyberChef Yara",
        expectedOutput: "行 5 警告： string \"$s\" may slow down scanning\n" +
            "行 12 警告： string \"$s\" may slow down scanning\n" +
            "输入匹配规则 \"a\".\n" +
            "输入匹配规则 \"b\".\n",
        recipeConfig: [
            {
                "op": "YARA规则",
                "args": [CONSOLE_COMPILE_WARNING_RULE, false, false, false, false, true, false],
            }
        ],
    },
    {
        name: "YARA Match: console messages",
        input: "CyberChef Yara",
        expectedOutput: "log rule a\n" +
            "log rule b: int8(0)=0x43\n" +
            "输入匹配规则 \"a\".\n" +
            "输入匹配规则 \"b\".\n",
        recipeConfig: [
            {
                "op": "YARA规则",
                "args": [CONSOLE_COMPILE_WARNING_RULE, false, false, false, false, false, true],
            }
        ],
    },
]);

