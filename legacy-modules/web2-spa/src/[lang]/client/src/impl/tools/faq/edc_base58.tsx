import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Base58")


export default (): FAQItem[] => {
    return [
        {
            question: Dot("x2z6r", "What is Base58?"),
            answer: (
                <p>
                    {Dot("v4n9t", "Base58 is an encoding scheme that represents binary data as a sequence of alphanumeric characters.")}<br />
                    {Dot("s1b3m", "Unlike Base64 or Base32, it excludes the easily confused '0', 'O', 'I', and 'l' characters, making it suitable for URLs and QR codes.", "BASE64_BASE32")}
                </p>
            ),
            links: [
                {
                    name: "Base58 Wiki",
                    link: "https://en.wikipedia.org/wiki/Base58"
                }
            ]
        },
        {
            question: Dot("g7h5k", "How does Base58 work?"),
            answer: (
                <p>
                    {Dot("d3w2e", "Base58 works by converting input bytes into a large integer, then expressing that integer as a combination of characters from its 58-character set (A-Z, a-z, 1-9).")} <br />
                    {Dot("c6p9b", "If the input data's length isn't divisible by 8, padding is not used; instead, each non-full group is treated independently.", "NO_PADDING")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("y9m1n", "Why was Base58 created?"),
            answer: (
                <p>
                    {Dot("f4t7z", "Base58 was initially developed for Bitcoin to represent public addresses and private keys without ambiguity.")} < br />
                    {Dot("q2x8k", "Its use has expanded to other cryptocurrencies and scenarios where human-readable, error-resistant strings are desired.", "CRYPTOCURRENCY_USAGE")}
                </p>
            ),
            links: [
                {
                    name: "Bitcoin Address Format",
                    link: "https://en.bitcoin.it/wiki/Base58Check_encoding#Base58_symbol_chart"
                }
            ]
        },
        {
            question: Dot("j6s3r", "How do I encode/decode with Base58 in JavaScript?"),
            answer: (
                <p>
                    {Dot("pq5e9n", "You can use libraries like 'bs58' to perform Base58 encoding and decoding in JavaScript.")}<br />
                    {Dot("z1m2t", "Example usage: `const encoded = bs58.encode('your-data'); const decoded = bs58.decode(encoded);`")}
                </p>
            ),
            links: [
                {
                    name: "bs58 npm package",
                    link: "https://www.npmjs.com/package/bs58"
                }
            ]
        },
        {
            question: Dot("u8i5b", "What are the advantages of using Base58 over Base64 or Base32?"),
            answer: (
                <p>
                    {Dot("r2n7v", "The main advantage is increased readability due to excluding similar-looking characters, reducing errors during manual entry.")} < br />
                    {Dot("k1m4e", "However, it doesn't offer quite the same space efficiency as Base64 or Base32 since it uses fewer characters in its alphabet.", "SPACE_EFFICIENCY")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("z9t2p", "Are there any specific variants of Base58?"),
            answer: (
                <p>
                    {Dot("w3x7k", "Yes, some popular variants include Base58Check, which adds a checksum for error detection, commonly used in Bitcoin.")} < br />
                    {Dot("c5m1b", "Another variant, Base58Flickr, differs slightly in its character set. It replaces '+' with ',' and '/' with '-', adapting to Flickr's URL needs.", "BASE58FLICKR_VARIANT")}
                </p>
            ),
            links: [
                {
                    name: "Base58Check Wikipedia",
                    link: "https://en.wikipedia.org/wiki/Base58Check_encoding"
                },
                {
                    name: "Base58Flickr Reference",
                    link: "https://tools.ietf.org/html/rfc4648#section-5"
                }
            ]
        },
    ]
}