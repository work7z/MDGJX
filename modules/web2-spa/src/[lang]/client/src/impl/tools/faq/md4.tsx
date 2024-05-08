import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("MD4")

export default (): FAQItem[] => {
    return [

        {
            question: Dot("MD4-FAQ-001", "What is MD4?"),
            answer: (
                <p>
                    {Dot("MD4-Def-002", "MD4 (Message-Digest Algorithm 4) is a cryptographic hash function designed by Ronald Rivest in 1990. It produces a 128-bit hash value for any given input message.")}<br />
                    {Dot("MD4-Purpose-003", "MD4's purpose is to ensure data integrity by generating a fixed-size digital fingerprint that can be used to verify the authenticity and integrity of the original data.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD4-History-004", "How was MD4 developed and what is its historical significance?"),
            answer: (
                <p>
                    {Dot("MD4-Origin-005", "MD4 was an evolution of MD2 and MD3, intended to provide faster performance while maintaining security properties. However, it became evident that MD4 has several security weaknesses.")}<br />
                    {Dot("MD4-Successors-006", "Despite its flaws, MD4 laid the groundwork for subsequent hash functions like MD5 and SHA-1, which improved upon its design but also inherited some of its vulnerabilities over time.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD4-Operation-007", "How does MD4 operation work?"),
            answer: (
                <p>
                    {Dot("MD4-Process-008", "MD4 processes the input message by padding it to a multiple of 512 bits and dividing it into 16-word blocks. The algorithm then operates on these blocks using four rounds of processing involving bitwise operations, modular additions, and non-linear functions.")}<br />
                    {Dot("MD4-Rounds-009", "After all blocks are processed, the resulting internal state is transformed into the final 128-bit hash value.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD4-AlgorithmDetails-010", "MD4 Algorithm Details"),
                    link: "https://en.wikipedia.org/wiki/MD4#Algorithm"
                }
            ]
        },

        {
            question: Dot("MD4-Advantages-011", "What are the advantages of using MD4?"),
            answer: (
                <p>
                    {Dot("MD4-Speed-012", "MD4 was initially designed to be faster than its predecessors, which made it popular for applications that required quick hashing at the time of its introduction.")}<br />
                    {Dot("MD4-Implementation-013", "It has been widely implemented and standardized across various platforms and languages, providing ease of integration into existing systems, although this advantage is outweighed by its security concerns in modern contexts.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD4-Disadvantages-014", "What are the disadvantages and security concerns with MD4?"),
            answer: (
                <p>
                    {Dot("MD4-CollisionSecurity-015", "MD4 has several cryptographic weaknesses, including susceptibility to collision attacks. This means that two different inputs can produce the same hash output, making it insecure for applications requiring collision resistance or strong message integrity.")}<br />
                    {Dot("MD4-Breakdown-016", "The algorithm's design flaws have led to practical attacks allowing for easy hash collisions and even partial preimage attacks, rendering MD4 unsuitable for any secure cryptographic use case today.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD4-InsecurityExamples-017", "MD4 Security Breakdown Examples"),
                    link: "https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/validation/validation-list/md4#18"
                }
            ]
        },
        {
            question: Dot("MD4-Applications-018", "What applications have used or still use MD4?"),
            answer: (
                <p>
                    {Dot("MD4-HistoricalUse-019", "Historically, MD4 was used in digital signatures, file integrity checks, and software updates. However, due to its vulnerabilities, these applications have largely transitioned to more secure alternatives like SHA-256 and SHA-3.")}<br />
                    {Dot("MD4-LegacySystems-020", "MD4 may still exist in legacy systems, but its usage is discouraged in all contexts where security is a concern. Modern standards no longer recommend MD4 for any cryptographic purposes.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD4-DigitalSignature-Risks-021", "Risks of Using MD4 for Digital Signatures"),
                    link: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
                }
            ]
        },

    ]
}