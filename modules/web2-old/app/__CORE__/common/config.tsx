import { Dot } from "../utils/TranslationUtils"

export const getPureWebsiteName = () => {
    return Dot("UED59zbd-", "LafTools", "elb3")
}

export const getWebDesc = () => {
    return Dot("lWqYc", "This website provides JSON tools including JSON to XML, JSON to CSV, JSON to YAML.")
}

export const getWebsiteName = (subPage?: string) => {
    let str = getPureWebsiteName()
    if (!subPage) {
        subPage = Dot("OBjaZqTvx", "Home")
        // professionals and engineers
        return Dot("7flKa", "LafTools - The Omnipotent for all Professionals and Engineers")
    }
    if (subPage) {
        return `${subPage} - ${str}`
    }
    return str
}