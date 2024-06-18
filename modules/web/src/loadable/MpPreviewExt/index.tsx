import localApiSlice from "@/store/reducers/localApiSlice"
import exportUtils from "@/utils/ExportUtils"
import { Button, Card, NativeSelect, Tabs, Title, rem } from "@mantine/core"
import { IconAppWindow, IconBrandBlogger, IconMacro, IconMessage, IconMessageCircle, IconPhoto, IconRun, IconSettings } from "@tabler/icons-react"

export default () => {
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
    const iconStyle = { width: rem(12), height: rem(12) };

    if (!rh) {
        return ''
    }

    return <div className="flex flex-row space-x-2">
        <div className="flex-1">
            <Card withBorder className="w-full h-[calc(100vh-90px)]">
                <div className="w-full h-full ">
                    <Tabs defaultValue="gallery">
                        <Tabs.List>
                            <Tabs.Tab value="gallery" leftSection={<IconAppWindow style={iconStyle} />}>
                                主界面
                            </Tabs.Tab>
                            <Tabs.Tab value="messages" leftSection={<IconMessage style={iconStyle} />}>
                                初始化日志
                            </Tabs.Tab>
                            <Tabs.Tab value="settings" leftSection={<IconMessage style={iconStyle} />}>
                                服务日志
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="gallery">
                            Gallery tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="messages">
                            Messages tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="settings">
                            Settings tab content
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </Card>
        </div>
        <div className="w-[350px]">
            <Card withBorder>
                <div className="space-y-2">
                    <NativeSelect label="目标插件" description="选择需要预览的插件名" data={['React', 'Angular', 'Vue']} />
                    <NativeSelect label="插件 - 预览模块" description="选择需要预览的目标模块" data={['React', 'Angular', 'Vue']} />
                </div>
                <div className="mt-4  ">
                    {
                        [
                            {
                                label: '刷新插件',
                                color: 'green'
                            },
                            {
                                label: '初始化',
                            },
                            {
                                label: '启动服务'
                            },
                            {
                                label: '关闭服务',
                                color: 'pink'
                            }
                        ].map(x => {
                            return <Button color={x.color || 'blue'} variant="outline" className="mr-2 mb-2" size="compact-sm">{x.label}</Button>
                        })
                    }
                </div>
            </Card>
        </div>
    </div>
}