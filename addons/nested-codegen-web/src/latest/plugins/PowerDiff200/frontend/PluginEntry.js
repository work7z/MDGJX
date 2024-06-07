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
  GSyncSelectWithFilter,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import PreRequisiteJson from "../pre-requisite.json";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import "./myfile.less";
import CommonTextCompareEditor from "../../TranslateForJSON/frontend/kit/common_text_compare";
import c_kit from "../../TranslateForJSON/frontend/kit/common_kit";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Power Diff";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: true,
    // willReadyVersion: `v1.7.3`,
    initialState: async () => {
      return {
        inlineView: false,
        highlight_language_type: "javascript",
        leftValue: `let a = [
    {
        a: 100
    }
]`,
        rightValue: `let a = [
  {
      a: 1003
  }
]`,
        myvalue: 12345,
        decode_obj: {},
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            ...fn_otherPages.menu.getTextDiffMenu(),
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
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.rightMainPageJsx({
        totalTitle: appTitle,
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let fn_statChg = (language) => {
            try {
              if (!_.isNil(language)) {
                monaco.editor.setModelLanguage(
                  PUtils.crtStore.editor.getOriginalEditor().getModel(),
                  language
                );
                monaco.editor.setModelLanguage(
                  PUtils.crtStore.editor.getModifiedEditor().getModel(),
                  language
                );
              }
            } catch (e) {
              console.log("e", e);
            }
          };
          let bbf = async () => {
            await gutils.sleep(300);
            try {
              let leftValue = PUtils.crtStore.diffEditor
                .getOriginalEditor()
                .getModel()
                .getValue();
              let rightValue = PUtils.crtStore.diffEditor
                .getModifiedEditor()
                .getModel()
                .getValue();
              // if (leftValue == ref1.current.leftValue) {
              //   return;
              // }
              // if (rightValue == ref1.current.rightValue) {
              //   return;
              // }
              // ref1.current.leftValue = leftValue;
              // ref1.current.rightValue = rightValue;
              let editorLeft = PUtils.crtStore.diffEditor.getOriginalEditor();
              let editorRight = PUtils.crtStore.diffEditor.getModifiedEditor();
              let changes = _.map(
                _.flatten(
                  _.map(
                    PUtils.crtStore.diffEditor.getLineChanges(),
                    (x) => x.charChanges
                  )
                ),
                (x, d, n) => {
                  return {
                    position: {
                      ..._.mapKeys(x, (xx, dd) =>
                        dd
                          .replace("original", "left")
                          .replace("modified", "right")
                      ),
                    },
                    leftDiffContent: editorLeft.getModel().getValueInRange({
                      startColumn: x.originalStartColumn,
                      startLineNumber: x.originalStartLineNumber,
                      endColumn: x.originalEndColumn,
                      endLineNumber: x.originalEndLineNumber,
                    }),
                    rightDiffContent: editorRight.getModel().getValueInRange({
                      startColumn: x.modifiedStartColumn,
                      startLineNumber: x.modifiedStartLineNumber,
                      endColumn: x.modifiedEndColumn,
                      endLineNumber: x.modifiedEndLineNumber,
                    }),
                  };
                }
              );
              let finval = JSON.stringify(changes, 0, 4);
              window.finval_001 = finval;
              PUtils.editor.setValueIfNotSame({
                id: "all_json",
                value: finval,
              });
              let b = _.map(changes, (x) => x.leftDiffContent);
              PUtils.editor.setValueIfNotSame({
                id: "source_diff_json",
                value: JSON.stringify(b, 0, 4),
              });
              PUtils.editor.setValueIfNotSame({
                id: "source_diff_text",
                value: _.join(b, "\n"),
              });
              let c = _.map(changes, (x) => x.rightDiffContent);
              PUtils.editor.setValueIfNotSame({
                id: "modified_diff_json",
                value: JSON.stringify(c, 0, 4),
              });
              PUtils.editor.setValueIfNotSame({
                id: "modified_diff_text",
                value: _.join(c, "\n"),
              });
              console.log({
                leftValue,
                rightValue,
              });
            } catch (e) {
              console.log("err", e);
            }
          };
          return PUtils.jsx.createPanelWithBtnControls({
            // fn_get_copy_result: async () => {
            //   return PUtils.editor.getValue({
            //     id: "ROOT_EXTENSION_ADDONS_encode_text_result",
            //   });
            // },
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              {
                text: t(`Compare`),
                intent: "primary",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_tok4btn",
                onClick: async () => {
                  bbf();
                  gutils.alertOk("Done.");
                },
              },
              {
                text: t(`Import as Left Value`),
                intent: "success",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_tok3btn",
                onClick: async () => {
                  gutils.selectFile(async function (val) {
                    if (!_.isNil(val)) {
                      let { content } = await gutils.opt(
                        "/fs/read_uploads_and_clean",
                        {
                          name: val,
                        }
                      );
                      console.log(content);
                      let text_model = PUtils.crtStore.diffEditor
                        .getOriginalEditor()
                        .getModel();
                      text_model.setValue(content);
                    }
                  });
                },
              },
              {
                text: t(`Import as Right Value`),
                intent: "success",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_tok34btn",
                onClick: async () => {
                  gutils.selectFile(async function (val) {
                    if (!_.isNil(val)) {
                      let { content } = await gutils.opt(
                        "/fs/read_uploads_and_clean",
                        {
                          name: val,
                        }
                      );
                      console.log(content);
                      let text_model = PUtils.crtStore.diffEditor
                        .getModifiedEditor()
                        .getModel();
                      text_model.setValue(content);
                    }
                  });
                },
              },
              {
                text: t(`Switch View Mode`),
                // minimal: true,
                // outlined: true,
                // icon: "refresh",
                intent: "none",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  let crt_editor = PUtils.crtStore.diffEditor;
                  let nextVal = !PUtils.crtModel.inlineView;
                  PUtils.crtModel.inlineView = nextVal;
                  crt_editor.updateOptions({
                    renderSideBySide: !nextVal,
                  });
                },
              },
            ],
            rightControls: [
              {
                label: t(`Highlight Schema`),
                jsx: (
                  <c_kit.EditorLanguageSelector
                    model={PUtils.crtStore}
                    PUtils={PUtils}
                    statChg={fn_statChg}
                  />
                ),
              },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  border: true,
                  percent: 0.5,
                  top: React.createElement(
                    observer(() => {
                      return (
                        <CommonTextCompareEditor
                          key={PUtils.crtModel.highlight_language_type}
                          language={PUtils.crtModel.highlight_language_type}
                          PUtils={PUtils}
                          title={t(`Power Diff Tools`)}
                          crtStoreName={PUtils.crtStoreName}
                        ></CommonTextCompareEditor>
                      );
                    })
                  ),
                  btm: React.createElement(
                    observer(() => {
                      let ref1 = React.useRef({
                        leftValue: "",
                        rightValue: "",
                      });
                      useEffect(() => {
                        let a = reaction(() => {
                          return [
                            PUtils.crtModel.leftValue,
                            PUtils.crtModel.rightValue,
                          ];
                        }, bbf);
                        gutils.defer(() => {
                          bbf();
                        });
                        return () => {
                          a();
                        };
                      }, []);
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "btm_tab",
                        list: [
                          ...[
                            {
                              label: t(`Overview`),
                              id: "all_json",
                              title: t(
                                `The overview of differences informations`
                              ),
                            },
                            {
                              label: t(`Left Differences Text`),
                              id: "source_diff_text",
                              title: t(`Source editor is the left one above`),
                            },
                            {
                              label: t(`Right Differences Text`),
                              id: "modified_diff_text",
                              title: t(
                                `Modified editor is the right one above`
                              ),
                            },
                            {
                              label: t(`Left Differences JSON`),
                              id: "source_diff_json",
                              title: t(`Differences Information`),
                            },
                            {
                              label: t(`Right Differences JSON`),
                              id: "modified_diff_json",
                              title: t(`Differences Information`),
                            },
                          ].map((x) => {
                            return {
                              label: x.label,
                              jsx: observer((props) => {
                                return PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  wordWrap: "off",
                                  key: x.id,
                                  title: x.title,
                                  language:
                                    x.id.indexOf("json") != -1
                                      ? "json"
                                      : PUtils.crtModel.highlight_language_type,
                                  initContent: ``,
                                });
                              }),
                            };
                          }),
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      });
                    })
                  ),
                })}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
