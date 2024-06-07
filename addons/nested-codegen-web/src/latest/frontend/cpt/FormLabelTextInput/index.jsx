const {
  BluePrintDateTime,
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
  Tag,
  LocaleUtils,
  MomentLocaleUtils,
  useHistory,
} = window.CodeGenDefinition;
// import { LocaleUtils } from "react-day-picker";
// import MomentLocaleUtils from "react-day-picker/moment";

export default observer((props) => {
  // return <div>ok</div>;
  let iptVal = props.obj[props.index];
  let onIptVal = (val) => {
    props.obj[props.index] = val;
    if (props.onChg) {
      props.onChg(props.obj[props.index]);
    }
  };
  let FinalInput = InputGroup;
  let isValidForDateTime = false;
  let finalRightElement = null;
  if (!_.isNil(BluePrintDateTime) && props.mode == "datetime") {
    isValidForDateTime = true;
    window.BluePrintDateTime = BluePrintDateTime;
    let { DateTimePicker } = BluePrintDateTime;
    let fn_chg_datetime = (e) => {
      console.log("tmp-e", e);
      window.tmp_e = e;
      let strval = Moment(e).format("YYYY-MM-DD HH:mm:ss");
      onIptVal(strval);
    };
    let locale_str = _.toLower((getCrtLang() || "").replace("_", "-"));
    let fn_val_valuedatetime = () => {
      let val_valuedatetime = iptVal;
      if (_.isNil(val_valuedatetime) || _.isString(val_valuedatetime)) {
        try {
          val_valuedatetime = Moment(val_valuedatetime).toDate();
        } catch (e) {
          console.log(e);
        }
      }
      if (!_.isDate(val_valuedatetime)) {
        val_valuedatetime = new Date();
      }
      window.fn_val_valuedatetime = fn_val_valuedatetime;
      return val_valuedatetime;
    };
    finalRightElement = (
      <Popover
        minimal={true}
        style={{ minWidth: "auto", padding: "10px", height: "100%" }}
        portalClassName=""
        enforceFocus={true}
        placement="bottom-end"
      >
        <Button>{t(`Select Datetime`)}</Button>
        <div>
          <DateTimePicker
            locale={locale_str}
            localeUtils={MomentLocaleUtils}
            className={Classes.ELEVATION_1}
            value={fn_val_valuedatetime()}
            timePickerProps={{
              locale: locale_str,
              value: fn_val_valuedatetime(),
              localeUtils: MomentLocaleUtils,
              onChange: fn_chg_datetime,
              precision: "second",
              useAmPm: true,
            }}
            datePickerProps={{
              locale: locale_str,
              value: fn_val_valuedatetime(),
              localeUtils: MomentLocaleUtils,
              maxDate: Moment().add(5, "years").toDate(),
              onChange: fn_chg_datetime,
            }}
            onChange={fn_chg_datetime}
          />
          <div
            style={{ display: "none", textAlign: "right", padding: "5px 5px" }}
          >
            <Button
              onClick={() => {
                // updating the values
                onIptVal(Moment(iptVal).format("YYYY-MM-DD HH:mm:ss"));
              }}
              intent={"primary"}
              text={t(`Confirm`)}
            ></Button>
          </div>
        </div>
      </Popover>
    );
  }
  return (
    <FinalInput
      leftElement={<Tag minimal={true}>{props.label}</Tag>}
      {...gutils.propsForInput(props, iptVal, onIptVal)}
      {...(props.iptProps || {})}
      rightElement={
        !isValidForDateTime && props.mode == "datetime" ? (
          <Button
            onClick={async () => {
              await gutils.win_alert(
                t(
                  `Sorry, you saw this button because there're some feature cannot be supported at your current version, please update your CodeGen to the latest version so as to enjoy the latest feature`
                )
              );
            }}
          >
            {t(`README`)}
          </Button>
        ) : (
          finalRightElement
        )
      }
    ></FinalInput>
  );
});
