import _ from "lodash"
import { Toaster, toast } from 'sonner'

let msgCtn = 1
const fn_getMsgCount = () => {
    return ''
    // return `[${msgCtn++}] `
}
export default {
    confirm: async (msg: string): Promise<boolean> =>{
        return confirm(msg)
    },
    alertSuccess(msg: any) {
        // alert("" + _.toString(msg))
        toast.success(fn_getMsgCount() + _.toString(msg))
    },
    alertInfo(msg: any) {
        toast.info(fn_getMsgCount() + _.toString(msg))
    },
    alertWarn(msg: any) {
        toast.warning(fn_getMsgCount() + _.toString(msg))
    },
    alertErr(msg: any) {
        toast.error(fn_getMsgCount() + _.toString(msg))
    },
}