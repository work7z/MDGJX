// LafTools
// 
// Date: Fri, 26 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("styLo0qmH");

export default (): FAQItem[] => {
    return [
        {
            question: Dot("CSS-Tech-History-001", "What is CSS?"),
            answer: (
                <p>
                    {Dot("CSS-Def-002", "CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a document written in HTML or XML.")}<br />
                    {Dot("CSS-Purpose-003", "It allows developers to separate content from presentation, defining styles such as layout, colors, and fonts, making web pages visually appealing and consistent across different devices and screens.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("CSS-History-004", "What is the history of CSS?"),
            answer: (
                <p>
                    {Dot("CSS-Hist-Origin-005", "CSS was first proposed by Håkon Wium Lie in October 1994 and became an official W3C Recommendation in December 1996 with CSS1.")}<br />
                    {Dot("CSS-Evolution-006", "Since then, it has evolved through CSS2 (1998), CSS2.1 (2007), CSS3 (ongoing development), introducing features like selectors, animations, responsive design, and more.")}
                </p>
            ),
            links: [
                {
                    name: Dot("CSS-History-W3C", "W3C CSS Recommendations Timeline"),
                    link: "https://www.w3.org/TR/CSS/#css",
                },
            ],
        },
        {
            question: Dot("CSS-Usage-007", "How do I use CSS in my web projects?"),
            answer: (
                <p>
                    {Dot("CSS-Usage-Basics-008", "To use CSS, you create a separate file (e.g., style.css) containing your styles, then link it to your HTML file using the <link> element within the <head> section.")}<br />
                    <code>&lt;link rel="stylesheet" href="style.css"&gt;</code><br />
                    {Dot("CSS-Usage-Inline-009", "Alternatively, you can include inline styles directly in HTML elements using the 'style' attribute or embed CSS in the <style> tag inside the <head> section.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("CSS-Advantages-010", "What are the advantages of using CSS?"),
            answer: (
                <p>
                    {Dot("CSS-Advantages-Separation-011", "One advantage is the separation of concerns between content and presentation, which improves maintainability and scalability of websites.")}<br />
                    {Dot("CSS-Advantages-Customization-012", "Another advantage is its ability to customize the look and feel of multiple pages at once, saving time and effort when updating site-wide styles.")}
                </p>
            ),
            links: [],
        },

        {
            question: Dot("CSS-Disadvantages-013", "What are some disadvantages of CSS?"),
            answer: (
                <p>
                    {Dot("CSS-Disadvantages-Cascade-014", "One challenge is managing the cascading nature of styles, which can sometimes lead to unexpected inheritance and specificity issues.")}<br />
                    {Dot("CSS-Disadvantages-Browser-Compat-015", "Another issue is cross-browser compatibility, as different browsers may interpret CSS rules differently. This requires developers to use vendor prefixes or feature detection techniques for consistent rendering across browsers.")}
                </p>
            ),
            links: [
                {
                    name: Dot("CSS-Vendor-Prefixes", "MDN Guide on Vendor Prefixes"),
                    link: "https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix",
                },
            ],
        },
        {
            question: Dot("CSS-Key-Features-016", "What are some key features in CSS?"),
            answer: (
                <p>
                    {Dot("CSS-Selectors-017", "Selectors allow targeting specific HTML elements based on their type, class, ID, attributes, and more.")}<br />
                    {Dot("CSS-Layouts-018", "Flexbox and Grid layout systems provide powerful tools for creating responsive and flexible page layouts.")}<br />
                    {Dot("CSS-Animations-Transitions-019", "CSS Animations and Transitions enable smooth visual effects without requiring JavaScript.")}
                </p>
            ),
            links: [
                {
                    name: Dot("CSS-W3C-Selectors", "W3C Selectors Level 4 Spec"),
                    link: "https://www.w3.org/TR/selectors-4/",
                },
                {
                    name: Dot("CSS-MDN-Flexbox", "MDN Guide to Flexbox"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout",
                },
                {
                    name: Dot("CSS-MDN-Grid", "MDN Guide to CSS Grid"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
                },
                {
                    name: Dot("CSS-MDN-Animations", "MDN Guide to CSS Animations"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations",
                },
            ],
        },
        {
            question: Dot("CSS-Future-020", "What's the future of CSS technology?"),
            answer: (
                <p>
                    {Dot("CSS-Future-Progress-021", "The CSS Working Group continues to work on new modules such as CSS Variables (Custom Properties), Houdini, and Container Queries.")}<br />
                    {Dot("CSS-Future-Houdini-022", "Houdini, for instance, aims to provide low-level APIs for customizing the browser's rendering process, empowering developers with unprecedented control over styling and layout.")}
                </p>
            ),
            links: [
                {
                    name: Dot("CSS-WG-Future-Modules", "W3C CSS Current Work"),
                    link: "https://www.w3.org/Style/CSS/current-work",
                },
                {
                    name: Dot("CSS-MDN-Houdini", "MDN Introduction to Houdini"),
                    link: "https://developer.mozilla.org/en-US/docs/Web/Houdini",
                },
            ],
        },
    ];
};