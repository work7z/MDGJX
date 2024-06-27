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
    HoverCard,
    Alert,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie, IconSearch, IconSquareDotFilled, IconTruckLoading, IconLoader, IconReload, IconZoomReset, IconClearAll, IconHelp } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';
import { Search } from "@blueprintjs/icons";
import exportUtils from "@/utils/ExportUtils";
import _ from "lodash";
import { isPortalMode } from "@/utils/PortalUtils";
import { DynamicIcon } from "@/containers/DynamicIcon";
import { useEffect, useMemo } from "react";
import { isDevEnv } from "@/env";


export default function () {
    const rh = exportUtils.register('mkplace', {
        getNotPersistedStateFn() {
            return {
                searchText: ''
            }
        },
        getPersistedStateFn() {
            return {
                usingDevExtMode: false
            }
        }
    })

    const extListRes = localApiSlice.useGetExtListWithSearchQuery({
        searchText: rh?.npState?.searchText || '',
        searchSource: rh?.pState?.usingDevExtMode ? 'local-dev-ext' : 'cloud-all-ext'
    }, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 1000 * 60 * 10,
    })

    const progressAllDataRes = localApiSlice.useExtHarmfulProgressAllDataQuery({}, {
        pollingInterval: 3000,
        skip: isPortalMode()
    })

    const installExtsRes = localApiSlice.useExtGetAllInstalledExtsQuery({}, {
        pollingInterval: 10000
    })

    const [lazy_InstallExt, installExtRes] = localApiSlice.useLazyExtHarmfulInstallExtQuery()
    const [lazy_UnInstallExt, uninstallExtRes] = localApiSlice.useLazyExtHarmfulUnInstallExtQuery()
    const [lazy_cleanExt, cleanExtRes] = localApiSlice.useLazyExtHarmfulCleanExtQuery({})


    const fData = extListRes?.data?.data
    const statusData = progressAllDataRes.data?.data
    // const installExts = useMemo(() => {
    //     const done: string[] = []
    //     _.every(fData?.allMetaInfo, (x) => {
    //         done.push(x.post_fullId + '' + statusData?.[x.post_fullId as string]?.status)
    //         return true;
    //     })
    //     return done.join('-') + _.size(statusData);
    // }, [statusData, fData?.allMetaInfo])
    let hasAnyInstalling = false;
    _.every(fData?.allMetaInfo, (x) => {
        if (statusData?.[x.post_fullId as string]?.status == 'running') {
            hasAnyInstalling = true;
            return false;
        }
        return true;
    })
    useEffect(() => {
    //    !installExtsRes.isUninitialized && installExtsRes.refetch()
    //     !installExtsRes.isUninitialized &&   progressAllDataRes.refetch()
    }, [hasAnyInstalling])

    if (!rh) {
        return ''
    }


    return (
        <div className="bg-zinc-50 dark:bg-zinc-700 m-[-10px]  p-[10px]">
            <Container size="lg" py="xl" className="">
                <Group justify="center">
                    <Badge variant="filled" size="lg">
                        好用，就是这么简单！
                    </Badge>
                </Group>

                <Title order={2} className={classes.title} ta="center" mt="sm">
                    专业至上，为您量身打造的云插件市场
                </Title>

                <Text c="dimmed" className={classes.description} ta="center" mt="md">
                    从开发工具到待办笔记，从生活助手到学习资源，不分领域，应有尽有
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
                <div>
                    {
                        extListRes.isFetching ? 'loading...' : <>
                            {fData?.totals}个插件
                        </>
                    }
                </div>
                <div className='flex flex-row space-x-2 items-center'>
                    {
                        isDevEnv() ? <Button 
                        onClick={()=>{
                            rh?.updatePState({
                                usingDevExtMode: !rh?.pState?.usingDevExtMode
                            })
                        }}
                        size='compact-xs' variant={
                            rh?.pState?.usingDevExtMode ? 'light' : "default"
                        } >
                            {
                                !rh?.pState?.usingDevExtMode ? '使用本地库' : '切回云端库'
                            }
                        </Button> : ''
                    }
                    <ActionIcon variant='default' size='sm' aria-label="Theme" onClick={() => {
                        extListRes.refetch()
                    }}>
                        <IconReload stroke={1.5} />
                    </ActionIcon>
                    {
                        hasAnyInstalling ? <Button
                            onClick={() => {
                                lazy_cleanExt({
                                    fullId: 'noneed'
                                })
                            }}
                            loading={cleanExtRes.isFetching}
                            color='red' size='compact-sm' variant="light">
                            取消安装
                        </Button>
                            : ''
                    }
                    <Tooltip label="云端版本库(版本号与实际日期无关)">

                        <div>
                            <span>
                                版本库: {fData?.lastUpdated}
                            </span>
                        </div>
                    </Tooltip>
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
                                statusData?.[x.post_fullId as string]?.message + ' ' + statusData?.[x.post_fullId as string]?.runTS : '' + x.shortDesc;
                            let fn_installExt = () => {
                                lazy_InstallExt({
                                    fullId: x.post_fullId as string
                                }).then(r => {
                                    progressAllDataRes.refetch()
                                })
                            }
                            let fn_upgradeExt = () => {
                                lazy_InstallExt({
                                    fullId: x.post_fullId as string
                                }).then(r => {
                                    progressAllDataRes.refetch()
                                })
                            }
                            let fn_uninstallExt = () => {
                                lazy_UnInstallExt({
                                    fullId: x.post_fullId as string
                                }).then(r => {
                                    progressAllDataRes.refetch()
                                    installExtsRes.refetch()
                                })
                            }
                            let isItInstalled = false;
                            let hasNewVersion = false
                            let currentInstalledVer = x.version
                            _.forEach(installExtsRes?.data?.data, (myinstallLocalExtName, d, n) => {
                                if (myinstallLocalExtName.startsWith(x.id)) {
                                    currentInstalledVer = myinstallLocalExtName.split('@')[1]
                                    isItInstalled = true;
                                }
                                if (
                                    myinstallLocalExtName.startsWith(x.id) &&
                                    myinstallLocalExtName < x.post_fullId + ''
                                ) {
                                    hasNewVersion = true;
                                }
                            })
                            const jsxcard = <Card shadow="xs" withBorder className="w-[100%] sm:w-[29%] 2xl:w-[24%]    box-border mb-2 mr-2 inline-block  " >
                                <div className="flex items-center mb-2  space-x-2">
                                    {/* {x.icon && x.icon.name && iconMapping[x.icon.name] && iconMapping[x.icon.name]() || <IconExchange />} */}
                                    <DynamicIcon icon={x.iconInStr || "AppWindow"} />
                                    <Title order={4} className="font-normal">
                                        <Text truncate>{x.name}</Text>
                                    </Title>
                                </div>
                                <Text title={x.shortDesc} truncate className="text-slate-600 dark:text-slate-400" size={"sm"}>{x.shortDesc}</Text>
                                <div className="flex justify-between space-x-2 mt-4 items-center ">
                                    <div className="flex space-x-1">
                                        <Badge color="green" variant="light" size='md'>
                                            官方插件
                                        </Badge>
                                        <Badge color={
                                            hasNewVersion ? "yellow" : 'teal'
                                        } variant="light" size='md'>{currentInstalledVer}</Badge>
                                    </div>
                                    <div className="flex space-x-2">
                                        {
                                            isItInstalled ? <>
                                                {hasNewVersion ? <Button
                                                    onClick={() => {
                                                        fn_upgradeExt()
                                                    }}
                                                    loading={isItInstalling} color="green" size="compact-sm" radius="md">
                                                    更新
                                                </Button> : ''}
                                                <Button onClick={() => {
                                                    fn_uninstallExt()
                                                }} color="red" loading={cleanExtRes.isFetching} variant="light" size="compact-sm" radius="md">
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
                                    </div>
                                </div>
                            </Card>
                            return <HoverCard width={280} closeDelay={0} openDelay={300} shadow="md">
                                <HoverCard.Target>
                                    {jsxcard}
                                </HoverCard.Target>
                                <HoverCard.Dropdown className=" right-0 top-0">
                                    {
                                        hasNewVersion ? <div className="py-2">
                                            <Badge
                                                color="blue"
                                                variant="filled"
                                                size="sm"
                                            >
                                                可升级到{x.version}
                                            </Badge>
                                        </div> : ''
                                    }
                                    <Text size="sm">
                                        {runMsg}
                                    </Text>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        })
                    }
                </div>
            </Card>
        </div>
    );
}