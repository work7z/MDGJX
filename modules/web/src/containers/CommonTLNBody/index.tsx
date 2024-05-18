import apiSlice from "@/store/reducers/apiSlice"
import { Button, Container, Select, Textarea } from "@mantine/core"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem } from '@mantine/core';
import { IconArrowsUpDown, IconDots, IconEraser, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import ControlBar from "@/components/ControlBar";
import PanelWithSideBar from "@/components/PanelWithSideBar";
import I18nSelect from "@/components/I18nSelect";
import exportUtils from "@/utils/ExportUtils";
import { stat } from "fs";
import _ from "lodash";
import { FN_GetDispatch } from "@/store/nocycle";
import StateSlice from "@/store/reducers/stateSlice";
import { useClipboard, useDebouncedCallback } from "@mantine/hooks";
import AlertUtils from "@/utils/AlertUtils";
import Blink from "@/components/Blink";
import { sleep } from "@/utils/CommonUtils";
export type TLNPState = {
    sourceLang: string;
    targetLang: string;
}
export type TLNNPState = {
    inputJSON: string;
    outputJSON: string;
}
export type TLNState = TLNPState & TLNNPState

const debounceFn = _.throttle((fn: () => void) => {
    fn()
}, 1300);

export default (props: {
    id: string,
    label: string,
    realtime?: boolean,
    example: string,
    handleTranslate: (val: TLNState) => Promise<string>
}) => {
    const rh = exportUtils.register('tln' + props.id, {
        getPersistedStateFn: () => {
            return {
                sourceLang: 'zh',
                targetLang: 'en',
            } satisfies TLNPState
        },
        getNotPersistedStateFn: () => {
            return {
                inputJSON: '',
                outputJSON: ''
            }
        }
    })
    const maxRows = 10
    const clipboard = useClipboard({ timeout: 500 });
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})
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
                if (tState.inputJSON.length == 0) {
                    rh.updateNonPState({
                        outputJSON: ''
                    })
                } else {
                    result = await props.handleTranslate(tState)
                    rh.updateNonPState({
                        outputJSON: result
                    })
                }
                if (options.eventSource == 'input') {
                    // do nothing la, no need to alert in this condition
                } else {
                    AlertUtils.alertSuccess("翻译完毕，总计" + result.length + "个字符，耗时" + (
                        (Date.now() - before) / 1000
                    ).toFixed(2) + "s")
                }
            } catch (e) { throw e } finally {
                setTranslating(false)
            }
        }
        return fn
    }
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
                    <>
                        <Group wrap='nowrap'>
                            <Textarea
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

                        <Group mt={10} wrap='nowrap' justify="space-between">
                            <Group gap={7}>
                                <ControlBar actions={[
                                    {
                                        type: 'submit',
                                        text: translating ? "取消翻译" : "开始翻译",
                                        // loading: translating,
                                        color: translating ? 'red' : undefined,
                                        onClick: fn_submit_create({
                                            eventSource: 'submit'
                                        })
                                    },
                                    {
                                        color: 'green',
                                        text: '复制结果',
                                        onClick: () => {
                                            clipboard.copy(rh.npState?.outputJSON || '无结果')
                                            AlertUtils.alertSuccess('已复制到剪贴板')
                                        }
                                    },
                                    {
                                        color: 'gray',
                                        text: '示例' + props.label,
                                        onClick: () => {
                                            rh.updateNonPState({
                                                inputJSON: props.example
                                            })
                                            throtltted_fn_submit_create()
                                        }
                                    },
                                    {
                                        color: 'gray',
                                        variant: 'outline',
                                        pl: 12,
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
                                        pr: 12,
                                        icon: <IconEraser size='15' />,
                                        onClick: () => {
                                            rh.updateNonPState({
                                                inputJSON: '',
                                                outputJSON: ''
                                            })

                                        }
                                    },
                                ]}
                                />
                            </Group>
                        </Group>

                        <Group mt={10} wrap='nowrap'>
                            <Textarea
                                w={'100%'}
                                label="文本输出"
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
                    </>
                } sidebar={
                    <Group gap={7}>
                        <I18nSelect
                            {...rh.bindOnChange({
                                pStateKey: 'sourceLang'
                            })}
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
                            {...rh.bindOnChange({
                                pStateKey: 'targetLang'
                            })}
                        />
                    </Group>
                } />
            </Card>
        </form>
    </Container>
}