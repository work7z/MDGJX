import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Base32")

export default (): FAQItem[] => {
    return [
        {
            question: Dot("l1p9z", "What is Base32?"),
            answer: (
                <p>
                    {Dot("e5c7r", "Base32 is a binary-to-text encoding scheme that represents data in an ASCII string using a subset of 32 characters. It's designed to be human-readable and URL-safe.")}<br />
                    {Dot("m6d8b", "Each 5-bit value is represented by a single character, allowing efficient encoding and decoding for systems that prefer working with octets (8-bit units).")}
                </p>
            )
        },
        {
            question: Dot("a4s6x", "How does Base32 work?"),
            answer: (
                <p>
                    {Dot("k7g0n", "In Base32, every 5 bits of input data are mapped to one of the 32 characters from the set 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567='.")}<br />
                    {Dot("t8z1v", "When there are not enough bits left at the end to fill a full 5-bit group, padding characters '=' are added. For example, a byte requires two Base32 characters, and a 3-byte sequence would need four Base32 characters.")}
                </p>
            )
        },
        {
            question: Dot("q2w5m", "Purpose of using Base32?"),
            answer: (
                <p>
                    {Dot("u3j9p", "Base32 is often used when you need a compact textual representation of binary data that can be typed or printed without losing information, like in file integrity checks, geocaching, and secure password generation.")}<br />
                    {Dot("h4e1b", "It's also useful for situations where case-sensitive alphanumeric strings are easier to handle than hexadecimal or base64, which may contain non-alphanumeric characters that could cause issues in certain contexts (like URLs or filenames).")}
                </p>
            )
        },
        {
            question: Dot("i9o7k", "Advantages of Base32 over Base64"),
            answer: (
                <p>
                    {Dot("z2x8c", "Base32 has fewer visual ambiguities since it uses only uppercase letters and digits, making it easier to read and transcribe by hand or over the phone compared to Base64 which includes '+', '/' and lowercase letters. ")}<br />
                    {Dot("f5a0s", "Additionally, Base32 produces longer output but can be more suitable for specific applications like file names due to its lack of special characters that might conflict with filesystem rules.")}
                </p>
            )
        },
        {
            question: Dot("y6t1n", "Disadvantages of Base32"),
            answer: (
                <p>
                    {Dot("g8r3e", "The main disadvantage of Base32 is its relatively poor space efficiency; it expands input data by approximately 25% more than Base64. This means it takes up more storage or bandwidth for the same amount of encoded data.")}<br />
                    {Dot("d9w7m", "Furthermore, because it uses only uppercase letters, it cannot utilize all possible combinations of case sensitivity as an additional security measure like Base64 sometimes does with case folding during decoding.")}
                </p>
            )
        },
        {
            question: Dot("c0v2p", "Common operations with Base32"),
            answer: (
                <p>
                    {Dot("j1b5k", "The most common operations involving Base32 include encoding binary data into a Base32 string and decoding a Base32 string back into its original binary format.")}<br />
                    {Dot("R_S7_CLAo", "Example: To encode 'TEST12345' in Base32, you can use libraries like base32-encode in Node.js, or built-in functions in other languages such as Python's base64.b32encode.")}
                </p>
            )
        },
        {
            question: Dot("n3e7r", "History of Base32"),
            answer: (
                <p>
                    {Dot("p9s5t", "Base32 was developed by Douglas Crockford, known for his contributions to JavaScript, in 2001. It was created as a more reliable alternative to existing encodings like Base64, especially for situations requiring text-based representations of binary data.")}<br />
                    {Dot("z6m1c", "Later variations like z-base-32 were introduced to improve usability, replacing some less memorable characters with others, but Crockford's original specification remains widely used today.")}
                </p>
            )
        },
        {
            question: Dot("b8g2k", "Usage scenarios for Base32"),
            answer: (
                <p>
                    {Dot("f0q4w", "One popular usage scenario is in generating secret keys for Two-Factor Authentication (2FA), where services like Google Authenticator and Yubikey use Base32-encoded secrets.")}<br />
                    {Dot("d1x7v", "Another example is in Git, where hashed objects are sometimes stored in Base32 format to avoid problems with line endings and filename restrictions. Also, HashiCorp Vault uses Base32 for key derivation.")}
                </p>
            )
        },
        {
            question: Dot("h9j3m", "Padding in Base32"),
            answer: (
                <p>
                    {Dot("s5t0n", "Padding in Base32 involves adding '=' characters to ensure that the final chunk of encoded data still contains a multiple of 8 bits. However, unlike Base64, Base32 padding is minimal because each Base32 character already encodes 5 bits.")}<br />
                    {Dot("a8b7z", "Thus, padding is only necessary if the last group of bits being encoded is not divisible by 40 bits (since 8 Base32 characters represent 40 bits). Padding will consist of zero to six '=' characters at the end of the encoded string.")}
                </p>
            )
        },
    ]
}