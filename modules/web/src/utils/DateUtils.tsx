import _ from "lodash"

export const formatToYYYYMMDD = (date: Date | undefined) => {
    if (!date) {
        return 'N/A'
    }
    return _.toString(date)
    // if (!(date instanceof Date)) {
    //     date = new Date(date)
    // }
    // return date.toISOString() && date.toISOString().slice(0, 10)
}