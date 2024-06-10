import FormGEditor from "../FormGEditor";

const WrapperGeditor = observer((props = {}) => {
  return (
    <FormGEditor
      key={"" + gstore.localSettings.editor_mode}
      {...props}
    ></FormGEditor>
  );
});

export default WrapperGeditor;

// import {
//   Callout,
//   PanelStack,
//   ProgressBar,
//   AnchorButton,
//   Tooltip,
//   Dialog,
//   Drawer,
//   Overlay,
//   Alert,
//   RadioGroup,
//   Radio,
//   ButtonGroup,
//   TextArea,
//   Intent,
//   Position,
//   Toaster,
//   Checkbox,
//   Spinner,
//   ContextMenu,
//   NumericInput,
//   FormGroup,
//   HTMLSelect,
//   ControlGroup,
//   InputGroup,
//   Navbar,
//   NavbarHeading,
//   NonIdealState,
//   NavbarDivider,
//   NavbarGroup,
//   Alignment,
//   Classes,
//   Tree,
//   Icon,
//   Card,
//   Elevation,
//   Button,
//   PanelStack2,
// } from "@blueprintjs/core";
// import { Example,  } from "@blueprintjs/docs-theme";
// import {
//   ColumnHeaderCell,
//   Cell,
//   Column,
//   Table,
//   Regions,
// } from "@blueprintjs/table";
// import React, { memo, useRef } from "react";
// import ReactDOM from "react-dom";
// import gutils from "../../utils";
// import $ from "jquery";
// import { useCallback, useState, useEffect } from "react";
// import {
//   useStores,
//   useAsObservableSource,
//   useLocalStore,
//   useObserver,
// } from "mobx-react-lite";
// import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// // var createHistory = require("history").createBrowserHistory;
// import {
//   withRouter,
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import {autorun, observable, reaction}  from 'mobx'
// import gstore from "../../store.jsx";
// // import { initVimMode } from "monaco-vim";
// // import { EmacsExtension } from "monaco-emacs";
// import "./index.less";
// import {
//   Classes as Popover2Classes,
//   ContextMenu2,
//   Tooltip2,
// } from "@blueprintjs/popover2";
// import _, { constant } from "lodash";
// import Editor, {
//   DiffEditor,
//   useMonaco,
//   loader,
//   monaco,
// } from "@monaco-editor/react";
// import constants from "../../constants";
// window.abc = {
//   Editor,
//   DiffEditor,
//   useMonaco,
//   loader,
//   monaco,
// };

// function initForGroovy({ languages }) {
//   function getTokens(tokens, divider = "|") {
//     return tokens.split(divider);
//   }

//   const wordPattern = /(-?\d*\.\d\w*)|([^`~!@#%^&*()\-=+[{\]}\\|;:'",./?\s]+)/g;

//   const brackets = [
//     ["{", "}"],
//     ["[", "]"],
//     ["(", ")"],
//   ];

//   const bracketTokens = [
//     {
//       open: "[",
//       close: "]",
//       token: "delimiter.square",
//     },
//     {
//       open: "(",
//       close: ")",
//       token: "delimiter.parenthesis",
//     },
//     {
//       open: "{",
//       close: "}",
//       token: "delimiter.curly",
//     },
//   ];

//   const autoClosingPairs = [
//     { open: "{", close: "}" },
//     { open: "[", close: "]" },
//     { open: "(", close: ")" },
//     { open: '"', close: '"' },
//     { open: "'", close: "'" },
//     { open: "`", close: "`" },
//   ];

//   const surroundingPairs = autoClosingPairs;

//   const id = "groovy";
//   const label = "Groovy";

//   const registerGroovyLanguageForMonaco = () => {
//     languages.register({ id, aliases: [label] });

