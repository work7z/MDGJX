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
  GSyncSelectWithFilter,
  GFormInput,
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
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import FormCronSelector from "../../TranslateForJSON/frontend/cpt/FormCronSelector";
import FormCrudIgnoreFileTable from "../../TranslateForJSON/frontend/cpt/FormCrudIgnoreFileTable";
import run_task_utils from "../../TranslateForJSON/frontend/kit/run_task_utils";
import view_logs_task_utils from "../../../web/pages/latest/routes/RunningTaskWrapper/view_logs_task";
import PCScriptEditor from "../../TranslateForJSON/frontend/cpt/PCScriptEditor";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Command Scheduler";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: !gutils.dev(),
    // willReadyVersion: `v1.8.2`,
    initialState: async () => {
      return {
        myvalue: 12345,
        decode_obj: {},
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.get_1st_systemTools(),
        children: [
          {
            ...fn_otherPages.menu.get_2rd_cmdTools(),
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
        totalTitle: appTitle,
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let runInfo = PUtils.getServiceRunInfo({
            PreRequisiteJson,
          });
          let isNotRunning = !run_task_utils.isRunning(
            runInfo,
            "ROOT_EXTENSION_ADDONS"
          );
          window.runInfo____0 = runInfo;
          return PUtils.jsx.createPanelWithBtnControls({
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              !isNotRunning
                ? {
                    text: t(`Run Now`),
                    intent: "primary",
                    loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn3",
                    onClick: async () => {
                      await gref.optAPI(`syncfiles`);
                      gutils.alertOk("Triggered. It will be executed soon.");
                    },
                  }
                : null,
              isNotRunning
                ? {
                    text: t(`Start Tasks`),
                    intent: "primary",
                    // minimal: true,
                    // outlined: true,
                    loading: run_task_utils.isEmpty(
                      runInfo,
                      "ROOT_EXTENSION_ADDONS"
                    ),
                    loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn4",
                    onClick: async () => {
                      await runInfo._startAll();
                    },
                  }
                : {
                    text: t(`Stop Tasks`),
                    intent: "danger",
                    // minimal: true,
                    // outlined: true,
                    loading: run_task_utils.isEmpty(
                      runInfo,
                      "ROOT_EXTENSION_ADDONS"
                    ),
                    loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn1",
                    onClick: async () => {
                      await runInfo._stopAll();
                    },
                  },
              {
                text: t(`Refresh`),
                intent: "none",
                minimal: true,
                outlined: true,
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn5",
                onClick: async () => {
                  await runInfo._refresh();
                  gutils.alertOk("Refreshed.");
                },
              },
            ].filter((x) => !_.isNil(x)),
            rightControls: [
              {
                text: t(`View Logs`),
                minimal: true,
                outlined: true,
                intent: "none",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  view_logs_task_utils.fn_logDynamic({
                    prop: "ROOT_EXTENSION_ADDONS",
                  });
                },
              },
            ],
            body: React.createElement(
              observer((props) => {
                PUtils.makeLeftHide();
                PUtils.makeOnlyOneOptions();
                let { crtModel } = PUtils;
                return PUtils.jsx.tabWithDefinition({
                  default_select_tab: "str",
                  key: "ROOT_EXTENSION_ADDONS_console",
                  list: [
                    {
                      label: t(`Overview`),
                      jsx: observer((props) => {
                        let obj_common_file_or_dir = () => {
                          return {
                            tag: FormCrudTable,
                            tagProps: {
                              fixedWidth: true,
                              previewRecord(crtRow) {
                                if (_.isEmpty(crtRow.filepath)) {
                                  return t(`The file path cannot be empty.`);
                                }
                              },
                              onChg: () => {
                                //
                              },
                              column: [
                                {
                                  maxWidth: "350px",
                                  label: t(`Files or Directories`),
                                  prop: "filepath",
                                  fn_type: "dir",
                                  placeholder: cutils.getPhForDisk(),
                                },
                              ],
                            },
                          };
                        };
                        return (
                          <div
                            style={{ overflow: "auto", width: "100%" }}
                            className="pt-10"
                          >
                            <p>
                              <FormCrudTable
                                fn_eachRowExtraActions={(eachRow) => {
                                  return [
                                    {
                                      label: t(`Run`),
                                      onClick: async () => {
                                        gutils.alert(
                                          `CodeGen is working on it, moments please`
                                        );
                                        await gref.optAPI(`synconefile`, {
                                          id: eachRow.id,
                                        });
                                        gutils.alertOk(
                                          "Triggered. It will be executed soon."
                                        );
                                      },
                                    },
                                  ];
                                }}
                                provideEnableDisable={true}
                                furtherSearch={true}
                                askBeforeRemove={true}
                                fixedWidth={true}
                                PUtils={PUtils}
                                descConclusion={t(
                                  `By using this extension, the user has the ability to easily write and automatically execute batch shell scripts whatsoever he/she wants. Apart from this, he/she can check its running status via the log panel provided by CodeGen.`
                                )}
                                onChg={() => {
                                  //
                                }}
                                previewRecord={async (obj) => {
                                  let anyFailed = null;
                                  [
                                    {
                                      prop: "script_content",
                                      empty: t(
                                        `The content of script cannot be empty.`
                                      ),
                                    },
                                    {
                                      prop: "name",
                                      empty: t(`Name cannot be empty.`),
                                    },
                                  ].forEach((x, d, n) => {
                                    if (gutils.empty(obj[x.prop])) {
                                      anyFailed = x.empty;
                                    }
                                  });
                                  if (!_.isNil(anyFailed)) {
                                    return anyFailed;
                                  }
                                  let { exec_file_path } = obj;
                                  let m103 = t(
                                    `Exectuion File Path isn't exist, please check it.`
                                  );
                                  if (!gutils.empty(exec_file_path)) {
                                    if (
                                      !(await cutils.has_that_file(
                                        exec_file_path
                                      ))
                                    ) {
                                      return m103;
                                    }
                                  }

                                  let { execution_strategy } = obj;
                                  let a1 = t(`Cron Expression Cannot Be Empty`);
                                  let a2 = t(
                                    `Invalid Cron Expression, Please check the formatting firstly.`
                                  );
                                  let a3 = t(
                                    `Exectuion Strategy cannot be empty.`
                                  );
                                  if (gutils.empty(execution_strategy)) {
                                    return a3;
                                  }
                                  if (
                                    execution_strategy == "run_it_with_cron"
                                  ) {
                                    if (
                                      await cutils.cond_isCronInvalid_async(
                                        obj.cron_expr
                                      )
                                    ) {
                                      return a2;
                                    }
                                  }
                                }}
                                showFormDescAsBelow={true}
                                alertFormType={true}
                                obj={crtModel}
                                index={"sync_tasks"}
                                column={[
                                  {
                                    label: t(`Script Name`),
                                    f_desc: t(
                                      `Please help to provide its name so as to let CodeGen be able to name this task.`
                                    ),
                                    ph: `${t(`Run My Batch Job`)}`,
                                    tag: GFormInput,
                                    prop: "name",
                                  },
                                  {
                                    label: t(`Remarks`),
                                    f_desc: t(
                                      `Though it's a optional field, you can also provide some remarks for its purposes or something else.`
                                    ),
                                    ph: `${t(
                                      `It's created for my batch job.`
                                    )}`,
                                    c_skip: true,
                                    tag: GFormInput,
                                    prop: "remarks",
                                  },
                                  {
                                    label: t(`Script Content`),
                                    needModel: true,
                                    f_desc: t(
                                      `By default, the script engine depends on the platform type whose CodeGen is running on, for instance, Windows OS uses {0}, and Unix-like OS uses {1}. But if you would like other script engines, such as {2}, {3}, etc.. You can specify its executable file path in the field below.`,
                                      "Bat",
                                      "Bash/Sh",
                                      "zsh",
                                      "git-bash"
                                    ),
                                    ph: `${t(
                                      `For instance, you input {0} means 3 seconds`,
                                      "3000"
                                    )}`,
                                    c_skip: true,
                                    // defaultValue: {},
                                    // 'echo "hello, world"'
                                    tag: PCScriptEditor,
                                    tagProps: {
                                      editorPropName: "script_content",
                                      initScriptContent: 'echo "hello, world"',
                                      PUtils: PUtils,
                                      gref: gref,
                                    },
                                  },
                                  {
                                    label: t(`Execution Strategy`),
                                    prop: "execution_strategy",
                                    f_desc: t(
                                      `This field will decide how the script will be executed, either run it once or run it regularly`
                                    ),
                                    tag: GSyncSelectWithFilter,
                                    defaultValue: "run_it_once_only",
                                    tagProps: {
                                      list: [
                                        {
                                          label: t("Run it Once Only"),
                                          value: "run_it_once_only",
                                          desc_label: t(
                                            "By Default, CodeGen will run the script once only. If you need to run it reguarly, please select other option in this controls."
                                          ),
                                        },
                                        {
                                          label: t(
                                            "Run it with {0} scheduler",
                                            "Cron"
                                          ),
                                          value: "run_it_with_cron",
                                          desc_label: t(
                                            `If you select this option as your choice, please then specify a {0} definition as its running arrangement.`,
                                            "Cron"
                                          ),
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    fn_show_when: (x) => {
                                      return (
                                        x["execution_strategy"] ==
                                        "run_it_with_cron"
                                      );
                                    },
                                    c_skip: true,
                                    label: t(`Cron Expr`),
                                    prop: "cron_expr",
                                    tag: FormCronSelector,
                                    form_type: "cron_viewer",
                                    f_desc: t(
                                      `By Default, CodeGen will sync these files per 20 minutes, Cron expression supports specifying seconds mode. Yet, note that the more frequent executions, the higher CPU usage will surge accordingly as well.`
                                    ),
                                    defaultValue: "0 1/20 * * * * *",
                                  },
                                  // {
                                  //   label: t(
                                  //     `Exectuable File Path for Commands(Optional)`
                                  //   ),
                                  //   fn_show_when: () => {
                                  //     return !cutils.isServerWindows();
                                  //   },
                                  //   f_desc: t(
                                  //     `Please be noted that it's an optional field, you can ignore this field if you don't need to specify your preferred script engine.`
                                  //   ),
                                  //   ph: `${t(`For instance, {0}`, "/bin/zsh")}`,
                                  //   c_skip: true,
                                  //   defaultValue: "",
                                  //   tag: GFormInput,
                                  //   tagProps: {},
                                  //   prop: "exec_file_path",
                                  // },
                                  {
                                    label: t(`Sleep Before Running`),
                                    f_desc: t(
                                      `By default, CodeGen will run this script immediately, but if you need to sleep for a while before running, you can provide a numeric value here.`
                                    ),
                                    ph: `${t(
                                      `For instance, you input {0} means 3 seconds`,
                                      "3000"
                                    )}`,
                                    c_skip: true,
                                    defaultValue: 0,
                                    tag: GFormInput,
                                    tagProps: {
                                      type: "number",
                                    },
                                    prop: "sleep_before_running",
                                  },
                                  // {
                                  //   label: t(`Exectuion Timing`),
                                  //   prop: "execution_timing",
                                  //   f_desc: t(
                                  //     `By Default, CodeGen will execute this command immediately, yet, if you want to trigger it manually, you can turn it off.`
                                  //   ),
                                  //   tag: GSyncSelectWithFilter,
                                  //   defaultValue: "run_it_immediately",
                                  //   tagProps: {
                                  //     list: [
                                  //       {
                                  //         label: t("Run it Immediately"),
                                  //         value: "run_it_immediately",
                                  //         desc_label: t(
                                  //           "When the global scheudler is being launched, this task will be triggered automatically."
                                  //         ),
                                  //       },
                                  //       {
                                  //         label: t("Run it Manually"),
                                  //         value: "run_it_manually",
                                  //         desc_label: t(
                                  //           "This task will not be triggered unless you trigger it manually."
                                  //         ),
                                  //       },
                                  //     ],
                                  //   },
                                  // },
                                  {
                                    label: t(`Status`),
                                    // prop: isNotRunning ? "" : "recordStatus",
                                    propFn: (a, b, c) => {
                                      if (isNotRunning) {
                                        return "";
                                      }
                                      return _.get(c, [
                                        "table_" + a.id,
                                        "recordStatus",
                                      ]);
                                    },
                                    f_skip: true,
                                  },
                                  {
                                    label: t(`Message`),
                                    // prop: isNotRunning ? "" : "recordMessage",
                                    propFn: (a, b, c) => {
                                      if (isNotRunning) {
                                        return "";
                                      }
                                      if (a.record_type == "disabled") {
                                        return t(`Disabled`);
                                      }
                                      if (a.record_type != "stored") {
                                        return `[${a.record_type}]`;
                                      }
                                      return _.get(c, [
                                        "table_" + a.id,
                                        "recordMessage",
                                      ]);
                                    },
                                    f_skip: true,
                                  },
                                ]}
                              ></FormCrudTable>
                            </p>
                          </div>
                        );
                      }),
                    },
                    // {
                    //   label: t(`Settings`),
                    //   jsx: observer((props) => {
                    //     return <div>settings</div>;
                    //   }),
                    // },
                    // {
                    //   label: t(`Logs`),
                    //   jsx: observer((props) => {
                    //     return <div>logs</div>;
                    //   }),
                    // },
                  ].map((x) => {
                    x.mode_jsx_func = true;
                    return x;
                  }),
                });
              })
            ),
          });
        }),
      })
    ),
  };
};
