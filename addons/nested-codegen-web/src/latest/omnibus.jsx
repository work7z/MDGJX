let __internal__actions__ = {
  //
};
let __internal_menus__ = {
  //
};

// @flow
const omnibus = {
  ST_OK: "OK",
  ST_WARN: "WARN",
  ST_ERR: "ERROR",
  ST_INVALID_PARAM: "INVALID PARAM",
  __get__internal__actions__() {
    return gstore.omnibusInfo.actions;
  },
  __get__internal_menus__() {
    return gstore.omnibusInfo.menus;
  },
  getActions(id) {
    return omnibus.__get__internal__actions__()[id];
  },
  setActions(id, actions) {
    _.forEach(actions, (obj, obj_index) => {
      if (_.isNil(obj.id)) {
        obj.label = t(`Missed the field ID`);
      }
      _.defaultsDeep(obj, {
        id: "" + obj_index,
        label: "Ext-" + id,
        handle: async ({ text, file, gref, PUtils }) => {
          //
        },
      });
    });
    omnibus.__get__internal__actions__()[id] = actions;
    return omnibus;
  },
  getMenus(id) {
    return omnibus.__get__internal_menus__()[id];
  },
  setMenus(id, menus) {
    omnibus.__get__internal_menus__()[id] = menus;
    return omnibus;
  },
};
window.omnibus = omnibus;
if (window.OKKKKKKKK == true) {
  let testID = "URL_ENCODE_DECODE";
  omnibus
    .setActions(testID, [
      {
        label: t(`URL Encode`),
        handle: async ({ text, file, gref, PUtils }) => {
          if (1 % 2 == 0) {
            return {
              status: omnibus.ST_ERR,
              msg: ["Cannot handle the value {0}", "example"],
            };
          }
          return {
            status: omnibus.ST_OK,
            msg: ["transformed"],
            data: encodeURIComponent(text),
          };
        },
      },
      {
        label: t(`URL Decode`),
        handle: async ({ text, file, gref, PUtils }) => {
          if (1 % 2 == 0) {
            return {
              status: omnibus.ST_ERR,
              msg: ["Cannot handle the value {0}", "example"],
            };
          }
          return {
            status: omnibus.ST_OK,
            msg: ["transformed"],
            data: decodeURIComponent(text),
          };
        },
      },
    ])
    .setMenus([
      {
        id: "json_menu",
      },
    ]);
}
export default omnibus;
