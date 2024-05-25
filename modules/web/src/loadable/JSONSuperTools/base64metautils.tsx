export default {
    encodeBase64: (input: string): string => {
        return btoa(unescape(encodeURIComponent(input))); // '😂'
    },
    decodeBase64: (input: string): string => {
        return decodeURIComponent(escape(atob(input))); // '😂'
    }
}