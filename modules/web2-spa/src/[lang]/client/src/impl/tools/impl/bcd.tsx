
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import Operation from "../../core/Operation.tsx";
import FromBCD from "./conversion/FromBCD.tsx";
import TOBCD from "./conversion/ToBCD.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "6cOPZ",
                "Binary-Coded Decimal (BCD) is a class of binary encodings of decimal numbers where each decimal digit is represented by a fixed number of bits, usually four or eight. Special bit patterns are sometimes used for a sign"
            ),
        }
    }
    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "ToBCD",
                "FromBCD",
            ]
        )
    }
}