const COS = require("cos-nodejs-sdk-v5");
const cos = new COS({
  SecretId: process.env.TXCOSID,
  SecretKey: process.env.TXCOSKEY,
});
cos.listObjectVersions;
let main = async () => {
  let r = await cos.getBucket({
    Bucket: process.env.TXCOSBUCKET /* 必须 */,
    Region: "ap-guangzhou" /* 必须 */,
  });
  console.log(r.Contents);
};
main();
