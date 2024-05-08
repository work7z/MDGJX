import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/JavaScriptMinify.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "js-short",
            description: Dot(
                "bsWpBA73s",
                "Compresses JavaScript code.",
            ),
        }
    }
    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "JavaScriptMinify",
            ]
        )
    }
}