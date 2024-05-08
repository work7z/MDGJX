'use server'

export let IsCurrentServerMode = () => {
    // TODO: should check this one
    return import.meta.env.ONLINEMODE == "true";
}

export let IsCurrentServerModeWithPromise = async () => {
    return IsCurrentServerMode()
}