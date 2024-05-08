// LafTools
// 
// Date: Tue, 23 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("MD5")



export default (): FAQItem[] => {
    return [
        {
            question: Dot("MD5-FAQ-001", "What is MD5?"),
            answer: (
                <p>
                    {Dot("MD5-Def-002", "MD5 (Message-Digest Algorithm 5) is a widely-used cryptographic hash function that takes an input message and produces a fixed-size 128-bit hash value.")}<br />
                    {Dot("MD5-Purpose-003", "Its purpose is to ensure data integrity by generating a unique digital fingerprint for any given data. If even a single bit in the original data changes, the MD5 hash will be completely different.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD5-Usage-004", "How is MD5 used in practice?"),
            answer: (
                <p>
                    {Dot("MD5-FileChecksum-005", "MD5 is often used to verify file integrity when downloading software or large files. It generates a checksum that can be compared to the one provided by the source to ensure the downloaded file has not been tampered with.")}<br />
                    {Dot("MD5-PasswordHashing-006", "It was also historically used in password hashing but is now considered insecure due to its vulnerability to collisions and ease of cracking. Modern systems have moved on to stronger alternatives like bcrypt or Argon2.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD5-CollisionExample-007", "MD5 Collision Example"),
                    link: "https://www.mscs.dal.ca/~selinger/md5collision/"
                }
            ]
        },
        {
            question: Dot("MD5-Operation-008", "How does MD5 operation work?"),
            answer: (
                <p>
                    {Dot("MD5-Process-009", "MD5 operates by breaking down the input message into chunks and passing each chunk through several rounds of processing involving logical functions, modular arithmetic, and bitwise operations. The result is concatenated to produce the final 128-bit hash value.")}<br />
                    {Dot("MD5-Rounds-010", "The algorithm consists of four main stages performed on a 128-bit internal state which gets initialized with constants. There are 64 processing rounds in total, where each round transforms the internal state based on the input message blocks.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD5-AlgorithmDetails-011", "MD5 Algorithm Details"),
                    link: "https://en.wikipedia.org/wiki/MD5#Algorithm"
                }
            ]
        },
        {
            question: Dot("MD5-Advantages-012", "What are the advantages of using MD5?"),
            answer: (
                <p>
                    {Dot("MD5-Speed-013", "MD5 is relatively fast, which made it popular for applications where quick hashing was essential.")}<br />
                    {Dot("MD5-Standardization-014", "It has been widely standardized and implemented in various programming languages and platforms, making it easy to integrate into existing systems and tools.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD5-Disadvantages-015", "What are the disadvantages and security concerns with MD5?"),
            answer: (
                <p>
                    {Dot("MD5-Collision-016", "MD5 is vulnerable to collision attacks, meaning that two different inputs can produce the same hash output. This makes it insecure for applications like digital signatures or password storage.")}<br />
                    {Dot("MD5-Breakdown-017", "Several cryptographic weaknesses have been discovered in MD5 over time, and researchers have demonstrated practical examples of creating collisions, further compromising its integrity and security.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD5-InsecurityExamples-018", "MD5 Security Breakdown Examples"),
                    link: "https://www.schneier.com/blog/archives/2008/12/more_md5_collis.html"
                }
            ]
        },
        {
            question: Dot("MD5-Alternatives-019", "What are some alternatives to MD5 for secure hashing?"),
            answer: (
                <p>
                    {Dot("SHA-256-020", "SHA-256 (Secure Hash Algorithm) is a widely-used alternative offering stronger security than MD5. It generates a larger 256-bit hash value and is part of the SHA-2 family.")}<br />
                    {Dot("BLAKE2-021", "BLAKE2 is another modern alternative that provides faster speeds compared to SHA-2 while maintaining high security levels. It offers multiple variants including BLAKE2b and BLAKE2s.")}
                </p>
            ),
            links: [
                {
                    name: Dot("SHA-2_Info-022", "SHA-2 Info"),
                    link: "https://en.wikipedia.org/wiki/SHA-2"
                },
                {
                    name: Dot("BLAKE2_Info-023", "BLAKE2 Info"),
                    link: "https://blake2.net/"
                }
            ]
        },

        {
            question: Dot("MD5-Applications-024", "What other applications use or have used MD5?"),
            answer: (
                <p>
                    {Dot("MD5-PKI-025", "MD5 has been used in Public Key Infrastructure (PKI) for creating digital signatures, although its usage has largely been deprecated due to security concerns. Certificates signed with MD5 are no longer trusted by most modern systems.")}<br />
                    {Dot("MD5-DataIntegrity-026", "It was also commonly used to verify the integrity of data during transmission and storage, such as when using rsync for file synchronization or checksumming large datasets.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MD5-DigitalSignature-Risks-027", "Risks of Using MD5 for Digital Signatures"),
                    link: "https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/validation/validation-list/md5#18"
                }
            ]
        },
        {
            question: Dot("MD5-Future-028", "Is MD5 still relevant today?"),
            answer: (
                <p>
                    {Dot("MD5-Relevance-029", "MD5 is not considered secure for cryptographic purposes anymore, especially for new applications that require collision resistance or strong message integrity. However, it may still be found in legacy systems or non-cryptographic applications where speed is a priority over security.")}<br />
                    {Dot("MD5-Transition-030", "As newer, more secure algorithms like SHA-256 and BLAKE2 become widely available and better understood, it's recommended to transition away from MD5 in all contexts where security is a concern.")}
                </p>
            ),
            links: []
        },
        {
            question: Dot("MD5-Summary-031", "In summary, what key points should I remember about MD5?"),
            answer: (
                <p>
                    {Dot("MD5-Summary-Point1-032", "MD5 is a fast but insecure cryptographic hash function susceptible to collision attacks.")}<br />
                    {Dot("MD5-Summary-Point2-033", "Its primary uses were to ensure data integrity and for some cryptographic operations, but it has largely been replaced by stronger alternatives like SHA-256 and BLAKE2.")}<br />
                    {Dot("MD5-Summary-Point3-034", "While you may encounter MD5 in legacy systems or non-security sensitive scenarios, it's crucial to avoid using it for any new projects requiring cryptographic security.")}
                </p>
            ),
            links: []
        },
    ]

};