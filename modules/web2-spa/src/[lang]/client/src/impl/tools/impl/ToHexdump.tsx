import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class HexDumpHandler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideFAQPanel: true,
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "kRvYRzTAF",
                "Converts binary data to Hexdump and vice versa."
            ),
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "ToHexdump",
                "FromHexdump",
            ]
        )
    }
}