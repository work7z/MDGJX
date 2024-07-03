import XToolsViewer from "@/containers/XToolsViewer"
import { HeroText } from "./HeroText"
import { ActionIcon, Button, Card, HoverCard, Tabs, Text, TextInput, Title, Tooltip, rem } from "@mantine/core"
import React, { useMemo, useState } from "react"
import {
    IconAperture,
    IconArrowsShuffle, IconLockSquare, IconFingerprint, IconSortDescendingNumbers, IconLock, IconCertificate, IconCalendar, IconArrowsLeftRight, IconLetterX, IconPalette, IconLetterCaseToggle, IconSpeakerphone, IconTextWrap, IconLink, IconUnlink, IconDeviceDesktop, IconTags, IconDeviceMobile, IconWorld, IconKey, IconKeyboard, IconEdit, IconBrowser, IconMailbox, IconBrandGit, IconServer, IconAlarm, IconList, IconDatabase, IconFileInvoice, IconBrandDocker, IconCode, IconBinary, IconBuildingFactory, IconMath, IconHourglass, IconPercentage, IconTemperature, IconPhone, IconAlignJustified, IconFileText, IconMoodSmile, IconEyeOff, IconFileDiff, IconArtboard, IconCamera,
    IconTools,
    IconExchange,
    IconSearch,
    IconBookmark,
} from "@tabler/icons-react"

import _ from "lodash"
import { Link } from "react-router-dom"
import py from 'tiny-pinyin'
import { SystemSubModuleItem, useSystemModulesList } from "@/systemModules"
import { DynamicIcon } from "@/containers/DynamicIcon"
import { useHasUserSignIn } from "@/utils/AuthUtils"
import apiSlice from "@/store/reducers/apiSlice"
import AlertUtils from "@/utils/AlertUtils"
import exportUtils from "@/utils/ExportUtils"

