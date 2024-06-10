let simpleExt = {
  flags: {
    initMonoPUtils: null,
  },
  /**
   * Example: simpleExt.getPUtils({extName: 'Monolithic'})
   *
   * @param {*} param0
   */
  getPUtils: async ({ extName }) => {
    // e.g. extName = 'Monolithic'
    let { crtStoreName, crtStoreName_underline } =
      window.getCrtStoreInfoByPluginId("Monolithic");
    await gutils.api.ext.initSinglePlugins(extName);
    let putils = window.fn_pluginUtils({ crtStoreName: crtStoreName });
    return putils;
  },
  getRef: async ({ extName }) => {
    // e.g. extName = 'Monolithic'
    return gutils.getPluginRender({
      id: extName,
    });
  },
  monoApp: {
    getMonoPUtils: async function () {
      if (!_.isNil(simpleExt.flags.initMonoPUtils) && !gutils.dev()) {
        return simpleExt.flags.initMonoPUtils;
      }
      let putils = await simpleExt.getPUtils({ extName: "Monolithic" });
      simpleExt.flags.initMonoPUtils = putils;
      return putils;
    },
    optAPI: async function (...args) {
      let putils = await simpleExt.monoApp.getMonoPUtils();
      let b = await simpleExt.getRef({ extName: "Monolithic" });
      let res = await b.optAPI(...args);
      return res;
    },
  },
};
window.simpleExt = simpleExt;
export default simpleExt;
