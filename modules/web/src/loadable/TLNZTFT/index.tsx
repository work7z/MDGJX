import CommonTLNBody, { TLNPState, TLNState } from "@/containers/CommonTLNBody"
import apiSlice from "@/store/reducers/apiSlice"
import { Badge } from "@mantine/core"

export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return <CommonTLNBody
        handleTranslate={async (state: TLNState, fn_translate) => {
            const result = await fn_translate(state.inputJSON)
            return result || '';
        }}
        defaultTLNPState={
            {
                fillFileMode: false,
                sourceLang: 'auto',
                targetLang: 'zh',
                translateMethod: 'KeyOnly'
            }
        }
        id='tlnztft'
        label='文章'
        realtime
        example={`心中不用掛念著 GNU 也可以編寫出優秀的自由軟體；以 Linux 為名也誕生了很多優秀的作品。但從第一次被創造出來開始，“Linux” 一詞就代表了一種哲學，它並沒有特別承諾自由合作。隨著企業愈來愈常使用這個名字，我們就愈來愈難將其與社群精神連結起來。 摘选自《名稱的重要性》`}
        extraOptionsJSX={<>
            <div className="mt-3 space-x-1">
                <Badge color="teal">中文简繁体互转</Badge>
                <Badge color="lime">兼容港澳台术语</Badge>
            </div>
        </>}
    />
}