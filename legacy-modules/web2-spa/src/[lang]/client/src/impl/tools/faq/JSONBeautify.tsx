import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("JSON-FAQ-20230315");

export default (): FAQItem[] => {
    return [
        {
            question: Dot("JSON-Basics-001", "What is JSON?"),
            answer: (
                <p>
                    {Dot("JSON-Def-002", "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that's easy for humans to read and write, and easy for machines to parse and generate.")}<br />
                    {Dot("JSON-Purpose-003", "It's primarily used to transmit data between a server and web application as an alternative to XML, with native support in JavaScript via the `JSON.parse()` and `JSON.stringify()` methods.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("JSON-Syntax-004", "What is the basic syntax of JSON?"),
            answer: (
                <p>
                    {Dot("JSON-Syntax-Example-f005", 'A JSON object consists of key-value pairs enclosed in curly braces {0}. Each key must be a string enclosed in double quotes, followed by a colon, and then its value.', `"{ }"`)}
                    <br />
                    {Dot("JSON-Value-Types-006", "Values can be strings, numbers, booleans, arrays (enclosed in square brackets []), other objects, or null.")}
                </p>
            ),
            links: [
                {
                    name: Dot("JSON-Syntax-Reference", "MDN Web Docs on JSON"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
                },
            ],
        },
        {
            question: Dot("JSON-Beautify-007", "What is JSON Beautification?"),
            answer: (
                <p>
                    {Dot("JSON-Beautify-Def-008", "JSON beautification refers to the process of formatting JSON data into a more human-readable form with proper indentation and line breaks, making it easier to analyze and debug.")}<br />
                    {Dot("JSON-Beautify-Example-009", "Before: '{\"key\":\"value\",\"array\":[1,2,3]}', After: '{\n  \"key\": \"value\",\n  \"array\": [\n    1,\n    2,\n    3\n  ]\n}'")}
                </p>
            ),
            links: [
            ],
        },
        {
            question: Dot("JSON-vs-XML-010", "How does JSON compare to XML?"),
            answer: (
                <p>
                    {Dot("JSON-Advantages-011", "JSON is generally smaller and quicker to parse than XML, making it ideal for client-server communication where bandwidth and speed are crucial.")}<br />
                    {Dot("XML-Advantages-012", "XML provides more structure flexibility and supports namespaces, which can be beneficial for complex document structures and interoperability across systems.")}
                </p>
            ),
            links: [
                {
                    name: Dot("JSON-vs-XML-Article", "Comparing JSON and XML"),
                    link: "https://www.w3schools.com/js/js_json_xml.asp",
                },
            ],
        },
        {
            question: Dot("JSON-Path-013", "What is JSON Path?"),
            answer: (
                <p>
                    {Dot("JSON-Path-Explanation-014", "JSON Path is a query language similar to XPath for XML, allowing you to extract data from JSON documents using a path-like notation.")}<br />
                    {Dot("JSON-Path-Example-015", '$.store.book[0].title selects the title of the first book in a JSON object with a store that contains books array.')}
                </p>
            ),
            links: [
                {
                    name: Dot("JSON-Path-Guide", "JSONPath - XPath for JSON"),
                    link: "https://goessner.net/articles/JsonPath/",
                },
            ],
        }, {
            question: Dot("JSON-Serialization-016", "What is JSON serialization and deserialization?"),
            answer: (
                <p>
                    {Dot("JSON-Serialization-Def-017", "JSON serialization is the process of converting a JavaScript object into a JSON string, while deserialization is the reverse – turning a JSON string back into a JavaScript object.")}<br />
                    {Dot("JSON-Serialization-Example-018", 'For instance, `JSON.stringify({name: "John", age: 30})` produces the JSON string "{"name": "John", "age": 30}", and `JSON.parse(\'{ "name": "John", "age": 30 }\')` converts it back to an object in JavaScript.')}
                </p>
            ),
            links: [
                {
                    name: Dot("JSON-Serialization-W3Schools", "JSON Serialization on W3Schools"),
                    link: "https://www.w3schools.com/js/js_json_serialize.asp",
                },
            ],
        },
        {
            question: Dot("JSON-Scope-in-JavaScript-019", "How does JSON fit within JavaScript?"),
            answer: (
                <p>
                    {Dot("JSON-JavaScript-Support-020", "JSON is natively supported by JavaScript through global objects `JSON.parse()` and `JSON.stringify()`. Any valid JSON is also a valid JavaScript literal object or array, which allows seamless conversion between the two formats.")}<br />
                    {Dot("JSON-JavaScript-Usage-021", "In web development, JSON is commonly used for AJAX requests, server-side rendering, and data storage (e.g., local storage or IndexedDB).")}
                </p>
            ),
            links: [
                {
                    name: Dot("MDN-JSON-in-JavaScript", "MDN Web Docs - Working with JSON"),
                    link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON",
                },
            ],
        },
        {
            question: Dot("JSON-Linting-022", "What is JSON linting and why is it important?"),
            answer: (
                <p>
                    {Dot("JSON-Linting-Explanation-023", "JSON linting is the process of checking if a JSON document adheres to the JSON specification. It helps identify syntax errors before attempting to parse the data.")}<br />
                    {Dot("JSON-Linting-Benefit-024", "Linters can prevent runtime errors due to invalid JSON, ensuring smooth data exchange and saving time debugging potential issues.")}
                </p>
            ),
            links: [
            ],
        },
        {
            question: Dot("JSON-Security-025", "What are some security concerns when working with JSON?"),
            answer: (
                <p>
                    {Dot("JSON-Security-Impact-026", "Potential security risks include JSON injection attacks, where malicious data is sent that could cause unintended behavior when parsed/executed.")}<br />
                    {Dot("JSON-Security-Prevention-027", "To mitigate these risks, always sanitize user input and use libraries that safely parse JSON without executing its content (like JavaScript's built-in JSON.parse()). Also, avoid using eval() for parsing JSON.")}
                </p>
            ),
            links: [
                {
                    name: Dot("OWASP-JSON-Injection", "OWASP - JSON Injection"),
                    link: "https://owasp.org/www-community/vulnerabilities/JSON_Injection",
                },
            ],
        },
    ];
};