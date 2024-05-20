import { FN_GetDispatch } from "@/store/nocycle"
import { SignInCredentials } from "@/store/reducers/apiSlice"
import UsersSlice from "@/store/reducers/userSlice"
import AlertUtils from "./AlertUtils"
import settingsSlice from "@/store/reducers/settingsSlice"

const tokenKey = 'rWKT3MNUJ'
const userTokenValue = localStorage.getItem(tokenKey)

export const fn_reload = () => {
    FN_GetDispatch()(
        settingsSlice.actions.updateOneOfParamState({
            initCount: (new Date()).getTime()
        })
    )
}

const AuthUtils = {
    token: userTokenValue,
    saveCredentialToken(credentials: SignInCredentials) {
        if (!credentials) { return }
        const finval = credentials.signature + ''
        AuthUtils.token = finval
        localStorage.setItem(tokenKey, finval)
        FN_GetDispatch()(
            UsersSlice.actions.updateOneOfParamState({
                hasSignIn: true,
                credentials: credentials
            })
        )
        setTimeout(() => {
            fn_reload()
        }, 10)
    },
    signOut() {
        localStorage.setItem(tokenKey, '')
        AlertUtils.alertSuccess("登出成功，您的登录信息已被清除！")
        FN_GetDispatch()(
            UsersSlice.actions.updateOneOfParamState({
                hasSignIn: false,
                credentials: null,
                userInfo: null
            })
        )
        setTimeout(() => {
            fn_reload()
        }, 10)
    }
}


export default AuthUtils