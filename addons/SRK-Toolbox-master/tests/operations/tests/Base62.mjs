/**
 * Base62 tests.
 *
 * @author tcode2k16 [tcode2k16@gmail.com]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "To Base62: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Base62编码",
                args: ["0-9A-Za-z"],
            },
        ],
    },
    {
        name: "To Base62: Hello, World!",
        input: "Hello, World!",
        expectedOutput: "1wJfrzvdbtXUOlUjUf",
        recipeConfig: [
            {
                op: "Base62编码",
                args: ["0-9A-Za-z"],
            },
        ],
    },
    {
        name: "To Base62: UTF-8",
        input: "ნუ პანიკას",
        expectedOutput: "BPDNbjoGvDCDzHbKT77eWg0vGQrJuWRXltuRVZ",
        recipeConfig: [
            {
                op: "Base62编码",
                args: ["0-9A-Za-z"],
            },
        ],
    },
    {
        name: "From Base62: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Base62解码",
                args: ["0-9A-Za-z"],
            },
        ],
    },
    {
        name: "From Base62: Hello, World!",
        input: "1wJfrzvdbtXUOlUjUf",
        expectedOutput: "Hello, World!",
        recipeConfig: [
            {
                op: "Base62解码",
                args: ["0-9A-Za-z"],
            },
        ],
    },
    {
        name: "From Base62: UTF-8",
        input: "BPDNbjoGvDCDzHbKT77eWg0vGQrJuWRXltuRVZ",
        expectedOutput: "ნუ პანიკას",
        recipeConfig: [
            {
                op: "Base62解码",
                args: ["0-9A-Za-z"],
            },
        ],
    }
]);
