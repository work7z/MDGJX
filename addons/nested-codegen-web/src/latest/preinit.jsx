import { Provider, observer, inject ,useLocalStore} from "mobx-react";
window.observer = observer;
import "./prelogic";
import Moment from "moment";
import _ from "lodash";
import $ from 'jquery'
// let crtLang = window.defaultLang || "en_US";
// let crtLang = window.defaultLang || "zh_CN";
// crtLang = "zh_CN";
let crtLang = window.ipc.getCurrentLang();
window.changeLang = (val, askNow = true) => {
  Moment.locale(val.replace("_", "-"));
  crtLang = val;
  ipc.setCurrentLang(val);
  if (window.whenChangeLang) {
    window.whenChangeLang();
  }
  setTimeout(() => {
    $("html").attr("lang", val);
  }, 0);
};
window.getCrtLang = () => {
  return 'zh_CN'
  // return window.ipc.getCurrentLang();
};
// import zh_CN from './zh_CN.json'
// import zh_CNOverwrite from './zh_CN_overwrite.json'
window.changeLang(crtLang);
window.t = (...args) => {
  // const updateRefForLang_2 = _.get(
  //   window,
  //   "gstore.preliAllData.updateRefForLang"
  // );
  console.log("updateRefForLang", ...args);
  try {
    // TODO: uncomment
    if (window.gstore && _.isNil(window.cstore)) {
      let userLang = 'zh_CN' // window.gstore.preliAllData.configs.lang;
      // if (window.getCrtLang() != userLang) {
      //   window.changeLang(userLang);
      // }
      const updateRefForLang = _.get(
        window,
        "gstore.preliAllData.updateRefForLang"
      );
    }
    if (_.isNil(window.t_preload)) {
      return _.get(args, 0);
    }
    return window.t_preload(crtLang, ...args);
  } catch (e) {
    console.log("e", e);
    return _.get(args, "0");
  }
};

// if (window.cstore) {
//   // let userLang = window.cstore.settings.lang;
//   // if (window.getCrtLang() != userLang) {
//   //   window.changeLang(userLang);
//   // }
//   const updating_ref_lang = window.cstore.forms_data.updating_ref_lang;
// }

export default {};
