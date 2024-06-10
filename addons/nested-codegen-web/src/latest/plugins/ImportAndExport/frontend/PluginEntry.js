const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  GSyncSelectWithFilter,
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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import FormCheckBox from "../../TranslateForJSON/frontend/cpt/FormCheckBox";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Import And Export";

let AllExportImportOptionArr = [
  {
    label: t(`Workspace Data`),
    value: "workspace_data",
  },
  {
    label: t(`Clipboard Data`),
    value: "clipboard_history_data",
  },
  {
    label: t(`Virtual Cache Data`),
    value: "cache_data",
  },
];
let NoteMe = observer((props) => {
  return (
    <Callout style={{ marginBottom: "8px" }} title={t(`Friendly Reminder`)}>
      {t(
        `Please note that CodeGen will only back up your personal present workspace data, which means it will not touch other workspaces in the system. If you need to back up all data, we recommend using a conventional backup approach by copying the entire files in your file system.`
      )}
    </Callout>
  );
});
let ReportForImportOrExport = observer((props) => {
  let { PUtils, gref, crtModel, prefix } = props;
  PUtils.useLoop(async () => {
    let r = await gref.optAPI(`get_crt_msg`, {
      msg_id: crtModel[prefix + "_id"],
    });
    let valMyMsg = crtModel[`${prefix}_msg`];
    let valDataValue = _.get(r, "data.value");
    if (!_.isEqual(valMyMsg, valDataValue)) {
      crtModel[`${prefix}_msg`] = valDataValue;
    }
    let valMsgObj = _.get(r, "data.msgObj");
    if (!_.isEqual(crtModel[`${prefix}_report`], valMsgObj)) {
      crtModel[`${prefix}_report`] = valMsgObj;
    }
  }, 1000);
  let crt_report = crtModel[`${prefix}_report`];
  let result_file_name = _.get(crt_report, "result_file_name");
  return (
    <div>
      <FormGroup label={<b>{t(`App Message`)}</b>}>
        {!cutils.cond_emptyStr(crtModel[`${prefix}_msg`])
          ? crtModel[`${prefix}_msg`]
          : t(`No Available Messages`)}
      </FormGroup>
      {_.isEmpty(result_file_name) ? (
        ""
      ) : (
        <FormGroup label={<b>{t(`Download Result`)}</b>}>
          <div className="sub-mr-5">
            <AnchorButton
              target={"_blank"}
              href={cutils.link.getDownloadByFileName({
                result_file_name: result_file_name,
              })}
              large={true}
              intent={"success"}
            >
              {t(`Click to Download Result`)}
            </AnchorButton>
            {/* <Button
              onClick={async () => {
                await gref.optAPI(`clean_the_result`, {
                  prefix: prefix,
                  msg_id: crtModel[prefix + "_id"],
                  result_file_name,
                });
                crtModel[`${prefix}_report`] = null;
                crtModel[`${prefix}_msg`] = null;
              }}
              large={true}
              intent={"none"}
            >
              {t(`Clean Result`)}
            </Button> */}
          </div>
        </FormGroup>
      )}

      {_.isEmpty(crt_report) ? (
        ""
      ) : (
        <FormGroup label={<b>{t(`App Report`)}</b>}>
          {_.map(_.get(crt_report, "report"), (x, d) => {
            if (!_.isString(x)) {
              return <div key={d}>unknown message</div>;
            }
            return <div key={d}>{x}</div>;
          })}
        </FormGroup>
      )}
    </div>
  );
});
let Cpt_export_logic = observer((props) => {
  let { PUtils, gref, crtModel } = props;

  return (
    <div>
      <NoteMe />
      <ReportForImportOrExport
        PUtils={PUtils}
        gref={gref}
        crtModel={crtModel}
        prefix="export"
      />
      <FormGroup label={<b>{t(`Selected Data Scope`)}</b>}>
        <FormCheckBox
          chg={(val) => {
            crtModel["export_option_values"] = val;
          }}
          obj={crtModel}
          index={"export_option_values"}
          list={AllExportImportOptionArr}
          filter_option_list={[]}
        ></FormCheckBox>
      </FormGroup>
      <p className="sub-mr-5">
        <Button
          intent={"primary"}
          onClick={async () => {
            // handling it
            cutils.alertOk_noT(
              t(`Handling your request... App messages will be shown later.`)
            );
            await gref.optAPI(`proceed_my_request`, {
              action_id: "export",
              action_type: "file",
              msg_id: PUtils.crtModel.export_id,
              option_values: PUtils.crtModel.export_option_values,
            });
          }}
        >
          {t(`Export As File`)}
        </Button>
        {/* <Button
          intent={"none"}
          onClick={async () => {
            cutils.alertOk_noT(
              t(`Handling your request... App messages will be shown later.`)
            );
            await gref.optAPI(`proceed_my_request`, {
              action_id: "export",
              action_type: "text",
              msg_id: PUtils.crtModel.export_id,
              option_values: PUtils.crtModel.export_option_values,
            });
          }}
        >
          {t(`Export As Text`)}
        </Button> */}
      </p>
    </div>
  );
});

