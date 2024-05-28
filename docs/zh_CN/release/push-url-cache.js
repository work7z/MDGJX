// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs-cdn");

const CdnClient = tencentcloud.cdn.v20180606.Client;

// 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
// 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议采用更安全的方式来使用密钥，请参见：https://cloud.tencent.com/document/product/1278/85305
// 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
const clientConfig = {
  credential: {
    secretId: process.env.TXCOSID,
    secretKey: process.env.TXCOSKEY,
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "cdn.tencentcloudapi.com",
    },
  },
};

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new CdnClient(clientConfig);
let allStaticFiles = [];
var fs = require("fs");
var path = require("path");
let staticFolder = path.join(
  __dirname,
  "..",
  "..",
  "modules",
  "web2",
  "public",
  "static",
);

// find all static files recursively
function findStaticFiles(dir) {
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    let fullPath = path.join(dir, file);
    let isDir = fs.statSync(fullPath).isDirectory();
    if (isDir && !fullPath.includes("node_modules")) {
      findStaticFiles(fullPath);
    }

    if (!isDir && !fullPath.includes("extra")) {
      allStaticFiles.push(
        "http://laftools.cn/static" +
          fullPath.replace(staticFolder, "").replace(/\\/g, "/"),
      );
    }
  });
}

findStaticFiles(staticFolder);
console.log(allStaticFiles);

const params = {
  Urls: [
    "http://laftools.cn/",
    "http://laftools.cn/cn/docs",
    "http://laftools.cn/cn/resource",
    "http://laftools.cn/cn/tools",
    "http://laftools.cn/cn/ai",
    ...allStaticFiles,
  ].slice(0, 490),
};
client.PushUrlsCache(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
    process.exit(-1);
  },
);
