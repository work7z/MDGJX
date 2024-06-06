import { useHistory } from "react-router"
import { ROUTE_CPT_MAPPING, SystemModuleItem, SystemSubModuleItem, systemModulesList } from "./systemModules"
import { useMemo } from "react"

export type TypeMDParams = {
    rootModuleItem: SystemModuleItem,
    subModuleItem: SystemSubModuleItem,
    firstRouteId: string
    secondRouteId: string
    thirdRouteId: string
}
export const useMDParams = (): TypeMDParams => {
    const hist = useHistory()
    return useMemo(() => {
        const splitArr = hist.location.pathname.split('/')
        let url_firstPart: string | undefined = splitArr && splitArr[1]
        let url_secondPart: string | undefined = splitArr && splitArr[2]
        let url_thirdPart: string | undefined = splitArr && splitArr[3]
        let mainSubModuleItem: SystemSubModuleItem | undefined = undefined;
        let dft_mainSubModuleItem: SystemSubModuleItem | undefined = undefined;
        const firstMappingItem = ROUTE_CPT_MAPPING[0]
        for (let eachItem of ROUTE_CPT_MAPPING) {
            if (eachItem.firstRouteId == url_firstPart) {
                if (!dft_mainSubModuleItem) {
                    dft_mainSubModuleItem = eachItem
                }
                if (eachItem.id == url_secondPart) {
                    mainSubModuleItem = eachItem;
                }
            }
        }
        let finalSubModuleItem = (mainSubModuleItem || dft_mainSubModuleItem)
        if(!finalSubModuleItem){
            finalSubModuleItem = firstMappingItem
        }
        const foundSystemModuleItem = systemModulesList.find(x => x.id == finalSubModuleItem.rootMainModuleId)
        url_firstPart = finalSubModuleItem.firstRouteId+''
        url_secondPart = finalSubModuleItem.id
        const r = {
            rootModuleItem: foundSystemModuleItem as SystemModuleItem,
            subModuleItem: finalSubModuleItem,
            firstRouteId: url_firstPart,
            secondRouteId: url_secondPart,
            thirdRouteId: url_thirdPart
        } satisfies TypeMDParams
        console.log('mdparams',r)
        return r
    }, [hist.location.pathname])
}
