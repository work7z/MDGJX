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
  Example,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import "./index.less";

const { TableLoadingOption } = CodeGenDefinition.BluePrintTable;

const FullOptTable = observer((props) => {
  const dollarCellRenderer = (rowIndex) => (
    <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
  );
  const euroCellRenderer = (rowIndex) => (
    <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
  );

  return (
    <div className="w100 h100">
      <Table numRows={10000}>
        <Column name="Dollars" cellRenderer={dollarCellRenderer} />
        <Column name="Euros" cellRenderer={euroCellRenderer} />
      </Table>
    </div>
  );
});

export default FullOptTable;

// columnWidths={mycolw ? mycolw : null}
// onColumnWidthChanged={
//   !mycolw
//     ? null
//     : (...x) => {
//         // // console.log("chg column width", x);
//         const newarr = [...mycolw];
//         newarr[x[0]] = x[1];
//         onMyColW(newarr);
//       }
// }
// numFrozenColumns={2}
// numRows={1000}
// loadingOptions={[
//   TableLoadingOption.CELLS,
//   TableLoadingOption.COLUMN_HEADERS,
//   TableLoadingOption.ROW_HEADERS,
// ]
