import { FN_GetDispatch } from "@/store/nocycle"
import apiSlice from "@/store/reducers/apiSlice"
import settingsSlice from "@/store/reducers/settingsSlice"
import exportUtils from "@/utils/ExportUtils"
import { ActionIcon, Button, Card, rem, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import _ from "lodash"
import { useState } from "react"

export default () => {
    const searchContent = exportUtils.useSelector(v => v.settings.dictSearchText)
    const setSearchContent = (v) => {
        FN_GetDispatch()(
            settingsSlice.actions.updateOneOfParamState({
                dictSearchText: v
            })
        )
    }
    const whenHello: "夜深了，早点休息" | "早上好" | "中午好" | "下午好" | "晚上好" = (() => {
        const now = new Date()
        const hours = now.getHours()
        if (
            (hours >= 0 && hours < 6)
            ||
            (hours >= 21 && hours <= 24)
        ) {
            return "夜深了，早点休息"
        } else if (hours >= 0 && hours < 12) {
            return "早上好"
        } else if (hours >= 12 && hours < 14) {
            return "中午好"
        } else if (hours >= 14 && hours < 18) {
            return "下午好"
        } else if (hours >= 18 && hours <= 23) {
            return "晚上好"
        }
        return "早上好"
    })()
    const isEmpty = searchContent == ''
    const res = apiSlice.useDictSearchQuery({
        input: searchContent
    }, {
        skip: isEmpty,
        refetchOnMountOrArgChange: true
    })
    const arr = isEmpty ? [] : res.data?.data || []
    return <div>
        <div>
            <TextInput autoFocus size='lg'
                rightSection={res.isFetching ?
                    <ActionIcon loading={true} size='lg' variant="light" color="blue" /> :
                    <IconSearch style={{ width: rem(24), height: rem(24) }} stroke={1.5} />}
                placeholder={whenHello + "，请在此输入单词或文本"} value={searchContent} onChange={(e) => setSearchContent(e.currentTarget.value)} />
        </div>
        {
            _.isEmpty(arr) && res.isSuccess ?
                <div className="p-2">
                    {
                        true ? '暂无相关结果' : ''
                    }
                </div> : ''
        }
        {
            _.isEmpty(arr) ? '' :
                <div>
                    <div>
                        {
                            (arr).map((item) => {
                                return <Card shadow="xs" padding="xs" style={{ marginTop: 10 }} key={item.id}>
                                    <div className="flex flex-nowrap justify-start items-center">
                                        <div className="font-semibold mr-4 text-xl">{item.id}</div>
                                        <div className="dark:text-gray-300   text-gray-600 text-sm mt-1"> {item.chineseTranslation}</div>
                                    </div>
                                </Card>
                            })
                        }
                    </div>
                </div>
        }
    </div>
}