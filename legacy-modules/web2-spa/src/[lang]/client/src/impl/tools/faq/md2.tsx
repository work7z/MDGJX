import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("MD2")
export default (): FAQItem[] => {
    return [
        {
            question: Dot("MD2-FAQ-001", "What is MD2?"),
            answer: (
                <p>
                    {Dot("MD2-Def-002", "MD2 (Message-Digest Algorithm 2) is a cryptographic hash function designed by Ronald Rivest in 1989. It produces a 128-bit hash value for any given input message.")}<br />
                    {Dot("MD2-Purpose-003", "The purpose of MD2 is to ensure data integrity by generating a unique digital fingerprint that can be used to verify the originality and authenticity of the data.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD2-History-004", "How was MD2 developed and what is its history?"),
            answer: (
                <p>
                    {Dot("MD2-Origin-005", "MD2 was initially created as an improvement over MD1, addressing some weaknesses found in the earlier algorithm. It gained popularity due to its relative simplicity and speed at the time.")}<br />
                    {Dot("MD2-Successors-006", "However, it has been superseded by stronger algorithms like MD5 and SHA-1, which are part of the same family of hash functions but offer improved security features.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD2-Operation-007", "How does the MD2 operation work?"),
            answer: (
                <p>
                    {Dot("MD2-Process-008", "MD2 operates by padding the input message to a multiple of 16 bytes and then processes it through a series of exclusive-OR operations, bit rotations, and additions. The final output is a 128-bit hash value.")}<br />
                    {Dot("MD2-Rounds-009", "The algorithm uses a four-round process with specific operations performed on a 128-bit state variable. Each round takes in blocks of the padded message and updates the state until the entire message is processed.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD2-AlgorithmDetails-010", "MD2 Algorithm Details"),
                    link: "https://en.wikipedia.org/wiki/MD2_(cryptography)#Algorithm"
                }
            ]
        },
        {
            question: Dot("MD2-Advantages-011", "What are the advantages of using MD2?"),
            answer: (
                <p>
                    {Dot("MD2-Speed-012", "MD2 was considered fast for its time and still has acceptable performance in some scenarios, making it suitable for environments where computational resources are limited.")}<br />
                    {Dot("MD2-Implementation-013", "It has been widely implemented and standardized across various platforms and languages, which means that integrating MD2 into existing systems can be relatively straightforward.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD2-Disadvantages-014", "What are the disadvantages and security concerns with MD2?"),
            answer: (
                <p>
                    {Dot("MD2-CollisionSecurity-015", "MD2 is considered to be weak against modern cryptographic attacks. Its hash size (128 bits) is small by today's standards, making it vulnerable to collision attacks.")}<br />
                    {Dot("MD2-Breakdown-016", "Cryptographic weaknesses have been discovered in MD2 over time, and stronger alternatives like SHA-256 and SHA-3 are now recommended for all applications requiring secure hashing.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD2-InsecurityExamples-017", "MD2 Security Breakdown Examples"),
                    link: "https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/validation/validation-list/md2#19"
                }
            ]
        },
        {
            question: Dot("MD2-Applications-018", "What applications have used or still use MD2?"),
            answer: (
                <p>
                    {Dot("MD2-PKI-019", "MD2 was once used in Public Key Infrastructure (PKI) for digital signatures but has since been deprecated due to its vulnerability to attacks. Certificates signed with MD2 are no longer trusted by most systems.")}<br />
                    {Dot("MD2-HistoricalUse-020", "Historically, MD2 found use in file integrity checks and software updates, although these applications have largely transitioned to more secure hash functions such as SHA-256 and SHA-512.)")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD2-DigitalSignature-Risks-021", "Risks of Using MD2 for Digital Signatures"),
                    link: "https://csrc.nist.gov/publications/detail/fips/180/4/final"
                }
            ]
        },
    ]
}