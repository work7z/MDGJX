let mapi = {
  setItem_p: async (id, value) => {
    await gutils.opt("/p_save/setItem", {
      key: id,
      value: value,
    });
  },
  getItem_p: async (id) => {
    let res = await gutils.opt("/p_save/getItem", {
      key: id,
    });
    return _.get(res, "content.findValue");
  },
  opt: async (url, data = {}, callback) => {
    if (_.isNil(callback)) {
      callback = () => {};
    }
    let hasUpdatedByOld = false;
    try {
      let p_obj = null;
      if (!p_mode() && data.refresh !== true) {
        let pre_retrieve_res = await gutils.opt(`/v_cache/retrieve`, {
          url: url,
          body: data,
        });
        let f = _.get(pre_retrieve_res, "content.f");
        if (!_.isEmpty(f)) {
          try {
            p_obj = JSON.parse(f.response);
            window.tmp_p_obj = p_obj;
            await callback(p_obj);
            hasUpdatedByOld = true;
          } catch (e) {
            console.log("err", e);
          }
        }
      }
      let res = await gutils.optCentre(
        "/vendor" + url,
        {
          ...data,
        },
        {
          mute: data.alertError !== true,
        }
      );
      window.tmp_res = res;
      let returnObj = {
        ftlMap: res.ftlMap || res.content,
        status: res.status,
        error:
          res.status != 1
            ? _.get(res, "ftlMap.msg", "An Error Occurred.")
            : null,
      };
      // ensure no error, if not updated yet then call it directly
      if (hasUpdatedByOld && returnObj.error) {
        // do nothing
      } else {
        if (!_.isEqual(p_obj, returnObj)) {
          await callback(returnObj);
        }
      }
      if (!returnObj.error && !p_mode()) {
        await gutils.opt(`/v_cache/save`, {
          url: url,
          body: data,
          response: returnObj,
        });
      }
      if (data.alertError) {
        if (
          returnObj.ftlMap &&
          !returnObj.ftlMap.isOK &&
          returnObj.ftlMap.msg
        ) {
          gutils.alert({
            intent: "danger",
            message: returnObj.ftlMap.msg,
          });
        }
      }
      return returnObj;
    } catch (e) {
      console.log(e);
      if (!hasUpdatedByOld && _.isNil(data.mute)) {
        throw e;
      }
    }
  },
};

export default mapi;
