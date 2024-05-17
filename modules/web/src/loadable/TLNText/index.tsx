import CommonTLNBody, { TLNState } from "@/containers/CommonTLNBody"
import apiSlice from "@/store/reducers/apiSlice"

export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return <CommonTLNBody
        handleTranslate={async (state: TLNState) => {


            const r = await t_sendReq({
                text: state?.inputJSON || '',
                type: 'text',
                sourceLang: state?.sourceLang + "",
                targetLang: state?.targetLang + ""
            })
            const result = r.data?.data?.result
            return result || '';
        }}
        id='text'
        label='文本'
        example={
            `潮州市文物古迹众多，截止至2010年全市现有文物古迹728处，全国重点文物保护单位8处，广东省文物保护单位11处，市（县）级文物保护单位55处，是广东文物古迹荟萃之地[5]。 潮州是海峡西岸经济区成员城市之一，对外开放旅游城市，闽、粤、赣边韩江流域的商品集散地。全市地势北高南低，山地、丘陵占全市总面积的65%。`}
    />
}