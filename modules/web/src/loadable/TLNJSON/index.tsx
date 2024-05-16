import apiSlice from "@/store/reducers/apiSlice"
import { Container, Select, Textarea } from "@mantine/core"
import { useEffect } from "react"
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

export type ActionFn<T> = (state: T, helpers: {
    updateState: (newState: Partial<T>) => void
}) => void
export type ActionMap<T> = {
    [key: string]: ActionFn<T>
}
export type ROptions<T> = {
    getDefaultStateFn: () => T,
    actions: ActionMap<T>
}
export class RHelper<T> {
    keyname: string = ''
    state: T | null = null
    constructor(keyname: string, state: T) {
        this.keyname = keyname
        this.state = state
    }
    bindOnChange = (key: keyof T) => {
        return {
            name: key,
            value: this.state ? this.state[key] : '',
            onChange: (e: any) => {
                FN_GetDispatch()(StateSlice.actions.updateKvSessionMap({
                    keyname: this.keyname,
                    keystate: {
                        [key]: e
                    }
                }))
            }
        }
    }
}
function register<T>(name: string, options: ROptions<T>): RHelper<T> | null {
    let crtMap = exportUtils.useSelector(v => v.state.kvSessionMap[name])
    useEffect(() => {
        const emptyOrNot = _.isEmpty(crtMap)
        if (emptyOrNot) {
            FN_GetDispatch()(StateSlice.actions.updateKvSessionMap({
                keyname: name,
                keystate: options.getDefaultStateFn()
            }))
        }
    }, [_.isEmpty(crtMap)])
    if (_.isEmpty(crtMap)) {
        return null;
    }
    return new RHelper<T>(name, crtMap as T)
}

export default () => {
    const rh = register('tlnjson', {
        getDefaultStateFn: () => {
            return {
                sourceLang: 'zh',
                targetLang: 'en',
                inputJSON: '',
                outputJSON: ''
            }
        },
        actions: {
            k: (state, helpers) => {
                console.log(state)
            }
        }
    })
    const maxRows = 10
    if (!rh) return ''
    return <Container >
        <form onSubmit={e => {
            e.preventDefault()
        }}>
            <Card withBorder shadow="sm" radius="md">

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
                                name='inputJSON'
                                className="overflow-auto"
                            />
                        </Group>

                        <Group mt={10} wrap='nowrap' justify="space-between">
                            <Group gap={7}>
                                <ControlBar actions={[
                                    {
                                        type: 'submit',
                                        text: "开始翻译"
                                    },
                                    {
                                        color: 'green',
                                        text: '复制结果'
                                    },
                                    {
                                        color: 'gray',
                                        text: '示例JSON'
                                    },
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