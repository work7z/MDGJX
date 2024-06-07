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
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import mobj from "./m.js";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";

let appTitle = "Base64 Previewer";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};
let appName = metaObj.appName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      return {
        imgDataValue: "",
        // myvalue: 12345,
        // decode_obj: {},
      };
    },
    menus: [
      {
        pid: "color",
        children: [
          {
            ...fn_otherPages.get_color_formatting(),
            children: [
              {
                label: appTitle,
                icon: "application",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.simpleLeftRightConvertor({
      noTriggerWhenCall: true,
      // syncView: true,
      type: "plaintext",
      fontSize: 12,
      totalTitle: appName,
      noSources: false,
      exampleArr: [
        {
          label: t(`Base64 to Image`),
          call: "base64_to_image",
          tips: t(
            `By using the function, you can view the image and relevant details on the panel right.`
          ),
          str: mobj.value,
        },
      ],
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "base64_to_image",
            onClick: fn_formatSelfTranslate("base64_to_image"),
            label: t(`Base64 to Image`),
            intent: "primary",
          },
        ];
      },
      mainBtnText: "Base64 to Image",
      language: "markdown",
      handle: async (
        { leftValue, type = "base64_to_image" },
        { crtStoreName, PUtils }
      ) => {
        let str = leftValue;
        let result = `Unknown Operation for ${type}`;
        switch (type) {
          case "base64_to_image":
            if (!leftValue.startsWith("data:")) {
              leftValue = "data:image/png;base64," + leftValue;
            }
            result = t(
              `CodeGen had shown it on the panel right, if there's nothing being displayed, please check if your content is correct.`
            );
            PUtils.crtModel.imgDataValue = leftValue;
            break;
        }
        return {
          result: result,
        };
      },
      fn_configItem: ({ crtStoreName, PUtils }) => [],
      fn_rightPanelProps: ({ PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtStoreName = PUtils.crtStoreName;
        let commonSave = PUtils.commonSave;
        return {
          percent: 0.5,
          jsx: PUtils.jsx.panelWithTitle({
            noBorderTop: true,
            title: t("Result for Decoding the Base64 Data"),
            jsx: React.createElement(
              observer((props) => {
                if (gutils.empty(PUtils.crtModel.imgDataValue)) {
                  return (
                    <div className="pt-10">
                      {t(`No Available Content can be viewed.`)}
                    </div>
                  );
                }
                return (
                  <div>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={PUtils.crtModel.imgDataValue}
                      alt={t(`Unable to load this image`)}
                    />
                  </div>
                );
              })
            ),
          }),
        };
      },
    }),
  };
};
