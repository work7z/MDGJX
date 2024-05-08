import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Base62")

export default (): FAQItem[] => {
    return [
        {
            question: Dot("z4t9b", "What is Base62?"),
            answer: (
                <p>
                    {Dot("x7n1m", "Base62 is an encoding scheme that represents binary data as a sequence of 62 alphanumeric characters.")}<br />
                    {Dot("v3k5r", "The character set includes all uppercase and lowercase letters (A-Z, a-z) and digits (0-9), providing a more compact representation compared to Base64 or Base32.", "BASE64_BASE32_COMPARISON")}
                </p>
            ),
            links: [
                {
                    name: "Base62 Wikipedia",
                    link: "https://en.wikipedia.org/wiki/Base64#Base62"
                }
            ]
        },
        {
            question: Dot("g8h7s", "How does Base62 work?"),
            answer: (
                <p>
                    {Dot("d2w4e", "Similar to other base conversion systems, Base62 works by converting input bytes into a large integer, then expressing it as a combination of characters from its 62-character set.")} < br />
                    {Dot("c5p1b", "Padding isn't used; the length of the encoded output depends directly on the size of the input data.", "NO_PADDING")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("y3m9k", "Why was Base62 created?"),
            answer: (
                <p>
                    {Dot("f1t2z", "Base62 was developed to provide a shorter, URL-safe alternative to Base64, particularly for unique identifiers and short URLs.")} < br />
                    {Dot("q7n3r", "It also avoids ambiguous characters like 'O' and '0', 'I' and 'l', which can lead to human transcription errors.", "URL_SAFE_CHARS")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("j4s6r", "How do I encode/decode with Base62 in JavaScript?"),
            answer: (
                <p>
                    {Dot("p9e1n", "You can use libraries like 'base-x' or 'base62' for Base62 encoding and decoding in JavaScript.")}<br />
                    {Dot("z2m7t", "Example usage: `const base62 = require('base62'); const encoded = base62.encode('your-data'); const decoded = base62.decode(encoded);`")}
                </p>
            ),
            links: [
                {
                    name: "base-x GitHub repository",
                    link: "https://github.com/cryptocoinjs/base-x"
                },
                {
                    name: "base62 npm package",
                    link: "https://www.npmjs.com/package/base62"
                }
            ]
        },
        {
            question: Dot("u3i8b", "What are the advantages of using Base62 over Base64 or Base32?"),
            answer: (
                <p>
                    {Dot("r6nq2v", "The primary advantage of Base62 is its increased space efficiency due to a larger character set than Base32 but without non-alphanumeric characters found in Base64.")} < br />
                    {Dot("k9em5e", "This makes it ideal for scenarios where a concise, URL-friendly identifier is required without sacrificing readability.", "SPACE_EFFICIENCY_URL_FRIENDLY")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("z7t1p", "Are there any specific variants of Base62?"),
            answer: (
                <p>
                    {Dot("w2x9qk", "While Base62 itself has no significant variants, some implementations may differ slightly in their choice of character set, such as excluding '+' or '/' commonly used in Base64.")} < br />
                    {Dot("c8me6b", "Custom Base62-like schemes might be tailored for specific applications, but they generally adhere to the same principle of using a larger character set than Base64 or Base32.", "CUSTOM_VARIANTS_POSSIBLE")}
                </p>
            ),
            links: []
        },
    ]
}
