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

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = {
  initialState() {
    return {
      currentNumberBase: "decimal",
    };
  },
  menus: [
    {
      label: "Math Tools",
      icon: "numerical",
      pid: "mathTools",
      children: [
        {
          label: "HexBinDecOct",
          icon: "clean",
          pid: "NumberDigits",
        },
      ],
    },
  ],
  render: fn_otherPages.simpleLeftRightConvertor({
    type: "plaintext",
    fontSize: 18,
    language: "markdown",
    totalTitle: "Convert Number",
    exampleStr: `100\n3.129\n11.1293\n10040033919\n129.31`,
    handle: async ({ leftValue }, { crtStoreName, PUtils }) => {
      let str = leftValue;
      let currentNumberBase =
        gstore.common_app[crtStoreName].model.currentNumberBase;
      return {
        result: _.chain(str)
          .split("\n")
          .filter((x) => "" != _.trim(x))
          .map((x) => {
            x = _.trim(x);
            let thatval = null;
            if (currentNumberBase == "decimal") {
              thatval = Number(x);
            } else if (currentNumberBase == "binary") {
              thatval = +parseInt(x, 2);
            } else if (currentNumberBase == "octal") {
              thatval = +parseInt(x, 8);
            } else if (currentNumberBase == "hexadecimal") {
              thatval = +parseInt(x, 16);
            }
            let res_isNaN = isNaN(thatval);
            let myarr = [
              `# ${x}`,
              `> Based on ${_.upperFirst(currentNumberBase)}`,
            ];
            if (res_isNaN) {
              myarr.push(`\t=Invalid Number`);
            } else {
              myarr.push(`\t+ Binary(2)\n\t\t` + thatval.toString(2));
              myarr.push(`\t+ Octal(8)\n\t\t` + thatval.toString(8));
              myarr.push(`\t+ Decimal(10)\n\t\t` + thatval.toString(10));
              myarr.push(`\t+ Hexadecimal(16):\n\t\t` + thatval.toString(16));
            }
            return myarr.join("  \n");
          })
          .join(`\n\n`)
          .value(),
      };
    },
    fn_configItem: ({ crtStoreName, PUtils }) => [
      {
        label: t("Current Number Base"),
        children: [
          {
            tag: Html_select,
            value: gstore.common_app[crtStoreName].model.currentNumberBase,
            list: [
              {
                label: t(`Decimal(10)`),
                value: "decimal",
              },
              {
                label: t(`Binary(2)`),
                value: "binary",
              },
              {
                label: t(`Octal(8)`),
                value: "octal",
              },
              {
                label: t(`Hexadecimal(16)`),
                value: "hexadecimal",
              },
            ],
            onChange: (x) => {
              gstore.common_app[crtStoreName].model.currentNumberBase =
                x.target.value;
            },
          },
        ],
      },
    ],
  }),
};
