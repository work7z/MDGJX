let {
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
  ROUTE_PluginLoadView,
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
  CPT_GButton,
  useHistory,
} = window.CodeGenDefinition;
import "./index.less";
const GButton = CPT_GButton;
const { PopoverInteractionKind, PopoverPosition } =
  window.CodeGenDefinition.BluePrintCpt;

if (_.isNil(ROUTE_PluginLoadView)) {
  ROUTE_PluginLoadView = (props) => {
    return (
      <div>
        {t(`The core version of CodeGen ToolBox is too old to be supported.`)}
      </div>
    );
  };
}

const PluginConfigChooser = observer((props) => {
  const [isLoading, onLoading] = useState(false);
  let { obj, index } = props;
  let { PUtils } = props;
  let [list, onList] = useState([]);
  let fn_refresh = async (loadingView = false) => {
    if (loadingView) {
      onLoading(true);
    }
    window.test_PUtils = props.PUtils;
    let { data } = await props.gref.optAPI(`list_all_ext_tabs`, {
      extId: props.extId,
    });
    window.formattingDataArr(data);
    data = _.map(data, (x, d, n) => {
      return {
        ...x,
        label: x.TAB_NAME ? x.TAB_NAME : t(`tab-{0}`, x.ID),
        desc_label: x.CREATE_TIME_DESC,
        value: x.ID,
      };
    });
    if (!_.isEqual(data, list)) {
      onList(data);
      // if (_.isNil(obj[index]) && !_.isEmpty(data)) {
      // gutils.defer(() => {
      //   obj[index] = _.get(data, "0.value");
      // });
      // }
    }
    console.log(`data for list`, data);
    if (loadingView) {
      onLoading(false);
    }
  };
  useEffect(() => {
    let a = PUtils.loop(async (num) => {
      await fn_refresh(num == 0);
    }, 2000);
    return () => {
      a();
    };
  }, []);
  return (
    <ButtonGroup>
      <GSyncSelectWithFilter
        loading={isLoading}
        list={list}
        autoFirst={true}
        obj={obj}
        index={index}
        whenChg={(x) => {
          obj[index] = x;
        }}
      />

      {/* <GButton
        icon="plus"
        loading={isLoading}
        onClick={() => {
          gutils.api.dblink.create_connection();
        }}
      ></GButton> */}
      <GButton
        icon="refresh"
        loading={isLoading}
        onClick={() => {
          fn_refresh(true);
        }}
      ></GButton>
      <GButton
        icon="cog"
        // text={_.isEmpty(list) ? `Click Here to Add` : ``}
        onClick={() => {
          let willWorkPath = `/exts/${props.extId}`;
          gutils.showPageByModal(willWorkPath, {
            title: `Manage My Configuration`,
            icon: "application",
          });
          gutils.defer(() => {
            gutils.confirmIfNotClickOk(
              "for-that-manage-my-plugin",
              "We opened the related extension view panel just now so that you can manage these tabs and related config. Why do we need you to select one of these tabs? In general, we need that config because we need to achieve related functions inside the present extension, for instance, we need you to select a connection config inside the SQL console function so that we can use it to establish a new connection and accomplish the task we need.",
              () => {
                //
              },
              {
                fn_first: () => {},
                needBothSet: true,
                title: "Friendly Reminder",
                cancelText: "OK",
                cancelIntent: "primary",
              }
            );
          }, 0);
          // pop a page, and let user can modify the SQLDrafts
        }}
      ></GButton>
      <GButton
        icon="send-to-map"
        onClick={() => {
          gutils.alertOk(
            `Opened the extension main view, you can manage these tabs and related config if needed.`
          );
          gutils.hist.push(`/exts/${props.extId}`);
        }}
      ></GButton>

      {/* <Popover
        popoverClassName={Classes.POPOVER_WRAPPER}
        portalClassName="faults"
        interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
        enforceFocus={true}
        captureDismiss={true}
        position={PopoverPosition.BOTTOM_RIGHT}
        // isOpen={gstore.sysinfo.isOpenNotification}
      > */}

      {/* <Card style={{ width: "50vw", height: "50vh" }}>
          <div>
            <ROUTE_PluginLoadView id={props.extId} />
          </div>
        </Card>
      </Popover> */}
    </ButtonGroup>
  );
});

export default PluginConfigChooser;
