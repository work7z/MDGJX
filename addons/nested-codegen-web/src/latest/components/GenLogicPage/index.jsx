import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Popover,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  TextArea,
  Menu,
  MenuItem,
  Intent,
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
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState, useEffect, useRef } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import {autorun, reaction, observable, observe } from 'mobx'
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import OperationPanel from "../OperationPanel";
import GEditor from "../GEditor";
import HalfResizeForTwoHorizontal from "../HalfResizeForTwoHorizontal";
import HalfResizeForTwo from "../HalfResizeForTwo";
import Blink from "../Blink/index";
import BeautifyCodeCommon from "../BeautifyCodeCommon";
import prettier from "prettier/esm/standalone.mjs";
import parserGraphql from "prettier/esm/parser-graphql.mjs";
import GFileSettingViewer from "../GFileSettingViewer/index";
import _ from "lodash";
import InternalLeftEditor from "../InternalLeftEditor";
import RightMainInternalPage from "../RightMainInternalPage";
import GSyncSelectWithFilter from "../GSyncSelectWithFilter";
import constants from "../../constants";
import GFormCheckbox from "../GFormCheckbox";
import LocalProjectBtnWithPanel from "../../components/LocalProjectBtnWithPanel";
import TextAreaWithExample from "../TextAreaWithExample";
import DbLinkConnectionSelect from "../DbLinkConnectionSelect";
import GTabs from "../../components/GTabs";
import MultipleLinesEditWithButton from "../MultipleLinesEditWithButton";
import TerminalView from "../TerminalView";
import OutputFileExplorer from "../OutputFileExplorer";
import CallOutWithKeep from "../CallOutWithKeep";
import GFormSwitch from "../GFormSwitch";

window.prettier = prettier;
window.parserGraphql = parserGraphql;
window.MultipleLinesEditWithButton = MultipleLinesEditWithButton;

let commonStyleForWrapper = {
  padding: "8px",
  overflow: "auto",
  maxHeight: "100%",
  height: "100%",
};

let form_ipt_create = (obj, xxxprops) => {
  let { crtStoreName, myviewtext, myconfig } = xxxprops;
  let mmobj = multiSpreadsFn({ crtStoreName, myconfig });
  let {
    saveModel,
    resizekey,
    right_tabs,
    extra_for_codegenerator,
    model,
    crtStore,
    preval,
    crtPath,
    mappingObj,
  } = mmobj;
  return (
    <FormGroup helperText={t(obj.helperText)} label={t(obj.label)}>
      <InputGroup
        large={false}
        asyncControl={true}
        key={crtStoreName + obj.keyname}
        {...gutils.bindSimpleIpt({
          model: model,
          key: obj.keyname,
          prefn() {},
        })}
        onBlur={() => {}}
      />
    </FormGroup>
  );
};

window.form_ipt_create = form_ipt_create;

let TopLeftJsx = observer((xxxprops) => {
  let { crtStoreName, myconfig } = xxxprops;
  let mmobj = multiSpreadsFn({ crtStoreName, myconfig });
  let { model } = mmobj;
  return (
    <div style={commonStyleForWrapper}>
      {[
        <FormGroup
          helperText={t(
            "Please select the source type that you want CodeGen to read meta information and then create the related result"
          )}
          label={t("Source Definition")}
        >
          <GSyncSelectWithFilter
            obj={model}
            list={[
              {
                label: t(`JSON`),
                value: "json",
              },
              {
                label: t(`Database`),
                value: "database",
              },
            ]}
            index={"gen_generate_source_definition"}
            whenChg={(x) => {
              model.gen_generate_source_definition = x;
            }}
          />
        </FormGroup>,

        model.gen_generate_source_definition == "database" ? (
          <FormGroup helperText={t(``)} label={t("Database Connection")}>
            <DbLinkConnectionSelect
              obj={model}
              keyname="gen_generate_connection_id"
            />
          </FormGroup>
        ) : model.gen_generate_source_definition == "json" ? (
          <FormGroup
            helperText={t(
              `Please input the JSON into the form controls so that CodeGen can be able to generate the corresponding results`
            )}
            label={t("User Input")}
          >
            <TextAreaWithExample
              example={gutils.example_json}
              value={model.gen_generate_source_json}
              onChange={(val) => {
                console.log("do changing", val);
                model.gen_generate_source_json = val;
              }}
            />
          </FormGroup>
        ) : (
          ""
        ),
        <FormGroup
          helperText={t(
            "Support selecting multiple folders, CodeGen will save generated results into these folders then."
          )}
          label={t("Target Folders")}
        >
          <ButtonGroup>
            <LocalProjectBtnWithPanel
              whenChg={async () => {
                let relatedProjectsRes = await gutils.opt(
                  "/dg/getRelatedProjectByConfig",
                  {
                    config: model.config,
                  }
                );
                console.log("relatedProjectsRes", relatedProjectsRes);
                let myactualpath = _.chain(relatedProjectsRes.content)
                  .map((x) => x)
                  .join("\n")
                  .value();
                model.gen_config_actual_folders_for_dto = myactualpath;
              }}
              config={model.config}
            />
          </ButtonGroup>
        </FormGroup>,
      ]}
    </div>
  );
});

