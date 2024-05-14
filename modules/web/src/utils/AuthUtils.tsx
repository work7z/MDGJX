import { FN_GetDispatch } from "@/store/nocycle"
import { SignInCredentials } from "@/store/reducers/apiSlice"
import UsersSlice from "@/store/reducers/userSlice"
import AlertUtils from "./AlertUtils"

const AuthUtils = {
    saveCredentialToken(credentials: SignInCredentials) {
        FN_GetDispatch()(
            UsersSlice.actions.updateOneOfParamState({
                hasSignIn: true,
                credentials: credentials
            })
        )
        AlertUtils.alertSuccess("登录成功，1秒后刷新界面")
        setTimeout(() => {
            location.reload()
        }, 800)
    },
    signOut() {
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
        }, 800)
    }
}


export default AuthUtils