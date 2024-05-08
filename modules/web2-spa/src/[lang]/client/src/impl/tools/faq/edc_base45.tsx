import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Base45")

export default (): FAQItem[] => {
    return [
        {
            question: Dot("u2l8s", "What is Base45?"),
            answer: (
                <p>
                    {Dot("r9a3t", "Base45 is a text-based encoding scheme that encodes binary data into ASCII characters.")}<br />
                    {Dot("z5b7m", "It uses a larger alphabet (0-9, A-Z, a-z, -, ., $, /, +, %, and *) compared to Base64 or Base32, resulting in shorter encoded strings for the same input data.")}
                </p>
            )
        },
        {
            question: Dot("g1h5n", "How does Base45 work?"),
            answer: (
                <p>
                    {Dot("e8x2v", "Base45 works by dividing the input data into groups of 5 bytes each. It then converts each group into a decimal number and maps it to a corresponding character from its 45-character set.")}<br />
                    {Dot("d6y9k", "If there are not enough bytes to fill the last group, padding is not used; instead, the remaining bits are processed and mapped to their corresponding character(s).")}
                </p>
            )
        },
        {
            question: Dot("c9q7w", "Why was Base45 created?"),
            answer: (
                <p>
                    {Dot("x5z1b", "Base45 was developed primarily for QR code usage within the context of digital COVID certificates.")} <br />
                    {
                        Dot("f8n4m", "Its compactness allows more efficient use of space in QR codes while maintaining readability with standard barcode scanners.")

                    }
                </p>
            )
        },
        {
            question: Dot("s3e6r", "How do I encode data using Base45?"),
            answer: (
                <p>
                    {Dot("j7k2t", "To encode data with Base45, you need a library or function that implements the Base45 algorithm.")} <br />
                    <div dangerouslySetInnerHTML={{
                        __html: Dot("qv1p5n", "For example, in Java, you can use the 'org.iso.base45' library to encode your data.")
                    }}>

                    </div>
                </p>
            )
        },
        {
            question: Dot("z8m2t", "What are the advantages of using Base45 over Base64 or Base32?"),
            answer: (
                <p>
                    {Dot("q5h8n", "The main advantage is reduced string length for the same amount of encoded data, making it suitable for applications where space efficiency is critical.")} <br />
                    {Dot("g6v3b", "However, Base45's larger character set may increase the likelihood of errors when dealing with non-alphanumeric characters, which could be an issue in some environments or transmission channels.")}
                </p>
            )
        },
        {
            question: Dot("a4r9t", "Can Base45 decode any Base45-encoded string regardless of its origin?"),
            answer: (
                <p>
                    {Dot("y3b6n", "Yes, as long as the encoded string was generated according to the Base45 specification, any compliant decoder should be able to decode it.")} <br />
                    {Dot("m9k1z", "However, if the data being decoded contains specific application semantics (e.g., specific QR code formats), additional processing might be necessary after decoding.")}
                </p>
            )
        },
        {
            question: Dot("i7w2m", "Are there any built-in Base45 libraries in popular programming languages?"),
            answer: (
                <p>
                    {Dot("c2vw9k", "While Base45 isn't as widely implemented as Base64 or Base32, open-source libraries exist for several languages.")} <br />
                    {Dot("z1n5qr", "Examples include base45 npm package for JavaScript and dotnet-base45 for .NET.")}
                </p>
            )
        },
    ]
}