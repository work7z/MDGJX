import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            hideFAQPanel: true,
            exampleType: "css-short",
            description: Dot(
                "jsonescapeandunescape",
                "Escapes and unescapes JSON string, making it safe to include in a URL query."
            ),
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "JSONEscape",
                "JSONUnescape",
            ]
        )
    }
}