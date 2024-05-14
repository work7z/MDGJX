import _ from "lodash"
import { Toaster, toast } from 'sonner'

let msgCtn = 1
export default {
    alertSuccess(msg: any) {
        // alert("" + _.toString(msg))
        toast(`[${msgCtn++}] ` + _.toString(msg))
    },
    alertInfo(msg: any) {
        toast.info(`[${msgCtn++}] ` + _.toString(msg))
    },
    alertWarn(msg: any) {
        toast.warning(`[${msgCtn++}] ` + _.toString(msg))
    },
    alertErr(msg: any) {
        toast.error(`[${msgCtn++}] ` + _.toString(msg))
    },
}