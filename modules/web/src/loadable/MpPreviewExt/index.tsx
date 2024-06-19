import GenCodeMirror from "@/components/GenCodeMirror"
import localApiSlice from "@/store/reducers/localApiSlice"
import { useMDParams, useMDQuery } from "@/systemHooks"
import AlertUtils from "@/utils/AlertUtils"
import exportUtils from "@/utils/ExportUtils"
import { Button, Card, NativeSelect, Tabs, Title, rem } from "@mantine/core"
import { IconAppWindow, IconBrandBlogger, IconInfoCircle, IconMacro, IconMessage, IconMessageCircle, IconPhoto, IconRun, IconSettings } from "@tabler/icons-react"

export default () => {
    const rh = exportUtils.register('mppreviewext', {
        getNotPersistedStateFn() {
            return {
                searchText: ''
            }
        },
        getPersistedStateFn() {
            return {
                tabId: 'main',
                pluginId: ''
            }
        }
    })

    const extListRes = localApiSlice.useGetExtListWithSearchQuery({
        searchText: rh?.npState?.searchText || '',
    }, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 1000 * 60 * 10,
    })
    const iconStyle = { width: rem(12), height: rem(12) };

    const fData = extListRes?.data?.data

    const md = useMDParams()

    if (!rh) {
        return ''
    }
    const controls: {
        label: string,
        color?: string,
        onclick?: () => void
    }[] = [
            {
                label: '刷新',
                color: 'green',
                onclick: async () => {
                    await extListRes.refetch()
                    AlertUtils.alertSuccess('刷新成功')
                }
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
        ]
    return <div className="flex flex-row space-x-2">
        <div className="flex-1">
            <Card withBorder className="w-full h-[calc(100vh-90px)]">
                <div className="w-full h-full ">
                    <Tabs value={rh?.pState?.tabId } onChange={(e)=>{
                        rh.updatePState({
                            tabId: e+''
                        })
                    }}>
                        <Tabs.List>
                            <Tabs.Tab value="main" leftSection={<IconAppWindow style={iconStyle} />}>
                                主界面
                            </Tabs.Tab>
                            <Tabs.Tab value="messages" leftSection={<IconMessage style={iconStyle} />}>
                                初始化日志
                            </Tabs.Tab>
                            <Tabs.Tab value="settings" leftSection={<IconMessage style={iconStyle} />}>
                                服务日志
                            </Tabs.Tab>
                            <Tabs.Tab value="config" leftSection={<IconInfoCircle style={iconStyle} />}>
                                配置信息
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="main">
                            Gallery tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="messages">
                            Messages tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="config">
                            <GenCodeMirror directValue={'i am ok'} bigTextId={""}/>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </Card>
        </div>
        <div className="w-[350px]">
            <Card withBorder>
                <div className="space-y-2">
                    <NativeSelect {
                        ...rh?.bindOnChange({
                            pStateKey: 'pluginId'
                        })
                    } label="目标插件" description="选择需要预览的插件名" data={fData?.allMetaInfo?.map(x => ({ label: x.name, value: x.id }))} />
                    <NativeSelect label="插件 - 预览模块" description="选择需要预览的目标模块" data={['React', 'Angular', 'Vue']} />
                </div>
                <div className="mt-4  ">
                    {
                        controls.map(x => {
                            return <Button onClick={x.onclick} color={x.color || 'blue'} variant="outline" className="mr-2 mb-2" size="compact-sm">{x.label}</Button>
                        })
                    }
                </div>
                <div className="mt-4">
                    <b>
                        插件元信息:
                    </b>
                    <div>
                        {rh?.pState?.pluginId}
                    </div>
                </div>
            </Card>
        </div>
    </div>
}