const iconMapping = {
    EyeOff: () => <IconEyeOff />,
    ArrowsShuffle: () => <IconArrowsShuffle />,
    LockSquare: () => <IconLockSquare />,
    Fingerprint: () => <IconFingerprint />, SortDescendingNumbers: () => <IconSortDescendingNumbers />, Lock: () => <IconLock />, AlignJustified: () => <IconAlignJustified />, ShortTextRound: () => <IconTools />, Certificate: () => <IconCertificate />, Calendar: () => <IconCalendar />, ArrowsLeftRight: () => <IconArrowsLeftRight />, LetterX: () => <IconLetterX />, FileDigit: () => <IconTools />, FileDigit2: () => <IconTools />, Palette: () => <IconPalette />, LetterCaseToggle: () => <IconLetterCaseToggle />, Speakerphone: () => <IconSpeakerphone />, Binary: () => <IconBinary />, TextWrap: () => <IconTextWrap />, AlignJustified2: () => <IconAlignJustified />, AlignJustified123: () => <IconAlignJustified />, Braces: () => <IconTools />, Braces2: () => <IconTools />, List: () => <IconList />, Link: () => <IconLink />, Code: () => <IconCode />, Unlink: () => <IconUnlink />, DeviceDesktop: () => <IconDeviceDesktop />, PasswordRound: () => <IconTools />, Tags: () => <IconTags />, DeviceMobile: () => <IconDeviceMobile />, World: () => <IconWorld />, Key: () => <IconKey />, Keyboard: () => <IconKeyboard />, AbcRound: () => <IconTools />, Edit: () => <IconEdit />, Browser: () => <IconBrowser />, HttpRound: () => <IconTools />, CompareArrowsRound: () => <IconTools />, Mailbox: () => <IconMailbox />, BrandGit: () => <IconBrandGit />, Server: () => <IconServer />, Alarm: () => <IconAlarm />, Braces3: () => <IconTools />, Braces21: () => <IconTools />, List3: () => <IconList />, Database: () => <IconDatabase />, FileInvoice: () => <IconFileInvoice />, BrandDocker: () => <IconBrandDocker />, Code2: () => <IconCode />, AlignJustified3: () => <IconAlignJustified />, RouterOutlined: () => <IconTools />, Binary3: () => <IconBinary />, UnfoldMoreOutlined: () => <IconTools />, Devices: () => <IconTools />, Devices2: () => <IconTools />, BuildingFactory: () => <IconBuildingFactory />, Math: () => <IconMath />, Hourglass: () => <IconHourglass />, Percentage: () => <IconPercentage />, TimerOutlined: () => <IconTools />, Temperature: () => <IconTemperature />, SpeedFilled: () => <IconTools />, Phone: () => <IconPhone />, AlignJustified33: () => <IconAlignJustified />, FileText: () => <IconFileText />, MoodSmile: () => <IconMoodSmile />, EyeOff123: () => <IconEyeOff />, FileDiff: () => <IconFileDiff />, Artboard: () => <IconArtboard />, Qrcode: () => <IconTools />, Qrcode322: () => <IconTools />, ImageOutlined: () => <IconTools />, Camera: () => <IconCamera />
}
export default (props: {
    filterUnFavourite?: boolean
}) => {
    const [idx, setIdx] = React.useState('all')
    const sml = useSystemModulesList({})
    const mainSubModulesItems = sml.list[0].children?.filter(x => !x.ignoreInNav) || []
    const currentToolItem = mainSubModulesItems.find(x => x.id == idx) || mainSubModulesItems[0]
    // toolsNavInfo.find(x => x.id === idx) || toolsNavInfo[0]
    let finalSubToolsArr: SystemSubModuleItem[] = []
    const allSubToolsArr = useMemo(() => {
        const allSubModulesItem: SystemSubModuleItem[] = []
        mainSubModulesItems.forEach(x => {
            allSubModulesItem.push(...(x.children || []))
        })
        return allSubModulesItem
    }, [mainSubModulesItems, sml.stillInitializing])
    const [tmpDebounce, _setTmpDebounce] = React.useState(0)
    let setTmpDebounce = useMemo(() => {
        return _.debounce(_setTmpDebounce, 300)
    }, [])
    const [searchIpt, _setSearchIpt] = React.useState('')
    const setSearchIpt = (val) => {
        _setSearchIpt(val)
        setTmpDebounce(Date.now())
    }
    if (idx === 'all') {
        finalSubToolsArr = allSubToolsArr
    } else {
        finalSubToolsArr = currentToolItem.children || []
    }
    type Extra_SystemSubModuleItem = {
        inFolder: boolean
    } & SystemSubModuleItem
    const raw_calcFinalSubToolsArr: (
        SystemSubModuleItem
    )[] = useMemo(() => {
        const lowerIpt = searchIpt.toLowerCase()
        return finalSubToolsArr.filter(x => {
            let existOrNot = false;
            if (x.keywords) {
                x.keywords.forEach(y => {
                    if (y.includes(lowerIpt)
                        || py.convertToPinyin(y).includes(lowerIpt)
                    ) {
                        existOrNot = true
                    }
                })
            }
            if (existOrNot) {
                return true
            }
            return (_.toLower(x.name) + _.toLower(py.convertToPinyin(x.name))).indexOf(lowerIpt) !== -1 || ('' + (
                x?.keywords?.join("") + _.toLower(py.convertToPinyin(x?.keywords?.join("") + '')) ||
                _.toLower(x.description) + _.toLower(py.convertToPinyin(x.description || ''))

            )).indexOf(lowerIpt) !== -1
        })
    }, [tmpDebounce, idx, sml.stillInitializing,])
    const previewCtn = 4 * 10
    const signIn = useHasUserSignIn()
    const [forceViewAll, onForceViewAll] = useState(false)
    const [hoverId, setHoverId] = useState('')
    const folderRes = apiSlice.useFavFoldersGetQuery({}, {
        skip: !signIn,
        pollingInterval: 1000 * 60 * 5,
    })
    const folderItemsRes = apiSlice.useFavFoldersItemsGetQuery({}, {
        pollingInterval: 1000 * 60 * 5,
        skip: !signIn
    })
    const [t_addFolderItem, addFolderItemRes] = apiSlice.useLazyFavFoldersItemAddQuery({})
    const [loading, onLoading] = useState(false)
    const [t_favFoldersItemDelete, favFoldersItemDeleteRes] = apiSlice.useLazyFavFoldersItemDeleteQuery({})
    const calcFinalSubToolsArr: (
        Extra_SystemSubModuleItem[]
    ) = useMemo(() => {
        const notE = !_.isEmpty(folderItemsRes.data?.data)
        let val = raw_calcFinalSubToolsArr.map(x => {
            return {
                ...x,
                inFolder: notE && folderItemsRes.data?.data?.findIndex(v => v.url === x.href) !== -1
            } satisfies Extra_SystemSubModuleItem
        }).sort(x => {
            return x.inFolder ? -1 : 1
        }) || []
        if (props.filterUnFavourite) {
            val = val.filter(x => x.inFolder)
        }
        return val;
    }, [raw_calcFinalSubToolsArr, folderItemsRes.data?.data]) || []
    const rh = exportUtils.register('subpart', {
        getNotPersistedStateFn() {
            return {}
        },
        getPersistedStateFn() {
            return {}
        }
    })

    if (!rh) {
        return ''
    }
    return (
        <div>
            <Tabs value={idx} onChange={e => {
                setIdx(e + "")
            }}>
                <Tabs.List>
                    <Tabs.Tab value={'all'} >全部{
                        props.filterUnFavourite ? <></>:<>
                            ({allSubToolsArr.length})
                        </>}</Tabs.Tab>
                    {
                        mainSubModulesItems.map(x => {
                            return (
                                <Tabs.Tab value={x.id} >
                                    {x.name}{
                                        props.filterUnFavourite?<></>
                                        :<>
                                                ({x.children?.length || 0})</>
                                    }
                                </Tabs.Tab>
                            )
                        })
                    }
                </Tabs.List>
            </Tabs>
            <div className="p-2 mt-1">
                <TextInput placeholder="键入以快速检索所需功能，支持大小写拼音"
                    leftSection={<IconSearch />}
                    value={searchIpt}
                    name='quickseachmain'
                    onChange={(e) => setSearchIpt(e.currentTarget.value)}
                />
            </div>
            <div className="  p-2 pt-1 mt-0">
                {
                    (
                        forceViewAll ? calcFinalSubToolsArr : _.take(calcFinalSubToolsArr, previewCtn)
                    ).map(x => {
                        const currentURL = x.href;
                        const isCurrentURLInFolder = x.inFolder
                        const showFavButton = isCurrentURLInFolder || (
                            hoverId == x.href && hoverId !== ''
                        )
                        return (
                            <Link to={x.href + ''}>
                                <Tooltip label={x.description} position="bottom" openDelay={50} style={{
                                }}>
                                    <Card
                                        onMouseEnter={(e) => {
                                            setHoverId(x.href + '')
                                        }}
                                        onMouseLeave={(e) => {
                                            setHoverId('')
                                        }}
                                        shadow="xs" withBorder className="relative w-[100%] sm:w-[29%] 2xl:w-[24%]  hover:border-blue-300   box-border mb-2 mr-2 inline-block  " >
                                        <div className="flex items-center mb-2  space-x-2">
                                            {
                                                x.iconInStr ? <DynamicIcon icon={x.iconInStr} /> :
                                                    x.icon && x.icon.name && <DynamicIcon icon={x.icon.name} /> || <IconExchange />}
                                            <Title order={4} className="font-normal">
                                                <Text truncate>{x.name}</Text>
                                            </Title>
                                        </div>
                                        <Text truncate className="text-slate-600 dark:text-slate-400" size={"sm"}>
                                            {x.description}</Text>
                                        {
                                            showFavButton ? <Tooltip
                                                label={signIn ? isCurrentURLInFolder ? '取消收藏夹' : "加入收藏夹" : '请先登录'}>
                                                <ActionIcon
                                                    color='green'
                                                    size='md'
                                                    variant={isCurrentURLInFolder ? 'filled' : "light"}
                                                    style={{ display: showFavButton ? 'block' : 'none', width: rem(16), height: rem(16) }}
                                                    onClick={async (e) => {
                                                        e.preventDefault()
                                                        onLoading(true)
                                                        try {
                                                            await rh.checkLoginStatus()
                                                            const folder = folderRes.data?.data?.[0]
                                                            if (!folder || !folder.id) {
                                                                AlertUtils.alertErr('请先创建一个收藏夹')
                                                            } else {
                                                                if (isCurrentURLInFolder) {
                                                                    for (let ea of (folderItemsRes?.data?.data || [])) {
                                                                        if (ea.url === currentURL) {
                                                                            await t_favFoldersItemDelete({
                                                                                id: ea.id + ''
                                                                            })
                                                                        }
                                                                    }
                                                                    AlertUtils.alertInfo('已取消收藏')
                                                                } else {
                                                                    const r = await t_addFolderItem({
                                                                        folderId: folder.id,
                                                                        url: currentURL + '',
                                                                        name: x.seoName + '',
                                                                        remarks: '',
                                                                        type: 'user'
                                                                    })
                                                                    AlertUtils.alertSuccess('已加入收藏')
                                                                }
                                                                await folderRes.refetch()
                                                                await folderItemsRes.refetch()
                                                            }
                                                        } finally {
                                                            onLoading(false)
                                                        }
                                                    }}
                                                    loading={loading || favFoldersItemDeleteRes.isFetching || addFolderItemRes.isFetching || folderRes.isLoading || folderItemsRes.isLoading}
                                                    className="absolute right-1 top-1"

                                                >
                                                    <IconBookmark style={{ width: rem(16), height: rem(16) }} />
                                                </ActionIcon>
                                            </Tooltip> : ''
                                        }
                                    </Card>
                                </Tooltip>

                            </Link>
                        )
                    })
                }
            </div>
            {
                _.size(calcFinalSubToolsArr) > previewCtn && !forceViewAll && (
                    <div className="flex justify-center ">
                        <Button variant="default" size='lg' onClick={() => {
                            onForceViewAll(true)
                        }}>查看全部</Button>
                    </div>)
            }
        </div>
    )
}