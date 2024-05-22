import CommonTLNBody, { TLNPState, TLNState } from "@/containers/CommonTLNBody"
import apiSlice from "@/store/reducers/apiSlice"
import { JSONTranslateMethods, jsonExample } from "../TLNJSON"

export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return <CommonTLNBody
        verticalSideBySide
        label='JSON中英文对照'
        realtime
        defaultTLNPState={
            {
                fillFileMode: false,
                sourceLang: 'auto',
                targetLang: 'zh',
                translateMethod: 'KeyOnly'
            }
        }
        handleTranslate={async (state, fn_translate) => {
            let fn_translate_impl = JSONTranslateMethods.find(x => x.value === state.translateMethod)?.func
            if (!fn_translate_impl) {
                fn_translate_impl = JSONTranslateMethods[0].func
            }
            const result = await fn_translate_impl(state.inputJSON, fn_translate)
            return result;
        }}
        id='json'
        example={
            jsonExample
        }
    />
}