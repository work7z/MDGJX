import LoadableWrapper from "@/components/LoadableWrapper";
import { Card, Tabs, rem } from "@mantine/core"
import { IconDatabaseExport, IconFileInfinity, IconGitCompare, IconInfinity, IconLayersIntersect, IconMessageCircle, IconOutlet, IconPhoto, IconSettings, IconTransform, IconTransformFilled } from "@tabler/icons-react"
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

export type JSONTypeItem = {
    name: string,
    id: string,
    icon: any,
    loadFN: any
}
export default () => {

    const iconStyle = { width: rem(12), height: rem(12) };
    const items: JSONTypeItem[] = [
        {
            name: 'JSON格式转换',
            id: 'conversion',
            icon: IconTransformFilled,
            loadFN: () => import('./JSONConversion.tsx')
        },
        // {
        //     name: 'JSON格式提取',
        //     id: 'export',
        //     icon: IconOutlet,
        //     loadFN: () => import('./JSONExport.tsx')
        // },
        {
            name: 'JSON差异对比',
            id: 'comparison',
            icon: IconFileInfinity,
            loadFN: () => import('./JSONDiff.tsx')
        },
    ]
    const hVal = 'calc(100vh - 85px)'
    return (
        <Card p={0} withBorder style={{
            minHeight: hVal,
            height: hVal
        }}>
            <Tabs defaultValue={items[0].id} className="h-full flex flex-col">
                <Tabs.List>
                    {
                        items.map(x => {
                            return (
                                <Tabs.Tab className="h-[35px]" value={x.id} leftSection={<x.icon style={iconStyle} />}>
                                    {x.name}
                                </Tabs.Tab>
                            )
                        })
                    }
                </Tabs.List>
                {
                    items.map(x => {
                        return (
                            <Tabs.Panel value={x.id} className="flex-1 overflow-auto">
                                <LoadableWrapper fn={x.loadFN} />
                            </Tabs.Panel>
                        )
                    })
                }
            </Tabs>
        </Card>
    )
}