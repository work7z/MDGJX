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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = {
  initialState() {
    return {
      wordWrap: "on",
      myvalue: 12345,
      sourceLang: "auto",
      targetLang: "zh",
    };
  },
  menus: [
    {
      pid: "translate",
      children: [
        {
          label: "Properties Translate",
          icon: "data-lineage",
          pid: "TranslateForProperties",
        },
      ],
    },
  ],
  render: fn_otherPages.translate({
    type: "properties",
    language: "properties",
    totalTitle: "Properties Translate",
    initContent: `// ${t(`modify source`)}
function beforeTranslate(value){
    return value;
}

// ${t(`modify target`)}
function afterTranslate(value){ 
    return value;
}

// ${t(`the entire translate logic created for the Properties that you passed`)}
function translateEntireLogic(list, fn_translate, fn_saveResult){
    // ${t(`iterating these items which was joined by the new line character `)}
    _.forEach(list,({key, value}, index, obj)=>{
        // fn_translate, ${t(
          `that function is used as sending requests to CodeGen server`
        )}
        fn_translate(
          beforeTranslate(value)
        ).then(result=>{
          // ${t(
            `after retrieved the translate result from server, you can invoke this function so as to save the result`
          )} 
          // ${t(`fn_saveResult, which was created for saving the result`)}
          fn_saveResult(index, key, afterTranslate(result))
        })
    })
}`,
    exampleStr: `User Name=User Name
I like CodeGen=I like CodeGen
Published a year ago=Published a year ago
Restart Server=Restart Server
Create Connection=Create Connection`,
  }),
};
