'use server'

import dao from "@/dao";
import { getMD5, getSignatureFromStr } from "./auth";
import handleAuthInfo, { fn_getCookie } from "./handleAuthInfo";
import { checkIfStrOnlyHasAlphanumeric } from "./utils";
import { CommonHandlePass } from "../auth.route";
import { AsyncCreateResponse, CheckRules, fn_verifyVCode } from "./action-types";
import { fn_refresh_system_info_from_redis } from "./user-types";
import _ from "lodash";
import { key_sessionGroup } from "./constants";
import { hashPW } from "./op";
import { SignInCredentials } from "../_types";
import { S2User, S2User as User } from "@/dao/model";

export type Elb3AuthBody = {
    userAcctId: string,
    userRole: any
}

export type fn_setCookie = (name: string, value: string,) => void
export let signInWithUserId = async (userAcctId: string, rememberMe: boolean): Promise<SignInCredentials> => {
    let userInfo = await getUserInfoByUserAcctId(userAcctId)
    if (!userInfo) {
        throw new Error('user not found')
    }
    if (!userInfo.id) {
        throw new Error('user id not found')
    }
    let daoRef = await dao()
    // init set
    await daoRef.redis.sAdd(key_sessionGroup, userAcctId) // add user acct into the set

    let push: Elb3AuthBody = {
        userAcctId: userInfo.id + '',
        userRole: 'user', //userInfo.role
    }
    let elb3AuthBody = btoa(JSON.stringify(push))
    let expiredTime = 1000 * 60 * 60 * 24 * 30 * 12 * 30
    if (!rememberMe) {
        // only remember for 2 hours
        expiredTime = 1000 * 60 * 60 * 2
    }
    let expiredDate = new Date().getTime() + expiredTime // by default, 30 years expired
    let signature = getSignatureFromStr(elb3AuthBody)
    return {
        signed: true,
        signature: expiredDate + '.' + elb3AuthBody + '.' + (signature)
    }
}

export let getUserInfoByUserAcctId = async (userAcctId: string): Promise<User | null> => {
    await dao()
    let user = await S2User.findOne({
        where: {
            id: userAcctId
        }
    })
    return user;
}
export let getUserInfoByEmail = async (email: string): Promise<User | null> => {
    await dao()
    let user = await User.findOne({
        where: {
            email: email
        }
    })
    return user;
}

export type ValOrError<T> = {
    error?: string,
    value?: T
}



