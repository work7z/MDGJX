import { getMD5, getSignatureFromStr } from "./auth";

let SHARING_SALT_FIXED = "STCG001"
export let hashPW = (pw: string) => {
    return getMD5(
        `${SHARING_SALT_FIXED}${pw}${SHARING_SALT_FIXED}`
    ).toUpperCase()
}
