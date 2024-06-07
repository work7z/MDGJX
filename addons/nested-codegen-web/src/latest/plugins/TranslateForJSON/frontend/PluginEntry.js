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
import fn_otherPages from "./pages/otherPages";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = {
  initialState() {
    return {
      sourceLang: "auto",
      targetLang: "zh",
      wordWrap: "on",
      myvalue: 12345,
    };
  },
  menus: [
    {
      pid: "translate",
      children: [
        {
          rank: 0,
          label: "JSON Translate",
          icon: "signal-search",
          pid: "TranslateForJSON",
        },
      ],
    },
  ],
  render: fn_otherPages.translate({
    language: "json",
    totalTitle: "JSON Translate",
    initContent: `// ${t(`modify source`)}
function beforeTranslate(value){
    return value;
}
     
// ${t(`modify target`)}
function afterTranslate(value){
    return value;
}
    
// ${t(`the entire translate logic created for the JSON that you passed`)}
function translateEntireLogic(passedJSON,fn_translate){
    // ${t(`iterating the variable of which the type is array or object`)}
    _.forEach(passedJSON,(value,key,obj)=>{
        // fn_translate, ${t(
          `that function is used as sending requests to CodeGen server`
        )}
        fn_translate(
          beforeTranslate(value)
        ).then(result=>{
          // ${t(
            `after retrieved the translate result from server, you can assign it to the object, and then the result will be displayed in the right editor thereupon`
          )} 
            obj[key] = afterTranslate(result);
        })
    })
}`,
    exampleStr: `{
      "ID": "SGML",
      "time": "2016-07-01", 
"SortAs": "SGML",
"GlossTerm": "Standard Generalized Markup Language",
"Acronym": "SGML",
"Abbrev": "ISO 8879:1986",
"para": "A meta-markup language, used to create markup languages such as DocBook.",
"GlossSeeAlso": ["GML", "XML"],
"GlossSee": "markup"
}`,
  }),
};
