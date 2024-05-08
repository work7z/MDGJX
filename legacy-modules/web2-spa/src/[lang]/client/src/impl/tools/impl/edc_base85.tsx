
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import FromBase85 from "./conversion/FromBase85.tsx";
import ToBase85 from "./conversion/ToBase85.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "LU9Jj",
                "Base85 (also called Ascii85) is a notation for encoding arbitrary byte data. It is usually more efficient that Base64.This operation decodes data from an ASCII string (with an alphabet of your choosing, presets included). Base85 is commonly used in Adobe's PostScript and PDF file formats."
            ),
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "ToBase85",
                "FromBase85",
            ]
        )
    }
}