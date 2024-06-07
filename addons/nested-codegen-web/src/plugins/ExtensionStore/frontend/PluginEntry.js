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

let fillArr = [];
if (gutils.dev()) {
  for (let i = 0; i < 100; i++) {
    fillArr.push("ok" + i);
  }
}

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = {
  initialState() {
    return {
      myvalue: 12345,
    };
  },
  fn_menus(item) {
    if (item.pid == "dashboard") {
      item.children.push({
        label: "Extensions",
        icon: "clean",
        pid: "ExtensionStore",
      });
    }
  },
  menus: [
    {
      pid: "dashboard",
      children: [
        {
          label: "Extensions",
          icon: "clean",
          pid: "ExtensionStore",
        },
      ],
    },
  ],
  render: fn_otherPages.pleaseStayTuned({
    msg: (
      <div>
        <p>
          {t(
            `Extensions are aiming at a more flexible architecture and lightweight runtime for the scalability of CodeGen, meanwhile, for the time being, its functions, tools, related documentation are still maturing.`
          )}
        </p>
        <p>
          {t(
            `The function extensions would be released ASAP, please kindly stay tuned.`
          )}
        </p>
        {fillArr.map((x, d, n) => {
          return <h1>testing row {x}</h1>;
        })}
      </div>
    ),
  }),
};
