const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GSyncSelectWithFilter,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  GFormInput,
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
  useHistory,
} = window.CodeGenDefinition;
import "./index.less";
import "../../less/common_var.less";

let PlainTextLoggins = observer((props) => {
  const { logs } = props;
  const [m_id] = useState(_.uniqueId("m_id"));
  let isLogger = props.type == "logger";
  useEffect(() => {
    gutils.defer(() => {
      if (props.scroll_it !== false) {
        console.log("updating the mmid scroll");
        let mmid = m_id;
        let $a = $(`#${mmid}`);
        if ($a && $a[0]) {
          $a.scrollTop($a[0].scrollHeight);
        }
      }
    }, 0);
    return () => {};
  }, [logs]);
  return (
    <div
      id={m_id}
      className={`bp3-text-small bp3-text-muted`}
      style={{
        height: "100%",
        maxHeight: "100%",
        width: "100%",
        overflow: "auto",
        // whiteSpace: "nowrap",
        whiteSpace: "break-spaces",
        lineBreak: "anywhere",
        padding: "8px",
        // fontFamily: `monospace`,
      }}
    >
      <div>
        {_.isEmpty(logs)
          ? t(`No available logs.`)
          : _.chain(logs)
              .split("\n")
              .map((x) => {
                if (x.startsWith("[20")) {
                  let r =
                    /(\[\d{4,}-\d{2,}-\d{2,} \d{2,}:\d{2,}:\d{2,}\])(\[\w+?\])/.exec(
                      x
                    );
                  if (r != null) {
                    let level = r[2];
                    let styleval = {};
                    try {
                      styleval = {
                        color: {
                          "[FINE]": "var(--app-text-white)",
                          "[SEVERE]": `var(--app-text-white)`,
                          "[WARNING]": `var(--app-text-white)`,
                        }[level],
                        backgroundColor: {
                          "[FINE]": "var(--app-bg-succ)",
                          "[SEVERE]": `var(--app-text-red-2)`,
                          "[WARNING]": `var(--app-text-darkyellow-2)`,
                        }[level],
                      };
                    } catch (e) {
                      console.log("e", e);
                    }
                    return (
                      <div style={styleval}>
                        <span>{r[1]}</span>
                        <span>{level}</span>
                        <span>{(x + "").replace(r[0], "")}</span>
                      </div>
                    );
                  } else {
                    return <div>{x}</div>;
                  }
                } else {
                  return <div>{x}</div>;
                }
              })
              .value()}
      </div>
    </div>
  );
});

export default PlainTextLoggins;
