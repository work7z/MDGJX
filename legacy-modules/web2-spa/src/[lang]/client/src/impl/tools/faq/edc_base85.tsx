import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Base85")
export default (): FAQItem[] => {
    return [

        {
            question: Dot("z2t7m", "What is Base85?"),
            answer: (
                <p>
                    {Dot("x9n1b", "Base85 is an encoding scheme that represents binary data using a set of 85 printable ASCII characters.")}<br />
                    {Dot("v4k6r", "It encodes data into a more compact form compared to Base64 or Base32 by using a larger character set.", "BASE64_BASE32_COMPARISON")}
                </p>
            ),
            links: [
                {
                    name: "Base85 Wikipedia",
                    link: "https://en.wikipedia.org/wiki/Ascii85"
                }
            ]
        },
        {
            question: Dot("g3h5s", "How does Base85 work?"),
            answer: (
                <p>
                    {Dot("d7w2e", "Base85 works by dividing the input data into groups of four bytes and converting each group into a decimal number between 0 and 2^32-1.")} < br />
                    {Dot("c1p4b", "Each decimal number is then converted to a unique sequence of five Base85 characters. If there are fewer than four bytes left at the end, padding might be applied.", "GROUPING_PADDING")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("y6m8k", "Why was Base85 created?"),
            answer: (
                <p>
                    {Dot("f9t1z", "Base85 was initially developed to efficiently represent binary data in PostScript documents for better compression ratios.")}< br />
                    {Dot("q2n3r", "Today, it's used in various applications where space efficiency and readability are crucial, such as PDF documents and certain network protocols.", "POSTSCRIPT_PDF_USAGE")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("j5s7r", "How do I encode/decode with Base85 in JavaScript?"),
            answer: (
                <p>
                    <div dangerouslySetInnerHTML={{
                        __html: Dot("p8eq9n", "You can use libraries like 'base85' or 'ascii85'  for Base85 encoding and decoding in JavaScript.")
                    }}>
                    </div><br />
                    {Dot("z5m6t", "Example usage: `const base85 = require('base85'); const encoded = base85.encode('your-data'); const decoded = base85.decode(encoded);`")}
                </p>
            ),
            links: [
                {
                    name: "base85 npm package",
                    link: "https://www.npmjs.com/package/base85"
                },
                {
                    name: "ascii85 GitHub repository",
                    link: "https://github.com/SheetJS/js-codec/tree/master/lib/ascii85"
                }
            ]
        },
        {
            question: Dot("u1i2b", "What are the advantages of using Base85 over Base64 or Base32?"),
            answer: (
                <p>
                    {Dot("r9qn8v", "The main advantage of Base85 is its improved space efficiency due to a larger character set (85 vs. 64 in Base64 or 32 in Base32).")} < br />
                    {Dot("k2em5e", "This results in shorter output strings for the same amount of input data, which can be beneficial in scenarios where minimizing size is critical.", "SPACE_EFFICIENCY")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("z9t7p", "Are there any specific variants of Base85?"),
            answer: (
                <p>
                    {Dot("w1x4k", "Yes, several variants exist, including Ascii85 (used in PostScript and PDF), Z85 (ZeroMQ), and UUencode (an older format). Each has a slightly different character set and rules.", "VARIANTS")}
                </p>
            ),
            links: [
                {
                    name: "Ascii85 Wikipedia",
                    link: "https://en.wikipedia.org/wiki/Ascii85"
                },
                {
                    name: "Z85 ZeroMQ Specification",
                    link: "http://rfc.zeromq.org/spec:32/Z85/"
                },
                {
                    name: "UUencode Wikipedia",
                    link: "https://en.wikipedia.org/wiki/Uuencoding"
                }
            ]
        },
    ]
}