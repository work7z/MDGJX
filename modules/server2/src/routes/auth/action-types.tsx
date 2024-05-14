'use server'
import _ from "lodash";

export type AsyncCreateResponse<T> = {
    message?: string, // normal message
    error?: string, // error
    data?: T
}

export type CheckRules = {
    type: "non-empty" | "valid-email" | "check-fn" | "valid-phone",
    name: string,
    validateFn?: (val: string) => Promise<string | undefined>,
    label?: string
}
