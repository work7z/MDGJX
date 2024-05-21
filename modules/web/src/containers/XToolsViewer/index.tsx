import { useDarkModeOrNot } from "@/components/ColorSchemeToggle/ColorSchemeToggle"
import { FrameWrapper } from "../FrameWrapper"
import { isDevEnv } from "@/env"
import AppConstants from "@/AppConstants"
import { Card } from "@mantine/core"
import queryString from "query-string"

export default () => {
    const isDark = useDarkModeOrNot()
    const baseURL_for_ITTools = '/xtools/'
    const itToolsBaseURL = (
        isDevEnv() ? 'http://localhost:5174' : ''
    ) + baseURL_for_ITTools + 'uuid-generator'
    const itToolsFullURL = itToolsBaseURL + '?' + queryString.stringify({
        sysdarkmode: isDark
    })
    return <div>
        <Card className=" flex flex-col " withBorder style={{
            height: AppConstants.calcMainBodyHeight,
            padding: 0
        }}>
            <FrameWrapper src={
                itToolsFullURL
            } />
        </Card >
    </div>
}