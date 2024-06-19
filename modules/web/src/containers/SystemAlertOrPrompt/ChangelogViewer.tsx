import GetAppInfo from "@/AppInfo"
import { FN_GetDispatch } from "@/store/nocycle"
import apiSlice from "@/store/reducers/apiSlice"
import MemorySlice from "@/store/reducers/memorySlice"
import { isDesktopMode } from "@/utils/DesktopUtils"
import exportUtils from "@/utils/ExportUtils"
import { isPortalMode } from "@/utils/PortalUtils"
import { Button, Modal } from "@mantine/core"
import dayjs from "dayjs"
import _ from "lodash"
import { useEffect } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import Markdown from 'react-markdown'
import MarkdownCpt from "@/components/MarkdownCpt"
const saveKey = 'ukSwp3UmN'

export default ()=>{
    const changeLogRes = apiSlice.useGetSysConfChangeLogQuery({
        checkType: isDesktopMode() ? 'desktop2' : 'web2',
        currentVer: isDesktopMode() ?  'desktop2-'+GetAppInfo().version:GetAppInfo().version
    }, {
        pollingInterval: 60 * 1000*5, // 5 minutes
        skip: isPortalMode()
    })
    useEffect(() => {
        if (!isPortalMode()) {
            // only for non-portal mode
            if (changeLogRes.isSuccess) {
                const crtRes = changeLogRes.data?.data
                if (crtRes && !_.isEmpty(crtRes.updates)) {
                    if(crtRes.timestamp == localStorage.getItem(saveKey)){
                        console.log('ignore this update')
                        return;
                    }
                    FN_GetDispatch()(
                        MemorySlice.actions.updateOneOfParamState({
                            showChangeLogModal: true
                        })
                    )
                }
            }
        }
    }, [changeLogRes.status])
    const hist = useHistory()
    const [showChangeLogModal] = exportUtils.useSelector(v => [
        v.memory.showChangeLogModal
    ])
    const tData = changeLogRes.data?.data
    const closeIt = ()=>{
        FN_GetDispatch()(
            MemorySlice.actions.updateOneOfParamState({
                showChangeLogModal: false
            })
        )
    }
    return <Modal opened={ showChangeLogModal} onClose={() => {
   closeIt()
    }} title={
        `更新日志 - 新版本已为您推送`
    }>
        <div className="p-2 space-y-1">
            <a onClick={()=>{
                localStorage.setItem(saveKey, tData?.timestamp || '0')
            }} href={`https://mdgjx.com/settings/install?from=app`} target="_blank" >
                <Button color="blue" fullWidth>立即更新</Button>
            </a>
            <Button color="gray" fullWidth variant="outline" onClick={()=>{
               closeIt()
                localStorage.setItem(saveKey, tData?.timestamp || '0')
            }}>忽略本次</Button>
        </div>
        <div className="p-2">
            <div className='font-bold text-lg mb-3'>更新详情 ({dayjs(parseInt(tData?.timestamp || '0')*1000).format('YYYY-MM-DD')})</div>
            <div className='pl-3'>
                {
                    _.map(tData?.updates, (x, d, n) => {
                        return <div>
                            <div className='font-bold'>{x.version}</div>
                            <div className='text-sm'>
                                <MarkdownCpt str={x.description || `优化了部分系统组件逻辑`}>
                                </MarkdownCpt>
                            </div>
                            <div className='text-xs text-gray-500'>{dayjs(parseInt(x.timestamp || '0') * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                        </div>
                    })
                }
</div>
        </div>
    </Modal>
}