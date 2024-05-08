export let IsCurrentServerMode = () => {
    return process.env.ONLINEMODE == "true";
};
export type DLinkType = {
    loadPath: string;
    fromVersion: string;
    toVersion: string;
    dateTime: string;
    signoff?: string; // confirmation from user
};