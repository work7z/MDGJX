const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GFormInput,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  GSyncSelectWithFilter,
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

const Kit_clickToInput = observer((props) => {
  let obj = props.obj;
  let index = props.index;
  return (
    <GFormInput
      placeholder={props.placeholder}
      small={true}
      disabled={true}
      onChange={(val) => {
        obj["" + index] = val;
      }}
      value={obj["" + index]}
      rightElement={[
        <Button
          text={t(`Edit`)}
          intent={"none"}
          small={true}
          onClick={async (val) => {
            let newval = await gutils.win_prompt(
              t(`Please input the new value:`)
            );
            if (_.isNil(newval) || _.trim(newval) == "") {
              gutils.alert(t(`Value cannot be empty!`));
              return;
            }
            if (!_.isNil(newval)) {
              obj[index] = `CODE_USER: ` + newval;
            }
          }}
        />,
      ]}
    />
  );
});

export default Kit_clickToInput;
