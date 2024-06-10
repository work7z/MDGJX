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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import myless from "./myfile.less";
console.log("that", myless);

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = {
  initialState() {
    return {
      code: null,
      is_app_is_app_capturing: true,
      key: "",
      keyCode: "",
      metaKey: false,
      shiftKey: false,
      timeStamp: null,
      ctrlKey: null,
      composed: null,
      charCode: null,
    };
  },
  menus: [
    {
      ...fn_otherPages.get_frontend_tools(),
      children: [
        {
          ...fn_otherPages.get_w3c_list(),
          children: [
            {
              label: "Keyboard Event",
              pid: "KeyboardListen",
            },
          ],
        },
      ],
    },
  ],
  render: fn_otherPages.rightMainPageJsx({
    totalTitle: t("KeyCode Event Tools"),
    fn_afterConfigItem({ PUtils }) {
      return [];
    },
    jsx: observer((props) => {
      let { PUtils } = props;
      let { crtStore, crtStoreName, crtModel } = PUtils;
      console.log(props);
      window.keyboard_listen_props_test = props;
      let { myconfig } = props;
      let commonConfigs = {
        crtStoreName,
      };
      console.log("updating keyboard listener");
      let crtKeyDownObj = crtModel;
      let on_crtKeyDownObj = (obj) => {
        _.merge((crtKeyDownObj = gstore.common_app[crtStoreName].model), obj);
      };
      let [myid] = useState(_.uniqueId("CAP_ALL_"));
      useEffect(() => {
        gutils.keyDownListenObj[myid] = (e) => {
          console.log("cap_all_value", e);
          if (!crtModel.is_app_capturing) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          let allKeys = _.keys(crtKeyDownObj);
          _.forEach(allKeys, (x) => {
            if (x == "is_app_capturing") {
              return;
            }
            crtKeyDownObj[x] = e[x];
          });
          let handleFunc = _.uniqueId(
            `handleKeyDownEvent_` + gutils.uuid().substring(0, 4)
          );
          gstore.common_app.extKeyboardListen.gen_code_logic_setValue(
            [
              `function ${handleFunc}(e){
  let shouldPreventBehaviour = false;
  // capturing event for the key "${e.key}"
  if(e.keyCode === ${e.keyCode}){
    if(
      e.shiftKey === ${e.shiftKey}
      &&
      e.ctrlKey === ${e.ctrlKey}
      &&
      e.metaKey === ${e.metaKey}
    ){
      console.log('received keydown actions', e);
      // do something here
      shouldPreventBehaviour = true;
    }
  }
  if(shouldPreventBehaviour){
    e.preventDefault();
    e.stopPropagation();
  }
}`,
              `// Pure JavaScript Implementation`,
              `document.onkeydown = function (e) {
  ${handleFunc}(e);
}

// React JSX Implementation
const example = <div
                  tabIndex="0"
                  onKeyDown={(e)=>{
                    ${handleFunc}(e);
                  }}>
                  this is react JSX
                </div>

// more code snippets would be released ASAP.

`,
            ].join(`\n`)
          );
          8;
        };
        return () => {
          delete gutils.keyDownListenObj[myid];
        };
      }, []);

      return PUtils.jsx.topBtmSpliter({
        resizekey: crtStoreName,
        top: (
          <div className="keyboard-listen-box-wrapper" style={{}}>
            <div
              className={"mycenter-text" + ` ${myless["mycenter-text"]}`}
              style={{ textAlign: "center" }}
            >
              <h1>
                {crtKeyDownObj.key}/{crtKeyDownObj.keyCode}
              </h1>
            </div>
            <div className={myless["mytable-ctn"]}>
              <div>Code: {crtKeyDownObj.code}</div>
              <div>ShiftKey: {crtKeyDownObj.shiftKey ? "true" : "false"}</div>
              <div>MetaKey: {crtKeyDownObj.metaKey ? "true" : "false"}</div>
              <div>CtrlKey: {crtKeyDownObj.ctrlKey ? "true" : "false"}</div>
            </div>
            <div className={myless["mycontrol-ctn"]}>
              <Button
                onClick={() => {
                  crtModel.is_app_capturing = !crtModel.is_app_capturing;
                }}
                intent={crtModel.is_app_capturing ? "warning" : "success"}
                text={t(
                  crtModel.is_app_capturing
                    ? `Stop Capturing`
                    : `Resume to Capture`
                )}
              ></Button>
            </div>
          </div>
        ),
        percent: 0.318,
        btm: (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderTop: `1px solid var(--app-border-gray-e1e8ed)`,
            }}
          >
            {PUtils.jsx.tabWithDefinition({
              list: [
                {
                  label: t("Event Handler Code"),
                  jsx: PUtils.jsx.createGEditor({
                    key: "gen_code_logic",
                    language: "javascript",
                    initContent: "// not generated yet.",
                  }),
                },
              ],
              key: "left_top_btm_code",
            })}
          </div>
        ),
      });
    }),
  }),
};