//     languages.setMonarchTokensProvider(id, {
//       brackets: bracketTokens,
//       tokenPostfix: ".groovy",
//       keywords: getTokens(
//         "assert|with|abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|def|float|native|super|while|in|as"
//       ),
//       typeKeywords: getTokens(
//         "Long|Integer|Short|Byte|Double|Number|Float|Character|Boolean|StackTraceElement|Appendable|StringBuffer|Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|StackOverflowError|OutOfMemoryError|VirtualMachineError|ArrayStoreException|ClassCastException|LinkageError|NoClassDefFoundError|ClassNotFoundException|RuntimeException|Exception|ThreadDeath|Error|Throwable|System|ClassLoader|Cloneable|Class|CharSequence|Comparable|String|Object"
//       ),
//       constants: getTokens("null|Infinity|NaN|undefined|true|false"),
//       builtinFunctions: getTokens(
//         "AbstractMethodError|AssertionError|ClassCircularityError|ClassFormatError|Deprecated|EnumConstantNotPresentException|ExceptionInInitializerError|IllegalAccessError|IllegalThreadStateException|InstantiationError|InternalError|NegativeArraySizeException|NoSuchFieldError|Override|Process|ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|SuppressWarnings|TypeNotPresentException|UnknownError|UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|InstantiationException|IndexOutOfBoundsException|ArrayIndexOutOfBoundsException|CloneNotSupportedException|NoSuchFieldException|IllegalArgumentException|NumberFormatException|SecurityException|Void|InheritableThreadLocal|IllegalStateException|InterruptedException|NoSuchMethodException|IllegalAccessException|UnsupportedOperationException|Enum|StrictMath|Package|Compiler|Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|NullPointerException"
//       ),
//       operators: [
//         ".",
//         ".&",
//         ".@",
//         "?.",
//         "*",
//         "*.",
//         "*:",
//         "~",
//         "!",
//         "++",
//         "--",
//         "**",
//         "+",
//         "-",
//         "*",
//         "/",
//         "%",
//         "<<",
//         ">>",
//         ">>>",
//         "..",
//         "..<",
//         "<",
//         "<=",
//         ">",
//         ">",
//         "==",
//         "!=",
//         "<=>",
//         "===",
//         "!==",
//         "=~",
//         "==~",
//         "^",
//         "|",
//         "&&",
//         "||",
//         "?",
//         ":",
//         "?:",
//         "=",
//         "**=",
//         "*=",
//         "/=",
//         "%=",
//         "+=",
//         "-=",
//         "<<=",
//         ">>=",
//         ">>>=",
//         "&=",
//         "^=",
//         "|=",
//         "?=",
//       ],
//       symbols: /[=><!~?:&|+\-*/^%]+/,
//       escapes:
//         /\\(?:[abfnrtv\\"'`]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

//       regexpctl: /[(){}[\]$^|\-*+?.]/,
//       regexpesc:
//         /\\(?:[bBdDfnrstvwWn0\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

//       tokenizer: {
//         root: [
//           { include: "@whitespace" },
//           [
//             /\/(?=([^\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
//             { token: "regexp", bracket: "@open", next: "@regexp" },
//           ],
//           { include: "@comments" },
//           { include: "@numbers" },
//           { include: "common" },
//           [/[;,.]/, "delimiter"],
//           [/[(){}[\]]/, "@brackets"],
//           [
//             /[a-zA-Z_$]\w*/,
//             {
//               cases: {
//                 "@keywords": "keyword",
//                 "@typeKeywords": "type",
//                 "@constants": "constant.groovy",
//                 "@builtinFunctions": "constant.other.color",
//                 "@default": "identifier",
//               },
//             },
//           ],
//           [
//             /@symbols/,
//             {
//               cases: {
//                 "@operators": "operator",
//                 "@default": "",
//               },
//             },
//           ],
//         ],
//         common: [
//           // delimiters and operators
//           [/[()[\]]/, "@brackets"],
//           [/[<>](?!@symbols)/, "@brackets"],
//           [
//             /@symbols/,
//             {
//               cases: {
//                 "@operators": "delimiter",
//                 "@default": "",
//               },
//             },
//           ],

