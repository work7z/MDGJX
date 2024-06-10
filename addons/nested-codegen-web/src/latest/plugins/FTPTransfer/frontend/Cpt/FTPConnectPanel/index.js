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
import FormNoDataVisualablePanel from "../../../../TranslateForJSON/frontend/cpt/FormNoDataVisualablePanel";
import myless from "./index.less";

export default observer(
  ({ lc_store_status, PUtils, gref, fn_callAPI, fn_callExecAPI }) => {
    let lc_store = useLocalStore(() => {
      return {
        files: [],
      };
    });
    if (gutils.dev()) {
      window.mmmm_lc_stores = lc_store;
    }
    // ls all files
    PUtils.useLoop(async () => {
      let files = await fn_callExecAPI("ls", {});
      if (gutils.dev()) {
        window.tmp___a = _.cloneDeep(lc_store.files);
        window.tmp___b = _.cloneDeep(files);
      }
      if (!_.isEqual(lc_store.files, files)) {
        lc_store.files = files;
      }
    }, 5000);
    return (
      <div className="pt-10">
        <div
          style={{ padding: 0, margin: 0, marginBottom: "5px" }}
          className="beflex"
        >
          <div>{t(`Path`)} /</div>
          <div>
            <Tag small={true}>{t(`File: {0}`, _.size(lc_store.files))}</Tag>
          </div>
        </div>
        <div>
          {_.map(lc_store.files, (x, d, n) => {
            return <div key={x._name}>{x._name}</div>;
          })}
        </div>
      </div>
    );
  }
);
