import AppConstants from "@/AppConstants"
import { useMDParams } from "@/containers/SideBar"
import XToolsViewer from "@/containers/XToolsViewer"
import { toolsNavInfo } from "@/toolsNavInfo"
import { Tabs } from "@mantine/core"
import React from "react"
import { useHistory } from "react-router"

const InnerXToolsDetail = () => {
    const {
        mainModuleItem,
        mainSubModuleItem,
        mainSubToolID: tmp_mainSubToolID
    } = useMDParams()
    const subTools = toolsNavInfo.find(x => x.id === mainSubModuleItem.id)?.subTools || []
    const idx = tmp_mainSubToolID ? tmp_mainSubToolID : (subTools && subTools[0] && subTools[0].id || "")
    const history = useHistory()
    const setIdx = (x: string) => {
        history.push(`/tools/${mainSubModuleItem.id}/${x}`)
    }
    return <div key={mainModuleItem.id} className="flex flex-col" style={{
        height: `calc(${AppConstants.calcMainBodyHeight})`,
    }}>
        <Tabs className="py-2" variant="pills" value={idx} onChange={e => {
            setIdx(e + "")
        }}>
            <Tabs.List >
                {
                    (subTools || []).map(x => {
                        return (
                            <Tabs.Tab value={x.id + ''} >
                                {x.name}
                            </Tabs.Tab>
                        )
                    })
                }
            </Tabs.List>
        </Tabs>
        <XToolsViewer toolId={idx} />
    </div>
}

export default () => {
    return <InnerXToolsDetail />
}