let Cpt_import_logic = observer((props) => {
  let { PUtils, gref, crtModel } = props;

  return (
    <div>
      <NoteMe />
      <ReportForImportOrExport
        PUtils={PUtils}
        gref={gref}
        crtModel={crtModel}
        prefix="import"
      />
      <FormGroup label={<b>{t(`Import Mode`)}</b>}>
        <GSyncSelectWithFilter
          obj={PUtils.crtModel}
          list={[
            {
              label: t(`Overwrite it`),
              value: "overwrite",
            },
            {
              label: t(`Merge it if possible`),
              value: "merge",
            },
          ]}
          index={`merge_strategy`}
          whenChg={(x) => {
            PUtils.crtModel.merge_strategy = x;
          }}
        />
      </FormGroup>
      <p className="sub-mr-5">
        <Button
          onClick={async () => {
            let upload_file_id = await cutils.selectFile();
            if (!_.isNil(upload_file_id)) {
              cutils.alertOk_noT(
                t(`Handling your request... App messages will be shown later.`)
              );
              await gref.optAPI(`proceed_my_request`, {
                action_id: "import",
                action_type: "file",
                msg_id: PUtils.crtModel.import_id,
                upload_file_id: upload_file_id,
                merge_strategy: PUtils.crtModel.merge_strategy,
                option_values: PUtils.crtModel.import_option_values,
              });
            } else {
              cutils.alert_noT(t(`Cancelled the uploading file operation.`));
            }
          }}
          intent={"primary"}
        >
          {t(`Import From File`)}
        </Button>
        {/* <Button intent={"none"}>{t(`Import From Text`)}</Button> */}
      </p>
    </div>
  );
});

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: true, //!gutils.dev(),
    // willReadyVersion: `v1.8.4`,
    unlimited_view_mode: true,
    initialState: async () => {
      let export_option_values = _.chain(AllExportImportOptionArr)
        .map((x) => x.value)
        .value();
      return {
        merge_strategy: "overwrite",
        view_key: "export",
        import_msg: t(`No Message for Import Action Presently`),
        export_msg: t(`No Message for Import Action Presently`),
        export_id: gutils.uuid(),
        import_id: gutils.uuid(),
        export_report: null,
        import_report: null,
        export_option_values: export_option_values,
        import_option_values: export_option_values,
      };
    },
    // pure_ext_mode: true,
    menus: [
      {
        pid: "dashboard",
        children: [
          {
            label: "Import and Export",
            icon: "import",
            pid: "ROOT_EXTENSION_ADDONS",
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
          PUtils.makeLeftHide();
          PUtils.makeOnlyOneOptions();
          let commonProps = {
            PUtils,
            crtModel,
            gref,
          };
          return (
            <div style={{ padding: "12px 30px" }}>
              <h1>{t(`Import and Export Your Data`)}</h1>
              <div>
                {t(
                  `Welcome to use this tools for importing and exporting your personal data! `
                )}
                {t(
                  `To use it, you only need to click the buttons below and follow its flow step by step.`
                )}
              </div>
              <div style={{ marginTop: "12px" }}>
                <Tabs
                  style={{ paddingTop: "0px" }}
                  animate={true}
                  key={"vertical"}
                  renderActiveTabPanelOnly={true}
                  vertical={true}
                  onChange={(val) => {
                    PUtils.crtModel.view_key = val;
                  }}
                  large={false}
                  selectedTabId={PUtils.crtModel.view_key}
                >
                  <Tab
                    id="export"
                    title={t("Export")}
                    className="mmm1000"
                    panel={<Cpt_export_logic {...commonProps} />}
                  />
                  <Tab
                    id="import"
                    title={t("Import")}
                    className="mmm1000"
                    panel={<Cpt_import_logic {...commonProps} />}
                  />
                  {/* <Tab
                    id="operation"
                    title={t("Other Operations")}
                    className="mmm1000"
                    panel={<Cpt_other_operations />}
                  /> */}
                </Tabs>
              </div>
            </div>
          );
        }),
      })
    ),
  };
};
