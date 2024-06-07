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
  MathJS,
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

let tx = (x) => {
  if (getCrtLang() == "en_US") {
    return x;
  }
  let myres = t(x);
  if (x == "Power") {
    myres = "幂值";
  }
  if (x == "Range") {
    myres = "范围枚举";
  }
  if (x == "Smallereq") {
    myres = "小于且等于";
  }
  if (x == "Largereq") {
    myres = "大于且等于";
  }
  if (x == "Unequal") {
    myres = "不相等";
  }
  if (x == "Element-wise power") {
    myres = `按元素进行幂值计算`;
  }
  if (x == "Element-wise divide") {
    myres = `按元素相除`;
  }
  if (x == "Bitwise and") {
    myres = `按位与`;
  }
  if (x == "Bitwise not") {
    myres = `按位取反`;
  }
  if (x == "Logical not") {
    myres = `逻辑取反`;
  }
  if (x == "Smaller") {
    myres = `是否小于`;
  }
  if (x == "Larger") {
    myres = `大于`;
  }
  return myres + `(${x})`;
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = {
  initialState() {
    return {
      currentNumberBase: "decimal",
    };
  },
  menus: [
    {
      ...fn_otherPages.get_math_list(),
      children: [
        {
          label: "Basic Calculator",
          icon: "calculator",
          pid: "BasicCalc",
        },
      ],
    },
  ],
  render: fn_otherPages.simpleLeftRightConvertor({
    syncView: true,
    type: "plaintext",
    fontSize: 18,
    totalTitle: "Basic Calculator",
    mainBtnText: "Evaluate",
    language: "markdown",
    exampleStr: [
      `# ${tx("Expression")}`,
      `2 * (3 + 4) / 10`,
      `# ${tx("Element-wise multiply")}`,
      `[1,2,3] .* [1,2,3]`,
      `# ${tx("Element-wise divide")}`,
      `[1,2,3] ./ [1,2,3]`,
      `# ${tx("Percentage")}`,
      `8%`,
      `# ${tx(`Addition with Percentage`)}`,
      `100 + 3%`,
      `# ${tx(`Subtraction with Percentage`)}`,
      `100 - 3%`,
      `# ${tx(`Modulus`)}`,
      `8 % 3`,
      `# ${tx(`Power`)}`,
      `2 ^ 3`,
      `# ${tx(`Element-wise power`)}`,
      `[2,3] .^ [3,3]`,
      `# ${tx(`Transpose`)}`,
      `[[1,2],[3,4]]'`,
      `# ${tx(`Factorial`)}`,
      `5!`,
      `# ${tx(`Bitwise and`)}`,
      `5 & 3`,
      `# ${tx(`Bitwise not`)}`,
      `~2`,
      `# ${tx(`Bitwise or`)}`,
      `5 | 3`,
      `# ${tx(`Bitwise xor`)}`,
      `5 ^| 2`,
      `# ${tx(`Left shift`)}`,
      `4 << 1`,
      `# ${tx(`Right arithmetic shift`)}`,
      `8 >> 1`,
      `# ${tx(`Right logical shift`)}`,
      `-8 >>> 1`,
      `# ${tx(`Logical and`)}`,
      `true and false`,
      `# ${tx(`Logical not`)}`,
      `not true`,
      `# ${tx(`Logical or`)}`,
      `true or false`,
      `# ${tx(`Logical xor`)}`,
      `true xor true`,
      `# ${tx(`Assignment`)}`,
      `a = 5`,
      `# ${tx(`Conditional expression`)}`,
      `15 > 100 ? 1 : -1`,
      `# ${tx(`Range`)}`,
      `1:4`,
      `# ${tx(`Unit conversion`)}`,
      `2 inch to cm`,
      `# ${tx(`Equal`)}`,
      `2 == 4 - 2`,
      `# ${tx(`Unequal`)}`,
      `2 != 3`,
      `# ${tx(`Smaller`)}`,
      `2 < 3`,
      `# ${tx(`Larger`)}`,
      `2 > 3`,
      `# ${tx(`Smallereq`)}`,
      `4 <= 3`,
      `# ${tx(`Largereq`)}`,
      `2 + 4 >= 6`,
      `# The examples above is from the website of MathJS`,
    ].join(`\n`),
    handle: async ({ leftValue }, { crtStoreName, PUtils }) => {
      let str = leftValue;
      let currentNumberBase =
        gstore.common_app[crtStoreName].model.currentNumberBase;
      return {
        result: _.chain(str)
          .split("\n")
          .map((x) => {
            x = _.trim(x);
            if (_.isNil(x) || _.startsWith(x, "#") || x == "") {
              return x;
            }
            try {
              return MathJS.evaluate(x).toString();
            } catch (e) {
              return `Invalid Expression: ${gutils.getErrMsg(e)}`;
            }
          })
          .join(`\n`)
          .value(),
      };
    },
    fn_configItem: ({ crtStoreName, PUtils }) => [],
  }),
};
