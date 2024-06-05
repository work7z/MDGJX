const ipm = (
    location.href.indexOf('laftools.cn') !== -1
) || (
        location.href.indexOf('mdgjx.com') !== -1
    ) || (
        location.href.indexOf('laftools') !== -1
    ) || (
    location.href.indexOf('codegen.cc') !== -1
    )
export const isPortalMode = () => {
    return ipm
}