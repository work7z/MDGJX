import AlertUtils from "@/utils/AlertUtils";
import { SignInCredentials } from "../reducers/apiSlice";
import AuthUtils from "@/utils/AuthUtils";
import { FN_GetDispatch } from "../nocycle";
import MemorySlice from "../reducers/memorySlice";

export const ACTION_doSignInByInfo = (info: SignInCredentials | undefined) => {
    if (!info) {
        AlertUtils.alertErr("无法处理登录结果")
        return
    }
    FN_GetDispatch()(
        MemorySlice.actions.updateOneOfParamState({
            showLoginModal: false
        })
    )
    AuthUtils.saveCredentialToken(info)
}

