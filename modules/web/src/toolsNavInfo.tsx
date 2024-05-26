import { LoadModuleType } from "./systemModules"

export type SubToolItem = {
    name: string,
    isNew: boolean,
    path: string,
    id?: string,
    description: string,
    keywords: string[],
    icon?: {
        name?: string
    },
    redirectFrom?: string[],
    createdAt?: string
}
export type ToolNavInfoType = {
    name: string,
    id: string,
    defaultSubToolId?: string,
    bodyFnIfHave?: LoadModuleType,
    subTools?: SubToolItem[]
}
export const toolsNavInfo: ToolNavInfoType[] = [
    {
        name: 'JSON超级工具',
        id: 'json',
        defaultSubToolId: 'convert',
        bodyFnIfHave: () => import('./loadable/JSONSuperTools/index.tsx'),
        subTools: []
    },
    {
        name: "通用格式转换",
        id: 'converter',
        subTools: [
            {
                "isNew": false,
                "name": "日期时间转换器",
                "path": "/date-converter",
                "description": "将日期和时间转换为各种不同的格式",
                "keywords": [
                    "date",
                    "time",
                    "converter",
                    "iso",
                    "utc",
                    "timezone",
                    "year",
                    "month",
                    "day",
                    "minute",
                    "seconde"
                ],
                "icon": {
                    "name": "Calendar"
                }
            },
            {
                "isNew": false,
                "name": "整数基转换器",
                "path": "/base-converter",
                "description": "在不同的基数（十进制、十六进制、二进制、八进制、base64…）之间转换数字",
                "keywords": [
                    "integer",
                    "number",
                    "base",
                    "conversion",
                    "decimal",
                    "hexadecimal",
                    "binary",
                    "octal",
                    "base64"
                ],
                "icon": {
                    "name": "ArrowsLeftRight"
                }
            },
            {
                "isNew": false,
                "name": "罗马数字转换器",
                "path": "/roman-numeral-converter",
                "description": "将罗马数字转换为数字，并将数字转换为罗马数字。",
                "keywords": [
                    "roman",
                    "arabic",
                    "converter",
                    "X",
                    "I",
                    "V",
                    "L",
                    "C",
                    "D",
                    "M"
                ],
                "icon": {
                    "name": "LetterX"
                }
            },
            {
                "isNew": false,
                "name": "Base64 字符串编码/解码",
                "path": "/base64-string-converter",
                "description": "将字符串编码和解码为其 Base64 格式表示形式即可。",
                "keywords": [
                    "base64",
                    "converter",
                    "conversion",
                    "web",
                    "data",
                    "format",
                    "atob",
                    "btoa"
                ],
                "icon": {
                    "name": "FileDigit"
                },
                "redirectFrom": [
                    "/file-to-base64",
                    "/base64-converter"
                ]
            },
            {
                "isNew": false,
                "name": "Base64 文件转换器",
                "path": "/base64-file-converter",
                "description": "将字符串、文件或图像转换为其 Base64 表示形式。",
                "keywords": [
                    "base64",
                    "converter",
                    "upload",
                    "image",
                    "file",
                    "conversion",
                    "web",
                    "data",
                    "format"
                ],
                "icon": {
                    "name": "FileDigit"
                }
            },
            {
                "isNew": false,
                "name": "Color 选择器",
                "path": "/color-converter",
                "description": "在不同格式（十六进制、rgb、hsl和css名称）之间转换颜色",
                "keywords": [
                    "color",
                    "converter"
                ],
                "icon": {
                    "name": "Palette"
                },
                "redirectFrom": [
                    "/color-picker-converter"
                ]
            },
            {
                "isNew": false,
                "name": "大小写转换",
                "path": "/case-converter",
                "description": "更改字符串的大小写并在不同格式之间进行选择",
                "keywords": [
                    "case",
                    "converter",
                    "camelCase",
                    "capitalCase",
                    "constantCase",
                    "dotCase",
                    "headerCase",
                    "noCase",
                    "paramCase",
                    "pascalCase",
                    "pathCase",
                    "sentenceCase",
                    "snakeCase"
                ],
                "icon": {
                    "name": "LetterCaseToggle"
                }
            },
            {
                "isNew": false,
                "name": "文本转北约字母表",
                "path": "/text-to-nato-alphabet",
                "description": "将文本转换为北约拼音字母以进行口头传播。",
                "keywords": [
                    "string",
                    "nato",
                    "alphabet",
                    "phonetic",
                    "oral",
                    "transmission"
                ],
                "icon": {
                    "name": "Speakerphone"
                }
            },
            {
                "isNew": false,
                "name": "文本到 ASCII 二进制",
                "path": "/text-to-binary",
                "description": "将文本转换为其 ASCII 二进制表示形式，反之亦然。",
                "keywords": [
                    "text",
                    "to",
                    "binary",
                    "converter",
                    "encode",
                    "decode",
                    "ascii"
                ],
                "icon": {
                    "name": "Binary"
                },
                "createdAt": "2023-10-15T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "文本转 Unicode",
                "path": "/text-to-unicode",
                "description": "解析文本并将其转换为 unicode，反之亦然",
                "keywords": [
                    "text",
                    "to",
                    "unicode"
                ],
                "icon": {
                    "name": "TextWrap"
                },
                "createdAt": "2024-01-31T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "YAML到JSON转换器",
                "path": "/yaml-to-json-converter",
                "description": "使用此在线转换器将YAML转换为JSON。",
                "keywords": [
                    "yaml",
                    "to",
                    "json"
                ],
                "icon": {
                    "name": "AlignJustified"
                },
                "createdAt": "2023-04-10T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "YAML 到 TOML",
                "path": "/yaml-to-toml",
                "description": "解析YAML并将其转换为TOML。",
                "keywords": [
                    "yaml",
                    "to",
                    "toml",
                    "convert",
                    "transform"
                ],
                "icon": {
                    "name": "AlignJustified"
                },
                "createdAt": "2023-06-23T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "JSON到YAML转换器",
                "path": "/json-to-yaml-converter",
                "description": "在线转换将JSON转换为YAML。",
                "keywords": [
                    "yaml",
                    "to",
                    "json"
                ],
                "icon": {
                    "name": "Braces"
                },
                "createdAt": "2023-04-10T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "JSON 转 TOML",
                "path": "/json-to-toml",
                "description": "解析JSON并将其转换为TOML。",
                "keywords": [
                    "json",
                    "parse",
                    "toml",
                    "convert",
                    "transform"
                ],
                "icon": {
                    "name": "Braces"
                },
                "createdAt": "2023-06-23T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "List 转换器",
                "path": "/list-converter",
                "description": "该工具可以处理基于数组的数据，并将各种更改（转置、添加前缀和后缀、反向列表、排序列表、小写值、截断值）应用于每一行。",
                "keywords": [
                    "list",
                    "converter",
                    "sort",
                    "reverse",
                    "prefix",
                    "suffix",
                    "lowercase",
                    "truncate"
                ],
                "icon": {
                    "name": "List"
                },
                "createdAt": "2023-05-07T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "TOML 到 JSON",
                "path": "/toml-to-json",
                "description": "解析TOML并将其转换为JSON。",
                "keywords": [
                    "toml",
                    "json",
                    "convert",
                    "online",
                    "transform",
                    "parser"
                ],
                "icon": {
                    "name": "mdi-code-brackets"
                },
                "createdAt": "2023-06-23T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "TOML 到 YAML",
                "path": "/toml-to-yaml",
                "description": "Parse and convert TOML to YAML.",
                "keywords": [
                    "toml",
                    "yaml",
                    "convert",
                    "online",
                    "transform",
                    "parse"
                ],
                "icon": {
                    "name": "mdi-code-brackets"
                },
                "createdAt": "2023-06-23T00:00:00.000Z"
            }
        ]
    },
    {
        name: "网络安全工具",
        id: 'cyber',
        subTools: [
            {
                "isNew": false,
                "name": "Token 生成器",
                "path": "/token-generator",
                "description": "使用您想要的字符、大写或小写字母、数字和/或符号生成随机字符串。",
                "keywords": [
                    "token",
                    "random",
                    "string",
                    "alphanumeric",
                    "symbols",
                    "number",
                    "letters",
                    "lowercase",
                    "uppercase",
                    "password"
                ],
                "icon": {
                    "name": "ArrowsShuffle"
                }
            },
            {
                "isNew": false,
                "name": "Hash 文本",
                "path": "/hash-text",
                "description": "使用所需的函数哈希文本字符串：MD5、SHA1、SHA256、SHA224、SHA512、SHA384、SHA3或RIPEMD160",
                "keywords": [
                    "hash",
                    "digest",
                    "crypto",
                    "security",
                    "text",
                    "MD5",
                    "SHA1",
                    "SHA256",
                    "SHA224",
                    "SHA512",
                    "SHA384",
                    "SHA3",
                    "RIPEMD160"
                ],
                "icon": {
                    "name": "EyeOff"
                },
                "redirectFrom": [
                    "/hash"
                ]
            },
            {
                "isNew": false,
                "name": "加密",
                "path": "/bcrypt",
                "description": "使用bcrypt对文本字符串进行哈希和比较。Bcrypt是一个基于Blowfish密码的密码哈希函数。",
                "keywords": [
                    "bcrypt",
                    "hash",
                    "compare",
                    "password",
                    "salt",
                    "round",
                    "storage",
                    "crypto"
                ],
                "icon": {
                    "name": "LockSquare"
                }
            },
            {
                "isNew": false,
                "name": "UUIDs 生成器",
                "path": "/uuid-generator",
                "description": "通用唯一标识符（UUID）是一个128位数字，用于标识计算机系统中的信息。可能的UUID数量为16^32，即2^128或约3.4x10^38（这是一个很大的数字！）。",
                "keywords": [
                    "uuid",
                    "v4",
                    "random",
                    "id",
                    "alphanumeric",
                    "identity",
                    "token",
                    "string",
                    "identifier",
                    "unique",
                    "v1",
                    "v3",
                    "v5",
                    "nil"
                ],
                "icon": {
                    "name": "Fingerprint"
                }
            },
            {
                "isNew": false,
                "name": "ULID 生成器",
                "path": "/ulid-generator",
                "description": "生成随机的通用唯一词典可排序标识符（ULID）。",
                "keywords": [
                    "ulid",
                    "generator",
                    "random",
                    "id",
                    "alphanumeric",
                    "identity",
                    "token",
                    "string",
                    "identifier",
                    "unique"
                ],
                "icon": {
                    "name": "SortDescendingNumbers"
                },
                "createdAt": "2023-09-11T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "加密/解密文本",
                "path": "/encryption",
                "description": "使用加密算法（如AES、TripleDES、Rabbit或RC4）加密和解密文本明文。",
                "keywords": [
                    "cypher",
                    "encipher",
                    "text",
                    "AES",
                    "TripleDES",
                    "Rabbit",
                    "RC4"
                ],
                "icon": {
                    "name": "Lock"
                },
                "redirectFrom": [
                    "/cypher"
                ]
            },
            {
                "isNew": false,
                "name": "BIP39密码生成器",
                "path": "/bip39-generator",
                "description": "从现有或随机助记符生成BIP39密码短语，或从密码短语获取助记符。",
                "keywords": [
                    "BIP39",
                    "passphrase",
                    "generator",
                    "mnemonic",
                    "entropy"
                ],
                "icon": {
                    "name": "AlignJustified"
                }
            },
            {
                "isNew": false,
                "name": "Hmac 生成器",
                "path": "/hmac-generator",
                "description": "使用密钥和您喜欢的哈希函数计算基于哈希的消息身份验证代码（HMAC）。",
                "keywords": [
                    "hmac",
                    "generator",
                    "MD5",
                    "SHA1",
                    "SHA256",
                    "SHA224",
                    "SHA512",
                    "SHA384",
                    "SHA3",
                    "RIPEMD160"
                ],
                "icon": {
                    "name": "ShortTextRound"
                }
            },
            {
                "isNew": false,
                "name": "RSA密钥对生成器",
                "path": "/rsa-key-pair-generator",
                "description": "生成新的随机RSA私钥和公钥pem证书。",
                "keywords": [
                    "rsa",
                    "key",
                    "pair",
                    "generator",
                    "public",
                    "private",
                    "secret",
                    "ssh",
                    "pem"
                ],
                "icon": {
                    "name": "Certificate"
                }
            },
            {
                "isNew": false,
                "name": "密码强度分析仪",
                "path": "/password-strength-analyser",
                "description": "使用此密码强度分析器和破解时间估计工具来发现密码的强度。",
                "keywords": [
                    "password",
                    "strength",
                    "analyser",
                    "and",
                    "crack",
                    "time",
                    "estimation",
                    "brute",
                    "force",
                    "attack",
                    "entropy",
                    "cracking",
                    "hash",
                    "hashing",
                    "algorithm",
                    "algorithms",
                    "md5",
                    "sha1",
                    "sha256",
                    "sha512",
                    "bcrypt",
                    "scrypt",
                    "argon2",
                    "argon2id",
                    "argon2i",
                    "argon2d"
                ],
                "icon": {
                    "name": "mdi-form-textbox-password"
                },
                "createdAt": "2023-06-24T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "PDF签名检查器",
                "path": "/pdf-signature-checker",
                "description": "验证PDF文件的签名。签名的PDF文件包含一个或多个签名，可用于确定文件的内容在签名后是否已被更改。",
                "keywords": [
                    "pdf",
                    "signature",
                    "checker",
                    "verify",
                    "validate",
                    "sign"
                ],
                "icon": {
                    "name": "mdi-file-certificate-outline"
                },
                "createdAt": "2023-12-09T00:00:00.000Z"
            }
        ]
    },

    {
        name: "Web开发类",
        id: 'web',
        subTools: [
            {
                "isNew": false,
                "name": "编码/解码url格式的字符串",
                "path": "/url-encoder",
                "description": "编码为url编码格式（也称为“百分比编码”）或从中解码。",
                "keywords": [
                    "url",
                    "encode",
                    "decode",
                    "percent",
                    "%20",
                    "format"
                ],
                "icon": {
                    "name": "Link"
                }
            },
            {
                "isNew": false,
                "name": "转义html实体",
                "path": "/html-entities",
                "description": "转义或unescape html实体（将<、>、&、“和\\\\'替换为其html版本）",
                "keywords": [
                    "html",
                    "entities",
                    "escape",
                    "unescape",
                    "special",
                    "characters",
                    "tags"
                ],
                "icon": {
                    "name": "Code"
                }
            },
            {
                "isNew": false,
                "name": "Url分析器",
                "path": "/url-parser",
                "description": "解析url字符串以获取所有不同的部分（协议、来源、参数、端口、用户名密码…）",
                "keywords": [
                    "url",
                    "parser",
                    "protocol",
                    "origin",
                    "params",
                    "port",
                    "username",
                    "password",
                    "href"
                ],
                "icon": {
                    "name": "Unlink"
                }
            },
            {
                "isNew": false,
                "name": "设备信息",
                "path": "/device-information",
                "description": "获取有关当前设备的信息（屏幕大小、像素比率、用户代理…）",
                "keywords": [
                    "device",
                    "information",
                    "screen",
                    "pixel",
                    "ratio",
                    "status",
                    "data",
                    "computer",
                    "size",
                    "user",
                    "agent"
                ],
                "icon": {
                    "name": "DeviceDesktop"
                }
            },
            {
                "isNew": false,
                "name": "基本身份验证生成器",
                "path": "/basic-auth-generator",
                "description": "从用户名和密码生成 base64 基本身份验证标头。",
                "keywords": [
                    "basic",
                    "auth",
                    "generator",
                    "username",
                    "password",
                    "base64",
                    "authentication",
                    "header",
                    "authorization"
                ],
                "icon": {
                    "name": "PasswordRound"
                }
            },
            {
                "isNew": false,
                "name": "开放式图形元生成器",
                "path": "/og-meta-generator",
                "description": "为您的网站生成开放式图形和社交html元标记。",
                "keywords": [
                    "meta",
                    "tag",
                    "generator",
                    "social",
                    "title",
                    "description",
                    "image",
                    "share",
                    "online",
                    "website",
                    "open",
                    "graph",
                    "og"
                ],
                "icon": {
                    "name": "Tags"
                }
            },
            {
                "isNew": false,
                "name": "OTP代码生成器",
                "path": "/otp-generator",
                "description": "为多因素身份验证生成和验证基于时间的OTP（一次性密码）。",
                "keywords": [
                    "otp",
                    "code",
                    "generator",
                    "validator",
                    "one",
                    "time",
                    "password",
                    "authentication",
                    "MFA",
                    "mobile",
                    "device",
                    "security",
                    "TOTP",
                    "Time",
                    "HMAC"
                ],
                "icon": {
                    "name": "DeviceMobile"
                }
            },
            {
                "isNew": false,
                "name": "mime类型",
                "path": "/mime-types",
                "description": "将mime类型转换为扩展，反之亦然。",
                "keywords": [
                    "mime",
                    "types",
                    "extension",
                    "content",
                    "type"
                ],
                "icon": {
                    "name": "World"
                }
            },
            {
                "isNew": false,
                "name": "JWT 解析器",
                "path": "/jwt-parser",
                "description": "解析和解码JSON Web Token（jwt）并显示其内容。",
                "keywords": [
                    "jwt",
                    "parser",
                    "decode",
                    "typ",
                    "alg",
                    "iss",
                    "sub",
                    "aud",
                    "exp",
                    "nbf",
                    "iat",
                    "jti",
                    "json",
                    "web",
                    "token"
                ],
                "icon": {
                    "name": "Key"
                }
            },
            {
                "isNew": false,
                "name": "Keycode 信息",
                "path": "/keycode-info",
                "description": "查找任何按下的键的javascript键代码、代码、位置和修饰符。",
                "keywords": [
                    "keycode",
                    "info",
                    "code",
                    "javascript",
                    "event",
                    "keycodes",
                    "which",
                    "keyboard",
                    "press",
                    "modifier",
                    "alt",
                    "ctrl",
                    "meta",
                    "shift"
                ],
                "icon": {
                    "name": "Keyboard"
                }
            },
            {
                "isNew": false,
                "name": "打乱字符串",
                "path": "/slugify-string",
                "description": "确保字符串 url、文件名和 id 安全。",
                "keywords": [
                    "slugify",
                    "string",
                    "escape",
                    "emoji",
                    "special",
                    "character",
                    "space",
                    "trim"
                ],
                "icon": {
                    "name": "AbcRound"
                }
            },
            {
                "isNew": false,
                "name": "HTML所见即所得编辑器",
                "path": "/html-wysiwyg-editor",
                "description": "在线HTML编辑器具有功能丰富的所见即所得编辑器，立即获得内容的源代码。",
                "keywords": [
                    "html",
                    "wysiwyg",
                    "editor",
                    "p",
                    "ul",
                    "ol",
                    "converter",
                    "live"
                ],
                "icon": {
                    "name": "Edit"
                }
            },
            {
                "isNew": false,
                "name": "用户代理分析器",
                "path": "/user-agent-parser",
                "description": "从用户代理字符串中检测和分析浏览器、引擎、操作系统、CPU和设备类型/型号。",
                "keywords": [
                    "user",
                    "agent",
                    "parser",
                    "browser",
                    "engine",
                    "os",
                    "cpu",
                    "device",
                    "user-agent",
                    "client"
                ],
                "icon": {
                    "name": "Browser"
                },
                "createdAt": "2023-04-06T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "HTTP 状态码",
                "path": "/http-status-codes",
                "description": "所有HTTP状态的列表对其名称和含义解释。",
                "keywords": [
                    "http",
                    "status",
                    "codes",
                    "100",
                    "Continue",
                    "101",
                    "Switching Protocols",
                    "102",
                    "Processing",
                    "103",
                    "Early Hints",
                    "200",
                    "OK",
                    "201",
                    "Created",
                    "202",
                    "Accepted",
                    "203",
                    "Non-Authoritative Information",
                    "204",
                    "No Content",
                    "205",
                    "Reset Content",
                    "206",
                    "Partial Content",
                    "207",
                    "Multi-Status",
                    "208",
                    "Already Reported",
                    "226",
                    "IM Used",
                    "300",
                    "Multiple Choices",
                    "301",
                    "Moved Permanently",
                    "302",
                    "Found",
                    "303",
                    "See Other",
                    "304",
                    "Not Modified",
                    "305",
                    "Use Proxy",
                    "306",
                    "Switch Proxy",
                    "307",
                    "Temporary Redirect",
                    "308",
                    "Permanent Redirect",
                    "400",
                    "Bad Request",
                    "401",
                    "Unauthorized",
                    "402",
                    "Payment Required",
                    "403",
                    "Forbidden",
                    "404",
                    "Not Found",
                    "405",
                    "Method Not Allowed",
                    "406",
                    "Not Acceptable",
                    "407",
                    "Proxy Authentication Required",
                    "408",
                    "Request Timeout",
                    "409",
                    "Conflict",
                    "410",
                    "Gone",
                    "411",
                    "Length Required",
                    "412",
                    "Precondition Failed",
                    "413",
                    "Payload Too Large",
                    "414",
                    "URI Too Long",
                    "415",
                    "Unsupported Media Type",
                    "416",
                    "Range Not Satisfiable",
                    "417",
                    "Expectation Failed",
                    "418",
                    "I'm a teapot",
                    "421",
                    "Misdirected Request",
                    "422",
                    "Unprocessable Entity",
                    "423",
                    "Locked",
                    "424",
                    "Failed Dependency",
                    "425",
                    "Too Early",
                    "426",
                    "Upgrade Required",
                    "428",
                    "Precondition Required",
                    "429",
                    "Too Many Requests",
                    "431",
                    "Request Header Fields Too Large",
                    "451",
                    "Unavailable For Legal Reasons",
                    "500",
                    "Internal Server Error",
                    "501",
                    "Not Implemented",
                    "502",
                    "Bad Gateway",
                    "503",
                    "Service Unavailable",
                    "504",
                    "Gateway Timeout",
                    "505",
                    "HTTP Version Not Supported",
                    "506",
                    "Variant Also Negotiates",
                    "507",
                    "Insufficient Storage",
                    "508",
                    "Loop Detected",
                    "510",
                    "Not Extended",
                    "511",
                    "Network Authentication Required"
                ],
                "icon": {
                    "name": "HttpRound"
                },
                "createdAt": "2023-04-13T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "JSON 差异比较",
                "path": "/json-diff",
                "description": "比较两个JSON对象并获得它们之间的差异。",
                "keywords": [
                    "json",
                    "diff",
                    "compare",
                    "difference",
                    "object",
                    "data"
                ],
                "icon": {
                    "name": "CompareArrowsRound"
                },
                "createdAt": "2023-04-20T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "Outlook Safelink decoder",
                "path": "/safelink-decoder",
                "description": "Decode Outlook SafeLink links",
                "keywords": [
                    "outlook",
                    "safelink",
                    "decoder"
                ],
                "icon": {
                    "name": "Mailbox"
                },
                "createdAt": "2024-03-11T00:00:00.000Z"
            }
        ]
    },
    {
        name: "运维开发类",
        id: 'devops',
        subTools: [
            {
                "isNew": false,
                "name": "Git 备忘录",
                "path": "/git-memo",
                "description": "Git是一种去中心化的版本管理软件。使用此备忘单，您可以快速访问最常见的git命令.",
                "keywords": [
                    "git",
                    "push",
                    "force",
                    "pull",
                    "commit",
                    "amend",
                    "rebase",
                    "merge",
                    "reset",
                    "soft",
                    "hard",
                    "lease"
                ],
                "icon": {
                    "name": "BrandGit"
                }
            },
            {
                "isNew": false,
                "name": "随机端口生成",
                "path": "/random-port-generator",
                "description": "生成“已知”端口范围（0-1023）之外的随机端口号。",
                "keywords": [
                    "system",
                    "port",
                    "lan",
                    "generator",
                    "random",
                    "development",
                    "computer"
                ],
                "icon": {
                    "name": "Server"
                }
            },
            {
                "isNew": false,
                "name": "Crontab 表达式生成",
                "path": "/crontab-generator",
                "description": "验证并生成crontab，并获取cron调度的可读描述。",
                "keywords": [
                    "crontab",
                    "generator",
                    "cronjob",
                    "cron",
                    "schedule",
                    "parse",
                    "expression",
                    "year",
                    "month",
                    "week",
                    "day",
                    "minute",
                    "second"
                ],
                "icon": {
                    "name": "Alarm"
                }
            },
            {
                "isNew": false,
                "name": "JSON美化和格式化",
                "path": "/json-prettify",
                "description": "将JSON字符串修饰为友好的可读格式。",
                "keywords": [
                    "json",
                    "viewer",
                    "prettify",
                    "format"
                ],
                "icon": {
                    "name": "Braces"
                },
                "redirectFrom": [
                    "/json-viewer"
                ]
            },
            {
                "isNew": false,
                "name": "JSON 压缩",
                "path": "/json-minify",
                "description": "通过删除不必要的空白来缩小和压缩JSON。",
                "keywords": [
                    "json",
                    "minify",
                    "format"
                ],
                "icon": {
                    "name": "Braces"
                }
            },
            {
                "isNew": false,
                "name": "JSON 转 CSV",
                "path": "/json-to-csv",
                "description": "使用自动标头检测将JSON转换为CSV。",
                "keywords": [
                    "json",
                    "to",
                    "csv",
                    "convert"
                ],
                "icon": {
                    "name": "List"
                },
                "createdAt": "2023-06-18T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "SQL 美化和格式化",
                "path": "/sql-prettify",
                "description": "在线格式化和美化您的 SQL 查询（它支持各种 SQL 方言）。",
                "keywords": [
                    "sql",
                    "prettify",
                    "beautify",
                    "GCP BigQuery",
                    "IBM DB2",
                    "Apache Hive",
                    "MariaDB",
                    "MySQL",
                    "Couchbase N1QL",
                    "Oracle PL/SQL",
                    "PostgreSQL",
                    "Amazon Redshift",
                    "Spark",
                    "SQL Server Transact-SQL"
                ],
                "icon": {
                    "name": "Database"
                }
            },
            {
                "isNew": false,
                "name": "Chmod 计算器",
                "path": "/chmod-calculator",
                "description": "使用此在线的chmod计算器计算chmod权限和命令。",
                "keywords": [
                    "chmod",
                    "calculator",
                    "file",
                    "permission",
                    "files",
                    "directory",
                    "folder",
                    "recursive",
                    "generator",
                    "octal"
                ],
                "icon": {
                    "name": "FileInvoice"
                }
            },
            {
                "isNew": false,
                "name": "Docker Run 到 docker-compose 转换器",
                "path": "/docker-run-to-docker-compose-converter",
                "description": "将 docker run 命令行转换为 docker-compose 文件!",
                "keywords": [
                    "docker",
                    "run",
                    "compose",
                    "yaml",
                    "yml",
                    "convert",
                    "deamon"
                ],
                "icon": {
                    "name": "BrandDocker"
                }
            },
            {
                "isNew": false,
                "name": "XML 格式化",
                "path": "/xml-formatter",
                "description": "将XML字符串修饰为友好的可读格式。",
                "keywords": [
                    "xml",
                    "prettify",
                    "format"
                ],
                "icon": {
                    "name": "Code"
                },
                "createdAt": "2023-06-17T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "YAML美化和格式化",
                "path": "/yaml-prettify",
                "description": "将YAML字符串修饰为友好的可读格式。",
                "keywords": [
                    "yaml",
                    "viewer",
                    "prettify",
                    "format"
                ],
                "icon": {
                    "name": "AlignJustified"
                },
                "createdAt": "2024-01-31T00:00:00.000Z"
            }
        ]
    },
    {
        name: "网络通信协议",
        id: 'network',
        subTools: [
            {
                "isNew": false,
                "name": "IPv4子网计算器",
                "path": "/ipv4-subnet-calculator",
                "description": "解析IPv4 CIDR块，并获取有关子网络的所有所需信息。",
                "keywords": [
                    "ipv4",
                    "subnet",
                    "calculator",
                    "mask",
                    "network",
                    "cidr",
                    "netmask",
                    "bitmask",
                    "broadcast",
                    "address"
                ],
                "icon": {
                    "name": "RouterOutlined"
                }
            },
            {
                "isNew": false,
                "name": "Ipv4地址转换器",
                "path": "/ipv4-address-converter",
                "description": "在ipv6中，将ip地址转换为十进制、二进制、十六进制或事件",
                "keywords": [
                    "ipv4",
                    "address",
                    "converter",
                    "decimal",
                    "hexadecimal",
                    "binary",
                    "ipv6"
                ],
                "icon": {
                    "name": "Binary"
                },
                "createdAt": "2023-04-08T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "IPv4范围扩展器",
                "path": "/ipv4-range-expander",
                "description": "给定起始和结束IPv4地址，此工具使用其CIDR表示法计算有效的IPv4网络。",
                "keywords": [
                    "ipv4",
                    "range",
                    "expander",
                    "subnet",
                    "creator",
                    "cidr"
                ],
                "icon": {
                    "name": "UnfoldMoreOutlined"
                },
                "createdAt": "2023-04-19T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "MAC地址查找",
                "path": "/mac-address-lookup",
                "description": "通过设备的MAC地址查找设备的供应商和制造商。",
                "keywords": [
                    "mac",
                    "address",
                    "lookup",
                    "vendor",
                    "parser",
                    "manufacturer"
                ],
                "icon": {
                    "name": "Devices"
                },
                "createdAt": "2023-04-06T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "MAC 地址生成器",
                "path": "/mac-address-generator",
                "description": "输入数量和前缀。MAC地址将以您选择的大小写（大写或小写）生成",
                "keywords": [
                    "mac",
                    "address",
                    "generator",
                    "random",
                    "prefix"
                ],
                "icon": {
                    "name": "Devices"
                },
                "createdAt": "2023-12-01T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "IPv6 ULA生成器",
                "path": "/ipv6-ula-generator",
                "description": "根据RFC4193在网络上生成您自己的本地不可路由IP地址。",
                "keywords": [
                    "ipv6",
                    "ula",
                    "generator",
                    "rfc4193",
                    "network",
                    "private"
                ],
                "icon": {
                    "name": "BuildingFactory"
                },
                "createdAt": "2023-04-09T00:00:00.000Z"
            }
        ]
    },
    {
        name: "数学运算工具",
        id: 'math',
        subTools: [
            {
                "isNew": false,
                "name": "数学计算器",
                "path": "/math-evaluator",
                "description": "计算数学表达式的计算器。您可以使用sqrt、cos、sin、abs等函数。",
                "keywords": [
                    "math",
                    "evaluator",
                    "calculator",
                    "expression",
                    "abs",
                    "acos",
                    "acosh",
                    "acot",
                    "acoth",
                    "acsc",
                    "acsch",
                    "asec",
                    "asech",
                    "asin",
                    "asinh",
                    "atan",
                    "atan2",
                    "atanh",
                    "cos",
                    "cosh",
                    "cot",
                    "coth",
                    "csc",
                    "csch",
                    "sec",
                    "sech",
                    "sin",
                    "sinh",
                    "sqrt",
                    "tan",
                    "tanh"
                ],
                "icon": {
                    "name": "Math"
                }
            },
            {
                "isNew": false,
                "name": "ETA 计算器",
                "path": "/eta-calculator",
                "description": "ETA（估计到达时间）计算器，用于知道任务的近似结束时间，例如下载的结束时刻。",
                "keywords": [
                    "eta",
                    "calculator",
                    "estimated",
                    "time",
                    "arrival",
                    "average"
                ],
                "icon": {
                    "name": "Hourglass"
                }
            },
            {
                "isNew": false,
                "name": "百分比计算器",
                "path": "/percentage-calculator",
                "description": "轻松计算从一个值到另一个值的百分比，或从百分比到值的百分比。",
                "keywords": [
                    "percentage",
                    "calculator",
                    "calculate",
                    "value",
                    "number",
                    "%"
                ],
                "icon": {
                    "name": "Percentage"
                },
                "createdAt": "2023-06-18T00:00:00.000Z"
            }
        ]
    },
    {
        name: "快速测量工具",
        id: 'measure',
        subTools: [
            {
                "isNew": false,
                "name": "计时器",
                "path": "/chronometer",
                "description": "监控事物的持续时间。基本上是一种具有简单计时器功能的计时器。",
                "keywords": [
                    "chronometer",
                    "time",
                    "lap",
                    "duration",
                    "measure",
                    "pause",
                    "resume",
                    "stopwatch"
                ],
                "icon": {
                    "name": "TimerOutlined"
                }
            },
            {
                "isNew": false,
                "name": "温度转换器",
                "path": "/temperature-converter",
                "description": "开尔文、摄氏度、华氏度、兰金、德莱尔、牛顿、雷奥穆尔和罗默温度度数转换。",
                "keywords": [
                    "temperature",
                    "converter",
                    "degree",
                    "Kelvin",
                    "Celsius",
                    "Fahrenheit",
                    "Rankine",
                    "Delisle",
                    "Newton",
                    "Réaumur",
                    "Rømer"
                ],
                "icon": {
                    "name": "Temperature"
                }
            },
            {
                "isNew": false,
                "name": "基准生成器",
                "path": "/benchmark-builder",
                "description": "简单的在线基准构建器可以轻松比较任务的执行时间。",
                "keywords": [
                    "benchmark",
                    "builder",
                    "execution",
                    "duration",
                    "mean",
                    "variance"
                ],
                "icon": {
                    "name": "SpeedFilled"
                },
                "createdAt": "2023-04-05T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "电话分析器和格式化程序",
                "path": "/phone-parser-and-formatter",
                "description": "解析、验证和格式化电话号码。获取有关电话号码的信息，如国家/地区代码、类型等。",
                "keywords": [
                    "phone",
                    "parser",
                    "formatter",
                    "validate",
                    "format",
                    "number",
                    "telephone",
                    "mobile",
                    "cell",
                    "international",
                    "national"
                ],
                "icon": {
                    "name": "Phone"
                },
                "createdAt": "2023-05-01T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "IBAN验证器和解析器",
                "path": "/iban-validator-and-parser",
                "description": "验证和分析IBAN编号。检查IBAN是否有效，并获取国家BBAN，如果它是QR-IBAN和IBAN友好格式。",
                "keywords": [
                    "iban",
                    "validator",
                    "and",
                    "parser",
                    "bic",
                    "bank"
                ],
                "icon": {
                    "name": "mdi-bank"
                },
                "createdAt": "2023-08-26T00:00:00.000Z"
            }
        ]
    },
    {
        name: "文本处理工具",
        id: 'text',
        subTools: [
            {
                "isNew": false,
                "name": "Lorem ipsum生成器",
                "path": "/lorem-ipsum-generator",
                "description": "Lorem ipsum是一种占位符文本，通常用于演示文档或字体的视觉形式，而不依赖于有意义的内容",
                "keywords": [
                    "lorem",
                    "ipsum",
                    "dolor",
                    "sit",
                    "amet",
                    "placeholder",
                    "text",
                    "filler",
                    "random",
                    "generator"
                ],
                "icon": {
                    "name": "AlignJustified"
                }
            },
            {
                "isNew": false,
                "name": "文本统计",
                "path": "/text-statistics",
                "description": "获取有关文本、字符数、字数、大小等的信息",
                "keywords": [
                    "text",
                    "statistics",
                    "length",
                    "characters",
                    "count",
                    "size",
                    "bytes"
                ],
                "icon": {
                    "name": "FileText"
                },
                "redirectFrom": [
                    "/text-stats"
                ]
            },
            {
                "isNew": false,
                "name": "Emoji 选择器",
                "path": "/emoji-picker",
                "description": "轻松复制和粘贴Emoji表情符号，并获得每个表情符号的unicode和code points值.",
                "keywords": [
                    "emoji",
                    "picker",
                    "unicode",
                    "copy",
                    "paste"
                ],
                "icon": {
                    "name": "MoodSmile"
                },
                "createdAt": "2023-08-07T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "字符串混淆器",
                "path": "/string-obfuscator",
                "description": "混淆字符串（如秘密、IBAN 或令牌），使其可共享和可识别，而不泄露其内容。",
                "keywords": [
                    "string",
                    "obfuscator",
                    "secret",
                    "token",
                    "hide",
                    "obscure",
                    "mask",
                    "masking"
                ],
                "icon": {
                    "name": "EyeOff"
                },
                "createdAt": "2023-08-16T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "文本比较",
                "path": "/text-diff",
                "description": "比较两个文本并查看它们之间的差异。",
                "keywords": [
                    "text",
                    "diff",
                    "compare",
                    "string",
                    "text diff",
                    "code"
                ],
                "icon": {
                    "name": "FileDiff"
                },
                "createdAt": "2023-08-16T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "数字名称生成器",
                "path": "/numeronym-generator",
                "description": "数字名是一个用数字构成缩写的词。例如，“i18n”是“国际化”的名词，其中18表示单词中第一个i和最后一个n之间的字母数。",
                "keywords": [
                    "numeronym",
                    "generator",
                    "abbreviation",
                    "i18n",
                    "a11y",
                    "l10n"
                ],
                "icon": {},
                "createdAt": "2023-11-05T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "ASCII Art Text Generator",
                "path": "/ascii-text-drawer",
                "description": "Create ASCII art text with many fonts and styles.",
                "keywords": [
                    "ascii",
                    "asciiart",
                    "text",
                    "drawer"
                ],
                "icon": {
                    "name": "Artboard"
                },
                "createdAt": "2024-03-03T00:00:00.000Z"
            }
        ]
    },
    {
        name: "图像视频处理",
        id: 'video',
        subTools: [
            {
                "isNew": false,
                "name": "二维码生成器",
                "path": "/qrcode-generator",
                "description": "生成并下载url或文本的QR代码，并自定义背景和前景颜色。",
                "keywords": [
                    "qr",
                    "code",
                    "generator",
                    "square",
                    "color",
                    "link",
                    "low",
                    "medium",
                    "quartile",
                    "high",
                    "transparent"
                ],
                "icon": {
                    "name": "Qrcode"
                }
            },
            {
                "isNew": false,
                "name": "WiFi 二维码生成器",
                "path": "/wifi-qrcode-generator",
                "description": "生成和下载QR码以快速连接到WiFi网络。",
                "keywords": [
                    "qr",
                    "code",
                    "generator",
                    "square",
                    "color",
                    "link",
                    "low",
                    "medium",
                    "quartile",
                    "high",
                    "transparent",
                    "wifi"
                ],
                "icon": {
                    "name": "Qrcode"
                },
                "createdAt": "2023-09-06T00:00:00.000Z"
            },
            {
                "isNew": false,
                "name": "SVG 占位符生成器",
                "path": "/svg-placeholder-generator",
                "description": "生成 svg 图像以用作应用程序中的占位符。",
                "keywords": [
                    "svg",
                    "placeholder",
                    "generator",
                    "image",
                    "size",
                    "mockup"
                ],
                "icon": {
                    "name": "ImageOutlined"
                }
            },
            {
                "isNew": false,
                "name": "摄像机记录器",
                "path": "/camera-recorder",
                "description": "从网络摄像头或照相机拍摄照片或录制视频。",
                "keywords": [
                    "camera",
                    "recoder"
                ],
                "icon": {
                    "name": "Camera"
                },
                "createdAt": "2023-05-15T00:00:00.000Z"
            }
        ]
    },
].map(x => {
    return {
        ...x,
        subTools: x.subTools.map((y: SubToolItem) => {
            y.id = y.path.replace(/\//g, '')
            y.path = `/tools/${x.id}${y.path}`
            return y satisfies SubToolItem
        })
    } satisfies ToolNavInfoType
}) 
