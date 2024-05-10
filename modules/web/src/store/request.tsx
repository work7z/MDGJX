export let getHeaders = () => {
    return {
        "Content-Type": "application/json",
        // "X-LOCAL-USER-TOKEN": TokenUtils.getLocalUserToken(),
        // "X-LOCAL-ADMIN-TOKEN": TokenUtils.getSystemInitToken(),
        // "X-LOCAL-USER-ID": TokenUtils.getLocalUserId(),
    };
}