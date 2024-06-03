import { useHistory } from "react-router"
import { ROUTE_CPT_MAPPING, SystemModuleItem, SystemSubModuleItem, systemModulesList } from "./systemModules"
import { useMemo } from "react"

export type TypeMDParams = {
    mainModuleItem: SystemModuleItem,
    mainSubModuleItem: SystemSubModuleItem,
    mainModuleId: string
    subModuleId: string
}
export const useMDParams = (): TypeMDParams => {
    const hist = useHistory()
    return useMemo(() => {
        const splitArr = hist.location.pathname.split('/')
        let tmp_mainModuleId: string | undefined = splitArr && splitArr[1]
        let tmp_mainSubToolsID: string | undefined = splitArr && splitArr[2]
        let mainSubModuleItem: SystemSubModuleItem | undefined = undefined;
        let dft_mainSubModuleItem: SystemSubModuleItem | undefined = undefined;
        const firstMappingItem = ROUTE_CPT_MAPPING[0]
        for (let eachItem of ROUTE_CPT_MAPPING) {
            if (eachItem.firstRouteId == tmp_mainModuleId) {
                if (!dft_mainSubModuleItem) {
                    dft_mainSubModuleItem = eachItem
                }
                if (eachItem.id == tmp_mainSubToolsID) {
                    mainSubModuleItem = eachItem;
                }
            }
        }
        let finalSubModuleItem = (mainSubModuleItem || dft_mainSubModuleItem)
        if(!finalSubModuleItem){
            finalSubModuleItem = firstMappingItem
        }
        const foundSystemModuleItem = systemModulesList.find(x => x.id == finalSubModuleItem.rootMainModuleId)
        tmp_mainModuleId = finalSubModuleItem.firstRouteId+''
        tmp_mainSubToolsID = finalSubModuleItem.id
        return {
            mainModuleItem: foundSystemModuleItem as SystemModuleItem,
            mainSubModuleItem: finalSubModuleItem,
            mainModuleId: tmp_mainModuleId,
            subModuleId: tmp_mainSubToolsID
        } satisfies TypeMDParams
    }, [hist.location.pathname])
}
