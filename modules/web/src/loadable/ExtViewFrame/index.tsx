import AppConstants from "@/AppConstants";
import { useDarkModeOrNot } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { FrameWrapper } from "@/containers/FrameWrapper";
import { MiaodaConfig } from "@/store/reducers/localApiSlice"
import { SystemSubModuleItem } from "@/systemModules";
import { Card } from "@mantine/core";
import queryString from "query-string";


export default (props: {
    fn_subItem: () => SystemSubModuleItem
    fn_eachConfig: () => MiaodaConfig
}) => {
    const { fn_eachConfig, fn_subItem } = props;
    const config = fn_eachConfig()
    const subItem = fn_subItem()
    const isDark = useDarkModeOrNot()
    const baseurl = subItem.moduleItemtURL
    const itToolsFullURL = (
        baseurl
    )     + '?' + queryString.stringify({
        sysdarkmode: isDark
    })

    const jsx = <div className="flex-1">
        <Card className=" flex flex-col " withBorder style={{
            padding: 0,
            // height: AppConstants.smallDevice ? '150vh' : '100%'
            height: AppConstants.smallDevice ? '150vh' : '100%'
        }}>
            <FrameWrapper src={
                itToolsFullURL
            } />
        </Card >
    </div>
    return <div key={subItem.id} className="flex flex-col" style={{
        height: `calc(${AppConstants.calcMainBodyHeight})`,
    }}>
        {jsx}
    </div>
}