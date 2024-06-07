import mapi from "./common_api";
import gm_api from "./common_api";
window.PREMIUM_VER = true;

let auth_obj = {
  deactivateThisDevice: async (e) => {
    if (e.forceQuit) {
    } else {
      if (
        !(await gutils.win_confirm(
          t(
            `Would you like to be continue? We will remove related credentials on this device, after finishing that operation, you can remove the deivce record in the user centre online.`
          )
        ))
      ) {
        gutils.alert({
          message: t(`Cancelled this operation.`),
        });
        return;
      }
    }
    if (p_mode()) {
      // sign out
    } else {
      //
      await gutils.opt("/premium/remove_activation");
      try {
        let {
          content: { pubKey },
        } = await gutils.opt(`/premium/get_pub_key`);
        await mapi.opt(`/reg/remove_the_device_by_pubkey`, {
          refresh: true,
          pubKey: pubKey,
        });
      } catch (e) {
        console.log("e", e);
      }
    }
    localStorage.removeItem("crt_premium_user");
    try {
      await fn_logout({
        forceQuit: true,
      });
    } catch (e) {
      console.log("e", e);
    }
    location.reload();
  },
  login: async function () {
    try {
      gstore.user.overlayForLogin.loading = true;
      let param = gstore.user.loginPageData.addModel;
      let signInRes = await gutils.optCentre("/user/post/sign-in", param);
      let ftlErrInfoStr = _.chain(signInRes).get("ftlMap.errInfo").value();
      gstore.user.overlayForLogin.loading = false;
      if (ftlErrInfoStr) {
        _.forEach(ftlErrInfoStr, (x, d, n) => {
          gutils.alert({
            message: x || "Cannot executed your request",
            intent: "danger",
            icon: "error",
          });
        });
        gstore.user.loginPageData.addModel.EXTRA_TMP_LOGIC_vcode =
          Math.random();
        return;
      } else {
        // localStorage.setItem("USER_TOKEN", );
        gutils.alertOk("Sign In Successfully");
        let userInfo = window.get_user_info();
        window.signInRes = signInRes;
        let cloneModel = _.cloneDeep(param);
        cloneModel.password = "";
        userInfo.token = signInRes.content.TOKEN;
        userInfo.email = signInRes.content.EMAIL;
        userInfo.username = signInRes.content.USER_NAME;
        userInfo.signed = true;
        if (!p_mode()) {
          let {
            content: { pubKey },
          } = await gutils.opt(`/premium/get_pub_key`);
          let { ftlMap } = await gutils.optCentre("/user/centre", {
            local_serial_key: pubKey,
            auto_select_license: "yes",
            c_type: "offline_act_result",
          });
          let err = _.get(ftlMap, "msg");
          if (_.get(ftlMap, "isOK") === false) {
            if (!_.isNil(err)) {
              gutils.alert({
                message: err,
                intent: "danger",
                icon: "error",
              });
              return;
            }
          }
          let actCode = _.get(ftlMap, "result_private_key");
          await gutils.opt("/premium/verify_pri_key", {
            activation_code: actCode,
          });
          await auth_obj.checkLicenseFromTimeToTime();
        }
        await gutils.saveLocalSettings(_.cloneDeep(gstore.localSettings));
        gutils.alert(`System will reload later, please wait a moments.`);
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    } catch (e) {
      gstore.user.overlayForLogin.loading = false;
      gutils.alert(gutils.getErrMsg(e));
    }
  },
  p_mode: () => {
    return true;
    return (
      location.host == "cloud.codegen.cc" ||
      location.host == "test.codegen.cc" ||
      (gutils.dev() && location.host == "127.0.0.1:55777") ||
      (location.host || "").indexOf("1024doc.com") != -1
    );
  },
  checkLicenseFromTimeToTime: async () => {
    if (true || p_mode()) {
      return;
    }
    // await gm_api.opt("/reg/show_post_body", {
    //   a: "李白",
    //   mute: true,
    //   refresh: true,
    //   test: {
    //     a: 1,
    //   },
    // });
    let {
      content: { pubKey },
    } = await gutils.opt(`/premium/get_pub_key`);
    let get_PC_user_infoRes = await gutils.opt(`/premium/get_PC_user_info`);
    if (
      !p_mode() &&
      auth_obj.is_sign_in() &&
      gstore.apiInfo.can_this_device_use_presently
    ) {
      let mRes = await gm_api.opt(`/reg/isThatPubKeyRegistered`, {
        pubKey,
        refresh: true,
      });
      if (false === mRes.ftlMap.valid) {
        gutils.alert(`Current activation is expired.`);
        await auth_obj.deactivateThisDevice({ forceQuit: true });
      }
    }
    let verifyStatusRes = await gm_api.opt(
      "/reg/verify_user_activation_status",
      {
        mute: true,
        refresh: true,
        pubKey,
        pc_user_info: get_PC_user_infoRes.content,
      }
    );
    let veirfyStatus = verifyStatusRes.ftlMap.verifyStatus;
    if (veirfyStatus.exhausted) {
      await gutils.win_alert(
        `Dear User, the number of devices corresponding to your premium account reached to the upper limit, which means you need to remove one of these devices which are in use or purchase a new license to use more devices on your account. Please click the OK button to continue.`
      );
      gstore.localUserConfig.drawer.tabId = "my_devices";
      gstore.localUserConfig.drawer.open = true;
      throw new Error("DEVICE_MAXIMUM_EXCEEDED");
    }
  },
  get_user_info: () => {
    return gstore.localSettings.userInfo;
  },
  is_sign_in: () => {
    return (window.get_user_info() || {}).signed;
  },
  user_token: () => {
    return (window.get_user_info() || {}).token;
  },
  p_visitor_mode: () => {
    return p_mode() && !is_sign_in();
  },
  not_reg: () => {
    return false;
    // return (
    //   !gstore.apiInfo.can_this_device_use_presently && gstore.apiInfo.finalChk
    // );
  },
};
_.map(auth_obj, (x, d, n) => {
  window[d] = x;
});
setTimeout(auth_obj, 0);
window.gm_api = gm_api;

export default auth_obj;
