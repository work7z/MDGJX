import CommonTLNBody, { TLNPState, TLNState } from "@/containers/CommonTLNBody"
import apiSlice from "@/store/reducers/apiSlice"
import { jsonExample } from "../TLNJSON"

export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return <CommonTLNBody
        handleTranslate={async (state: TLNState, fn_translate) => {
            const result = await fn_translate(state.inputJSON)
            return result || '';
        }}
        id='text'
        verticalSideBySide
        label='JSON中英文对照'
        realtime
        example={jsonExample}
    />
}