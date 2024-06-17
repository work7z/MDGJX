import localApiSlice from "@/store/reducers/localApiSlice"
import exportUtils from "@/utils/ExportUtils"
import { Title } from "@mantine/core"

export default ()=>{
    const rh = exportUtils.register('mppreviewext', {
        getNotPersistedStateFn() {
            return {
                searchText: ''
            }
        },
        getPersistedStateFn() {
            return {}
        }
    })

    const extListRes = localApiSlice.useGetExtListWithSearchQuery({
        searchText: rh?.npState?.searchText || '',
    }, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 1000 * 60 * 10,
    })

    if (!rh) {
        return ''
    }
    
    return <div>
        <div>
            <Title order={3}>插件配置(Setup)</Title>
            <div>
                
            </div>
        </div>
        <div>
            <Title order={3}>插件预览(Preview)</Title>
        </div>
    </div>
}