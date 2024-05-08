import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("JavaScript-FAQ-20230315");


export default (): FAQItem[] => {
    return [
        {
            question: Dot("JS-Basics-001", "What is JavaScript?"),
            answer: (
                <p>
                    {Dot("JS-Def-002", "JavaScript (JS) is a high-level, interpreted programming language that's widely used for creating web applications, enhancing user interfaces, and building server-side logic with Node.js.")}<br />
                    {Dot("JS-Purpose-003", "It was initially developed by Brendan Eich at Netscape in 1995 and has since evolved into one of the most popular languages, supported by all major web browsers and platforms like Electron and React Native.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("JS-Syntax-004", "What is the basic syntax of JavaScript?"),
            answer: (
                <p>
                    {Dot("JS-Syntax-Example-005", 'A simple JavaScript statement could be declaring and assigning a variable: `let myVar = "Hello, World!";`')}
                    <br />
                    {Dot("JS-Function-Syntax-006", "Functions are defined using the `function` keyword followed by the function name and parameters enclosed in parentheses. The function body is wrapped in curly braces: `function greet(name) { console.log(`Hello, ${name}!`); }`")}
                </p>
            ),
            links: [
                {
                    name: Dot("MDN-JS-Guide", "MDN Web Docs - JavaScript Guide"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                },
            ],
        },
        {
            question: Dot("JS-DOM-API-007", "How does JavaScript interact with the DOM?"),
            answer: (
                <p>
                    {Dot("JS-DOM-API-Explanation-008", "JavaScript provides a Document Object Model (DOM) API to manipulate HTML and CSS, enabling developers to change content, style, and event listeners dynamically.")}<br />
                    {Dot("JS-DOM-Example-009", "For instance, you can select an element and change its text content: `document.getElementById('myElement').textContent = 'New Text';`")}
                </p>
            ),
            links: [
                {
                    name: Dot("MDN-DOM-API", "MDN Web Docs - Manipulating Documents"),
                    link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents",
                },
            ],
        },
        {
            question: Dot("JS-Data-Types-010", "What are the data types in JavaScript?"),
            answer: (
                <p>
                    {Dot("JS-Data-Types-List-011", "JavaScript supports various data types including primitive ones like string, number, boolean, null, undefined, and symbol, as well as complex types like object and array.")}<br />
                    {Dot("JS-Type-Checking-012", "Type checking can be done using constructors (`typeof value === 'string'`) or the `instanceof` operator for objects inheriting from built-in constructors (e.g., `value instanceof Array`).")}
                </p>
            ),
            links: [
                {
                    name: Dot("MDN-JS-Types", "MDN Web Docs - Data Types and Data Structures"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
                },
            ],
        },
        {
            question: Dot("JS-Event-Loop-013", "What is the event loop in JavaScript?"),
            answer: (
                <p>
                    {Dot("JS-Event-Loop-Explanation-014", "The event loop is a core part of JavaScript's concurrency model, which allows asynchronous execution through callbacks, promises, and async/await.")}<br />
                    {Dot("JS-Event-Loop-Process-015", "It runs the main script first, then executes any callback functions when their associated events (like user input or network responses) occur, managing them through a queue system.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MDN-Event-Loop", "MDN Web Docs - Event Loop"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop",
                },
            ],
        },
    ];
};