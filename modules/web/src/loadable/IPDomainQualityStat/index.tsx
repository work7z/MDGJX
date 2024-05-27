import exportUtils from "@/utils/ExportUtils";
import { JSONConversionState } from "../JSONSuperTools/JSONConversion";
import { useClipboard } from "@mantine/hooks";
import GenCodeMirror from "@/components/GenCodeMirror"
import { ActionIcon, Alert, Badge, Button, Card, Select, Tabs, Title, rem } from "@mantine/core"
import JSON5 from "json5";
import AlertUtils from "@/utils/AlertUtils";
import _ from "lodash";
import { IconClock24, IconCopy, IconHours24, IconInfoCircle, IconSettings, IconTransformFilled } from "@tabler/icons-react";
import FileExportUtils, { js_export_trigger } from "@/utils/FileExportUtils";
import { useHistory } from "react-router";
import { useMDParams } from "@/containers/SideBar";
import { Link } from "react-router-dom";
import { JSX_Pro_Only } from "@/AppJSX";

export default () => {
    const rh = exportUtils.register('ipdomainqualitystat', {
        getPersistedStateFn: () => {
            return {
                anyFields: true,
            } satisfies JSONConversionState
        },
        getNotPersistedStateFn: () => {
            return {
                inputJSON: '',
                historicalRecords: [],
                errorReason: {
                    title: '',
                    content: ''
                }
            } satisfies JSONConversionState
        }
    })
    const clipboard = useClipboard({ timeout: 500 });

    const jsonOperations: {
        name: string,
        desc?: string,
        icon?: any,
        onClick?: () => void
    }[] = [
            {
                name: '检测延迟',
                onClick: () => {
                    //
                }
            },
        ]

    const hist = useHistory()
    const mdp = useMDParams()
    const items: { name: string, id: string, icon: any }[] = [
        {
            name: '时延监测主界面',
            id: 'main',
            icon: IconHours24,
        },
        // {
        //     name: '系统设置',
        //     id: 'setting',
        //     icon: IconSettings
        // }
        // {
        //     name: 'JSON格式提取',
        //     id: 'export',
        //     icon: IconOutlet,
        //     loadFN: () => import('./JSONExport.tsx')
        // },
        // {
        //     name: 'JSON差异对比',
        //     id: 'diff',
        //     icon: IconFileInfinity,
        //     loadFN: () => import('./JSONDiff.tsx')
        // },
    ]
    const iconStyle = { width: rem(12), height: rem(12) };
    const activeId = mdp.mainSubToolID || items[0].id

    const hVal = 'calc(100vh - 85px)'
    if (!rh) {
        return 'loading...'
    }
    const mainInnerJSX = <div className="w-full h-auto sm:h-full flex sm:flex-row flex-col-reverse">
        <div className="w-full sm:h-full overflow-auto h-[500px] flex-1  p-4 ">
            {/* <GenCodeMirror
                language="javascript"
                placeholder="请在此处输入JSON格式数据，在右侧面板轻击相关操作进行处理"
                onTextChange={(e) => {
                    rh.updateNonPState({
                        inputJSON: e
                    })
                }}
                directValue={rh.npState?.inputJSON} bigTextId={"thatisok"} /> */}
            <div className="flex flex-col space-y-2">
                <div>
                    <Alert p={5} variant="light" color="green" title="当前服务正常运行中" icon={<IconClock24 />}>
                    </Alert>
                </div>
                <div >
                    <Tabs defaultValue="1" variant="pills" className="w-full">
                        <Tabs.List>
                            <Tabs.Tab value="1">时延监测</Tabs.Tab>
                            <Tabs.Tab value="2">定期更新</Tabs.Tab>
                            <Tabs.Tab value="3">监测设置</Tabs.Tab>
                        </Tabs.List>
                        <Card className=" ">
                            <Tabs.Panel value="1">
                                <div className="flex flex-col space-y-2">
                                    <div>时延监测表</div>
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel value="2">
                                <div className="flex flex-col space-y-2">
                                    <div>来源与设置</div>
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel value="3">
                                <div className="flex flex-col space-y-2">
                                    <div>来源与设置</div>
                                </div>
                            </Tabs.Panel>
                        </Card>
                    </Tabs>
                </div>

            </div>
        </div>
        <Card withBorder className="border-r-0 border-t-0 border-b-0 w-full sm:w-[300px]">
            <div className="mb-2">
                <div className="mb-1">
                    <Title order={6}>快速操作</Title>
                </div>
                {jsonOperations.map(x => {
                    return <Button className="mb-1 mr-1" size='xs' variant="outline" onClick={() => {
                        try {
                            rh.updateNonPState({
                                errorReason: {
                                    title: '',
                                    content: ''
                                }
                            })
                            x.onClick && x.onClick()
                        } catch (e: any) {
                            let errMsg = e.message || e
                            let errorTitle = '抱歉，捕获到一个错误'
                            // e.g. Unable to parse input as JSON. SyntaxError: JSON5: invalid character 'x' at 13:9
                            if (errMsg.includes('Unable to parse input as')) {
                                try {
                                    const errorBlock = errMsg.split('at')[1].trim().split(':')
                                    const line = errorBlock[0]
                                    const column = errorBlock[1]
                                    errorTitle = `解析错误于第${line}行`
                                    const inputJSONVal = rh.getActualValueInState().inputJSON
                                    const inputLines = inputJSONVal.split('\n')
                                    if (inputLines.length > line) {
                                        const thatLine = inputLines[line - 1]
                                        let noteStr: string[] = []
                                        for (let i = 0; i < column - 1; i++) {
                                            noteStr.push('-')
                                        }
                                        noteStr.push('^')
                                        errMsg = thatLine.replaceAll('\t', '-') + '\n' + noteStr.join("") // + '\n' + `${line}:${column}`
                                    }
                                } catch (e) {
                                    // ignore
                                    debugger;
                                }
                            } else {
                            }
                            rh.updateNonPState({
                                errorReason: {
                                    title: errorTitle,
                                    content: errMsg
                                }
                            })

                        }
                    }} key={x.name}>{x.name}</Button>
                })}
            </div>

            <div className="mt-4">
                <div className="">
                    <Title order={6}>更多操作</Title>
                </div>
                <div className="mt-2  " >
                    <Button size='xs' onClick={() => {
                        const str = `
# MDGJX520 Host Start
140.82.113.26                 alive.mdgjx.com
140.82.112.5                  api.mdgjx.com
185.199.110.153               assets-cdn.mdgjx.com
185.199.111.133               avatars.mdgjx.com
185.199.111.133               avatars0.mdgjx.com
185.199.111.133               avatars1.mdgjx.com
185.199.111.133               avatars2.mdgjx.com
185.199.111.133               avatars3.mdgjx.com
185.199.111.133               avatars4.mdgjx.com
185.199.108.133               avatars5.mdgjx.com
185.199.111.133               camo.mdgjx.com
140.82.114.22                 central.mdgjx.com
185.199.111.133               cloud.mdgjx.com
140.82.114.10                 codeload.mdgjx.com
140.82.114.21                 collector.mdgjx.com
185.199.111.133               desktop.mdgjx.com
185.199.108.133               favicons.mdgjx.com
140.82.114.3                  gist.mdgjx.com
52.217.165.41                 mdgjx-cloud.s3.amazonaws.com
54.231.136.9                  mdgjx-com.s3.amazonaws.com
52.217.232.113                mdgjx-production-release-asset-2e65be.s3.amazonaws.com
52.217.18.52                  mdgjx-production-repository-file-5c1aeb.s3.amazonaws.com
16.182.71.209                 mdgjx-production-user-asset-6210df.s3.amazonaws.com
192.0.66.2                    mdgjx.blog
140.82.112.3                  mdgjx.com
140.82.112.17                 mdgjx.community
185.199.109.154               mdgjx.mdgjxassets.com
151.101.193.194               mdgjx.global.ssl.fastly.net
185.199.109.153               mdgjx.io
185.199.111.133               mdgjx.map.fastly.net
185.199.109.153               mdgjxstatus.com
140.82.114.25                 live.mdgjx.com
185.199.108.133               media.mdgjx.com
185.199.111.133               objects.mdgjx.com
13.107.42.16                  pipelines.actions.mdgjx.com
185.199.111.133               raw.mdgjx.com
185.199.111.133               user-images.mdgjx.com
13.107.213.51                 vscode.dev
140.82.112.22                 education.mdgjx.com`
                        rh.updateNonPState({
                            inputJSON: str
                        })
                    }} className="mr-1 mt-1">使用测试示例</Button>
                    <Button className="mr-1 mt-1" size='xs' color='gray' onClick={() => {
                        rh.updateNonPState({
                            inputJSON: ''
                        })
                    }} variant="outline" >清空时延值</Button>
                    <Button className="mr-1 mt-1" size='xs' color='green' onClick={() => {
                        clipboard.copy(rh.npState?.inputJSON)
                        AlertUtils.alertSuccess('JSON数据已复制到剪贴板')
                    }}>复制列表</Button>
                    <Button className="mr-1 mt-1" size='xs' onClick={() => {
                        js_export_trigger({
                            saveValue: rh.npState?.inputJSON,
                            filename: `mdgjx.json`
                        })
                    }} color='violet'>导出列表</Button>
                </div>
                <div className="mt-2 space-x-1">
                </div>
            </div >

            <div className="mt-4">
                <div className="">
                    <Title order={6}>关于本工具</Title>
                </div>
                <div className="text-xs">
                    IP/域名质量监测工具，以简约高效的界面，帮助您时刻监测IP/域名的时延情况，并快速获取格式化好的URL地址。注意，本工具不得用于违法违规用途，且时延值仅供参考和学习使用。
                </div>
            </div>
            <div className="mt-4">
                <div className="">
                    <Title order={6}>工具特色</Title>
                </div>
                <div className="space-x-2">
                    <Badge color="indigo" className="mt-2" >云监测</Badge>
                    {
                        JSX_Pro_Only
                    }
                </div>
            </div>
            {
                rh.npState?.errorReason.title != '' ? <>
                    <div className="mt-2">
                        <Alert p={5} variant="light" color="red" title={
                            rh.npState?.errorReason.title
                        } icon={
                            <IconInfoCircle />
                        }>
                            <p className="font-mono ">{_.split(rh.npState?.errorReason.content, '\n').map(x => <div>{x}</div>)}</p>
                            <p className="mt-2 space-x-2">
                                {/* <Button size='compact-xs' color='green' onClick={() => {
                                    rh.updateNonPState({
                                        errorReason: {
                                            title: '',
                                            content: ''
                                        }
                                    })
                                }}>修复</Button> */}
                                <Button size='compact-xs' variant="outline" color='gray' onClick={() => {
                                    rh.updateNonPState({
                                        errorReason: {
                                            title: '',
                                            content: ''
                                        }
                                    })
                                }}>关闭</Button>
                            </p>
                        </Alert>
                    </div>
                </> : ''
            }

        </Card >
    </div >
    return (
        <Card p={0} withBorder style={{
            minHeight: hVal,
            height: hVal
        }}>
            <Tabs defaultValue={activeId} className="h-full flex flex-col">
                <Tabs.List>
                    {
                        items.map(x => {
                            return (
                                <Link to={`/${mdp.mainModuleItem?.id}/${mdp?.mainSubModuleItem?.id}/${x.id}`}>
                                    <Tabs.Tab className="h-[35px]" value={x.id} leftSection={<x.icon style={iconStyle} />}>
                                        {x.name}
                                    </Tabs.Tab>
                                </Link>
                            )
                        })
                    }
                </Tabs.List>
                {
                    items.map(x => {
                        return (
                            <Tabs.Panel value={x.id} className="flex-1 overflow-auto">
                                {mainInnerJSX}
                            </Tabs.Panel>
                        )
                    })
                }
            </Tabs>
        </Card >
    )
}