export let validateEachRuleInArr = async (rules: CheckRules[], formData: any, p: CommonHandlePass): Promise<AsyncCreateResponse<{}> | null> => {
    let { Dot } = p
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


export async function handleSignIn(formData: {
    userAcctId: string,
    password: string,
    phoneNumber: string,
    type: string,
    rememberMe: boolean,
    randomID: string,
    vcode: string
}, p: CommonHandlePass): Promise<AsyncCreateResponse<SignInCredentials | {}>> {
    let daoRef = await dao()
    let { Dot, Info, getCookie, setCookie } = p
    let res: SignInCredentials = {
        signed: false,
        signature: null
    };
    let rules: CheckRules[] = [
        {
            type: "non-empty",
            name: "userAcctId",
            label: Dot("wTBJ2pxX7", "Username or Email"),
        },
        {
            type: "non-empty",
            name: "password",
            label: Dot("TXdh_K", "Password"),
        },
        {
            type: "non-empty",
            name: "vcode",
            label: Dot("TqXddh_K", "Verification Code"),
        },
        fn_verifyVCode(formData.randomID, p),
        {
            type: 'check-fn',
            name: 'userAcctId',
            validateFn: async (val) => {
                let user: User | null = null;
                user = await getUserInfoByUserAcctId(formData.userAcctId)
                if (!user) {
                    user = await getUserInfoByEmail(formData.phoneNumber)
                }
                if (!user) {
                    return Dot("dsdfqw", "User does not exist")
                }
                if (user.password != hashPW(formData.password)) {
                    return Dot("eqwee", "Password is not correct")
                }
                // LOGIN SUCCESS
                await daoRef.db_work7z.transaction(async () => {
                    if (!user) return;
                    let r = await signInWithUserId(user.id + '', formData.rememberMe)
                    res = r
                    // TODO: user login log
                    // await UserLoginLog.create({
                    //     userId: user.id || -1,
                    //     loginIp: '',
                    //     loginTime: new Date(),
                    // })
                })
            }
        },
    ].filter(x => x)

    let validObj = await validateEachRuleInArr(rules, formData, p);
    if (validObj) {
        return validObj
    }

    return {
        data: res,
    }
}


export default async function handleSignUp(formData: {
    preview: boolean,
    userAcctId: string,
    password: string,
    email: string,
    randomID: string,
    invitationCode: string,
    rememberMe: boolean,
    confirmPassword: string,
    vcode: string
}, p: CommonHandlePass): Promise<AsyncCreateResponse<{ newUser?: User }>> {
    let { Dot } = p
    console.log('formData', formData)
    let daoRef = await dao()
    let rules: CheckRules[] = [
        {
            type: "non-empty",
            name: "userAcctId",
            label: Dot("oHQNQ4mRw", "User ID"),
        },
        {
            type: "non-empty",
            name: "password",
            label: Dot("TXdh_K", "Password"),
        },
        {
            type: "non-empty",
            name: "confirmPassword",
            label: Dot("TqXdh_K", "Confirm Password"),
        },
        {
            type: 'non-empty',
            name: 'phoneNumber',
            label: Dot("TqXdd3h_wK", "Telephone Number"),
        },
        {
            type: "non-empty",
            name: "invitationCode",
            label: Dot("Xddh_wK", "Invitation Code"),
        },
        {
            type: "non-empty",
            name: "vcode",
            label: Dot("TqXddh_K", "Verification Code"),
        },
        {
            type: "valid-phone",
            name: "phoneNumber",
            label: Dot("TdXddh_wK", "Telephone Number"),
        },
        {
            type: 'check-fn',
            name: 'userAcctId',
            validateFn: async (val) => {
                let user = await getUserInfoByUserAcctId(val)
                if (user) {
                    return Dot("8sVG1RdXhx", "User ID already exists")
                }
                let ok = checkIfStrOnlyHasAlphanumeric(val)
                if (!ok) {
                    return Dot("8sVGdXhx", "User ID should only contain letters and numbers")
                }
                if (val.length < 2) {
                    return Dot("8sVG1kqXhx", "User ID should be at least 2 characters")
                }
                let prohibittedArr = [
                    "admin",
                    "administrator",
                    "root",
                    "superuser",
                    "system",
                    "systemadmin",
                    "sysadmin",
                    "user",
                    "username",
                    "useracctid",
                    "undefined",
                    "null",
                    "fuck",
                    "suck"
                ]
                // check if contains in prohibiteedArr
                let lVal = _.toLower(val)
                for (let item of prohibittedArr) {
                    if (lVal.indexOf(_.toLower(item)) != -1) {
                        return Dot("K2UEY4ddl", "The user ID contains invalid words, please avoid using {0}", item)
                    }
                }
            }
        },
        {
            type: "check-fn",
            name: "password",
            validateFn: async (val) => {
                if (val.length < 6) {
                    return Dot("8sVG1RXhx", "password should be at least 6 characters")
                }
            }
        },
        {
            type: "check-fn",
            name: "confirmPassword",
            validateFn: async (val) => {
                if (val !== formData.password) {
                    return Dot("Y-svpKvUz", "two passwords do not match")
                }
            }
        },
        // {
        //     type: "check-fn",
        //     name: "invitationCode",
        //     validateFn: async (val) => {
        //         if (val.length > 0) {
        //             let item = invitationCodeItem
        //             if (!item) {
        //                 return Dot("8s1dX", "The invitation code does not exist in system, please check if there is a case sensitive issue.")
        //             }
        //             if (item.expiredAt < new Date()) {
        //                 return Dot("8saIR-LCjyChx", "Invitation code has expired")
        //             }
        //             if (item.useCount > item.maxUseCount) {
        //                 return Dot("8saIt5r5nGxwwChx", "Invitation code has been used up")
        //             }
        //             // all good
        //         } else {
        //             return Dot("8s1R5nChx", "Invitation code is empty, this community is not open to public but limited to invited users.")
        //         }
        //     }
        // },
        formData.preview ? null : fn_verifyVCode(formData.randomID, p)
    ].filter(x => x)

    let validObj = await validateEachRuleInArr(rules, formData, p);
    if (validObj) {
        return validObj
    }

    if (formData.preview) {
        return {
            data: undefined
        };
    }

    let newUser = await daoRef.db_work7z.transaction(async () => {
        let newUser = await User.create({
            id: parseInt(formData.userAcctId),
            name: formData.userAcctId,
            phoneNumber: '',
            password: hashPW(formData.password + ''),
            email: formData.email,
        })


        await signInWithUserId(formData.userAcctId + '', formData.rememberMe)

        await fn_refresh_system_info_from_redis()

        // await sendSMSCodeForUser(formData.userId, formData.email)

        return newUser
    })
    if (!newUser) {
        return {
            error: "create user failed"
        }
    }
    return {
        data: {
            newUser: newUser
        },
    }
}