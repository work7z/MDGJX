import GenCodeMirror from "@/components/GenCodeMirror"
import exportUtils from "@/utils/ExportUtils"
import { Alert, Badge, Button, Card, Select, Title } from "@mantine/core"
import JSON5 from "json5";
import jsonmetautils from "./jsonmetautils";
import AlertUtils from "@/utils/AlertUtils";
import _ from "lodash";
import { IconInfoCircle } from "@tabler/icons-react";

export type JSONConversionState = {
    //
}
export type HistoryRecord = {
    label: string,
    value: string
}
export type JSONConversionNPState = {
    inputJSON: string,
    historicalRecords: HistoryRecord[]
}

export default () => {
    const rh = exportUtils.register('jsonconversion', {
        getPersistedStateFn: () => {
            return {
                //
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
    if (!rh) {
        return ''
    }
    const jsonOperations: {
        name: string,
        desc?: string,
        icon?: any,
        onClick?: () => void
    }[] = [
            {
                name: '校验/格式化',
                onClick: () => {
                    const jState = rh.getActualValueInState()
                    const rawVal = jState.inputJSON
                    if (_.isEmpty(rawVal)) {
                        AlertUtils.alertErr('输入内容为空，请先提供JSON数据')
                        return;
                    }
                    const newval = jsonmetautils.beautify(rawVal)
                    rh.updateNonPState({
                        inputJSON: newval
                    })
                }
            },

            {
                name: '转义',
                onClick: () => {
                    const jState = rh.getActualValueInState()
                    const rawVal = jState.inputJSON
                    if (_.isEmpty(rawVal)) {
                        AlertUtils.alertErr('输入内容为空，请先提供JSON数据')
                        return;
                    }
                    const newval = jsonmetautils.escape(rawVal)
                    rh.updateNonPState({
                        inputJSON: newval
                    })
                }
            },
            {
                name: '反转义',
                onClick: () => {
                    const jState = rh.getActualValueInState()
                    const rawVal = jState.inputJSON
                    if (_.isEmpty(rawVal)) {
                        AlertUtils.alertErr('输入内容为空，请先提供JSON数据')
                        return;
                    }
                    const newval = jsonmetautils.unescape(rawVal)
                    rh.updateNonPState({
                        inputJSON: newval
                    })
                }
            },

            {
                name: '压缩',
                onClick: () => {
                    const jState = rh.getActualValueInState()
                    const rawVal = jState.inputJSON
                    if (_.isEmpty(rawVal)) {
                        AlertUtils.alertErr('输入内容为空，请先提供JSON数据')
                        return;
                    }
                    const newval = jsonmetautils.compress(rawVal)
                    rh.updateNonPState({
                        inputJSON: newval
                    })
                }
            },
            {
                name: '解码Base64'
            },
            {
                name: '编码Base64'
            }
        ]
    return <div className="w-full h-full flex flex-row">
        <div className="w-full h-full overflow-auto flex-1">
            <GenCodeMirror
                language="javascript"
                placeholder="请在此处输入JSON格式数据，在右侧面板轻击相关操作进行处理"
                onTextChange={(e) => {
                    rh.updateNonPState({
                        inputJSON: e
                    })
                }}
                directValue={rh.npState?.inputJSON} bigTextId={"thatisok"} />
        </div>
        <Card withBorder className="border-r-0 border-t-0 border-b-0 w-[300px]">
            <div className="mb-2">
                <div className="mb-1">
                    <Title order={6}>快速操作</Title>
                </div>
                {jsonOperations.map(x => {
                    return <Button className="mb-1 mr-1" size='xs' variant="outline" onClick={() => {
                        try {
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
                                    errorTitle = `第 ${line} 行 ${column} 列解析错误`
                                    errMsg = `具体错误`
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
            <div className="mt-2">
                <div className="">
                    <Title order={6}>工具特色</Title>
                </div>
                <div className="space-x-2">
                    <Badge color="green" className="mt-2" >中文字符修复</Badge>
                    <Badge color="cyan" className="mt-2" >JSON5支持</Badge>
                </div>
            </div>
            <div className="mt-4">
                <div className="">
                    <Title order={6}>关于本工具</Title>
                </div>
                <div className="text-xs">
                    JSON超级工具涵盖JSON格式化、压缩、校验、转义、去转义、Base64编解码等实用功能，且兼容JSON5格式，可以帮助您快速处理JSON数据。
                </div>
                <div>
                    <Button size='xs' className="mt-2" onClick={() => {
                        const str = `{
    "name": "秒达工具箱",
      "link": "https://mdgjx.com",
  "description": "如果喜欢秒达工具箱，请收藏和分享本网址MDGJX.COM(首拼缩写)",
  "count": 7800,
      "dates": [
      "2016-09","2018-06","2019-07","2020-01","2022-03","2024-05"
      ],
        "info": {
        "scope":"/",
        "noImplicitAny":true,
        "noLib":false,
        "extraLibs":[],
        "semanticValidation":true,
        "syntaxValidation":true,
        "codeGenTarget":"ES5",
        "moduleGenTarget":"",
      },
}`
                        rh.updateNonPState({
                            inputJSON: str
                        })
                    }}>使用JSON示例</Button>
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
                            <p>{rh.npState?.errorReason.content}</p>
                            <p className="mt-2 space-x-2">
                                <Button size='compact-xs' color='green' onClick={() => {
                                    rh.updateNonPState({
                                        errorReason: {
                                            title: '',
                                            content: ''
                                        }
                                    })
                                }}>修复</Button>
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

        </Card>
    </div>
}