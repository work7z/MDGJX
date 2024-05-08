import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("aa8PrFNcY");

export default (): FAQItem[] => {
    return [
        {
            question: Dot("Minify-Basics-001", "What is the meaning of minifying code or files?"),
            answer: (
                <p>
                    {Dot("Minify-Def-002", "Minification is the process of reducing the size of code (HTML, CSS, JavaScript, etc.) by removing unnecessary characters such as white spaces, comments, and line breaks without affecting its functionality.")}<br />
                    {Dot("Minify-Purpose-003", "The primary purpose of minification is to improve website performance and reduce page load times by decreasing the amount of data that needs to be transferred between server and client.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("Minify-How-Works-004", "How does code minification work?"),
            answer: (
                <p>
                    {Dot("Minify-Process-005", "Minifiers use algorithms to analyze the structure of source code, eliminate superfluous elements, and shorten variable names where possible. This results in a smaller file size while maintaining the original behavior of the code.")}<br />
                    {Dot("Minify-Example-007k", 'For instance, {0} might become {1} after minification.', `"var myVariable = 10;"`, `"var a=10;"`)}
                </p>
            ),
            links: [
                {
                    name: Dot("MDN-Minification", "MDN Web Docs - Minification"),
                    link: "https://developer.mozilla.org/en-US/docs/Glossary/Minification",
                },
            ],
        },
        {
            question: Dot("Minify-Tools-007", "What are some popular tools for minifying code?"),
            answer: (
                <p>
                    {Dot("Minify-Tools-List-008", "Popular tools for minifying code include UglifyJS for JavaScript, Terser which is an evolution of UglifyJS, HTMLMinifier for HTML, and CSSNano for CSS. These tools can often be integrated into build processes using task runners like Gulp or Webpack.")}<br />
                    {Dot("Minify-CLI-Usage-009", "Most of these tools have both command-line interfaces (CLI) and APIs that allow developers to automate the minification process during development and deployment.")}
                </p>
            ),
            links: [
                {
                    name: Dot("UglifyJS", "UglifyJS - GitHub"),
                    link: "https://github.com/mishoo/UglifyJS",
                },
                {
                    name: Dot("Terser", "Terser - GitHub"),
                    link: "https://github.com/terser/terser",
                },
                {
                    name: Dot("HTMLMinifier", "HTMLMinifier - GitHub"),
                    link: "https://github.com/kangax/html-minifier",
                },
                {
                    name: Dot("CSSNano", "cssnano - GitHub"),
                    link: "https://github.com/cssnano/cssnano",
                },
            ],
        },
    ]
}
