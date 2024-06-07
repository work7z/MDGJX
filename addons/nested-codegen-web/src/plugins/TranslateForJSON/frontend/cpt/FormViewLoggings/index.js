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
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  useRef,
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
import FormEasyTable from "../FormEasyTable";
import PlainTextLoggins from "../FormPlainTextLoggins";
import FormXTermView from "../FormXTermView";
import MLess from "./index.less";

let FormViewLoggings = observer((props) => {
  let [m_id] = useState(_.uniqueId("m"));
  let l_store = props.store;
  // useLocalStore(() => {
  //   return {
  //     log_content: ``,
  //   };
  // });
  let { gref, file_id } = props;
  if (props.mode == "term") {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <FormXTermView gref={gref} file_id={file_id} store={props.store} />
      </div>
    );
  }
  useEffect(() => {
    let a = gutils.run_async_loop(async () => {
      let { data } = await gref.optAPI(`read_exec_logs`, {
        file_id,
      });
      if (data.log_content != l_store.log_content) {
        gutils.defer(() => {
          let mmid = m_id;
          let $a = $(`#${mmid}`);
          if ($a && $a[0]) {
            $a.scrollTop($a[0].scrollHeight);
          }
        });
      }
      l_store.log_content = data.log_content;
    }, 700);
    return () => {
      a();
    };
  }, []);
  return (
    <PlainTextLoggins m_id={m_id} logs={l_store.log_content}></PlainTextLoggins>
  );
});

export default FormViewLoggings;