//           [
//             /\/(?=([^\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/,
//             { token: "regexp", bracket: "@open", next: "@regexp" },
//           ],

//           // delimiter: after number because of .\d floats
//           [/[;,.]/, "delimiter"],

//           // strings
//           [/"([^"\\]|\\.)*$/, "string.invalid"],
//           [/'([^'\\]|\\.)*$/, "string.invalid"],
//           [/"/, "string", "@string_double"],
//           [/'/, "string", "@string_single"],
//         ],
//         whitespace: [[/\s+/, "white"]],
//         comments: [
//           [/\/\/.*/, "comment"],
//           [
//             /\/\*/,
//             {
//               token: "comment.quote",
//               next: "@comment",
//             },
//           ],
//         ],
//         comment: [
//           [/[^*/]+/, "comment"],
//           [
//             /\*\//,
//             {
//               token: "comment.quote",
//               next: "@pop",
//             },
//           ],
//           [/./, "comment"],
//         ],
//         commentAnsi: [
//           [
//             /\/\*/,
//             {
//               token: "comment.quote",
//               next: "@comment",
//             },
//           ],
//           [/[^*/]+/, "comment"],
//           [
//             /\*\//,
//             {
//               token: "comment.quote",
//               next: "@pop",
//             },
//           ],
//           [/./, "comment"],
//         ],
//         numbers: [
//           [/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?f?\b/, "number.float"],
//           [/[+-]?(?:0[obx])?\d+(?:u?[lst]?)?\b/, "number"],
//         ],
//         regexp: [
//           [
//             /(\{)(\d+(?:,\d*)?)(\})/,
//             [
//               "regexp.escape.control",
//               "regexp.escape.control",
//               "regexp.escape.control",
//             ],
//           ],
//           [
//             /(\[)(\^?)(?=(?:[^\]\\/]|\\.)+)/,
//             // @ts-ignore
//             [
//               "regexp.escape.control",
//               { token: "regexp.escape.control", next: "@regexrange" },
//             ],
//           ],
//           [
//             /(\()(\?:|\?=|\?!)/,
//             ["regexp.escape.control", "regexp.escape.control"],
//           ],
//           [/[()]/, "regexp.escape.control"],
//           [/@regexpctl/, "regexp.escape.control"],
//           [/[^\\/]/, "regexp"],
//           [/@regexpesc/, "regexp.escape"],
//           [/\\\./, "regexp.invalid"],
//           // @ts-ignore
//           [
//             /(\/)([gimsuy]*)/,
//             [
//               { token: "regexp", bracket: "@close", next: "@pop" },
//               "keyword.other",
//             ],
//           ],
//         ],

//         regexrange: [
//           [/-/, "regexp.escape.control"],
//           [/\^/, "regexp.invalid"],
//           [/@regexpesc/, "regexp.escape"],
//           [/[^\]]/, "regexp"],
//           [
//             /\]/,
//             { token: "regexp.escape.control", next: "@pop", bracket: "@close" },
//           ],
//         ],
//         embedded: [
//           [
//             /([^@]|^)([@]{4})*[@]{2}([@]([^@]|$)|[^@]|$)/,
//             {
//               token: "@rematch",
//               next: "@pop",
//               nextEmbedded: "@pop",
//             },
//           ],
//         ],
//         string_double: [
//           [/\$\{/, { token: "delimiter.bracket", next: "@bracketCounting" }],
//           [/[^\\"$]+/, "string"],
//           [/[^\\"]+/, "string"],
//           [/@escapes/, "string.escape"],
//           [/\\./, "string.escape.invalid"],
//           [/"/, "string", "@pop"],
//         ],
//         string_single: [
//           [/[^\\']+/, "string"],
//           [/@escapes/, "string.escape"],
//           [/\\./, "string.escape.invalid"],
//           [/'/, "string", "@pop"],
//         ],
//         string_backtick: [
//           [/\$\{/, { token: "delimiter.bracket", next: "@bracketCounting" }],
//           [/[^\\"$]+/, "string"],
//           [/@escapes/, "string.escape"],
//           [/\\./, "string.escape.invalid"],
//           [/"/, "string", "@pop"],
//         ],
//         bracketCounting: [
//           [/\{/, "delimiter.bracket", "@bracketCounting"],
//           [/\}/, "delimiter.bracket", "@pop"],
//           { include: "common" },
//         ],
//       },
//     });
//     languages.setLanguageConfiguration(id, {
//       comments: {
//         lineComment: "//",
//         blockComment: ["/*", "*/"],
//       },
//       brackets,
//       autoClosingPairs,
//       surroundingPairs,
//       wordPattern,
//     });
//   };
//   registerGroovyLanguageForMonaco();
// }

