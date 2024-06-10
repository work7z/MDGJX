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
  GFormInput,
  ProgressBar,
  Dialog,
  Tag,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  GSyncSelectWithFilter,
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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import FormEasyTable from "../../../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormNoDataButShowSthPanel from "../../../../TranslateForJSON/frontend/cpt/FormNoDataButShowSthPanel";
import FormNoDataVisualablePanel from "../../../../TranslateForJSON/frontend/cpt/FormNoDataVisualablePanel";
import FTPConnectPanel from "../FTPConnectPanel";
import myless from "./index.less";

export default observer((props) => {
  let { lc_store_status, ftp_config } = props;
  let isConnected = lc_store_status.status.connected;
  if (isConnected) {
    return <FTPConnectPanel {...props} />;
  }
  return (
    <div className="w100 h100">
      <FormNoDataButShowSthPanel
        noTranslate={true}
        title={
          t(
            `Not yet connected to the {0} server {1}`,
            "FTP",
            `"${_.get(ftp_config, "name")}"`
          ) +
          "" +
          ``
        }
        desc={t(
          `To use related services, please establish the connection by clicking the button on the left top corner at first.`
        )}
        btmJSX={
          <div>
            <FormEasyTable
              column={[
                {
                  label: t(`Name`),
                  value: (x) => x.name || "Unknown",
                },
                {
                  label: t(`Account Type`),
                  value: (x) => x.acct_type,
                },
                {
                  label: t(`Charset`),
                  value: (x) => x.charset,
                },
                {
                  label: t(`Host`),
                  value: (x) => x.host,
                },
                {
                  label: t(`Port`),
                  value: (x) => x.port,
                },
              ]}
              data={[ftp_config || {}]}
            ></FormEasyTable>
          </div>
        }
      ></FormNoDataButShowSthPanel>
    </div>
  );
});
