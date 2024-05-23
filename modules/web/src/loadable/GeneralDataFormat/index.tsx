import AppConstants from "@/AppConstants"
import { useDarkModeOrNot } from "@/components/ColorSchemeToggle/ColorSchemeToggle"
import { FrameWrapper } from "@/containers/FrameWrapper"
import { isDevEnv } from "@/env"
import { Card, useMantineTheme } from "@mantine/core"
import queryString from "query-string"

export default () => {
    const isDark = useDarkModeOrNot()
    const baseURL_for_ITTools = '/xtools/'
    const itToolsBaseURL = (
        isDevEnv() ? 'http://localhost:5174' : ''
    ) + baseURL_for_ITTools
    const itToolsFullURL = itToolsBaseURL + '?' + queryString.stringify({
        sysdarkmode: isDark
    })
    return <div>
        <Card className=" flex flex-col " withBorder style={{
            height: `calc(${AppConstants.calcMainBodyHeight})`,
            padding: 0
        }}>
            <FrameWrapper src={
                itToolsFullURL
            } />
        </Card >
    </div >
}   