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
  GSyncSelectWithFilter,
  Provider,
  Router,
  GFormInput,
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
import PlainTextLoggins from "../cpt/FormPlainTextLoggins/index";
import fn_otherPages from "../pages/otherPages";
import beanutils from "./beanutils";
import init_model from "./common_lang_status";
import all_lang_tempaltes from "./common_lang_template";
import cutils from "./common_utils";
import Handlebars from "handlebars";

const common_lang_function = () => {
  return {
    get_copy_result: async ({ PUtils }) => {
      let json_source = PUtils.editor.getValue({ id: "model_gen_result" });
      return json_source;
    },
    generateResultByJSONMode: async ({ PUtils, fn_convert_to_json }) => {
      let log = cutils.logs.wrapper({ PUtils });
      log.clean();
      log.info(t("Started handling the conversion..."));
      try {
        window.update_tab_index("model_result_or_loggings", "loggings");
        PUtils.crtModel.language_clazz_result_list = [];
        log.fine(
          t("Detected language type: {0}", PUtils.crtModel.language_type)
        );
        log.info(
          t("Detected template: '{0}'", PUtils.crtModel.language_template)
        );
        // JSON START
        let json_source = PUtils.editor.getValue({ id: "json_source" });
        if (fn_convert_to_json) {
          json_source = await fn_convert_to_json({ json_source });
        }
        if (PUtils.crtModel.language_format_source == "true") {
          log.info(
            t("Removing the impurities from the source value if it exists...")
          );
          log.info(t("Formatted and Verified."));
          json_source = await cutils.formatJSONWithErr(json_source);
        } else {
          log.info(t("Disabled the formatting option already."));
        }
        log.fine(t("Cool! Everything is OK."));
        log.info(t("Started analyzing the source definition..."));
        let json_source_obj = JSON.parse(json_source);
        window.tmp_beanutils = beanutils;
        let clz_result_obj = beanutils.json2bean(json_source_obj, {
          need_example: PUtils.crtModel.language_show_dft_value == "true",
        });
        if (_.isEmpty(clz_result_obj)) {
          throw new Error(
            t(
              `The result is empty, please check if the source definition has related value.`
            )
          );
        }
        log.fine(
          t(
            "Analyzed. Found {0} classes in the result. ",
            _.size(clz_result_obj)
          )
        );
        if (_.isEmpty(clz_result_obj)) {
          throw new Error(
            t(
              `There's no available class that can be generated, please check if your source definition is sufficient enough to be used.`
            )
          );
        }
        window.USER_OBJECT_OBJ_TEMP = {};
        window.eval(`
              window.addModel = (obj)=>{
                _.merge(USER_OBJECT_OBJ_TEMP,obj)
              };        
              ${PUtils.editor.getValue({ id: "language_script" })};
              ${PUtils.editor.getValue({ id: "language_user_script" })};
              delete window.addModel;
              `);
        let userModelObj = USER_OBJECT_OBJ_TEMP;
        if (_.isNil(userModelObj)) {
          userModelObj = {};
        }
        window.test100100 = clz_result_obj;
        let totalResult = [];
        let needDebugMode = PUtils.crtModel.language_debug_model == "true";
        if (!needDebugMode) {
          log.info(
            t(
              `According to the option, CodeGen will not print out related debug information.`
            )
          );
        } else {
          log.info(t(`CodeGen will print out the debug information.`));
        }
        if (needDebugMode) {
          log.debug(
            t(
              `Inspecting the options: {0}`,
              JSON.stringify(
                _.pickBy(PUtils.crtModel, (x, d, n) => {
                  return d.startsWith("language_");
                }),
                0,
                4
              )
            )
          );
        }
        _.forEach(clz_result_obj, (x, d, n) => {
          log.info(
            t(
              "Detected the class {0}, which includes {1} fields",
              x.className,
              _.size(x.fields)
            )
          );
          let templateValue = `${PUtils.editor.getValue({
            id: "language_template",
          })}`;
          let tempFn = Handlebars.compile(templateValue, { noEscape: true });
          // var tempFn =  doT.template(
          //   templateValue,
          //   {
          //     whitespace: true,
          //   }
          // );
          let modelValue = {
            ...x,
            ...userModelObj,
            ..._.pickBy(PUtils.crtModel, (x, d, n) =>
              d.startsWith("language_")
            ),
          };
          _.forEach(modelValue, (x, d, n) => {
            if (_.isFunction(x)) {
              Handlebars.registerHelper(d, x);
            }
          });
          let resultText = tempFn(modelValue);
          if (needDebugMode) {
            log.debug(
              t(
                `Writing the result for {0}, variables: {1}`,
                x.className,
                JSON.stringify(
                  _.pickBy(modelValue, (x, d, n) => {
                    return !d.startsWith("language_");
                  }),
                  0,
                  4
                )
              )
            );
          } else {
            log.debug(t(`Writing the result for {0}`, x.className));
          }
          totalResult.push({
            label: x.className,
            value: resultText,
          });
        });
        window.update_tab_index("model_result_or_loggings", "result-0");
        PUtils.editor.setValue({
          id: "model_gen_result",
          value: _.map(totalResult, (x) => x.value).join("\n\n"),
        });
        _.forEach(PUtils.crtModel, (x, d, n) => {
          if (d.startsWith("model_result_")) {
            PUtils.crtModel[d] = "";
          }
        });
        PUtils.crtModel.language_clazz_result_list = _.map(
          totalResult,
          (x, d, n) => {
            PUtils.editor.setValue({
              id: "model_result_" + x.label,
              value: x.value,
            });
            return {
              className: x.label,
              fieldsNum: _.size(x.fields),
            };
          }
        );
        PUtils.crtModel.option_showing_model_result = _.get(
          PUtils.crtModel.language_clazz_result_list,
          ["0.className"]
        );
        log.info(t(`Flushed.`));
        log.fine(t(`Done.`));
      } catch (e) {
        let msg = t(
          `An Error Occurred, Please check loggings, message: {0}`,
          cutils.getErrInfo(e)
        );
        gutils.alert({
          intent: "danger",
          message: msg,
        });
        log.severe(msg);
      }
    },
  };
};

export default common_lang_function;
