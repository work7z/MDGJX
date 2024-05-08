import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("XML-FAQ-20230315");

export default (): FAQItem[] => {
    return [
        {
            question: Dot("XML-Basics-001", "What is XML?"),
            answer: (
                <p>
                    {Dot("XML-Def-002", "XML (eXtensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.")}<br />
                    {Dot("XML-Purpose-003", "It's designed to carry data, rather than display data like HTML, enabling it to be used as a common format for sharing structured information across different platforms and applications.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("XML-Syntax-004", "What is the basic syntax of XML?"),
            answer: (
                <p>
                    {Dot("XML-Syntax-Example-005", 'A simple XML document consists of elements in a tree-like structure. Each element starts with a tag in angle brackets (<element>) and ends with a closing tag (</element>).')}
                    <br />
                    {Dot("XML-Attributes-006", "Elements can have attributes, which provide additional information about the element within the opening tag, such as {0}", `<person id="123">...</person>`)}
                </p>
            ),
            links: [
                {
                    name: Dot("MDN-XML-Syntax", "MDN Web Docs - XML Syntax"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/XML/XML_syntax",
                },
            ],
        },
        {
            question: Dot("XML-Nesting-007", "How does nesting work in XML?"),
            answer: (
                <p>
                    {Dot("XML-Nesting-Explanation-008", "In XML, elements can be nested inside one another to represent hierarchical relationships. The child elements are placed between the opening and closing tags of their parent element.")}<br />
                    {Dot("XML-Nesting-Example-009", 'For instance, `<book><title>My Book Title</title><author>John Doe</author></book>` represents a book with its title and author as nested elements.')}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("XML-Validation-010", "What is XML validation, and how does it work?"),
            answer: (
                <p>
                    {Dot("XML-Validation-Def-011", "XML validation ensures that an XML document adheres to a specific set of rules defined in a Document Type Definition (DTD) or an XML Schema (XSD).")}<br />
                    {Dot("XML-Validation-Process-012", "Validators check if all required elements and attributes are present, validate the data types, and enforce any constraints specified in the schema before processing the document.")}
                </p>
            ),
            links: [
                {
                    name: Dot("W3Schools-XML-Validation", "W3Schools - XML Validation"),
                    link: "https://www.w3schools.com/xml/xml_validator.asp",
                },
            ],
        },
        {
            question: Dot("XML-JSON-Difference-013", "What is the difference between XML and JSON?"),
            answer: (
                <p>
                    {Dot("XML-JSON-Diff-Structure-014", "XML uses verbose, hierarchical tags for structure, while JSON relies on key-value pairs and arrays. Example: XML {0} vs. JSON {1}.",
                        `<root><item>value</item></root>`,
                        `{ "root": { "item": "value" } }`
                    )}
                    <br />
                    {Dot("XML-JSON-Diff-Syntax-015", "XML has a stricter syntax with closing tags and attributes, whereas JSON's syntax is lighter and closer to JavaScript object notation. JSON is generally considered easier to parse and transmit over the web.")}
                </p>
            ),
            links: [
                {
                    name: Dot("Diff-XML-JSON-Article", "Difference Between XML and JSON"),
                    link: "https://www.diffen.com/difference/XML_vs_JSON",
                },
            ],
        },
        {
            question: Dot("XML-Advantages-016", "What are the advantages of using XML?"),
            answer: (
                <p>
                    {Dot("XML-Advantage-Standardized-017", "XML is a widely adopted standard, making it compatible with various platforms and systems, promoting interoperability and data exchange.")}<br />
                    {Dot("XML-Advantage-Readable-018", "Its human-readable nature allows for easy inspection and debugging, and the ability to define custom structures makes it flexible for multiple use cases.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("XML-Disadvantages-019", "What are some disadvantages of using XML?"),
            answer: (
                <p>
                    {Dot("XML-Disadvantage-Size-020", "XML can be relatively verbose, resulting in larger file sizes compared to alternatives like JSON, which impacts transmission speed and storage requirements.")}<br />
                    {Dot("XML-Processing-Speed-021", "Parsing and generating XML can be slower due to its strict syntax and need for validation, especially when dealing with complex documents.")}
                </p>
            ),
            links: [],
        },
    ];
};