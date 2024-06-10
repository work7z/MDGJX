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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};

let appTitle = "Binary-Coded Decimal";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        myvalue: 12345,
      };
    },
    menus: [
      {
        ...fn_otherPages.get_math_list(),
        children: [
          {
            label: appTitle,
            icon: "numerical",
            pid: "MathBCD",
          },
        ],
      },
    ],
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.simpleLeftRightConvertor({
        noTriggerWhenCall: true,
        noSources: false,
        syncView: true,
        type: "plaintext",
        fontSize: 18,
        helperText: `BCD (binary-coded Decimal) code, also known as Binary Decimal or binary-decimal code, uses four bits to store a Decimal number, making it easy to quickly convert Binary to Decimal. \n
This coding technique is most commonly used in the design of accounting systems, which often require long strings of numbers to be calculated accurately. Compared with the general floating-point notation, BCD code can not only preserve the accuracy of the numerical value but also avoid the time consumed by the computer in the floating-point calculation. In addition, BCD coding is also commonly used for other computations requiring high precision. \n
The BCD code is a four-digit binary code, which converts decimal digits into binary digits. However, unlike normal conversion, each decimal digit 0-9 corresponds to a four-digit binary code as follows: decimal 0 corresponds to binary 0000; Decimal 1 corresponds to binary 0001...... .9 1001 The next 10 have two of the above codes to indicate that 10 in 00010000, that is, the BCD code is carried on meeting 1001, unlike ordinary binary code, which is carried until 1111. \n
@reference: Hutool`,
        fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
          return [
            {
              onClick: fn_formatSelfTranslate("strToBcd"),
              label: t(`String to BCD`),
              intent: "primary",
            },
            {
              onClick: fn_formatSelfTranslate("bcdToStr"),
              label: t(`BCD to String`),
              intent: "primary",
            },
          ];
        },
        totalTitle: appTitle,
        mainBtnText: "Evaluate",
        language: "markdown",
        exampleStr: `12345\n1\n2\n3\n200`,
        handle: async (
          { leftValue, type = "strToBcd" },
          { crtStoreName, PUtils }
        ) => {
          console.log("rendering v1", type, leftValue);
          let str = leftValue;
          let finarr = _.chain(str).split("\n").value();
          let waitArr = [];
          for (let eachItem of finarr) {
            let { data } = await gref.optAPI("bcd_transform", {
              text: eachItem,
              type: type,
            });
            waitArr.push(_.get(data, "value"));
          }
          return {
            result: waitArr.join("\n"),
          };
        },
        fn_configItem: ({ crtStoreName, PUtils }) => [],
      })
    ),
  };
};
