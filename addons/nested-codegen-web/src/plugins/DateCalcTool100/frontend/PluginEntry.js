const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GFormSwitch,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
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
  GFormInput,
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
import GFormInput2 from "../../SQLDrafts/frontend/Kit_GFormInput2";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";
import "./myfile.less";

let appTitle = "Date Interval Calculator";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: true, //!gutils.dev(),
    // willReadyVersion: `v1.6.9`,
    unlimited_view_mode: true,
    initialState() {
      return {
        today_flag: null,
        f1_base_year: "",
        f1_base_month: "",
        f1_base_date: "",
        f1_pass_date: "365",
        f1_result: "",
        f1_weekDays: "",

        f2_start_year: "2016",
        f2_start_month: "07",
        f2_start_date: "01",
        f2_end_year: "",
        f2_end_month: "",
        f2_end_date: "",
        f2_pass_date: "",
        f2_result: "",
      };
    },
    menus: [
      {
        pid: "time",
        children: [
          {
            label: appTitle,
            icon: "route",
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
          let today_flag_dft = Moment().format("YYYY-MM-DD");
          if (PUtils.crtModel.today_flag != today_flag_dft) {
            PUtils.crtModel.today_flag = today_flag_dft;
            let arr = today_flag_dft.split("-");
            PUtils.crtModel.f1_base_year = arr[0];
            PUtils.crtModel.f1_base_month = ("" + arr[1]).replaceAll(/^0/g, "");
            PUtils.crtModel.f1_base_date = arr[2];
            PUtils.crtModel.f2_end_year = arr[0];
            PUtils.crtModel.f2_end_month = ("" + arr[1]).replaceAll(/^0/g, "");
            PUtils.crtModel.f2_end_date = arr[2];
          }

          return (
            <div
              style={{
                padding: "30px 0",
                margin: "0 auto",
              }}
            >
              <Card
                style={{
                  width: "500px",
                  margin: "0 auto",
                  padding: "12px 20px",
                }}
              >
                <div className="date-calc-wrapper">
                  <h2>{t(`Calculate the date after N days`)}</h2>
                  <p>
                    <div className="all-ipt-inline-block">
                      <span>{t("When")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f1_base_year",
                        type: "number",
                      })}{" "}
                      <span>{t("Year")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f1_base_month",
                        type: "number",
                        max: 12,
                        min: 1,
                      })}{" "}
                      <span>{t("Month ")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f1_base_date",
                        type: "number",
                        max: 31,
                        min: 1,
                      })}{" "}
                      <span>{t("Date ")}</span>
                    </div>
                    <div className="all-ipt-inline-block">
                      <span>{t("Have Passed")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f1_pass_date",
                        type: "number",
                      })}{" "}
                      <span>{t("Days")}</span>
                      <span>
                        (
                        {t(
                          `Negative Value refers to the calcuation for converse direction`
                        )}
                        )
                      </span>
                    </div>
                    <div className="all-ipt-inline-block">
                      {t(
                        `Accordingly, the result is {0}`,
                        PUtils.crtModel.f1_weekDays
                      )}
                    </div>
                    <div className="all-ipt-inline-block">
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f1_result",
                        width: "300px",
                        placeholder: t("The result will be displayed here"),
                      })}
                    </div>
                    <div className="all-ipt-inline-block ctlbar">
                      <Button
                        onClick={() => {
                          [
                            ["f1_base_year", "Year cannot be empty"],
                            ["f1_base_month", "Month cannot be empty"],
                            ["f1_base_date", "Date cannot be empty"],
                            ["f1_pass_date", "Interval Dates cannot be empty"],
                          ].forEach((eachItem) => {
                            let errMsg = t(eachItem[1]);
                            if (eachItem) {
                              let b = PUtils.crtModel[eachItem[0]];
                              if (_.isNil(b) || b == "") {
                                gutils.alert({
                                  intent: "danger",
                                  message: errMsg,
                                });
                                throw new Error("stop");
                              }
                            }
                          });
                          let a = Moment();
                          a.year(parseInt(PUtils.crtModel["f1_base_year"]))
                            .month(
                              parseInt(PUtils.crtModel["f1_base_month"]) - 1
                            )
                            .date(parseInt(PUtils.crtModel["f1_base_date"]))
                            .add(
                              parseInt(PUtils.crtModel["f1_pass_date"]),
                              "d"
                            );
                          PUtils.crtModel.f1_result = a.format("YYYY-MM-DD");
                          PUtils.crtModel.f1_weekDays = t(a.format("dddd"));
                        }}
                        intent={"primary"}
                        small={true}
                        text={t(`Calculate Date`)}
                      ></Button>
                    </div>
                  </p>
                </div>
                <div className="date-calc-wrapper">
                  <h2>
                    {t(`Calculate the differences in days between two days`)}
                  </h2>
                  <p>
                    <div className="all-ipt-inline-block">
                      <span>{t("From ")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f2_start_year",
                        type: "number",
                      })}{" "}
                      <span>{t("Year")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f2_start_month",
                        type: "number",
                        max: 12,
                        min: 1,
                      })}{" "}
                      <span>{t("Month ")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f2_start_date",
                        type: "number",
                        max: 31,
                        min: 1,
                      })}{" "}
                      <span>{t("Date ")}</span>
                    </div>
                    <div className="all-ipt-inline-block">
                      <span>{t("To ")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f2_end_year",
                        type: "number",
                      })}{" "}
                      <span>{t("Year")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f2_end_month",
                        type: "number",
                        max: 12,
                        min: 1,
                      })}{" "}
                      <span>{t("Month ")}</span>
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f2_end_date",
                        max: 31,
                        min: 1,
                        type: "number",
                      })}{" "}
                      <span>{t("Date ")}</span>
                    </div>
                    <div className="all-ipt-inline-block">
                      {t(`Accordingly, the interval days as below`)}
                    </div>
                    <div className="all-ipt-inline-block">
                      {PUtils.jsx.getSimpleInlineIpt({
                        index: "f2_result",
                        width: "300px",
                        placeholder: t("The result will be displayed here"),
                      })}
                    </div>
                    <div className="all-ipt-inline-block ctlbar">
                      <Button
                        onClick={() => {
                          [
                            ["f2_start_year", "Year cannot be empty"],
                            ["f2_start_month", "Month cannot be empty"],
                            ["f2_start_date", "Date cannot be empty"],
                            ["f2_end_year", "Year cannot be empty"],
                            ["f2_end_month", "Month cannot be empty"],
                            ["f2_end_date", "Date cannot be empty"],
                          ].forEach((eachItem) => {
                            let errMsg = t(eachItem[1]);
                            if (eachItem) {
                              let b = PUtils.crtModel[eachItem[0]];
                              if (_.isNil(b) || b == "") {
                                gutils.alert({
                                  intent: "danger",
                                  message: errMsg,
                                });
                                throw new Error("stop");
                              }
                            }
                          });
                          let a = Moment();
                          let b = Moment();
                          a.year(parseInt(PUtils.crtModel["f2_start_year"]))
                            .month(
                              parseInt(PUtils.crtModel["f2_start_month"]) - 1
                            )
                            .date(parseInt(PUtils.crtModel["f2_start_date"]));
                          b.year(parseInt(PUtils.crtModel["f2_end_year"]))
                            .month(
                              parseInt(PUtils.crtModel["f2_end_month"]) - 1
                            )
                            .date(parseInt(PUtils.crtModel["f2_end_date"]));
                          PUtils.crtModel.f2_result = parseInt(
                            b.diff(a, "days", true)
                          );
                        }}
                        intent={"primary"}
                        small={true}
                        text={t(`Calculate Date`)}
                      ></Button>
                    </div>
                  </p>
                </div>
              </Card>
            </div>
          );
        }),
      })
    ),
  };
};
