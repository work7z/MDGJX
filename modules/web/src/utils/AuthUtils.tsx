import { FN_GetDispatch } from "@/store/nocycle"
import { SignInCredentials } from "@/store/reducers/apiSlice"
import UsersSlice from "@/store/reducers/userSlice"
import AlertUtils from "./AlertUtils"

const tokenKey = 'rWKT3MNUJ'
const userTokenValue = localStorage.getItem(tokenKey)

const AuthUtils = {
    token: userTokenValue,
    saveCredentialToken(credentials: SignInCredentials) {
        if (!credentials) { return }
        localStorage.setItem(tokenKey, credentials.signature + '')
        FN_GetDispatch()(
            UsersSlice.actions.updateOneOfParamState({
                hasSignIn: true,
                credentials: credentials
            })
        )
        setTimeout(() => {
            location.reload()
        }, 1000)
    },
    signOut() {
        localStorage.setItem(tokenKey, '')
        AlertUtils.alertSuccess("登出成功，您的登录信息已被清除！1秒后刷新界面")
        FN_GetDispatch()(
            UsersSlice.actions.updateOneOfParamState({
                hasSignIn: false,
                credentials: null,
                userInfo: null
            })
        )
        setTimeout(() => {
            location.reload()
        }, 1000)
    }
}


export default AuthUtils