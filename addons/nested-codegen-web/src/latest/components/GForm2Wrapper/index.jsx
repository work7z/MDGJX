import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  TextArea,
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
import { useState, useEffect } from "react";

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
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";

export default observer((props) => {
  let { modelObj, saveglobalkey, validConditions } = props;
  const modelKeys = {
    model: "addModel",
    failures: "addModelFailures",
    isAllPass: "isAddModelPass",
  };
  if (_.isNil(window[saveglobalkey])) {
    window[saveglobalkey] = _.cloneDeep(modelObj[modelKeys.model]);
  }
  const model = window[saveglobalkey];
  const modelFailures = modelObj[modelKeys.failures];
  function validateCurrentX(x, finval) {
    let isDanger = false,
      dangerTooltip = null;
    if (
      x.need &&
      (_.isNil(finval) ||
        (_.isString(finval) && finval.length == 0) ||
        (finval.length == 0 && _.isArray(finval)))
    ) {
      isDanger = true;
      dangerTooltip = t("Value cannot be empty");
    }
    let strval = "" + (_.isNil(finval) ? "" : finval);
    if (x.max && strval.length >= x.max) {
      isDanger = true;
      dangerTooltip = t("Value length cannot greater than maximum {0}", x.max);
    }
    if (x.validator) {
      let isok = x.validator(finval);
      if (!isok) {
        isDanger = true;
        dangerTooltip = t(
          x.errorText ||
            "The formatting of value mismatches with the validate rule."
        );
      }
    }

    return {
      isDanger,
      dangerTooltip,
    };
  }
  return (
    <Example>
      {_.chain(validConditions)
        .map((x, d, n) => {
          let mycrtid = x.prop;
          const CrtTag = x.jsx;
          let extraFormGroupsProps = {
            helperText: t(x.tooltip),
          };
          if (_.isNil(model[x.prop]) && x.defaultValue) {
            gutils.defer(() => {
              model[x.prop] = x.defaultValue;
            });
          }
          const crtValidObj = modelFailures[x.prop];
          if (crtValidObj) {
            extraFormGroupsProps.intent = "danger";
            extraFormGroupsProps.helperText = crtValidObj.dangerTooltip;
          }
          function checkTotalValid() {
            return _.chain(validConditions)
              .filter((xx) => xx.prop != x.prop)
              .map((x) => validateCurrentX(x, model[x.prop]))
              .thru((x) => {
                for (let e of x) {
                  if (e && e.isDanger) {
                    return false;
                  }
                }
                return true;
              })
              .value();
          }
          const updateFuncMiles = 50;
          const debounce = (x) => x;
          const deleteModelFailuresFunc = debounce(() => {
            delete modelFailures[x.prop];
          }, 500);
          const updateAllPassFunc = debounce((isAllPass) => {
            modelObj[modelKeys.isAllPass] = isAllPass;
          }, 500);
          const updateFuncDelay = debounce((finval) => {
            model[x.prop] = finval;
          }, updateFuncMiles);
          const chgfunc = (temp1, configForChg = {}) => {
            _.defaultsDeep(configForChg, {
              needUpdateValue: true,
              forceUpdateNow: true,
            });
            let finval = temp1;
            if (
              _.get(temp1, "__proto__.constructor.name") === "SyntheticEvent"
            ) {
              finval = temp1.target.value;
            }
            const { dangerTooltip, isDanger } = validateCurrentX(x, finval);
            let isAllPass = null;
            if (isDanger) {
              isAllPass = false;
            } else {
              isAllPass = checkTotalValid();
            }
            if (isAllPass != null) {
              gutils.whenBlurFunc.push(() => {
                updateAllPassFunc(isAllPass);
              });
            }
            if (isAllPass == false && modelObj[modelKeys.isAllPass] == true) {
              updateAllPassFunc(false);
            }

            if (!isDanger && modelFailures[x.prop]) {
              deleteModelFailuresFunc();
            }
            if (isDanger) {
              modelFailures[x.prop] = {
                dangerTooltip,
              };
            }
            console.log("changing", finval, x, configForChg);
            updateFuncDelay(finval);
            // if (configForChg.needUpdateValue) {
            // }
            if (configForChg.forceUpdateNow) {
              window.tmp_modelObj = modelObj;
              modelObj.updateRef++;
            }
          };
          const put_value = model[x.prop];
          const put_onchg = (...args) => {
            try {
              return chgfunc(...args);
            } catch (e) {
              //debugger;
              console.error("fail", e);
              throw e;
            }
          };
          gutils.wakeobj[modelKeys.wakekey + "." + mycrtid] = () => {
            gutils.defer(() => {
              put_onchg(model[x.prop]);
            });
          };
          if (x.type == "html") {
            return (
              <div
                key={x.prop}
                style={{
                  margin: "0 0 15px",
                }}
              >
                {x.value({
                  value: put_value,
                  onChange: put_onchg,
                })}
              </div>
            );
          }
          const showFunc = x.show;
          if (showFunc) {
            if (!showFunc(model)) {
              return null;
            }
          }
          return (
            <FormGroup
              {...extraFormGroupsProps}
              label={t(x.label)}
              labelFor={mycrtid}
              labelInfo={x.need ? t("(required)") : ""}
              key={x.prop}
            >
              <CrtTag
                tempRef={modelObj.updateRef}
                key={modelObj.updateRef}
                intent={extraFormGroupsProps.intent}
                id={mycrtid}
                placeholder={x.placeholder}
                value={put_value}
                onChange={put_onchg}
                onChangeDelay={debounce(chgfunc, 300)}
              />
            </FormGroup>
          );
        })
        .filter((x) => !_.isNil(x))
        .value()}
    </Example>
  );
});
