import path from "path";
export type SystemEnvFlag = "development" | "production" | "test"

let envObj: { env: SystemEnvFlag } = {
    env: process.env.NODE_ENV as any
}

export let markEnvAsDevForcibly = () => {
    envObj.env = 'development'
}

export let getSysEnv = () => {
    return envObj.env;
}

export let isDevEnv = () => {
    return envObj.env === 'development';
}

export let isTestEnv = () => {
    return envObj.env === 'test';
}

export let isProductionEnv = () => {
    return envObj.env === 'test';
}
