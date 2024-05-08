
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import FromFn from "./conversion/FromHex.tsx";
import ToFn from "./conversion/ToHex.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "LSohY6eZW",
                "Hex String is a string of hexadecimal bytes separated by a delimiter, which can be a space, comma, semi-colon, or colon."
            ),
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "FromHex",
                "ToHex",
            ]
        )
    }
}