
export let checkIfStrOnlyHasAlphanumeric = (str: string) => {
    return /^[a-zA-Z0-9]*$/.test(str)
}
