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
import PreRequisiteJson from "../pre-requisite.json";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import "./myfile.less";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import fn_fe_wrapper from "../../TranslateForJSON/frontend/cpt/RenderFEWrapper";
import doT from "dot";
window.m_doT = doT;

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = `doT.js`;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = fn_fe_wrapper({
  menus: [
    {
      ...fn_otherPages.getForPlayGroundFirstLayerMenu(),
      children: [
        {
          ...fn_otherPages.getTemplateRendererMenu(),
          children: [
            {
              label: appTitle,
              skipT: true,
              icon: "application",
              pid: "ROOT_EXTENSION_ADDONS",
            },
          ],
        },
      ],
    },
  ],
  PreRequisiteJson,
  appTitle,
  fn_call_fin_template: ({ tempFn, userModelObj }) => {
    return tempFn({ ...(userModelObj || {}) });
  },
  fn_call_template: (ipt_template) => {
    console.log("fn_call_template");
    doT.templateSettings.strip = false;
    return doT.template(ipt_template);
  },
  fn_otherPages,
  cutils,
  metaObj,
  ipt_template_example: `I love {{=it.appName}}! The version of {{=it.appName}} I'm using is {{=it.appVersion}}. 

${t("Generated Time")}: {{=it.fn_momentStr()}}                  
${t("Learn More")}: https://olado.github.io/doT/index.html`,
  ipt_script_example: `addModel({
  appName: 'CodeGen',
  appVersion: window.pkgInfo.version, 
  fn_momentStr(){
    return Moment().format("YYYY-MM-DD HH:mm:ss");
  },
})
  `,
});
