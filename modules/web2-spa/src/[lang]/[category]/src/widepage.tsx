export const key_wide_page = "pLR3xcEfg"

export let isWidePage = () => {
    return localStorage.getItem(key_wide_page) === 't'
}

export let setWidePage = (v: boolean) => {
    localStorage.setItem(key_wide_page, v ? 't' : 'f')
    location.reload()
}