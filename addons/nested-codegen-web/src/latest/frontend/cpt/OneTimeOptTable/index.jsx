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
  Example,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import "./index.less";

const { Table2, TableLoadingOption } = CodeGenDefinition.BluePrintTable;

const dollarCellRenderer = (rowIndex) => (
  <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
);
const euroCellRenderer = (rowIndex) => (
  <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
);

const OneTimeOptTable = observer((props) => {
  if (props.rowSize == 0 && props.forceThoughNought !== true) {
    return <div style={{ padding: "10px" }}>{t(`There is no data yet.`)}</div>;
  }
  return (
    <div className="w100 h100">
      <Table2
        columnWidths={props.columnWidths}
        onColumnWidthChanged={
          props.columnWidths
            ? (index, number) => {
                props.onColumnWidthChanged(index, number);
              }
            : null
        }
        onColumnsReordered={false}
        enableColumnReordering={true}
        enableColumnResizing={true}
        numRows={props.rowSize || 0}
      >
        {_.map(props.columns, (x, d, n) => {
          return (
            <Column
              key={d}
              name={x.label}
              cellRenderer={(idx) => {
                let result = x.render(idx);
                if (_.isObject(result)) {
                  return result.jsx;
                }
                return <Cell>{result}</Cell>;
              }}
            />
          );
        })}
      </Table2>
    </div>
  );
});

export default OneTimeOptTable;
