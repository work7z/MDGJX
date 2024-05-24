import LoadableWrapper from "@/components/LoadableWrapper";
import { Card, Tabs, rem } from "@mantine/core"
import { IconDatabaseExport, IconFileInfinity, IconGitCompare, IconInfinity, IconLayersIntersect, IconMessageCircle, IconOutlet, IconPhoto, IconSettings, IconTransform, IconTransformFilled } from "@tabler/icons-react"
import { Switch } from "react-router";
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
            name: '格式转换',
            id: 'conversion',
            icon: IconTransformFilled,
            loadFN: () => import('./JSONConversion.tsx')
        },
        {
            name: '格式提取',
            id: 'export',
            icon: IconOutlet,
            loadFN: () => import('./JSONExport.tsx')
        },
        {
            name: '差异对比',
            id: 'comparison',
            icon: IconFileInfinity,
            loadFN: () => import('./JSONDiff.tsx')
        },
    ]
    return (
        <Card p={0} withBorder style={{
            minHeight: 'calc(100vh - 85px)'
        }}>
            <Tabs defaultValue="conversion">
                <Tabs.List>
                    {
                        items.map(x => {
                            return (
                                <Tabs.Tab value={x.id} leftSection={<x.icon style={iconStyle} />}>
                                    {x.name}
                                </Tabs.Tab>
                            )
                        })
                    }
                </Tabs.List>

                {
                    items.map(x => {
                        return (
                            <Tabs.Panel value={x.id}>
                                <LoadableWrapper fn={x.loadFN} />
                            </Tabs.Panel>
                        )
                    })
                }
            </Tabs>
        </Card>
    )
}