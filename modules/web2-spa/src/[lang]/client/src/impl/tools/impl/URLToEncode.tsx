import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class URLENocderHandler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot("gN5ihdIY8e", "Encodes problematic characters into percent-encoding, a format supported by URIs/URLs.")
        }
    }

    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "URLEncode",
                "URLDecode"
            ]
        )
    }
}