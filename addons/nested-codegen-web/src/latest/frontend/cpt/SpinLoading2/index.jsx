let {
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
  GFormSwitch,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,

  GFormInput,
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
  ReactDOM,
  gutils,
  useStores,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  observer,
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
const SpinLoading2 = observer((props) => {
  if (props.loading) {
    return (
      <div>
        <div
          style={{
            // minHeight: "200px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div>
            <Spinner small={true} intent="none" />
          </div>
          <div style={{ marginTop: "8px" }}>
            {props.loadingJSX || <p>{t(`Loading related resources...`)}</p>}
          </div>
        </div>
        <p>{props.children}</p>
      </div>
    );
  } else {
    return props.children;
  }
});
export default SpinLoading2;
