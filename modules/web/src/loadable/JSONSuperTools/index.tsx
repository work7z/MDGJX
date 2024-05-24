import LoadableWrapper from "@/components/LoadableWrapper";
import { Card, Tabs, rem } from "@mantine/core"
import { IconGitCompare, IconLayersIntersect, IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react"

export default () => {

    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <Card p={0} withBorder style={{
            minHeight: 'calc(100vh - 85px)'
        }}>
            <Tabs defaultValue="conversion">
                <Tabs.List>
                    <Tabs.Tab value="conversion" leftSection={<IconLayersIntersect style={iconStyle} />}>
                        格式转换
                    </Tabs.Tab>
                    <Tabs.Tab value="comparison" leftSection={<IconGitCompare style={iconStyle} />}>
                        差异对比
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="conversion">
                    <LoadableWrapper fn={() => import('./JSONConversion.tsx')} />
                </Tabs.Panel>

                <Tabs.Panel value="comparison">
                    <LoadableWrapper fn={() => import('./JSONDiff.tsx')} />
                </Tabs.Panel>
            </Tabs>
        </Card>
    )
}