import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class JSONToCSVHandler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideFAQPanel: true,
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "96ue2PVdh",
                "Converts JSON data to a CSV based on the definition in RFC 4180."
            ),
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "JSONToCSV",
                "CSVToJSON"
            ]
        )
    }
}