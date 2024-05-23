import _ from "lodash"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export const formatToYYYYMMDD = (date: Date | undefined) => {
    if (!date) {
        return 'N/A'
    }
    return dayjs(date).format('YYYY年MM月DD日 dddd HH:mm:ss')
    return _.toString(date)
    // if (!(date instanceof Date)) {
    //     date = new Date(date)
    // }
    // return date.toISOString() && date.toISOString().slice(0, 10)
}