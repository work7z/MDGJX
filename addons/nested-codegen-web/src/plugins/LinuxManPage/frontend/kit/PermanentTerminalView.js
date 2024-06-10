const {
  _,
  useRef,
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
  GSyncSelectWithFilter,
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
import term_utils from "../../../TranslateForJSON/frontend/cpt/utils/term_utils";

const PermanentTerminalView = observer((props) => {
  let [m_id, onMId] = useState(_.uniqueId("m_id"));
  let m_ref = React.useRef({
    ele: null,
    term: null,
    fitAddon: null,
  });
  useEffect(() => {
    gutils.defer(() => {
      // window.Xterm = Xterm;
      // let { Terminal } = Xterm;
      // var term = new Terminal({
      //   fontSize: 12,
      // });
      // let e = $("#" + m_id)[0];
      // // adjust its value
      // term.open(document.getElementById(m_id));
      // m_ref.current.ele = e;
      // m_ref.current.term = term;
      // console.log("updating m_id", m_id);
      // term_utils.write(m_ref.current.term, props.data);
    }, 0);
  }, [props.data]);
  return (
    <div className="w100 h100">
      <div className="w100 h100" id={m_id}></div>
    </div>
  );
});

export default PermanentTerminalView;
