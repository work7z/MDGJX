let observer = _.get(window, "CodeGenDefinition.observer", window.observer);

import ConciseMenu from "../../frontend/cpt/ConciseMenu";
import myless from "./index.module.less";
window.test_myless_file = myless;
function clz(key) {
  return myless[key] || key;
}
let mybtmviewHeight = "23px";

let InnerCoreEditor = observer((props) => {
  const {
    _,
    Xterm,
    GFormSelect,
    Blink,
    HalfResizeForTwoHorizontal,
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
  let keepNoInvolve = _.get(props, "otherConfig.keepNoInvolve");
  let selectAllWhenClick = _.get(props, "otherConfig.selectAllWhenClick");
  const { useRef } = React;
  const { lc_st_wrapper } = props;
  window.tmp_lc_st_wrapper = lc_st_wrapper;
  let Editor = CodeGenDefinition.EXT_MONACO_ALL_REACT.default;
  let { DiffEditor, useMonaco, loader, monaco } =
    CodeGenDefinition.EXT_MONACO_ALL_REACT;
  let editor_options = {
    wordWrap: props.wordWrap || "on",
    // other
    fontSize: props.fontSize || gstore.localSettings.crt_editor_size,
    value: "",
    readOnly: props.readOnly,
    minimap: {
      enabled: true,
    },
    allowedCharacters: true,
    allowedLocales: true,
    ambiguousCharacters: false,
    unicodeHighlight: {
      ambiguousCharacters: false,
    },
    theme: gstore.localSettings.crt_theme,
    wordWrap: props.wordWrap || "on",
    automaticLayout: true,
    language: props.language || "mysql",
    ...(props.otherConfig || {}),
  };
  if (gstore.localSettings.app_multiple_tab_mode) {
    _.merge(editor_options, {
      scrollbar: {
        // alwaysConsumeMouseWheel: false,
        alwaysConsumeMouseWheel:
          gstore.localSettings.should_always_consume_mousewheel,
        handleMouseWheel: false,
        scrollByPage: true,
      },
    });
  }
  let bindCallback = useCallback(
    _.debounce((...arr) => {
      if (props.onChange) {
        props.onChange(...arr);
      }
    }, 200),
    [props.onChange]
  );
  const { isDiffMode, btmID_2, mybtmviewHeight, hasTitleMode, chkObj } = props;
  let MyObject = isDiffMode ? DiffEditor : Editor;
  let m_crt_ref = useRef({
    crt_editor: null,
    latest_wrap_value: null,
    update_times: 0,
  });
  useEffect(() => {
    let a = gutils.run_async_loop(async () => {
      try {
        if (m_crt_ref.current.latest_wrap_value != props.wordWrap) {
          if (!_.isNil(m_crt_ref.current.crt_editor)) {
            console.log(`handling editor`, props.wordWrap, m_crt_ref.current);
            m_crt_ref.current.crt_editor.updateOptions({
              wordWrap: props.wordWrap || "on",
            });
            if (m_crt_ref.current.update_times > 3) {
              m_crt_ref.current.latest_wrap_value = props.wordWrap;
            }
            m_crt_ref.current.update_times++;
          }
        }
      } catch (e) {
        console.log(`handling editor error`, e);
      }
    }, 1000);
    return () => {
      a();
    };
  }, [props.wordWrap, m_crt_ref.current.crt_editor]);

  return (
    <div
      style={{
        width: "100%",
        height: !isDiffMode
          ? `calc(100% - ${mybtmviewHeight}${
              hasTitleMode ? ` - ${mybtmviewHeight}` : ""
            })`
          : "100%",
      }}
    >
      <MyObject
        viewmode={chkObj.viewmode}
        options={editor_options}
        theme={gutils.getEditorTheme(false)}
        defaultLanguage={editor_options.language}
        defaultValue={props.value}
        {...(props.otherEditorProps || {})}
        saveViewState={true}
        onChange={bindCallback}
        beforeMount={(monaco) => {
          if (window.constants) {
            _.forEach(constants.finalThemeObj, (x, d, n) => {
              if (!_.isNil(x.json)) {
                monaco.editor.defineTheme(d, x.json);
              }
            });
          }
        }}
        onMount={async (editor, monaco) => {
          console.log("updating on GEditor onMount", props.id, props);
          window.test_monaco = monaco;
          window.test_editor = editor;
          let crt_editor = editor;
          m_crt_ref.current.crt_editor = editor;
          if (props.onEditorRef) {
            props.onEditorRef(editor);
          }
          if (props.onRef) {
            gutils.defer(() => {
              props.onRef(editor, monaco);
            });
          }
          window.tmp___selectAllWhenClick = selectAllWhenClick;

          if (keepNoInvolve || gstore.localSettings.app_multiple_tab_mode) {
            try {
              let fn_markPageScroll = (blurMode) => {
                if (blurMode) {
                  editor.updateOptions({
                    scrollbar: {
                      alwaysConsumeMouseWheel: false,
                      handleMouseWheel: false,
                      scrollByPage: true,
                    },
                  });
                } else {
                  editor.updateOptions({
                    scrollbar: {
                      alwaysConsumeMouseWheel: true,
                      handleMouseWheel: true,
                      scrollByPage: false,
                    },
                  });
                }
              };
              fn_markPageScroll(true);
              editor.onDidBlurEditorWidget(() => {
                fn_markPageScroll(true);
              });
              editor.onDidFocusEditorWidget(() => {
                fn_markPageScroll(false);
              });
            } catch (e) {
              console.log("e", e);
            }
          }
          try {
            editor.updateOptions({
              wordWrap: props.wordWrap || "on",
            });
          } catch (e) {
            console.log(e);
          }
          // gutils.defer(() => {
          //   setInterval(() => {
          //     window.tmp_editor = editor;
          //     editor.updateOptions({
          //       // wordWrap: props.wordWrap || "on",
          //       wordWrap: true,
          //     });
          //   }, 1000);
          // }, 0);
          if (_.isNil(window.init_groovy_before)) {
            try {
              window.initForGroovy({
                languages: monaco.languages,
              });
              window.init_groovy_before = true;
            } catch (e) {
              console.log("e", e);
            }
          }
          const inst = editor;
          gutils.editor_inst[props.id] = editor;
          // vim or emacs
          let initTempLocal = async () => {
            if (chkObj.viewmode == "vim") {
              await gutils.addonScript("/static/js/monaco-vim.js");
              let { initVimMode } = window.MonacoVim;
              // debugger;
              initVimMode(inst, $("#" + chkObj.btmID)[0]);
            }
            if (chkObj.viewmode == "emacs") {
              await gutils.addonScript("/static/js/monaco-emacs.js");
              let { EmacsExtension } = window.MonacoEmacs;
              let ok = $("#" + chkObj.btmID);
              const emacsMode = new EmacsExtension(inst);
              emacsMode.onDidMarkChange((ev) => {
                ok.text(ev ? "Mark Set!" : "Mark Unset");
              });
              emacsMode.onDidChangeKey((str) => {
                ok.text(str);
              });
              emacsMode.start();
            }
          };
          gutils.defer(() => {
            try {
              editor.updateOptions({
                wordWrap: props.wordWrap || "on",
              });
            } catch (e) {
              console.log(e);
            }
          });
          gutils.defer(() => {
            initTempLocal();
          });
          gutils.defer(() => {
            if (props.noAutoFocus) {
              return;
            }
            crt_editor.focus();
          });
          // TODO: the logic
          if (props.JSON_FILE_PATH) {
            const JSON_FILE_PATH = props.JSON_FILE_PATH;
            let json_fileStr = await window.ipc.readFileToStr(JSON_FILE_PATH);
            let myjson = gutils.safeparse(json_fileStr);
            if (!_.isNil(myjson)) {
              console.log("mypos", editor.getPosition());
              // // console.log("rendering the json file", myjson);
              if (!_.isNil(myjson.position)) {
                //debugger;
                editor.setPosition(myjson.position);
              }
              if (!_.isNil(myjson.selection)) {
                window.myjsontemp = myjson;
                editor.setSelection(myjson.selection);
              }
              if (!_.isNil(myjson.left)) {
                editor.setScrollLeft(myjson.left);
              }
              if (!_.isNil(myjson.top)) {
                editor.setScrollTop(myjson.top);
              }
            }
          }
          function updateStateValue() {
            try {
              let $btm2 = $("#" + btmID_2);
              let $btm_col_left = $btm2.find(".btm_col_left");
              let $btm_col_right = $btm2.find(".btm_col_right");
              let selObj = editor.getSelection();
              let editorModel = editor.getModel();
              const eol = editorModel.getEOL();
              const text = eol === "\n" ? "LF" : "CRLF";
              let len = editorModel.getValueLength();
              // const modelOptions = editorModel.getOptions();
              // const tabSize = modelOptions.tabSize;
              // const spaceOrTabSizeMessage = modelOptions.insertSpaces
              //   ? nls.localizeByDefault("Spaces: {0}", tabSize)
              //   : nls.localizeByDefault("Tab Size: {0}", tabSize);
              // $btm_col_right.text(`${text}, ${len} Characters`);
              let crt_editor_mode = gstore.localSettings.editor_mode;
              let mappingText = {
                general: "TEXT",
                vim: "VIM",
                emacs: "EMACS",
              };

              // $btm_col_left.text(
              //   `Ln ${selObj.positionLineNumber}, Col ${selObj.positionColumn}, ${mappingText[crt_editor_mode]}`
              // );
              lc_st_wrapper.btmText = `Ln ${selObj.positionLineNumber}, Col ${selObj.positionColumn}, ${mappingText[crt_editor_mode]}`;
              lc_st_wrapper.positionLineNumber = selObj.positionLineNumber;
              lc_st_wrapper.positionColumn = selObj.positionColumn;
              lc_st_wrapper.text = text;
              lc_st_wrapper.len = len;
              if (len == 55) {
                // `CG98OCT_2022-10-09_894374f06ac746918ffec3d0acc27d49.enc`.length
                let valueNow = editorModel.getValue();
                lc_st_wrapper.is_crt_downlodable_file_mode =
                  valueNow.startsWith("CG98OCT_20") &&
                  valueNow.endsWith(".enc");
                if (lc_st_wrapper.is_crt_downlodable_file_mode) {
                  lc_st_wrapper.downloadable_file_text = valueNow;
                } else {
                  lc_st_wrapper.downloadable_file_text = null;
                }
              } else {
                lc_st_wrapper.is_crt_downlodable_file_mode = false;
              }
            } catch (e) {
              console.log("e", e);
              //
            }
          }
          if (selectAllWhenClick) {
            if (editor) {
              // gutils.defer(() => {
              //   editor.onMouseDown(function (e) {
              //   });
              // }, 100);
            }
          }
          gutils.defer(() => {
            updateStateValue();
          }, 100);
          editor["onDidFocusEditorWidget"]((event) => {
            if (selectAllWhenClick) {
              gutils.delay(() => {
                let finValue = editor.getModel().getValue();
                gutils.copy(finValue);
                gutils.alertOk(`Copied`);
                let range2 = editor.getModel().getFullModelRange();
                editor.setSelection(range2);
              }, 20);
            }
          });
          const moveArr = [
            "onDidChangeCursorPosition",
            "onDidChangeCursorSelection",
            "onDidScrollChange",
          ];
          _.forEach(moveArr, (x, d, n) => {
            if (_.isNil(editor[x])) {
              return;
            }
            editor[x]((event) => {
              updateStateValue();
              // const s_top = crt_editor.getScrollTop();
              // const s_left = crt_editor.getScrollLeft();
              // let saveobj = {
              //   top: s_top,
              //   left: s_left,
              //   selection: crt_editor.getSelection(),
              //   position: crt_editor.getPosition(),
              // };
            });
          });
        }}
      />
    </div>
  );
});

let common_fn = (preProps, nextProps) => {
  let chkResult =
    _.isEqual(preProps.otherConfig, nextProps.otherConfig) &&
    _.isEqual(preProps.language, nextProps.language) &&
    _.isEqual(preProps.wordWrap, nextProps.wordWrap) &&
    _.isEqual(preProps.id, nextProps.id) &&
    _.isEqual(preProps.title, nextProps.title) &&
    _.isEqual(preProps.chkObj, nextProps.chkObj) &&
    _.isEqual(preProps.style, nextProps.style);

  return chkResult;
};
InnerCoreEditor = React.memo(InnerCoreEditor, common_fn);
// false && lc_st_wrapper.positionLineNumber <= 1
// ? "1px solid transparent"
// :

let EditorCtxButton = observer((props) => {
  const {
    _,
    PopoverInteractionKind,
    Xterm,
    GFormSelect,
    Blink,
    HalfResizeForTwoHorizontal,
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
  let lc_store = useLocalStore(() => {
    return {
      popover_show: false,
    };
  });
  return (
    <Popover
      modifiers={{
        // shift: {
        //   enabled: false,
        // },
        preventOverflow: {
          enabled: false,
        },
        flip: {
          enabled: false,
        },
      }}
      isOpen={lc_store.popover_show}
      onInteraction={(state) => {
        lc_store.popover_show = state;
      }}
      interactionKind={PopoverInteractionKind.HOVER}
      usePortal={!_.isNil(props.portal) ? props.portal : true}
      minimal={true}
      position={"auto-end"}
      placement={props.placement || "bottom"}
    >
      <div className={clz(`editor-ctx-button`)}>{props.text}</div>
      <div
        style={{
          zIndex: 9999999,
          background: `var(--app-bg-white)`,
        }}
      >
        {props.type == "jsx" ? (
          React.createElement(props.jsx)
        ) : props.type == "menus" ? (
          <ConciseMenu
            fn_exit={() => {
              lc_store.popover_show = false;
            }}
            menus={props.menus}
          />
        ) : (
          <div>unknown type {props.type}</div>
        )}
      </div>
    </Popover>
  );
});

let EditorTitleBar = observer((props) => {
  const {
    _,
    Xterm,
    GFormSelect,
    Blink,
    HalfResizeForTwoHorizontal,
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
  const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
  let {
    getRef,
    getValue,
    setValue,
    createStyle,
    lc_st_wrapper,
    title,
    isVimOrOtherSomethings,
  } = props;

  let ctxProps = {
    getRef,
    getValue,
    setValue,
    lc_st_wrapper,
    validateCtn(res) {
      if (res.isOk == false) {
        throw new Error(res.result);
      }
    },
  };

  return (
    <div
      className={"editor-mytitle"}
      style={{
        ...createStyle(!isVimOrOtherSomethings),
        borderBottom: "1px solid var(--app-border-white-s3)",
        padding: "0",
        width: "100%",
        overflow: null,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: `var(--app-text-viewblack-pure)`,
        fontWeight: 440,
        borderTop: null,
        position: "relative",
      }}
    >
      <div className={"beflex" + ` ` + clz(`ctx-left`)}>
        <EditorCtxButton
          // portal={true}
          placement="bottom-start"
          type="menus"
          menus={window.ed_store.fn_menus_app(ctxProps)}
          text={`App`}
        />

        <EditorCtxButton
          // portal={true}
          type="menus"
          placement="bottom-start"
          menus={window.ed_store.fn_menus_transform(ctxProps)}
          text={t(`Transform`)}
        />
        <EditorCtxButton
          type="menus"
          placement="bottom-start"
          menus={window.ed_store.fn_menus_codec(ctxProps)}
          text={t(`Encrypt`)}
        />
        <EditorCtxButton
          // portal={true}
          placement="bottom-start"
          type="menus"
          menus={window.ed_store.fn_menus_formats(ctxProps)}
          text={t(`Formats`)}
        />
      </div>
      <div
        style={{
          // justifySelf: "center",
          background: `var(--app-bg-white)`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",

          // fontWeight: "600",
        }}
      >
        {_.isNil(title) ? t(`Text Input`) : title}
      </div>
      <div className={"beflex" + ` ` + clz(`ctx-right`)}>
        {/* <EditorCtxButton placement="bottom-end" text={t(`Language`)} /> */}
        <EditorCtxButton
          placement="bottom-end"
          type="jsx"
          jsx={() => {
            return (
              <div style={{ padding: "10px" }}>
                <Tabs>
                  {/* <Tab
                    id="current"
                    title={t(`Current`)}
                    panel={<div>current</div>}
                  ></Tab> */}
                  <Tab
                    id="global"
                    title={t(`Global`)}
                    panel={<Settings_editor />}
                  ></Tab>
                </Tabs>
              </div>
            );
          }}
          text={t(`Settings`)}
        />
      </div>
    </div>
  );
});

const GEditor = observer((props = {}) => {
  const {
    _,
    Xterm,
    GFormSelect,
    Blink,
    HalfResizeForTwoHorizontal,
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

  const { useRef } = React;
  let Editor = CodeGenDefinition.EXT_MONACO_ALL_REACT.default;
  let { DiffEditor, useMonaco, loader, monaco } =
    CodeGenDefinition.EXT_MONACO_ALL_REACT;
  console.log("editor-ref: init -> inner");

  gutils.once("init-editor-cdn", () => {
    // !gstore.sysinfo.cs &&
    if (false && gstore.sysinfo.cs) {
      let originValue =
        "/Users/jerrylai/mincontent/PersonalProjects/denote-fe/static";
      loader.config({
        urls: {
          monacoLoader: originValue + "/vs/loader.js",
          monacoBase: originValue + "/vs",
        },
      });
    } else if (!p_mode()) {
      let originValue = location.origin;
      // originValue = "http://127.0.0.1:18080";
      loader.config({
        urls: {
          monacoLoader: originValue + "/app/static/vs/loader.js",
          monacoBase: originValue + "/app/static/vs",
        },
      });
    } else {
      loader.config({
        urls: {
          // https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs/editor/editor.main.js

          monacoLoader:
            "https://lib.baomitu.com/monaco-editor/0.33.0-dev.20220208/min/vs/loader.js",
          monacoBase:
            "https://lib.baomitu.com/monaco-editor/0.33.0-dev.20220208/min/vs",
          //   monacoLoader:
          //   "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs/loader.js",
          // monacoBase:
          //   "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs",
        },
      });
    }
  });

  function getViewMode() {
    let chkObj = {
      viewmode: props.viewmode,
    };
    if (
      gstore.localSettings.editor_mode != "general" &&
      (_.isNil(chkObj.viewmode) || "general" == chkObj.viewmode)
    ) {
      chkObj.viewmode = gstore.localSettings.editor_mode;
    }
    return chkObj.viewmode;
  }
  const [btmID] = useState(_.uniqueId("m"));
  const [btmID_2] = useState(_.uniqueId("m"));
  const [crtId] = useState(_.uniqueId("a"));
  const [syncID, onSyncId] = useState(_.uniqueId("syncID"));
  let chkObj = {
    viewmode: getViewMode(),
    btmID: btmID,
    ID: crtId,
  };
  let isVimOrOtherSomethings =
    getViewMode() == "vim" || getViewMode() == "emacs";
  let factual_isVimOrSomeElse = isVimOrOtherSomethings;
  isVimOrOtherSomethings = false;

  let isDiffMode =
    _.get(props, "otherConfig.callFuncName") == "createDiffEditor";
  let title = props.title;
  if (props.fn_title) {
    title = props.fn_title();
  }
  let hasTitleMode = true; // !_.isNil(title);
  let wrapRef = useRef({
    editor: null,
  });
  let createStyle = (shouldVisible, arg = {}) => {
    return {
      overflow: "hidden",
      // width: "100%",
      background: "var(--app-bg-switch-dark)",
      boxSizing: "content-box",
      borderTop: shouldVisible
        ? "1px solid var(--app-border-white-s3)"
        : "none",
      color: "var(--app-text-gray-56-l)",
      fontSize: "11px",
      display: shouldVisible && !isDiffMode ? "block" : "hidden",
      padding: "0 10px",
      lineHeight: shouldVisible ? mybtmviewHeight : null,
      height: shouldVisible ? parseInt(mybtmviewHeight) - 1 + "px" : "0px",
    };
  };
  const passToEditorProps = {
    isDiffMode,
    mybtmviewHeight,
    hasTitleMode,
    chkObj,
    btmID_2,
  };
  const lc_st_wrapper = useLocalStore(() => {
    return {
      // OW=overwrite
      OW_language: null,
      is_crt_downlodable_file_mode: false,
      downloadable_file_text: null,
      text: "LN",
      len: 0,
      btmText: "",
      positionLineNumber: 0,
      positionColumn: 0,
      enter: false,
    };
  });
  let m_style = { overflow: "hidden", width: "100%", height: "100%" };
  if (props.style) {
    // _.merge(m_style, props.style);
  }
  if (props.needBorder) {
    m_style = {
      ...m_style,
      border: props.needBorder
        ? "1px solid var(--app-border-gray-e1e8ed)"
        : null,
    };
  }

  return (
    <div
      onMouseLeave={() => {
        lc_st_wrapper.enter = false;
      }}
      onMouseEnter={() => {
        lc_st_wrapper.enter = true;
      }}
      style={m_style}
    >
      {lc_st_wrapper.is_crt_downlodable_file_mode ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "var(--app-bg-white)",
            zIndex: 1,
            textAlign: "center",
            padding: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="bp3-non-ideal-state">
            <h3 className="bp3-heading">{t(`Output Result`)}</h3>
            <div>
              {t(
                `The file is ready to be downloaded, whose uid is {0}`,
                lc_st_wrapper.downloadable_file_text
              )}
            </div>
            <AnchorButton
              href={
                "/dg/downloadResultFile?uid=" +
                lc_st_wrapper.downloadable_file_text +
                "&systoken=" +
                Base64.encode(
                  JSON.stringify(window.LOCAL_AUTH_LOGIN_CHK.getUserInfo())
                )
              }
              target="_blank"
              text={t(`Download Result`)}
            ></AnchorButton>
          </div>
        </div>
      ) : (
        ""
      )}
      {hasTitleMode ? (
        <EditorTitleBar
          getValue={() => {
            try {
              return wrapRef.current.editor.getModel().getValue();
            } catch (e) {
              // console.log("err", e);
              // return "";
              throw e;
            }
          }}
          setValue={(val) => {
            try {
              wrapRef.current.editor.getModel().setValue(val);
            } catch (e) {
              console.log("err", e);
              throw e;
            }
          }}
          getRef={() => {
            return wrapRef.current.editor;
          }}
          lc_st_wrapper={lc_st_wrapper}
          isVimOrOtherSomethings={isVimOrOtherSomethings}
          createStyle={createStyle}
          title={title}
        ></EditorTitleBar>
      ) : (
        ""
      )}
      <InnerCoreEditor
        onEditorRef={(ref) => {
          wrapRef.current.editor = ref;
        }}
        lc_st_wrapper={lc_st_wrapper}
        {...props}
        {...passToEditorProps}
      />

      {true || !isVimOrOtherSomethings ? (
        <div
          id={btmID_2}
          style={{
            ...createStyle(true),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => {
              gutils.api.system.openSettingAPI("appearance");
            }}
            title={t(`Click to update text editor mode`)}
            id={btmID}
            className="btm_col_left"
          >
            {lc_st_wrapper.btmText || ""}
          </div>
          <div className="btm_col_right">
            {lc_st_wrapper.text}, {lc_st_wrapper.len} Characters
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default GEditor;

/**
    {false && isVimOrOtherSomethings ? (
        <div id={btmID} style={createStyle(isVimOrOtherSomethings)}></div>
      ) : (
        ""
      )}
 */
