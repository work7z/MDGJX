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
import Handlebars from "handlebars";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = `HandleBars.js`;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = fn_fe_wrapper({
  leftlang: "handlebars",
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
    _.forEach(userModelObj, (x, d, n) => {
      if (_.isFunction(x)) {
        Handlebars.registerHelper(d, x);
      }
    });
    return tempFn({ ...(userModelObj || {}) });
  },
  fn_call_template: (ipt_template) => {
    let tempFn = Handlebars.compile(ipt_template, { noEscape: true });
    return tempFn;
  },
  fn_otherPages,
  cutils,
  metaObj,
  ipt_template_example: `I love {{appName}}! The version of {{appName}} I'm using is {{appVersion}}. 

${t("Generated Time")}: {{fn_momentStr}}                  
${t("Learn More")}: https://handlebarsjs.com/`,
  ipt_script_example: `addModel({
  appName: 'CodeGen',
  appVersion: window.pkgInfo.version, 
  fn_momentStr(){
    return Moment().format("YYYY-MM-DD HH:mm:ss");
  },
})
  `,
});
