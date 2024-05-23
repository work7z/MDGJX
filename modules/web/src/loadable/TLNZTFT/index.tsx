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
                sourceLang: 'zh',
                targetLang: 'zh-HK',
                translateMethod: 'KeyOnly'
            }
        }
        id='tlnztft'
        label='汉语'
        showExampleLabel="示例片段"
        realtime
        example={`漫步在潮州街头，仿佛穿越时空，回到了千年前的繁华景象。古城墙巍峨耸立，守护着这座城市的沧桑岁月。牌坊街巷，石板路面，一砖一瓦都透露出浓厚的历史底蕴。潮州西湖、广济桥等名胜古迹，更是吸引了无数游客前来探寻这座古城的神秘魅力。`}
        extraOptionsJSX={<>
            <div className="mt-3 space-x-1">
                <Badge color="teal">中文简繁体互转</Badge>
                <Badge color="lime">兼容港澳台术语</Badge>
            </div>
        </>}
    />
}