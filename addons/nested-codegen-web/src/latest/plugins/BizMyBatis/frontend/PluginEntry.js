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
import mappingLogic from "./key";
import PluginConfigChooser from "../../TranslateForJSON/frontend/cpt/PluginConfigChooser";
import FormAjaxSelect from "../../TranslateForJSON/frontend/cpt/FormAjaxSelect";
import FormViewLoggings from "../../TranslateForJSON/frontend/cpt/FormViewLoggings";
import FormPlainTextLoggins from "../../TranslateForJSON/frontend/cpt/FormPlainTextLoggins";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import FileStepBrowser from "../../TranslateForJSON/frontend/cpt/FileStepBrowser";
import SimpleSelectAndFileViewer from "../../TranslateForJSON/frontend/cpt/SimpleSelectAndFileViewer";
import GFormInput2 from "../../SQLDrafts/frontend/Kit_GFormInput2";
import js_export_trigger from "../../../web/pages/latest/components/BeautifyCodeCommon/js_export_trigger";
const GFormInput = GFormInput2;

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "MyBatis Plus Advanced Generator";

let t_obj = {};
window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      let res_templates = await gref.optAPI(`get_mybatis_template_files`);
      let temp_dir = await gref.optAPI(`fn_common_get_temp_dir`);
      t_obj = res_templates.data.value.templates;
      return {
        crt_page_id: gutils.uuid(),
        loading_for_generate_or_preview: false,
        template_entity_java: t_obj["entity_java_ftl"],
        template_entity_kotlin: t_obj["entity_kt_ftl"],
        template_service: t_obj["service_java_ftl"],
        template_serviceimpl: t_obj["serviceImpl_java_ftl"],
        template_mapper: t_obj["mapper_java_ftl"],
        template_xml: t_obj["mapper_xml_ftl"],
        template_controller: t_obj["controller_java_ftl"],
        file_obj: {},
        fn_obj: {
          refresh_it: true,
          output_logs: "",
        },
        scope_type: "all",
        // other fields
        setting_for_mybatis: {
          author: "CodeGen_ToolBox",
          pkgFileInfoArr: [
            {
              filepath: _.get(temp_dir, "data.value"),
              record_type: "stored",
            },
          ],
          namingStrategyForEntityName: "underline_to_camel",
          namingStrategyForColumnName: "underline_to_camel",
          pkg_parent: "com.test.project",
          pkg_entity: "entity",
          pkg_service: "service",
          pkg_serviceimpl: "service.impl",
          pkg_mapper: "mapper",
          pkg_xml: "SYS_OUTPUT_DIR/mappers",
          pkg_controller: "controller",
          open_dir: "true",
          restControllerStyle: "true",
          versionFieldName: null,
          logicDeleteFieldName: null,
          entityTableFieldAnnotationEnable: "true",
          sql_drafts_config_id: null,
        },
      };
    },
    menus: [
      {
        pid: "gen",
        children: [
          {
            ...fn_otherPages.menu.getDAOLayerMenu(),
            children: [
              {
                label: `MyBatis Plus`,
                skipT: true,
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
        DLIB_ID: "ROOT_EXTENSION_ADDONS",
        gref,
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
          let fn_doGenerate = ({ task_mode }) => {
            return async () => {
              PUtils.crtModel.fn_obj.output_logs = "";
              PUtils.crtModel.loading_for_generate_or_preview = true;
              await gref.optAPI(`run_mybatis_task`, {
                task_mode: task_mode,
                ...PUtils.crtModel,
                fn_obj: {},
              });
              // PUtils.crtModel.loading_for_generate_or_preview = false;
            };
          };
          useEffect(() => {
            let a = PUtils.loop(async () => {
              try {
                let res_1 = await gref.optAPI(`query_mybatis_status`, {
                  crt_page_id: PUtils.crtModel.crt_page_id,
                });
                console.log("res_1", res_1);
                let value_1 = _.get(res_1, "data.value.value");
                let logs = _.get(value_1, "logs");
                if (
                  PUtils.crtModel.fn_obj.output_logs == "" ||
                  PUtils.crtModel.fn_obj.output_logs != logs
                ) {
                  if (
                    !PUtils.crtModel.loading_for_generate_or_preview ||
                    PUtils.crtModel.fn_obj.refresh_it
                  ) {
                    PUtils.crtModel.fn_obj.output_logs = logs;
                  }
                }
                if (PUtils.crtModel.loading_for_generate_or_preview) {
                  let isOK = _.get(value_1, "isOK");
                  let isError = _.get(value_1, "isError");
                  let isNotRunning = _.get(value_1, "isNotRunning");
                  if (isNotRunning) {
                    // PUtils.crtModel.loading_for_generate_or_preview = false;
                  } else {
                    if (isOK || isError) {
                      PUtils.crtModel.loading_for_generate_or_preview = false;
                      gutils.alert({
                        intent: isOK ? "success" : "danger",
                        message: isOK
                          ? t(`Completed the task successfully.`)
                          : t(`An Error Occurred while executing this task.`),
                      });
                    }
                  }
                }
              } catch (e) {
                console.log(e);
              }
            }, 1000);
            return () => {
              a();
            };
          }, []);
          PUtils.enableAutoSaveMode();
          let fn_createPreviewJSX = ({ type, lang = "java" }) => {
            return observer((props) => {
              return (
                <SimpleSelectAndFileViewer
                  PUtils={PUtils}
                  language={lang}
                  editor_key="own_value_entity"
                  fn_load_data={async () => {
                    let res = await gref.optAPI(
                      `query_mybatis_files_for_generated_only`,
                      {
                        file_type: type,
                        ...PUtils.crtModel,
                        fn_obj: {},
                      }
                    );
                    console.log("loaded data", res);
                    let list = _.get(res, "data.list");
                    return _.map(list, (x, d, n) => {
                      return {
                        ...x,
                        label: `${_.truncate(x.parentFileName, {
                          length: 10,
                        })}/${x.fileName}`,
                        value: x.filePath,
                      };
                    });
                  }}
                ></SimpleSelectAndFileViewer>
              );
            });
          };
          return PUtils.jsx.createPanelWithBtnControls({
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              {
                loading: PUtils.crtModel.loading_for_generate_or_preview,
                text: t(`Generate Result`),
                minimal: true,
                outlined: true,
                icon: "code",
                intent: "primary",
                onClick: fn_doGenerate({
                  task_mode: "g",
                }),
              },
              {
                loading: PUtils.crtModel.loading_for_generate_or_preview,
                text: t(`Export Result`),
                minimal: true,
                outlined: true,
                icon: "export",
                intent: "none",
                onClick: async () => {
                  js_export_trigger({
                    e: {
                      detail: 2,
                    },
                    filename: `mybatis-${Date.now()}.zip`,
                    fn_files_for_zip: async ({ zip }) => {
                      function hideAlertFnIfHas(name) {
                        try {
                          if (window.ALL_ALERT_INST[name]) {
                            window.ALL_ALERT_INST[name].clear();
                            window.ALL_ALERT_INST[name].dismiss();
                          }
                        } catch (e) {
                          console.log("e", e);
                        }
                      }
                      //
                      let tmpFolderPathObj = {};
                      let mybatis_using_name = "mybatis_using_name";
                      hideAlertFnIfHas(mybatis_using_name);
                      gutils.alert({
                        message: t(
                          `CodeGen is handling your request, please wait a moment.`
                        ),
                        usingName: mybatis_using_name,
                      });
                      let file_type_arr = [
                        "entity",
                        "service",
                        "mapper",
                        "controller",
                        "xml",
                      ];
                      let baseFolderWithMapping = [];
                      let anyFiles = 0;
                      for (let eachFileType of file_type_arr) {
                        hideAlertFnIfHas(mybatis_using_name);
                        gutils.alert({
                          message: t(
                            `Reading the file list for the type {0}`,
                            eachFileType
                          ),
                          usingName: mybatis_using_name,
                        });
                        let res = await gref.optAPI(
                          `query_mybatis_files_for_generated_only`,
                          {
                            // usingSelfParent: true,
                            file_type: eachFileType,
                            ...PUtils.crtModel,
                            fn_obj: {},
                          }
                        );
                        console.log("loaded data", res);
                        let list = _.get(res, "data.list");
                        let crtTypeList = _.map(list, (x, d, n) => {
                          return {
                            ...x,
                            label: `${_.truncate(x.parentFileName, {
                              length: 10,
                            })}/${x.fileName}`,
                            value: x.filePath,
                          };
                        });
                        // zip
                        //   .folder("META-INF")
                        //   .file("timestamp.txt", "" + Date.now());
                        for (let x of crtTypeList) {
                          // hideAlertFnIfHas(mybatis_using_name);
                          // gutils.alert({
                          //   message: t(`Reading file content: {0}`, x.fileName),
                          //   usingName: mybatis_using_name,
                          // });
                          let { content } = await gutils.opt("/dg/readfile/", {
                            PATH: x.filePath,
                          });
                          let folderPath = [
                            // x.realParentFileName,
                            // ("" + (x.filePath || ""))
                            //   .replace(x.parentPath, "")
                            //   .replaceAll(/\\/gi, "/") + "",
                            // eachFileType,
                            x.parentFileName,
                            eachFileType,
                          ].join("/");
                          console.log("folderPath", folderPath);
                          if (_.isNil(folderPath) || folderPath == "") {
                            folderPath = "DEFAULT";
                          }
                          let crtZipFolder = baseFolderWithMapping[folderPath];
                          if (_.isNil(crtZipFolder)) {
                            crtZipFolder = zip.folder(folderPath);
                            baseFolderWithMapping[folderPath] = crtZipFolder;
                          }
                          crtZipFolder.file(x.fileName, content);
                        }
                      }
                    },
                  });
                },
              },
              // {
              //   loading: PUtils.crtModel.loading_for_generate_or_preview,
              //   text: t(`Preview Result`),
              //   minimal: true,
              //   outlined: true,
              //   icon: "code",
              //   intent: "none",
              //   onClick: fn_doGenerate({
              //     task_mode: "p",
              //   }),
              // },
            ],
            rightControls: [
              PUtils.crtModel.loading_for_generate_or_preview
                ? {
                    text: PUtils.crtModel.fn_obj.refresh_it
                      ? t(`Pause Refresh`)
                      : t(`Resume Refresh`),
                    intent: PUtils.crtModel.fn_obj.refresh_it
                      ? "warning"
                      : "none",
                    // minimal: true,
                    // outlined: true,
                    onClick: async () => {
                      PUtils.crtModel.fn_obj.refresh_it =
                        !PUtils.crtModel.fn_obj.refresh_it;
                    },
                  }
                : null,
              !PUtils.crtModel.loading_for_generate_or_preview
                ? null
                : {
                    text: t(`Cancel the Task`),
                    intent: "danger",
                    // minimal: true,
                    // outlined: true,
                    onClick: async () => {
                      await gref.optAPI(`cancel_mybatis_task`, {
                        crt_page_id: PUtils.crtModel.crt_page_id,
                      });
                      PUtils.crtModel.loading_for_generate_or_preview = false;
                      gutils.alertOk(`Cancelled the task.`);
                    },
                  },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  // border: true,
                  percent: 0.4,
                  top: PUtils.jsx.panelWithTitle({
                    n_style: {
                      borderTop: "none",
                      overflowX: "hidden",
                    },
                    title: "Settings for MyBatis Generator",
                    jsx: React.createElement(
                      observer((props) => {
                        let fn_prefix_suffix_crud_table = ({
                          isPrefix,
                          exampleForInput,
                          index,
                        }) => {
                          let crt_obj = PUtils.crtModel.setting_for_mybatis;
                          let crt_idx = index;

                          return cutils.crud.list_regex_or_plain({
                            type: "plain_text",
                            crt_idx,
                            crt_obj,
                            exampleForInput,
                          });
                        };
                        return PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "ROOT_EXTENSION_ADDONS_console",
                          list: [
                            {
                              label: t(`DataSource`), // dataSource
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(
                                      () => [
                                        {
                                          label: t(`Database Config`),
                                          helperText: t(
                                            `Please select a database config you've defined in SQL Console before, and make sure that connection config is available to be established. If the listing is empty, please create it firstly.`
                                          ),
                                          tag: PluginConfigChooser,
                                          tagProps: {
                                            gref,
                                            PUtils: PUtils,
                                            extId: "SQLDrafts",
                                            obj: PUtils.crtModel
                                              .setting_for_mybatis,
                                            index: "sql_drafts_config_id",
                                          },
                                        },
                                        {
                                          label: t(`Type Conversion`),
                                          helperText: t(
                                            `You can ignore the value of Type Conversion unless you would like to overwrite some type conversion mapping rules.`
                                          ),
                                          tag: FormCrudTable,
                                          tagProps: {
                                            previewRecord(crtRow) {
                                              if (
                                                _.isEmpty(
                                                  crtRow.source_jdbc_type
                                                )
                                              ) {
                                                return t(
                                                  `Source JDBC Type cannot be empty`
                                                );
                                              }
                                              if (
                                                _.isNil(
                                                  crtRow.target_type_class
                                                ) ||
                                                crtRow.target_type_class.trim()
                                                  .length == 0
                                              ) {
                                                return t(
                                                  `Target Class Name cannot be empty`
                                                );
                                              } else {
                                                if (
                                                  crtRow.target_type_class.indexOf(
                                                    "."
                                                  ) != -1
                                                ) {
                                                  return t(
                                                    `Target Class Name cannot contain invalid character, for instance, such as User.java, User.kt are disallowed in config, instead, you should use "User" without any extension affix.`
                                                  );
                                                }
                                              }
                                            },
                                            fixedWidth: true,
                                            onChg: () => {
                                              //
                                            },
                                            obj: PUtils.crtModel
                                              .setting_for_mybatis,
                                            index: "type_conversion_arr",
                                            column: [
                                              {
                                                label: t(`Source Type`),
                                                prop: "source_jdbc_type",
                                                jsx: FormAjaxSelect,
                                                jsxProps: {
                                                  fn_call: () =>
                                                    gref.optAPI(
                                                      `list_jdbc_type_for_mybatis`
                                                    ),
                                                  PUtils: PUtils,
                                                },
                                              },
                                              {
                                                label: t(`Target Class`),
                                                prop: "target_type_class",
                                                placeholder: "e.g. User",
                                              },
                                              {
                                                label: t(
                                                  `Target Package(Optional)`
                                                ),
                                                placeholder:
                                                  "e.g. com.test.types",
                                                prop: "target_package_name",
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                      {
                                        orderPrefix: true,
                                      }
                                    )
                                  )
                                )
                              ),
                            },
                            {
                              label: t(`Scope`), // scope
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(() =>
                                      [
                                        {
                                          label: t(`Scope Type`),
                                          helperText: t(
                                            `By Default, CodeGen will handle all tables it reads, but you can include or exclude some tables as well.`
                                          ),
                                          tag: GFormSelect,
                                          tagProps: {
                                            list: [
                                              {
                                                label: t("Apply All Tables"),
                                                value: "all",
                                              },
                                              {
                                                label: t(
                                                  "Including Specific Tables"
                                                ),
                                                value: "include",
                                              },
                                              {
                                                label: t(
                                                  "Excluding Specific Tables"
                                                ),
                                                value: "exclude",
                                              },
                                            ],
                                            onChange(x) {
                                              PUtils.crtModel.setting_for_mybatis.scope_type =
                                                x.target.value;
                                            },
                                            value:
                                              PUtils.crtModel
                                                .setting_for_mybatis.scope_type,
                                          },
                                        },
                                        PUtils.crtModel.setting_for_mybatis
                                          .scope_type == "include"
                                          ? {
                                              label: t(
                                                `Including Tables Listings`
                                              ),
                                              helperText: t(
                                                `By Default, CodeGen will apply for all tables. If you only want to include some tables during the task, please modify this value.`
                                              ),
                                              ...cutils.crud.list_regex_or_plain(
                                                {
                                                  type: "regex",
                                                  crt_idx: "table_include",
                                                  crt_obj:
                                                    PUtils.crtModel
                                                      .setting_for_mybatis,
                                                  exampleForInput: "t_",
                                                }
                                              ),
                                            }
                                          : null,
                                        PUtils.crtModel.setting_for_mybatis
                                          .scope_type == "exclude"
                                          ? {
                                              label: t(
                                                `Excluding Tables Listings`
                                              ),
                                              helperText: t(
                                                `By Default, CodeGen will apply for all tables. If you want to exclude some tables during the task, please modify this value.`
                                              ),
                                              ...cutils.crud.list_regex_or_plain(
                                                {
                                                  type: "regex",
                                                  crt_idx: "table_exclude",
                                                  crt_obj:
                                                    PUtils.crtModel
                                                      .setting_for_mybatis,
                                                  exampleForInput: "t_",
                                                }
                                              ),
                                            }
                                          : null,
                                      ].filter((x) => !_.isNil(x))
                                    )
                                  )
                                )
                              ),
                            },
                            {
                              label: t(`Destination`),
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(() => [
                                      {
                                        label: t(`Destination for Output`),
                                        helperText: t(
                                          `Please specify the destination that will place result, CodeGen supports specifying multiple folder for output results.`
                                        ),
                                        tag: FormCrudTable,
                                        tagProps: {
                                          previewRecord(crtRow) {
                                            if (
                                              _.isNil(crtRow.filepath) ||
                                              crtRow.filepath.trim().length == 0
                                            ) {
                                              return t(
                                                `Output Directory cannot be empty`
                                              );
                                            }
                                          },
                                          fixedWidth: true,
                                          onChg: () => {
                                            //
                                          },
                                          obj: PUtils.crtModel
                                            .setting_for_mybatis,
                                          index: "pkgFileInfoArr",
                                          column: [
                                            {
                                              maxWidth: "350px",
                                              label: t(`Output Directory`),
                                              prop: "filepath",
                                              fn_type: "dir",
                                              placeholder:
                                                "e.g. /users/testuser/outputdir",
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        label: t(`Parent Package`),
                                        helperText: t(
                                          `If you leave this package field an empty value, then CodeGen need you to specify absolute package name of these fields below. Otherwise, you can specify a relative package name which based on the parent package name.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. com.test.parent`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_parent =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_parent,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Parent Module Name(Optional)`
                                        ),
                                        helperText: t(
                                          `The name of parent module.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: ``,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_moduleName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_moduleName,
                                        },
                                      },
                                      {
                                        label: t(`Entity Package`),
                                        helperText: t(
                                          `If you leave the parent package an empty value, then you need to specify an entire package information.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. com.test.entity`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_entity =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_entity,
                                        },
                                      },
                                      {
                                        label: t(`Service Package`),
                                        helperText: t(
                                          `If you leave the parent package an empty value, then you need to specify an entire package information.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. com.test.service`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_service =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_service,
                                        },
                                      },
                                      {
                                        label: t(`ServiceImpl Package`),
                                        helperText: t(
                                          `If you leave the parent package an empty value, then you need to specify an entire package information.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. com.test.serviceimpl`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_serviceimpl =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_serviceimpl,
                                        },
                                      },
                                      {
                                        label: t(`Mapper Package`),
                                        helperText: t(
                                          `If you leave the parent package an empty value, then you need to specify an entire package information.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. com.test.mapper`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_mapper =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_mapper,
                                        },
                                      },
                                      {
                                        label: t(`Controller Package`),
                                        helperText: t(
                                          `If you leave the parent package an empty value, then you need to specify an entire package information.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. com.test.controller`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_controller =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_controller,
                                        },
                                      },
                                      {
                                        label: t(`XML Mapper Location`),
                                        helperText: t(
                                          `Please be noted the XML Mapper Location will not related to the parent field value, please specify an absolute path. You can use an placeholder to represent the output directory, such as {0}`,
                                          `SYS_OUTPUT_DIR/../resources/mappers`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. SYS_OUTPUT_DIR/../resources/mappers`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.pkg_xml =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .pkg_xml,
                                        },
                                      },
                                    ])
                                  )
                                )
                              ),
                            },
                            {
                              label: t(`Prefix and Suffix`), // data table
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(
                                      () => [
                                        {
                                          label:
                                            "" + t(`Clean Table Name Prefix`),
                                          helperText: t(
                                            `It supports multiple values of plain text type. For instance, if these values defined "t_" and "v_" then the table name t_simple will be replaced with Simple, and v_other will be replaced with Other`
                                          ),
                                          ...fn_prefix_suffix_crud_table({
                                            index: "table_name_prefix",
                                            isPrefix: true,
                                            exampleForInput: "t_",
                                          }),
                                        },
                                        {
                                          label:
                                            "" + t(`Clean Table Name Suffix`),
                                          helperText: t(
                                            `It supports multiple values of plain text type.  For instance, if these values defined "_0" and "_\d{4,}" then the table name t_simple_0 will be replaced with TSimple, and v_other_2015 will be replaced with VOther`
                                          ),
                                          ...fn_prefix_suffix_crud_table({
                                            index: "table_name_suffix",
                                            isPrefix: false,
                                            exampleForInput: "_2016",
                                          }),
                                        },
                                        {
                                          label:
                                            "" + t(`Clean Field Name Prefix`),
                                          helperText: t(
                                            `As same as the table name prefix above, meanwhile, the prefix and suffix definitions will not conflict.`
                                          ),
                                          ...fn_prefix_suffix_crud_table({
                                            index: "field_name_prefix",
                                            isPrefix: true,
                                            exampleForInput: "is_",
                                          }),
                                        },
                                        {
                                          label:
                                            "" + t(`Clean Field Name Suffix`),
                                          helperText: t(
                                            `As same as the table name suffix above, meanwhile, the prefix and suffix definitions will not conflict.`
                                          ),
                                          ...fn_prefix_suffix_crud_table({
                                            index: "field_name_suffix",
                                            isPrefix: false,
                                            exampleForInput: "_flag",
                                          }),
                                        },
                                      ],
                                      {
                                        orderPrefix: true,
                                      }
                                    )
                                  )
                                )
                              ),
                            },

                            // {
                            //   label: t(`Package`),
                            // },
                            {
                              label: t(`Super Class`), // packageInfo
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(
                                      () => [
                                        {
                                          label: t(
                                            `Super Entity Class(Optional)`
                                          ),
                                          helperText: t(
                                            `If you'd like to have the entity class extended to the class you wanted, please specify its value and also include its complete name with its package.`
                                          ),
                                          tag: GFormInput,
                                          tagProps: {
                                            small: true,
                                            noTranslate: true,
                                            placeholder: `e.g. com.test.core.BaseEntity`,
                                            onChange(x) {
                                              PUtils.crtModel.setting_for_mybatis.superEntityClass =
                                                x;
                                            },
                                            value:
                                              PUtils.crtModel
                                                .setting_for_mybatis
                                                .superEntityClass,
                                          },
                                        },
                                        {
                                          label: t(
                                            `Super Entity Fields List(Multiple and Optional)`
                                          ),
                                          helperText: t(
                                            `If you defined a super entity class, then you can use this fields list to exact common fields into the parent super class if needed. Meanwhile, please join these multiple fields name with comma character`
                                          ),
                                          tag: GFormInput,
                                          tagProps: {
                                            small: true,
                                            noTranslate: true,
                                            placeholder: `e.g. id,createTime,updateTime`,
                                            onChange(x) {
                                              PUtils.crtModel.setting_for_mybatis.superEntityFields =
                                                x;
                                            },
                                            value:
                                              PUtils.crtModel
                                                .setting_for_mybatis
                                                .superEntityFields,
                                          },
                                        },
                                        {
                                          label: t(
                                            `Super Mapper Class(Optional)`
                                          ),
                                          helperText: t(
                                            `If you'd like to have the mapper class extended to the class you wanted, please specify its value and also include its complete name with its package.`
                                          ),
                                          tag: GFormInput,
                                          tagProps: {
                                            small: true,
                                            noTranslate: true,
                                            placeholder: `e.g. com.test.core.BaseMapper`,
                                            onChange(x) {
                                              PUtils.crtModel.setting_for_mybatis.superMapperClass =
                                                x;
                                            },
                                            value:
                                              PUtils.crtModel
                                                .setting_for_mybatis
                                                .superMapperClass,
                                          },
                                        },
                                        {
                                          label: t(
                                            `Super Service Class(Optional)`
                                          ),
                                          helperText: t(
                                            `If you'd like to have the service class extended to the class you wanted, please specify its value and also include its complete name with its package.`
                                          ),
                                          tag: GFormInput,
                                          tagProps: {
                                            small: true,
                                            noTranslate: true,
                                            placeholder: `e.g. com.test.core.BaseService`,
                                            onChange(x) {
                                              PUtils.crtModel.setting_for_mybatis.superServiceClass =
                                                x;
                                            },
                                            value:
                                              PUtils.crtModel
                                                .setting_for_mybatis
                                                .superServiceClass,
                                          },
                                        },
                                        {
                                          label: t(
                                            `Super ServiceImpl Class(Optional)`
                                          ),
                                          helperText: t(
                                            `If you'd like to have the service implemented class extended to the class you wanted, please specify its value and also include its complete name with its package.`
                                          ),
                                          tag: GFormInput,
                                          tagProps: {
                                            small: true,
                                            noTranslate: true,
                                            placeholder: `e.g. com.test.core.BaseServiceImpl`,
                                            onChange(x) {
                                              PUtils.crtModel.setting_for_mybatis.superServiceImplClass =
                                                x;
                                            },
                                            value:
                                              PUtils.crtModel
                                                .setting_for_mybatis
                                                .superServiceImplClass,
                                          },
                                        },
                                        {
                                          label: t(
                                            `Super Controller Class(Optional)`
                                          ),
                                          helperText: t(
                                            `If you'd like to have the controller class extended to the class you wanted, please specify its value and also include its complete name with its package.`
                                          ),
                                          tag: GFormInput,
                                          tagProps: {
                                            small: true,
                                            noTranslate: true,
                                            placeholder: `e.g. com.test.core.BaseController`,
                                            onChange(x) {
                                              PUtils.crtModel.setting_for_mybatis.superControllerClass =
                                                x;
                                            },
                                            value:
                                              PUtils.crtModel
                                                .setting_for_mybatis
                                                .superControllerClass,
                                          },
                                        },
                                      ],
                                      {
                                        orderPrefix: true,
                                      }
                                    )
                                  )
                                )
                              ),
                            },

                            {
                              label: t(`Overwrite`),
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(() => [
                                      {
                                        label: t(`Enable Entity Overwrite?`),
                                        tag: GFormSwitch,
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_entity_overwrite =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_entity_overwrite,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Enable Controller Overwrite?`
                                        ),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),

                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_controller_overwrite =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_controller_overwrite,
                                        },
                                      },
                                      {
                                        label: t(`Enable Mapper Overwrite?`),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_mapper_overwrite =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_mapper_overwrite,
                                        },
                                      },
                                      {
                                        label: t(`Enable Service Overwrite?`),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_service_overwrite =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_service_overwrite,
                                        },
                                      },
                                    ])
                                  )
                                )
                              ),
                            },
                            {
                              label: t(`Naming`),
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(() => [
                                      {
                                        label: t(`ID Naming Type`),
                                        helperText: t(
                                          `The strategy of generating ID Type`
                                        ),
                                        tag: GFormSelect,
                                        tagProps: {
                                          list: [
                                            {
                                              label: "AUTO",
                                              value: "AUTO",
                                            },
                                            {
                                              label: "NONE",
                                              value: "NONE",
                                            },
                                            {
                                              label: "INPUT",
                                              value: "INPUT",
                                            },
                                            {
                                              label: "ASSIGN_ID",
                                              value: "ASSIGN_ID",
                                            },
                                            {
                                              label: "ASSIGN_UUID",
                                              value: "ASSIGN_UUID",
                                            },
                                          ],
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.naming_IDType =
                                              x.target.value;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .naming_IDType,
                                        },
                                      },
                                      {
                                        label: t(`Entity Naming Type`),
                                        helperText: t(
                                          `The strategy of generating Entity Class Name`
                                        ),
                                        tag: GFormSelect,
                                        tagProps: {
                                          list: cutils.select.namingStrategy(),
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.namingStrategyForEntityName =
                                              x.target.value;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .namingStrategyForEntityName,
                                        },
                                      },
                                      {
                                        label: t(`Column Naming Type`),
                                        helperText: t(
                                          `The strategy of generating Column Fields`
                                        ),
                                        tag: GFormSelect,
                                        tagProps: {
                                          list: cutils.select.namingStrategy(),
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.namingStrategyForColumnName =
                                              x.target.value;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .namingStrategyForColumnName,
                                        },
                                      },
                                      {
                                        label: t(`Author(Optional)`),
                                        helperText: t(
                                          `Please specify the author if needed.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `Jerry`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.author =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .author,
                                        },
                                      },
                                      {
                                        label: t(`Entity Name(Optional)`),
                                        helperText: t(
                                          `For instance, {0} will be generated as {1}`,
                                          `%sEntity`,
                                          `UserEntity`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `%sEntity`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.naming_entityName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .naming_entityName,
                                        },
                                      },
                                      {
                                        label: t(`Mapper Name(Optional)`),
                                        helperText: t(
                                          `For instance, {0} will be generated as {1}`,
                                          `%sDao`,
                                          `UserDao`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `%sDao`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.naming_mapperName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .naming_mapperName,
                                        },
                                      },
                                      {
                                        label: t(`XML Name(Optional)`),
                                        helperText: t(
                                          `For instance, {0} will be generated as {1}`,
                                          `%sDao`,
                                          `UserDao.xml`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `%sDao`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.naming_xmlName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .naming_xmlName,
                                        },
                                      },
                                      {
                                        label: t(`Service Name(Optional)`),
                                        helperText: t(
                                          `For instance, {0} will be generated as {1}`,
                                          `%sBusiness`,
                                          `UserBusiness`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `%sBusiness`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.naming_serviceName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .naming_serviceName,
                                        },
                                      },
                                      {
                                        label: t(`ServiceImpl Name(Optional)`),
                                        helperText: t(
                                          `For instance, {0} will be generated as {1}`,
                                          `%sBusinessImpl`,
                                          `UserBusinessImpl`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `%sBusinessImpl`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.naming_serviceImplName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .naming_serviceImplName,
                                        },
                                      },
                                      {
                                        label: t(`Controller Name(Optional)`),
                                        helperText: t(
                                          `For instance, {0} will be generated as {1}`,
                                          `%sAction`,
                                          `UserAction`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `%sAction`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.naming_controllerName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .naming_controllerName,
                                        },
                                      },
                                    ])
                                  )
                                )
                              ),
                            },
                            {
                              label: t(`Template`),
                              jsx: observer((props) => {
                                return PUtils.jsx.tabWithDefinition({
                                  default_select_tab: "str",
                                  key: "template_biz_mybatis",
                                  list: [
                                    {
                                      label: `Entity(Java)`,
                                      id: "template_entity_java",
                                      jsx: PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        key: "template_entity_java",
                                        language: "freemarker2",
                                        initContent: ``,
                                        wordWrap: "on",
                                      }),
                                    },
                                    {
                                      label: `Entity(Kotlin)`,
                                      id: "template_entity_kotlin",
                                      jsx: PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        key: "template_entity_kotlin",
                                        language: "freemarker2",
                                        wordWrap: "on",
                                        initContent: ``,
                                      }),
                                    },
                                    {
                                      label: `Service`,
                                      id: "template_service",
                                      jsx: PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        key: "template_service",
                                        language: "freemarker2",
                                        wordWrap: "on",
                                        initContent: ``,
                                      }),
                                    },
                                    {
                                      label: `ServiceImpl`,
                                      id: "template_serviceimpl",
                                      jsx: PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        key: "template_serviceimpl",
                                        language: "freemarker2",
                                        wordWrap: "on",
                                        initContent: ``,
                                      }),
                                    },
                                    {
                                      label: `Mapper`,
                                      id: "template_mapper",
                                      jsx: PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        key: "template_mapper",
                                        language: "freemarker2",
                                        wordWrap: "on",
                                        initContent: ``,
                                      }),
                                    },
                                    {
                                      label: `XML`,
                                      id: "template_xml",
                                      jsx: PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        key: "template_xml",
                                        language: "freemarker2",
                                        wordWrap: "on",
                                        initContent: ``,
                                      }),
                                    },
                                    {
                                      label: `Controller`,
                                      id: "template_controller",
                                      jsx: PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        key: "template_controller",
                                        language: "freemarker2",
                                        wordWrap: "on",
                                        initContent: ``,
                                      }),
                                    },
                                  ].map((x) => {
                                    // x.mode_jsx_func = true;
                                    return x;
                                  }),
                                });
                              }),
                            },

                            {
                              label: t(`Other`),
                              jsx: observer((props) =>
                                React.createElement(
                                  observer(
                                    PUtils.fn.fn_form_jsx_by_config(() => [
                                      {
                                        label: t(`Enable Swagger2 Mode`),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_swagger2 =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_swagger2,
                                        },
                                      },
                                      {
                                        label: t(`Disable Serial Version UID`),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.disableSerialVersionUID =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .disableSerialVersionUID,
                                        },
                                      },
                                      // {
                                      //   label: t(
                                      //     `Disable Serial Version UID`
                                      //   ),
                                      //   helperText: t(
                                      //     `By Default, CodeGen will turn it off.`
                                      //   ),
                                      //   tag: GFormSwitch,
                                      //   tagProps: {
                                      //     valtype: "tf",
                                      //     onChange(x) {
                                      //       PUtils.crtModel.setting_for_mybatis.disableSerialVersionUID =
                                      //         x;
                                      //     },
                                      //     value:
                                      //       PUtils.crtModel
                                      //         .setting_for_mybatis
                                      //         .disableSerialVersionUID,
                                      //   },
                                      // },

                                      {
                                        label: t(
                                          `Enable Spring Framework Docs`
                                        ),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_spring_doc =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_spring_doc,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Enable {0} Mode`,
                                          "ActiveRecord"
                                        ),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_active_record =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_active_record,
                                        },
                                      },
                                      {
                                        label: t(`Enable Kotlin File`),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_kotlin_file =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_kotlin_file,
                                        },
                                      },
                                      {
                                        label: t(`Enable {0}`, `BaseResultMap`),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_baseResultMap =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_baseResultMap,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Enable {0}`,
                                          `BaseColumnList`
                                        ),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_baseColumnList =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_baseColumnList,
                                        },
                                      },

                                      {
                                        label: t(`Enable Mapper Annotation`),
                                        helperText: t(
                                          `By Default, CodeGen will turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enableMapperAnnotation =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enableMapperAnnotation,
                                        },
                                      },
                                      // {
                                      //   label: t(`Enable Cache`),
                                      //   helperText: t(
                                      //     `By Default, CodeGen will turn it off.`
                                      //   ),
                                      //   tag: GFormSwitch,
                                      //   tagProps: {
                                      //     valtype: "tf",
                                      //     onChange(x) {
                                      //       PUtils.crtModel.setting_for_mybatis.enable_cache =
                                      //         x;
                                      //     },
                                      //     value:
                                      //       PUtils.crtModel
                                      //         .setting_for_mybatis
                                      //         .enable_cache,
                                      //   },
                                      // },
                                      {
                                        label: t(
                                          `Open the Directory After Generating.`
                                        ),
                                        helperText: t(
                                          `By Default, CodeGen will turn it on.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.open_dir =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .open_dir,
                                        },
                                      },
                                      {
                                        label: t(`Upper Case Naming Mode`),
                                        helperText: t(
                                          `This form control will determine if CodeGen should name these class name as the upper case of table name.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.isCapitalMode =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .isCapitalMode,
                                        },
                                      },
                                      {
                                        label: t(`Skip View Type`),
                                        helperText: t(
                                          `This form control will determine if CodeGen should skip view type when generating the results.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.skipView =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .skipView,
                                        },
                                      },
                                      {
                                        label: t(`Generate Fields Constants`),
                                        helperText: t(
                                          `This form control will determine if CodeGen should generate field name constants inside each class file.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.enable_entityColumnConstant =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .enable_entityColumnConstant,
                                        },
                                      },
                                      {
                                        label: t(`Using Chain Model`),
                                        helperText: t(
                                          `This form control will determine if CodeGen should generate class as a chain model.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.chainModel =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .chainModel,
                                        },
                                      },
                                      {
                                        label: t(`Using Lombok Model`),
                                        helperText: t(
                                          `This form control will determine if CodeGen should generate class with lombok annotation, if you need this config, please turn the chain model config on as well.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.entityLombokModel =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .entityLombokModel,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Remove "is" prefix for Boolean Type Field`
                                        ),
                                        helperText: t(
                                          `If you don't the "is" prefix of the boolean type field, you can turn it off, then CodeGen will not generate its prefix.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.entityBooleanColumnRemoveIsPrefix =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .entityBooleanColumnRemoveIsPrefix,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Generate Controller with {0} Style`,
                                          "RestController"
                                        ),
                                        helperText: t(
                                          `By Default, CodeGen will turn it on. If you don't need the restful style, please turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.restControllerStyle =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .restControllerStyle,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Generate Controller with Hyphen Naming Style`
                                        ),
                                        helperText: t(
                                          `If you prefer to a hyphen naming style instead of camel naming style, please turn it on.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.controllerMappingHyphenStyle =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .controllerMappingHyphenStyle,
                                        },
                                      },
                                      {
                                        label: t(
                                          `Generate Annotation for Each Field of Entity Class`
                                        ),
                                        helperText: t(
                                          `By Default, CodeGen will turn it on. If you don't need an expository annotation for each field, please turn it off.`
                                        ),
                                        tag: GFormSwitch,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.entityTableFieldAnnotationEnable =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .entityTableFieldAnnotationEnable,
                                        },
                                      },
                                      {
                                        label: t(`Ignore Target Columns`),
                                        helperText: t(
                                          `If you need to ignore some columns in result, please provide these value and join them by the comma character..`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          valtype: "tf",
                                          placeholder:
                                            "e.g. createTime,updateTime",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.ignoreTargetColumns =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .ignoreTargetColumns,
                                        },
                                      },
                                      {
                                        label: t(`Version Field Name`),
                                        helperText: t(
                                          `Please provide the version field name if needed.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          valtype: "tf",
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.versionFieldName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .versionFieldName,
                                        },
                                      },
                                      {
                                        label: t(`Soft Deletion Field Name`),
                                        helperText: t(
                                          `Please provide the soft deletion field name if needed.`
                                        ),
                                        tag: GFormInput,
                                        tagProps: {
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.logicDeleteFieldName =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .logicDeleteFieldName,
                                        },
                                      },
                                      {
                                        label:
                                          t(`Schema Name(Database Name)`) +
                                          t(`(Experimental)`),
                                        helperText:
                                          t(
                                            `Shema Name, which means the database name you will connect to.`
                                          ) +
                                          t(
                                            `If leave this form value empty, then CodeGen will use the default value of configuration which was defined previously`
                                          ) +
                                          ". " +
                                          t(
                                            `Please be noted not all of databases can support this option, if it didn't match with your expectation, please modify SQL config directly.`
                                          ),
                                        tag: GFormInput,
                                        tagProps: {
                                          small: true,
                                          noTranslate: true,
                                          placeholder: `e.g. public`,
                                          onChange(x) {
                                            PUtils.crtModel.setting_for_mybatis.schema =
                                              x;
                                          },
                                          value:
                                            PUtils.crtModel.setting_for_mybatis
                                              .schema,
                                        },
                                      },

                                      // tableFillList
                                    ])
                                  )
                                )
                              ),
                            },
                            // {
                            //   label: t(`Destination`), // global
                            //   jsx: observer((props) => {
                            //     return PUtils.jsx.leftRightSpliter({
                            //       resizekey: "m_g_3",
                            //       left: <div>left</div>,
                            //       right: <div>right</div>,
                            //       percent: 1,
                            //     });
                            //   }),
                            // },
                          ].map((x) => {
                            x.mode_jsx_func = true;
                            return x;
                          }),
                        });
                      })
                    ),
                    jsx2: PUtils.jsx.leftRightSpliter({
                      resizekey: "m_g_1",
                      left: <div>a</div>,
                      right: PUtils.jsx.panelWithTitle({
                        n_style: {
                          borderTop: "none",
                        },
                        title: "Logs",
                        jsx: React.createElement(
                          observer((props) => {
                            return PUtils.jsx.tabWithDefinition({
                              default_select_tab: "str",
                              key: "preview_mybatis",
                              list: [],
                            });
                          })
                        ),
                        // title: "Preview for Related Source",
                        // jsx: React.createElement(
                        //   observer((props) => {
                        //     return PUtils.jsx.tabWithDefinition({
                        //       default_select_tab: "str",
                        //       key: "preview_mybatis",
                        //       list: [
                        //         {
                        //           label: t(`Related Tables`),
                        //           mode_jsx_func: true,
                        //           jsx: observer((props) => {
                        //             return PUtils.jsx.leftRightSpliter({
                        //               resizekey: "m_g_100",
                        //               left: <div>left</div>,
                        //               right: <div>right</div>,
                        //               percent: 1,
                        //             });
                        //           }),
                        //         },
                        //       ],
                        //     });
                        //   })
                        // ),
                      }),
                      percent: 1,
                      // percentRightWidth: 380,
                    }),
                  }),
                  btm: PUtils.jsx.panelWithTitle({
                    title: "Result Viewer",
                    jsx: React.createElement(
                      observer((props) => {
                        return PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "ROOT_EXTENSION_ADDONS_decode_str_tab",
                          list: [
                            {
                              label: t(`Output`),
                              mode_jsx_func: true,
                              jsx: observer((props) => {
                                return (
                                  <div className="w100 h100">
                                    <FormPlainTextLoggins
                                      type="logger"
                                      // refresh_it={PUtils.crtModel.fn_obj.refresh_it}
                                      key={
                                        (
                                          "" +
                                          PUtils.crtModel.fn_obj.output_logs
                                        ).length
                                      }
                                      logs={PUtils.crtModel.fn_obj.output_logs}
                                    />
                                  </div>
                                );
                              }),
                            },
                            {
                              label: t(`Entity`),
                              jsx: fn_createPreviewJSX({
                                type: "entity",
                              }),
                            },
                            {
                              label: t(`Service`),
                              jsx: fn_createPreviewJSX({
                                type: "service",
                              }),
                            },
                            {
                              label: t(`Mapper`),
                              jsx: fn_createPreviewJSX({
                                type: "mapper",
                              }),
                            },
                            {
                              label: t(`Controller`),
                              jsx: fn_createPreviewJSX({
                                type: "controller",
                              }),
                            },
                            {
                              label: t(`XML Definition`),
                              jsx: fn_createPreviewJSX({
                                type: "xml",
                                lang: "xml",
                              }),
                            },
                          ].map((x) => {
                            x.mode_jsx_func = true;
                            return x;
                          }),
                        });
                      })
                    ),
                  }),
                })}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
