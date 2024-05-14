import AlertUtils from "@/utils/AlertUtils";
import { SignInCredentials } from "../reducers/apiSlice";
import AuthUtils from "@/utils/AuthUtils";

export const ACTION_doSignInByInfo = (info: SignInCredentials | undefined) => {
    if (!info) {
        AlertUtils.alertErr("无法处理登录结果")
        return
    }
    AuthUtils.saveCredentialToken(info)
}