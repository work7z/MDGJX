import AppConstants from "@/AppConstants"
import { useMDParams } from "@/containers/SideBar"
import XToolsViewer from "@/containers/XToolsViewer"
import { toolsNavInfo } from "@/toolsNavInfo"
import { Tabs } from "@mantine/core"
import React from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

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
    return <div key={mainSubModuleItem.id} className="flex flex-col" style={{
        height: `calc(${AppConstants.calcMainBodyHeight})`,
    }}>
        <Tabs className="py-2" variant="pills" value={idx} onChange={e => {
            // setIdx(e + "")
        }}>
            <Tabs.List >
                {
                    (subTools || []).map(x => {
                        return (
                            <Link to={`/tools/${mainSubModuleItem.id}/${x.id}`}>
                                <Tabs.Tab value={x.id + ''} >
                                    {x.name}
                                </Tabs.Tab>
                            </Link>
                        )
                    })
                }
            </Tabs.List>
        </Tabs>
        <XToolsViewer key={mainSubModuleItem.id} toolId={idx} />
    </div>
}

export default () => {
    return <InnerXToolsDetail />
}