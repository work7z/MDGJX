const {
  _,
  Xterm,
  GFormSelect,
  useRef,
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
  useStores,
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
  FitAddon,
  AttachAddon,
  useHistory,
} = window.CodeGenDefinition;
import FormEasyTable from "../FormEasyTable";
import checking_env_utils from "../utils/checking_env_utils";
import term_utils from "../utils/term_utils";
import MLess from "./index.less";

let FormXTermView = observer((props) => {
  let [m_id, onMId] = useState(_.uniqueId("m_id"));
  let m_ref = useRef({
    ele: null,
    term: null,
    fitAddon: null,
  });
  window.m_ref = m_ref;
  useEffect(() => {
    return () => {
      if (m_ref.current.term) {
        m_ref.current.term.dispose();
      }
    };
  }, []);
  let lc_store = useLocalStore(() => {
    return {
      num_offset: 0,
      num_size: 1024 * 10,
    };
  });
  useEffect(() => {
    let { gref, file_id } = props;
    let a = gutils.run_async_loop(async () => {
      if (_.isNil(m_ref.current.term)) {
        return;
      }
      let { data } = await gref.optAPI(`read_buffer_logs`, {
        file_id,
        num_offset: lc_store.num_offset,
        num_size: lc_store.num_size,
      });
      window.t1_data = data;
      let { str, next_offset_value, no_more, num_offset, num_size } = data;
      if (no_more) {
        // no more
      } else {
        console.log(`pre_run`, m_ref.current.term, str);
        term_utils.write(m_ref.current.term, str);
        term_utils.scrollToBottom(m_ref.current.term);
        lc_store.num_offset = next_offset_value;
      }
    }, 700);
    return () => {
      a();
    };
  }, []);
  useEffect(() => {}, [props.file_id]);
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "3px",
        fontSize: "13px",
        overflow: "auto",
      }}
      className="w100 h100"
    >
      <div
        className="w100 h100"
        id={m_id}
        ref={(e) => {
          if (e != null) {
            window.Xterm = Xterm;
            let { Terminal } = Xterm;
            var term = new Terminal({
              fontSize: 12,
            });
            term.open(document.getElementById(m_id));
            m_ref.current.ele = e;
            m_ref.current.term = term;
            let content = ``;
            term_utils.write(term, content);
          }
        }}
      ></div>
    </div>
  );
});

export default FormXTermView;
