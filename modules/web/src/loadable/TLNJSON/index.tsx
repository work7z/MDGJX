import apiSlice from "@/store/reducers/apiSlice"
import { Container, Select, Textarea } from "@mantine/core"
import { useEffect, useState } from "react"
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import ControlBar from "@/components/ControlBar";
import PanelWithSideBar from "@/components/PanelWithSideBar";
import I18nSelect from "@/components/I18nSelect";
import exportUtils from "@/utils/ExportUtils";
import { stat } from "fs";
import _ from "lodash";
import { FN_GetDispatch } from "@/store/nocycle";
import StateSlice from "@/store/reducers/stateSlice";
import { useClipboard } from "@mantine/hooks";
import AlertUtils from "@/utils/AlertUtils";


export default () => {
    const rh = exportUtils.register('tlnjson', {
        getDefaultStateFn: () => {
            return {
                sourceLang: 'zh',
                targetLang: 'en',
                inputJSON: '',
                outputJSON: ''
            }
        },
    })
    const maxRows = 10
    const clipboard = useClipboard({ timeout: 500 });
    const [t_getResult] = apiSlice.useLazyTlnGetResultQuery({})
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})
    const [translating, setTranslating] = useState(false)
    if (!rh) return ''
    return <Container  >
        <form onSubmit={e => {
            e.preventDefault()
        }}>
            <Card withBorder shadow="sm" radius="md" >
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="center">
                        <Text fw={500}>JSON格式翻译工具</Text>
                    </Group>
                </Card.Section>

                <PanelWithSideBar main={
                    <>
                        <Group wrap='nowrap'>
                            <Textarea
                                w={'100%'}
                                placeholder="请将需要翻译的JSON文本粘贴到这里"
                                label="JSON输入"
                                autosize
                                resize='both'
                                minRows={maxRows}
                                maxRows={maxRows}
                                {...rh.bindOnChange('inputJSON')}
                                className="overflow-auto"
                            />
                        </Group>

                        <Group mt={10} wrap='nowrap' justify="space-between">
                            <Group gap={7}>
                                <ControlBar actions={[
                                    {
                                        type: 'submit',
                                        text: "开始翻译",
                                        loading: translating,
                                        onClick: async () => {
                                            setTranslating(true)
                                            try {
                                                await rh.checkLoginStatus()
                                                await t_sendReq({
                                                    text: rh.state?.inputJSON || '',
                                                    type: 'json',
                                                    sourceLang: rh.state?.sourceLang + "",
                                                    targetLang: rh.state?.targetLang + ""
                                                })
                                            } catch (e) { throw e } finally {
                                                setTranslating(false)
                                            }
                                        }
                                    },
                                    {
                                        color: 'green',
                                        text: '复制结果',
                                        onClick: () => {
                                            clipboard.copy(rh.state?.outputJSON || '无结果')
                                            AlertUtils.alertSuccess('已复制到剪贴板')
                                        }
                                    },
                                    {
                                        color: 'gray',
                                        text: '示例JSON',
                                        onClick: () => {
                                            rh.updateValue({
                                                inputJSON: `{
    "hello": "你好",
    "world": "世界",
    "internal" : {
        "key": "深层次的key值",
        "key2": "深层次的key值"
    }
}`})
                                        }
                                    },
                                    {
                                        color: 'gray',
                                        text: '交换语言',
                                        onClick: () => {
                                            rh.updateValue({
                                                sourceLang: rh.state?.targetLang,
                                                targetLang: rh.state?.sourceLang
                                            })
                                        }
                                    }
                                ]}
                                />
                            </Group>
                        </Group>

                        <Group mt={10} wrap='nowrap'>
                            <Textarea
                                w={'100%'}
                                label="JSON输出"
                                placeholder="翻译后的文本将会显示在这里"
                                autosize
                                resize="both"
                                minRows={maxRows}
                                {...rh.bindOnChange('outputJSON')}
                                maxRows={maxRows}
                                name='outputJSON'
                            />
                        </Group>
                    </>
                } sidebar={
                    <Group gap={7}>
                        <I18nSelect
                            {...rh.bindOnChange('sourceLang')}
                            label={'源语言'} name='sourceLang' />
                        <I18nSelect label="目标语言"
                            {...rh.bindOnChange('targetLang')}
                        />
                    </Group>
                } />
            </Card>
        </form>
    </Container>
}