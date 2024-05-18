import CommonTLNBody, { TLNPState, TLNState } from "@/containers/CommonTLNBody"
import apiSlice from "@/store/reducers/apiSlice"

export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return <CommonTLNBody
        handleTranslate={async (state: TLNState, fn_translate) => {
            const result = await fn_translate(state.inputJSON)
            return result || '';
        }}
        id='text'
        label='文本'
        realtime
        example={
            `潮州市文物古迹众多，截止至2010年全市现有文物古迹728处，全国重点文物保护单位8处，广东省文物保护单位11处，市（县）级文物保护单位55处，是广东文物古迹荟萃之地。`}
    />
}