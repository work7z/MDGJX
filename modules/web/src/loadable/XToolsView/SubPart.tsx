import XToolsViewer from "@/containers/XToolsViewer"
import { HeroText } from "./HeroText"
import { Tabs } from "@mantine/core"
import { toolsNavInfo } from "@/toolsNavInfo"
import React from "react"
import { IconAperture } from "@tabler/icons-react"

export default () => {
    const [idx, setIdx] = React.useState(toolsNavInfo[0].id)
    return (
        <Tabs value={idx} onChange={e => {
            setIdx(e + "")
        }}>
            <Tabs.List>
                {
                    toolsNavInfo.map(x => {
                        return (
                            <Tabs.Tab value={x.id} >
                                {x.name}
                            </Tabs.Tab>
                        )
                    })
                }
            </Tabs.List>
        </Tabs>
    )
}