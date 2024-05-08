let path = require("path");
let fs = require("fs");
let sh = require("shelljs");
let _ = require("lodash");
var cnchars = require("cn-chars");
let os = require("os");

var md5 = require("md5");
const { exit } = require("process");
let i18njson = require("../../../resources/public/purejs/app-i18n.json");

let commonText = new RegExp(
  "Dot\\s*\\(\\s*" + sub_exp(1) + "\\s*,\\s*" + sub_exp(3),
);

function convertUnixPathToWindowsPath(v) {
  v = path.normalize(v);
  return v;
}

function sub_exp(idx) {
  return "((?<![\\\\])['\"`])((?:.(?!(?<![\\\\])\\1))*.?)\\" + idx;
}
// get env LAFTOOLS_ROOT
let baseDIR = path.join(__dirname, "..", "..", "..");
if (baseDIR == "") {
  console.log("LAFTOOLS_ROOT could not be empty");
  exit(-1);
} else {
  console.log("LAFTOOLS: ", baseDIR);
  // exit(99)
}

// let webDIR = path.join(baseDIR, ...`modules/web`.split("/"));
let web2DIR = path.join(baseDIR, ...`modules/web2`.split("/"));
let server2DIR = path.join(baseDIR, ...`modules/server2`.split("/"));
let docsGeneratorDIR = path.join(
  baseDIR,
  ...`devtools/docs-generator/`.split("/"),
);
// let nodeDIR = path.join(baseDIR, ...`modules/node`.split("/"));

// personal project for RYAN LAI, just ignore it please
let privateProjects = [
  {
    id: "srv2",
    type: "go",
    prefix: ".Dot(",
    target: `/home/jerrylai/mincontent/PersonalProjects/laftools-server2/resources/lang`,
    pattern: commonText,
    dir: `/home/jerrylai/mincontent/PersonalProjects/laftools-server2/core`,
  },
  {
    type: "ts",
    id: "denote-pal-2",
    prefix: "Dot(",
    pattern: commonText,
    target:
      "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/resources/lang2",
    dir: "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/java/com",
  },
  {
    id: "portal-l",
    type: "ts",
    prefix: "Dot(",
    pattern: commonText,
    target:
      "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal2/public/static/lang",
    dir: "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal2/src",
  },
];

// let webItem = {
//   id: "bprl",
//   type: "ts",
//   prefix: "Dot(",
//   pattern: commonText,
//   target: `${webDIR}/public/static/lang`,
//   dir: `${webDIR}/src`,
// };

let web2Item = {
  id: "bprl",
  type: "ts",
  prefix: "Dot(",
  pattern: commonText,
  target: `${web2DIR}/public/static/lang`,
  dir: `${web2DIR}/app`,
  exclude: ["[lang]/client"],
};
let server2Item = {
  id: "srv2",
  type: "ts",
  prefix: "Dot(",
  pattern: commonText,
  target: `${server2DIR}/src/i18n/lang`,
  dir: `${server2DIR}/src`,
  exclude: ["[lang]/client"],
};
let docsGENItem = {
  id: "nlt3KDLEX",
  type: "ts",
  prefix: "Dot(",
  pattern: commonText,
  target: `${docsGeneratorDIR}/lang`,
  dir: `${docsGeneratorDIR}`,
};
let searchItems = [
  // {
  //   id: "brl",
  //   type: "go",
  //   prefix: ".Dot(",
  //   target: `${baseDIR}/resources/lang`,
  //   pattern: commonText,
  //   dir: `${baseDIR}/core`,
  // },
  // webItem,
  {
    id: "HKLVpZ71T",
    type: "ts",
    prefix: "Dot(",
    pattern: commonText,
    target: `${web2DIR}/public/static/lang2client`,
    dir: `${web2DIR}/app/[lang]/client`,
  },
  docsGENItem,
  web2Item,
  server2Item,

  // {
  //   type: "ts",
  //   id: "portal-sl",
  //   prefix: "Dot(",
  //   pattern: commonText,
  //   target: `${nodeDIR}/src/lang`,
  //   dir: `${nodeDIR}/src`,
  // },
  // {
  //   type: "ts",
  //   id: "purejs",
  //   prefix: "Dot(",
  //   pattern: commonText,
  //   target: baseDIR + "/modules/purejs/src/lang",
  //   dir: baseDIR + "/modules/purejs/src",
  // },
  ...privateProjects,
].map((x) => {
  x.dir = convertUnixPathToWindowsPath(x.dir);
  x.target = convertUnixPathToWindowsPath(x.target);
  return x;
});

module.exports = {
  searchItems,
  baseDIR,
};