// const GEditor = observer((props = {}) => {
//   gutils.once("init-editor-cdn", () => {
//     if (!p_mode()) {
//       loader.config({
//         urls: {
//           monacoLoader: "/static/vs/loader.jsx",
//           monacoBase: "/static/vs",
//         },
//       });
//     } else {
//       // https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs/editor/editor.main.css
//       // https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs/loader.js
//       loader.config({
//         urls: {
//           monacoLoader:
//             "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs/loader.jsx",
//           monacoBase:
//             "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs",
//         },
//       });
//     }
//   });
//   let editor_options = {
//     fontSize: props.fontSize || gstore.localSettings.crt_editor_size,
//     value: "",
//     readOnly: props.readOnly,
//     minimap: {
//       enabled: true,
//     },
//     allowedCharacters: true,
//     allowedLocales: true,
//     ambiguousCharacters: false,
//     unicodeHighlight: {
//       ambiguousCharacters: false,
//     },
//     theme: gstore.localSettings.crt_theme,
//     wordWrap: props.wordWrap || "on",
//     automaticLayout: true,
//     language: props.language || "mysql",
//     ...(props.otherConfig || {}),
//   };
//   function getViewMode() {
//     let chkObj = {
//       viewmode: props.viewmode,
//     };
//     if (
//       gstore.localSettings.editor_mode != "general" &&
//       (_.isNil(chkObj.viewmode) || "general" == chkObj.viewmode)
//     ) {
//       chkObj.viewmode = gstore.localSettings.editor_mode;
//     }
//     return chkObj.viewmode;
//   }
//   const [btmID] = useState(_.uniqueId("m"));
//   const [btmID_2] = useState(_.uniqueId("m"));
//   const [crtId] = useState(_.uniqueId("a"));
//   let chkObj = {
//     viewmode: getViewMode(),
//     btmID: btmID,
//     ID: crtId,
//   };
//   let isVimOrOtherSomethings =
//     getViewMode() == "vim" || getViewMode() == "emacs";
//   let factual_isVimOrSomeElse = isVimOrOtherSomethings;
//   isVimOrOtherSomethings = false;
//   let mybtmviewHeight = "23px";
//   let bindCallback = useCallback(
//     _.debounce((...arr) => {
//       if (props.onChange) {
//         props.onChange(...arr);
//       }
//     }, 200),
//     [props.onChange]
//   );
//   let isDiffMode =
//     _.get(props, "otherConfig.callFuncName") == "createDiffEditor";
//   let MyObject = isDiffMode ? DiffEditor : Editor;

//   let crtRefForEditor = useRef({
//     val: 0,
//   });
//   let title = props.title;
//   let hasTitleMode = !_.isNil(title);

