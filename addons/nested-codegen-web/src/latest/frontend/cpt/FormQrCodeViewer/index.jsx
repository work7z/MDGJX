let {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  useRef,
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
  Text,
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
import MLess from "./index.less";

let FormQrCodeViewer = observer((props) => {
  let m_ref_100 = React.useRef({
    last_url_link: "",
  });
  let lc_st = useLocalStore(() => {
    return {
      data_link: ``,
    };
  });
  const [loading, onLoading] = useState(false);
  let arg = {
    url: props.url,
    otherConfig: {
      ..._.pickBy(props.otherConfig || {}, (x, d, n) => {
        return _.startsWith(d + "", "config_qr");
      }),
    },
  };
  useEffect(() => {
    gutils.defer(
      _.throttle(() => {
        (async () => {
          try {
            // m_ref_100

            if (loading) {
              return;
            }
            if (_.isEqual(m_ref_100.current.data_link, arg)) {
              return;
            }
            onLoading(true);
            m_ref_100.current.data_link = _.cloneDeep(arg);
            let { data } = await props.gref.optAPI(`qrcode_create`, arg);
            lc_st.data_link = data.data_url_link;
            if (props.onGetDataUrl) {
              props.onGetDataUrl(lc_st.data_link);
            }
            setTimeout(() => {
              onLoading(false);
            }, 50);
          } catch (e) {
            onLoading(false);
          }
        })();
      }, 300)
    );
  }, [JSON.stringify(arg)]);
  let textButtonHeight = `38px`;
  // if (_.isNil(Text)) {
  //   Text = (props) => <div {...props}>{props.children}</div>;
  // }
  if (!props.enable) {
    return (
      <div style={{ padding: "8px" }}>{t(`No available URL can be used.`)}</div>
    );
  }
  if (loading) {
    return (
      <div style={{ padding: "8px" }}>
        {`Loading`}
        <Blink />
      </div>
    );
  }
  return (
    <div style={{ width: props.myW || "100%", height: props.myH || "100%" }}>
      <div
        style={
          props.style || {
            overflow: "hidden",
            width: "100%",
            // height: `calc(100% - ${textButtonHeight})`,
            height: "100%",
          }
        }
      >
        <img
          alt={""}
          src={lc_st.data_link}
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      {/* <Text
        style={{
          height: textButtonHeight,
          lineHeight: textButtonHeight,
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        {props.url}
      </Text> */}
    </div>
  );
});

export default FormQrCodeViewer;
