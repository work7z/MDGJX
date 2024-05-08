
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import FromBase45 from "./conversion/FromBase45.tsx";
import ToBase45 from "./conversion/ToBase45.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "ciZV21",
                "Base45 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. The high number base results in shorter strings than with the decimal or hexadecimal system. Base45 is optimized for usage with QR codes.",
            ),
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "ToBase45",
                "FromBase45",
            ]
        )
    }
}