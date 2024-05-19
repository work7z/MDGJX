export const formatToYYYYMMDD = (date: Date | undefined) => {
    if (!date) {
        return 'N/A'
    }
    return date.toISOString().slice(0, 10)
}