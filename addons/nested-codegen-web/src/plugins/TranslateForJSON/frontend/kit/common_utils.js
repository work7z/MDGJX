const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GFormSwitch,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Tag,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  observer,
  Position,
  Toaster,
  Checkbox,
  ContextMenu,
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
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
  Spinner,
  Callout,
  PanelStack,
  gstore,
  AnchorButton,
  Tooltip,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Menu,
  MenuItem,
  MenuDivider,
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
  BluePrintDocs,
  BluePrintCpt,
  observable,
  gutils,
  ReactDOM,
  
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  Provider,
  Router,
  GFormInput,
  inject,
  Html_select,
  BeautifyCodeCommon,
  prettier,
  xmlutils,
  createHistory,
  withRouter,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import js_export_trigger from "../../../../web/pages/latest/components/BeautifyCodeCommon/js_export_trigger";
import FormCrudTable from "../cpt/FormCrudTable";
import lo_utils from "./lo_utils";
// import js_export_trigger from "../../../../web/pages/latest/components/BeautifyCodeCommon/js_export_trigger";
const Simple_table = observer((props) => {
  let { column, data } = props;
  let lc_store = useLocalStore(() => {
    let eachPageSize = 15;
    if (!_.isNil(props.eachPageSize)) {
      eachPageSize = props.eachPageSize;
    }
    return {
      filterValue: "",
      pageInfo: {
        pageIndex: 1,
        pageSize: eachPageSize,
        loading: false,
      },
    };
  });
  let calcData = useMemo(() => {
    if (gutils.empty(lc_store.filterValue) || _.isNil(props.filterOptions)) {
      return data;
    }
    let lowVal = _.toLower(lc_store.filterValue);
    return _.filter(data, (x) => {
      return (
        _.toLower(
          _.chain(props.filterOptions.checkIndex)
            .map((xx) => x[xx])
            .join("")
            .value() || ""
        ).indexOf(lowVal) != -1
      );
    });
  }, [lc_store.filterValue, data]);
  let pageInfo = lc_store.pageInfo;
  let pageCount = _.size(calcData);
  let limitSizePerPage = pageInfo.pageSize;
  const totalPageNum = gutils.noNaN(Math.ceil(pageCount / pageInfo.pageSize));
  let isBiggerThanNeed = _.size(calcData) > limitSizePerPage;
  return (
    <div>
      {props.title ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3px",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: 0 }}>{props.title}</h4>
          <div
            style={{
              marginBottom: "5px",
            }}
          >
            {props.filterOptions ? (
              <InputGroup
                small={true}
                value={lc_store.filterValue}
                onChange={(e) => {
                  lc_store.pageInfo.pageIndex = 1;
                  lc_store.filterValue = gutils.getValueFromE(e);
                }}
                leftElement={<Icon small={true} icon="search" />}
                {...props.filterOptions}
              ></InputGroup>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <table
        style={{ width: "100%", height: "100%" }}
        className="bp3-html-table simple-g-table  bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered"
      >
        <thead>
          <tr>
            {_.map(column, (x, d, n) => {
              return (
                <th
                  width={x.width}
                  style={{
                    textAlign: x.center ? "center" : null,
                    width: x.width,
                  }}
                  key={x.label}
                >
                  {x.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {_.map(
            isBiggerThanNeed
              ? _.slice(
                  calcData,
                  (pageInfo.pageIndex - 1) * limitSizePerPage,
                  pageInfo.pageIndex * limitSizePerPage
                )
              : calcData,
            (x, d, n) => {
              return (
                <tr key={d}>
                  {_.map(column, (eachCol, eachColIdx) => {
                    return (
                      <td
                        style={{
                          textAlign: eachCol.center ? "center" : null,
                        }}
                      >
                        {eachCol.value(x, eachColIdx) || ""}
                      </td>
                    );
                  })}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {isBiggerThanNeed ? (
        <p style={{ padding: "5px 8px" }}>
          <div
            className="control-pagin-wrapper beflex"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="left-desc">
              {t(
                "{0} Records, {1} of {2} pages",
                pageCount,
                pageInfo.pageCount === 0 ? 0 : pageInfo.pageIndex,
                totalPageNum
              )}
            </div>
            <div className="right-desc">
              <ButtonGroup>
                <Button
                  disabled={pageInfo.pageIndex == 1}
                  icon="caret-left"
                  loading={pageInfo.loading}
                  onClick={() => {
                    pageInfo.pageIndex--;
                  }}
                ></Button>
                <Button
                  disabled={pageInfo.pageIndex >= totalPageNum}
                  loading={pageInfo.loading}
                  icon="caret-right"
                  onClick={() => {
                    pageInfo.pageIndex++;
                  }}
                ></Button>
              </ButtonGroup>
            </div>
          </div>
        </p>
      ) : (
        ""
      )}
    </div>
  );
});
function convertRes2BlobAndDownload(filename, data) {
  const blob = new Blob([data], {
    type: "application/octet-stream",
  });
  // 创建新的URL并指向File对象或者Blob对象的地址
  const blobURL = window.URL.createObjectURL(blob);
  // 创建a标签，用于跳转至下载链接
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", decodeURI(filename));
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  // 挂载a标签
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  // 释放blob URL地址
  window.URL.revokeObjectURL(blobURL);
}

let fn_debounceCall = _.debounce((obj) => {
  obj.fn();
}, 50);
let fn_debounceCall_200 = _.debounce((obj) => {
  obj.fn();
}, 200);
let cutils = {
  useCommonSave({ PUtils }) {
    useEffect(() => {
      let a = autorun(() => {
        PUtils.commonSave();
      });
      return () => {
        a();
      };
    }, []);
  },
  cond_emptyObj(obj) {
    return _.isEmpty(obj);
  },
  jsx_btnList(arr) {
    return _.map(arr, (x, d, n) => {
      return <Button {...x} key={x.text + " " + d}></Button>;
    });
  },
  getEventValue(e) {
    return _.get(e, "target.value", e);
  },
  sameArr(a, b) {
    return _.size(a) == _.size(b) && (a === b || _.isEqual(a, b));
  },
  prefix_cache: "cgdev_cache_",
  tryCatch(fn) {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (msg) {
        cutils.alertErr_noT(t(`Error: {0}`, gutils.getErrMsg(msg)));
        throw msg;
      }
    };
  },
  tryCatchWithWinModal(fn) {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (msg) {
        gutils.win_alert_no_t(t(`Error: {0}`, gutils.getErrMsg(msg)));
        throw msg;
      }
    };
  },
  getStaticURLPrefix() {
    return gutils.getStaticURLPrefix();
  },
  fn_debounceCall,
  fn_debounceCall_200,
  copy(val, e) {
    js_export_trigger({
      saveValue: val,
      e: {
        detail: e ? e.detail : 1,
      },
      fn_files_for_zip: undefined,
      filename: `out-${Date.now()}.txt`,
    });
  },
  importForIpPart: async ({ ip_part, tmp_crt_model }) => {
    let key_bits = ip_part[4];
    let clipboardText = await cutils.getClipboardData();
    let rawClipboard = clipboardText;
    clipboardText = _.trim(clipboardText);
    // .replace("http://", "")
    // .replace(/\/$/, "");
    let regex = /([a-z0-9]+\.){3,}[a-z0-9]+(\/\d+)?/;
    if (!regex.test(clipboardText)) {
      cutils.alertErr_noT({
        skipT: true,
        intent: "danger",
        message: t(
          `Sorry, your clipboard data is {2}, CodeGen could not parse its value, please make value the clipboard value would be like {0} or {1}.`,
          "192.168.2.1",
          "192.168.2.1/24",
          rawClipboard
        ),
      });
      return;
    } else {
      // cutils.alertOk_noT(
      //   t(
      //     "Imported. ToolBox expects values like {0} or {1}, if your clipboard data does not match that formatting, please re-try with a correct value.",
      //     "192.168.2.1",
      //     "192.168.2.1/24"
      //   )
      // );
      cutils.alertOk_noT(t(`Done. Finished the importing operation.`));
    }
    clipboardText = clipboardText.match(regex)[0];
    _.merge(tmp_crt_model, {
      [ip_part[0]]: "",
      [ip_part[1]]: "",
      [ip_part[2]]: "",
      [ip_part[3]]: "",
      [key_bits]: "24",
    });
    clipboardText = _.trim(clipboardText);
    let ipAddrPart = clipboardText;
    if (clipboardText.indexOf("/")) {
      let bits = _.trim(clipboardText.split("/")[1]);
      _.merge(tmp_crt_model, {
        [key_bits]: bits,
      });
      ipAddrPart = _.trim(clipboardText.split("/")[0]);
    }
    let ipAddrArr = _.split(ipAddrPart, ".");
    _.merge(tmp_crt_model, {
      [ip_part[0]]: ipAddrArr[0],
      [ip_part[1]]: ipAddrArr[1],
      [ip_part[2]]: ipAddrArr[2],
      [ip_part[3]]: ipAddrArr[3],
    });
  },
  alert_noT(msg) {
    if (_.isString(msg)) {
      msg = {
        message: msg,
      };
    }
    return gutils.alert({
      ...msg,
      skipT: true,
    });
  },
  qs(obj) {
    return Qs.stringify(obj);
  },
  alertOk_noT(msg) {
    if (_.isString(msg)) {
      msg = {
        intent: "success",
        message: msg,
      };
    }
    _.merge(msg, {
      intent: "success",
    });
    return gutils.alert({
      ...msg,
      skipT: true,
    });
  },
  alertErr_noT(msg) {
    if (_.isString(msg)) {
      msg = {
        message: msg,
      };
    }
    _.merge(msg, {
      intent: "danger",
    });
    return gutils.alert({
      ...msg,
      skipT: true,
    });
  },
  getClipboardData: async () => {
    const text = await navigator.clipboard.readText();
    return text;
  },
  selectFile() {
    return new Promise((e, r) => {
      gutils.selectFile(async (val) => {
        if (_.isNil(val)) {
          r(null);
        } else {
          e(val);
        }
      });
    });
  },
  m_cache: {
    getValue: async ({ id }) => {
      let { content } = await gutils.opt("/m_save/get", {
        id: id,
      });
      return content;
    },
    batchGetValue: async ({ idArr }) => {
      let { content } = await gutils.opt("/m_save/batchGet", {
        idArr: idArr,
      });
      return content;
    },
    setValue: async ({ id, value }) => {
      await gutils.opt("/m_save/set", {
        id: id,
        value,
      });
    },
  },
  arr_to_one(arr, split) {
    arr = lo_utils.filter(arr, (x) => !_.isNil(x) && _.trim(x) != "");
    return arr.join(split);
  },
  has_that_file: async (filepath) => {
    let r = await gutils.opt("/pri/has_that_file", {
      filepath,
    });
    return _.get(r, "content.hasThatFile");
  },
  cond_isCronInvalid_async: async (val) => {
    let { content } = await gutils.opt("/pub/verify_cron_testing", {
      cron_str: val,
    });
    if (!content.ok) {
      cutils.alertErr_noT("" + content.msg);
      return true;
    } else {
      return false;
    }
    // let isThatOK =
    //   _.size(val.split(/\s+/)) === 7 || _.size(val.split(/\s+/)) === 6;
    // return cutils.cond_emptyStr(val) || !isThatOK;
  },
  isServerWindows() {
    return gstore.apiInfo.server_using_windows;
  },
  fn_getBatchButtons(arr) {
    arr = arr.filter((x) => !_.isNil(x));
    return arr.map((x, d, n) => {
      return (
        <Button small={true} {...x} key={d}>
          {x.text || x.label}
        </Button>
      );
    });
  },
  getPhForDisk() {
    return !cutils.isServerWindows()
      ? "e.g. /users/testuser/outputdir"
      : "e.g. C:\\users\\testuser\\output";
  },
  cond_emptyStr(val) {
    return _.isNil(val) || val === "";
  },
  alertFormPanel(fk1) {
    let {
      PUtils,
      confirmText = "Create",
      title,
      finalFormArr,
      fn_finalFormArr,
      presetFormModel = null,
      pureObj,
    } = fk1;
    let tmp_fn = null;
    gutils.w_alertMsgGlobal({
      confirmIntent: "primary",
      cancelText: "Close",
      confirmText: confirmText,
      noConfirm: false,
      noBackdrop: false,
      confirm: async () => {
        // onSave
        return await tmp_fn();
      },
      icon: "add-to-artifact",
      style: {
        top: "20px",
      },
      width: "45vw",
      s_clzname: "white-app-view",
      title: title,
      jsx: observer((__xxnouse) => {
        let t_ls_100 = useLocalStore(() => {
          let newModel = {};
          _.forEach(finalFormArr, (x, d, n) => {
            if (!_.isNil(x.defaultValue)) {
              newModel[x.prop] = x.defaultValue;
            }
          });
          if (!_.isNil(presetFormModel)) {
            newModel = presetFormModel;
          } else {
            // if (_.isNil(newModel["id"])) {
            //   newModel["id"] = gutils.uuid();
            // }
          }
          return {
            addModel: newModel,
          };
        });
        // let pureRef = useRef({
        //   pureObj: {},
        // });
        let val_form_item = fn_finalFormArr
          ? fn_finalFormArr({ model: t_ls_100.addModel })
          : finalFormArr;
        if (gutils.dev()) {
          window.tmp_100200 = t_ls_100;
        }
        tmp_fn = async () => {
          console.log("running fk1");
          return await fk1.onSave(t_ls_100.addModel);
        };

        return (
          <div className="pt-10">
            {React.createElement(
              observer(
                PUtils.fn.fn_form_jsx_by_config(() => [
                  ..._.map(val_form_item, (eachCol, d, n) => {
                    return {
                      label: eachCol.label,
                      helperText: eachCol.f_desc,
                      tag: eachCol.tag || GFormInput,
                      tagProps: {
                        ...(eachCol.tagProps || {}),
                        x_model: eachCol.needModel ? t_ls_100.addModel : {},
                        small: true,
                        // pureObj: pureRef.current.pureObj,
                        pureObj,
                        noTranslate: true,
                        placeholder: eachCol.ph ? `e.g. ${eachCol.ph}` : ``,
                        index: eachCol.prop,
                        obj: t_ls_100.addModel,
                        onChange(x) {
                          t_ls_100.addModel[eachCol.prop] = x;
                        },
                        value: t_ls_100.addModel[eachCol.prop],
                      },
                    };
                  }),
                ])
              )
            )}
          </div>
        );
      }),
    });
  },
  enableTaskInfo: async function () {
    await gutils.opt("/ext/init", {
      id: "ROOT_EXTENSION_ADDONS",
    });
  },
  clz: {
    bp3button: " bp3-button bp3-large bp3-minimal bp3-outlined ",
    bp3button_small: " bp3-button bp3-small bp3-minimal bp3-outlined ",
  },
  jsx_404_not_found() {
    return <div>404 not found</div>;
  },
  getTaskInfo: async function ({ prop }) {
    let { content } = await gutils.opt("/ran_task/get_one", {
      prop: prop,
    });
    return content;
  },
  startTaskInfo: async function ({ prop }) {
    await gutils.opt("/ran_task/start", {
      prop: prop,
    });
  },
  stopTaskInfo: async function ({ prop }) {
    await gutils.opt("/ran_task/stop", {
      prop: prop,
    });
  },
  close(obj) {
    try {
      obj.close();
    } catch (e) {
      console.log("err", e);
    }
  },
  exportAsFile(filename, data) {
    convertRes2BlobAndDownload(filename, data);
  },
  link: {
    getDownloadByFileName(obj) {
      return (
        `/dg/downloadByFileName?` +
        cutils.qs({
          ...obj,
          systoken: Base64.encode(
            JSON.stringify(window.LOCAL_AUTH_LOGIN_CHK.getUserInfo())
          ),
        })
      );
    },
  },
  license_btn() {
    return (
      <p>
        {t("Learn More:")}
        <a href={cutils.license_link} target="_blank">
          {t(`CodeGen Terms and Conditions`)}
        </a>
      </p>
    );
    return (
      <AnchorButton
        text={t(``)}
        large={true}
        href={cutils.license_link}
        target="_blank"
      ></AnchorButton>
    );
  },
  license_link: `https://codegen.cc/main/license/main`,
  ifnull(mval, df) {
    if (_.isNil(mval)) {
      return df;
    } else {
      return mval;
    }
  },
  direct_jsx_SQL_TYPE({ PUtils, crtStoreName }) {
    let a = cutils.jsx_sqlType({ PUtils, crtStoreName });
    return (
      <div
        style={{
          display: "inline-block",
        }}
      >
        {React.createElement(a.tag, {
          ...a,
          style: {
            display: "inline-block",
          },
        })}
      </div>
    );
  },
  jsx_sqlType({ PUtils, crtStoreName }) {
    return {
      tag: GFormSelect,
      value: gstore.common_app[crtStoreName].model.DBTYPE,
      onChange: (e) => {
        gstore.common_app[crtStoreName].model.DBTYPE = e.target.value;
      },
      list: [
        {
          label: "MySQL",
          value: "mysql",
        },
        {
          label: "PostgreSQL",
          value: "postgresql",
        },
        {
          label: "Oracle",
          value: "oracle",
        },
        {
          label: "SQLServer",
          value: "sqlserver",
        },
        {
          label: "DB2",
          value: "db2",
        },
        {
          label: "H2",
          value: "h2",
        },
        {
          label: "Hive",
          value: "hive",
        },
      ],
    };
  },
  Simple_table,
  Simple_Pagination_table: Simple_table,
  cc(a) {
    return JSON.parse(
      atob(_.reverse(a.replaceAll("LPCGG9kqo1", "h").split("")).join(""))
    );
  },
  now() {
    return Moment().format("YYYY-MM-DD HH:mm:ss");
  },
  logs: {
    wrapper({ PUtils }) {
      return {
        debug(msg) {
          return cutils.logs.push({
            PUtils,
            type: "DEBUG",
            message: msg,
          });
        },
        info(msg) {
          return cutils.logs.push({
            PUtils,
            type: "INFO",
            message: msg,
          });
        },
        fine(msg) {
          return cutils.logs.push({
            PUtils,
            type: "FINE",
            message: msg,
          });
        },
        warn(msg) {
          return cutils.logs.push({
            PUtils,
            type: "WARN",
            message: msg,
          });
        },
        clean() {
          PUtils.crtModel.loggings_array = [];
        },
        severe(msg) {
          return cutils.logs.push({
            PUtils,
            type: "SEVERE",
            message: msg,
          });
        },
      };
    },
    push({ clean, PUtils, type, message }) {
      if (clean) {
        PUtils.crtModel.loggings_array = [];
      } else {
      }
      PUtils.crtModel.loggings_array.push(
        `[${cutils.now()}][${type}] ${message}`
      );
    },
  },
  str: {
    json_fn_list: `
let fn_data_filter = (obj, fn_filter)=>{
  return _[_.isObject(obj) ? 'pickBy': 'filter'](obj, fn_filter)
}
let fn_data_mapper = (obj, fn_filter)=>{
  return _[_.isObject(obj) ? 'mapValues': 'map'](obj, fn_filter)
}`,
  },
  select: {
    namingStrategy() {
      return [
        {
          label: t("Remain Unchanged"),
          value: "no_change",
        },

        {
          label: t("From UnderLine to Camel"),
          value: "underline_to_camel",
        },
      ];
    },
  },
  isJSONMode: async function (str) {
    try {
      str = await cutils.formatJSON(str);
      JSON.parse(str);
      return {
        result: true,
        str,
      };
    } catch (e) {
      return {
        result: false,
        str: null,
      };
    }
  },
  getErrInfo(e) {
    return _.get(e, "message", "" + e);
  },
  getErrMsg(e) {
    return gutils.getErrMsg(e);
  },
  formatJSON: async function (leftValue) {
    let m = await gutils.optWithNoWin("/common/format_for_json", {
      VALUE: leftValue,
    });
    let str = m.content.result;
    return str;
  },
  formatJSONWithErr: async function (leftValue) {
    let m = await gutils.optWithNoWin("/common/format_for_json", {
      VALUE: leftValue,
    });
    let isOk = m.content.isOk;
    let str = m.content.result;
    if (!isOk) {
      throw new Error(str);
    }
    return str;
  },
  formatJSONWithErrAndMsg: async function (leftValue) {
    let b = await cutils.isJSONMode(leftValue);
    if (!b.result) {
      let err = t(`Invalid JSON Format.`);
      cutils.alertErr_noT(err);
      throw new Error(str);
    }
    let m = await gutils.optWithNoWin("/common/format_for_json", {
      VALUE: leftValue,
    });
    let isOk = m.content.isOk;
    let str = m.content.result;
    if (!isOk) {
      cutils.alertErr_noT(cutils.getErrMsg(str));
      throw new Error(str);
    }
    return str;
  },
  crud: {
    formitem_charset({ model, GSyncSelectWithFilter }) {
      return {
        label: t(`Charset`),
        helperText: t(
          `By Default, CodeGen will use {0} as its charset.`,
          "UTF-8"
        ),
        tag: GSyncSelectWithFilter,
        tagProps: {
          list: gstore.common_app.model_charset_listings,
          small: true,
          whenChg: (x) => {
            model.charset = x;
          },
          index: "charset",
          obj: model,
          onChange(x) {
            model.password = x;
          },
          value: model.password,
        },
      };
    },
    form_charset({ model, GSyncSelectWithFilter }) {
      return {
        label: t("Charset"),
        children: [
          {
            tag: GSyncSelectWithFilter,
            index: "config_charset",
            obj: model,
            whenChg: (x) => {
              model.config_charset = x;
            },
            list: gstore.common_app.model_charset_listings,
          },
        ],
      };
    },
    list_regex_or_plain: ({
      type,
      crt_obj,
      crt_idx,
      val_label = t(`Definition Value`),
      type_label = t(`Definition Type`),
      exampleForInput,
    }) => {
      return {
        tag: FormCrudTable,
        tagProps: {
          previewRecord(crtRow) {
            if (_.isNil(crtRow.value) || crtRow.value == "") {
              return t(`Value cannot be empty`);
            }
          },
          fixedWidth: true,
          onChg: () => {},
          obj: crt_obj,
          index: crt_idx,
          column: [
            {
              label: type_label,
              prop: "type",
              jsx: GFormSelect,
              list: [
                type.indexOf("plain_text") != -1
                  ? {
                      label: t("Plain Text"),
                      value: "plain_text",
                    }
                  : null,
                type.indexOf("regex") != -1
                  ? {
                      label: t("Regular Expression"),
                      value: "regex",
                    }
                  : null,
              ].filter((x) => !_.isNil(x)),
            },
            {
              label: val_label,
              prop: "value",
              jsx: GFormInput,
              noTranslate: true,
              noTranslate: true,
              placeholder: t(`e.g. {0}`, exampleForInput),
              jsxProps: {},
            },
          ],
        },
      };
    },
  },
};
window.cutils = cutils;
export default cutils;
