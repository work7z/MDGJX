// LafTools
// 
// Date: Sat, 27 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { loadDOT } from "@/app/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("CP-FAQ-20230315");


export default (): FAQItem[] => {
    return [
        {
            question: Dot("CP-Basics-001", "What is computer programming?"),
            answer: (
                <p>
                    {Dot("CP-Def-002", "Computer programming involves writing instructions, or code, in a programming language to instruct computers on how to perform specific tasks.")}<br />
                    {Dot("CP-Purpose-003", "Programmers create algorithms, solve problems, and build software applications that can automate processes, manipulate data, and interact with users or other systems.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("CP-History-004", "What is the history of computer programming?"),
            answer: (
                <p>
                    {Dot("CP-History-Origin-005", "The first programmable machines date back to Ada Lovelace's work on Charles Babbage's Analytical Engine in the 19th century. However, modern programming took off with the invention of the first general-purpose electronic computer, ENIAC, in the 1940s.")}<br />
                    {Dot("CP-Language-Evolution-006", "Since then, programming languages evolved from machine code to assembly, then to high-level languages like FORTRAN, COBOL, C, and now to modern languages such as Python, JavaScript, and Rust.")}
                </p>
            ),
            links: [
                {
                    name: Dot("HistOfProg-Wikipedia", "History of Programming Languages - Wikipedia"),
                    link: "https://en.wikipedia.org/wiki/History_of_programming_languages",
                },
            ],
        },
        {
            question: Dot("CP-Languages-007", "What are some popular programming languages?"),
            answer: (
                <p>
                    {Dot("CP-Languages-List-008", "Popular programming languages include Java, Python, JavaScript, C++, C#, Swift, Go, PHP, Ruby, and Kotlin. Each has its own strengths and use cases, e.g., Python for data science, JavaScript for web development, and C++ for system programming.")}<br />
                    {Dot("CP-Lang-Choice-009", "The choice of language depends on factors such as project requirements, community support, ease of learning, and performance needs.")}
                </p>
            ),
            links: [
                {
                    name: Dot("TIOBE-Index", "TIOBE Index - The Software Quality Company"),
                    link: "https://www.tiobe.com/tiobe-index/",
                },
            ],
        },
        {
            question: Dot("CP-Process-010", "What is the process of computer programming?"),
            answer: (
                <p>
                    {Dot("CP-Process-Explanation-011", "Programming typically involves planning (defining the problem and designing the solution), coding (writing source code in a chosen language), testing (debugging and verifying functionality), and maintenance (updating and improving the program over time).")}<br />
                    {Dot("CP-SDLC-012", "This is often structured within a Software Development Life Cycle (SDLC) which includes additional phases like requirement analysis, design, deployment, and user acceptance testing.")}
                </p>
            ),
            links: [
                {
                    name: Dot("SDLC-Wikipedia", "Software Development Life Cycle - Wikipedia"),
                    link: "https://en.wikipedia.org/wiki/Software_development_life_cycle",
                },
            ],
        },
        {
            question: Dot("CP-Advantages-013", "What are the advantages of learning computer programming?"),
            answer: (
                <p>
                    {Dot("CP-Advantage-Career-014", "Learning to program opens up career opportunities across various industries and allows you to develop innovative solutions, automate tasks, and understand complex systems.")}<br />
                    {Dot("CP-Skillset-015", "It also improves logical thinking, problem-solving skills, and adaptability to new technologies, making one more versatile in the digital age.")}
                </p>
            ),
            links: [],
        },
    ];
};