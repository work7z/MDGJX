
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import FromBase62 from "./conversion/FromBase62.tsx";
import ToBase62 from "./conversion/ToBase62.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "AVUvu",
                "Base62 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. The high number base results in shorter strings than with the decimal or hexadecimal system.",
            ),
        }
    }
    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "ToBase62",
                "FromBase62",
            ]
        )
    }
}