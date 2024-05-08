// LafTools
// 
// Date: Sat, 27 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./XMLBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Rj0heQjfD")

export default (): FAQItem[] => {
    return [
        {
            question: Dot("YAML-Basics-001", "What is YAML?"),
            answer: (
                <p>
                    {Dot("YAML-Def-002", "YAML (YAML Ain't Markup Language) is a human-readable data serialization standard that can be used in conjunction with all programming languages and is often used to write configuration files.")}<br />
                    {Dot("YAML-Purpose-003", "It's designed to be easily readable by humans and is often used to express data structures and serialization in a format that is easy to read and write.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("YAML-Usage-001", "What is YAML used for?"),
            answer: (
                <p>
                    {Dot("YAML-Usage-002", "YAML is often used for configuration files and in applications where data is being stored or transmitted.")}<br />
                    {Dot("YAML-Usage-003", "It's commonly used in applications where data is being stored or transmitted, such as in configuration files, and in applications where data is being stored or transmitted.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("YAML-Advantages-001", "What are the advantages of YAML?"),
            answer: (
                <p>
                    {Dot("YAML-Advantages-002", "YAML is human-readable and easy to write, making it a popular choice for configuration files.")}<br />
                    {Dot("YAML-Advantages-003", "It's also easy to read and write, and is often used in conjunction with all programming languages.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("YAML-Disadvantages-001", "What are the disadvantages of YAML?"),
            answer: (
                <p>
                    {Dot("YAML-Disadvantages-002", "YAML can be difficult to parse and can be prone to errors.")}<br />
                    {Dot("YAML-Disadvantages-003", "It's also not as widely supported as other data serialization formats, such as JSON.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("YAML-Example-001", "What does a YAML file look like?"),
            answer: (
                <p>
                    {Dot("YAML-Example-002", "A simple YAML file consists of key-value pairs, with each pair separated by a colon.")}<br />
                    {Dot("YAML-Example-003", "For example, a YAML file might look like this:")}
                    <pre>
                        {`
                        key1: value1
                        key2: value2
                        `}
                    </pre>
                </p>
            ),
            links: [],
        },
        ...CommonMinify(),
    ]
}