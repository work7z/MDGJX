/**
 * @author mikecat
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        "name": "Shuffle empty",
        "input": "",
        "expectedOutput": "",
        "recipeConfig": [
            {
                "op": "乱序",
                "args": ["逗号"]
            }
        ]
    },
    {
        "name": "Shuffle bytes",
        "input": "12345678",
        "expectedOutput": "31 32 33 34 35 36 37 38",
        "recipeConfig": [
            {
                "op": "乱序",
                "args": ["无"]
            },
            {
                "op": "字符转十六进制",
                "args": ["空格", 0]
            },
            {
                "op": "排序",
                "args": ["空格", false, "字母顺序（不区分大小写）"]
            }
        ]
    },
    {
        "name": "Shuffle lines",
        "input": "1\n2\n3\n4\n5\n6\n7\n8\n9\na\nb\nc\nd\ne\nf\n",
        "expectedOutput": "\n1\n2\n3\n4\n5\n6\n7\n8\n9\na\nb\nc\nd\ne\nf",
        "recipeConfig": [
            {
                "op": "乱序",
                "args": ["换行"]
            },
            {
                "op": "排序",
                "args": ["换行", false, "字母顺序（不区分大小写）"]
            }
        ]
    }
]);
