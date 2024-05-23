
export const form_onSubmit = (fn) => {
    return {
        onKeyDown: e => {
            if (e.key == 'Enter') {
                e.preventDefault()
            }
        },
        onSubmit: fn
    }
}

export const FormUtils = {

}