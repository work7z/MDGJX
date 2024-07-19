import apiSlice, { AsyncCreateResponse, TLNResponse } from "@/store/reducers/apiSlice"
import { Badge, Button, Container, Divider, Select, Table, TextInput, Textarea } from "@mantine/core"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem } from '@mantine/core';
import { IconArrowsUpDown, IconDots, IconEraser, IconEye, IconFileUpload, IconFileZip, IconTextWrap, IconTrash } from '@tabler/icons-react';
import ControlBar, { ActionItem } from "@/components/ControlBar";
import PanelWithSideBar from "@/components/PanelWithSideBar";
import I18nSelect from "@/components/I18nSelect";
import exportUtils from "@/utils/ExportUtils";
import { stat } from "fs";
import _ from "lodash";
import { FN_GetDispatch } from "@/store/nocycle";
import StateSlice from "@/store/reducers/stateSlice";
import { useClipboard, useCounter, useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import AlertUtils from "@/utils/AlertUtils";
import Blink from "@/components/Blink";
import { sleep } from "@/utils/CommonUtils";
import { JSONTranslateMethods } from "@/loadable/TLNJSON";
import SimpleSelect from "@/components/SimpleSelect";
import FileChoosePanel from "@/components/FileChoosePanel";
import { readStrFromFile } from "@/AppFn";
import { js_export_trigger } from "@/utils/FileExportUtils";
import { WsOnMessage, useWebsocket } from "@/utils/WsUtils";
export type TLNPState = {
    fillFileMode: boolean
    sourceLang: string;
    targetLang: string;
    translateMethod?: string;
    reservedWords?: string;
    extraRequests?: string;
}
export type TLNNPState = {
    inputJSON: string;
    outputJSON: string;
}
export type TLNState = TLNPState & TLNNPState

export type UploadDetail = {
    status: "pending" | "none" | "OK" | "error",
    result?: string
}
export default (props: {
    saveDataId: string,
    showExampleLabel?: string,
    id: "text" | "json" | "json-comparison" | 'markdown' | "tlnztft",
    label: string,
    realtime?: boolean,
    verticalSideBySide?: boolean,
    example: string,
    defaultTLNPState?: TLNPState,
    extraOptionsJSX?: JSX.Element,
    translateActionItems?: ActionItem[],
    handleTranslate: (val: TLNState, fn_translate, fn_updateRes?:any) => Promise<string>
}) => {


    const isZTFT = props.id == 'tlnztft'
    const isJSONType = props.id == 'json' || props.id == 'json-comparison'
    const fanyiCountRef = useRef<{ interval: any }>({
        interval: null
    })
    const isMarkdownType = props.id == 'markdown'
    const rh = exportUtils.register('tln' + props.saveDataId, {
        getPersistedStateFn: () => {
            return props.defaultTLNPState || {
                // sourceLang: 'auto',
                sourceLang: 'zh',
                targetLang: 'en',
                translateMethod: JSONTranslateMethods[0].value,
                reservedWords: '',
                extraRequests: '',
                fillFileMode: false
            } satisfies TLNPState
        },
        getNotPersistedStateFn: () => {
            return {
                fanyiCount: 1,
                fileProcessLabel: '当前任务处于闲置状态',
                inputJSON: '',
                outputJSON: '',
                selectedUploadFiles: [] as File[],
                detailForHandlingUploadFiles: {} as { [key: string]: UploadDetail }
            }
        }
    })
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})
    const msgEventList = useRef<{
        msgEventMap: {
            [ts: string]: WsOnMessage
        },
        lastTimestamp: number
    }>({
        lastTimestamp: -1,
        msgEventMap: {}
    })
    const cptID = rh?.keyname + props.id
    useWebsocket("userchannel", 'tln' + cptID, {
        onMessage(msg) {
            if(msg.id.startsWith('tln-res')){
                _.forEach(msgEventList.current.msgEventMap, (x, d, n) => {
                    x(msg)
                })
            }
        }
    })

    const maxRows = 10
    const clipboard = useClipboard({ timeout: 500 });
    const [translating, setTranslating] = useState(false)
    const internalThrottledFnSubmitCreate = useDebouncedCallback(async () => {
        fn_submit_create({ eventSource: 'input' })()
    }, 200)

    let throtltted_fn_submit_create = () => {
        if (!props.realtime) return;
        setTimeout(() => {
            internalThrottledFnSubmitCreate()
        }, 0)
    }
    if (!rh) return ''
    let fn_submit_create = (options: { eventSource: 'submit' | 'input' }) => {
        let tState = rh.getActualValueInState()

        let fn = async () => {
            if (translating && options.eventSource == 'submit') {
                AlertUtils.alertWarn("已取消本次翻译操作")
                setTranslating(false)
                return;
            }
            setTranslating(true)
            try {
                await rh.checkLoginStatus()
                let before = Date.now()
                if (!tState) {
                    AlertUtils.alertWarn("未知错误NIKQMINA")
                    return;
                }
                let result = ''
                rh.updateNonPState({
                    fileProcessLabel: `正在处理文件中`
                })
                let lastErrMsg: string = ''
                const fn_fanyi = async (value) => {
                    if(_.trim(value) == ''){
                        return '';
                    }
                    const crtTS = Date.now()
                    const crtReqID = cptID + crtTS + Date.now() + Math.random().toString(36).substring(7)
                    const prev_listen = new Promise((r, e) => {
                        msgEventList.current.msgEventMap[crtReqID] = async (msg) => {
                            switch (msg.id) {
                                case 'tln-res-' + crtReqID:
                                    r(msg.value)
                                    delete msgEventList.current.msgEventMap[crtReqID] 
                                    break;
                            }
                        }
                    })
                    await t_sendReq({
                        text: (value + "") || '',
                        type: props.id + '',
                        id: crtReqID + '',
                        sourceLang: tState?.sourceLang + "",
                        targetLang: tState?.targetLang + "",
                        reservedWords: tState?.reservedWords as string,
                        extraRequests: tState?.extraRequests as string,
                    })
                    const r = await prev_listen as AsyncCreateResponse<TLNResponse>
                    // if (r.isError) {
                    //     const errObj: any = r.error
                    //     lastErrMsg = errObj?.data?.error + ''
                    //     throw new Error(lastErrMsg)
                    // }
                    const result = r.data?.result
                    return result || '';
                }
                let ctn = 0;
                window.clearInterval(fanyiCountRef.current.interval)
                rh.updateNonPState({
                    fanyiCount: 0,
                })
                fanyiCountRef.current.interval = setInterval(() => {
                    ctn++
                    rh.updateNonPState({
                        fanyiCount: ctn,
                    })
                }, 1000)

                if (tState.fillFileMode) {
                    let allLen = 1
                    const files = tState.selectedUploadFiles
                    if (_.isEmpty(files)) {
                        AlertUtils.alertWarn("无文件可处理，请先选择文件")
                        return;
                    }
                    rh.updateNonPState({
                        fileProcessLabel: `开始处理本次翻译`,
                        detailForHandlingUploadFiles: {}
                    })
                    let idx = 0
                    for (let eachFile of files) {
                        try {
                            idx++
                            AlertUtils.alertInfo(`正在翻译${eachFile.name}中...`)
                            let tState2 = rh.getActualValueInState()
                            rh.updateNonPState({
                                fileProcessLabel: `处理中: ${idx}/${files.length}`,
                                detailForHandlingUploadFiles: {
                                    ...tState2.detailForHandlingUploadFiles,
                                    [eachFile.name]: {
                                        status: "pending"
                                    }
                                }
                            })
                            const processFielStr = await readStrFromFile(eachFile)
                            allLen += processFielStr.length
                            const alert_str = `正在翻译中，预估字符${processFielStr.length}，请稍候`
                            AlertUtils.alertInfo(alert_str)
                            rh.updateNonPState({
                                fileProcessLabel: alert_str
                            })

                            const crtResult = await props.handleTranslate({
                                ...tState,
                                inputJSON: processFielStr
                            }, fn_fanyi,()=>{

                            })
                            tState2 = rh.getActualValueInState()
                            rh.updateNonPState({
                                fileProcessLabel: `完成翻译处理: ${idx}/${files.length}`,
                                detailForHandlingUploadFiles: {
                                    ...tState2.detailForHandlingUploadFiles,
                                    [eachFile.name]: {
                                        status: "OK",
                                        result: crtResult
                                    }
                                }
                            })
                        } catch (e: any) {
                            const tState2 = rh.getActualValueInState()
                            rh.updateNonPState({
                                fileProcessLabel: lastErrMsg,
                                detailForHandlingUploadFiles: {
                                    ...tState2.detailForHandlingUploadFiles,
                                    [eachFile.name]: {
                                        status: "error",
                                        result: lastErrMsg
                                    }
                                }
                            })
                            throw e
                        }
                    }
                    const waitStr = ("翻译" + files.length + "个文件完毕，总计" + allLen + "个字符，耗时" + (
                        (Date.now() - before) / 1000
                    ).toFixed(2) + "s")
                    AlertUtils.alertSuccess(waitStr)
                    rh.updateNonPState({
                        fileProcessLabel: waitStr
                    })
                } else {
                    if (tState.inputJSON.length == 0) {
                        rh.updateNonPState({
                            outputJSON: ''
                        })
                        AlertUtils.alertWarn("输入为空，请输入内容后重试")
                        return;
                    } else {
                        result = await props.handleTranslate(tState, fn_fanyi,(newval)=>{
                            rh.updateNonPState({
                                outputJSON: newval
                            })
                        })
                        rh.updateNonPState({
                            outputJSON: result
                        })
                    }
                    if (options.eventSource == 'input') {
                        // do nothing la, no need to alert in this condition
                    } else {
                        if (result && result.length !== 0) {
                            AlertUtils.alertSuccess("翻译完毕，总计" + result.length + "个字符，耗时" + (
                                (Date.now() - before) / 1000
                            ).toFixed(2) + "s")
                        }
                    }
                }
            } catch (e) {
                // AlertUtils.alertErr(e)
                throw e
            } finally {

                setTranslating(false)
            }
        }
        return fn
    }
    const translateActionItems: ActionItem[] = props.translateActionItems ?
        props.translateActionItems.map(x => {
            return {
                ...x,
            }
        }) : [
            {
                type: 'submit',
                text: translating ? "取消翻译" + `(${Math.min(99, rh?.npState?.fanyiCount || 0)})` : "开始翻译",
                color: translating ? 'red' : undefined,
                onClick: fn_submit_create({
                    eventSource: 'submit'
                })
            }
        ]
    const jsx_inputTextarea = <Group wrap='nowrap'>
        <Textarea
            spellCheck={false}
            autoFocus
            w={'100%'}
            placeholder={"请将需要翻译的" + props.label + "粘贴到这里"}
            label={props.label + "输入"}
            autosize
            resize='both'
            minRows={maxRows}
            maxRows={maxRows}
            {...rh.bindOnChange({
                npStateKey: 'inputJSON'
            }, () => {
                throtltted_fn_submit_create()
            })}
            className="overflow-auto"
        />
    </Group>
    const fillFileMode = rh?.pState?.fillFileMode
    const jsx_controlBar = <Group mt={10} wrap='nowrap' justify="space-between">
        <Group gap={7}>
            <ControlBar actions={[
                ...translateActionItems,
                fillFileMode ? {
                    color: 'grape',
                    text: '导出结果',
                    onClick: () => {
                        _.forEach(rh?.npState?.detailForHandlingUploadFiles, (x, d, n) => {
                            js_export_trigger({
                                saveValue: x?.result,
                                filename: d
                            })
                        })
                    }
                } : {
                    color: 'green',
                    text: '复制结果',
                    onClick: () => {
                        clipboard.copy(rh.npState?.outputJSON || '无结果')
                        AlertUtils.alertSuccess('已复制到剪贴板')
                    }
                },
                {
                    color: 'gray',
                    hideIt: fillFileMode,
                    text: props.showExampleLabel ? props.showExampleLabel : '示例' + props.label,
                    onClick: () => {
                        rh.updateNonPState({
                            inputJSON: props.example
                        })
                        throtltted_fn_submit_create()
                    },
                },
                rh?.pState?.fillFileMode ? {
                    title: '返回文本编辑模式',
                    color: 'gray',
                    text: '返回',
                    variant: 'outline',
                    pl: 12,
                    pr: 12,
                    // icon: <IconTextWrap size='15' />,
                    onClick: () => {
                        rh.updatePState({
                            fillFileMode: false,
                        })
                    }
                } : {
                    title: '文件批处理模式',
                    color: 'gray',
                    variant: 'outline',
                    pl: 12,
                    pr: 12,
                    icon: <IconFileUpload size='15' />,
                    onClick: () => {
                        rh.updatePState({
                            fillFileMode: true,
                        })
                    }
                },
                {
                    color: 'gray',
                    variant: 'outline',
                    pl: 12,
                    hideIt: fillFileMode,
                    title: '交换上下文本框值',
                    pr: 12,
                    icon: <IconArrowsUpDown size='15' />,
                    onClick: () => {
                        rh.updateNonPState({
                            inputJSON: rh.npState?.outputJSON,
                            outputJSON: rh.npState?.inputJSON
                        })
                    }
                },
                {
                    color: 'gray',
                    variant: 'outline',
                    pl: 12,
                    hideIt: fillFileMode,
                    title: '清空上下文本框值',
                    pr: 12,
                    icon: <IconEraser size='15' />,
                    onClick: () => {
                        rh.updateNonPState({
                            inputJSON: '',
                            outputJSON: ''
                        })
                    },
                },
            ]}
            />
        </Group>
    </Group>
    const jsx_outputTextarea = (
        <Group mt={10} wrap='nowrap'>
            <Textarea
                spellCheck={false}
                w={'100%'}
                label={`${props.label}输出`}
                placeholder="翻译后的文本将会显示在这里"
                autosize
                resize="both"
                minRows={maxRows}
                {...rh.bindOnChange({
                    npStateKey: 'outputJSON'
                })}
                maxRows={maxRows}
                name='outputJSON'
            />
        </Group>
    )
    const acceptableValues = isZTFT ? ['zh', 'zh-HK', 'zh-TW', 'zh'] : []
    return <Container  >
        <form onSubmit={e => {
            e.preventDefault()
        }}>
            <Card withBorder shadow="sm" radius="md" >
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="center">
                        <Text fw={500}>
                            {translating ? <>正在翻译{props.label}中<Blink min={3} max={6} /></> : props.label + '翻译工具'}
                        </Text>
                    </Group>
                </Card.Section>

                <PanelWithSideBar main={
                    fillFileMode ? <>
                        {jsx_controlBar}
                        <Group mt={10} gap={0} className="flex flex-col items-start justify-start" flex={
                            `flex-start `
                        } >
                            <Group>
                                <Text>待翻译列表</Text>
                            </Group>
                            <FileChoosePanel
                                value={rh?.npState?.selectedUploadFiles || []}
                                onChange={e => {
                                    rh.updateNonPState({
                                        selectedUploadFiles: e,
                                        detailForHandlingUploadFiles: {}
                                    })
                                }}
                            />
                        </Group>
                        <Group mt={10} gap={0} className="flex flex-col items-start justify-start" flex={
                            `flex-start `
                        }>
                            <Text>翻译结果</Text>
                            <Text size={'xs'}>{rh?.npState?.fileProcessLabel}</Text>
                            <Card withBorder className="w-full">
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>名称</Table.Th>
                                            <Table.Th>类型/体积</Table.Th>
                                            <Table.Th>状态</Table.Th>
                                            <Table.Th>预览结果</Table.Th>
                                            <Table.Th>操作</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>{
                                        rh?.npState?.selectedUploadFiles.map(element => {
                                            const fileDetail = rh?.npState?.detailForHandlingUploadFiles[element.name]
                                            return (
                                                <Table.Tr key={element.name}>
                                                    <Table.Td>{element.name}</Table.Td>
                                                    <Table.Td>{element.size}</Table.Td>
                                                    <Table.Td>{
                                                        fileDetail?.status || '无'
                                                    }</Table.Td>
                                                    <Table.Td>{
                                                        _.truncate(fileDetail?.result || '无', {
                                                            length: 100
                                                        })
                                                    }</Table.Td>
                                                    <Table.Td>
                                                        <Button size='xs' color="green" onClick={() => {
                                                            clipboard.copy(fileDetail?.result || '无结果')
                                                            AlertUtils.alertSuccess('已复制此结果到剪贴板，文件名是' + element.name)
                                                        }}>复制</Button>
                                                        <Button size='xs' color='grape' onClick={() => {
                                                            js_export_trigger({
                                                                saveValue: fileDetail?.result,
                                                                filename: element.name
                                                            })
                                                        }}>导出</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                            )
                                        })}</Table.Tbody>
                                </Table>
                            </Card>
                        </Group>
                    </> : <>
                        {jsx_inputTextarea}

                        {jsx_controlBar}

                        {jsx_outputTextarea}
                    </>
                } sidebar={
                    <Group gap={7}>
                        <I18nSelect
                            {...rh.bindOnChange({
                                pStateKey: 'sourceLang'
                            })}
                            acceptValues={acceptableValues}
                            label={'源语言'} name='sourceLang' />
                        <Group justify="center" className="ml-[-15px] w-full text-center" >
                            <Button size='compact-xs' variant="default" onClick={() => {
                                rh.updatePState({
                                    sourceLang: rh.pState?.targetLang,
                                    targetLang: rh.pState?.sourceLang
                                })
                            }}>
                                <IconArrowsUpDown size={15} />
                            </Button>
                        </Group>
                        <I18nSelect label="目标语言"
                            acceptValues={acceptableValues}
                            {...rh.bindOnChange({
                                pStateKey: 'targetLang'
                            })}
                        />
                        {
                            isJSONType ? <>
                                <SimpleSelect label="JSON翻译方式"
                                    dataArr={JSONTranslateMethods}
                                    {...rh.bindOnChange({
                                        pStateKey: 'translateMethod'
                                    })}
                                />
                            </>
                                : ''
                        }
                        {
                            isMarkdownType ? <>
                                <Textarea
                                    label="保留词列表(可选)"
                                    className="w-full"
                                    rows={5}
                                    placeholder="如果您的文档中有一些词汇不希望被翻译，可以在这里填写，以逗号分隔"
                                    {...rh.bindOnChange({
                                        pStateKey: 'reservedWords'
                                    })}
                                />
                            </> : ''
                        } {
                            isMarkdownType ? <>
                                <Textarea
                                    label="额外要求(可选)"
                                    className="w-full"
                                    rows={5}
                                    placeholder="如果您有额外的翻译要求，请在这里填写，以便我们更好地为您服务"
                                    {...rh.bindOnChange({
                                        pStateKey: 'extraRequests'
                                    })}
                                />
                            </> : ''
                        }
                        {props.extraOptionsJSX}
                    </Group>
                } />
            </Card>
        </form>
    </Container>
}