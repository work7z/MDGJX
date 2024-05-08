import dao from "@/dao";
import _ from "lodash";
import { key_systemInfoGroup } from "./constants";
import { S2User } from "@/dao/model";

// export let fn_get_user_avatar = (authInfoProps: AuthInfoProps) => {
//     let avatarPath = authInfoProps.authInfo?.user?.avatarPath
//     let userId = authInfoProps.authInfo.user?.id
//     if (_.isEmpty(avatarPath)) {
//         return '/avatar/dft-1.png'
//     }
//     return avatarPath
// }

export type SystemInfoBody = {
    userCount: number,
    userOnlineCount: number,
    peakOnlineCount: number,
}
let launchBefore = false;
export let fn_refresh_system_info_from_redis = async () => {
    let daoRef = await dao()
    let userCtn = await S2User.count()
    await daoRef.redis.hSet(key_systemInfoGroup, 'userCount', userCtn)
}
export let fn_get_system_info_from_redis = async (): Promise<SystemInfoBody> => {
    if (!launchBefore) {
        await fn_refresh_system_info_from_redis()
    }
    let daoRef = await dao()
    let userCount = await daoRef.redis.hGet(key_systemInfoGroup, 'userCount')
    let peakOnlineCount = await daoRef.redis.hGet(key_systemInfoGroup, 'peakOnlineCount')
    let now = Date.now()
    let prevTimePoint = now - (60 * 60 * 1000 * 3) // last 3 hours
    let userOnlineCount = await daoRef.redis.zCount(key_active_user, prevTimePoint, now)
    if (parseInt(peakOnlineCount || '1') < userOnlineCount) {
        await daoRef.redis.hSet(key_systemInfoGroup, 'peakOnlineCount', userOnlineCount)
    }
    return {
        userCount: parseInt(userCount + ''),
        userOnlineCount: userOnlineCount,
        peakOnlineCount: parseInt(peakOnlineCount || '1')
    }
}

export let key_active_user = 'active-users'

export let fn_add_user_into_active = async (userAcctId: string) => {
    let daoRef = await dao()
    // add active user into the set, never expire it 
    await daoRef.redis.zAdd(key_active_user, {
        score: Date.now(),
        value: userAcctId
    })
}