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

/**
 * only change it when onBlur
 */
const GFormInput2 = observer((props) => {
  const [iptVal = props.value, onIptVal] = useState(props.value);
  const [showPassword, onShowPassword] = useState(false);
  useEffect(() => {
    // debugger;
    onIptVal(props.value);
    return () => {};
  }, [props.value]);
  const lockButton = (
    <Button
      small={props.small}
      icon={showPassword ? "unlock" : "lock"}
      intent={Intent.WARNING}
      minimal={true}
      onClick={() => {
        onShowPassword(showPassword ? false : true);
      }}
    />
  );
  let FinalVal = InputGroup;
  if (props.type == "textarea") {
    FinalVal = TextArea;
  }
  // console.log("rendering logic for ", iptVal, props.value);
  if (_.isNil(iptVal) && !_.isEmpty(props.value)) {
    gutils.defer(() => {
      onIptVal(props.value);
    });
  }
  const updateFn = (x) => {
    console.log(x.target.value);
    // // // console.log("final update", iptVal);
    // props.onChange(iptVal);
    //   _.forEach(gutils.whenBlurFunc, (x, d, n) => {
    //     x();
    //   });
    //   gutils.whenBlurFunc = [];
    // // // console.log("on change", x.target.value);
    onIptVal(x.target.value);
    if (props.onChangeDelay) {
      props.onChangeDelay(x.target.value, {
        // needUpdateValue: false,
        forceUpdateNow: false,
      });
    }
    if (props.onChange) {
      props.onChange(x.target.value);
    }
    if (props.chg) {
      props.chg(x.target.value);
    }
  };
  const ref_100 = React.useRef({
    update_fn: _.debounce((x) => {
      updateFn(x);
    }, 7000),
  });
  const inner_ipt = {
    full: props.full,
    intent: props.intent,
    placeholder: props.noTranslate ? props.placeholder : t(props.placeholder),
    id: props.id,
    value: iptVal, // props.value
    onBlur: updateFn,
    asyncControl: true,
    onChange: (x) => {
      //   ref_100.current.update_fn(x);
      if (props.type == "textarea" && props.notForceTextArea !== true) {
        updateFn(x);
      } else if (props.directCall) {
        updateFn(x);
      }
    },
  };
  let btnT = (
    <FinalVal
      disabled={props.disabled}
      small={props.small}
      placeholder={props.placeholder}
      type={
        (props.type == "password"
          ? showPassword
            ? "text"
            : "password"
          : props.type) || "text"
      }
      style={{
        width: props.width || "100%",
        display: props.inline ? "inline-block" : null,
      }}
      rows={5}
      {...inner_ipt}
      rightElement={props.type == "password" ? lockButton : props.rightElement}
      leftElement={props.leftElement}
    />
  );
  if (props.inline) {
    return btnT;
  }
  return <div>{btnT}</div>;
});

export default GFormInput2;
