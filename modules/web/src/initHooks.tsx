import localApiSlice from "./store/reducers/localApiSlice"
import exportUtils from "./utils/ExportUtils"

export const useSystemInitFunc = () => {
    const devConfig_usingLocalExtViewConfig = exportUtils.useSelector(v => v.settings.devConfig_usingLocalExtViewConfig)
    const fullInfoQuery = localApiSlice.useGetFullInfoQuery({
        env: devConfig_usingLocalExtViewConfig ? 'local-config' : 'cloud-config'
    }, {
        refetchOnMountOrArgChange: true
    })
}