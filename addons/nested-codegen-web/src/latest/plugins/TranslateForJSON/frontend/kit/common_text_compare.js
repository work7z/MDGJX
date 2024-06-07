const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GFormSwitch,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Tag,
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
  GSyncSelectWithFilter,
  Provider,
  Router,
  GFormInput,
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

const CommonTextCompareEditor = observer((props) => {
  let { crtStoreName } = props;
  let [mycrtEditor, onCrtEditor] = useState(null);
  let model = gstore.common_app[crtStoreName].model;
  let { language, PUtils } = props;
  useEffect(() => {
    // gutils.defer(() => {
    //   let b = PUtils.crtModel.highlight_language_type;
    //   monaco.editor.setModelLanguage(
    //     PUtils.crtStore.diffEditor.getOriginalEditor().getModel(),
    //     b
    //   );
    //   monaco.editor.setModelLanguage(
    //     PUtils.crtStore.diffEditor.getModifiedEditor().getModel(),
    //     b
    //   );
    // }, 5000);
  }, []);
  return (
    <GEditor
      otherConfig={{
        title: props.title,
        callFuncName: "createDiffEditor",
        enableSplitViewResizing: true,
        originalEditable: true,
        readOnly: false,
        followsCaret: true, // resets the navigator state when the user selects something in the editor
        ignoreCharChanges: true, // jump from line to line
        language: language,
      }}
      title={props.title}
      id="mytextcompare2"
      key={"mytextcompare" + language}
      onRef={(editor, monaco) => {
        gstore.common_app[crtStoreName].diffEditor = editor;
        model = gstore.common_app[crtStoreName].model;
        editor.updateOptions({
          renderSideBySide: !gstore.common_app[crtStoreName].model.inlineView,
          wordWrap: gstore.common_app[crtStoreName].model.wordWrap,
        });
        var originalModel = monaco.editor.createModel(
          model.leftValue,
          language
        );
        var modifiedModel = monaco.editor.createModel(
          model.rightValue,
          language
        );
        try {
          let commonSave = _.throttle(() => {
            gutils.api.common_app.common.saveModelById(
              PUtils.crtStoreName,
              false
            );
          }, 800);
          originalModel.onDidChangeContent((event) => {
            model = gstore.common_app[crtStoreName].model;
            if (window.ackForUpdate) {
              window.ackForUpdate = false;
              return;
            }
            model.leftValue = originalModel.getValue();
            console.log(model.leftValue, model);
            window.ackForUser = true;
            commonSave();
          });
          modifiedModel.onDidChangeContent((event) => {
            model = gstore.common_app[crtStoreName].model;
            if (window.ackForUpdate) {
              window.ackForUpdate = false;
              return;
            }
            console.log("loading right value", modifiedModel.getValue());
            model.rightValue = modifiedModel.getValue();
            window.ackForUser = true;
            commonSave();
          });
          editor.setModel({
            original: originalModel,
            modified: modifiedModel,
          });
          gstore.common_app[crtStoreName].setLeftValue = (val) => {
            if (originalModel.setValue) {
              originalModel.setValue(val);
            }
          };
          gstore.common_app[crtStoreName].setRightValue = (val) => {
            if (modifiedModel.setValue) {
              modifiedModel.setValue(val);
            }
          };
          gstore.common_app[crtStoreName].editor = editor;
          onCrtEditor(editor);
        } catch (e) {
          console.log("err", e);
        }
        gutils.defer(() => {
          window.editor_001 = editor;
          window.language_001 = language;
          monaco.editor.setModelLanguage(
            editor.getOriginalEditor().getModel(),
            language
          );
          monaco.editor.setModelLanguage(
            editor.getModifiedEditor().getModel(),
            language
          );
        }, 1000);
      }}
      style={{ width: "100%", height: "100%" }}
    ></GEditor>
  );
});

export default CommonTextCompareEditor;
