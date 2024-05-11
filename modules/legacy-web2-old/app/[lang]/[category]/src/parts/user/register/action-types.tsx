'use server'

import { Dot } from "@/app/__CORE__/utils/TranslationUtils"
import { setCookie, getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import _ from "lodash";
import dao from "@/app/__CORE__/dao";

export type AsyncCreateResponse<T> = {
    message?: string, // normal message
    error?: string, // error
    data?: T
}

export type CheckRules = {
    type: "non-empty" | "valid-email" | "check-fn" | "valid-phone",
    name: string,
    validateFn?: (val: string) => Promise<string | undefined>,
    label?: string
}

export let validateEachRuleInArr = async (rules: CheckRules[], formData: any): Promise<AsyncCreateResponse<{}> | null> => {
    let valid = true;
    let lastMsg = ''
    for (let rule of rules) {
        if (rule.type === "non-empty") {
            lastMsg = Dot("wCctGPJZK", "{0} should not be empty", rule.label)
            if (!formData[rule.name]) {
                valid = false;
                break;
            }
        }
        if (rule.type === "valid-email") {
            lastMsg = Dot("wCcPJZK", "{0} is not a valid email", rule.label)
            if (!formData[rule.name].includes("@")) {
                valid = false;
                break;
            }
        }
        if (rule.type === "check-fn" && rule.validateFn) {
            let result = await rule.validateFn(formData[rule.name])
            if (result) {
                lastMsg = result
                valid = false;
                break;
            }
        }
        if (rule.type === "valid-phone" && rule.validateFn) {
            if (formData[rule.name].length != 11) {
                lastMsg = Dot("CuHqw9m", "{0} is not a valid phone number, currently system accept 11 digits telephone number only.", rule.label)
                valid = false;
                break;
            }
        }
    }
    if (valid) return null;
    return {
        error: lastMsg || "invalid form data"
    }
}

export let fn_verifyVCode = (): any => {
    return {
        type: "check-fn",
        name: "vcode",
        validateFn: async (val) => {
            let daoRef = await dao()
            let vcodeLabel = getCookie('vcode', {
                cookies,
            })
            if (!vcodeLabel) {
                return Dot("4sQWoTgfr", "Verification code is expired, please refresh the page and try again")
            }
            let fn_cleanVCode = async () => {
                if (vcodeLabel) {
                    await daoRef.redis.del(vcodeLabel)
                }
            }
            let vcodeValOrderIdx = await daoRef.redis.get(vcodeLabel)
            if (_.isNil(vcodeValOrderIdx)) {
                await fn_cleanVCode()
                return Dot("4sdQWoTgfr", "Verification code is expired, please refresh the page and try again.")
            }
            let vcodeActualVal = ''// getImgBase64Result(parseInt(vcodeValOrderIdx))
            // console.log('vcode', { vcodeActualVal, val })
            if (_.toLower(vcodeActualVal) !== _.toLower(val)) {
                await fn_cleanVCode()
                return Dot("HaU4NMabv", "Verification code is incorrect, please re-input or refresh the image.")
            }
            await daoRef.redis.del(vcodeLabel)
            return null;
        }
    }
}
