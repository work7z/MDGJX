import { isDevEnv } from "./env";
import info from "./meta/info";

const isBeiAnType = true;
const isInLafToolsCOM = location.href.indexOf("laf-tools.com") !== -1 && isBeiAnType

const appInfo = {
    ...info,
    qqGroup: '106038310',
    name: isInLafToolsCOM ? 'LafTools工具箱' : '秒达工具箱',
    // link: 'MDGJX.com',
    link: 'laftools.cn',
    githubRepo: 'https://github.com/work7z/MDGJX',
    needDoBeiAn: true,
    isInLafToolsCOM
}

export default function GetAppInfo() {
    return appInfo
}