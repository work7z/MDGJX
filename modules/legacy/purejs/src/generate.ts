// DEPRECATED

// import { dirname } from "path";
// import {
//   ExtensionVM,
//   ToolCategory,
//   ToolSubCategory,
//   ToolChildrenSetByInit,
//   FileValueMatcher,
// } from "../../web/src/lib/purejs-types";
// import _ from "lodash";
// // read files under job, config
// // let fs = require("fs");
// import fs from "fs";
// let path = require("path");
// let getCategoryTS = require("./config/get-category");
// let getTranslation = require("./config/get-translation.ts");
// let geti18n = require("./config/get-i18n.ts");
// let dftCategory: ToolCategory[] = getCategoryTS.default;

// let anyExistChildIdSet: string[] = [];
// // preprocess for dftCategory, provide defaut values
// _.forEach(dftCategory, (x) => {
//   _.forEach(x.SubCategories, (eachSubCategory) => {
//     _.forEach(eachSubCategory.ChildrenIdSet, (xx) => {
//       let extFile = path.join(__dirname, "config", "exts", xx, "index.ts");
//       // mkdir extFile parent -p
//       let extFileDir = path.join(__dirname, "config", "exts", xx);
//       if (xx) {
//         anyExistChildIdSet.push(xx as string);
//       }
//       if (!fs.existsSync(extFileDir)) {
//         fs.mkdirSync(extFileDir);
//       }
//       // if extFile not exisst, then write string 'ok' into it
//       if (!fs.existsSync(extFile)) {
//         fs.writeFileSync(
//           extFile,
//           `import { ExtensionInfo, ExtensionVM } from "../../../all-types";
// import { Dot } from "../../../utils/translation";

// let v: ExtensionVM = {
//   Layout: "form",
//   Actions: [
//     {
//       Id: "${xx}.text",
//       Tooltip: Dot("P56${xx}K", "Click to process your data"),
//       Label: Dot("IP${xx}", "Get ${xx}"),
//       CallFuncList: Dot("${xx}.ConvertText"),
//     },
//   ],
//   Info: {
//     Id: "${xx}",
//     Label: Dot("41e${xx}", "${xx}"),
//     Description: [
//       "6w${xx}",
//       "TBC"
//     ],
//   },
// };

// export default v;
// `,
//         );
//       }
//     });
//   });
// });

// // start hanlding exts
// let exts = path.join(__dirname, "config", "exts");
// // if any in exts are not in anyExistChildIdSet, then delete it and remove it from exts also
// let extsList2 = fs.readdirSync(exts);
// _.forEach(extsList2, (x) => {
//   if (!_.includes(anyExistChildIdSet, x)) {
//     let extFile = path.join(__dirname, "config", "exts", x, "index.ts");
//     // console.log("extFile", extFile, x);
//     // if (fs.existsSync(extFile)) {
//     //   // fs.unlinkSync(extFile);
//     //   fs.rmdirSync(path.join(__dirname, "config", "exts", x));
//     // }
//   }
// });
// // read each file under exts, and require them
// let extsList = fs.readdirSync(exts);
// let extsMap = {};
// for (let i = 0; i < extsList.length; i++) {
//   let ext = extsList[i];
//   let extPath = path.join(exts, ext);
//   if (fs.existsSync(extPath)) {
//     let extInfo = require(extPath);
//     extsMap[ext] = extInfo;
//   }
// }

// console.log("dftCategory", dftCategory);
// console.log(" dftCategory.map", dftCategory.map);
// dftCategory = dftCategory.map((x) => {
//   return {
//     ...x,
//     SubCategories: !x.SubCategories
//       ? []
//       : x.SubCategories.map((xx) => {
//           return {
//             ...xx,
//             ChildrenIdSet: ["_"],
//             ChildrenSetByInit: xx.ChildrenIdSet.map((xxx) => {
//               let crtObj: ExtensionVM = extsMap[xxx]?.default as any;
//               if (crtObj === undefined || crtObj === null) {
//                 return undefined;
//               }
//               return {
//                 Id: crtObj?.Info?.Id,
//                 Label: crtObj?.Info?.Label,
//                 Description: crtObj?.Info?.Description,
//               } as ToolChildrenSetByInit;
//             }).filter((x) => x),
//           } as ToolSubCategory;
//         }),
//   } as ToolCategory;
// });

// console.log(dftCategory);
// console.log(extsMap);

// // write getCategoryTS into ./build/category.json
// let categoryJson: string = JSON.stringify(dftCategory, null, 4) as any;
// // let categoryJson: ToolCategory[] = JSON.stringify(dftCategory) as any;
// let categoryJsonPath = path.join(__dirname, "..", "build", "category.json");
// fs.writeFileSync(categoryJsonPath, categoryJson);

// // mkdir -p
// let extInfoPDir = path.join(__dirname, "..", "build", "exts");
// if (!fs.existsSync(extInfoPDir)) {
//   fs.mkdirSync(extInfoPDir);
// }

// // write extsMap into corresponding folders, such as md5 refers to ./build/exts/md5/index.json
// let extsMapKeys = Object.keys(extsMap);
// for (let i = 0; i < extsMapKeys.length; i++) {
//   let ext = extsMapKeys[i];
//   let extInfo = extsMap[ext];
//   let extInfoJson = JSON.stringify(extInfo.default, null, 2);
//   // mkdir -p ../build/exts/${ext} if not exists
//   let extInfoJsonDir = path.join(__dirname, "..", "build", "exts", ext);
//   if (!fs.existsSync(extInfoJsonDir)) {
//     fs.mkdirSync(extInfoJsonDir);
//   }
//   let extInfoJsonPath = path.join(
//     __dirname,
//     "..",
//     "build",
//     "exts",
//     ext,
//     "index.json",
//   );
//   fs.writeFileSync(extInfoJsonPath, extInfoJson);
// }

// let getExtraArr: FileValueMatcher[][] = [getTranslation, geti18n];

// _.forEach(getExtraArr, (x: FileValueMatcher[]) => {
//   _.forEach(x, (pxx) => {
//     _.forEach(pxx, (xx) => {
//       console.log("xx", xx);
//       let filename = xx.Name;
//       let value = xx.Value;
//       console.log("__dirname", __dirname);
//       console.log("filename", filename);
//       let finalOutputPath = path.join(__dirname, "..", "build", filename);
//       let nextValue = JSON.stringify(value, null, 2);
//       let r = fs.readFileSync(finalOutputPath);
//       if (r.toString() === nextValue) {
//         console.log("same");
//         return;
//       }
//       fs.writeFileSync(finalOutputPath, nextValue);
//     });
//   });
// });
