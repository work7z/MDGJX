import AppConstants from "@/AppConstants"
import { useWrapWithTitle } from "@/containers/Layout/Layout"
import LoadableWrapper from "@/components/LoadableWrapper"
import XToolsViewer from "@/containers/XToolsViewer"
import { Tabs } from "@mantine/core"
import React from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { useMDParams } from "@/systemHooks"
import { NotFoundPage } from "@/pages/NotFound.page"

const InnerXToolsDetail = () => {
    // const {
    //    rootModuleItem : mainModuleItem,
    //     subModuleItem: mainSubModuleItem,
    //     secondRouteId: tmp_mainSubToolID
    // } = useMDParams()
    // const history = useHistory()
    // if(
    //     !mainModuleItem 
    //     || !mainSubModuleItem
    // ){
    //     return <NotFoundPage/>
    // }
    // const findItem = toolsNavInfo.find(x => x.id === mainSubModuleItem.id)
    // const subTools = findItem?.subTools || []
    // const subToolId = tmp_mainSubToolID ? tmp_mainSubToolID : (subTools && subTools[0] && subTools[0].id || "")
    // if (findItem?.bodyFnIfHave) {
    //     return <LoadableWrapper id={'meandu' + findItem.id} fn={findItem.bodyFnIfHave} key={'meandu' + findItem.id} />
    // }
    // return <div key={mainSubModuleItem.id} className="flex flex-col" style={{
    //     height: `calc(${AppConstants.calcMainBodyHeight})`,
    // }}>
    //     <XToolsViewer key={mainSubModuleItem.id} toolId={subToolId} />
    // </div>
    return <div>
        not working
    </div>
}

export default () => {
    return <InnerXToolsDetail />
}