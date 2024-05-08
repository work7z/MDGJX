import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { FAQItem } from "./types";
import React from "react";

loadDOT("SQL-FAQ-20230315");


export default (): FAQItem[] => {
    return [
        {
            question: Dot("SQL-Basics-001", "What is SQL?"),
            answer: (
                <p>
                    {Dot("SQL-Def-002", "SQL (Structured Query Language) is a standard programming language for managing and querying relational databases.")}<br />
                    {Dot("SQL-Purpose-003", "It's used to create, read, update, delete, and query data in tables as well as manage database structure and permissions.")}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("SQL-Components-004", "What are the main components of SQL?"),
            answer: (
                <p>
                    {Dot("SQL-Commands-005", "SQL includes several types of commands: DDL (Data Definition Language - CREATE, ALTER, DROP), DML (Data Manipulation Language - SELECT, INSERT, UPDATE, DELETE), and DCL (Data Control Language - GRANT, REVOKE).")}
                </p>
            ),
            links: [
                {
                    name: Dot("SQL-Components-Wikipedia", "SQL Components on Wikipedia"),
                    link: "https://en.wikipedia.org/wiki/SQL#Language_elements",
                },
            ],
        },
        {
            question: Dot("SQL-Beautify-006", "What is SQL Beautification?"),
            answer: (
                <p>
                    {Dot("SQL-Beautify-Def-007", "SQL beautification is the process of formatting SQL code to improve readability by applying consistent indentation, spacing, and case conventions.")}<br />
                    {Dot("SQL-Beautify-Purpose-008", "Just like generic code beautifiers, it helps developers understand complex queries more easily and maintain consistency across their SQL scripts or projects.")}
                </p>
            ),
            links: [
                // {
                //     name: Dot("SQL-Beautifier-Example", "Online SQL Formatter"),
                //     link: "https://www.freeformatter.com/sql-formatter.html",
                // },
            ],
        },
        {
            question: Dot("SQL-Select-009", "How do I write a basic SELECT statement?"),
            answer: (
                <p>
                    {Dot("SQL-Select-Example-0210", 'A simple SELECT statement retrieves data from a table. For instance: {0}', 'SELECT column1, column2 FROM my_table;')}
                </p>
            ),
            links: [],
        },
        {
            question: Dot("SQL-Joins-011", "What are JOINs in SQL?"),
            answer: (
                <p>
                    {Dot("SQL-Joins-Explanation-012", "JOINs are used to combine rows from two or more tables based on a related column between them. E.g., INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.")}
                </p>
            ),
            links: [
                {
                    name: Dot("SQL-Joins-Tutorial", "SQL Joins Tutorial"),
                    link: "https://www.w3schools.com/sql/sql_join.asp",
                },
            ],
        },
        {
            question: Dot("SQL-Transactions-013", "What are transactions in SQL?"),
            answer: (
                <p>
                    {Dot("SQL-Transactions-Def-014", "A transaction is a logical unit of work that contains one or more SQL statements. It ensures that all operations within it are completed successfully (atomicity), isolated from other transactions, and durable even in case of system failure.")}<br />
                    {Dot("SQL-Transactions-Example-015", 'To start a transaction, use the START TRANSACTION command; commit changes with COMMIT or rollback to the previous state with ROLLBACK.')}
                </p>
            ),
            links: [
                {
                    name: Dot("SQL-Transactions-W3Schools", "SQL Transactions on W3Schools"),
                    link: "https://www.w3schools.com/sql/sql_transactions.asp",
                },
            ],
        },
        {
            question: Dot("SQL-Indexing-016", "What are indexes in SQL and why are they important?"),
            answer: (
                <p>
                    {Dot("SQL-Indexing-Explanation-017", "Indexes are data structures (e.g., B-trees) that improve the speed of data retrieval operations in a table by allowing the database engine to quickly locate rows based on specific column values.")}<br />
                    {Dot("SQL-Indexing-Benefit-018", "Creating an index on frequently used columns for WHERE clause conditions significantly speeds up SELECT queries but can slow down INSERT, UPDATE, and DELETE operations due to the need to maintain the index structure.")}
                </p>
            ),
            links: [
                {
                    name: Dot("SQL-Indexing-MDN", "MDN Web Docs on Indexes"),
                    link: "https://developer.mozilla.org/en-US/docs/Glossary/Index_(database)",
                },
            ],
        },
        {
            question: Dot("SQL-Injection-019", "What is SQL Injection and how can it be prevented?"),
            answer: (
                <p>
                    {Dot("SQL-Injection-Def-020", "SQL Injection is a security vulnerability where an attacker can insert malicious SQL code into input fields to manipulate or extract data from a database.")}<br />
                    {Dot("SQL-Injection-Prevention-021", "Prevention methods include using parameterized queries, prepared statements, or ORM libraries that automatically escape user input, as well as limiting database permissions and applying least privilege principles.")}
                </p>
            ),
            links: [
                {
                    name: Dot("OWASP-SQL-Injection", "OWASP SQL Injection Guide"),
                    link: "https://owasp.org/www-community/attacks/SQL_Injection",
                },
            ],
        },
        {
            question: Dot("SQL-Performance-Tuning-022", "How do I optimize SQL query performance?"),
            answer: (
                <p>
                    {Dot("SQL-Perf-Tuning-Overview-023", "Optimizing SQL query performance involves analyzing execution plans, indexing appropriately, minimizing unnecessary joins and subqueries, and writing efficient WHERE clauses.")}<br />
                    {Dot("SQL-Perf-Tuning-Methods-024", "Other techniques include partitioning large tables, using appropriate data types, and caching results when feasible.")}
                </p>
            ),
            links: [
                {
                    name: Dot("MySQL-Performance-Tuning", "MySQL Performance Tuning Tips"),
                    link: "https://dev.mysql.com/doc/refman/8.0/en/performance-tuning.html",
                },
            ],
        },
    ];
};