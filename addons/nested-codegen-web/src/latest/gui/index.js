import _ from "lodash";
import gstore from "../store";

const gui = {
  init: async () => {
    try {
      // if (window.require && _.isFunction(window.require)) {
      // gstore.sysinfo.cs = true;
      //   window.s_require = window.require;
      //   window.nodeRequire = window.require;
      //   delete window.require;
      //   window.s_module = module;
      //   delete window.module;
      // }
    } catch (e) {
      console.log("err", e);
    }
  },
};
window.gui = gui;
export default gui;
