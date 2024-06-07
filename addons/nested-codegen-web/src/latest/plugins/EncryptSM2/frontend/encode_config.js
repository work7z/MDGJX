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
  GSyncSelectWithFilter,
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

export default {
  state: {
    g_encode_mode: "base64",
  },
  getSM2Options({ crtModel }) {
    return {
      label: t("Encrypt Order"),
      children: [
        {
          tag: GSyncSelectWithFilter,
          index: "sm2_encrypt_order",
          obj: crtModel,
          whenChg: (x) => {
            crtModel.sm2_encrypt_order = x;
          },
          list: [
            {
              label: "C1+C2+C3" + `(${t(`Old Ver.`)})`,
              value: "C1C2C3",
            },
            {
              label: "C1+C3+C2" + `(${t(`New Ver.`)})`,
              value: "C1C3C2",
            },
          ],
        },
      ],
    };
  },
  getAfterConfigItem_1({ crtModel }) {
    return {
      label: t("Encode Mode"),
      children: [
        {
          tag: GSyncSelectWithFilter,
          index: "g_encode_mode",
          obj: crtModel,
          whenChg: (x) => {
            crtModel.g_encode_mode = x;
            gutils.alertOk(
              t(
                `Updated encode mode successfully. If you want to generate new encode encrypt key, please click the re-generate key button again.`
              )
            );
          },
          list: [
            {
              label: "Base64",
              value: "base64",
            },
            {
              label: t(`Hex String`),
              value: "hex",
            },
          ],
        },
      ],
    };
  },
};
