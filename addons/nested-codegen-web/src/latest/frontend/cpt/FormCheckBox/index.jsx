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
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import "./index.less";

export default observer((props) => {
  let { list, index, obj, chg } = props;
  if (_.isNil(chg)) {
    chg = () => {
      //
    };
  }
  let model = obj;
  let valueArr = obj[index];
  if (_.isNil(valueArr)) {
    valueArr = [];
    gutils.defer(() => {
      model[index] = valueArr;
      chg(model[index]);
    });
  }
  return (
    <div className="gformchkbox-wrapper">
      {_.map(list, (x, d, n) => {
        let crtIdx = _.findIndex(valueArr, (xx) => xx == x.value);
        let crt_checked = crtIdx != -1;
        console.log("is selecting", crt_checked, x, d, model[index]);
        return (
          <Checkbox
            key={x.value}
            inline={true}
            label={x.label}
            checked={crt_checked}
            onChange={(chkval) => {
              if (crt_checked) {
                model[index] = gutils.pickArr(valueArr, crtIdx);
              } else {
                model[index] = [...valueArr, x.value];
              }
              chg(model[index]);
            }}
          />
        );
      })}
      <div style={{ marginBottom: "5px" }}>
        <Button
          small={true}
          text={t(`Select All`)}
          onClick={() => {
            model[index] = _.map(list, (x) => x.value);
            chg(model[index]);
          }}
        ></Button>
        <Button
          small={true}
          text={t(`Deselect All`)}
          onClick={() => {
            model[index] = [];
            chg(model[index]);
          }}
        ></Button>
        {_.map(props.filter_option_list, (x, d, n) => {
          return (
            <Button
              key={x.label}
              small={true}
              text={x.label}
              onClick={() => {
                model[index] = _.map(x.filter(list), (x) => x.value);
                chg(model[index]);
              }}
            ></Button>
          );
        })}
      </div>
    </div>
  );
});
