import { isDevEnv } from "./env";
import info from "./meta/info";
import { getDesktopVerIfHave, isDesktopMode } from "./utils/DesktopUtils";

const isBeiAnType = true;
const isInLafToolsCOM = location.href.indexOf("laf-tools.com") !== -1 && isBeiAnType
const isInMdgjxCOM = isDesktopMode()|| !isInLafToolsCOM && location.href.indexOf("mdgjx.com") !== -1 || isDevEnv()

const appInfo = {
    ...info,
    qqGroup: '106038310',
    name: isInMdgjxCOM ? '秒达工具箱' : isInLafToolsCOM ? 'LafTools工具箱' : '秒达工具箱',
    // link: 'MDGJX.com',
    link: isInMdgjxCOM ? 'mdgjx.com' : 'laftools.cn',
    githubRepo: 'https://github.com/work7z/MDGJX',
    needDoBeiAn: true,
    isInLafToolsCOM,
    isInMdgjxCOM
}

if(isDesktopMode()){
    const desktopVer = getDesktopVerIfHave() 
    if(desktopVer){
        appInfo.version = desktopVer
    }
}

export default function GetAppInfo() {
    return appInfo
}