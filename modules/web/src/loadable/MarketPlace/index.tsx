import localApiSlice from "@/store/reducers/localApiSlice"

import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
    Input,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie, IconSearch } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';
import { Search } from "@blueprintjs/icons";
import exportUtils from "@/utils/ExportUtils";


export default function () {
    const rh = exportUtils.register('mkplace', {
        getNotPersistedStateFn() {
            return {
                searchText: ''
            }
        },
        getPersistedStateFn() {
            return {}
        }
    })

    const extModeRes = localApiSlice.useCheckExtModeQuery({
    })
    const extListRes = localApiSlice.useGetExtListWithSearchQuery({
        searchText: ''
    })

    if (!rh) {
        return ''
    }

    return (
        <div className="bg-zinc-50 dark:bg-zinc-700 m-[-10px]  p-[10px]">
            <Container size="lg" py="xl" className="">
                <Group justify="center">
                    <Badge variant="filled" size="lg">
                        “超级插件市场”
                    </Badge>
                </Group>

                <Title order={2} className={classes.title} ta="center" mt="sm">
                    专业至上，为您量身打造的云插件市场！
                </Title>

                <Text c="dimmed" className={classes.description} ta="center" mt="md">
                    从开发工具到待办笔记，从生活助手到学习资源，不分领域，应有尽有！
                </Text>

                <div className="mt-6">
                    <Input
                    {...rh?.bindOnChange({
                        npStateKey: 'searchText'
                    })}
                    rightSection={
                        <IconSearch size={20} />
                    } size="lg" placeholder="键入以搜索插件名，支持大小写拼音" />
                </div>
            </Container>

            <div className="flex flex-row mt-16  mb-2 px-2  justify-between">
                <div>总计{102}个插件</div>
                <div>更新于: 2024-09-10</div>
            </div>
            <Card withBorder className="h-[100vh]">

                <div>

                </div>
            </Card>
        </div>
    );
}