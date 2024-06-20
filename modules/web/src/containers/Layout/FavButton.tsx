
import apiSlice from "@/store/reducers/apiSlice";
import AlertUtils from "@/utils/AlertUtils";
import AuthUtils, { useHasUserSignIn } from "@/utils/AuthUtils";
import exportUtils from "@/utils/ExportUtils";
import { ActionIcon, Affix, Button, Tooltip, Transition, rem } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp, IconBookmark, IconPlaylist, IconPlaylistAdd } from "@tabler/icons-react"
import { useState } from "react";

export default () => {

    const signIn = useHasUserSignIn()
    const rh = exportUtils.register('favbtn', {
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
    const currentURL = location.pathname + '?' + location.search
    const currentTitle = document.title
    const isCurrentURLInFolder = folderItemsRes.data?.data?.some(v => v.url === currentURL)

    if (!rh) return ''

    return <Affix position={{ bottom: 5, right: 5 }}>
        <Tooltip label={signIn ? isCurrentURLInFolder ? '取消收藏夹' : "加入收藏夹" : '请先登录'}>
            <ActionIcon
                color='green'
                size='md'
                variant={isCurrentURLInFolder ? 'filled' : "light"}
                style={{ width: rem(16), height: rem(16) }}
                onClick={async () => {
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
                            } else {
                                const r = await t_addFolderItem({
                                    folderId: folder.id,
                                    url: currentURL,
                                    name: currentTitle,
                                    remarks: '',
                                    type: 'user'
                                })
                            }
                            await folderRes.refetch()
                            await folderItemsRes.refetch()
                        }
                    } finally {
                        onLoading(false)
                    }
                }}
                loading={addFolderItemRes.isFetching || folderRes.isLoading || folderItemsRes.isLoading}
            >
                <IconBookmark style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
        </Tooltip>

    </Affix>
}