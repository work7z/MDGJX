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
          label: "PlainText Translate",
          icon: "new-text-box",
          pid: "TranslateForCustomizer",
        },
      ],
    },
  ],
  render: fn_otherPages.translate({
    type: "plaintext",
    language: "markdown",
    totalTitle: "PlainText Translate",
    initContent: `// ${t(`modify source`)}
function beforeTranslate(value){
    return value;
}

// ${t(`modify target`)}
function afterTranslate(value){ 
    return value; 
}

// ${t(`the entire translate logic created for the Properties that you passed`)}
function translateEntireLogic(entireText, fn_translate, fn_saveResult){
  fn_translate(
    beforeTranslate(entireText)
  ).then(result=>{
    // ${t(
      `after retrieved the translate result from server, you can invoke this function so as to save the result`
    )} 
    // ${t(`fn_saveResult, which was created for saving the result`)}
    let saveRowIndex = 0;
    fn_saveResult(saveRowIndex, afterTranslate(result))
  })
}`,
    exampleStr: `C++ is a cross-platform language that can be used to create high-performance applications. 
C++ was developed by Bjarne Stroustrup, as an extension to the C language. 
C++ gives programmers a high level of control over system resources and memory.,`,
  }),
};
