'use server'

import _ from "lodash";
import { fn_add_user_into_active, fn_get_system_info_from_redis } from "./user-types";
import { getSignatureFromStr } from "./auth";
import { Elb3AuthBody, getUserInfoByUserAcctId } from "./userAction";
import { logger } from "@/utils/logger";
import { S2User } from "@/dao/model";

export type SystemInfoBody = {
    userCount: number,
    userOnlineCount: number,
    peakOnlineCount: number,
}

export type AuthInfo = {
    user: S2User | null,
    signedIn: boolean,
    furtherUserDetail?: {
        userRole: any,
    },
    systemInfo: SystemInfoBody
}
export let header_ELB3_auth = "laftools-auth"
export type fn_getCookie = (name: string) => string

export default async (getCookie: fn_getCookie): Promise<AuthInfo> => {
    let systemInfo = await fn_get_system_info_from_redis()
    let elb3AuthStr = getCookie(header_ELB3_auth);
    if (!_.isEmpty(elb3AuthStr)) {
        try {
            let [expiredTS, body, singature, version] = elb3AuthStr?.split(".") as string[];
            let crtTime = new Date();
            if (crtTime.getTime() > parseInt(expiredTS)) {
                throw new Error("expired");
            }
            let c_sig = getSignatureFromStr(body);
            if (c_sig != singature) {
                throw new Error("signature not match");
            }
            let push: Elb3AuthBody = JSON.parse(atob(body))
            let userInfo = await getUserInfoByUserAcctId(push.userAcctId)
            await fn_add_user_into_active(push.userAcctId)
            return {
                systemInfo,
                user: userInfo,
                signedIn: userInfo != null,
            }
        } catch (e) {
            // unable to decode, meaning it is not a valid elb3-auth
            logger.error("decode error" + e)
            // if they have elb3-auth, but it is not valid, then we should remove it and redirect the user to /login
        }
    } else {
        // pass through
    }
    return {
        systemInfo,
        user: null,
        signedIn: false
    }
}