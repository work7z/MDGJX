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
const params = {
  Paths: ["http://laftools.cn/"],
  FlushType: "delete",
};
client.PurgePathCache(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
    process.exit(-1);
  },
);