//   let createStyle = (shouldVisible, arg = {}) => {
//     return {
//       overflow: "hidden",
//       // width: "100%",
//       background: "var(--app-bg-switch-dark)",
//       boxSizing: "content-box",
//       borderTop: shouldVisible
//         ? "1px solid var(--app-border-white-s3)"
//         : "none",
//       color: "var(--app-text-gray-56-l)",
//       fontSize: "11px",
//       display: shouldVisible && !isDiffMode ? "block" : "hidden",
//       padding: "0 10px",
//       lineHeight: shouldVisible ? mybtmviewHeight : null,
//       height: shouldVisible ? parseInt(mybtmviewHeight) - 1 + "px" : "0px",
//     };
//   };
//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       {hasTitleMode ? (
//         <div
//           className="editor-mytitle"
//           style={{
//             ...createStyle(!isVimOrOtherSomethings),
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             // color: "var(--app-text-viewblack)",
//             color: "var(--app-text-viewblack-pure)",
//             fontWeight: "440",
//             borderTop: null,
//             borderBottom: "1px solid var(--app-border-white-s3)",
//           }}
//         >
//           <div>{title}</div>
//         </div>
//       ) : (
//         ""
//       )}
//       <div
//         style={{
//           width: "100%",
//           height: !isDiffMode
//             ? `calc(100% - ${mybtmviewHeight}${
//                 hasTitleMode ? ` - ${mybtmviewHeight}` : ""
//               })`
//             : "100%",
//         }}
//       >
//         <MyObject
//           viewmode={chkObj.viewmode}
//           options={editor_options}
//           theme={gutils.getEditorTheme(false)}
//           defaultLanguage={editor_options.language}
//           defaultValue={props.value}
//           {...(props.otherEditorProps || {})}
//           saveViewState={true}
//           onChange={bindCallback}
//           beforeMount={(monaco) => {
//             _.forEach(constants.finalThemeObj, (x, d, n) => {
//               if (!_.isNil(x.json)) {
//                 monaco.editor.defineTheme(d, x.json);
//               }
//             });
//           }}
//           onMount={async (editor, monaco) => {
//             console.log("updating on GEditor onMount", props.id, props);
//             await gutils.addonScript("/static/js/monaco-vim.jsx");
//             await gutils.addonScript("/static/js/monaco-emacs.jsx");
//             window.test_monaco = monaco;
//             window.test_editor = editor;
//             initForGroovy({
//               languages: monaco.languages,
//             });
//             let { initVimMode } = window.MonacoVim;
//             let { EmacsExtension } = window.MonacoEmacs;
//             let crt_editor = editor;
//             if (props.onRef) {
//               gutils.defer(() => {
//                 props.onRef(editor, monaco);
//               });
//             }
//             try {
//               editor.updateOptions({
//                 wordWrap: props.wordWrap || "on",
//               });
//             } catch (e) {
//               console.log(e);
//             }
//             const inst = editor;
//             gutils.editor_inst[props.id] = editor;
//             // vim or emacs
//             let initTempLocal = () => {
//               if (chkObj.viewmode == "vim") {
//                 // debugger;
//                 initVimMode(inst, $("#" + chkObj.btmID)[0]);
//               }
//               if (chkObj.viewmode == "emacs") {
//                 let ok = $("#" + chkObj.btmID);
//                 const emacsMode = new EmacsExtension(inst);
//                 emacsMode.onDidMarkChange((ev) => {
//                   ok.text(ev ? "Mark Set!" : "Mark Unset");
//                 });
//                 emacsMode.onDidChangeKey((str) => {
//                   ok.text(str);
//                 });
//                 emacsMode.start();
//               }
//             };
//             initTempLocal();
//             gutils.defer(() => {
//               if (props.noAutoFocus) {
//                 return;
//               }
//               crt_editor.focus();
//             });
//             // TODO: the logic
//             if (props.JSON_FILE_PATH) {
//               const JSON_FILE_PATH = props.JSON_FILE_PATH;
//               let json_fileStr = await window.ipc.readFileToStr(JSON_FILE_PATH);
//               let myjson = gutils.safeparse(json_fileStr);
//               if (!_.isNil(myjson)) {
//                 console.log("mypos", editor.getPosition());
//                 // // console.log("rendering the json file", myjson);
//                 if (!_.isNil(myjson.position)) {
//                   //debugger;
//                   editor.setPosition(myjson.position);
//                 }
//                 if (!_.isNil(myjson.selection)) {
//                   window.myjsontemp = myjson;
//                   editor.setSelection(myjson.selection);
//                 }
//                 if (!_.isNil(myjson.left)) {
//                   editor.setScrollLeft(myjson.left);
//                 }
//                 if (!_.isNil(myjson.top)) {
//                   editor.setScrollTop(myjson.top);
//                 }
//               }
//             }
//             function updateStateValue() {
//               try {
//                 let $btm2 = $("#" + btmID_2);
//                 let $btm_col_left = $btm2.find(".btm_col_left");
//                 let $btm_col_right = $btm2.find(".btm_col_right");
//                 let selObj = editor.getSelection();
//                 let editorModel = editor.getModel();
//                 const eol = editorModel.getEOL();
//                 const text = eol === "\n" ? "LF" : "CRLF";
//                 let len = editorModel.getValueLength();
//                 // const modelOptions = editorModel.getOptions();
//                 // const tabSize = modelOptions.tabSize;
//                 // const spaceOrTabSizeMessage = modelOptions.insertSpaces
//                 //   ? nls.localizeByDefault("Spaces: {0}", tabSize)
//                 //   : nls.localizeByDefault("Tab Size: {0}", tabSize);
//                 $btm_col_right.text(`${text}, ${len} Characters`);
//                 $btm_col_left.text(
//                   `Ln ${selObj.positionLineNumber}, Col ${selObj.positionColumn}`
//                 );
//               } catch (e) {
//                 console.log("e", e);
//                 //
//               }
//             }
//             gutils.defer(() => {
//               updateStateValue();
//             }, 100);
//             const moveArr = [
//               "onDidChangeCursorPosition",
//               "onDidChangeCursorSelection",
//               "onDidScrollChange",
//             ];
//             _.forEach(moveArr, (x, d, n) => {
//               if (_.isNil(editor[x])) {
//                 return;
//               }
//               editor[x]((event) => {
//                 updateStateValue();
//                 const s_top = crt_editor.getScrollTop();
//                 const s_left = crt_editor.getScrollLeft();
//                 let saveobj = {
//                   top: s_top,
//                   left: s_left,
//                   selection: crt_editor.getSelection(),
//                   position: crt_editor.getPosition(),
//                 };

