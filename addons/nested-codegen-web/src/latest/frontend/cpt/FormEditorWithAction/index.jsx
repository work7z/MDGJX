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

export default observer((props) => {
  let { PUtils } = props;
  let btm_h = "0px"; // "25px";
  return (
    <div
      className="form_editor_with_action_wrapper"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        style={{
          // height: `calc(100% - ${btm_h} - 1px)`,
          // maxHeight: `calc(100% - ${btm_h} - 1px)`,
          height: "100%",
          width: "100%",
        }}
      >
        {PUtils.jsx.createGEditor(
          _.merge(
            {},
            {
              title: props.title,
              fontSize: 11,
              wordWrap: "off",
              language: "json",
              initContent: ``,
            },
            props.args
          )
        )}
      </div>
      <div
        style={{
          display: "none",
          textAlign: "right",
          lineHeight: `${btm_h}`,
          height: `${btm_h}`,
          padding: "0 5px",
          borderTop: "1px solid var(--app-bg-border-e3e3e2)",
        }}
      >
        <a
          href="javascript:void(0);"
          onClick={() => {
            gutils.copyWithAlert(
              PUtils.editor.setValue({
                id: props.args.key,
              })
            );
          }}
        >
          {t(`Copy Value`)}
        </a>
      </div>
    </div>
  );
});
