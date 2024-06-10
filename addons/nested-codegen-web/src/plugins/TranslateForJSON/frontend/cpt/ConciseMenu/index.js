import common_pre_utils from "../../kit/common_pre_utils";
import myless from "./index.less";
let clz = common_pre_utils.wrapClz(myless);

let ConciseMenuItem = observer((props) => {
  const {
    _,
    PopoverInteractionKind,
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
  let lc_store = useLocalStore(() => {
    return {
      popover_show: false,
      loading_view: false,
    };
  });
  let obj = props.obj;
  let hasChildren = !_.isNil(obj.children);
  let selfCtn = (
    <div
      title={obj.title}
      // || t(`No available description`)
      onClick={async (e) => {
        lc_store.loading_view = true;
        try {
          if (obj.onClick) {
            await obj.onClick(e);
          }
          lc_store.loading_view = false;
          if (props.fn_exit) {
            props.fn_exit(e);
          }
          if (obj.skip_msg !== true) {
            gutils.alertOk_noT(
              t(`Triggered '{0}' operation successfully!`, obj.label)
            );
          }
        } catch (e) {
          lc_store.loading_view = false;
          // gutils.win_alert(`Error: ${gutils.getErrMsg(e)}`);
          gutils.alertErr_noT(`${gutils.getErrMsg(e)}`);
        }
      }}
      key={"idx-" + obj.key}
      className={clz(`m-menu-item`)}
    >
      <div>{obj.label}</div>
      <div>
        {lc_store.loading_view ? (
          // <Icon style={{ margin: 0, padding: 0 }} loading={true}  />
          <Button
            small={true}
            loading={true}
            style={{ margin: 0, padding: 0 }}
            minimal={true}
          ></Button>
        ) : hasChildren ? (
          <Icon style={{ margin: 0, padding: 0 }} icon="caret-right" />
        ) : (
          ""
        )}{" "}
      </div>
    </div>
  );
  if (hasChildren) {
    return (
      <Popover
        isOpen={lc_store.popover_show}
        onInteraction={(state) => {
          lc_store.popover_show = state;
        }}
        hoverCloseDelay={0}
        hoverOpenDelay={0}
        transitionDuration={0}
        interactionKind={PopoverInteractionKind.HOVER}
        usePortal={true}
        minimal={true}
        placement={"right-start"}
        //
      >
        {selfCtn}
        <ConciseMenu
          fn_exit={() => {
            lc_store.popover_show = false;
          }}
          menus={obj.children}
        />
      </Popover>
    );
  }
  return selfCtn;
});

let ConciseMenu = observer((props) => {
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

  // return <div>concise menu</div>;
  return (
    <div className={clz(`concise-menu-wrapper`)}>
      {(props.menus || []).map((x, d, n) => {
        return (
          <ConciseMenuItem
            fn_exit={props.fn_exit}
            obj={x}
            key={x.key + "-" + d}
          />
        );
      })}
    </div>
  );
});

export default ConciseMenu;
