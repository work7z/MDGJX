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
  useRef,
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
  const { PUtils } = props;
  const mc = useLocalStore(() => {
    return {
      loading: false,
      currentFileContent: "",
      file_list: [],
      file_obj: {
        indicator: null,
      },
      file_index: "indicator",
    };
  });
  const { file_list, file_obj, file_index } = mc;
  if (gutils.dev()) {
    window.o100 = mc;
  }
  const [loading, onLoading] = useState(false);
  const mRef = useRef({
    editorRef: null,
  });
  let fn_initIndicator = async () => {
    if (_.isEmpty(mc.file_obj.indicator)) {
      return;
    }
    console.log("handling the ref");
    mc.loading = true;
    let myctnRes = await gutils.opt("/dg/readfile", {
      PATH: mc.file_obj.indicator,
    });
    if (!_.isNil(myctnRes.content)) {
      mc.currentFileContent = myctnRes.content;
      if (mRef.current.editorRef) {
        mRef.current.editorRef.fn_setValue(myctnRes.content);
      }
    }
    mc.loading = false;
  };
  useEffect(() => {
    let a = PUtils.loop(async () => {
      try {
        let list = await props.fn_load_data();
        if (!_.isEqual(mc.file_list, list)) {
          mc.file_list = list;
          mc.file_obj.indicator = _.get(list, "0.value");
          mc.currentFileContent = "";
          await fn_initIndicator();
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
    let b = reaction(() => {
      return {
        a: mc.file_obj.indicator,
      };
    }, fn_initIndicator);
    return () => {
      a();
      b();
    };
  }, []);
  return PUtils.jsx.createPanelWithBtnControls({
    helpBtnProps: {
      minimal: true,
      outlined: true,
    },
    noShowHelpBtn: true,
    helpBtnId: false,
    controls: [
      {
        label: t(`Files`),
        jsx: React.createElement(
          observer((props) => {
            return (
              <GSyncSelectWithFilter
                small={true}
                obj={file_obj}
                list={file_list}
                index={file_index}
                whenChg={(x) => {
                  file_obj[file_index] = x;
                }}
              />
            );
          })
        ),
      },
      {
        text: t(`Refresh`),
        minimal: true,
        outlined: true,
        icon: "refresh",
        intent: "none",
        loading_id: "abcd",
        onClick: async () => {
          await fn_initIndicator();
          gutils.alertOk(`Refreshed.`);
        },
      },
    ],
    body: React.createElement(
      observer((props) => {
        return (
          <div className="w100 h100">
            {PUtils.jsx.createGEditorWithNoStorageAndSimple({
              readOnly: true,
              fontSize: 11,
              title: _.get(
                _.find(mc.file_list, (x) => x.value == mc.file_obj.indicator),
                "fileName"
              ),
              wordWrap: "on",
              loading: mc.loading,
              key: props.editor_key,
              language: props.language,
              directValue: mc.currentFileContent,
              onRef(ref) {
                window.n_ref100 = ref;
                mRef.current.editorRef = ref;
                console.log("ref", ref);
              },
            })}
          </div>
        );
      })
    ),
  });
});
