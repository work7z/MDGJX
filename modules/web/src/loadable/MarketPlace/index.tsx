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
    LoadingOverlay,
    Button,
    ActionIcon,
    Tooltip,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie, IconSearch, IconSquareDotFilled, IconTruckLoading, IconLoader, IconReload, IconZoomReset, IconClearAll, IconHelp } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';
import { Search } from "@blueprintjs/icons";
import exportUtils from "@/utils/ExportUtils";
import _ from "lodash";
import { isPortalMode } from "@/utils/PortalUtils";


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

    const extListRes = localApiSlice.useGetExtListWithSearchQuery({
        searchText: rh?.npState?.searchText || '',
        searchSource: 'cloud-all-ext'
    }, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 1000 * 60 * 10,
    })

    const progressAllDataRes = localApiSlice.useExtHarmfulProgressAllDataQuery({}, {
        pollingInterval: 2000,
        skip: isPortalMode()
    })
    const [lazy_InstallExt, installExtRes] = localApiSlice.useLazyExtHarmfulInstallExtQuery()
    const [lazy_cleanExt, cleanExtRes] = localApiSlice.useLazyExtHarmfulCleanExtQuery({})

    if (!rh) {
        return ''
    }

    let hasAnyInstalling = false;

    const fData = extListRes?.data?.data
    const statusData = progressAllDataRes.data?.data


    _.every(fData?.allMetaInfo, (x) => {
        if (statusData?.[x.post_fullId as string]?.status == 'running') {
            hasAnyInstalling = true;
            return false;
        }
        return true;
    })

    return (
        <div className="bg-zinc-50 dark:bg-zinc-700 m-[-10px]  p-[10px]">
            <Container size="lg" py="xl" className="">
                <Group justify="center">
                    <Badge variant="filled" size="lg">
                        好用，就是这么简单！
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
                            extListRes.isFetching ? <IconLoader size={20} /> : <IconSearch size={20} />
                        } size="lg" placeholder="键入以搜索插件名，支持大小写拼音" />
                </div>
            </Container>

            <div className="flex flex-row mt-16  mb-2 px-2  justify-between">
                <div>总计{fData?.totals}个插件</div>
                <div className='flex flex-row space-x-2 items-center'>

                    <ActionIcon variant='default' size='sm' aria-label="Theme" onClick={() => {
                        extListRes.refetch()
                    }}>
                        <IconReload stroke={1.5} />
                    </ActionIcon>
                    {
                        hasAnyInstalling ? <Button color='red' size='compact-sm' variant="light">
                            取消安装
                        </Button>
                            : ''
                    }
                    <div>
                        更新于: {fData?.lastUpdated}
                    </div>


                </div>
            </div>
            <Card withBorder className="h-[100vh]">
                <LoadingOverlay visible={extListRes.isFetching} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <div className="  p-2 pt-1 mt-0">
                    {
                        fData?.allMetaInfo?.map(x => {
                            const isItInstalling = cleanExtRes.isFetching || installExtRes.isFetching || statusData?.[x.post_fullId as string]?.status == 'running';
                            const runMsg = statusData?.[x.post_fullId as string]?.message 
                            
                            ?
                            statusData?.[x.post_fullId as string]?.message + ' ' + statusData?.[x.post_fullId as string]?.runTS:'点击以执行';
                            let fn_installExt = () => {
                                lazy_InstallExt({
                                    fullId: x.post_fullId as string
                                }).then(r => {
                                    progressAllDataRes.refetch()
                                })
                            }
                            let fn_upgradeExt = () => {
                                //
                            }
                            let fn_uninstallExt = ()=>{
                                //
                            }
                            return <Card shadow="xs" withBorder className="w-[100%] sm:w-[29%] 2xl:w-[24%]    box-border mb-2 mr-2 inline-block  " >
                                <div className="flex items-center mb-2  space-x-2">
                                    {/* {x.icon && x.icon.name && iconMapping[x.icon.name] && iconMapping[x.icon.name]() || <IconExchange />} */}
                                    <Title order={4} className="font-normal">
                                        <Text truncate>{x.name}</Text>
                                    </Title>
                                </div>
                                <Text title={x.shortDesc} truncate className="text-slate-600 dark:text-slate-400" size={"sm"}>{x.shortDesc}</Text>

                                <div className="flex justify-between space-x-2 mt-4 items-center ">
                                    <div className="flex space-x-1">
                                        <Badge color="green" variant="light" size='md'>官方插件</Badge>
                                        <Badge color="yellow" variant="light" size='md'>{x.version}</Badge>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Tooltip  label={runMsg || ''} position="top">
                                            {
                                                x.installed ? <>
                                                    {x.hasNewVersion ? <Button
                                                        onClick={() => {
                                                            fn_upgradeExt()
                                                        }}
                                                        loading={isItInstalling} color="green" size="compact-sm" radius="md">
                                                        更新
                                                    </Button> : ''}
                                                    <Button onClick={() => {
                                                        fn_uninstallExt()
                                                    }} color="red" variant="light" size="compact-sm" radius="md">
                                                        卸载
                                                    </Button>
                                                </> : <Button color="blue"
                                                    onClick={() => {
                                                        fn_installExt()
                                                    }}
                                                    loading={isItInstalling} size="compact-sm" radius="md">
                                                    安装
                                                </Button>
                                            }
                                        </Tooltip>
                                    </div>
                                </div>
                            </Card>
                        })
                    }
                </div>
            </Card>
        </div>
    );
}