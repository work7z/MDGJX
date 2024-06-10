const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
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
  GSyncSelectWithFilter,
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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import menuUtils from "../../TranslateForJSON/frontend/menu_utils";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import assertsUtils from "../../TranslateForJSON/frontend/kit/asserts";
import FTPFileBrowser from "./Cpt/FTPFileBrowser";
import GFormInput2 from "../../SQLDrafts/frontend/Kit_GFormInput2";
import FormNoDataButShowSthPanel from "../../TranslateForJSON/frontend/cpt/FormNoDataButShowSthPanel";
let GFormInput = GFormInput2;

let appTitle = "FTP Transfer";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    notReady: !gutils.dev(),
    willReadyVersion: `v1.8.7`,
    initialState: async () => {
      // await fn_otherPages.fn.loadStatic({
      //   PreRequisiteJson,
      //   gref,
      // });
      let fn_get_config = () => {
        /**
         * username: miles
         * password: 123456
         */
        return {
          acct_type: "regular",
          host: "",
          port: 21,
          user: "testuser",
          password: "",
          mode: "passive",
          charset: "UTF-8",
          timeout: 8000,
        };
      };
      return {
        jsx: {
          haveCreated: false,
          needUpdate: false,
        },
        ftp_id: gutils.uuid(),
        ftp_config: fn_get_config(),
        tmp_ftp_config: fn_get_config(),
      };
    },
    menus: [
      {
        ...menuUtils.menu_1st.util_server,
        children: [
          {
            ...menuUtils.menu_2rd.server_file_services,
            children: [
              {
                label: appTitle,
                icon: "application",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.rightMainPageJsx({
        noTranslateForTitle: true,
        totalTitle: ({ PUtils }) => {
          let statusText = undefined;
          let { crtModel } = PUtils;
          if (crtModel.jsx.needUpdate) {
            statusText = t(`Update Server Config`);
          } else if (crtModel.jsx.haveCreated) {
            statusText =
              t(`File Browser`) +
              " - " +
              t(`{0}`, _.get(crtModel, "ftp_config.name"));
          } else {
            // not created
            statusText = t(`Create My Server`);
          }
          return cutils.arr_to_one([t(appTitle), statusText], " - ");
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          window.tmp___crtModel = crtModel;
          cutils.useCommonSave({ PUtils });
          let fn_get_ftp_config = () => {
            return {
              ...PUtils.crtModel.ftp_config,
              ftp_id: crtModel.ftp_id,
            };
          };
          let lc_store_status = useLocalStore(() => {
            return {
              status: {
                connected: false,
              },
            };
          });
          let fn_callAPI = async (type, obj = {}) => {
            let m = await gref.optAPI("ftp_opt_" + type, {
              action_type: type,
              ftp_id: crtModel.ftp_id,
              ...obj,
            });
            return _.get(m, "data.value.result");
          };
          let fn_callExecAPI = async (sub_action_type, obj = {}) => {
            return await fn_callAPI("execute", {
              sub_action_type: sub_action_type,
              ...obj,
            });
          };
          let fn_core_connect = async ({ ftp_config }) => {
            cutils.alert_noT(t(`Connecting to the server...`));
            await fn_callAPI("connect", {
              ftp_config,
            });
            await fn_core_refresh_status();
            cutils.alertOk_noT(t(`Connected!`));
          };
          let fn_core_disconnect = async ({ ftp_config }) => {
            cutils.alert_noT(t(`Trying to disconnect the server...`));
            await fn_callAPI("disconnect", {
              ftp_config,
            });
            await fn_core_refresh_status();
            cutils.alertOk_noT(t(`Disconnected!`));
          };
          let fn_core_checkTmpConfigFile = async (arg = {}) => {
            let testMode = _.get(arg, "testMode");
            // TODO: do the logic for creating new instance
            cutils.alert_noT(
              t(`Verifying the config in case any incorrect field value...`)
            );
            // verify the config
            assertsUtils.notBlank(
              PUtils.crtModel.tmp_ftp_config.name,
              t(`Name`)
            );
            assertsUtils.notBlank(
              PUtils.crtModel.tmp_ftp_config.host,
              t(`Host`)
            );
            assertsUtils.notBlank(
              PUtils.crtModel.tmp_ftp_config.user,
              t(`Username`)
            );
            await gutils.sleep(200);
            cutils.alertOk_noT(t(`Passed the verification.`));
            await fn_core_connect({
              ftp_config: PUtils.crtModel.tmp_ftp_config,
            });
            if (testMode != true) {
              PUtils.crtModel.ftp_config = _.cloneDeep(
                PUtils.crtModel.tmp_ftp_config
              );
              PUtils.fn_direct_rename_tab({
                name: `FTP - ${PUtils.crtModel.ftp_config.name}`,
              });
            } else {
            }
          };

          let lc900 = useLocalStore(() => {
            return {
              loading_times: 0,
            };
          });

          let fn_core_refresh_status = async () => {
            let obj0613 = await fn_callAPI("status");
            if (!_.isEqual(lc_store_status.status, obj0613)) {
              console.log("changing status", obj0613);
              lc_store_status.status = obj0613;
            }
            lc900.loading_times++;
            window.obj0613 = obj0613;
          };
          useEffect(() => {
            let a = PUtils.loop(fn_core_refresh_status, 2000);
            return () => {
              a();
            };
          }, []);

          let fn_core_refreshAll = async () => {
            cutils.alert_noT(t(`Refreshing all data...`));
            await fn_core_refresh_status();
            cutils.alertOk_noT(t(`Refreshed`));
          };

          let fn_wrapWithFAQ = (ele) => {
            return PUtils.jsx.leftRightSpliter({
              percentRightWidth: 320,
              n_style: {
                overflowX: "hidden",
              },
              resizekey: "ftp_drafts__lr",
              left: PUtils.jsx.panelWithTitle({
                title: t(`FTP Protocol Config Panel`),
                n_style: {
                  borderTop: "none",
                  overflowX: "hidden",
                },
                jsx: React.createElement(observer((props) => ele)),
              }),
              right: PUtils.jsx.panelWithTitle({
                title: "FAQ for FTP",
                n_style: {
                  borderTop: "none",
                },
                jsx: (
                  <div style={{ padding: "12px" }}>
                    {[
                      {
                        title: t(
                          `How does your team implement the FTP protocol? Is it cross-platform and secure enough?`
                        ),
                        ctn: t(
                          `Good question. As is customary, we relied on the Apache {0} project to implement the main logic of FTP protocol, you can be assured of its security and reliability. If there’s any incompatible issue while using this tool, please accept our sincere apologies and contact us at any time, we would be very thankful.`,
                          "common-nets"
                        ),
                      },
                      {
                        title: t(
                          `What happens if the remote server doesn't have a stable network connection with us?`
                        ),
                        ctn: t(
                          `Factually, we will provide a built-in feature to reconnect the server while it's in time-out status without any intervention whereas you can use this tool accordingly with joyous and carefree.`
                        ),
                      },
                      {
                        title: t(
                          `What do you mean that I can use an anonymous account for the connection?`
                        ),
                        ctn: t(
                          `In FTP protocol, if you don't know what the account username and password are for the host you want to access, then you can have a try with the anonymous account mode, which means you needn't provide the account explicitly. (For sure, in other words, it requires the server to permit using anonymous mode.)`
                        ),
                      },
                    ].map((x, d, n) => {
                      return (
                        <div key={x.title}>
                          <h4>{x.title}</h4>
                          <p className="bp3-text-small bp3-text-muted">
                            {x.ctn}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ),
              }),
            });
          };
          let item_testConn = {
            text: t(`Test Connection`, "FTP"),
            intent: "success",
            minimal: true,
            outlined: true,
            loading_id: "encode_ROOT_EXTENSION_ADDONS_testconnect",
            onClick: cutils.tryCatchWithWinModal(async () => {
              await fn_core_checkTmpConfigFile({
                testMode: true,
              });
              // PUtils.crtModel.jsx.haveCreated = true;
            }),
          };
          let arr_controls = PUtils.crtModel.jsx.needUpdate
            ? [
                {
                  text: t(`Apply Changes`),
                  intent: "success",
                  minimal: true,
                  outlined: true,
                  loading_id: "encode_ROOT_EXTENSION_ADDONS_connect",
                  onClick: cutils.tryCatchWithWinModal(async () => {
                    // connect
                    await fn_core_checkTmpConfigFile();
                    PUtils.crtModel.jsx.needUpdate = false;
                  }),
                },
                item_testConn,
                {
                  text: t(`Cancel`),
                  minimal: true,
                  outlined: true,
                  intent: "none",
                  loading_id: "encode_ROOT_EXTENSION_ADDONS_cancel",
                  onClick: async () => {
                    // cancel
                    PUtils.crtModel.jsx.needUpdate = false;
                  },
                },
              ]
            : PUtils.crtModel.jsx.haveCreated
            ? !lc_store_status.status.connected
              ? [
                  {
                    text: t(`Connect`),
                    intent: "primary",
                    minimal: true,
                    outlined: true,
                    loading_id: "encode_ROOT_EXTENSION_ADDONS_connect",
                    onClick: cutils.tryCatchWithWinModal(async () => {
                      await fn_core_connect({
                        ftp_config: fn_get_ftp_config(),
                      });
                    }),
                  },
                ]
              : [
                  {
                    text: t(`Disconnect`),
                    intent: "danger",
                    minimal: true,
                    outlined: true,
                    loading_id: "encode_ROOT_EXTENSION_ADDONS_disconnect",
                    onClick: cutils.tryCatchWithWinModal(async () => {
                      await fn_core_disconnect({
                        ftp_config: fn_get_ftp_config(),
                      });
                    }),
                  },
                ]
            : [
                {
                  text: t(`Create New Instance`, "FTP"),
                  intent: "primary",
                  minimal: true,
                  outlined: true,
                  loading_id: "encode_ROOT_EXTENSION_ADDONS_connect",
                  onClick: cutils.tryCatchWithWinModal(async () => {
                    await fn_core_checkTmpConfigFile();
                    PUtils.crtModel.jsx.haveCreated = true;
                  }),
                },
                item_testConn,
              ];
          let arr_rightControls = PUtils.crtModel.jsx.needUpdate
            ? []
            : PUtils.crtModel.jsx.haveCreated
            ? lc_store_status.status.connected
              ? [
                  {
                    text: t(`Refresh`),
                    intent: "none",
                    icon: "refresh",
                    minimal: true,
                    outlined: true,
                    loading_id: "encode_ROOT_EXTENSION_ADDONS_refresh",
                    onClick: cutils.tryCatchWithWinModal(async () => {
                      await fn_core_refreshAll();
                    }),
                  },
                ]
              : [
                  {
                    text: t(`Modify Config`),
                    intent: "none",
                    icon: "cog",
                    minimal: true,
                    outlined: true,
                    loading_id: "encode_ROOT_EXTENSION_ADDONS_modify_config",
                    onClick: async () => {
                      PUtils.crtModel.tmp_ftp_config = _.cloneDeep(
                        PUtils.crtModel.ftp_config
                      );
                      PUtils.crtModel.jsx.needUpdate = true;
                    },
                  },
                ]
            : [];

          let fnWrapEle = () =>
            fn_wrapWithFAQ(
              React.createElement(
                observer(
                  PUtils.fn.fn_form_jsx_by_config(
                    () => [
                      () => ({
                        label: t(`Name`),
                        helperText: t(
                          `Please provide a name for your connection.`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          type: "text",
                          small: true,
                          placeholder: `e.g. My server`,
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.name = x;
                          },
                          value: PUtils.crtModel.tmp_ftp_config.name,
                        },
                      }),
                      () => ({
                        label: t(`Account Type`),
                        helperText: t(
                          `Learn More please refer to {0}`,
                          `https://en.wikipedia.org/wiki/File_Transfer_Protocol`
                        ),
                        tag: GFormSelect,
                        tagProps: {
                          list: [
                            {
                              label: t("Regular Account"),
                              value: "regular",
                            },
                            {
                              label: t("Anonymous Account"),
                              value: "anonymous",
                            },
                          ],
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.acct_type =
                              x.target.value;
                            if (
                              PUtils.crtModel.tmp_ftp_config.acct_type !=
                              "regular"
                            ) {
                              PUtils.crtModel.tmp_ftp_config.user = "anonymous";
                              PUtils.crtModel.tmp_ftp_config.password = "";
                            } else {
                              PUtils.crtModel.tmp_ftp_config.user = "";
                              PUtils.crtModel.tmp_ftp_config.password = "";
                            }
                          },
                          value: PUtils.crtModel.tmp_ftp_config.acct_type,
                        },
                      }),
                      () => ({
                        label: t(`Host`),
                        helperText: t(
                          `IP address or domain name for the connection`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          type: "text",
                          small: true,
                          placeholder: `e.g. 192.168.1.108`,
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.host = x;
                          },
                          value: PUtils.crtModel.tmp_ftp_config.host,
                        },
                      }),
                      () => ({
                        label: t(`Port`),
                        helperText: t(`Port number for the connection`),
                        tag: GFormInput,
                        tagProps: {
                          type: "number",
                          small: true,
                          placeholder: `e.g. 23`,
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.port = x;
                          },
                          value: PUtils.crtModel.tmp_ftp_config.port,
                        },
                      }),
                      () => ({
                        label: t(`Username`),
                        helperText: t(
                          `Username for the connection, if you don't know its value, you can select anonymous account mode and try again.`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          type: "text",
                          disabled:
                            PUtils.crtModel.tmp_ftp_config.acct_type !=
                            "regular",
                          small: true,
                          placeholder: `e.g. jerrylai`,
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.user = x;
                          },
                          value: PUtils.crtModel.tmp_ftp_config.user,
                        },
                      }),
                      () => ({
                        label: t(`Password`),
                        helperText: t(`Password for the connection.`),
                        tag: GFormInput,
                        tagProps: {
                          type: "password",
                          disabled:
                            PUtils.crtModel.tmp_ftp_config.acct_type !=
                            "regular",
                          small: true,
                          placeholder: ``,
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.password = x;
                          },
                          value: PUtils.crtModel.tmp_ftp_config.password,
                        },
                      }),
                      () => ({
                        label: t(`Timeout`),
                        helperText: t(
                          `By Default, CodeGen will interrupt the connection if it exceeds 8000 milliseconds. You could specify its value here if the timeout value is too short to be used.`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          type: "number",
                          small: true,
                          placeholder: `e.g. 8000`,
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.timeout = x;
                          },
                          value: PUtils.crtModel.tmp_ftp_config.timeout,
                        },
                      }),
                      () =>
                        cutils.crud.formitem_charset({
                          model: PUtils.crtModel.tmp_ftp_config,
                          GSyncSelectWithFilter,
                        }),
                      () => ({
                        label: t(`Connection Mode`),
                        helperText: t(
                          `By Default, CodeGen will use passive mode. Too often, the passive mode are used commonly and frequently. If you encounter issues while using active mode, please switch to passive mode and try it again.`
                        ),
                        tag: GFormSelect,
                        tagProps: {
                          list: [
                            {
                              label: t("Passive Mode"),
                              value: "passive",
                            },
                            {
                              label: t("Active Mode"),
                              value: "active",
                            },
                          ],
                          onChange(x) {
                            PUtils.crtModel.tmp_ftp_config.mode =
                              x.target.value;
                          },
                          value: PUtils.crtModel.tmp_ftp_config.mode,
                        },
                      }),
                    ],
                    {
                      scroll_mem_id: PUtils.fn_getCrtID(),
                    }
                  )
                )
              )
            );
          let finBody = null;
          if (PUtils.crtModel.jsx.needUpdate) {
            finBody = fnWrapEle();
          } else if (PUtils.crtModel.jsx.haveCreated) {
            finBody = React.createElement(
              observer((props) => (
                <FTPFileBrowser
                  PUtils={PUtils}
                  gref={gref}
                  lc_store_status={lc_store_status}
                  ftp_config={PUtils.crtModel.ftp_config}
                  fn_callAPI={fn_callAPI}
                  fn_callExecAPI={fn_callExecAPI}
                />
              ))
            );
          } else {
            finBody = fnWrapEle();
          }
          if (lc900.loading_times <= 0) {
            finBody = <FormNoDataButShowSthPanel />;
          }
          return PUtils.jsx.createPanelWithBtnControls({
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: arr_controls,
            rightControls: arr_rightControls,
            body: finBody,
          });
        }),
      })
    ),
  };
};
