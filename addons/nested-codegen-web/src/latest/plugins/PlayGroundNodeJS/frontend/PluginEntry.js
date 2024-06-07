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
  HalfResizeForTwo,
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
import otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import fn_PUtils from "../../TranslateForJSON/frontend/kit/pluginUtils";
import LogQuickViewer from "../../TranslateForJSON/frontend/cpt/LogQuickViewer";
import CommonLang from "./commonLang";
import PreRequisiteJson from "../pre-requisite.json";

let extLangObj = {
  PreRequisiteJson,
  btmSwitchKey: "ROOT_EXTENSION_ADDONS" + "_btmkey",
  rootExtensionAddons: "ROOT_EXTENSION_ADDONS",
  menus: {
    skipT: true,
    label: "Node.js",
    icon: "application",
    pid: "PlayGroundNodeJS",
  },
  scriptType: "nodejs",
  language: "javascript",
  initContent:
    "// " +
    t(`write some code here and run it, have fun!`) +
    `\n` +
    `
let num = 100;
console.log('test start');
for(let i = 0;i < num;i++){
console.log('print num: '+i);
}
console.log('end');
`,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = CommonLang({
  extLangObj,
});
