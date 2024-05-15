import apiSlice from "@/store/reducers/apiSlice"
import { Container, Select, Textarea } from "@mantine/core"
import { useEffect } from "react"
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import ControlBar from "@/components/ControlBar";
import PanelWithSideBar from "@/components/PanelWithSideBar";


export default () => {
    const maxRows = 10
    return <Container >
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
                            className="overflow-auto"
                        />
                    </Group>

                    <Group mt={10} wrap='nowrap' justify="space-between">
                        <Group gap={7}>
                            <ControlBar actions={[
                                {
                                    text: "开始翻译"
                                },
                                {
                                    color: 'green',
                                    text: '复制结果'
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
                        />
                    </Group>
                </>
            } sidebar={
                <Group gap={7}>
                    <Select
                        label="源语言"
                        placeholder="请选择源语言"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                    />
                    <Select
                        label="目标语言"
                        placeholder="请选择目标语言"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                    />
                </Group>
            } />
        </Card>
    </Container>
}