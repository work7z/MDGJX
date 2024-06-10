const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GSyncSelectWithFilter,
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
import FormCheckBox from "../../TranslateForJSON/frontend/cpt/FormCheckBox";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";
import "./myfile.less";
let GFormInput = GFormInput2;

// let GFormInput = observer((props) => {
//   const [iptVal = props.value, _onIptVal] = useState(props.value);
//   const [showPassword, onShowPassword] = useState(false);
//   let onIptVal = (val) => {
//     if (!_.isNil(props.min)) {
//       if (val < props.min) {
//         val = props.min;
//       }
//     }
//     if (!_.isNil(props.max)) {
//       if (val > props.max) {
//         val = props.max;
//       }
//     }
//     console.log(`FinalIpt`, val, props.min, props.max);
//     _onIptVal(val);
//   };
//   useEffect(() => {
//     // debugger;
//     onIptVal(props.value);
//     return () => {};
//   }, [props.value]);
//   const lockButton = (
//     <Button
//       small={props.small}
//       icon={showPassword ? "unlock" : "lock"}
//       intent={Intent.WARNING}
//       minimal={true}
//       onClick={() => {
//         onShowPassword(showPassword ? false : true);
//       }}
//     />
//   );
//   let FinalVal = InputGroup;
//   if (props.type == "textarea") {
//     FinalVal = TextArea;
//   }
//   // console.log("rendering logic for ", iptVal, props.value);
//   if (_.isNil(iptVal) && !_.isEmpty(props.value)) {
//     gutils.defer(() => {
//       onIptVal(props.value);
//     });
//   }
//   return (
//     <div>
//       <FinalVal
//         disabled={props.disabled}
//         small={props.small}
//         max={props.max}
//         min={props.min}
//         type={
//           (props.type == "password"
//             ? showPassword
//               ? "text"
//               : "password"
//             : props.type) || "text"
//         }
//         {...gutils.propsForInput(
//           {
//             ...props,
//             onChange: (val) => {
//               if (!_.isNil(props.min)) {
//                 if (val < props.min) {
//                   val = props.min;
//                 }
//               }
//               if (!_.isNil(props.max)) {
//                 if (val > props.max) {
//                   val = props.max;
//                 }
//               }
//               return props.onChange(val);
//             },
//           },
//           iptVal,
//           onIptVal
//         )}
//         rightElement={props.type == "password" ? lockButton : null}
//         onBlur={(e) => {
//           onIptVal(e.target.value);
//         }}
//       />
//     </div>
//   );
// });

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};

let all_time_unit = [
  {
    id: "seconds",
    label: `Seconds`,
    timeunit_id: "seconds",
    scope_string: "00-59",
    scope_begin: 0,
    scope_end: 59,
    padLeft: 2,
  },
  {
    id: "minute",
    label: `Minute`,
    timeunit_id: "minute",
    scope_string: "00-59",
    scope_begin: 0,
    scope_end: 59,
    padLeft: 2,
  },
  {
    id: "hour",
    label: `Hour`,
    timeunit_id: "hour",
    scope_string: "00-23",
    scope_begin: 0,
    scope_end: 23,
    padLeft: 2,
    filter_option_list: [
      {
        label: `AM`,
        filter: (arr) => _.filter(arr, (x) => x.value <= 12),
      },
      {
        label: `PM`,
        filter: (arr) => _.filter(arr, (x) => x.value > 12),
      },
    ],
  },
  {
    id: "day_of_month",
    label: `Day of Month`,
    single_label: "day of each month",
    timeunit_id: "day_of_month",
    scope_string: "01-31",
    scope_begin: 1,
    scope_end: 31,
    padLeft: 2,
    source_definition_list: [
      {
        label: t(`Last day of each month`),
        value: `last_day_of_each_month`,
      },
      {
        label: t(`The nearest weekday of the n day in a month`),
        value: `nearest_weekday`,
      },
    ],
    filter_option_list: [
      {
        label: t(`Odds Days`),
        filter: (arr) => _.filter(arr, (x, d, n) => d % 2 != 0),
      },
      {
        label: t(`Even Days`),
        filter: (arr) => _.filter(arr, (x, d, n) => d % 2 == 0),
      },
    ],
  },
  {
    id: "month",
    label: `Month`,
    timeunit_id: "month",
    scope_string: "1-12(From Jan to Dec)",
    scope_begin: 1,
    scope_end: 12,
    padLeft: 2,
  },
  {
    id: "day_of_week",
    label: `Day of Week`,
    single_label: "day of each week",
    timeunit_id: "day_of_week",
    scope_string: `1-7(From Monday to Sunday)`,
    scope_begin: 1,
    scope_end: 7,
    padLeft: 2,
    source_aseterik_list: [
      {
        label: t(`?`),
        desc_label: `? mode`,
        value: `?`,
      },
    ],
    source_definition_list: [
      {
        label: t(`The nth day of nth week in a month`),
        value: `nth_day_of_nth_week`,
      },
      {
        label: t(`Last nth week of the month`),
        value: `last_nth_week_of_the_month`,
      },
    ],
  },
  {
    id: "year",
    label: `Year`,
    timeunit_id: "year",
    no_scope_value: true,
  },
];