let JSX_MAIN_TOP = observer((xxxprops) => {
  let { crtStoreName, myconfig } = xxxprops;
  let mmobj = multiSpreadsFn({ crtStoreName, myconfig });
  let {
    saveModel,
    resizekey,
    model,
    right_tabs,
    extra_for_codegenerator,
    crtStore,
    preval,
    crtPath,
    mappingObj,
  } = mmobj;

  let jsx_rightTop = (
    <HalfResizeForTwoHorizontal
      // defaultPercent={0.318}
      defaultLeftWidthValue={265}
      value={gstore.localSettings[resizekey]}
      onChg={(val) => {
        gstore.localSettings[resizekey] = val;
      }}
      leftJsx={<TopLeftJsx {...xxxprops} />}
      rightJsx={<TopRightJsx {...xxxprops} />}
      rightClz="needleftborder"
    ></HalfResizeForTwoHorizontal>
  );
  const myref = useRef({
    saveNow: true,
    noLeftValue: false,
    topScrollTop: 0,
    onTObj: null,
  });
  return (
    <div
      onScroll={(e) => {
        // let scrollTop = e.target.scrollTop;
        // console.log("scrollTop", scrollTop);
        // myref.current.topScrollTop = scrollTop;
      }}
      otherprefix="ok"
      // style={{}}
      key={"fixedlogic" + crtStoreName}
      style={{
        padding: "0px",
        margin: "0px",
        width: "100%",
        height: "100%",
      }}
      className=""
    >
      {jsx_rightTop}
    </div>
  );
});

