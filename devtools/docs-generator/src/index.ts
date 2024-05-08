import fs from "fs";
import path from "path";
import { fn as CHANGELOG_Converter } from "./converters/CHANGELOG_convertor";
export type FnInternalConverter = (content: string, lang: string) => string;
export type FileInfo = {
  root: boolean;
  fileName: string;
  noGenerateText?: boolean;
  comments: string;
  destinations: string[];
  interalConvertor?: FnInternalConverter;
};

let markdownFiles: FileInfo[] = [
  {
    root: true,
    fileName: "README.md",
    comments: "This is the main file",
    destinations: ["/docs"],
  },
  {
    root: true,
    fileName: "SECURITY.md",
    comments: "This is the security file",
    destinations: ["/docs"],
  },
  {
    root: false,
    fileName: "CONTRIBUTION.md",
    comments: "This is the contribution file",
    destinations: ["/docs"],
  },
  {
    root: false,
    fileName: "FAQ.md",
    comments: "This is the FAQ file",
    destinations: ["/docs"],
  },
  {
    root: false,
    noGenerateText: true,
    fileName: "CHANGELOG.md",
    comments: "This is the CHANGELOG file",
    destinations: ["/docs"],
    interalConvertor: CHANGELOG_Converter,
  },
];

export default markdownFiles;