_.map(all_time_unit, (x, d, n) => {
  if (_.isNil(x.single_label)) {
    x.single_label = _.lowerFirst(x.label.replace("Seconds", "Second"));
  }
});

let key_of_all_time_unit = _.map(all_time_unit, (x) => x.id);

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      let fin_state = {
        init_ctn_num: 0,
        crontab_output_cron_general: "",
      };
      _.forEach(key_of_all_time_unit, (x, d, n) => {
        _.merge(fin_state, {
          ["crontab_source_definition_" + x]: "per",
          ["crontab_source_per_wildcard_chars_" + x]: "*",
          ["crontab_source_specified_values_" + x]: [],
          ["crontab_source_last_day_of_each_month_" + x]: `L`,
        });
      });
      return fin_state;
    },
    menus: [
      {
        pid: "time",
        children: [
          {
            label: "Cron Expression",
            icon: "timeline-events",
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
        totalTitle: "Crontab Expression Tools",
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let fn_get_all_crontab_list = async (finish_crontab) => {
            let fn_updateTextFunc = (str) => {
              gstore.common_app.extTimeCrontab.time_crontab_editor_setValue(
                _.toString(str)
              );
            };
            fn_updateTextFunc(`Calculating...`);
            try {
              let { data } = await gref.optAPI("next_cron_str_list", {
                text: finish_crontab,
              });
              let { err, time_listing, base_time } = data;
              if (!_.isNil(err)) {
                fn_updateTextFunc(
                  `${t(
                    `NOTE: This cron expression isn't compatible with the version of Java, yet it maybe can work well with another executed environment`
                  )}\n\n` + err
                );
              } else if (_.isNil(base_time)) {
                fn_updateTextFunc(`No Available Preview`);
              } else {
                let str_arr = _.chain(time_listing)
                  .map((timestamp, timestamp_idx) => {
                    let desc = Moment(timestamp).from(base_time);
                    if (timestamp == base_time) {
                      desc = "BASE";
                    }
                    let timestr = Moment(timestamp).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    return `(${_.padStart(
                      "" + (timestamp_idx + 1),
                      2,
                      "0"
                    )}) - ${timestr} [${desc}]`;
                  })
                  .join("\n")
                  .value();
                fn_updateTextFunc(str_arr);
              }
            } catch (e) {
              console.log(e);
              fn_updateTextFunc(`${gutils.getErrMsg(e)}`);
            }
          };
          let fn_generate_cron_by_ui = async () => {
            let completeArr = _.map(all_time_unit, (eachTimeUnitObj) => {
              let type =
                model[
                  "crontab_source_definition_" + eachTimeUnitObj.timeunit_id
                ];
              let fn_getValue = (str) => {
                return model[str + eachTimeUnitObj.timeunit_id];
              };
              switch (type) {
                case "per":
                  return fn_getValue(`crontab_source_per_wildcard_chars_`);
                case "range":
                  let nnn = fn_getValue(`crontab_source_range_starting_`);
                  if (_.isNil(nnn)) {
                    nnn = "";
                  }
                  let nnn_2 = fn_getValue(`crontab_source_range_ending_`);
                  if (_.isNil(nnn_2)) {
                    nnn_2 = "";
                  }
                  return `${nnn}-${nnn_2}`;
                case "start_and_period":
                  let a = fn_getValue(`crontab_source_period_start_at_`);
                  let b = fn_getValue(`crontab_source_period_per_`);
                  if (_.isNil(a)) {
                    a = "";
                  }
                  if (_.isNil(b)) {
                    b = "";
                  }
                  return `${a}/${b}`;
                case "specified":
                  let finalStr = _.join(
                    fn_getValue(`crontab_source_specified_values_`),
                    ","
                  );
                  if (finalStr == "") {
                    finalStr = "Not_Yet_Selected";
                  }
                  return finalStr;
                case "last_day_of_each_month":
                  return fn_getValue(`crontab_source_last_day_of_each_month_`);
                case "nearest_weekday":
                  let x = fn_getValue(`crontab_source_nearest_weekday_`);
                  return `${x}W`;
                case "nth_day_of_nth_week":
                  let x1 = fn_getValue(`crontab_source_starting_nth_week_`);
                  let x2 = fn_getValue(
                    `crontab_source_starting_nth_day_of_nth_week_`
                  );
                  return `${x1}#${x2}`;
                case "last_nth_week_of_the_month":
                  let m1 = fn_getValue(`last_nth_week_of_the_month`);
                  return `${m1}L`;
              }
              return "N/A";
            });
            let finish_crontab = _.join(completeArr, " ");
            model["crontab_output_cron_general"] = finish_crontab;
            await fn_get_all_crontab_list(finish_crontab);
          };
          let delay_call_fn_ui = () => {
            gutils.defer(() => {
              fn_generate_cron_by_ui();
            }, 200);
          };
          // useEffect(() => {
          //   let aaa = reaction(
          //     () => {
          //       return { ...crtModel };
          //     },
          //     () => {
          // fn_generate_cron_by_ui();
          //     }
          //   );
          //   return () => {
          //     aaa();
          //   };
          // }, []);
          let parse_cron_back_to_ui = () => {
            let cron_str = model["crontab_output_cron_general"];
            cron_str = _.trim(cron_str);
            if (_.isEmpty(cron_str)) {
              gutils.alert({
                intent: "danger",
                message: `Cron Expression Cannot be Empty`,
              });
              return;
            }
            cron_str = cron_str.replace(/\s+/g, " ");
            cron_str = cron_str
              .replaceAll("MON", "1")
              .replaceAll("TUE", "2")
              .replaceAll("WED", "3")
              .replaceAll("THU", "4")
              .replaceAll("FRI", "5")
              .replaceAll("SAT", "6")
              .replaceAll("SUN", "7")
              .replaceAll("JAN", "1")
              .replaceAll("FEB", "2")
              .replaceAll("MAR", "3")
              .replaceAll("APR", "4")
              .replaceAll("MAY", "5")
              .replaceAll("JUN", "6")
              .replaceAll("JUL", "7")
              .replaceAll("AUG", "8")
              .replaceAll("SEP", "9")
              .replaceAll("OCT", "10")
              .replaceAll("NOV", "11")
              .replaceAll("DEC", "12");
            let finalArr = cron_str.split(" ");
            if (_.size(finalArr) == 5) {
              finalArr = [...finalArr, "*"];
            }
            if (_.size(finalArr) == 6) {
              finalArr = ["0", ...finalArr];
            }
            model["crontab_output_cron_general"] = _.join(finalArr, " ");
            if (_.size(finalArr) != 7) {
              gutils.alert({
                intent: "danger",
                message: t(
                  `Cron Expression should be comprised of 7 parts, but received {0}, unable to parse it.`,
                  _.size(finalArr)
                ),
              });
              return;
            }
            _.forEach(all_time_unit, (eachTimeUnit, eachTimeUnitIdx) => {
              let eachTimeUnitObj = eachTimeUnit;
              let fn_getValue = (str) => {
                return model[str + eachTimeUnitObj.timeunit_id];
              };
              let fn_setValue = (str, val) => {
                model[str + eachTimeUnitObj.timeunit_id] = val;
              };
              // handling
              let crtDataPart = _.trim(finalArr[eachTimeUnitIdx]);
              if ("" == crtDataPart || _.isNil(crtDataPart)) {
                return;
              }
              if (crtDataPart.indexOf("-") != -1) {
                let arr = crtDataPart.split("-");
                let leftPart = _.trim(_.get(arr, 0));
                let rightPart = _.trim(_.get(arr, 1));
                fn_setValue("crontab_source_definition_", "range");
                fn_setValue("crontab_source_range_starting_", leftPart);
                fn_setValue("crontab_source_range_ending_", rightPart);
              } else if (crtDataPart.indexOf("/") != -1) {
                let arr = crtDataPart.split("/");
                let leftPart = _.trim(_.get(arr, 0));
                let rightPart = _.trim(_.get(arr, 1));
                fn_setValue("crontab_source_definition_", "start_and_period");
                fn_setValue("crontab_source_period_start_at_", leftPart);
                fn_setValue("crontab_source_period_per_", rightPart);
              } else if (crtDataPart.indexOf("#") != -1) {
                let arr = crtDataPart.split("#");
                let leftPart = _.trim(_.get(arr, 0));
                let rightPart = _.trim(_.get(arr, 1));
                fn_setValue(
                  "crontab_source_definition_",
                  "nth_day_of_nth_week"
                );
                fn_setValue("crontab_source_starting_nth_week_", leftPart);
                fn_setValue(
                  "crontab_source_starting_nth_day_of_nth_week_",
                  rightPart
                );
              } else if (crtDataPart.indexOf("W") != -1) {
                fn_setValue("crontab_source_definition_", "nearest_weekday");
                fn_setValue(
                  "crontab_source_nearest_weekday_",
                  parseInt(crtDataPart.replace("W", ""))
                );
              } else if (crtDataPart.indexOf("L") != -1) {
                if (crtDataPart == "L") {
                  crtDataPart = "1L";
                }
                fn_setValue(
                  "crontab_source_definition_",
                  "last_nth_week_of_the_month"
                );
                fn_setValue(
                  "last_nth_week_of_the_month",
                  parseInt(crtDataPart.replace("L", ""))
                );
              } else {
                if (/^[0-9|,]+$/.test(crtDataPart)) {
                  fn_setValue("crontab_source_definition_", "specified");
                  fn_setValue(
                    "crontab_source_specified_values_",
                    _.chain(crtDataPart)
                      .split(",")
                      .map((x) => _.trim(x))
                      .value()
                  );
                } else {
                  fn_setValue("crontab_source_definition_", "per");
                  fn_setValue(
                    "crontab_source_per_wildcard_chars_",
                    crtDataPart
                  );
                }
              }
              console.log(
                "final joining",
                eachTimeUnit.timeunit_id,
                crtDataPart
              );
            });
            gutils.alertOk(`Reversed Cron Expression back to the UI config.`);
          };
          let model = crtModel;
          let fn_createFormForTimeUnit = (m_args) => {
            let definition_type =
              model["crontab_source_definition_" + m_args.timeunit_id];
            let { timeunit_id } = m_args;
            let option_values = [];
            if (!m_args.no_scope_value) {
              for (let i = m_args.scope_begin; i <= m_args.scope_end; i++) {
                option_values.push({
                  label: _.padStart("" + i, 2, "0"),
                  value: "" + i,
                });
              }
            }
            return (
              <div className="w100 h100 pd-10">
                <FormGroup
                  label={t(`Definition Type`)}
                  helperText={t(
                    `Each part of crontab provides multiple definition types. please select a type that you want and modify its config value accordingly.`
                  )}
                >
                  <GSyncSelectWithFilter
                    btn_style={{
                      maxWdth: "auto",
                    }}
                    list={[
                      {
                        label: t(
                          `Per ${m_args.label.replace("Seconds", "Second")}`
                        ),
                        value: "per",
                      },
                      {
                        label: t(
                          `Range` +
                            (m_args.no_scope_value
                              ? ""
                              : `(${m_args.scope_string})`)
                        ),
                        value: "range",
                      },
                      {
                        label: t(
                          `Starting at nth ${m_args.single_label}, and periodically trigger it per n ${m_args.single_label}`
                        ),
                        value: "start_and_period",
                      },
                      m_args.no_scope_value
                        ? null
                        : {
                            label: t(`Specified Values of Time Unit`),
                            value: "specified",
                          },
                      ...(m_args.source_definition_list || []),
                    ].filter((x) => !_.isNil(x))}
                    obj={model}
                    index={"crontab_source_definition_" + m_args.timeunit_id}
                    whenChg={(e) => {
                      console.log("e", e);
                      delay_call_fn_ui();
                      debugger;
                      if (m_args.timeunit_id == "day_of_month") {
                        let crt_type_val =
                          model[
                            "crontab_source_definition_" + m_args.timeunit_id
                          ];
                        if (crt_type_val == "last_day_of_each_month") {
                          model["crontab_source_definition_day_of_week"] =
                            "per";
                          model[
                            "crontab_source_per_wildcard_chars_day_of_week"
                          ] = "?";
                        }
                      }
                    }}
                  ></GSyncSelectWithFilter>
                </FormGroup>
                {definition_type == "specified" && !m_args.no_scope_value
                  ? [
                      <FormGroup
                        label={t(`Specified values of current time unit`)}
                        helperText={t(
                          `Please select some options above you needed to determine the time values.`
                        )}
                      >
                        <FormCheckBox
                          chg={(val) => {
                            console.log("trigger chg", val);
                            model[
                              "crontab_source_specified_values_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          obj={model}
                          index={
                            "crontab_source_specified_values_" +
                            m_args.timeunit_id
                          }
                          list={option_values}
                          filter_option_list={m_args.filter_option_list}
                        ></FormCheckBox>
                      </FormGroup>,
                    ]
                  : ""}
                {definition_type == "start_and_period"
                  ? [
                      <FormGroup
                        label={t(`Starting at nth ${m_args.single_label}`)}
                        helperText={t(
                          `Please provide a value of time unit to determine when will the trigger start.`
                        )}
                      >
                        <GFormInput
                          type="number"
                          small={true}
                          min={m_args.scope_begin}
                          max={m_args.scope_end}
                          onChange={(val) => {
                            model[
                              "crontab_source_period_start_at_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          value={
                            model[
                              "crontab_source_period_start_at_" +
                                m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                      <FormGroup
                        label={t(
                          `Periodically trigger it in per n ${m_args.single_label}`
                        )}
                        helperText={t(
                          `Please provide a value of time unit to determine the periodical trigger time.`
                        )}
                      >
                        <GFormInput
                          type="number"
                          min={m_args.scope_begin}
                          max={m_args.scope_end}
                          onChange={(val) => {
                            model[
                              "crontab_source_period_per_" + m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          small={true}
                          value={
                            model[
                              "crontab_source_period_per_" + m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                    ]
                  : ""}
                {definition_type == "nearest_weekday"
                  ? [
                      <FormGroup
                        label={
                          t(`The nearest weekday of the n day in a month`) +
                          `(1-31)`
                        }
                        helperText={t(
                          `Please specify a day of month, then Cron will start at the nearest weekday after the day of month you specified.`
                        )}
                      >
                        <GFormInput
                          type="number"
                          small={true}
                          onChange={(val) => {
                            model[
                              "crontab_source_nearest_weekday_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          value={
                            model[
                              "crontab_source_nearest_weekday_" +
                                m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                    ]
                  : ""}
                {definition_type == "last_nth_week_of_the_month"
                  ? [
                      <FormGroup
                        label={t(`Last nth week of the month`) + `(1-4)`}
                        helperText={t(
                          `Please specify nth week of month, then Cron will run at that week you specified.`
                        )}
                      >
                        <GFormInput
                          min={1}
                          max={4}
                          type="number"
                          small={true}
                          onChange={(val) => {
                            model[
                              "crontab_source_last_nth_week_of_the_month_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          value={
                            model[
                              "crontab_source_last_nth_week_of_the_month_" +
                                m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                    ]
                  : ""}
                {definition_type == "nth_day_of_nth_week"
                  ? [
                      <FormGroup
                        label={t(`Starting at nth week`) + `(1-4)`}
                        helperText={t(
                          `Please specify nth week of month, and the specify nth day of nth week in below form controls.`
                        )}
                      >
                        <GFormInput
                          min={1}
                          max={4}
                          type="number"
                          small={true}
                          onChange={(val) => {
                            model[
                              "crontab_source_starting_nth_week_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          value={
                            model[
                              "crontab_source_starting_nth_week_" +
                                m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                      <FormGroup
                        label={t(`Starting at nth day of nth week`) + `(1-7)`}
                        helperText={t(
                          `Please specify nth day of nth week that you specified in the above form controls. For instance, 1 refers to Monday and 7 refers to Friday.`
                        )}
                      >
                        <GFormInput
                          min={1}
                          max={7}
                          type="number"
                          small={true}
                          onChange={(val) => {
                            model[
                              "crontab_source_starting_nth_day_of_nth_week_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          value={
                            model[
                              "crontab_source_starting_nth_day_of_nth_week_" +
                                m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                    ]
                  : ""}
                {definition_type == "range"
                  ? [
                      <FormGroup
                        label={t(`Starting value in the Range`)}
                        helperText={t(
                          `Please provide a numeric value to use as the starting value in the range.`
                        )}
                      >
                        <GFormInput
                          min={m_args.scope_begin}
                          max={m_args.scope_end}
                          type="number"
                          small={true}
                          onChange={(val) => {
                            model[
                              "crontab_source_range_starting_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          value={
                            model[
                              "crontab_source_range_starting_" +
                                m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                      <FormGroup
                        label={t(`Ending value in the Range`)}
                        helperText={t(
                          `Please provide a numeric value to use as the ending value in the range.`
                        )}
                      >
                        <GFormInput
                          min={m_args.scope_begin}
                          max={m_args.scope_end}
                          type="number"
                          onChange={(val) => {
                            model[
                              "crontab_source_range_ending_" +
                                m_args.timeunit_id
                            ] = val;
                            delay_call_fn_ui();
                          }}
                          small={true}
                          value={
                            model[
                              "crontab_source_range_ending_" +
                                m_args.timeunit_id
                            ]
                          }
                        />
                      </FormGroup>,
                    ]
                  : ""}
                {definition_type == "per" ? (
                  <FormGroup
                    label={t(`Wildcard Character`)}
                    helperText={t(
                      `Using a wildcard character to match what your need, * means per value of the time unit.`
                    )}
                  >
                    <GSyncSelectWithFilter
                      list={
                        m_args.wildcard_list || [
                          {
                            label: t(`*`),
                            value: "*",
                            desc_label: t(`Each ${m_args.single_label}`),
                          },
                          ...(m_args.source_aseterik_list || []),
                        ]
                      }
                      obj={model}
                      index={
                        "crontab_source_per_wildcard_chars_" +
                        m_args.timeunit_id
                      }
                      whenChg={(e) => {
                        console.log("e", e);
                        delay_call_fn_ui();
                      }}
                    ></GSyncSelectWithFilter>
                  </FormGroup>
                ) : (
                  ""
                )}
                {definition_type == "last_day_of_each_month" ? (
                  <FormGroup
                    label={t(`Last day of each month`)}
                    helperText={t(
                      `Using a specified character to match what your need, here by the L means the last day of each month.`
                    )}
                  >
                    <GSyncSelectWithFilter
                      list={[
                        {
                          label: t(`L`),
                          value: "L",
                          desc_label: t(`The last day of each month`),
                        },
                      ]}
                      obj={model}
                      index={
                        "crontab_source_last_day_of_each_month_" +
                        m_args.timeunit_id
                      }
                      whenChg={(e) => {
                        console.log("e", e);
                        delay_call_fn_ui();
                      }}
                    ></GSyncSelectWithFilter>
                  </FormGroup>
                ) : (
                  ""
                )}
              </div>
            );
          };
          let jsx_output = observer((props) => {
            let resizekey = "time_crontab_btm";
            let format_cron_no_second = "";
            if (!_.isNil(model["crontab_output_cron_general"])) {
              format_cron_no_second = _.chain(
                model["crontab_output_cron_general"].split(" ")
              )
                .drop(1)
                .join(" ")
                .value();
            }
            return (
              <HalfResizeForTwoHorizontal
                defaultPercent={0.6}
                value={gstore.localSettings[resizekey]}
                onChg={(val) => {
                  gstore.localSettings[resizekey] = val;
                }}
                leftJsx={
                  <div className="w100 h100 pd-10">
                    <FormGroup
                      label={
                        t(`Cron Expression with supporting seconds part`) +
                        t(`[Seconds, Minutes, Hours, Day, Month, Week, Year]`)
                      }
                      helperText={t(
                        `The cron expression will be generated accordingly when you modify the UI definition above.`
                      )}
                    >
                      <InputGroup
                        onChange={(e) => {
                          model["crontab_output_cron_general"] =
                            gutils.getValueFromE(e);
                        }}
                        small={true}
                        value={model["crontab_output_cron_general"]}
                        rightElement={[
                          <Button
                            text={t(`Copy Cron`)}
                            intent={"primary"}
                            small={true}
                            onClick={() => {
                              gutils.copyWithAlert(
                                model["crontab_output_cron_general"]
                              );
                            }}
                          ></Button>,
                          <Button
                            text={t(`Reverse Cron`)}
                            intent={"success"}
                            onClick={() => {
                              parse_cron_back_to_ui();
                            }}
                            small={true}
                          ></Button>,
                        ]}
                      />
                    </FormGroup>
                    <FormGroup
                      style={{ width: "100%" }}
                      label={
                        t(`Cron Expression for Linux/Unix CronTab`) +
                        t(`[Minutes, Hours, Day, Month, Week, Year]`) +
                        t(`(Read-Only)`)
                      }
                      helperText={t(
                        `Due to the limitation of Linux/Unix Crontab, it doesn't support using seconds part, therefore you can use this form controls if you want to use the expression without seconds part.`
                      )}
                    >
                      <InputGroup
                        readOnly={true}
                        disabled={true}
                        small={true}
                        value={format_cron_no_second}
                        rightElement={
                          <Button
                            text={t(`Copy Cron`)}
                            intent={"primary"}
                            small={true}
                            onClick={() => {
                              gutils.copyWithAlert(format_cron_no_second);
                            }}
                          ></Button>
                        }
                      />
                    </FormGroup>
                  </div>
                }
                rightClz="needleftborder"
                rightJsx={PUtils.jsx.panelWithTitle({
                  title: `Preview - Time Schedule of Cron Trigger`,
                  jsx: PUtils.jsx.createGEditor({
                    fontSize: 11,
                    wordWrap: "off",
                    key: "time_crontab_editor",
                    language: "markdown",
                    initContent: ``,
                  }),
                })}
              />
            );
          });
          PUtils.fn.fn_init_ui(() => {
            delay_call_fn_ui();
          });
          return PUtils.jsx.createPanelWithBtnControls({
            controls: [
              {
                text: t(`Generate Cron by UI Config`),
                intent: "primary",
                onClick: async () => {
                  await fn_generate_cron_by_ui();
                  gutils.alertOk(`Generated Cron Expression.`);
                },
              },
              {
                text: t(`Preview Cron Time Schedule`),
                intent: "primary",
                onClick: async () => {
                  await fn_get_all_crontab_list(
                    model["crontab_output_cron_general"]
                  );
                  // gutils.alertOk(`Generated Cron Preview Time Schedule.`);
                },
              },
              {
                text: t(`Parse Cron Back to UI Config`),
                intent: "success",
                onClick: () => {
                  parse_cron_back_to_ui();
                },
              },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  top: React.createElement(
                    observer((props) =>
                      PUtils.jsx.tabWithDefinition({
                        default_select_tab: "second",
                        key: "crontab_timeunit",
                        list: [
                          ..._.map(all_time_unit, (x, d, n) => {
                            return {
                              label: t(x.label),
                              jsx: observer((props) => {
                                return fn_createFormForTimeUnit({
                                  ...x,
                                });
                              }),
                            };
                          }),
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      })
                    )
                  ),
                  percent: 0.5,
                  btm: React.createElement(
                    observer((props) => (
                      <div className="w100 h100 withbordertop">
                        {PUtils.jsx.tabWithDefinition({
                          default_select_tab: "general",
                          key: "crontab_result",
                          list: [
                            {
                              label: t(`Output`),
                              mode_jsx_func: true,
                              jsx: jsx_output,
                            },
                          ],
                        })}
                      </div>
                    ))
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
