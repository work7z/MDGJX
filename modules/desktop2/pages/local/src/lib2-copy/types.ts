export type RES_GetRunMDGJXStatus = {
    status: 'pending'|'running'|'error'
    message?: string
}

export type RES_PushMDGJXStatus = {
    msg: string,
    pct: number
}