const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GSyncSelectWithFilter,
  GFormSwitch,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  RangeSlider,
  MobxReactLite,
  ProgressBar,
  Dialog,
  GFormSlider,
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
  CallOutAndView,
  CallOutWithKeep,
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
  TextAreaWithExample,
  DbLinkConnectionSelect,
  LocalProjectBtnWithPanel,
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  useRef,
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
import pluginUtils from "../../../frontend/kit/pluginUtils";
import otherPages from "../../../frontend/pages/otherPages";
import LessFile from "./index.less";

export default observer((props) => {
  let localStore = useLocalStore(() => {
    return {
      makeTop: false,
      totalLineCount: 500,
      initCtn: 0,
      startValue: 0,
      readPageSize: 500,
      last_mod: 0,
      lines: [],
      loading: false,
    };
  });
  let { log_file_id } = props;
  const mref = useRef({
    textRef: null,
    nowID: null,
    lastTotalCtn: 0,
  });
  useEffect(() => {
    let fn_readLogFile = async () => {
      console.log("props-log_file_id", props.log_file_id);
      let { data } = await props.gref.optAPI("readLogFileBySplit", {
        ...localStore,
        log_file_id: props.log_file_id,
      });
      if (data.totalCtn == mref.current.lastTotalCtn) {
        // return;
      } else {
        mref.current.lastTotalCtn = data.totalCtn;
      }
      localStore.lines = _.map(data.list, (x, d, n) => {
        let myline = null;
        if (props.onlyCtn) {
          myline = x;
        } else {
          try {
            x = JSON.parse(x);
            myline = `<span class='monosp'>[${_.padStart(
              localStore.startValue + d + 1,
              3,
              "0"
            )}][${Moment(new Date(x.timestamp)).format(
              "YYYY-MM-DD HH:mm:ss"
            )}][${x.logType}]</span> ${t(x.logContent, x.arglist)}`;
            if (props.onlyCtn) {
              myline = t(x.logContent, x.arglist);
            }
          } catch (e) {
            myline = "Unable to decode";
          }
        }
        myline = myline.replaceAll(/\n+/g, "<br/>");
        return `
            <div
            class="${" eachlinefortext " + "textline-" + _.toLower(x.logType)}"
          >
            ${myline}
          </div>
            `;
      });
      let $a = $(mref.current.textRef);
      if (localStore.makeTop) {
        localStore.makeTop = false;
        $a.scrollTop(0);
      } else {
        $a.scrollTop($a[0].scrollHeight);
      }
    };
    let autorunref = reaction(() => {
      return [
        localStore.initCtn,
        localStore.startValue,
        localStore.readPageSize,
      ];
    }, fn_readLogFile);
    let workFn = async () => {
      let { data } = await props.gref.optAPI("readMetaOfLogFile", {
        ...localStore,
        log_file_id: props.log_file_id,
      });
      if (localStore.totalLineCount != data.totalLineCount) {
        data.anyUpdate = true;
      }
      localStore.totalLineCount = data.totalLineCount;
      localStore.last_mod = data.last_mod;
      if (_.isNil(localStore.totalLineCount)) {
        localStore.totalLineCount = 0;
      }

      //   localStore.readPageSize = Math.min(
      //     localStore.readPageSize,
      //     localStore.totalLineCount
      //   );
      if (data.anyUpdate == true || true) {
        let mylimit = Math.min(
          localStore.readPageSize,
          localStore.totalLineCount
        );
        localStore.startValue = localStore.totalLineCount - mylimit;
        localStore.initCtn++;
      }
      await fn_readLogFile();
    };
    let cancelFn = gutils.run_async_loop(workFn, 1000);
    workFn();
    return () => {
      cancelFn();
      autorunref();
    };
  }, []);
  return (
    <div className={LessFile["logging-wrapper"]}>
      <div className={LessFile["logging-control-viewer"]}>
        <div className={LessFile["idx-left"]}>
          <div inline={true} label={t(`Cursor`)} style={{}}>
            <div
              style={{
                width: "400px",
                padding: "0 22px",
              }}
              title={t(
                `Dragging the controls to move the read cursor of logging file`
              )}
            >
              <GFormSlider
                min={0}
                max={localStore.totalLineCount}
                stepSize={1}
                updateWhenDrag={false}
                labelStepSize={localStore.totalLineCount / 5}
                onChange={(val) => {
                  localStore.makeTop = true;
                  localStore.startValue = val;
                }}
                value={localStore.startValue}
              ></GFormSlider>
            </div>
          </div>
          <div>
            <InputGroup
              type={"number"}
              small={true}
              value={localStore.readPageSize}
              onChange={(val) => {
                localStore.makeTop = true;
                console.log("value", val);
                let nextval = parseInt(val.target.value);
                // if (_.isEmpty(nextval) || isNaN(nextval)) {
                //   nextval = Math.min(1000, localStore.totalLineCount);
                // }
                localStore.readPageSize = nextval;
              }}
              style={{
                width: "80px",
              }}
            ></InputGroup>
          </div>
        </div>
        <div className={LessFile["idx-right"]}>
          From {localStore.startValue} to{" "}
          {Math.min(
            localStore.readPageSize + localStore.startValue,
            localStore.totalLineCount
          )}{" "}
          of {localStore.totalLineCount}
        </div>
      </div>
      <div
        className={LessFile["logging-text-viewer"]}
        ref={(e) => {
          if (e) {
            mref.current.textRef = e;
          }
        }}
      >
        {gutils.dev() && false ? <div>{props.log_file_id}</div> : ""}
        {localStore.loading
          ? "Loading..."
          : _.map(localStore.lines, (x, d, n) => {
              return (
                <div key={d} dangerouslySetInnerHTML={{ __html: x }}></div>
              );
            })}
      </div>
    </div>
  );
});
