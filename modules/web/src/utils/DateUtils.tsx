export const formatToYYYYMMDD = (date: Date | undefined) => {
    if (!date) {
        return 'N/A'
    }
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    return date.toISOString() && date.toISOString().slice(0, 10)
}