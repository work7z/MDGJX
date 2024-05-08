// SKIP_DOT

let LANG_EN_US = "en_US";
import zh_CN from "../lang/zh_CN.json";
import zh_HK from "../lang/zh_HK.json";
let language: string | null = null;

process.argv.forEach((val, index) => {
  if (val.indexOf("--lang=") != -1) {
    language = val.split("=")[1];
  }
});

let LangMap = {
  zh_CN,
  zh_HK,
};
export type LangDefinition = { [key: string]: string };

function formatResultWithReplacer(val = "", ...args) {
  if (null == args || undefined == args) {
    args = [];
  }
  for (let index in args) {
    let tval = args[index];
    val = (val + "").replace("{" + index + "}", tval);
  }
  return val;
}

// export const Dot_original = (
//   id: string,
//   enText: string,
//   ...args: any[]
// ): string => {
//   if (language == LANG_EN_US) {
//     // do nothing
//   } else {
//     let langmap = LangMap;
//     let o = langmap[language] as LangDefinition;
//     let preText = o[id];
//     if (preText != null && preText != undefined) {
//       enText = preText;
//     }
//   }
//   let finResult = formatResultWithReplacer(enText, ...args);
//   return finResult;
// };

export const Dot = (...args: string[]): string[] => {
  return [...args];
};
// export const Dot = (id: string, enText: string, ...args: any[]): string => {
//   if (language == LANG_EN_US) {
//     // do nothing
//   } else {
//     let langmap = LangMap;
//     let o = langmap[language as any] as LangDefinition;
//     let preText = o[id];
//     if (preText != null && preText != undefined) {
//       enText = preText;
//     }
//   }
//   let finResult = formatResultWithReplacer(enText, ...args);
//   return finResult;
// };
