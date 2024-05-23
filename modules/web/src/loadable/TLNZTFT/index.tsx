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
                targetLang: 'zh-TW',
                translateMethod: 'KeyOnly'
            }
        }
        id='tlnztft'
        label='文章'
        realtime
        example={`漫步在潮州的大街小巷，各式美食摊贩琳琅满目，空气中弥漫着诱人的香气。潮州的美食最具代表性的当属潮汕牛肉火锅。新鲜的牛肉经过精心挑选、切片，搭配特制的沙茶酱，肉质鲜嫩，口感十足。而潮汕砂锅粥更是不容错过，米粒饱满，汤汁浓郁，入口即化，让人回味无穷。`}
        extraOptionsJSX={<>
            <div className="mt-3 space-x-1">
                <Badge color="teal">中文简繁体互转</Badge>
                <Badge color="lime">兼容港澳台术语</Badge>
            </div>
        </>}
    />
}