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
import cutils from "../../kit/common_utils";
import "./index.less";

export default observer((props) => {
  let { text } = props;
  let memText = useMemo(() => {
    let arr = [];
    let i = 0;
    let tmpText = text;
    let lastPostMode = false;
    while (i++ <= 100000) {
      if (!cutils.cond_emptyStr(tmpText)) {
        let preIdx = tmpText.indexOf("`");
        if (preIdx == -1) {
          break;
        } else {
          let preVal = tmpText.substr(0, preIdx);
          arr.push({
            type: lastPostMode ? "block" : "normal",
            value: preVal,
          });
          let remainText = tmpText.substr(preIdx + 1);
          tmpText = remainText;
          lastPostMode = !lastPostMode;
        }
      } else {
        break;
      }
    }
    if (!cutils.cond_emptyStr(tmpText)) {
      arr.push({
        type: "normal",
        value: tmpText,
      });
    }
    return arr;
  }, [text]);
  return (
    <div
      style={{
        verticalAlign: "middle",
      }}
    >
      {_.map(memText, (x, d, n) => {
        let isBlock = x.type == "block";
        return (
          <span
            style={
              isBlock
                ? {
                    fontFamily: "Inconsolata, monospace",
                    background: "var(--app-bg-white)",
                    // color: "black",
                    padding: "3px",
                    fontSize: "0.9rem",
                  }
                : {}
            }
          >
            {x.value}
          </span>
        );
      })}
    </div>
  );
});
