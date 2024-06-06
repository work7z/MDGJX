const path = require("path");
const webpack = require("webpack");
const _ = require("lodash");
const myPackagejson = require("./package.json");

const { dependencies } = myPackagejson;
console.log(dependencies);

let other_dep_obj = {
  "@blueprintjs/core": "^3.51.3",
  "@blueprintjs/datetime": "^3.23.18",
  "@blueprintjs/docs-theme": "^3.4.0",
  "@blueprintjs/icons": "^3.31.0",
  "@blueprintjs/popover2": "^0.12.9",
  "@blueprintjs/select": "^3.18.10",
  "@blueprintjs/table": "^3.9.12",
  "@blueprintjs/timezone": "^3.9.18",
  "calculate-text-width": "0.0.3",
  mobx: "^5.15.2",
  "mobx-react": "^6.1.5",
  "mobx-react-lite": "^1.5.2",
  "crypto-js": "^4.1.1",
  lodash: "^4.17.11",
  moment: "^2.24.0",
  "monaco-themes": "^0.4.0",
  "number-to-chinese-words": "^1.0.20",
  "number-to-words": "^1.2.4",
  prettier: "^2.5.1",
  querystring: "^0.2.1",
  "rc-tabs": "^11.10.5",
  "re-resizable": "^6.9.1",
  react: "^16.12.0",
  "react-dnd": "^15.1.1",
  "react-dnd-html5-backend": "^15.1.2",
  "react-dom": "^16.12.0",
  "react-draggable": "^4.4.4",
  "react-router": "^5.1.2",
  "react-router-config": "^5.1.1",
  "react-router-dom": "^5.1.2",
  "react-virtualized": "^9.22.3",
  xterm: "^4.18.0",
};

let keys = _.keys(dependencies);
let allVendorObj = {};
_.forEach(keys, (x, d, n) => {
  let mykey = null;
  // if (x.startsWith("@blueprintjs")) {
  //   mykey = "blueprint";
  // } else if (x.startsWith("react")) {
  //   mykey = "react";
  // } else {
  //   mykey = x.replace(/-/g, "");
  // }
  if (other_dep_obj[x]) {
    mykey = "s1";
  } else {
    mykey = "s2";
  }
  if (_.isNil(allVendorObj[mykey])) {
    allVendorObj[mykey] = [];
  }
  allVendorObj[mykey].push(x);
});

module.exports = {
  mode: "production",
  entry: {
    // vendors: ["lodash", "jquery", "mobx"],
    ...allVendorObj,
  },
  output: {
    filename: "[name].[contenthash].dll.js",
    path: path.join(__dirname, "dll"),
    library: "[name]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      // 用这个插件来分析打包后的这个库，把库里的第三方映射关系放在了这个 json 的文件下，这个文件在 dll 目录下
      path: path.resolve(__dirname, "dll/[name].manifest.json"),
    }),
  ],
};
