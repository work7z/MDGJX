import apiSlice, { FavouriteFolderItem } from "@/store/reducers/apiSlice"
import { useHasUserSignIn } from "@/utils/AuthUtils"
import exportUtils from "@/utils/ExportUtils"
import { Card, Tabs, TextInput, Text, Title, ActionIcon } from "@mantine/core"
import { IconExchange, IconRowRemove, IconSearch, IconTrash } from "@tabler/icons-react"
import _ from "lodash"
import React from "react"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import py from 'tiny-pinyin'
export default () => {
    const signIn = useHasUserSignIn()
    const rh = exportUtils.register('cloudfav', {
        getNotPersistedStateFn() {
            return {}
        },
        getPersistedStateFn() {
            return {}
        }
    })

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
    // TODO: 从默认收藏夹，扩展到多个收藏夹配置
    const dftId = folderRes.data?.data?.[0]?.id + ''
    const folderItemArr = folderItemsRes.data?.data || []
    const [searchIpt, setSearchIpt] = React.useState('')

    const calcFinalSubToolsArr: (
        FavouriteFolderItem
    )[] = useMemo(() => {
        const lowerIpt = searchIpt.toLowerCase()
        return folderItemArr.filter(x => {
            return (_.toLower(x.name) + _.toLower(py.convertToPinyin(x.name))).indexOf(lowerIpt) !== -1 || ('' + (
                false
            )).indexOf(lowerIpt) !== -1
        })
    }, [searchIpt, folderItemArr])
    return <div>
        <Card withBorder shadow="xs" padding="md">
            <Tabs value={dftId} variant="pills" orientation="vertical">
                <Tabs.List>
                    {
                        folderRes.data?.data?.map((v, i) => {
                            return (
                                <Tabs.Tab key={i} value={v.id + ''}>
                                    {v.name}
                                </Tabs.Tab>
                            )
                        })
                    }
                </Tabs.List>

                <Tabs.Panel value={dftId}>
                    <div className="px-2 py-0">
                        <div className="p-2 pt-0">
                            <TextInput placeholder="快速检索收藏夹"
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
                                        <Link to={x.url}>
                                            <Card shadow="xs" withBorder className="w-[100%]   hover:border-blue-300   box-border mb-2 mr-2 inline-block  " >
                                                <div className="flex justify-between">
                                                    <div className="flex items-center mb-2  space-x-2">
                                                        {<IconExchange />}
                                                        <Text  >{x.name}</Text>
                                                    </div>
                                                    <ActionIcon
                                                        onClick={e => {
                                                            e.preventDefault()
                                                            t_favFoldersItemDelete({
                                                                id: x.id + ''
                                                            }).then(x => {
                                                                folderItemsRes.refetch()
                                                            })
                                                        }}
                                                        variant="light"
                                                        loading={favFoldersItemDeleteRes.isFetching}
                                                        color="red"
                                                    >
                                                        <IconTrash style={{

                                                        }} />
                                                    </ActionIcon>
                                                </div>
                                                {/* <Text title={x.description} truncate className="text-slate-600 dark:text-slate-400" size={"sm"}>{x.description}</Text> */}
                                            </Card>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Tabs.Panel>
            </Tabs>
        </Card>
    </div>
}