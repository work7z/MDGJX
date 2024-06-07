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
import SpinLoading from "../SpinLoading";
import "./index.less";

const InternalLogWrapper = observer((props) => {
  let { gref, PUtils, x_model, editorPropName } = props;
  let lc_store = useLocalStore(() => {
    return {
      loading: false,
      release_num: 0,
      msg: "",
      err: "",
    };
  });
  useEffect(() => {
    let a = PUtils.loop(async () => {
      lc_store.loading = true;
      try {
        let { data } = await gref.optAPI(`pcscript_read_logs`, {
          pid: "ROOT_EXTENSION_ADDONS",
          log_id: props.log_id,
        });
        lc_store.msg = _.get(data, "msg");
        lc_store.err = _.get(data, "err");
        lc_store.release_num++;
        lc_store.loading = false;
      } catch (e) {
        console.log("err", e);
        lc_store.loading = false;
      }
    }, -1);
    return () => {
      a();
    };
  }, []);
  return (
    <div
      key={lc_store.release_num}
      style={{
        height: "250px",
      }}
    >
      {PUtils.jsx.tabWithDefinition({
        default_select_tab: "str",
        key: "ROOT_EXTENSION_ADDONS_PS_SCRIPTb" + lc_store.release_num,
        list: [
          {
            label: t(`Output`),
            jsx: observer((props) =>
              PUtils.jsx.createGEditorWithNoStorageAndSimple({
                keepNoInvolve: true,
                fontSize: 11,
                readOnly: true,
                title: t(`All general message will be displayed here`),
                wordWrap: "off",
                key: "a" + lc_store.release_num,
                language: "html",
                directValue: lc_store.msg,
                initContent: ``,
              })
            ),
          },
          {
            label: t(`Error`),
            jsx: observer((props) =>
              PUtils.jsx.createGEditorWithNoStorageAndSimple({
                keepNoInvolve: true,
                readOnly: true,
                fontSize: 11,
                title: t(`All error message will be displayed here`),
                wordWrap: "off",
                key: "b" + lc_store.release_num,
                directValue: lc_store.err,
                language: "html",
                initContent: ``,
              })
            ),
          },
        ].map((x) => {
          x.mode_jsx_func = true;
          // if (lc_store.loading) {
          //   x = {
          //     ...x,
          //     jsx: observer(() => {
          //       return (
          //         <div>
          //           Loading
          //           <Blink />
          //         </div>
          //       );
          //     }),
          //   };
          // }
          return x;
        }),
      })}
    </div>
  );
});

export default observer((props) => {
  let { gref, PUtils, x_model, editorPropName } = props;
  let lc_store = useLocalStore(() => {
    return {
      r: 0,
      viewLogPanel: false,
    };
  });
  let log_id = _.get(x_model, "id");
  return (
    <div key={"a" + lc_store.r}>
      <div
        className=" pa-5 b-gray bb-none "
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="sub-mr-5 ">
          {cutils.fn_getBatchButtons([
            {
              label: t(`Refresh`),
              intent: "none",
              onClick: () => {
                lc_store.r++;
                cutils.alertOk_noT(t(`Refreshed.`));
              },
            },
            log_id
              ? {
                  label: lc_store.viewLogPanel
                    ? t(`Retract Logs`)
                    : t(`View Logs`),
                  intent: "none",
                  onClick: () => {
                    //
                    lc_store.viewLogPanel = !lc_store.viewLogPanel;
                  },
                }
              : null,
          ])}
        </div>
        <div>{t(`Refresh at {0}`, Moment().format("HH:mm:ss"))}</div>
      </div>
      <div style={{ height: "300px" }}>
        {PUtils.jsx.createGEditor({
          fontSize: 11,
          title: t(`Write My Script`),
          key: editorPropName,
          keepNoInvolve: true,
          crt_editor_model: x_model,
          needBorder: true,
          language: !cutils.isServerWindows() ? "shell" : "bat",
          initContent: ``,
          wordWrap: "off",
        })}
      </div>
      {lc_store.viewLogPanel ? (
        <InternalLogWrapper log_id={log_id} {...props} />
      ) : (
        ""
      )}
    </div>
  );
});
// {
//   label: t(`Start Process`),
//   intent: "primary",
//   onClick: () => {
//     //
//   },
// },
// {
//   label: t(`Stop Process`),
//   intent: "danger",
//   onClick: () => {
//     //
//   },
// },