let TopRightJsx = observer((xxxprops) => {
  let { crtStoreName, myviewtext, myconfig } = xxxprops;
  let mmobj = multiSpreadsFn({ crtStoreName, myconfig });
  let {
    saveModel,
    resizekey,
    model,
    right_tabs,
    extra_for_codegenerator,
    crtStore,
    preval,
    crtPath,
    mappingObj,
  } = mmobj;
  return (
    <GTabs
      small={true}
      calcAutoHeight={true}
      noAllowAutoAdjust={true}
      noOptBtn={true}
      defaultViewTitle={"Overview"}
      defaultViewJsx={<div>empty</div>}
      mapid={crtStoreName + "forgen"}
      onChangeTab={(x) => {
        model.extra_for_codegenerator.right_tabs.value = x;
      }}
      obj={{
        value: model.extra_for_codegenerator.right_tabs.value,
        list: [
          {
            label: t("General"),
            id: "general",
            closable: false,
          },
          {
            label: myviewtext,
            id: "lang",
            closable: false,
          },
          {
            label: t("Include Filter"),
            id: "include_filter",
            closable: false,
          },
          {
            label: t("Exclude Filter"),
            id: "exclude_filter",
            closable: false,
          },
          {
            label: t("Other"),
            id: "other",
            closable: false,
          },
        ],
      }}
      renderTabPane={(x, d, n) => {
        let myresult = <div>{t("no related configuration at present")}</div>;
        let exclude_clz_str = [
          `# ${t(`Formatting`)}: ClassName`,
          `# ${t(
            `Please be noted that the case of class name depends on your naming rule, if you set the case as Hungarian mode, then the table name should be matched as Class_name`
          )}`,
          ``,
          `UserTables`,
          `User_role`,
          `User.*`,
          `.*Role$`,
        ].join("\n");
        let exclude_field_str = [
          `# ${t(
            `CodeGen will match the name from the generated result within the case insensitive mode.`
          )}`,
          ``,
          `# ${t(`Formatting`)}: ClassName@fieldName `,
          ``,
          ``,
          "# " + t(`you can filter all fields by the regex below`),
          "UserTables@.*",
          ``,
          ``,
          `# ${t(`or just some concrete class name and its field name`)}`,
          "UserTables@createTime",
          ``,
          ``,
          `# ${t(
            `By using regex matcher, you can skip multiple fields in the same class`
          )}`,
          "user_tables@create.*",
          ``,
          ``,
          `# ${t(
            `If you want to skip the field that exists in all of classes, you can input as below.`
          )}`,
          ".*@create_time",
        ].join("\n");
        let exclude_database_str = [
          `# ${t(`Formatting`)}: mydatabase`,
          `# ${t(
            `The regex definitions you inputted works in database mode only.`
          )}`,
          ``,
          `mydatabase`,
          `userdb`,
          `test.*`,
          `.*db`,
        ].join("\n");
        let nnn_1 = `CodeGen will only proceed with the operation for those items whose name matches with at least one of your regex definitions`;
        switch (x.id) {
          case "general":
            myresult = [
              <FormGroup
                helperText={t(
                  "The listings was calculated automactically after you selected the target projects, but you still can modify the value manually."
                )}
                label={t("Actual Output Folders")}
              >
                <MultipleLinesEditWithButton
                  obj={model}
                  index={"gen_config_actual_folders_for_dto"}
                />
              </FormGroup>,
              <FormGroup
                helperText={t(
                  `CodeGen will use this rule value when generating the name of class or field`
                )}
                label={t("Naming Rules")}
              >
                <GSyncSelectWithFilter
                  obj={model}
                  list={[
                    {
                      label: t(`Auto`),
                      value: "auto",
                    },
                    {
                      label: t(`Camel Case Naming Rule`),
                      value: "camel",
                    },
                    {
                      label: t(`Hungarian Case Naming Rule`),
                      value: "hungarian",
                    },
                    {
                      label: t(`Upper All Characters Case`),
                      value: "upperAll",
                    },
                    {
                      label: t(`Lower All Characters Case`),
                      value: "lowerAll",
                    },
                  ]}
                  index={"gen_config_naming_rules"}
                  whenChg={(x) => {
                    model.gen_config_naming_rules = x;
                  }}
                />
              </FormGroup>,
              <FormGroup>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    model.extra_for_codegenerator.right_tabs.value = "lang";
                  }}
                >
                  {t(`View {0} Code Configuration`, myviewtext)}
                </a>
              </FormGroup>,
            ];
            break;
          case "lang":
            switch (crtStoreName) {
              case "genDto_java":
              case "genDto_scala":
              case "genDto_kotlin":
              case "genDto_groovy":
              case "genDto_clojure":
                myresult = [
                  form_ipt_create(
                    {
                      keyname: "gen_config_package",
                      helperText:
                        "If this field is empty, CodeGen will generate the file with no declaring package information",
                      label: "Package(Optional)",
                    },
                    xxxprops
                  ),
                ];
                break;
              case "genDto_csharp":
                myresult = [
                  form_ipt_create(
                    {
                      keyname: "gen_config_package",
                      helperText:
                        "If this field is empty, CodeGen will generate the file with no declaring namespace information",
                      label: "Namespace(Optional)",
                    },
                    xxxprops
                  ),
                ];
                break;
            }
            break;
          case "other":
            myresult = [
              <FormGroup
                helperText={t(
                  "If you want to skip these exsitent files, please turn it off."
                )}
                label={t("Overwrite when the file already exists?")}
              >
                <GSyncSelectWithFilter
                  obj={model}
                  list={[
                    {
                      label: t(`Yes`),
                      value: "yes",
                    },
                    {
                      label: t(`No, Skip these existent files`),
                      value: "no",
                    },
                  ]}
                  index={"gen_config_overwrite_when_exists"}
                  whenChg={(x) => {
                    model.gen_config_overwrite_when_exists = x;
                  }}
                />
              </FormGroup>,
              <FormGroup
                helperText={t(
                  "If you want to clean the old files before starting, please turn it on."
                )}
                label={t("Clean target folder before start generating?")}
              >
                <GSyncSelectWithFilter
                  obj={model}
                  list={[
                    {
                      label: t(`Yes`),
                      value: "yes",
                    },
                    {
                      label: t(`No`),
                      value: "no",
                    },
                  ]}
                  index={"gen_config_delete_before_run"}
                  whenChg={(x) => {
                    model.gen_config_delete_before_run = x;
                  }}
                />
              </FormGroup>,
              <FormGroup
                helperText={t(
                  "If you want to generate results into the same file, please turn it on."
                )}
                label={t("All In One?")}
              >
                <GSyncSelectWithFilter
                  obj={model}
                  list={[
                    {
                      label: t(`Yes`),
                      value: "yes",
                    },
                    {
                      label: t(`No`),
                      value: "no",
                    },
                  ]}
                  index={"gen_config_all_in_one"}
                  whenChg={(x) => {
                    model.gen_config_all_in_one = x;
                  }}
                />
              </FormGroup>,
            ];
            break;
          case "include_filter":
            myresult = [
              ...(model.gen_generate_source_definition == "database"
                ? [
                    <FormGroup
                      helperText={
                        t("Support inputting multiple regex matcher. ") +
                        t(nnn_1)
                      }
                      label={t("Including Specific Databases")}
                    >
                      <MultipleLinesEditWithButton
                        obj={model}
                        index={"gen_config_filter_database_including"}
                        example={exclude_database_str}
                      />
                    </FormGroup>,
                  ]
                : []),
              <FormGroup
                helperText={
                  t("Support inputting multiple regex matcher. ") + t(nnn_1)
                }
                label={t("Including Specific Classes")}
              >
                <MultipleLinesEditWithButton
                  obj={model}
                  index={"gen_config_filter_class_including"}
                  example={exclude_clz_str}
                />
              </FormGroup>,
              <FormGroup
                helperText={
                  t("Support inputting multiple regex matcher. ") + t(nnn_1)
                }
                label={t("Including Speicifc Fields")}
              >
                <MultipleLinesEditWithButton
                  obj={model}
                  index={"gen_config_filter_field_including"}
                  example={exclude_field_str}
                />
              </FormGroup>,

              <FormGroup
                helperText={t(
                  "If you want to disable these rules above, you can turn it off."
                )}
                label={t("Operating Status")}
              >
                <GFormSwitch
                  valtype={"tf"}
                  onChange={(val) => {
                    model["gen_config_turnon_including"] = val;
                  }}
                  value={model["gen_config_turnon_including"]}
                />
              </FormGroup>,
            ];
            break;
          case "exclude_filter":
            myresult = [
              gstore.localSettings["filterviewdd"] ? (
                ""
              ) : (
                <FormGroup>
                  <CallOutWithKeep
                    keyname="filterviewdd"
                    title={`If you already set the include filter, please be noted that the excluding scope will be limited to the result-set that was filtered by the corresponding include filter.`}
                  ></CallOutWithKeep>
                </FormGroup>
              ),
              ...(model.gen_generate_source_definition == "database"
                ? [
                    <FormGroup
                      helperText={t(
                        "Support inputting multiple regex matcher. If CodeGen found a database whose name matches with your definition, then the generated result will not include that database."
                      )}
                      label={t("Excluding Specific Databases")}
                    >
                      <MultipleLinesEditWithButton
                        obj={model}
                        index={"gen_config_filter_database"}
                        example={exclude_database_str}
                      />
                    </FormGroup>,
                  ]
                : []),
              <FormGroup
                helperText={t(
                  "Support inputting multiple regex matcher. If CodeGen found a class file whose name matches with your definition, then the generated result will not include that class."
                )}
                label={t("Excluding Specific Classes")}
              >
                <MultipleLinesEditWithButton
                  obj={model}
                  index={"gen_config_filter_class"}
                  example={exclude_clz_str}
                />
              </FormGroup>,
              <FormGroup
                helperText={t(
                  "Support inputting multiple regex matcher. If CodeGen found a filed whose name matches with your definition, then the generated result will not include that field."
                )}
                label={t("Excluding Speicifc Fields")}
              >
                <MultipleLinesEditWithButton
                  obj={model}
                  index={"gen_config_filter_field"}
                  example={exclude_field_str}
                />
              </FormGroup>,

              <FormGroup
                helperText={t(
                  "If you want to disable these rules above, you can turn it off."
                )}
                label={t("Operating Status")}
              >
                <GFormSwitch
                  valtype={"tf"}
                  onChange={(val) => {
                    model["gen_config_turnon_excluding"] = val;
                  }}
                  value={model["gen_config_turnon_excluding"]}
                />
              </FormGroup>,
            ];
            break;
        }
        return <div style={commonStyleForWrapper}>{myresult}</div>;
      }}
    />
  );
});

