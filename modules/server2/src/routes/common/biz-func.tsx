export const getScopeID = () => {
    const newDate = new Date()
    // return like 2023-09
    return `${newDate.getFullYear()}-${newDate.getMonth()}`
}