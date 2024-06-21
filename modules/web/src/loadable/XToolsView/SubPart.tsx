import XToolsViewer from "@/containers/XToolsViewer"
import { HeroText } from "./HeroText"
import { Button, Card, HoverCard, Tabs, Text, TextInput, Title } from "@mantine/core"
import { SubToolItem, toolsNavInfo } from "@/toolsNavInfo"
import React, { useMemo } from "react"
import {
    IconAperture,
    IconArrowsShuffle, IconLockSquare, IconFingerprint, IconSortDescendingNumbers, IconLock, IconCertificate, IconCalendar, IconArrowsLeftRight, IconLetterX, IconPalette, IconLetterCaseToggle, IconSpeakerphone, IconTextWrap, IconLink, IconUnlink, IconDeviceDesktop, IconTags, IconDeviceMobile, IconWorld, IconKey, IconKeyboard, IconEdit, IconBrowser, IconMailbox, IconBrandGit, IconServer, IconAlarm, IconList, IconDatabase, IconFileInvoice, IconBrandDocker, IconCode, IconBinary, IconBuildingFactory, IconMath, IconHourglass, IconPercentage, IconTemperature, IconPhone, IconAlignJustified, IconFileText, IconMoodSmile, IconEyeOff, IconFileDiff, IconArtboard, IconCamera,
    IconTools,
    IconExchange,
    IconSearch
} from "@tabler/icons-react"
import _ from "lodash"
import { Link } from "react-router-dom"
import py from 'tiny-pinyin'

