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
import cutils from "../../kit/common_utils";
import "./index.less";

export default observer((props) => {
  window.all_form_sync_editor_props = props;
  const [iptVal = props.value, onIptVal] = useState(props.value);
  let { PUtils, value, onChange } = props;
  useEffect(() => {
    onIptVal(props.value);
    return () => {};
  }, [props.value]);
  if (_.isNil(iptVal) && !_.isEmpty(value)) {
    gutils.defer(() => {
      onIptVal(value);
    });
  }
  let lc_store = useLocalStore(() => {
    return {
      model: _.cloneDeep(props.obj),
    };
  });
  let editorPropName = props.index;
  let x_model = lc_store.model;
  if (_.isNil(props.pureObj)) {
    cutils.alert_noT(t(`Please specyfing pureObj as its value firstly.`));
  }
  // let editorPropName = props.index;
  // let x_model = props.obj;
  return (
    <div
      style={{
        height: props.height || "300px",
      }}
    >
      {PUtils.jsx.createGEditor({
        fontSize: 11,
        title: props.title || t(`Write My Script`),
        key: editorPropName,
        keepNoInvolve: true,
        onChange(value) {
          props.pureObj[props.index] = value;
        },
        crt_editor_model: x_model,
        needBorder: true,
        language: props.language,
        initContent: ``,
        wordWrap: props.wordWrap || "off",
      })}
    </div>
  );
});
