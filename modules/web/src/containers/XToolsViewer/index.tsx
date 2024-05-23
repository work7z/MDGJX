import { useDarkModeOrNot } from "@/components/ColorSchemeToggle/ColorSchemeToggle"
import { FrameWrapper } from "../FrameWrapper"
import { isDevEnv } from "@/env"
import AppConstants from "@/AppConstants"
import { Card } from "@mantine/core"
import queryString from "query-string"

export default (props: {
    toolId: string
}) => {
    const isDark = useDarkModeOrNot()
    const baseURL_for_ITTools = '/xtools/'
    const itToolsBaseURL = (
        isDevEnv() ? 'http://localhost:5174' : ''
    ) + baseURL_for_ITTools + props.toolId //'uuid-generator'
    const itToolsFullURL = itToolsBaseURL + '?' + queryString.stringify({
        sysdarkmode: isDark
    })
    return <div className="flex-1">
        <Card className=" flex flex-col " withBorder style={{
            padding: 0,
            height: AppConstants.smallDevice ? '150vh' : '100%'
        }}>
            <FrameWrapper src={
                itToolsFullURL
            } />
        </Card >
    </div>
}