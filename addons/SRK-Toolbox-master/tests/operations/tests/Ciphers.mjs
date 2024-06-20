/**
 * Cipher tests.
 *
 * @author Matt C [matt@artemisbot.uk]
 * @author n1474335 [n1474335@gmail.com]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";


TestRegister.addTests([
    {
        name: "Affine Encode: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "仿射密码加密",
                args: [1, 0]
            }
        ],
    },
    {
        name: "Affine Encode: invalid a & b (non-integer)",
        input: "some keys are shaped as locks. index[me]",
        expectedOutput: "The values of a and b can only be integers.",
        recipeConfig: [
            {
                op: "仿射密码加密",
                args: [0.1, 0.00001]
            }
        ],
    },
    {
        name: "Affine Encode: no effect",
        input: "some keys are shaped as locks. index[me]",
        expectedOutput: "some keys are shaped as locks. index[me]",
        recipeConfig: [
            {
                op: "仿射密码加密",
                args: [1, 0]
            }
        ],
    },
    {
        name: "Affine Encode: normal",
        input: "some keys are shaped as locks. index[me]",
        expectedOutput: "vhnl tldv xyl vcxelo xv qhrtv. zkolg[nl]",
        recipeConfig: [
            {
                op: "仿射密码加密",
                args: [23, 23]
            }
        ],
    },
    {
        name: "Affine Decode: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "仿射密码解密",
                args: [1, 0]
            }
        ],
    },
    {
        name: "Affine Decode: invalid a & b (non-integer)",
        input: "vhnl tldv xyl vcxelo xv qhrtv. zkolg[nl]",
        expectedOutput: "a和b必须为整数",
        recipeConfig: [
            {
                op: "仿射密码解密",
                args: [0.1, 0.00001]
            }
        ],
    },
    {
        name: "Affine Decode: invalid a (coprime)",
        input: "vhnl tldv xyl vcxelo xv qhrtv. zkolg[nl]",
        expectedOutput: "`a`必须和26互质",
        recipeConfig: [
            {
                op: "仿射密码解密",
                args: [8, 23]
            }
        ],
    },
    {
        name: "Affine Decode: no effect",
        input: "vhnl tldv xyl vcxelo xv qhrtv. zkolg[nl]",
        expectedOutput: "vhnl tldv xyl vcxelo xv qhrtv. zkolg[nl]",
        recipeConfig: [
            {
                op: "仿射密码解密",
                args: [1, 0]
            }
        ],
    },
    {
        name: "Affine Decode: normal",
        input: "vhnl tldv xyl vcxelo xv qhrtv. zkolg[nl]",
        expectedOutput: "some keys are shaped as locks. index[me]",
        recipeConfig: [
            {
                op: "仿射密码解密",
                args: [23, 23]
            }
        ],
    },
    {
        name: "A1Z26 Encode: normal",
        input: "This is the test sentence.",
        expectedOutput: "20 8 9 19 9 19 20 8 5 20 5 19 20 19 5 14 20 5 14 3 5",
        recipeConfig: [
            {
                op: "A1Z26密码加密",
                args: ["空格"]
            }
        ],
    },
    {
        name: "A1Z26 Decode: normal",
        input: "20 8 9 19 9 19 20 8 5 20 5 19 20 19 5 14 20 5 14 3 5",
        expectedOutput: "thisisthetestsentence",
        recipeConfig: [
            {
                op: "A1Z26密码解密",
                args: ["空格"]
            }
        ],
    },
    {
        name: "A1Z26 Decode: error",
        input: "20 8 9 27",
        expectedOutput: "错误：数字必须在1到26之间。",
        recipeConfig: [
            {
                op: "A1Z26密码解密",
                args: ["空格"]
            }
        ],
    },
    {
        name: "Atbash: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "阿特巴希密码",
                args: []
            }
        ],
    },
    {
        name: "Atbash: normal",
        input: "old slow slim horn",
        expectedOutput: "low hold horn slim",
        recipeConfig: [
            {
                op: "阿特巴希密码",
                args: []
            }
        ],
    },
    {
        name: "Bifid Cipher Encode: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "双密码加密",
                "args": ["nothing"]
            }
        ],
    },
    {
        name: "Bifid Cipher Encode: no key",
        input: "We recreate conditions similar to the Van-Allen radiation belt in our secure facilities.",
        expectedOutput: "Vq daqcliho rmltofvlnc qbdhlcr nt qdq Fbm-Rdkkm vuoottnoi aitp al axf tdtmvt owppkaodtx.",
        recipeConfig: [
            {
                "op": "双密码加密",
                "args": [""]
            }
        ],
    },
    {
        name: "Bifid Cipher Encode: invalid key (non-alphabetic)",
        input: "We recreate conditions similar to the Van-Allen radiation belt in our secure facilities.",
        expectedOutput: "Key只能包含英文字母",
        recipeConfig: [
            {
                "op": "双密码加密",
                "args": ["abc123"]
            }
        ],
    },
    {
        name: "Bifid Cipher Encode: normal",
        input: "We recreate conditions similar to the Van-Allen radiation belt in our secure facilities.",
        expectedOutput: "Wc snpsigdd cpfrrcxnfi hikdnnp dm crc Fcb-Pdeug vueageacc vtyl sa zxm crebzp lyoeuaiwpv.",
        recipeConfig: [
            {
                "op": "双密码加密",
                "args": ["Schrodinger"]
            }
        ],
    },
    {
        name: "Bifid Cipher Decode: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "双密码解密",
                "args": ["nothing"]
            }
        ],
    },
    {
        name: "Bifid Cipher Decode: no key",
        input: "Vq daqcliho rmltofvlnc qbdhlcr nt qdq Fbm-Rdkkm vuoottnoi aitp al axf tdtmvt owppkaodtx.",
        expectedOutput: "We recreate conditions similar to the Van-Allen radiation belt in our secure facilities.",
        recipeConfig: [
            {
                "op": "双密码解密",
                "args": [""]
            }
        ],
    },
    {
        name: "Bifid Cipher Decode: invalid key (non-alphabetic)",
        input: "Vq daqcliho rmltofvlnc qbdhlcr nt qdq Fbm-Rdkkm vuoottnoi aitp al axf tdtmvt owppkaodtx.",
        expectedOutput: "Key只能包含英文字母",
        recipeConfig: [
            {
                "op": "双密码解密",
                "args": ["abc123"]
            }
        ],
    },
    {
        name: "Bifid Cipher Decode: normal",
        input: "Wc snpsigdd cpfrrcxnfi hikdnnp dm crc Fcb-Pdeug vueageacc vtyl sa zxm crebzp lyoeuaiwpv.",
        expectedOutput: "We recreate conditions similar to the Van-Allen radiation belt in our secure facilities.",
        recipeConfig: [
            {
                "op": "双密码解密",
                "args": ["Schrodinger"]
            }
        ],
    },
    {
        name: "Citrix CTX1编码",
        input: "Password1",
        expectedOutput: "PFFAJEDBOHECJEDBODEGIMCJPOFLJKDPKLAO",
        recipeConfig: [
            {
                "op": "Citrix CTX1编码",
                "args": []
            }
        ],
    },
    {
        name: "Citrix CTX1 Decode: normal",
        input: "PFFAJEDBOHECJEDBODEGIMCJPOFLJKDPKLAO",
        expectedOutput: "Password1",
        recipeConfig: [
            {
                "op": "Citrix CTX1解码",
                "args": []
            }
        ],
    },
    {
        name: "Citrix CTX1 Decode: invalid length",
        input: "PFFAJEDBOHECJEDBODEGIMCJPOFLJKDPKLA",
        expectedOutput: "哈希长度错误",
        recipeConfig: [
            {
                "op": "Citrix CTX1解码",
                "args": []
            }
        ],
    },
    {
        name: "Vigenère Encode: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "维吉尼亚密码加密",
                "args": ["nothing"]
            }
        ],
    },
    {
        name: "Vigenère Encode: no key",
        input: "LUGGAGEBASEMENTVARENNESALLIESCANBECLOTHEDASENEMIESENEMIESCANBECLOTHEDASALLIESALWAYSUSEID",
        expectedOutput: "未输入Key",
        recipeConfig: [
            {
                "op": "维吉尼亚密码加密",
                "args": [""]
            }
        ],
    },
    {
        name: "Vigenère Encode: invalid key",
        input: "LUGGAGEBASEMENTVARENNESALLIESCANBECLOTHEDASENEMIESENEMIESCANBECLOTHEDASALLIESALWAYSUSEID",
        expectedOutput: "Key只能是字母",
        recipeConfig: [
            {
                "op": "维吉尼亚密码加密",
                "args": ["abc123"]
            }
        ],
    },
    {
        name: "Vigenère Encode: normal",
        input: "LUGGAGEBASEMENTVARENNESALLIESCANBECLOTHEDASENEMIESENEMIESCANBECLOTHEDASALLIESALWAYSUSEID",
        expectedOutput: "PXCGRJIEWSVPIQPVRUIQJEJDPOEEJFEQXETOSWDEUDWHJEDLIVANVPMHOCRQFHYLFWLHZAJDPOEEJDPZWYJXWHED",
        recipeConfig: [
            {
                "op": "维吉尼亚密码加密",
                "args": ["Edward"]
            }
        ],
    },
    {
        name: "Vigenère Decode: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "维吉尼亚密码解密",
                "args": ["nothing"]
            }
        ],
    },
    {
        name: "Vigenère Decode: no key",
        input: "PXCGRJIEWSVPIQPVRUIQJEJDPOEEJFEQXETOSWDEUDWHJEDLIVANVPMHOCRQFHYLFWLHZAJDPOEEJDPZWYJXWHED",
        expectedOutput: "未输入Key",
        recipeConfig: [
            {
                "op": "维吉尼亚密码解密",
                "args": [""]
            }
        ],
    },
    {
        name: "Vigenère Decode: invalid key",
        input: "PXCGRJIEWSVPIQPVRUIQJEJDPOEEJFEQXETOSWDEUDWHJEDLIVANVPMHOCRQFHYLFWLHZAJDPOEEJDPZWYJXWHED",
        expectedOutput: "Key只能是字母",
        recipeConfig: [
            {
                "op": "维吉尼亚密码解密",
                "args": ["abc123"]
            }
        ],
    },
    {
        name: "Vigenère Decode: normal",
        input: "PXCGRJIEWSVPIQPVRUIQJEJDPOEEJFEQXETOSWDEUDWHJEDLIVANVPMHOCRQFHYLFWLHZAJDPOEEJDPZWYJXWHED",
        expectedOutput: "LUGGAGEBASEMENTVARENNESALLIESCANBECLOTHEDASENEMIESENEMIESCANBECLOTHEDASALLIESALWAYSUSEID",
        recipeConfig: [
            {
                "op": "维吉尼亚密码解密",
                "args": ["Edward"]
            }
        ],
    },
    {
        name: "Substitute: no pt/ct",
        input: "flee at once. we are discovered!",
        expectedOutput: "flee at once. we are discovered!",
        recipeConfig: [
            {
                "op": "替换密码",
                "args": ["", ""]
            }
        ],
    },
    {
        name: "Substitute: no input",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "替换密码",
                "args": ["abcdefghijklmnopqrstuvwxyz", "zebrascdfghijklmnopqtuvwxy"]
            }
        ],
    },
    {
        name: "Substitute: uneven pt/ct",
        input: "flee at once. we are discovered!",
        expectedOutput: "警告：明文和密文长度不同\n\nsiaa zq lkba. va zoa rfpbluaoar!",
        recipeConfig: [
            {
                "op": "替换密码",
                "args": ["abcdefghijklmnopqrstuvwxyz", "zebrascdfghijklmnopqtuvwx"]
            }
        ],
    },
    {
        name: "Substitute: normal",
        input: "flee at once. we are discovered!",
        expectedOutput: "siaa zq lkba. va zoa rfpbluaoar!",
        recipeConfig: [
            {
                "op": "替换密码",
                "args": ["abcdefghijklmnopqrstuvwxyz", "zebrascdfghijklmnopqtuvwxy"]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Decode: normal",
        input: "Cytgah sTEAto rtn rsligcdsrporpyi H r fWiigo ovn oe",
        expectedOutput: "Cryptography is THE Art of Writing or solving codes",
        recipeConfig: [
            {
                "op": "篱笆密码解密",
                "args": [2, 0]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Decode: key has to be bigger than 2",
        input: "Cytgah sTEAto rtn rsligcdsrporpyi H r fWiigo ovn oe",
        expectedOutput: "篱笆数量不少于2",
        recipeConfig: [
            {
                "op": "篱笆密码解密",
                "args": [1, 0]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Decode: key has to be smaller than input's length",
        input: "shortinput",
        expectedOutput: "篱笆数量不能超过明文长度",
        recipeConfig: [
            {
                "op": "篱笆密码解密",
                "args": [22, 0]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Decode: offset should be positive",
        input: "shortinput",
        expectedOutput: "偏移量必须为正整数",
        recipeConfig: [
            {
                "op": "篱笆密码解密",
                "args": [2, -1]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Decode: Normal with Offset non-null",
        input: "51746026813793592840",
        expectedOutput: "12345678901234567890",
        recipeConfig: [
            {
                "op": "篱笆密码解密",
                "args": [4, 2]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Encode: normal",
        input: "Cryptography is THE Art of Writing or solving codes",
        expectedOutput: "Cytgah sTEAto rtn rsligcdsrporpyi H r fWiigo ovn oe",
        recipeConfig: [
            {
                "op": "篱笆密码加密",
                "args": [2, 0]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Encode: key has to be bigger than 2",
        input: "Cryptography is THE Art of Writing or solving codes",
        expectedOutput: "篱笆数量不能少于2",
        recipeConfig: [
            {
                "op": "篱笆密码加密",
                "args": [1, 0]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Encode: key has to be smaller than input's length",
        input: "shortinput",
        expectedOutput: "篱笆数量不能超过明文长度",
        recipeConfig: [
            {
                "op": "篱笆密码加密",
                "args": [22, 0]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Encode: offset should be positive",
        input: "shortinput",
        expectedOutput: "偏移量必须为正整数",
        recipeConfig: [
            {
                "op": "篱笆密码加密",
                "args": [2, -1]
            }
        ],
    },
    {
        name: "Rail Fence Cipher Encode: Normal with Offset non-null",
        input: "12345678901234567890",
        expectedOutput: "51746026813793592840",
        recipeConfig: [
            {
                "op": "篱笆密码加密",
                "args": [4, 2]
            }
        ],
    },
]);
