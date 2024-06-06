import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Tabs,
  Tab,
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import axios from "axios";
import _ from "lodash";
import cstore from "../store/cstore";

const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});
window.AppToaster = AppToaster;

let gapi = {
  runOnceOnly(key1, fn) {
    let key = localStorage.getItem(key1);
    if (key == null || key != cstore.desktop.RUID) {
      localStorage.setItem(key, cstore.desktop.RUID);
      fn();
    }
  },
  getValueFromE(e) {
    return _.get(e, "target.value", e);
  },
  win_confirm: async function (obj, ...args) {
    return new Promise((r, e) => {
      let res = t(obj, ...args);
      gstore.sysinfo.confirmObj.open = true;
      gstore.sysinfo.confirmObj.msg = res;
      gstore.sysinfo.confirmObj.fn = r;
    });
  },
  win_prompt(obj) {
    return new Promise((r, e) => {
      gstore.sysinfo.promptObj.ipt = "";
      let msg = obj;
      gstore.sysinfo.promptObj.open = true;
      gstore.sysinfo.promptObj.msg = msg;
      gstore.sysinfo.promptObj.fn = () => {
        r(
          gstore.sysinfo.promptObj.ipt == "" ||
            _.isNil(gstore.sysinfo.promptObj.ipt)
            ? null
            : gstore.sysinfo.promptObj.ipt
        );
      };
    });
  },
  win_alert(str, ...args) {
    return new Promise((r, e) => {
      let res = t(str, ...args);
      gstore.sysinfo.alertObj.open = true;
      gstore.sysinfo.alertObj.msg = res;
      gstore.sysinfo.alertObj.fn = r;
    });
  },
  sleep(val) {
    return new Promise((e) => {
      setTimeout(() => {
        e();
      }, val);
    });
  },
  run_async_loop(fn, timeval) {
    let myref = {
      still_run: true,
    };
    let mycancelFn = () => {
      myref.still_run = false;
    };
    let okfunc = () => {
      setTimeout(async () => {
        if (!myref.still_run) {
          return;
        }
        await fn();
        if (!myref.still_run) {
          return;
        }
        await gutils.sleep(timeval);
        if (!myref.still_run) {
          return;
        }
        okfunc();
        if (!myref.still_run) {
          return;
        }
      }, 0);
    };
    okfunc();
    return mycancelFn;
  },
  defer(func, timeout = 0) {
    setTimeout(func, timeout);
  },
  optStatic: async function (link) {
    if (("" + link).indexOf("?") != -1) {
      link = link = "?=r" + Date.now();
    }
    let res = await axios({
      url: "" + link,
    });
    return res;
  },
  alert(config) {
    if (_.isString(config)) {
      config = {
        message: config,
      };
    }
    if (
      !_.isNil(config.message) &&
      config.message.indexOf &&
      config.message.indexOf("setValue") != -1
    ) {
      console.log("ignore that errors");
      return;
    }
    config.message = _.isString(config.message)
      ? t(config.message)
      : config.message;
    return AppToaster.show(config);
  },
  opt: async function (url, args = {}) {
    let lastOkTokenKey = "LAST_OK_TOKEN";
    let thatToken = localStorage.getItem(lastOkTokenKey);
    try {
      let parseResult = Qs.parse(
        location.href.substring(location.href.indexOf("?") + 1)
      );
      if (!_.isEmpty(parseResult)) {
        thatToken = _.get(parseResult, "token");
        if (_.isNil(thatToken) || thatToken == "") {
          if (localStorage.getItem(lastOkTokenKey) != null) {
            thatToken = localStorage.getItem(lastOkTokenKey);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    if (!_.isNil(window.PAD_VALUE_FOR_QUERY)) {
      if (("" + window.PAD_VALUE_FOR_QUERY).trim().length != 0) {
        thatToken = window.PAD_VALUE_FOR_QUERY;
      }
      // let shouldUpdate = true;
      // if (!_.isNil(thatToken)) {
      //   if (thatToken.indexOf() != -1) {
      //     shouldUpdate = false;
      //   }
      // }
      // if (shouldUpdate) {
      //   thatToken = thatToken + " " + window.PAD_VALUE_FOR_QUERY;
      // }
    }
    let res = await axios({
      url: url,
      method: "POST",
      data: {
        param: {
          nav_token: thatToken,
          ...args,
        },
      },
    });
    if (window.QUIT_NOW !== true) {
      localStorage.setItem(lastOkTokenKey, thatToken);
    }
    return res;
  },
};

window.gutils = gapi;
window.gapi = gapi;

export default gapi;
