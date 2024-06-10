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
import "./index.less";

export default observer((props) => {
  let [editNow, onEditNow] = useState(false);
  let [tmpText, onTmpText] = useState(props.text);
  let [loading, onLoading] = useState(false);
  if (editNow) {
    let press_enter = async () => {
      try {
        onLoading(true);
        await props.onChange(tmpText);
        onEditNow(false);
        onLoading(false);
      } catch (e) {
        console.log(e);
        onLoading(false);
      }
    };
    return (
      <InputGroup
        autoFocus={true}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            gutils.stop_e(e);
            press_enter();
          }
        }}
        {...gutils.propsForInput(
          {
            ...props,
            onChange: null,
            value: null,
            text: null,
          },
          tmpText,
          onTmpText
        )}
        style={{
          ...(props.style || {}),
        }}
        rightElement={
          <ButtonGroup>
            <Button
              icon="small-cross"
              loading={loading}
              onClick={() => {
                onTmpText(props.text);
                onEditNow(false);
              }}
              outline={true}
            ></Button>
            <Button
              loading={loading}
              onClick={press_enter}
              icon="small-tick"
              outline={true}
            ></Button>
          </ButtonGroup>
        }
      ></InputGroup>
    );
  }
  return (
    <div
      className={
        "g-hover-editable-text" +
        ` ` +
        (props.no_hover_link ? "no_hover_link" : "make_link")
      }
      onClick={() => {
        if (props.no_hover_link) {
          return;
        }
        onTmpText(props.text);
        onEditNow(true);
      }}
      style={{
        cursor: props.no_hover_link ? "default" : "text",
        ...(props.style || {}),
      }}
    >
      {props.text}
    </div>
  );
});
