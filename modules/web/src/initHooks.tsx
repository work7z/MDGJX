import extViewSlice from "./store/reducers/extViewApiSlice"
import exportUtils from "./utils/ExportUtils"

export const useSystemInitFunc = () => {
    const devConfig_usingLocalExtViewConfig = exportUtils.useSelector(v => v.settings.devConfig_usingLocalExtViewConfig)
    const a = extViewSlice.useGetFullInfoQuery({
        env: devConfig_usingLocalExtViewConfig ? 'local-config' : 'cloud-config'
    }, {
        refetchOnMountOrArgChange: true
    })
}