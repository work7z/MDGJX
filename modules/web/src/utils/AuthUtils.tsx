import { FN_GetDispatch } from "@/store/nocycle"
import { SignInCredentials } from "@/store/reducers/apiSlice"
import UsersSlice from "@/store/reducers/userSlice"
import AlertUtils from "./AlertUtils"
import settingsSlice from "@/store/reducers/settingsSlice"
import exportUtils from "./ExportUtils"

const tokenKey = 'rWKT3MNUJ'
const userTokenValue = localStorage.getItem(tokenKey)

export const fn_reload = () => {
    FN_GetDispatch()(
        settingsSlice.actions.updateOneOfParamState({
            initCount: (new Date()).getTime()
        })
    )
}

export const useHasUserSignIn = () => {
    const uObj = exportUtils.useSelector(v => v.users)
    return uObj.hasSignIn && AuthUtils.isActualHasToken()
}

const AuthUtils = {
    token: userTokenValue,
    isActualHasToken() {
        return AuthUtils.token && AuthUtils.token.length > 0
    },
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