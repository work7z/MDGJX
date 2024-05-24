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
        showExampleLabel='示例文档'
        extraOptionsJSX={
            <div className="mt-3 space-x-1">
                {JSX_AI_polish}
                {JSX_Pro_Only}
            </div>
        }
        saveDataId='markdown'
        example={
            `## 简介
潮州广济桥，又名湘子桥，坐落在广东省潮州市韩江之上，是中国古代四大名桥之一。

## 历史背景
始建于南宋乾道七年，明朝时期形成"十八梭船廿四洲"的格局，潮州广济桥不仅是交通要道，更是潮州文化的重要载体。

![潮州广济桥](image-url.jpg "潮州广济桥美景")

## 特点
- **开合式设计**：适应江水涨落，便于通航。
- **文化象征**：桥上有多座亭台楼阁，供人休憩观赏。
- **艺术价值**：桥身装饰有石雕、木雕，展示了潮州传统工艺。`

        }
    />
}