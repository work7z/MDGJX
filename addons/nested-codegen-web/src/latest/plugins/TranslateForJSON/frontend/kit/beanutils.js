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

const beanutils = {
  getValueType(x) {
    console.log("value.type", x);
    if ((x + "").indexOf("CG_TYPE_VALUE_OCT98_") != -1) {
      let mobj = JSON.parse(x.replace("CG_TYPE_VALUE_OCT98_", ""));
      console.log("value.type -> get", mobj.type);
      return mobj.type;
    }
    //     if (
    //       mobj.indexOf("int") != -1 ||
    //       mobj.indexOf("decimal") != -1 ||
    //       mobj.indexOf("short") != -1 ||
    //       mobj.indexOf("long") != -1
    //     ) {
    //       if (!_.isNil(mobj.defaultExpression)) {
    //         return {
    //           value: mobj.defaultExpression
    //         };
    //       }
    //     }
    //     //
    //     return "okkk";
    //   }
    // }
    return _.isPlainObject(x) ? "object" : _.isArray(x) ? "array" : typeof x;
  },
  isAllPrimitiveTypes(item) {
    let isAllPrivimitiveTypes = true;
    _.every(item, (x, d, n) => {
      let notPrim = _.isPlainObject(x) || _.isArray(x);
      if (notPrim) {
        isAllPrivimitiveTypes = false;
      }
      return !notPrim;
    });
    return isAllPrivimitiveTypes && _.isArray(item);
  },
  _inner_callLoop({
    arr_or_obj,
    totalResultMap,
    parentName,
    baseClzItemIfHas,
    config,
  }) {
    let fn_generateClassModel = () => {
      return {
        fields: [],
      };
    };
    if (_.isNil(totalResultMap[parentName])) {
      if (!_.isNil(baseClzItemIfHas)) {
        totalResultMap[parentName] = _.merge(
          baseClzItemIfHas,
          fn_generateClassModel()
        );
      } else {
        totalResultMap[parentName] = fn_generateClassModel();
      }
    }
    let clzItem = totalResultMap[parentName];
    // LOOPING BEGIN
    let fn_pushFieldItem = (x, d, n) => {
      return {
        fieldName: d,
        example: null,
        dataType: beanutils.getValueType(x),
        genericType: "object",
      };
    };
    let fn_format_for_clz = (x, d, n) => {
      console.log("clzItem.fields", clzItem.fields);
      if (_.findIndex(clzItem.fields, (zzz) => zzz.fieldName == d) == -1) {
        clzItem.fields.push(fn_pushFieldItem(x, d, n));
      }
      let crtField = _.find(clzItem.fields, (zzz) => zzz.fieldName == d);
      crtField.example = !config.need_example ? null : x;
      if (_.isPlainObject(x) || _.isArray(x)) {
        beanutils._inner_callLoop({
          arr_or_obj: x,
          totalResultMap,
          parentName: d,
          config,
          baseClzItemIfHas: crtField,
        });
      }
    };
    // LOOPING END
    if (_.isPlainObject(arr_or_obj)) {
      _.forEach(arr_or_obj, fn_format_for_clz);
    } else if (_.isArray(arr_or_obj)) {
      clzItem.genericType = parentName;
      if (beanutils.isAllPrimitiveTypes(arr_or_obj)) {
        let allTypes = _.uniq(
          _.map(arr_or_obj, (x) => beanutils.getValueType(x))
        );
        if (_.size(allTypes) == 1) {
          clzItem.primitiveType = true;
          clzItem.genericType = _.get(allTypes, "0");
          return;
        }
      } else {
        let allTypes = null;
        let isNotEqualSameProps = false;
        _.every(arr_or_obj, (x) => {
          if (!_.isPlainObject(x)) {
            isNotEqualSameProps = true;
            return false;
          }
          let mykey = _.map(x, (xx, dd) => {
            return {
              dataType: beanutils.getValueType(xx),
              fieldName: dd,
            };
          });
          if (_.isNil(allTypes)) {
            allTypes = mykey;
          } else {
            if (!_.isEqual(mykey, allTypes)) {
              isNotEqualSameProps = true;
              return false;
            }
          }
          return true;
        });
        if (!_.isNil(allTypes) && !isNotEqualSameProps) {
          _.forEach(allTypes, (x, d, n) => {
            let findIdxval = _.findIndex(clzItem.fields[x.fieldName], (zzz) => {
              if (_.isNil(zzz) || _.isNil(zzz.fieldName)) {
                return false;
              }
              return zzz.fieldName == x.fieldName;
            });
            console.log("clzItem.fields-2", clzItem.fields, x, findIdxval);
            if (findIdxval == -1) {
              clzItem.fields.push({
                fieldName: x.fieldName,
                example: null,
                dataType: null,
              });
            }
            let crtField = _.find(
              clzItem.fields,
              (zzz) => zzz.fieldName == x.fieldName
            );
            crtField.dataType = x.dataType;
            crtField.example = !config.need_example
              ? null
              : _.get(arr_or_obj, "0." + x.fieldName);
          });
          return;
        }
      }
      let newMergeObject = {};
      _.forEach(arr_or_obj, (x, d, n) => {
        _.merge(newMergeObject, x);
      });
      _.forEach(arr_or_obj, newMergeObject);
    } else {
      throw new Error(`Unknown type, Aug 23.`);
    }
  },
  json2bean(jsonResult, config = {}) {
    _.defaultsDeep(config, {
      need_example: false,
    });
    let totalResultMap = {};
    if (!(_.isPlainObject(jsonResult) || _.isArray(jsonResult))) {
      throw new Error(
        t(`Unknown Structure, please provide an object or array value.`)
      );
    }
    if (_.isEmpty(jsonResult)) {
      throw new Error(t(`JSON source cannot be empty.`));
    }
    if (_.isArray(jsonResult) && beanutils.isAllPrimitiveTypes(jsonResult)) {
      jsonResult = {
        RootDefinition: jsonResult,
      };
    }
    if (_.isArray(jsonResult)) {
      jsonResult = {
        RootDefinition: jsonResult,
      };
    }
    beanutils._inner_callLoop({
      arr_or_obj: jsonResult,
      totalResultMap,
      parentName: "RootDefinition",
      config,
    });
    return _.filter(
      _.map(
        _.pickBy(totalResultMap, (x, d, n) => {
          return x.primitiveType != true;
        }),
        (x, d, n) => {
          return {
            className: d,
            ...x,
          };
        }
      ),
      (x) => {
        return true;
      }
    );
  },
};
export default beanutils;
