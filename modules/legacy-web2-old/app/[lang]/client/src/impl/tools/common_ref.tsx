let COMMON_FN_REF = {
    Dot: (key: string, ...args: string[]): string => {
        throw new Error("Example Function is not implemented")
    }
}
export type DotType = typeof COMMON_FN_REF.Dot

export default COMMON_FN_REF
