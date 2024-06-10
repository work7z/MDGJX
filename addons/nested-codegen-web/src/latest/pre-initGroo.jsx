// languages
function initForGroovy({ languages }) {
  function getTokens(tokens, divider = "|") {
    return tokens.split(divider);
  }

  const wordPattern = /(-?\d*\.\d\w*)|([^`~!@#%^&*()\-=+[{\]}\\|;:'",./?\s]+)/g;

  const brackets = [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ];

  const bracketTokens = [
    {
      open: "[",
      close: "]",
      token: "delimiter.square",
    },
    {
      open: "(",
      close: ")",
      token: "delimiter.parenthesis",
    },
    {
      open: "{",
      close: "}",
      token: "delimiter.curly",
    },
  ];

  const autoClosingPairs = [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "`", close: "`" },
  ];

  const surroundingPairs = autoClosingPairs;

  const id = "groovy";
  const label = "Groovy";

  const registerGroovyLanguageForMonaco = () => {
    languages.register({ id, aliases: [label] });

    languages.setMonarchTokensProvider(id, {
      brackets: bracketTokens,
      tokenPostfix: ".groovy",
      keywords: getTokens(
        "assert|with|abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|def|float|native|super|while|in|as"
      ),
      typeKeywords: getTokens(
        "Long|Integer|Short|Byte|Double|Number|Float|Character|Boolean|StackTraceElement|Appendable|StringBuffer|Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|StackOverflowError|OutOfMemoryError|VirtualMachineError|ArrayStoreException|ClassCastException|LinkageError|NoClassDefFoundError|ClassNotFoundException|RuntimeException|Exception|ThreadDeath|Error|Throwable|System|ClassLoader|Cloneable|Class|CharSequence|Comparable|String|Object"
      ),
      constants: getTokens("null|Infinity|NaN|undefined|true|false"),
      builtinFunctions: getTokens(
        "AbstractMethodError|AssertionError|ClassCircularityError|ClassFormatError|Deprecated|EnumConstantNotPresentException|ExceptionInInitializerError|IllegalAccessError|IllegalThreadStateException|InstantiationError|InternalError|NegativeArraySizeException|NoSuchFieldError|Override|Process|ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|SuppressWarnings|TypeNotPresentException|UnknownError|UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|InstantiationException|IndexOutOfBoundsException|ArrayIndexOutOfBoundsException|CloneNotSupportedException|NoSuchFieldException|IllegalArgumentException|NumberFormatException|SecurityException|Void|InheritableThreadLocal|IllegalStateException|InterruptedException|NoSuchMethodException|IllegalAccessException|UnsupportedOperationException|Enum|StrictMath|Package|Compiler|Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|NullPointerException"
      ),
      operators: [
        ".",
        ".&",
        ".@",
        "?.",
        "*",
        "*.",
        "*:",
        "~",
        "!",
        "++",
        "--",
        "**",
        "+",
        "-",
        "*",
        "/",
        "%",
        "<<",
        ">>",
        ">>>",
        "..",
        "..<",
        "<",
        "<=",
        ">",
        ">",
        "==",
        "!=",
        "<=>",
        "===",
        "!==",
        "=~",
        "==~",
        "^",
        "|",
        "&&",
        "||",
        "?",
        ":",
        "?:",
        "=",
        "**=",
        "*=",
        "/=",
        "%=",
        "+=",
        "-=",
        "<<=",
        ">>=",
        ">>>=",
        "&=",
        "^=",
        "|=",
        "?=",
      ],
      symbols: /[=><!~?:&|+\-*/^%]+/,
      escapes:
        /\\(?:[abfnrtv\\"'`]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

      regexpctl: /[(){}[\]$^|\-*+?.]/,
      regexpesc:
        /\\(?:[bBdDfnrstvwWn0\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

      tokenizer: {
        root: [
          { include: "@whitespace" },
          [
            /\/(?=([^\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
            { token: "regexp", bracket: "@open", next: "@regexp" },
          ],
          { include: "@comments" },
          { include: "@numbers" },
          { include: "common" },
          [/[;,.]/, "delimiter"],
          [/[(){}[\]]/, "@brackets"],
          [
            /[a-zA-Z_$]\w*/,
            {
              cases: {
                "@keywords": "keyword",
                "@typeKeywords": "type",
                "@constants": "constant.groovy",
                "@builtinFunctions": "constant.other.color",
                "@default": "identifier",
              },
            },
          ],
          [
            /@symbols/,
            {
              cases: {
                "@operators": "operator",
                "@default": "",
              },
            },
          ],
        ],
        common: [
          // delimiters and operators
          [/[()[\]]/, "@brackets"],
          [/[<>](?!@symbols)/, "@brackets"],
          [
            /@symbols/,
            {
              cases: {
                "@operators": "delimiter",
                "@default": "",
              },
            },
          ],

          [
            /\/(?=([^\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/,
            { token: "regexp", bracket: "@open", next: "@regexp" },
          ],

          // delimiter: after number because of .\d floats
          [/[;,.]/, "delimiter"],

          // strings
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          [/'([^'\\]|\\.)*$/, "string.invalid"],
          [/"/, "string", "@string_double"],
          [/'/, "string", "@string_single"],
        ],
        whitespace: [[/\s+/, "white"]],
        comments: [
          [/\/\/.*/, "comment"],
          [
            /\/\*/,
            {
              token: "comment.quote",
              next: "@comment",
            },
          ],
        ],
        comment: [
          [/[^*/]+/, "comment"],
          [
            /\*\//,
            {
              token: "comment.quote",
              next: "@pop",
            },
          ],
          [/./, "comment"],
        ],
        commentAnsi: [
          [
            /\/\*/,
            {
              token: "comment.quote",
              next: "@comment",
            },
          ],
          [/[^*/]+/, "comment"],
          [
            /\*\//,
            {
              token: "comment.quote",
              next: "@pop",
            },
          ],
          [/./, "comment"],
        ],
        numbers: [
          [/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?f?\b/, "number.float"],
          [/[+-]?(?:0[obx])?\d+(?:u?[lst]?)?\b/, "number"],
        ],
        regexp: [
          [
            /(\{)(\d+(?:,\d*)?)(\})/,
            [
              "regexp.escape.control",
              "regexp.escape.control",
              "regexp.escape.control",
            ],
          ],
          [
            /(\[)(\^?)(?=(?:[^\]\\/]|\\.)+)/,
            // @ts-ignore
            [
              "regexp.escape.control",
              { token: "regexp.escape.control", next: "@regexrange" },
            ],
          ],
          [
            /(\()(\?:|\?=|\?!)/,
            ["regexp.escape.control", "regexp.escape.control"],
          ],
          [/[()]/, "regexp.escape.control"],
          [/@regexpctl/, "regexp.escape.control"],
          [/[^\\/]/, "regexp"],
          [/@regexpesc/, "regexp.escape"],
          [/\\\./, "regexp.invalid"],
          // @ts-ignore
          [
            /(\/)([gimsuy]*)/,
            [
              { token: "regexp", bracket: "@close", next: "@pop" },
              "keyword.other",
            ],
          ],
        ],

        regexrange: [
          [/-/, "regexp.escape.control"],
          [/\^/, "regexp.invalid"],
          [/@regexpesc/, "regexp.escape"],
          [/[^\]]/, "regexp"],
          [
            /\]/,
            { token: "regexp.escape.control", next: "@pop", bracket: "@close" },
          ],
        ],
        embedded: [
          [
            /([^@]|^)([@]{4})*[@]{2}([@]([^@]|$)|[^@]|$)/,
            {
              token: "@rematch",
              next: "@pop",
              nextEmbedded: "@pop",
            },
          ],
        ],
        string_double: [
          [/\$\{/, { token: "delimiter.bracket", next: "@bracketCounting" }],
          [/[^\\"$]+/, "string"],
          [/[^\\"]+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [/"/, "string", "@pop"],
        ],
        string_single: [
          [/[^\\']+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [/'/, "string", "@pop"],
        ],
        string_backtick: [
          [/\$\{/, { token: "delimiter.bracket", next: "@bracketCounting" }],
          [/[^\\"$]+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [/"/, "string", "@pop"],
        ],
        bracketCounting: [
          [/\{/, "delimiter.bracket", "@bracketCounting"],
          [/\}/, "delimiter.bracket", "@pop"],
          { include: "common" },
        ],
      },
    });
    languages.setLanguageConfiguration(id, {
      comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
      },
      brackets,
      autoClosingPairs,
      surroundingPairs,
      wordPattern,
    });
  };
  registerGroovyLanguageForMonaco();
}
window.initForGroovy = initForGroovy;
