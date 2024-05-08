var cnchars = require("cn-chars");
var _ = require("lodash");

let resultJSON = {
  "41ev7": "MD2",
  "5-S-B": "來自文件的 MD4",
  "70PnM": "MD4",
  AWqXD: "MD5",
  E88Ej: "點擊此處加密您的輸入文本",
  ECm8j: "點擊此處加密您的輸入文本",
  "IP8-V": "文字 MD2",
  IPtV: "文字 MD4",
};

console.log(
  _.mapValues(resultJSON, (x, d, n) => {
    return _.chain(x)
      .split("")
      .map((xx) => cnchars.toTraditionalChar(xx))
      .join("")
      .value();
  })
);
