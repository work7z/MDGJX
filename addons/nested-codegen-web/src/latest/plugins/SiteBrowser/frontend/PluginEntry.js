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
  MinusButton,
  MobxReact,
  HalfResizeForTwo,
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
import PreRequisiteJson from "../pre-requisite.json";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        myvalue: 12345,
      };
    },
    menus: [],
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.directPage({
        jsx: (props) => {
          let [mID, onMId] = useState(_.uniqueId("m"));
          let { PUtils } = props;
          console.log("root_props", props);
          window.props_10000 = props;
          let link = _.get(props, "params.link");
          useEffect(() => {
            if (!_.isNil(link)) {
              // history.go(-1);
            }
          }, []);
          return PUtils.jsx.panelWithTitle({
            no_scroll: true,
            right_ctl: [
              <MinusButton
                icon="refresh"
                onClick={(e) => {
                  onMId(_.uniqueId("abcd"));
                }}
              />,
              <MinusButton
                icon="share"
                onClick={(e) => {
                  window.open(link);
                }}
              />,
            ],
            title: _.get(props, "params.name"),
            jsx: (
              <div key={"m_" + mID} className="w100 h100">
                <iframe
                  key={mID}
                  frameBorder={0}
                  style={{ outline: "none", border: "none" }}
                  width={"100%"}
                  height={"100%"}
                  src={link}
                ></iframe>
              </div>
            ),
          });
        },
      })
    ),
  };
};
