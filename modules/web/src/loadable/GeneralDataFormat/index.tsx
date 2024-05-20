import AppConstants from "@/AppConstants"
import { useDarkModeOrNot } from "@/components/ColorSchemeToggle/ColorSchemeToggle"
import { FrameWrapper } from "@/containers/FrameWrapper"
import { isDevEnv } from "@/env"
import { Card, useMantineTheme } from "@mantine/core"
import queryString from "query-string"

export default () => {
    const baseURL_for_ITTools = '/xtools/'
    const isDark = useDarkModeOrNot()
    const itToolsBaseURL = (
        isDevEnv() ? 'http://localhost:5174' : ''
    ) + baseURL_for_ITTools
    return <div>
        <Card className=" flex flex-col " withBorder style={{
            height: AppConstants.calcMainBodyHeight,
            padding: 0
        }}>
            <FrameWrapper src={
                itToolsBaseURL + '?' + queryString.stringify({
                    sysdarkmode: isDark
                })
            } />
        </Card >
    </div >
}   