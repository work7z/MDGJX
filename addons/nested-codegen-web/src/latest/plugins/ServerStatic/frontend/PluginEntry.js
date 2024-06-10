const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  GFormInput,
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
  GFormSwitch,
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
  useRef,
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
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import menuUtils from "../../TranslateForJSON/frontend/menu_utils";
import gen_server_utils from "../../TranslateForJSON/frontend/subkit/GenServer/gen_server_utils";
import GEditableText from "../../TranslateForJSON/frontend/cpt/GEditableText";
import FormViewLoggings from "../../TranslateForJSON/frontend/cpt/FormViewLoggings";
import FormQrCodeViewer from "../../TranslateForJSON/frontend/cpt/FormQrCodeViewer";
const { PopoverInteractionKind } = window.CodeGenDefinition.BluePrintCpt;

let pub_val = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDN27q0Tz55Rf+F
A+2jSwQBzIfhJjQnwEbnSaA3K3PqvQsLRXeIjila01D3whh+XNwWfH+yBexPYYgc
iT2rg7gmFRA0ZRe7BOIJGkQEKNYgV+QmTWneDPt4r6KTK4hICGeQTvfkMDudViGh
OrTUTsbm1aCWVMZ2hQgSXVmNltSJMqEcPlixct0UdsxJz+387lYsYZFzJy4AgPtK
ILrPM7SIRPVTl3VgePdGYtHFRsUnldlKIElycRpHdASK8Z4RFrS+hJ2iFiNGh6u8
5bgmAXq88i8TbrsHu+NPFlm/QcBIdi91jk3UwOzSjzeuLY2OvGPv0G8yMviAs+QW
Lk8VeodtAgMBAAECggEBAKQJpuJNjyvWIoHdGn0Xps7EK7a22bKfXiCpo7iysIDq
OSW3KkQvfDa60vdKvHfdCSgF9z9lxuOOhYavueu1X4VBHZOSxvEpN/Em8/IYlGBb
iRsYbvcZgz2tPzBk7QjxYY010AUOhkKewteWT0gqqgaBTqDcVvVUlpUDu/u+qAfW
WN1RwUk33/f2ljyUAz18gBwhV7vQoHtvc5CSJEAA0QVvRnDesk6XNFM3xF8BFOBU
/EYd7meDJlLZKq8eH0B+darNuX6ML2iekzoBptT5y6k+2BCeKOVndggDNlM2COnY
qDGPXUYpMsWS5nurtRf2F+WtFHYV2522+OvQrDdy+IECgYEA818vJ7QUByNF2LcQ
Oi+lZf9x/FQEDL3V3kFhuLFEtOw7qySMopjP5faRlb5f/G45+/TNHK3KcaM0J0HB
46PKoPWbrm0TbaM6Rytzmytntnt55/YsVbXmf8eJsxpT/i6HPnMWzI0bPdIG61bd
oS40Bt8utm37Osh5F7ZjouQ92qECgYEA2Io8mJwHkYPh6iaS8Auy+z3Ebi3Oq8SG
L60zokk0JZCc8LXzeBcrU0+caXXXs3d7FnOYFd0Ug70rSvLHZB5MDU7Sgs08VBfG
dGnkRKSsouvr7jGTyDYAucih/2xctzHfSLnXE4ZzM9vSkac/wy6M503VgGCYvA9Y
msf43pM2pU0CgYEA2tzZslHuxPCCqr8Ol9UrYEvV/T6tGaxKvgJ8WDUK/c2IZ4OJ
+duE82DHUiwPdBrIiH6BSu47pfBIQZmQPSCaZCAcbkNnemyVR1WbNItXTLNEUUeA
XWAlNvqCKhBeQrMjKxUjBrdLLVBIqrHGxGGhpiBliOflS9rnk1yRw/aQbaECgYBf
3IrI8MI0/FKGCz+ffz5kFUshj6vfxOe2sZGbNZcdTjD8K0C2mGM4xZSz51RvgeR+
4vugKjhLvfItgt8choEanxt4ho0/mSrlHH/Ol6xJj/HpiA8pYibeGGEHJ5zACRcV
Jhh971aOzbEhhA4pRTFhsMZkx9612oFaPE8Dkd5uPQKBgQDqUz4UJyGcEj7ZsWFS
XDxfVcOpG2PLlhzXLAmJFWmo+d7B/NFogncD+lfGxmVmWapp5y93v9EpAnCjQMri
4+d7xbl0hrqiG5CESR0x2vv3y44nqukR7YZsFkK9q2mh4Yqw0Mk2RHZAXSKO2WBf
vHHz2SYqyv6z5svtx04agSqoDQ==
-----END PRIVATE KEY-----
`;
let pri_val = `-----BEGIN CERTIFICATE-----
MIIC7DCCAdQCCQCnlsxh9SDNQDANBgkqhkiG9w0BAQsFADA4MRIwEAYDVQQDDAls
b2NhbGhvc3QxIjAgBgkqhkiG9w0BCQEWE2xvY2FsaG9zdEBsb2NhbC5jb20wHhcN
MjIwNjMwMDYzNzMxWhcNMjIwNzMwMDYzNzMxWjA4MRIwEAYDVQQDDAlsb2NhbGhv
c3QxIjAgBgkqhkiG9w0BCQEWE2xvY2FsaG9zdEBsb2NhbC5jb20wggEiMA0GCSqG
SIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN27q0Tz55Rf+FA+2jSwQBzIfhJjQnwEbn
SaA3K3PqvQsLRXeIjila01D3whh+XNwWfH+yBexPYYgciT2rg7gmFRA0ZRe7BOIJ
GkQEKNYgV+QmTWneDPt4r6KTK4hICGeQTvfkMDudViGhOrTUTsbm1aCWVMZ2hQgS
XVmNltSJMqEcPlixct0UdsxJz+387lYsYZFzJy4AgPtKILrPM7SIRPVTl3VgePdG
YtHFRsUnldlKIElycRpHdASK8Z4RFrS+hJ2iFiNGh6u85bgmAXq88i8TbrsHu+NP
Flm/QcBIdi91jk3UwOzSjzeuLY2OvGPv0G8yMviAs+QWLk8VeodtAgMBAAEwDQYJ
KoZIhvcNAQELBQADggEBACfw5yzjFjtvZbiEvT7IMB9ADJMIHpOnP6p/q3VMyRXk
/Lo9TTv/cR7xnHJpammM1E8ept1wibo0vRJoqMoYuwYZuEhWlLiY4VOXcFMbcs2Y
tynsdwnN08qeC70Y9Z/gvCV5FJn0DkNvr49sAtzTJsc/LPJvelx+MCpmj/12FS6p
+MuKqZ63TH1/BowL0LXGM9EfRYE88hxImxMLWd5JTwTcqyaz80uLpDsLJgnnpSm+
0glDop7DbsYdkZCA+tCtsJ6QjSoBoQicXZKkBsFztE4FWXJoDuizaDS9A7ClGngj
t9Fo28GslB4H3I0KmI2xdss24X4FuGeFK3ReKdLa8Uw=
-----END CERTIFICATE-----
`;

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Static and Redirect";
let { appId, appName } = metaObj;
let CurrentServicePanel = observer(() => {
  return (
    <div className="current-service-panel-wrapper  sys-card-wrapper">
      <Card>ok</Card>
    </div>
  );
});

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    getMenuButtonArr: async () => {
      return {
        // server_root_definition: () => {
        //   return (
        //     <Popover
        //       popoverClassName={Classes.POPOVER_WRAPPER}
        //       portalClassName="faults"
        //       interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
        //       enforceFocus={false}
        //       captureDismiss={true}
        //       position={PopoverPosition.BOTTOM_RIGHT}
        //       // isOpen={gstore.sysinfo.isOpenNotification}
        //     >
        //       <Button
        //         small={true}
        //         className={Classes.MINIMAL}
        //         onClick={() => {
        //           //
        //         }}
        //         // text="Settings"
        //         text={``}
        //         // icon="layout-circle"
        //         icon="inbox-search"
        //       />
        //       <CurrentServicePanel />
        //     </Popover>
        //   );
        // },
      };
    },
    initialState: async () => {
      return {
        config: {
          TAB_HIST_ID: null,
          SERVER_UID: gutils.uuid(),
          LISTEN_PORT: 8080,
          USE_SSL_MODE: false,
          USE_STATIC_MODE: false,
          SSL_PUBLIC_VALUE: pub_val,
          SSL_PRIVATE_VALUE: pri_val,
          SSL_PHRASE_VALUE: "",
          PUBLIC_DIR: "",
          CLEAN_URLS_BOOL: true,
          CLEAN_URLS_ARRAY_STR: [],
          REWRITE_BOOL: true,
          REDIRECT_BOOL: true,
          HEADERS_BOOL: true,
          USE_COMPRESS_MODE: true,
          REDIRECT_ARRAY_STR: [],
          REWRITE_ARRAY_STR: [],
          HEADERS_ARRAY_STR: [],
          DIRECTORY_LISTINGS_BOOL: true,
          DIRECTORY_LISTINGS_ARRAY_STR: [],
          UNLISTED_ARRAY_STR: [],
          TRAILING_SLASH: true,
          RENDER_SIGNLE_FILE: false,
          USE_SYMLINKS: false,
          USE_ETAG: true,
        },
      };
    },
    menus: [
      {
        ...menuUtils.menu_1st.util_server,
        children: [
          {
            ...menuUtils.menu_2rd.server_base_services,
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
        gref,
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.rightMainPageJsx({
        gref,
        left_hist_use_all: true,
        totalTitle: appTitle,
        PreRequisiteJson,
        appId: "ROOT_EXTENSION_ADDONS",
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          PUtils.crtStore.fn_whenCommonSave = () => {
            let { crtModel } = PUtils;
            // save its config
            gref.optAPI(`update_config_to_table`, {
              config: {
                ...crtModel.config,
                TAB_HIST_ID: PUtils.fn_crtHistId(),
              },
            });
          };
          let sys_ref = useRef({
            is_quit: false,
          });
          useEffect(() => {
            sys_ref.current.is_quit = true;
            return () => {
              sys_ref.current.is_quit = false;
            };
          }, []);
          let fn_status = () => {
            return {
              done: true,
              isOk: false,
              error: "",
              isErr: false,
            };
          };
          let fn_user_config = () => {
            return {
              link: `/`,
            };
          };
          let lc_20 = useLocalStore(() => {
            return {
              user_config: fn_user_config(),
              refresh_ref: _.uniqueId("m"),
              log_content: ``,
              status: fn_status(),
              net_card_listing: [],
              crt_network: {
                value: "127.0.0.1",
              },
            };
          });
          useEffect(() => {
            gutils.defer(async () => {
              let netCards = await gutils.opt("/system/net-cards");
              lc_20.net_card_listing = netCards.content;
            });
            return () => {};
          }, []);
          let fn_get_crt_link = (opt = {}) => {
            let { host = lc_20.crt_network.value, need_sub_link = true } = opt;
            let { USE_SSL_MODE, LISTEN_PORT } = PUtils.crtModel.config;
            return `${
              USE_SSL_MODE ? `https` : `http`
            }://${host}:${LISTEN_PORT}${
              !need_sub_link ? "" : lc_20.user_config.link
            }`;
          };
          window.lc_20 = lc_20;
          let fn_call_status = async () => {
            let { data } = await gref.optAPI(`get_service_status`, {
              config: {
                ...crtModel.config,
              },
            });
            let pickNextStatus = _.pick(data.status, _.keys(lc_20.status));
            if (!_.isEqual(lc_20.status, pickNextStatus)) {
              if (!lc_20.status.isErr && data.status.isErr) {
                gutils.alert({
                  intent: "danger",
                  message: (
                    <span>
                      {t(
                        `An error occurred, with regard to the further detail, please refer to loggings. The failure reason is: {0}`,
                        data.status.error || `Unknown Error`
                      )}
                    </span>
                  ),
                });
              }
              if (!lc_20.status.isOk && data.status.isOk) {
                // gutils.alertOk(t(`Started the server successfully`));
              }
              lc_20.status = data.status;
            }
          };
          useEffect(() => {
            let a = gutils.run_async_loop(fn_call_status, 700);
            return () => {
              a();
            };
          }, []);
          let { crtModel } = PUtils;
          return PUtils.jsx.createPanelWithBtnControls({
            helpBtnId: "ROOT_EXTENSION_ADDONS",
            controls: () => [
              lc_20.status.done === false
                ? {
                    text: t(`Stop Service`),
                    intent: "warning",
                    saveBeforeRun: true,
                    loading_id: "stop_service",
                    onClick: async () => {
                      // gutils.alert(t(`Stopping the service, moments please`));
                      let { data, errors } = await gref.optAPI(`stop_service`, {
                        config: {
                          // SERVER_UID: PUtils.crtModel.config.SERVER_UID,
                          ...PUtils.crtModel.config,
                        },
                      });
                      gutils.alertOk(t(`Stopped it.`));
                    },
                  }
                : {
                    text: t(`Start Service`),
                    intent: "primary",
                    saveBeforeRun: true,
                    loading_id: "start_service",
                    onClick: async () => {
                      lc_20.status = fn_status();
                      lc_20.user_config = fn_user_config();
                      let { data, errors } = await gref.optAPI(
                        `start_service`,
                        {
                          config: {
                            // SERVER_UID: PUtils.crtModel.config.SERVER_UID,
                            ...PUtils.crtModel.config,
                          },
                        }
                      );
                      await fn_call_status();
                      gutils.defer(async () => {
                        //
                      });
                      // window.update_tab_index(`gserver_btm_tab`, `loggings`);
                    },
                  },
              {
                text: t(`Refresh Service`),
                intent: "none",
                saveBeforeRun: true,
                loading_id: "refresh_service",
                onClick: async () => {
                  lc_20.refresh_ref = _.uniqueId("m");
                  gutils.alertOk(t(`Refreshed`));
                },
              },
            ],
            rightControls: () => [
              // {
              //   jsx_mode: true,
              //   cpt: (
              //     <GEditableText
              //       text={PUtils.fn_crtHistText()}
              //       onChange={async (val) => {
              //         console.log("changing value for hist text", val);
              //         await gref.optAPI(`update_tab_name`, {
              //           hist_info: PUtils.fn_getHistInfo(),
              //           NEW_TAB_NAME: val,
              //         });
              //         let NEW_TAB_NAME = val;
              //         PUtils.fn_crtHist().TAB_NAME = "" + NEW_TAB_NAME;
              //       }}
              //     ></GEditableText>
              //   ),
              // },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  border: true,
                  percent: 0.45,
                  top: React.createElement(
                    observer((props) => {
                      let { config } = PUtils.crtModel;
                      let is_hide_ssl = config["USE_SSL_MODE"] != true;
                      let is_hide_static = config["USE_STATIC_MODE"] != true;
                      console.log("is_hide_ssl", is_hide_ssl);
                      let jsx_common_arg = {
                        style: {
                          ...fn_otherPages.style.commonSettings_left(),
                          // overflow: "auto",
                        },
                        className: "common_setting_left",
                      };
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "gserver_decode_tab_btm",
                        list: [
                          {
                            label: t(`Basic Config`),
                            jsx: observer(
                              PUtils.fn.fn_form_jsx((props) => {
                                let lc_store = PUtils.crtModel;
                                let { config_gen_text_type } = PUtils.crtModel;
                                let model = PUtils.crtModel;
                                window.config_gen_text_type =
                                  config_gen_text_type;
                                return [
                                  <FormGroup
                                    helperText={t(
                                      "Please specify the listen port of the server at first, the port value will be limited between 1 to 65535."
                                    )}
                                    label={t("Listen Port")}
                                  >
                                    <GFormInput
                                      min={1}
                                      max={65535}
                                      type="number"
                                      small={true}
                                      placeholder="e.g. 1-65535"
                                      onChange={(val) => {
                                        config["LISTEN_PORT"] = val;
                                        PUtils.commonSave();
                                      }}
                                      value={config["LISTEN_PORT"]}
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "By Default, CodeGen will use HTTP Protocol (Non SSL Mode) to launch the server. "
                                    )}
                                    label={t("Using SSL Mode")}
                                  >
                                    <GFormSwitch
                                      type="number"
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        console.log("switch now", val);
                                        config["USE_SSL_MODE"] = !config[
                                          "USE_SSL_MODE"
                                        ]
                                          ? true
                                          : false;
                                        PUtils.commonSave();
                                      }}
                                      value={
                                        config["USE_SSL_MODE"] == true
                                          ? "true"
                                          : "false"
                                      }
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "By Default, CodeGen will disable static related config. If you need static file service, you can turn it on."
                                    )}
                                    label={t("Enable Static Service")}
                                  >
                                    <GFormSwitch
                                      type="number"
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        console.log("switch now", val);
                                        config["USE_STATIC_MODE"] = !config[
                                          "USE_STATIC_MODE"
                                        ]
                                          ? true
                                          : false;
                                        PUtils.commonSave();
                                      }}
                                      value={
                                        config["USE_STATIC_MODE"] == true
                                          ? "true"
                                          : "false"
                                      }
                                    />
                                  </FormGroup>,
                                ].filter((x) => !_.isNil(x));
                              }, jsx_common_arg)
                            ),
                          },
                          {
                            label: t(`SSL Config`),
                            hide: is_hide_ssl,
                            jsx: observer((props) =>
                              PUtils.jsx.tabWithDefinition({
                                default_select_tab: "str",
                                key: "ssl_config_tab_chooser",
                                list: [
                                  {
                                    label: `SSL Key`,
                                    jsx: observer((props) =>
                                      PUtils.jsx.createGEditor({
                                        title: t(`SSL Key Value`),
                                        fontSize: 11,
                                        wordWrap: "off",
                                        key: "SSL_PUBLIC_VALUE",
                                        language: "markdown",
                                        initContent: pub_val,
                                      })
                                    ),
                                  },
                                  {
                                    label: `SSL Cert`,
                                    jsx: observer((props) =>
                                      PUtils.jsx.createGEditor({
                                        title: t(`SSL Cert Value`),
                                        fontSize: 11,
                                        wordWrap: "off",
                                        key: "SSL_PRIVATE_VALUE",
                                        language: "markdown",
                                        initContent: pri_val,
                                      })
                                    ),
                                  },
                                  {
                                    label: `Password Phrase`,
                                    jsx: observer((props) =>
                                      PUtils.jsx.createGEditor({
                                        title: t(`Password Phrase Value`),
                                        fontSize: 11,
                                        wordWrap: "off",
                                        key: "SSL_PHRASE_VALUE",
                                        language: "markdown",
                                        initContent: "",
                                      })
                                    ),
                                  },
                                ].map((x) => {
                                  x.mode_jsx_func = true;
                                  return x;
                                }),
                              })
                            ),
                          },
                          {
                            label: t(`Static Config`),
                            hide: is_hide_static,
                            jsx: observer((props) =>
                              PUtils.jsx.leftRightSpliter({
                                percent: 0.7,
                                resizekey: "static_config_spliter",
                                leftClz: "no-x-scroll",
                                left: PUtils.fn.fn_form_jsx(
                                  (props) => {
                                    let lc_store = PUtils.crtModel;
                                    let { config_gen_text_type } =
                                      PUtils.crtModel;
                                    let model = PUtils.crtModel;
                                    window.config_gen_text_type =
                                      config_gen_text_type;
                                    return [
                                      <FormGroup
                                        helperText={
                                          t(
                                            "Please specify an absolute path as the static folder location, then CodeGen will enable related service to serve it for you."
                                          ) + ``
                                        }
                                        label={t("Static Folder")}
                                      >
                                        <GFormInput
                                          small={true}
                                          onChange={(val) => {
                                            config["PUBLIC_DIR"] = val;
                                            PUtils.commonSave();
                                          }}
                                          value={config["PUBLIC_DIR"]}
                                          placeholder={`e.g. ${
                                            isWin()
                                              ? "C:\\test_dir"
                                              : "/home/test_dir"
                                          }`}
                                        />
                                      </FormGroup>,
                                      <FormGroup
                                        helperText={
                                          t(
                                            "By Default, CodeGen will enable directory listing feature, it means visitor can access your file and related data. If you want to disable that feature, please turn it off."
                                          ) + ``
                                        }
                                        label={t("Enable Directory Listing?")}
                                      >
                                        <GFormSwitch
                                          type="number"
                                          valtype={"tf"}
                                          onChange={(val) => {
                                            console.log("switch now", val);
                                            config["DIRECTORY_LISTINGS_BOOL"] =
                                              !config["DIRECTORY_LISTINGS_BOOL"]
                                                ? true
                                                : false;
                                            PUtils.commonSave();
                                          }}
                                          value={
                                            config["DIRECTORY_LISTINGS_BOOL"] ==
                                            true
                                              ? "true"
                                              : "false"
                                          }
                                        />
                                      </FormGroup>,
                                    ].filter((x) => !_.isNil(x));
                                  },
                                  _.merge({}, jsx_common_arg, {
                                    style: {
                                      width: "100%",
                                    },
                                  })
                                ),
                                right: PUtils.jsx.tabWithDefinition({
                                  default_select_tab: "str",
                                  key: "white_or_black_for_dir",
                                  list: [
                                    {
                                      label: t(`White-list for Served Dirs`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) =>
                                        !config["DIRECTORY_LISTINGS_BOOL"] ? (
                                          <div className="pd-10">
                                            {t(
                                              `White-list config is unavailable as the directory list feature is disabled.`
                                            )}
                                          </div>
                                        ) : (
                                          PUtils.jsx.createGEditor({
                                            title: t(
                                              `White-list configuration`
                                            ),
                                            fontSize: 11,
                                            wordWrap: "off",
                                            key: "white_list_for_served_dirs",
                                            language: "markdown",
                                            initContent: [
                                              `# ${t(
                                                `By Default, CodeGen allows visitors access all directories of your static folder. `
                                              )}`,
                                              `# ${t(
                                                `If you want to limit the scope to some certain folders only, please provide related white-list filepath match expression.`
                                              )}`,
                                              `# ${t(
                                                `Please be noted that each line refers to each matcher pattern, meanwhile, if value is empty entirely, CodeGen will serve all directories.`
                                              )}`,
                                              `# ${t(
                                                "Expression Rules:"
                                              )} ${`https://github.com/isaacs/minimatch`}`,
                                            ].join("\n"),
                                          })
                                        )
                                      ),
                                    },
                                    {
                                      label: t(`Black-list for Served Dirs`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) =>
                                        !config["DIRECTORY_LISTINGS_BOOL"] ? (
                                          <div className="pd-10">
                                            {t(
                                              `Black-list config is unavailable as the directory list feature is disabled.`
                                            )}
                                          </div>
                                        ) : (
                                          PUtils.jsx.createGEditor({
                                            title: t(
                                              `Black-list configuration`
                                            ),
                                            fontSize: 11,
                                            wordWrap: "off",
                                            key: "black_list_for_served_dirs",
                                            language: "markdown",
                                            initContent: [
                                              `# ${t(
                                                `By Default, CodeGen allows visitors access all directories of your static folder. `
                                              )}`,
                                              `# ${t(
                                                `If you don't want some folders to be accessible, please provide related black-list filepath match expression to disable their access permission.`
                                              )}`,
                                              `# ${t(
                                                `Please be noted that each line refers to each matcher pattern, meanwhile, if value is empty entirely, CodeGen will serve all directories.`
                                              )}`,
                                              `# ${t(
                                                "Expression Rules:"
                                              )} ${`https://github.com/isaacs/minimatch`}`,
                                            ].join("\n"),
                                          })
                                        )
                                      ),
                                    },
                                  ],
                                }),
                                percent: 0.5,
                              })
                            ),
                          },
                          {
                            label: t(`Headers Config`),
                            jsx: observer((props) =>
                              PUtils.jsx.leftRightSpliter({
                                percent: 0.55,
                                leftClz: "no-x-scroll",
                                resizekey: "path_rewrites_splier",
                                left: PUtils.fn.fn_form_jsx(
                                  (props) => {
                                    let lc_store = PUtils.crtModel;
                                    let { config_gen_text_type } =
                                      PUtils.crtModel;
                                    let model = PUtils.crtModel;
                                    window.config_gen_text_type =
                                      config_gen_text_type;
                                    return [
                                      <FormGroup
                                        helperText={t(
                                          "By Default, CodeGen will not add unexpected headers, you can set custom headers for particular resources respectively. If you want to disable added rules directly without removing them, you can turn this option off."
                                        )}
                                        label={t(
                                          "Enable Custom Headers Rules?"
                                        )}
                                      >
                                        <GFormSwitch
                                          valtype={"tf"}
                                          onChange={(val) => {
                                            console.log("switch now", val);
                                            config["HEADERS_BOOL"] = !config[
                                              "HEADERS_BOOL"
                                            ]
                                              ? true
                                              : false;
                                            PUtils.commonSave();
                                          }}
                                          value={
                                            config["HEADERS_BOOL"] == true
                                              ? "true"
                                              : "false"
                                          }
                                        />
                                      </FormGroup>,
                                      config["HEADERS_BOOL"] ? (
                                        <FormGroup
                                          helperText={t(
                                            "In order to redirect visits to a certain path to a different one (or even an external URL), you can use this option and add related records to support it."
                                          )}
                                          label={t(
                                            "Custom Headers Rules Definition"
                                          )}
                                        >
                                          <FormCrudTable
                                            minWidth={"65px"}
                                            previewRecord={(e) => {
                                              if (_.isEmpty(e.source)) {
                                                return t(
                                                  `URL Pattern cannot be empty!`
                                                );
                                              } else if (_.isEmpty(e.headers)) {
                                                return t(
                                                  `Headers cannot be empty!`
                                                );
                                              }
                                            }}
                                            onChg={() => {
                                              // fn_updateCalc();
                                              PUtils.commonSave();
                                            }}
                                            obj={config}
                                            index={"HEADERS_ARRAY_STR"}
                                            column={[
                                              {
                                                label: t(`URL Pattern`),
                                                prop: "source",
                                                placeholder:
                                                  "**/*.@(jpg|jpeg|gif|png)",
                                              },
                                              {
                                                label: t(`Defined Headers`),
                                                prop: "headers",
                                                render_type: "inner_curd_table",
                                                render_args: {
                                                  onChg: () => {
                                                    PUtils.commonSave();
                                                  },
                                                  previewRecord: (e) => {
                                                    if (_.isEmpty(e.key)) {
                                                      return t(
                                                        `Key cannot be empty!`
                                                      );
                                                    }
                                                  },
                                                  column: [
                                                    {
                                                      label: `Key`,
                                                      prop: "key",
                                                      placeholder:
                                                        "Cache-Control",
                                                    },
                                                    {
                                                      label: `Value`,
                                                      prop: "value",
                                                      placeholder:
                                                        "max-age=7200",
                                                    },
                                                  ],
                                                },
                                              },
                                            ]}
                                          ></FormCrudTable>
                                        </FormGroup>
                                      ) : null,
                                    ].filter((x) => !_.isNil(x));
                                  },
                                  _.merge({}, jsx_common_arg, {
                                    style: {
                                      width: "100%",
                                    },
                                  })
                                ),
                                right: PUtils.jsx.tabWithDefinition({
                                  default_select_tab: "str",
                                  key: "white_or_black_for_dir",
                                  list: [
                                    {
                                      label: t(`Rules Syntax`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) => (
                                        <div className="pd-10">
                                          <h2>
                                            {t(`How to define custom headers?`)}
                                          </h2>
                                          <p>
                                            {t(
                                              "You maybe would like to learn how to fill these fields (URL Pattern and related headers value), no worries, CodeGen adopts general standard expression, you can view the links below to learn further detail. Meanwhile, CodeGen also provides related example, please kindly read it if needed."
                                            )}
                                          </p>
                                          <ul>
                                            <li>
                                              {t("Syntax for URL Pattern")}
                                              <ol>
                                                <li>
                                                  <a
                                                    href="https://github.com/isaacs/minimatch"
                                                    nofollow="true"
                                                    target="_blank"
                                                  >
                                                    Minimatch
                                                  </a>
                                                </li>
                                              </ol>
                                            </li>
                                          </ul>
                                          <div>---------------------------</div>
                                        </div>
                                      )),
                                    },
                                    {
                                      label: t(`Rules Examples`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) => (
                                        <div className="pd-10">
                                          <h2>
                                            {t(`Example for Custom Headers`)}
                                          </h2>
                                          <p>
                                            {t(
                                              "You can refer to the examples below, to write satisfying custom headers value"
                                            )}
                                          </p>
                                          <h4>
                                            1.{" "}
                                            {t(
                                              "Adding {0} for image resources",
                                              "Cache-Control: max-page=7200"
                                            )}
                                          </h4>
                                          <p>
                                            {`{      "source" : "**/*.@(jpg|jpeg|gif|png)" }`}
                                            <br />
                                            {`     { "headers" : [{
              "key" : "Cache-Control",
              "value" : "max-age=7200"
            }]
          }
      `}
                                          </p>
                                          <h4>
                                            2.{" "}
                                            {t(
                                              "Adding {0} for 404.html",
                                              "Cache-Control: max-page=300"
                                            )}
                                          </h4>
                                          <p>
                                            {` {
            "source" : "404.html"
          }`}
                                            <br />
                                            {`{ "headers" : [{
              "key" : "Cache-Control",
              "value" : "max-age=300"
            }]}`}
                                          </p>

                                          <div>---------------------------</div>
                                          <div>
                                            {t(
                                              `Please be noted that the JSON examples above isn't the factual structure of inputting value, you should input field value directly.`
                                            )}
                                          </div>
                                          <div>---------------------------</div>
                                          <div>
                                            {t(
                                              `Example is retrieved from Github Website`
                                            )}
                                          </div>
                                          <div>---------------------------</div>
                                        </div>
                                      )),
                                    },
                                  ],
                                }),
                              })
                            ),
                          },
                          {
                            label: t(`Path Rewrites`),
                            jsx: observer((props) =>
                              PUtils.jsx.leftRightSpliter({
                                percent: 0.55,
                                leftClz: "no-x-scroll",
                                resizekey: "path_rewrites_splier",
                                left: PUtils.fn.fn_form_jsx(
                                  (props) => {
                                    let lc_store = PUtils.crtModel;
                                    let { config_gen_text_type } =
                                      PUtils.crtModel;
                                    let model = PUtils.crtModel;
                                    window.config_gen_text_type =
                                      config_gen_text_type;
                                    return [
                                      <FormGroup
                                        helperText={t(
                                          "By Default, CodeGen will enable path rewrites rules. If you want to disable added rules directly without removing them, you can turn this option off."
                                        )}
                                        label={t("Enable Path Rewrites Rules?")}
                                      >
                                        <GFormSwitch
                                          valtype={"tf"}
                                          onChange={(val) => {
                                            console.log("switch now", val);
                                            config["REDIRECT_BOOL"] = !config[
                                              "REDIRECT_BOOL"
                                            ]
                                              ? true
                                              : false;
                                            PUtils.commonSave();
                                          }}
                                          value={
                                            config["REDIRECT_BOOL"] == true
                                              ? "true"
                                              : "false"
                                          }
                                        />
                                      </FormGroup>,
                                      config["REDIRECT_BOOL"] ? (
                                        <FormGroup
                                          helperText={t(
                                            "If the web resources URL is factually different from the URL that the visitor uses, you can write rewrite rules by providing source and destination value."
                                          )}
                                          label={t("Rewrite Rules Definition")}
                                        >
                                          <FormCrudTable
                                            minWidth={"65px"}
                                            previewRecord={(e) => {
                                              if (_.isEmpty(e.destination)) {
                                                return t(
                                                  `Destination cannot be empty!`
                                                );
                                              } else if (_.isEmpty(e.source)) {
                                                return t(
                                                  `Source cannot be empty!`
                                                );
                                              }
                                            }}
                                            onChg={() => {
                                              // fn_updateCalc();
                                              PUtils.commonSave();
                                            }}
                                            obj={config}
                                            index={"REWRITE_ARRAY_STR"}
                                            column={[
                                              {
                                                label: t(`Source `),
                                                prop: "source",
                                                placeholder:
                                                  "/projects/:id/edit",
                                              },
                                              {
                                                label: t(`Destination `),
                                                prop: "destination",
                                                placeholder:
                                                  "/edit-project-:id.html",
                                              },
                                            ]}
                                          ></FormCrudTable>
                                        </FormGroup>
                                      ) : null,
                                    ].filter((x) => !_.isNil(x));
                                  },
                                  _.merge({}, jsx_common_arg, {
                                    style: {
                                      width: "100%",
                                    },
                                  })
                                ),
                                right: PUtils.jsx.tabWithDefinition({
                                  default_select_tab: "str",
                                  key: "white_or_black_for_dir",
                                  list: [
                                    {
                                      label: t(`Rules Syntax`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) => (
                                        <div className="pd-10">
                                          <h2>
                                            {t(`How to write rewrites rules?`)}
                                          </h2>
                                          <p>
                                            {t(
                                              "You maybe would like to learn how to fill these fields (source and destination), no worries, CodeGen adopts general standard expression, you can view the links below to learn further detail. Meanwhile, CodeGen also provides an example as below, please kindly read it if needed."
                                            )}
                                          </p>
                                          <ul>
                                            <li>
                                              {t("Syntax for Source")}
                                              <ol>
                                                <li>
                                                  <a
                                                    href="https://github.com/isaacs/minimatch"
                                                    nofollow="true"
                                                    target="_blank"
                                                  >
                                                    Minimatch
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
                                                    nofollow="true"
                                                    target="_blank"
                                                  >
                                                    {t(`Regular Expression`)}
                                                  </a>
                                                </li>
                                              </ol>
                                            </li>
                                            <li>
                                              {t("Syntax for Destination")}
                                              <ol>
                                                <li>
                                                  <a
                                                    href="https://github.com/pillarjs/path-to-regexp"
                                                    nofollow="true"
                                                    target="_blank"
                                                  >
                                                    {t(`Path to Regexp`)}
                                                  </a>
                                                </li>
                                              </ol>
                                            </li>
                                          </ul>
                                          <div>---------------------------</div>
                                        </div>
                                      )),
                                    },
                                    {
                                      label: t(`Rules Examples`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) => (
                                        <div className="pd-10">
                                          <h2>
                                            {t(
                                              `Example for Source and Destination`
                                            )}
                                          </h2>
                                          <p>
                                            {t(
                                              "You can refer to the examples below, to write satisfying rewrite rules"
                                            )}
                                          </p>
                                          <h4>
                                            1. {t(`Define a rules as below`)}
                                          </h4>
                                          <p>
                                            {`{ "source": "/projects/:id/edit", "destination": "/edit-project-:id.html" }`}
                                          </p>
                                          <h4>2. {t("Rewrite Rules")}</h4>
                                          <p>
                                            {t(
                                              `Now, if a visitor accesses {0}, it will respond with the file {1}.`,
                                              `/projects/123/edit`,
                                              `/edit-project-123.html`
                                            )}
                                          </p>
                                          <h4>3. {t(`Other Examples`)}</h4>
                                          <p>
                                            {`{ "source": "app/**", "destination": "/index.html" }`}
                                            <br />
                                            {`{ "source": "projects/*/edit", "destination": "/edit-project.html" }`}
                                          </p>
                                          <div>---------------------------</div>
                                          <div>
                                            {t(
                                              `Please be noted that the JSON examples above isn't the factual structure of inputting value, you should input field value directly.`
                                            )}
                                          </div>
                                          <div>---------------------------</div>
                                          <div>
                                            {t(
                                              `Example is retrieved from Github Website`
                                            )}
                                          </div>
                                          <div>---------------------------</div>
                                        </div>
                                      )),
                                    },
                                  ],
                                }),
                              })
                            ),
                          },
                          {
                            label: t(`Path Redirects`),
                            jsx: observer((props) =>
                              PUtils.jsx.leftRightSpliter({
                                percent: 0.55,
                                leftClz: "no-x-scroll",
                                resizekey: "path_rewrites_splier",
                                left: PUtils.fn.fn_form_jsx(
                                  (props) => {
                                    let lc_store = PUtils.crtModel;
                                    let { config_gen_text_type } =
                                      PUtils.crtModel;
                                    let model = PUtils.crtModel;
                                    window.config_gen_text_type =
                                      config_gen_text_type;
                                    return [
                                      <FormGroup
                                        helperText={t(
                                          "By Default, CodeGen will enable path redirect rules. If you want to disable added rules directly without removing them, you can turn this option off."
                                        )}
                                        label={t("Enable Path Redirect Rules?")}
                                      >
                                        <GFormSwitch
                                          valtype={"tf"}
                                          onChange={(val) => {
                                            console.log("switch now", val);
                                            config["REDIRECT_BOOL"] = !config[
                                              "REDIRECT_BOOL"
                                            ]
                                              ? true
                                              : false;
                                            PUtils.commonSave();
                                          }}
                                          value={
                                            config["REDIRECT_BOOL"] == true
                                              ? "true"
                                              : "false"
                                          }
                                        />
                                      </FormGroup>,
                                      config["REDIRECT_BOOL"] ? (
                                        <FormGroup
                                          helperText={t(
                                            "In order to redirect visits to a certain path to a different one (or even an external URL), you can use this option and add related records to support it."
                                          )}
                                          label={t("Redirect Rules Definition")}
                                        >
                                          <FormCrudTable
                                            minWidth={"65px"}
                                            previewRecord={(e) => {
                                              if (_.isEmpty(e.destination)) {
                                                return t(
                                                  `Destination cannot be empty!`
                                                );
                                              } else if (_.isEmpty(e.source)) {
                                                return t(
                                                  `Source cannot be empty!`
                                                );
                                              } else {
                                                e.type = _.trim(e.type);
                                                if (
                                                  e.type != "301" &&
                                                  e.type != "302"
                                                ) {
                                                  return t(
                                                    `Please input 301 or 302 for Redirect Type, that field receive 301/302 two values only`
                                                  );
                                                }
                                              }
                                            }}
                                            onChg={() => {
                                              // fn_updateCalc();
                                              PUtils.commonSave();
                                            }}
                                            obj={config}
                                            index={"REDIRECT_ARRAY_STR"}
                                            column={[
                                              {
                                                label: t(`Source `),
                                                prop: "source",
                                                placeholder:
                                                  "/projects/:id/edit",
                                              },
                                              {
                                                label: t(`Destination `),
                                                prop: "destination",
                                                placeholder:
                                                  "/edit-project-:id.html",
                                              },
                                              {
                                                label: t(`Redirect Type `),
                                                prop: "type",
                                                placeholder: "301 or 302",
                                              },
                                            ]}
                                          ></FormCrudTable>
                                        </FormGroup>
                                      ) : null,
                                    ].filter((x) => !_.isNil(x));
                                  },
                                  _.merge({}, jsx_common_arg, {
                                    style: {
                                      width: "100%",
                                    },
                                  })
                                ),
                                right: PUtils.jsx.tabWithDefinition({
                                  default_select_tab: "str",
                                  key: "white_or_black_for_dir",
                                  list: [
                                    {
                                      label: t(`Rules Syntax`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) => (
                                        <div className="pd-10">
                                          <h2>
                                            {t(`How to write redirect rules?`)}
                                          </h2>
                                          <p>
                                            {t(
                                              "You maybe would like to learn how to fill these fields (source, destination and redirect type), no worries, CodeGen adopts general standard expression, you can view the links below to learn further detail. Meanwhile, CodeGen also provides related example, please kindly read it if needed."
                                            )}
                                          </p>
                                          <ul>
                                            <li>
                                              {t("Syntax for Source")}
                                              <ol>
                                                <li>
                                                  <a
                                                    href="https://github.com/isaacs/minimatch"
                                                    nofollow="true"
                                                    target="_blank"
                                                  >
                                                    Minimatch
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
                                                    nofollow="true"
                                                    target="_blank"
                                                  >
                                                    {t(`Regular Expression`)}
                                                  </a>
                                                </li>
                                              </ol>
                                            </li>
                                            <li>
                                              {t("Syntax for Destination")}
                                              <ol>
                                                <li>
                                                  <a
                                                    href="https://github.com/pillarjs/path-to-regexp"
                                                    nofollow="true"
                                                    target="_blank"
                                                  >
                                                    {t(`Path to Regexp`)}
                                                  </a>
                                                </li>
                                              </ol>
                                            </li>
                                            <li>
                                              {t(`Redirect Type`)}
                                              <ol>
                                                <li>
                                                  {t(
                                                    `301, it's used for permanent redirect action`
                                                  )}
                                                </li>
                                                <li>
                                                  {t(
                                                    `302, it's used for temporary redirect action`
                                                  )}
                                                </li>
                                              </ol>
                                            </li>
                                          </ul>
                                          <div>---------------------------</div>
                                        </div>
                                      )),
                                    },
                                    {
                                      label: t(`Rules Examples`),
                                      mode_jsx_func: true,
                                      jsx: observer((props) => (
                                        <div className="pd-10">
                                          <h2>
                                            {t(
                                              `Example for Source and Destination`
                                            )}
                                          </h2>
                                          <p>
                                            {t(
                                              "You can refer to the examples below, to write satisfying redirect rules"
                                            )}
                                          </p>
                                          <h4>
                                            1. {t(`Define a rules as below`)}
                                          </h4>
                                          <p>
                                            {`{ "source": "/old-docs/:id", "destination": "/new-docs/:id", "type": 301 }`}
                                            <br />
                                            {` { "source": "/old", "destination": "/new", "type": 302 }`}
                                          </p>
                                          <h4>2. {t("Rewrite Rules")}</h4>
                                          <p>
                                            {t(
                                              `In the example above, {0} would be forwarded to {1} with status code 301. In addition {2} would be forwarded to {3} with status code 302.`,
                                              `/old-docs/12`,
                                              `/new-docs/12`,
                                              `/old`,
                                              `/new`
                                            )}
                                          </p>
                                          <h4>3. {t(`Other Examples`)}</h4>
                                          <p>
                                            {`{ "source": "/from", "destination": "/to", "type": 301 }`}
                                            <br />
                                            {`{ "source": "/old-pages/**", "destination": "/home" }`}
                                          </p>
                                          <div>---------------------------</div>
                                          <div>
                                            {t(
                                              `Please be noted that the JSON examples above isn't the factual structure of inputting value, you should input field value directly.`
                                            )}
                                          </div>
                                          <div>---------------------------</div>
                                          <div>
                                            {t(
                                              `Example is retrieved from Github Website`
                                            )}
                                          </div>
                                          <div>---------------------------</div>
                                        </div>
                                      )),
                                    },
                                  ],
                                }),
                              })
                            ),
                          },
                          {
                            label: t(`Other`),
                            jsx: observer(
                              PUtils.fn.fn_form_jsx((props) => {
                                let lc_store = PUtils.crtModel;
                                let { config_gen_text_type } = PUtils.crtModel;
                                let model = PUtils.crtModel;
                                window.config_gen_text_type =
                                  config_gen_text_type;
                                return [
                                  <FormGroup
                                    helperText={t(
                                      "By Default, CodeGen will enable compression feature to speed up response time. If you don't need this feature, you can turn it off."
                                    )}
                                    label={t("Enable Compression?")}
                                  >
                                    <GFormSwitch
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        console.log("switch now", val);
                                        config["USE_COMPRESS_MODE"] = !config[
                                          "USE_COMPRESS_MODE"
                                        ]
                                          ? true
                                          : false;
                                        PUtils.commonSave();
                                      }}
                                      value={
                                        config["USE_COMPRESS_MODE"] == true
                                          ? "true"
                                          : "false"
                                      }
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "By Default, this option is set to true, and with this option when a request to /test would result in a 301 redirect to /test/."
                                    )}
                                    label={t("Enable Trailing Slash?")}
                                  >
                                    <GFormSwitch
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        console.log("switch now", val);
                                        config["TRAILING_SLASH"] = !config[
                                          "TRAILING_SLASH"
                                        ]
                                          ? true
                                          : false;
                                        PUtils.commonSave();
                                      }}
                                      value={
                                        config["TRAILING_SLASH"] == true
                                          ? "true"
                                          : "false"
                                      }
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "For the sake of web security, symlinks are disabled by default. If you want to access these symlinks files, you can turn this option on."
                                    )}
                                    label={t("Is Symlinks accessible?")}
                                  >
                                    <GFormSwitch
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        console.log("switch now", val);
                                        config["USE_SYMLINKS"] = !config[
                                          "USE_SYMLINKS"
                                        ]
                                          ? true
                                          : false;
                                        PUtils.commonSave();
                                      }}
                                      value={
                                        config["USE_SYMLINKS"] == true
                                          ? "true"
                                          : "false"
                                      }
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "If the ETAG header is enabled, then the Last-Modified header value will be overwrote."
                                    )}
                                    label={t("Using ETAG Mode?")}
                                  >
                                    <GFormSwitch
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        console.log("switch now", val);
                                        config["USE_ETAG"] = !config["USE_ETAG"]
                                          ? true
                                          : false;
                                        PUtils.commonSave();
                                      }}
                                      value={
                                        config["USE_ETAG"] == true
                                          ? "true"
                                          : "false"
                                      }
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "Once this option is set to true, if there's a sole in a particular directory and the visitor is trying to access the directory, then CodeGen will return that single file as response directly."
                                    )}
                                    label={t("Render Single File?")}
                                  >
                                    <GFormSwitch
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        console.log("switch now", val);
                                        config["RENDER_SIGNLE_FILE"] = !config[
                                          "RENDER_SIGNLE_FILE"
                                        ]
                                          ? true
                                          : false;
                                        PUtils.commonSave();
                                      }}
                                      value={
                                        config["RENDER_SIGNLE_FILE"] == true
                                          ? "true"
                                          : "false"
                                      }
                                    />
                                  </FormGroup>,
                                ].filter((x) => !_.isNil(x));
                              }, jsx_common_arg)
                            ),
                          },
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      });
                    })
                  ),
                  btm: React.createElement(
                    observer((props) => {
                      let refresh_key =
                        lc_20.refresh_ref +
                        "_w_" +
                        JSON.stringify(lc_20.status);
                      // btm jsx
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "gserver_btm_tab",
                        list: [
                          {
                            label: t(`Preview`),
                            id: "preview",
                            jsx: observer((props) => {
                              return PUtils.jsx.leftRightSpliter({
                                resizekey: "static_preview_btm",
                                leftClz: "no-x-scroll",
                                percent: 0.7,
                                percentRightWidth: "320px",
                                left: (
                                  <div
                                    key={refresh_key}
                                    style={{ width: "100%", height: "100%" }}
                                  >
                                    {lc_20.status.done ? (
                                      <div style={{ padding: "8px" }}>
                                        {t(`Service is not running.`)}
                                      </div>
                                    ) : (
                                      PUtils.jsx.createPanelWithBtnControls({
                                        controls: () => [
                                          {
                                            text: t(`Pick Address`),
                                            intent: "primary",
                                            loading_id: "btn_pick_address",
                                            onClick: async (e) => {
                                              console.log(
                                                `pick_address`,
                                                e,
                                                lc_20.net_card_listing,
                                                lc_20
                                              );
                                              try {
                                                ContextMenu.show(
                                                  React.createElement(
                                                    observer(() => {
                                                      return (
                                                        <Menu>
                                                          <MenuDivider
                                                            title={t(
                                                              `Network Interfaces`
                                                            )}
                                                          />

                                                          {_.map(
                                                            lc_20.net_card_listing,
                                                            (x, d, n) => {
                                                              console.log(
                                                                `pick_address_each`,
                                                                x,
                                                                d,
                                                                n
                                                              );
                                                              let is_crt =
                                                                x.value ==
                                                                lc_20
                                                                  .crt_network
                                                                  .value;
                                                              return (
                                                                <MenuItem
                                                                  key={x.value}
                                                                  onClick={(
                                                                    e
                                                                  ) => {
                                                                    gutils.stop_e(
                                                                      e
                                                                    );
                                                                    // console.log(
                                                                    //   "files"
                                                                    // );
                                                                    lc_20.crt_network =
                                                                      x;
                                                                  }}
                                                                  icon={`document`}
                                                                  active={
                                                                    is_crt
                                                                  }
                                                                  text={
                                                                    x.label +
                                                                    `(${x.value})` +
                                                                    (is_crt
                                                                      ? `*`
                                                                      : "")
                                                                  }
                                                                ></MenuItem>
                                                              );
                                                            }
                                                          )}
                                                        </Menu>
                                                      );
                                                    })
                                                  ),
                                                  {
                                                    left: e.clientX,
                                                    top: e.clientY,
                                                  },
                                                  () => {}
                                                );
                                              } catch (e) {
                                                console.log(
                                                  "pick_address_err",
                                                  e
                                                );
                                                await gutils.win_alert(
                                                  `error now`
                                                );
                                              }

                                              console.log(
                                                `pick_address_after`,
                                                e
                                              );
                                            },
                                          },
                                          {
                                            text: t(`Open Link`),
                                            intent: "none",
                                            loading_id: "keep_on_this",
                                            onClick: async () => {
                                              window.open(fn_get_crt_link());
                                            },
                                          },
                                          {
                                            text: t(`Copy Link`),
                                            intent: "none",
                                            loading_id: "copy_link_btn",
                                            onClick: async () => {
                                              gutils.copy(
                                                fn_get_crt_link({
                                                  need_sub_link: true,
                                                })
                                              );
                                              gutils.alertOk(`Copied`);
                                            },
                                          },
                                        ],
                                        rightControls: () => [
                                          {
                                            jsx_mode: true,
                                            cpt: (
                                              <div
                                                className="beflex"
                                                style={{ alignItems: "center" }}
                                              >
                                                <GEditableText
                                                  text={fn_get_crt_link({
                                                    need_sub_link: false,
                                                  })}
                                                  no_hover_link={true}
                                                ></GEditableText>
                                                <GEditableText
                                                  style={{
                                                    width: "auto",
                                                  }}
                                                  text={lc_20.user_config.link}
                                                  onChange={async (val) => {
                                                    lc_20.user_config.link =
                                                      val;
                                                  }}
                                                ></GEditableText>
                                              </div>
                                            ),
                                          },
                                        ],
                                        body: (
                                          <div className="w100 h100">
                                            <iframe
                                              src={fn_get_crt_link()}
                                              frameBorder={0}
                                              style={{
                                                outline: "none",
                                                border: "none",
                                              }}
                                              width={"100%"}
                                              height={"98%"}
                                            />
                                          </div>
                                        ),
                                      })
                                    )}
                                  </div>
                                ),
                                right: (
                                  <div key={refresh_key} className="w100 h100">
                                    {PUtils.jsx.panelWithTitle({
                                      title: `QR Code for URL Link`,
                                      jsx: (
                                        <div
                                          key={refresh_key}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        >
                                          <FormQrCodeViewer
                                            gref={gref}
                                            enable={!lc_20.status.done}
                                            url={fn_get_crt_link({
                                              need_sub_link: true,
                                            })}
                                          />
                                        </div>
                                      ),
                                    })}
                                  </div>
                                ),
                              });
                            }),
                          },
                          {
                            label: t(`Loggings`),
                            id: `loggings`,
                            jsx: observer((props) => {
                              let file_id = PUtils.crtModel.config.SERVER_UID;
                              return (
                                <FormViewLoggings
                                  key={refresh_key}
                                  mode="term"
                                  gref={gref}
                                  store={lc_20}
                                  file_id={file_id}
                                />
                              );
                            }),
                          },
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      });
                    })
                  ),
                })}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