const iconMapping = {
    EyeOff: () => <IconEyeOff />,
    ArrowsShuffle: () => <IconArrowsShuffle />,
    LockSquare: () => <IconLockSquare />,
    Fingerprint: () => <IconFingerprint />, SortDescendingNumbers: () => <IconSortDescendingNumbers />, Lock: () => <IconLock />, AlignJustified: () => <IconAlignJustified />, ShortTextRound: () => <IconTools />, Certificate: () => <IconCertificate />, Calendar: () => <IconCalendar />, ArrowsLeftRight: () => <IconArrowsLeftRight />, LetterX: () => <IconLetterX />, FileDigit: () => <IconTools />, FileDigit2: () => <IconTools />, Palette: () => <IconPalette />, LetterCaseToggle: () => <IconLetterCaseToggle />, Speakerphone: () => <IconSpeakerphone />, Binary: () => <IconBinary />, TextWrap: () => <IconTextWrap />, AlignJustified2: () => <IconAlignJustified />, AlignJustified123: () => <IconAlignJustified />, Braces: () => <IconTools />, Braces2: () => <IconTools />, List: () => <IconList />, Link: () => <IconLink />, Code: () => <IconCode />, Unlink: () => <IconUnlink />, DeviceDesktop: () => <IconDeviceDesktop />, PasswordRound: () => <IconTools />, Tags: () => <IconTags />, DeviceMobile: () => <IconDeviceMobile />, World: () => <IconWorld />, Key: () => <IconKey />, Keyboard: () => <IconKeyboard />, AbcRound: () => <IconTools />, Edit: () => <IconEdit />, Browser: () => <IconBrowser />, HttpRound: () => <IconTools />, CompareArrowsRound: () => <IconTools />, Mailbox: () => <IconMailbox />, BrandGit: () => <IconBrandGit />, Server: () => <IconServer />, Alarm: () => <IconAlarm />, Braces3: () => <IconTools />, Braces21: () => <IconTools />, List3: () => <IconList />, Database: () => <IconDatabase />, FileInvoice: () => <IconFileInvoice />, BrandDocker: () => <IconBrandDocker />, Code2: () => <IconCode />, AlignJustified3: () => <IconAlignJustified />, RouterOutlined: () => <IconTools />, Binary3: () => <IconBinary />, UnfoldMoreOutlined: () => <IconTools />, Devices: () => <IconTools />, Devices2: () => <IconTools />, BuildingFactory: () => <IconBuildingFactory />, Math: () => <IconMath />, Hourglass: () => <IconHourglass />, Percentage: () => <IconPercentage />, TimerOutlined: () => <IconTools />, Temperature: () => <IconTemperature />, SpeedFilled: () => <IconTools />, Phone: () => <IconPhone />, AlignJustified33: () => <IconAlignJustified />, FileText: () => <IconFileText />, MoodSmile: () => <IconMoodSmile />, EyeOff123: () => <IconEyeOff />, FileDiff: () => <IconFileDiff />, Artboard: () => <IconArtboard />, Qrcode: () => <IconTools />, Qrcode322: () => <IconTools />, ImageOutlined: () => <IconTools />, Camera: () => <IconCamera />

}
export default () => {
    const [idx, setIdx] = React.useState('all')
    const currentToolItem = toolsNavInfo.find(x => x.id === idx) || toolsNavInfo[0]
    let finalSubToolsArr: SubToolItem[] = []
    const allSubToolsArr = useMemo(() => {
        return _.flatten(toolsNavInfo.map(x => x.subTools || [])).sort((a, b) => a.name.localeCompare(b.name))
    }, [])
    const [searchIpt, setSearchIpt] = React.useState('')
    if (idx === 'all') {
        finalSubToolsArr = allSubToolsArr
    } else {
        finalSubToolsArr = currentToolItem.subTools || []
    }
    const calcFinalSubToolsArr: (
        SubToolItem
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
            return (_.toLower(x.name) + _.toLower(py.convertToPinyin(x.name))).indexOf(lowerIpt) !== -1 ||('' + (
                _.toLower(x.description) + _.toLower(py.convertToPinyin(x.description))
            )).indexOf(lowerIpt) !== -1
        })
    }, [searchIpt, idx])
    return (
        <div>
            <Tabs value={idx} onChange={e => {
                setIdx(e + "")
            }}>
                <Tabs.List>
                    <Tabs.Tab value={'all'} >全部({allSubToolsArr.length})</Tabs.Tab>
                    {
                        toolsNavInfo.filter(x => !x.bodyFnIfHave).map(x => {
                            return (
                                <Tabs.Tab value={x.id} >
                                    {x.name}({x.subTools?.length || 0})
                                </Tabs.Tab>
                            )
                        })
                    }
                </Tabs.List>
            </Tabs>
            <div className="p-2 mt-1">
                <TextInput placeholder="快速检索需要使用的工具名"
                    leftSection={<IconSearch />}
                    value={searchIpt}
                    name='quickseachmain'
                    onChange={(e) => setSearchIpt(e.currentTarget.value)}
                />
            </div>
            <div className="  p-2 pt-1 mt-0">
                {
                    (calcFinalSubToolsArr).map(x => {
                        return (
                            <Link to={x.path}>
                                <Card shadow="xs" withBorder className="w-[100%] sm:w-[29%] 2xl:w-[24%]  hover:border-blue-300   box-border mb-2 mr-2 inline-block  " >
                                    <div className="flex items-center mb-2  space-x-2">
                                        {x.icon && x.icon.name && iconMapping[x.icon.name] && iconMapping[x.icon.name]() || <IconExchange />}
                                        <Title order={4} className="font-normal">
                                            <Text truncate>{x.name}</Text>
                                        </Title>
                                    </div>
                                    <Text title={x.description} truncate className="text-slate-600 dark:text-slate-400" size={"sm"}>{x.description}</Text>
                                </Card>
                            </Link>
                        )
                        // return <HoverCard width={280} closeDelay={0} openDelay={300} shadow="md">
                        //     <HoverCard.Target>
                        //     </HoverCard.Target>
                        //     <HoverCard.Dropdown className="fixed right-0 top-0">
                        //         <Text size="sm">
                        //             {x.description}
                        //         </Text>
                        //     </HoverCard.Dropdown>
                        // </HoverCard>
                    })
                }
            </div>
        </div>
    )
}