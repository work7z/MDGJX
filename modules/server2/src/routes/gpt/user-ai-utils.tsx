import dao, { getS2DBRef } from "@/dao";
import AIUtils, { QwenIpt } from "./ai-utils"
import { S2User, S2UserAITokenUsage } from "@/dao/model";
import { getScopeID } from "../common/biz-func";
import { DisplayUserInfo } from "../common";

export default {
    userSendAIReqAndRes: async (userInfo: DisplayUserInfo, sourceType: "markdown" | "other", iptArr: QwenIpt[]): Promise<string> => {
        const userId = userInfo.id;
        if (!userInfo.isProUser) throw new Error('抱歉，当前功能仅对专业版用户开放，目前账号是开源版或者专业版权益已到期。')

        console.log('handle gpt translation');
        // check token count
        const tokenCount = await S2UserAITokenUsage.sum('tokenCount', { where: { userId: userId, scopeID: getScopeID() } })
        if (tokenCount > 10000 * 20) { // 大于20万则提醒无法更多信息
            return `本月AI使用次数已经超过20万token，请等待下个月或购买额外资源包`
        }
        const res = await AIUtils.askQwen(iptArr);
        const dbRef = await getS2DBRef()
        await dbRef.transaction(async () => {
            await S2UserAITokenUsage.create({
                userId: userId,
                scopeID: getScopeID(),
                sourceType: sourceType,
                remarks: '',
                inputTokenCount: res.usage.input_tokens,
                outputTokenCount: res.usage.output_tokens,
                tokenCount: res.usage.total_tokens,
            })
        })
        console.log(res.output);
        console.log(res.usage.total_tokens);
        return res.output.text
    }
}