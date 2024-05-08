import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class HexDumpHandler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideFAQPanel: true,
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "lTmHBSlw8",
                "Converts Hexdump to binary data and vice versa."
            ),
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "FromHexdump",
                "ToHexdump"
            ]
        )
    }
}