let JSX_MAIN_BTM = observer((xxxprops) => {
  let { crtStoreName, myviewtext, myconfig } = xxxprops;
  let mmobj = multiSpreadsFn({ crtStoreName, myconfig });
  let {
    saveModel,
    resizekey,
    right_tabs,
    extra_for_codegenerator,
    model,
    crtStore,
    preval,
    crtPath,
    mappingObj,
  } = mmobj;

  useEffect(() => {
    let fn = reaction(
      () => {
        return [
          _.chain(crtStore.model)
            .mapKeys((x) => {
              return x;
            })
            .value(),
        ];
      },
      () => {
        saveModel();
      }
    );
    return () => {
      fn();
    };
  }, []);

  useEffect(() => {
    let fn = reaction(
      () => {
        return [
          _.chain(model.config)
            .mapKeys((x) => x)
            .value(),
          _.chain(model.config.scope_SpecifiedProjects)
            .mapKeys((x) => x)
            .value(),
        ];
      },
      _.debounce(async () => {}, 100)
    );
    return () => {
      fn();
    };
  }, []);

  return (
    <GTabs
      small={true}
      calcAutoHeight={true}
      noAllowAutoAdjust={true}
      noOptBtn={true}
      defaultViewTitle={"Overview"}
      defaultViewJsx={<div>empty</div>}
      mapid={crtStoreName + "forgenbtm"}
      onChangeTab={(x) => {
        model.extra_for_codegenerator.result_tabs.value = x;
      }}
      obj={{
        value: model.extra_for_codegenerator.result_tabs.value,
        list: [
          {
            label: t("Preview"),
            id: "preview",
            closable: false,
          },
          // {
          //   label: t("Results"),
          //   id: "results",
          //   closable: false,
          // },
          // {
          //   label: t("History"),
          //   id: "history",
          //   closable: false,
          // },
          {
            label: t(
              "Loggings({0})",
              _.size(crtStore.gen_obj.running_loggings)
            ),
            id: "loggings",
            closable: false,
          },
        ],
      }}
      // TODO: bugs maybe here
      renderTabPane={(x, d, n) => {
        let LoadingView = observer((props) => (
          <div style={{ padding: "5px" }}>{t("Loading...")}</div>
        ));
        switch (x.id) {
          case "loggings":
            return <TerminalView list={crtStore.gen_obj.running_loggings} />;
            break;
          case "results":
            return crtStore.loading.isLoadingForPrimaryAction ? (
              <LoadingView />
            ) : (
              <OutputFileExplorer
                key={crtStoreName + "zzrtkk"}
                obj={model}
                lang={_.toLower(crtStoreName.replaceAll("genDto_", ""))}
                resizekey={crtStoreName + "zzrt"}
                index={"gen_output_folder_result_idx"}
                list={model.gen_output_folder_result}
              />
            );
            break;
          case "preview":
            return crtStore.loading.isLoadingForSecondaryAction ? (
              <LoadingView />
            ) : (
              <OutputFileExplorer
                key={crtStoreName + "zzrtpreview"}
                obj={model}
                lang={_.toLower(crtStoreName.replaceAll("genDto_", ""))}
                resizekey={crtStoreName + "zzpreview"}
                index={"gen_output_folder_preview_idx"}
                list={model.gen_output_folder_preview}
              />
            );
            break;
        }
      }}
    />
  );
});

