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
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;

export default observer((props) => {
  let { column, data } = props;
  return (
    <table
      style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}
      className="bp3-html-table simple-g-table  bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered"
    >
      <thead>
        <tr>
          {_.map(column, (x, d, n) => {
            return <th key={x.label}>{x.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {_.map(data, (x, d, n) => {
          return (
            <tr key={d + `${x.label}`}>
              {_.map(column, (eachCol, _eachColIdx) => {
                let eachColIdx = _eachColIdx;
                return (
                  <td
                    style={{ verticalAlign: "center" }}
                    key={eachCol.label + eachColIdx}
                  >
                    {eachCol.value(x, eachColIdx, {}) || ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