//                 // if (props.onAnyMotionMove) {
//                 //   if (crtRefForEditor.current.val != 0) {
//                 //     props.onAnyMotionMove(saveobj);
//                 //   }
//                 //   crtRefForEditor.current.val++;
//                 // }
//               });
//             });
//           }}
//         />
//       </div>
//       {false && isVimOrOtherSomethings ? (
//         <div id={btmID} style={createStyle(isVimOrOtherSomethings)}></div>
//       ) : (
//         ""
//       )}
//       {true || !isVimOrOtherSomethings ? (
//         <div
//           id={btmID_2}
//           style={{
//             ...createStyle(true),
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div
//             id={factual_isVimOrSomeElse ? btmID : undefined}
//             className="btm_col_left"
//           ></div>
//           <div className="btm_col_right"></div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// });

// export default React.memo(GEditor, (preProps, nextProps) => {
//   let chkResult =
//     _.isEqual(preProps.otherConfig, nextProps.otherConfig) &&
//     _.isEqual(preProps.language, nextProps.language) &&
//     _.isEqual(preProps.id, nextProps.id) &&
//     _.isEqual(preProps.title, nextProps.title) &&
//     _.isEqual(preProps.style, nextProps.style);
//   console.log("updating on GEditor onMount", nextProps.id, chkResult);
//   return chkResult;
// });

