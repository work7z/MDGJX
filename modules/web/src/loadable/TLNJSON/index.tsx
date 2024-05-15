import apiSlice from "@/store/reducers/apiSlice"
import { Container, Textarea } from "@mantine/core"
import { useEffect } from "react"
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import ControlBar from "@/components/ControlBar";


export default () => {
    const maxRows = 10
    return <Container >
        <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="center">
                    <Text fw={500}>JSON格式翻译工具</Text>
                </Group>
            </Card.Section>


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
                <Group gap={7}>
                    <div>right</div>
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

        </Card>
    </Container>
}