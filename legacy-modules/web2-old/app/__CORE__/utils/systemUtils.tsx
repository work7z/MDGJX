'use server'

export let IsCurrentServerMode = () => {
    return process.env.ONLINEMODE == 'true'
}

export let IsCurrentServerModeWithPromise = async () => {
    return IsCurrentServerMode()
}