// // class OldGEditor extends React.Component {
// //   shouldComponentUpdate() {
// //     // // console.log("should updating G-Editor, false");
// //     return false;
// //   }
// //   componentDidMount() {
// //     // // console.log("mounting new g-editor", this);
// //   }
// //   mycrtid = _.uniqueId("myuidtxt");
// //   autofnlist = [];
// //   state = {
// //     loading: true,
// //   };
// //   componentWillUnmount() {
// //     _.forEach(this.autofnlist, (x) => {
// //       x();
// //     });
// //     if (this.inst) {
// //       setTimeout(() => {
// //         this.inst.dispose();
// //         delete gutils.editor_inst[this.props.id];
// //       });
// //     }
// //   }
// //   getViewMode = () => {
// //     let chkObj = {
// //       viewmode: this.props.viewmode,
// //     };
// //     if (
// //       gstore.localSettings.editor_mode != "general" &&
// //       (_.isNil(chkObj.viewmode) || "general" == chkObj.viewmode)
// //     ) {
// //       chkObj.viewmode = gstore.localSettings.editor_mode;
// //     }
// //     return chkObj.viewmode;
// //   };
// //   updateMoveCtn = 0;
// //   handleRef = _.debounce((e) => {
// //     this.setState({
// //       loading: true,
// //     });
// //     const crtId = this.props.id;
// //     if (e != null && $("#" + crtId).length != 0) {
// //       gutils.defer(async () => {
// //         let initEle = document.getElementById(crtId);
// //         if (initEle != null) {
// //           let conf = {
// //             value: "",
// //             readOnly: this.props.readOnly,
// //             minimap: {
// //               enabled: true,
// //             },
// //             allowedCharacters: true,
// //             allowedLocales: true,
// //             ambiguousCharacters: false,
// //             unicodeHighlight: {
// //               ambiguousCharacters: false,
// //             },
// //             theme: gutils.getEditorTheme(false),
// //             wordWrap: this.props.wordWrap || "on",
// //             automaticLayout: true,
// //             language: this.props.language || "mysql",
// //             ...(this.props.otherConfig || {}),
// //           };
// //           gutils.createEditor(initEle, conf, {
// //             ID: crtId,
// //             btmID: this.mycrtid,
// //             viewmode: this.getViewMode(),
// //             created: async (editor) => {
// //               // // console.log("global editor", editor);
// //               if (!_.isNil(editor)) {
// //                 window.db_editor = editor;
// //               }
// //               this.inst = editor;
// //               this.autofnlist.push(
// //                 reaction(
// //                   () => {
// //                     return [gstore.localSettings.is_using_dark_mode];
// //                   },
// //                   () => {
// //                     editor.updateOptions({
// //                       theme: gutils.getEditorTheme(),
// //                     });
// //                   }
// //                 )
// //               );
// //               this.autofnlist.push(
// //                 reaction(
// //                   () => {
// //                     return [gstore.localSettings.crt_theme];
// //                   },
// //                   () => {
// //                     editor.updateOptions({
// //                       theme: gutils.getEditorTheme(false),
// //                     });
// //                   }
// //                 )
// //               );
// //               gutils.editor_inst[this.props.id] = editor;
// //               // init changes event
// //               if (editor.getModel().onDidChangeContent) {
// //                 editor.getModel().onDidChangeContent((event) => {
// //                   // console.log("did change event", event);
// //                   if (this.props.onChange) {
// //                     this.props.onChange(editor.getModel().getValue(), {
// //                       event,
// //                       editor,
// //                     });
// //                   }
// //                 });
// //               }
// //               let crt_editor = editor;
// //               // crt_editor.setTheme("vs-dark");
// //               if (this.props.onRef) {
// //                 this.props.onRef(editor);
// //               }
// //               gutils.defer(() => {
// //                 if (this.props.noAutoFocus) {
// //                   return;
// //                 }
// //                 crt_editor.focus();
// //               });
// //               // TODO: the logic
// //               if (this.props.JSON_FILE_PATH) {
// //                 const JSON_FILE_PATH = this.props.JSON_FILE_PATH;
// //                 let json_fileStr = await window.ipc.readFileToStr(
// //                   JSON_FILE_PATH
// //                 );
// //                 let myjson = gutils.safeparse(json_fileStr);
// //                 if (!_.isNil(myjson)) {
// //                   console.log("mypos", editor.getPosition());
// //                   if (!_.isNil(myjson.position)) {
// //                     editor.setPosition(myjson.position);
// //                   }
// //                   if (!_.isNil(myjson.selection)) {
// //                     window.myjsontemp = myjson;
// //                     editor.setSelection(myjson.selection);
// //                   }
// //                   if (!_.isNil(myjson.left)) {
// //                     editor.setScrollLeft(myjson.left);
// //                   }
// //                   if (!_.isNil(myjson.top)) {
// //                     editor.setScrollTop(myjson.top);
// //                   }
// //                 }
// //               }
// //               const moveArr = [
// //                 "onDidChangeCursorPosition",
// //                 "onDidChangeCursorSelection",
// //                 "onDidScrollChange",
// //               ];
// //               _.forEach(moveArr, (x, d, n) => {
// //                 if (_.isNil(editor[x])) {
// //                   return;
// //                 }
// //                 editor[x]((event) => {
// //                   const s_top = crt_editor.getScrollTop();
// //                   const s_left = crt_editor.getScrollLeft();
// //                   let saveobj = {
// //                     top: s_top,
// //                     left: s_left,
// //                     selection: crt_editor.getSelection(),
// //                     position: crt_editor.getPosition(),
// //                   };
// //                   // // console.log("on moving will save", event);
// //                   if (this.props.onAnyMotionMove) {
// //                     if (this.updateMoveCtn != 0) {
// //                       this.props.onAnyMotionMove(saveobj);
// //                     }
// //                     this.updateMoveCtn++;
// //                   }
// //                 });
// //               });
// //               this.setState({
// //                 loading: false,
// //               });
// //             },
// //           });
// //         }
// //       });
// //     }
// //   }, 30);
// //   render() {
// //     // // console.log("rendering the g-editor");
// //     window.temp123123 = this;
// //     const props = this.props;
// //     const crtId = props.id;
// //     let isVimOrOtherSomethings =
// //       this.getViewMode() == "vim" || this.getViewMode() == "emacs";
// //     let mybtmviewHeight = "26px";
// //     return (
// //       <div style={{ width: "100%", height: "100%" }}>
// //         <div
// //           style={{
// //             width: "100%",
// //             height: isVimOrOtherSomethings
// //               ? `calc(100% - ${mybtmviewHeight})`
// //               : "100%",
// //           }}
// //         >
// //           <div
// //             id={crtId}
// //             ref={this.handleRef}
// //             style={_.merge(props.style, {
// //               position: "relative",
// //             })}
// //             className="sys-editor"
// //           >
// //             {false && this.state.loading && this.props.noLoading != true ? (
// //               <Example>
// //                 <ProgressBar intent={"none"} size={50} value={null} />
// //               </Example>
// //             ) : (
// //               ""
// //             )}
// //           </div>
// //         </div>
// //         <div
// //           id={this.mycrtid}
// //           style={{
// //             overflow: "hidden",
// //             // width: "100%",
// //             background: "var(--app-bg-switch-dark)",
// //             boxSizing: "content-box",
// //             borderTop: isVimOrOtherSomethings
// //               ? "1px solid var(--app-border-white-s3)"
// //               : "none",
// //             color: "var(--app-text-gray-bbbbbb-hl)",
// //             fontSize: "12px",
// //             display: isVimOrOtherSomethings ? "block" : "hidden",
// //             padding: "0 5px",
// //             lineHeight: isVimOrOtherSomethings ? mybtmviewHeight : null,
// //             height: isVimOrOtherSomethings
// //               ? parseInt(mybtmviewHeight) - 1 + "px"
// //               : "0px",
// //           }}
// //         ></div>
// //       </div>
// //     );
// //   }
// // }

// // class A extends React.Component {
// //   componentDidMount() {}

// //   shouldComponentUpdate() {
// //     return false;
// //   }
// //   render() {
// //     return <GEditor {...this.props} />;
// //   }
// // }
