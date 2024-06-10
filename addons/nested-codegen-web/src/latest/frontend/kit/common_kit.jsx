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
  GSyncSelectWithFilter,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;

let EditorLanguageSelector = observer((props) => {
  let allLangs = [];
  try {
    _.forEach(monaco.languages.getLanguages(), (x, d, n) => {
      allLangs.push({
        label: x.id,
        value: x.id,
      });
    });
  } catch (e) {
    console.log("err", e);
  }
  let { model, PUtils } = props;
  if (_.isNil(model.highlight_language_type)) {
    let x = "javascript";
    model.highlight_language_type = x;
    setTimeout(() => {
      if (props.statChg) {
        props.statChg(x);
      }
    }, 10);
  }
  return (
    <div style={{ display: "inline-block" }}>
      <GSyncSelectWithFilter
        small={true}
        obj={model}
        list={allLangs}
        index={"highlight_language_type"}
        whenChg={(x) => {
          model.highlight_language_type = x;
          if (props.statChg) {
            props.statChg(x);
          }
        }}
      />
    </div>
  );
});

let c_kit = {
  EditorLanguageSelector,
};
export default c_kit;
