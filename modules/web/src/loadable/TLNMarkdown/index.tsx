import { JSX_AI_polish, JSX_Pro_Only } from "@/AppJSX"
import CommonTLNBody, { TLNPState, TLNState } from "@/containers/CommonTLNBody"
import apiSlice from "@/store/reducers/apiSlice"
import { Badge, Pill } from "@mantine/core"

export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return <CommonTLNBody
        handleTranslate={async (state: TLNState, fn_translate) => {
            const result = await fn_translate(state.inputJSON)
            return result || '';
        }}
        id='markdown'
        label='Markdown文档'
        realtime
        extraOptionsJSX={
            <div className="mt-3 space-x-1">
                {JSX_AI_polish}
                {JSX_Pro_Only}
            </div>
        }
        example={
            `# 潮州历史文化简介

潮州，位于广东省东部，是一座历史悠久的文化名城。自秦始皇时期始，潮州便载入史册，历经沧桑，至今已有两千多年的历史。

## 历史沿革

- **秦始皇时期**：公元前214年，潮州地域属南海郡。
- **西汉时期**：公元前111年，属南海郡揭阳县地。
- **东晋时期**：公元331年，设立东冠郡；公元413年，分东官置义安郡，潮州的前身。
- **隋朝**：隋文帝开皇十年（公元590年），全国撤郡设州，始有“潮州”之名。

潮州曾相继为郡、州、路、府治所，拥有丰富的文物资源，如古城墙、古寺庙、古府第、古民居、古牌坊等。现有文物景点728处，其中国家重点文物保护单位8处，省级重点文物保护单位11处。
`

        }
    />
}