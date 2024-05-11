// LafTools
// 
// Date: Sun, 21 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { LabelValuePair } from "@/app/[lang]/client/src/types/constants";


// align scope begin
export type PopularLanguages = "node.js" | "python" | "java" | "csharp" | "cpp" | "php" | "go" | "rust" | "c" | "ruby" | "swift" | "kotlin" | "scala" | "perl";

export const program_languages: LabelValuePair[] = [
    { label: "Java", value: "java" },
    { label: "Node.js", value: "node.js" },
    { label: "Python", value: "python" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
    { label: "PHP", value: "php" },
    { label: "Go", value: "go" },
    { label: "Rust", value: "rust" },
    { label: "C", value: "c" },
    { label: "Ruby", value: "ruby" },
    { label: "Swift", value: "swift" },
    { label: "Kotlin", value: "kotlin" },
    { label: "Scala", value: "scala" },
    { label: "Perl", value: "perl" },
]

// align scope end

export type CodeImplDetail = {
    template: string,
    howToRunItTips: JSX.Element
    links?: { link: string, name: string }[]
}

export type CodeImplMap = {
    [key in PopularLanguages]: CodeImplDetail
}