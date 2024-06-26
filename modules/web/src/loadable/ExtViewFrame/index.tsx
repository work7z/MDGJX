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
    ) + '?' + queryString.stringify({
        sysdarkmode: isDark,
        ...(subItem.moduleItemQuery || {})
    }) + (
            subItem.moduleItemHashVal ? '#' + (subItem.moduleItemHashVal) : ''
        ) 




    const jsx = <div className="flex-1">
        <Card className=" flex flex-col " withBorder style={{
            padding: 0,
            // height: AppConstants.smallDevice ? '150vh' : '100%'
            height: AppConstants.smallDevice ? '150vh' : '100%'
        }}>
            <FrameWrapper src={
                // `http://127.0.0.1:5173/ext-view/srk/#recipe=Base64%E7%BC%96%E7%A0%81('A-Za-z0-9%2B/%3D')` ||
                // /ext-view/srk/?sysdarkmode=false#recipe=Base64%E7%BC%96%E7%A0%81('A-Za-z0-9+/=')
                // // http://127.0.0.1:5173/ext-view/srk/#recipe=Base64编码('A-Za-z0-9+/=')
                // Base64%E7%BC%96%E7%A0%81('A-Za-z0-9%2B%3D')

                (itToolsFullURL)
            } />
        </Card >
    </div>
    return <div key={subItem.id} className="flex flex-col" style={{
        height: `calc(${AppConstants.calcMainBodyHeight})`,
    }}>
        {jsx}
        {/* <a href={itToolsFullURL} target="_blank">{itToolsFullURL}</a> */}
    </div>
}