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

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Sync My Files";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    initialState: async () => {
      let fn_addModel_crt = () => {
        return {
          //
        };
      };
      return {
        sync_tasks: [],
        addModel: fn_addModel_crt(),
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.get_1st_systemTools(),
        children: [
          {
            ...fn_otherPages.menu.get_2rd_fileTools(),
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
          let isNotRunning = !run_task_utils.isRunning(runInfo, "FileSync");
          window.runInfo____0 = runInfo;
          return PUtils.jsx.createPanelWithBtnControls({
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              !isNotRunning
                ? {
                    text: t(`Sync Now`),
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
                    loading: run_task_utils.isEmpty(runInfo, "FileSync"),
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
                    loading: run_task_utils.isEmpty(runInfo, "FileSync"),
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
                    prop: "FileSync",
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
                                      label: t(`Sync`),
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
                                  `With the help of this extension, the user can be able to synchronize directories or files according to the Cron planning and other related simple configurations. CodeGen will accomplish these sync tasks smartly, it will copy files according to the last modified time and file size, in addition, you can specify COPY mode to achieve different needs.`
                                )}
                                onChg={() => {
                                  //
                                }}
                                previewRecord={async (obj) => {
                                  window.obj00123 = obj;
                                  let a1 = t(`Cron Expression Cannot Be Empty`);
                                  let a2 = t(
                                    `Invalid Cron Expression, Please check the formatting firstly.`
                                  );
                                  if (cutils.cond_emptyStr(obj.cron_expr)) {
                                    return a1;
                                  } else if (
                                    await cutils.cond_isCronInvalid_async(
                                      obj.cron_expr
                                    )
                                  ) {
                                    return a2;
                                  }
                                  let anyFailed = null;
                                  [
                                    {
                                      prop: "from_path",
                                      empty: t(
                                        `From Path cannot be empty, you must specify at least one item.`
                                      ),
                                    },
                                    {
                                      prop: "to_path",
                                      empty: t(
                                        `Destination Path cannot be empty, you must specify at least one item.`
                                      ),
                                    },
                                  ].forEach((x, d, n) => {
                                    let resultValue = obj[x.prop].filter(
                                      (x) => x.record_type === "stored"
                                    );
                                    if (_.isEmpty(resultValue)) {
                                      anyFailed = x.empty;
                                    }
                                  });
                                  if (anyFailed) {
                                    return anyFailed;
                                  }
                                }}
                                showFormDescAsBelow={true}
                                alertFormType={true}
                                obj={crtModel}
                                index={"sync_tasks"}
                                column={[
                                  {
                                    label: t(`Task Name`),
                                    f_desc: t(
                                      `Please help to provide its name so as to let CodeGen be able to name this task.`
                                    ),
                                    ph: `${t(`Copy Config Task`)}`,
                                    tag: GFormInput,
                                    prop: "name",
                                  },
                                  {
                                    label: t(`From Path`),
                                    prop: "from_path",
                                    show_preview_list_field_name: "filepath",
                                    show_preview_opt_type: "openfile",
                                    f_desc: t(
                                      `CodeGen will copy the file or directory you specified, and you can specify multiple source file paths.`
                                    ),
                                    // alert mode
                                    ...obj_common_file_or_dir(),
                                    defaultValue: [],
                                    ph: t(`Source Files or Directories`),
                                  },
                                  {
                                    label: t(`To Path`),
                                    prop: "to_path",
                                    ...obj_common_file_or_dir(),
                                    show_preview_list_field_name: "filepath",
                                    show_preview_opt_type: "openfile",
                                    ph: t(`Destination Files or Directories`),
                                    defaultValue: [],
                                    f_desc: t(
                                      `You can select multiple destination file paths, its type can be directories or files.`
                                    ),
                                  },
                                  {
                                    label: t(`Cron Expr`),
                                    prop: "cron_expr",
                                    tag: FormCronSelector,
                                    form_type: "cron_viewer",
                                    f_desc: t(
                                      `By Default, CodeGen will sync these files per 20 minutes, Cron expression supports specifying seconds mode. Yet, note that the more frequent synchronizations, the higher CPU usage will surge accordingly.`
                                    ),
                                    defaultValue: "0 1/20 * * * * *",
                                  },
                                  {
                                    label: t(`Copy Mode`),
                                    prop: "copy_mode",
                                    f_desc: t(
                                      `Though the user will probably synchronize these files without any delete operation, too often, however, there are other copy modes are required. You can use this option to synchronize these files in the way you would prefer.`
                                    ),
                                    tag: GSyncSelectWithFilter,
                                    defaultValue: "copying_files_simply",
                                    tagProps: {
                                      list: [
                                        {
                                          label: t("Copy Modified Files Only"),
                                          value: "copying_files_simply",
                                          desc_label: t(
                                            `CodeGen will copy modified files only to destination files, the index will be its {0} and {1}`,
                                            "LastModified",
                                            "Size"
                                          ),
                                        },
                                        {
                                          label: t(
                                            "Copy Files Regardingless of Status"
                                          ),
                                          value:
                                            "copying_files_regardingless_status",
                                          desc_label: t(
                                            `CodeGen will copy files to the destination forcibly regardless of their status`
                                          ),
                                        },
                                        {
                                          label: t("Do NOT Overwrite"),
                                          value: "do_not_overwrite",
                                          desc_label: t(
                                            `Using this option then CodeGen will skip overwriting existing files.`
                                          ),
                                        },
                                        {
                                          label: t("Atomic Move Files"),
                                          value: "atomic_move_files",
                                          desc_label: t(
                                            `Using this option then CodeGen will move files instead of copying files`
                                          ),
                                        },
                                        {
                                          label: t(
                                            "Clean Destination Before Copying files"
                                          ),
                                          value: "clean_dest_before_copying",
                                          desc_label: t(
                                            `CodeGen will delete destination files before it start copying`
                                          ),
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    c_skip: true,
                                    label: t(
                                      `Ignore Files or Directories(Optional Field)`
                                    ),
                                    defaultValue: [],
                                    prop: "ignore_files",
                                    show_preview_list_field_name: "filename",
                                    ...obj_common_file_or_dir(),
                                    ph: t(`Destination Files or Directories`),
                                    defaultValue: [],
                                    f_desc: t(
                                      `If you'd like to ignore some files or directories, you can specify the list here, for instance, {0}. besides, you can use RegExp to fuzzy match its filename with your keyword.`,
                                      `node_modules, .idea, dist, target`
                                    ),
                                    tag: FormCrudIgnoreFileTable,
                                    tagProps: {
                                      fixedWidth: true,
                                      previewRecord(crtRow) {
                                        if (_.isEmpty(crtRow.filename)) {
                                          return t(
                                            `The file name cannot be empty.`
                                          );
                                        }
                                      },
                                      onChg: () => {
                                        //
                                      },
                                      column: [
                                        {
                                          maxWidth: "350px",
                                          label: t(`File Name(RegExp Matcher)`),
                                          prop: "filename",
                                          placeholder: "node_modules",
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    label: t(`Interval`),
                                    f_desc: t(
                                      `By default, CodeGen will not have an interval among copying files, but you can also specify the value here if you’d like to have an interval after copying a file. Please note that it will be time-consuming if you specify too long an interval value.`
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
                                    prop: "delayAfterCopyingAFile",
                                  },
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