let multiSpreadsFn = ({ myconfig, crtStoreName }) => {
  let crtPath = myconfig.path;
  let crtStore = gstore.common_app[crtStoreName];
  let model = crtStore.model;
  let { extra_for_codegenerator } = model;
  let right_tabs = extra_for_codegenerator.right_tabs;

  let saveModel = _.debounce(() => {
    gutils.api.common_app.common.saveModelById(crtStoreName);
  }, 300);
  let resizekey = crtStoreName + "horitoprisize";
  return {
    saveModel,
    resizekey,
    right_tabs,
    extra_for_codegenerator,
    model,
    crtStore,
    crtPath,
  };
};

export default observer((props) => {
  let crtStoreName = props.crtStoreName;
  let { myconfig } = props;

  let mappingObj = {
    php: "PHP",
    cpp: "C++",
    csharp: "C#",
    es5: "ES5 Prototype",
  };
  let crtPath = myconfig.path;
  let mytotaltitle = "none";
  let crtStore = gstore.common_app[crtStoreName];
  let preval = myconfig.path.replace("gen_dto_", "");
  let myviewtext = mappingObj[preval] || _.upperFirst(preval);
  if (crtPath.startsWith("gen_dto")) {
    mytotaltitle = t(`{0} Code Generator`, `${myviewtext}`);
  }

  const myref = useRef({
    saveNow: true,
    noLeftValue: false,
    topScrollTop: 0,
    onTObj: null,
  });

  let mypackobj = {
    myviewtext,
    crtStoreName,
    myconfig,
  };

  useEffect(() => {
    let mmobj = multiSpreadsFn(mypackobj);
    let {
      saveModel,
      resizekey,
      model,
      right_tabs,
      extra_for_codegenerator,
      crtStore,
      preval,
      crtPath,
      mappingObj,
    } = mmobj;
    let fn = reaction(
      () => {
        return [crtStore.hist.crtHistId];
      },
      () => {
        crtStore.gen_obj.running_loggings = [];
        // "_files"
        model.gen_output_folder_result_idx_files = [];
        model.gen_output_folder_preview_idx_files = [];
      }
    );
    return () => {
      fn();
    };
  }, []);

  let fn_genfn = (type, load) => {
    let mmobj = multiSpreadsFn(mypackobj);
    let {
      saveModel,
      resizekey,
      model,
      right_tabs,
      extra_for_codegenerator,
      crtStore,
      preval,
      crtPath,
      mappingObj,
    } = mmobj;
    return async () => {
      let canWorkNow = model.gen_generate_source_definition == "database";
      if (!canWorkNow && !_.isEmpty(model.gen_generate_source_definition)) {
        // gutils.alert(
        //   `Sorry, JSON type hasn't supported yet, we will release it ASAP.`
        // );
        // return;
      }
      try {
        let myparam = {
          ...model,
          type: type,
          crtStoreName: crtStoreName,
          crtHistId: crtStore.hist.crtHistId,
        };
        if (crtStore.loading[load]) {
          await gutils.opt("/gen/stopnow", myparam);
          crtStore.loading[load] = false;
          return;
        }
        crtStore.gen_obj.running_loggings = [];
        crtStore.loading[load] = true;
        // crtStore.extra_for_codegenerator.result_tabs.value = "loggings";
        model.crtLoadType = type;
        let mytyperes = await gutils.opt("/gen/action", myparam);
        let keynameForList =
          type == "preview"
            ? "gen_output_folder_preview"
            : "gen_output_folder_result";
        let keynameForValueIndex =
          type == "preview"
            ? "gen_output_folder_preview_idx"
            : "gen_output_folder_result_idx";
        let { allFolders, tempFolder } = mytyperes.content;
        // type == "preview" ? tempFolder :
        let saveFolderFinal = allFolders;
        let t111 = _.chain(saveFolderFinal)
          .map((x) => {
            return {
              desc_label: "",
              label: x["rawFolderName"],
              value: x["path"],
            };
          })
          .value();
        model[keynameForList] = t111;
        model[keynameForValueIndex] = _.get(t111, "0.value");

        // start querying related loggings
        while (true) {
          let myarrayres = await gutils.opt("/gen/read-logs", myparam);
          let crtsize = _.size(crtStore.gen_obj.running_loggings);
          let nextsize = _.size(myarrayres.content.array);
          if (crtsize != nextsize) {
            crtStore.gen_obj.running_loggings = _.chain(
              myarrayres.content.array
            )
              .map((x) => {
                let { ARGLIST } = x;
                ARGLIST = JSON.parse(ARGLIST);
                return {
                  ...x,
                  ID: x.ID,
                  CONTENT: t(x.CONTENT, ...ARGLIST),
                };
              })
              .value();
          }
          if (!myarrayres.content.isRun || model.crtLoadType != type) {
            // model.extra_for_codegenerator.right_tabs.value =
            //   type == "preview" ? "preview" : "results";
            break;
          }
          await gutils.sleep(200);
        }
        crtStore.loading[load] = false;
      } catch (err) {
        crtStore.loading[load] = false;
        console.log(err);
        throw err;
      }
    };
  };

  return (
    <BeautifyCodeCommon
      noSources={true}
      noOptions={true}
      leftTopBtmPercent={1 - 0.618}
      rightMainGlobalJsx={observer((props) => {
        return (
          <RightMainInternalPage
            containerClz={"snippetcontainer"}
            btmTitle={t("OUTPUT")}
            onDropFnForBtmJsx={() => {}}
            rightTopBtmPercent={0.5}
            btmJsxCtn={[<JSX_MAIN_BTM {...mypackobj} />]}
            topJsxCtn={<JSX_MAIN_TOP {...mypackobj} />}
          />
        );
      })}
      afterConfigItem={[
        {
          label: t("Loggings"),
          children: [
            {
              label: t("Clean Loggings"),
              onClick: () => {
                let mmobj = multiSpreadsFn(mypackobj);
                let {
                  saveModel,
                  resizekey,
                  model,
                  right_tabs,
                  extra_for_codegenerator,
                  crtStore,
                  preval,
                  crtPath,
                  mappingObj,
                } = mmobj;
                crtStore.gen_obj.running_loggings = [];
              },
            },
          ],
        },
      ]}
      crtStoreName={crtStoreName}
      noBeautifyBtn={true}
      mytotalTitle={mytotaltitle}
      noCopyBtn={true}
      beforeActionBtn={[
        // {
        //   label: t(
        //     crtStore.loading.isLoadingForPrimaryAction
        //       ? "Stop Generating"
        //       : "Generate Result"
        //   ),
        //   intent: crtStore.loading.isLoadingForPrimaryAction
        //     ? "danger"
        //     : "primary",
        //   onClick: fn_genfn("donow", "isLoadingForPrimaryAction"),
        // },
        {
          label: t(
            crtStore.loading.isLoadingForSecondaryAction
              ? "Stop Preview"
              : "Preview Result"
          ),
          intent: crtStore.loading.isLoadingForSecondaryAction
            ? "warning"
            : "primary",
          onClick: fn_genfn("preview", "isLoadingForSecondaryAction"),
        },
        // !canWorkNow ? <CallOutWithKeep keyname='nojsonsupport' title={t(``)}></CallOutWithKeep>:''
      ]}
    />
  );
});
