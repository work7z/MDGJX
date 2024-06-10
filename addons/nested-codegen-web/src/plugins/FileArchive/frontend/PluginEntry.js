const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  GFormSwitch,
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
let appTitle = "Archive My Files";

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
            ...fn_otherPages.menu.get_2rd_backupTools(),
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
          let isNotRunning = !run_task_utils.isRunning(runInfo, "FileArchive");
          window.runInfo____0 = runInfo;
          return PUtils.jsx.createPanelWithBtnControls({
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              !isNotRunning
                ? {
                    text: t(`Archive Now`),
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
                    loading: run_task_utils.isEmpty(runInfo, "FileArchive"),
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
                    loading: run_task_utils.isEmpty(runInfo, "FileArchive"),
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
                    prop: "FileArchive",
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
                        let obj_common_file_or_dir = (marg = {}) => {
                          return {
                            tag: FormCrudTable,
                            tagProps: {
                              fixedWidth: true,
                              previewRecord: async (crtRow) => {
                                if (_.isEmpty(crtRow.filepath)) {
                                  return t(`The file path cannot be empty.`);
                                }
                                if ((marg || {}).dirOnly) {
                                  let a = await gref.optAPI(`fn_file_status`, {
                                    filepath: crtRow.filepath,
                                  });
                                  let is_file = _.get(a, "data.is_file");
                                  if (is_file) {
                                    return t(
                                      `You cannot specify a file type into this record due to the limitation, please specify a directory instead of it.`
                                    );
                                  }
                                }
                              },
                              onChg: () => {
                                //
                              },
                              column: [
                                {
                                  maxWidth: "350px",
                                  label: (marg || {}).dirOnly
                                    ? t(`Directories`)
                                    : t(`Files or Directories`),
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
                                      label: t(`Archive`),
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
                                  `With the help of this extension, the user can be able to back up their files to the destination regularly according to the time schedule and other related simple configurations. Too often, insomuch as there probably will be some long-time backup needs within the daily development, if you'd like to rollback to historical revision or find any deleted file, you can find the archive file to reinstate it, hence we are strongly convinced that this extension can reduce the losses in the large extent. Besides, you can also specify the advanced configuration, for instance, archive maximum files, archive file name, and other options.`
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
                                  if (gutils.empty(obj["name"])) {
                                    return t(`Task name cannot be empty.`);
                                  }
                                  if (
                                    gutils.empty(obj["file_name_formatting"])
                                  ) {
                                    return t(
                                      "File name formatting cannot be empty."
                                    );
                                  }
                                  if (
                                    obj["file_name_formatting"].indexOf(".") !=
                                    -1
                                  ) {
                                    return t(
                                      `File name formatting cannot contain dot character, please modify its value firstly`
                                    );
                                  }
                                  if (
                                    !(
                                      parseInt(obj["maximum_archive_files"]) >=
                                      1
                                    )
                                  ) {
                                    return t(
                                      `The size of maximum archive files cannot be empty, you should provide a value that is greater than or as same as 1.`
                                    );
                                  }
                                  if (gutils.empty(obj["meta_file_name"])) {
                                    return t(`Meta directory cannot be empty.`);
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
                                    ph: `${t(`Backup My Project`)}`,
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
                                    ...obj_common_file_or_dir({
                                      dirOnly: true,
                                    }),
                                    show_preview_list_field_name: "filepath",
                                    show_preview_opt_type: "openfile",
                                    ph: t(`Destination Directories`),
                                    defaultValue: [],
                                    f_desc: t(
                                      `You can select multiple destination directories, its type can be directories only. If the directory you provided does not exist, then CodeGen will help to create.`
                                    ),
                                  },
                                  {
                                    label: t(`File Name Formatting`),
                                    prop: "file_name_formatting",
                                    ph: t(
                                      `For instance, {0}, {1}, {3} or {2}`,
                                      "backup_{yyyy-MM-dd}",
                                      "backup_{SEQUENCEID}",
                                      "backup_{TIMESTAMP}",
                                      "backup-{yyyyMMddHHmmss}"
                                    ),
                                    defaultValue: "backup_{SEQUENCEID}",
                                    tag: GFormInput,
                                    f_desc: t(
                                      `By Default, CodeGen will use the task name as its file name and take the latest index value from the cyclic counter as its affix. You can customize your own file name rule, for instance, {0}, {1}, {3}, or {2}`,
                                      "backup_{yyyy-MM-dd}",
                                      "backup_{SEQUENCEID}",
                                      "backup_{TIMESTAMP}",
                                      "backup-{yyyyMMddHHmmss}"
                                    ),
                                  },
                                  {
                                    label: t(`Clash Resolution`),
                                    prop: "clash_resolution",
                                    f_desc: t(
                                      `By Default, CodeGen will use a greater integer value as its provisional file name if there's a file name already being created, namely the clash situation. If you prefer to overwrite the existing file, you can select the other rule in this form controls.`
                                    ),
                                    tag: GSyncSelectWithFilter,
                                    defaultValue: "int_solution",
                                    tagProps: {
                                      list: [
                                        {
                                          label: t("Cyclic Counter"),
                                          value: "int_solution",
                                          desc_label: t(
                                            `Extending a new file name by a greater integer value.`
                                          ),
                                        },
                                        {
                                          label: t(
                                            "Overwrite the file directly"
                                          ),
                                          value: "overwrite",
                                          desc_label: t(
                                            `If there's a file existed already, then CodeGen will overwrite it directly`
                                          ),
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    label: t(`Cron Expr`),
                                    prop: "cron_expr",
                                    tag: FormCronSelector,
                                    form_type: "cron_viewer",
                                    f_desc: t(
                                      `By Default, CodeGen will backup these files per 1 hour, cron expression supports specifying seconds mode. Yet, note that the more frequent synchronizations, the higher CPU usage will surge accordingly.`
                                    ),
                                    defaultValue: "0 1 1/1 * * * *",
                                  },
                                  // encode
                                  // withSrcDir
                                  {
                                    label: t(`Reserved Source Directory`),
                                    prop: "withSrcDir",
                                    defaultValue: true,
                                    c_skip: true,
                                    f_desc: t(
                                      `By Default, CodeGen will use the absolute file paths of these files in the compression process, if you prefer to shorten its file path, you can turn it off here.`
                                    ),
                                    tag: GFormSwitch,
                                    tagProps: {
                                      valtype: "tf",
                                    },
                                  },
                                  {
                                    label: t(`Charset`),
                                    c_skip: true,
                                    prop: "charset",
                                    c_skip: true,
                                    f_desc: t(
                                      `If you encounter any encode or decode error, you can try to adjust this option and try it again.`
                                    ),
                                    tag: GSyncSelectWithFilter,
                                    defaultValue: "UTF-8",
                                    tagProps: {
                                      list: gstore.common_app
                                        .model_charset_listings,
                                    },
                                  },
                                  {
                                    label: t(`Archive Compression Type`),
                                    c_skip: true,
                                    prop: "archive_compression_type",
                                    f_desc: t(
                                      `Currently, CodeGen will archive files by using {0} formatting`,
                                      "zip"
                                    ),
                                    tag: GSyncSelectWithFilter,
                                    defaultValue: "zip",
                                    tagProps: {
                                      list: [
                                        {
                                          label: t("{0} Compression", "ZIP"),
                                          value: "zip",
                                          desc_label: t(
                                            `{0} compression type`,
                                            "zip"
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
                                      onChg: () => {},
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
                                    label: t(`Maximum Archive Files`),
                                    f_desc: t(
                                      `By Default, CodeGen will keep the latest {0} archive files for each task in fear of lossing any recent historical changes. Please be noted that the greater the daily archive number you specified, the more disk space will be taken up.`,
                                      24
                                    ),
                                    ph: `${t(
                                      `20 means the latest 20 archive files`
                                    )}`,
                                    c_skip: true,
                                    defaultValue: 24,
                                    tag: GFormInput,
                                    tagProps: {
                                      type: "number",
                                    },
                                    prop: "maximum_archive_files",
                                  },
                                  {
                                    label: t(
                                      `Long-time Archive Files Strategy`
                                    ),
                                    c_skip: true,
                                    f_desc: t(
                                      `By Default, CodeGen will remain historical daily files while cleaning the old archive files.`
                                    ),
                                    prop: "long_time_archives_strategy",
                                    tag: GSyncSelectWithFilter,
                                    defaultValue: "remain_7",
                                    tagProps: {
                                      list: [
                                        {
                                          label: t(`Disable this feature`),
                                          value: "disable",
                                          desc_label: t(
                                            `CodeGen will not keep recent daily latest files if you select this option`
                                          ),
                                        },
                                        ...[3, 7, 15, 30, 60, 120, 365].map(
                                          (x, d, n) => {
                                            return {
                                              label: t(
                                                `Remain recent {0} daily archives`,
                                                x
                                              ),
                                              value: "remain_" + x,
                                              desc_label: t(
                                                `It means that you will have {0} files that belong to recent {0} days separately.`,
                                                x
                                              ),
                                            };
                                          }
                                        ),
                                      ],
                                    },
                                  },
                                  {
                                    label: t(`Meta Directory`),
                                    f_desc: t(
                                      `To manage these archives elegantly, CodeGen will create a directory to store its present status and information. If you don't like this directory name, you can feel free to specify your own name, besides, please be noted that an absolute file path is disallowed here.`
                                    ),
                                    ph: `${t(`For instance, {0}`, "meta")}`,
                                    c_skip: true,
                                    defaultValue: "meta",
                                    tag: GFormInput,
                                    tagProps: {},
                                    prop: "meta_file_name",
                                  },
                                  {
                                    label: t(`Interval`),
                                    f_desc: t(
                                      `By default, CodeGen will not have an interval among copying files, but you can also specify the value here if you’d like to have an interval after adding a file. Please note that it will be time-consuming if you specify too long an interval value.`
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
