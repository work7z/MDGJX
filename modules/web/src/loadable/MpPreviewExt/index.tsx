import GenCodeMirror from "@/components/GenCodeMirror"
import localApiSlice from "@/store/reducers/localApiSlice"
import { useMDParams, useMDQuery } from "@/systemHooks"
import AlertUtils from "@/utils/AlertUtils"
import { sleep } from "@/utils/CommonUtils"
import exportUtils from "@/utils/ExportUtils"
import { Alert, Box, Button, Card, LoadingOverlay, NativeSelect, Tabs, Title, rem } from "@mantine/core"
import { IconAppWindow, IconBrandBlogger, IconInfoCircle, IconMacro, IconMessage, IconMessageCircle, IconPhoto, IconRun, IconSettings } from "@tabler/icons-react"
import dayjs from "dayjs"
import { useState } from "react"

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
    const [lazyExtHarmfulDoJob] = localApiSlice.useLazyExtHarmfulDoJobQuery({})
    const extGetStatusQueryRes = localApiSlice.useExtHarmfulGetStatusQuery({
        id: rh?.pState?.pluginId || '',
        type: 'get-all',
    }, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 1000 * 20,
        skip: !rh?.pState?.pluginId
    })

    const iconStyle = { width: rem(12), height: rem(12) };

    const fData = extListRes?.data?.data
    const configItem = fData?.allMetaInfo?.find(x => x.id == rh?.pState?.pluginId)

    const md = useMDParams()
    const [refreshCtn, setRefreshCtn] = useState(0)

    if (!rh) {
        return ''
    }
    const refreshFn = async () => {
        setRefreshCtn(Date.now())
        AlertUtils.alertInfo('刷新中')
        await extListRes.refetch()
        setRefreshCtn(Date.now())
        await extGetStatusQueryRes.refetch()
        setRefreshCtn(Date.now())
        await sleep(3000)
        setRefreshCtn(Date.now())
        AlertUtils.alertSuccess('刷新成功')
    }
    const controls: {
        label: string,
        color?: string,
        onclick?: () => void
    }[] = [
            {
                label: '刷新',
                color: 'green',
                onclick: refreshFn
            },
            {
                label: '初始化',
                color: 'grape',
                onclick: async () => {
                    AlertUtils.alertInfo('操作中')
                    if (!rh?.pState?.pluginId) {
                        AlertUtils.alertErr('请先选择插件')
                        return
                    }
                    await lazyExtHarmfulDoJob({
                        id: rh?.pState?.pluginId,
                        type: 'setup'
                    })
                    await refreshFn()
                    AlertUtils.alertSuccess('初始化成功')
                }
            },
            {
                label: '启动服务',
                onclick: async () => {
                    AlertUtils.alertInfo('执行中')
                    if (!rh?.pState?.pluginId) {
                        AlertUtils.alertErr('请先选择插件')
                        return
                    }
                    await lazyExtHarmfulDoJob({
                        id: rh?.pState?.pluginId,
                        type: 'start-service'
                    })
                    await refreshFn()
                    AlertUtils.alertSuccess('执行启动服务成功')
                }
            },
            {
                label: '关闭服务',
                color: 'pink',
                onclick: async () => {
                    AlertUtils.alertInfo('关闭中')
                    if (!rh?.pState?.pluginId) {
                        AlertUtils.alertErr('请先选择插件')
                        return
                    }
                    await lazyExtHarmfulDoJob({
                        id: rh?.pState?.pluginId,
                        type: 'stop-service'
                    })
                    await refreshFn()
                    AlertUtils.alertSuccess('执行关闭服务成功')
                }
            }
        ]
    return <div className="flex flex-row space-x-2">
        <div className="flex-1 w-[calc(100%-350px)]">
            <Card withBorder className="w-full h-[calc(100vh-90px)]">
                <div className="w-full h-full ">
                    <Tabs value={rh?.pState?.tabId} onChange={(e) => {
                        rh.updatePState({
                            tabId: e + ''
                        })
                    }}>
                        <Tabs.List>
                            <Tabs.Tab value="main" leftSection={<IconAppWindow style={iconStyle} />}>
                                主界面
                            </Tabs.Tab>
                            <Tabs.Tab value="config" leftSection={<IconInfoCircle style={iconStyle} />}>
                                插件配置
                            </Tabs.Tab>
                            <Tabs.Tab value="messages" leftSection={<IconMessage style={iconStyle} />}>
                                初始化日志
                            </Tabs.Tab>
                            <Tabs.Tab value="settings" leftSection={<IconMessage style={iconStyle} />}>
                                服务日志
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="main">
                            <iframe key={'m' + refreshCtn} src={configItem?.development?.entryLink} className="border-[1px] border-gray-300 mt-2 outline-none m-0 w-full h-[calc(100vh-200px)]"/>
                        </Tabs.Panel>

                        <Tabs.Panel value="messages">
                            初始化界面
                        </Tabs.Panel>

                        <Tabs.Panel value="config">
                            <GenCodeMirror directValue={JSON.stringify(configItem, null, 2)} language="json" bigTextId={""} />
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </Card>
        </div>
        <div className="w-[350px] relative">
            <Box pos="relative">
                <LoadingOverlay visible={extGetStatusQueryRes.isFetching} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {/* ...other content */}
            </Box>
            <Card withBorder>
                <div className="space-y-2">
                    <NativeSelect {
                        ...rh?.bindOnChange({
                            pStateKey: 'pluginId'
                        })
                    } label="目标插件" description="选择需要预览的插件名" data={fData?.allMetaInfo?.map(x => ({ label: x.name, value: x.id }))} />
                    {/* <NativeSelect label="插件 - 预览模块" description="选择需要预览的目标模块" data={['React', 'Angular', 'Vue']} /> */}
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
                    <div className="text-xs">
                        <ul>
                            <li>插件名：{rh?.pState?.pluginId}</li>
                            <li>刷新时间: {dayjs(extGetStatusQueryRes?.fulfilledTimeStamp).format("YYYY-MM-DD HH:mm:ss")}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4">
                    <Alert title={`关于开发者中心的使用说明`} color='lime'>
                        本页面仅对开发人员开放，且用户需要在完整的开发者环境下进行操作。<br/>注意，这里指的不是安装成品的秒达工具箱软件，而是源代码开发，即您需要拉取源代码和初始化开发环境，基于此进行本地插件开发。<br/>
                        <p>
                            若对本页面有任何疑问，请通过页面底部的【联系我们】来获取更多帮助。
                        </p>
                        </Alert>
                </div>
            </Card>
        </div>
    </div>
}