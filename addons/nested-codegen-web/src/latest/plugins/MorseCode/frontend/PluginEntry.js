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
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import MorseUtils from "./internal/morse";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
if (gutils.dev()) {
  window.MorseUtils = MorseUtils;
}

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Morse Code Translator";
let appName = appTitle;
window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      return {
        myvalue: 12345,
        decode_obj: {},
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            pid: "textcase",
            children: [
              {
                label: appTitle,
                icon: "new-grid-item",
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
          label: t(`Encode Data`),
          call: "encode",
          str: `codegen.cc`,
        },
        {
          label: t(`Decode Data`),
          call: "decode",
          str: `-.-./---/-.././--././-./.-.-.-/-.-./-.-.`,
        },
      ],
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "encode",
            onClick: fn_formatSelfTranslate("encode"),
            label: t(`Encode Data`),
            intent: "primary",
          },
          {
            cid: "decode",
            onClick: fn_formatSelfTranslate("decode"),
            label: t(`Decode Data`),
            intent: "primary",
          },
          {
            cid: "playback",
            onClick: fn_formatSelfTranslate("playback"),
            label: t(`Play Back`),
            intent: "warning",
          },
        ];
      },
      mainBtnText: "HTML to React",
      language: "plaintext",
      handle: async (
        { leftValue, type = "html_to_react" },
        { crtStoreName, PUtils }
      ) => {
        try {
          let str = leftValue;
          let result = `Unknown Operation for ${type}`;
          switch (type) {
            case "encode":
              result = MorseUtils.morse(leftValue + "");
              if (gutils.empty(result)) {
                cutils.alertErr_noT(
                  t(
                    `Failed to encode data, please kindly whether check your input data is correct or not.`
                  )
                );
              }
              break;
            case "decode":
              result = MorseUtils.string(leftValue + "");
              if (gutils.empty(result)) {
                cutils.alertErr_noT(
                  t(
                    `Failed to decode data, please kindly whether check your input data is correct or not.`
                  )
                );
              }
              break;
            case "playback":
              let convertValue = null;
              let t_a = PUtils.editor.getValue({ id: "leftValue" });
              let t_b = PUtils.editor.getValue({ id: "rightValue" });
              if (MorseUtils.isMorse(t_a)) {
                cutils.alertOk_noT(
                  t(`Detected the morse code from source editor`)
                );
                convertValue = t_a;
              } else if (MorseUtils.isMorse(t_b)) {
                cutils.alertOk_noT(
                  t(`Detected the morse code from destination editor`)
                );
                convertValue = t_b;
              }
              if (gutils.empty(convertValue)) {
                let s =
                  t(
                    `Cannot handle your request as the value formatting of both source and destination editor are incorrect, please provide an value such as {0}`,
                    "**.*-**.---.***-.*.-*-*.---.-**.*.--*.*.-*"
                  ) +
                  "\n" +
                  MorseUtils.flagItem;
                cutils.alertErr_noT(s);
                throw new Error(s);
              }
              cutils.alertOk_noT(
                t(
                  `Started playing the morse code, of which the value is {0}`,
                  convertValue
                )
              );
              let AudioContext =
                window.AudioContext || window.webkitAudioContext;
              let ctx = new AudioContext();
              let dot = 1.2 / 15;
              let qqqt = ctx.currentTime;

              var oscillator = ctx.createOscillator();
              oscillator.type = "sine";
              oscillator.frequency.value = 600;

              var gainNode = ctx.createGain();
              gainNode.gain.setValueAtTime(0, qqqt);

              convertValue.split("").forEach(function (letter) {
                switch (letter) {
                  case ".":
                    gainNode.gain.setValueAtTime(1, qqqt);
                    qqqt += dot;
                    gainNode.gain.setValueAtTime(0, qqqt);
                    qqqt += dot;
                    break;
                  case "-":
                    gainNode.gain.setValueAtTime(1, qqqt);
                    qqqt += 3 * dot;
                    gainNode.gain.setValueAtTime(0, qqqt);
                    qqqt += dot;
                    break;
                  case " ":
                    qqqt += 7 * dot;
                    break;
                }
              });

              oscillator.connect(gainNode);
              gainNode.connect(ctx.destination);

              oscillator.start();
              return {
                result:
                  t(`[System Message]`) +
                  "\n" +
                  t(`Cool! We are playing the music in an old-fashion way.`) +
                  "\n" +
                  t(
                    `The Morse Code that you are playing is {0}`,
                    convertValue
                  ) +
                  "\n" +
                  MorseUtils.flagItem,
              };

              break;
          }
          return {
            result: result,
          };
        } catch (e) {
          console.log("an error occurred", e);
          return {
            result: `${t(`Error`)}: ${gutils.getErrMsg(e)}`,
          };
        }
      },
      fn_configItem: ({ crtStoreName, PUtils }) => [],
    }),
  };
};
