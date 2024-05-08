
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import yaml from "./conversion/YAMLBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";



// export other for yaml 
export default class YamlHandler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideFAQPanel: true,
            exampleType: "text-short",
            description: Dot(
                "0MO3jj.yaml",
                "YAML (YAML Ain't Markup Language) is a human-readable data serialization format that takes concepts from programming languages such as C, Perl, and Python, and ideas from XML and the data format of electronic mail (RFC 2822)."
            ),
            hideCodePanel: true,
        }
    }
    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "YAMLBeautify",
            ]
        )
    }
}