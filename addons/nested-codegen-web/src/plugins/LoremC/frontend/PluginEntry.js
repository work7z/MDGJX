const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GFormSwitch,
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
  GFormInput,
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
import rtext from "./random_text";
let appTitle = "Lorem Ipsum";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      await fn_otherPages.fn.loadStatic({
        PreRequisiteJson,
        gref,
      });
      return {
        num_p: 5,
        start_with_legal: true,
        sentence_start_scope: 6,
        sentence_end_scope: 20,
        word_per_sentence_start_scope: 3,
        word_per_sentence_end_scope: 10,
        tag_value: "p",
        lc_text_content: "",
        myvalue: 12345,
        textArr: "",
      };
    },
    menus: [
      {
        ...fn_otherPages.getForPlayGroundFirstLayerMenu(),
        children: [
          {
            ...fn_otherPages.getMockGeneratorMenu(),
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
          let lc_store = PUtils.crtStore;
          // useLocalStore(() => {
          //   return {
          //     textArr: [],
          //   };
          // });

          return PUtils.jsx.createPanelWithBtnControls({
            // helpBtnProps: {
            //   minimal: true,
            //   outlined: true,
            // },
            noShowHelpBtn: false,
            // helpBtnId: "ROOT_EXTENSION_ADDONS",
            fn_get_copy_result: () => {
              return PUtils.editor.getValue({
                id: "lc_text_content",
              });
            },
            controls: [
              {
                text: t(`Start English Lorem`),
                intent: "primary",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  let arr = rtext.english_arr;
                  let root_p = [];
                  for (let i = 0; i < PUtils.crtModel.num_p; i++) {
                    let lastChar = null;
                    let crt_p = [];
                    if (i == 0 && PUtils.crtModel.start_with_legal == "true") {
                      crt_p.push(`Lorem ipsum dolor sit amet, `);
                      lastChar = ",";
                    }
                    if (
                      PUtils.crtModel.word_per_sentence_start_scope >
                        PUtils.crtModel.word_per_sentence_end_scope ||
                      PUtils.crtModel.sentence_start_scope >
                        PUtils.crtModel.sentence_end_scope
                    ) {
                      gutils.win_alert(
                        t(`Start value cannot greater than the end value`)
                      );
                      return;
                    }

                    let sentences_len = _.random(
                      PUtils.crtModel.sentence_start_scope,
                      PUtils.crtModel.sentence_end_scope,
                      false
                    );
                    for (let subIdx = 0; subIdx < sentences_len; subIdx++) {
                      let beginIndex = _.random(0, _.size(arr), false);
                      let endIndex =
                        beginIndex +
                        _.random(
                          PUtils.crtModel.word_per_sentence_start_scope,
                          PUtils.crtModel.word_per_sentence_end_scope,
                          false
                        );
                      let subArr = arr.slice(beginIndex, endIndex);
                      if (_.isEmpty(subArr)) {
                        continue;
                      }
                      let nnn = _.join(subArr, " ");
                      if (lastChar != ",") {
                        nnn = _.upperFirst(nnn);
                      }
                      crt_p.push(nnn);
                      let charArr =
                        subIdx == sentences_len - 1
                          ? [".", ".", ".", ";", "?", ".", "?"]
                          : [",", ".", "?", ";", ".", "?", "!", ",", ",", "."];
                      lastChar = charArr[_.random(0, _.size(charArr), false)];
                      crt_p.push(lastChar + " ");
                    }
                    root_p.push(crt_p.join(""));
                  }
                  let finalVal = _.join(
                    _.map(
                      root_p,
                      (x) =>
                        `<${PUtils.crtModel.tag_value}>${x}</${PUtils.crtModel.tag_value}>`
                    ),
                    "\n\n"
                  );
                  PUtils.crtModel.textArr = finalVal;
                  PUtils.editor.setValue({
                    id: "lc_text_content",
                    value: finalVal,
                  });
                },
              },
              {
                text: t(`Start Chinese Lorem`),
                intent: "primary",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  let root_p = [];
                  for (let i = 0; i < PUtils.crtModel.num_p; i++) {
                    let lastChar = null;
                    let crt_p = [];
                    if (i == 0) {
                      // crt_p.push();
                      // lastChar = ",";
                    }
                    if (
                      PUtils.crtModel.word_per_sentence_start_scope >
                        PUtils.crtModel.word_per_sentence_end_scope ||
                      PUtils.crtModel.sentence_start_scope >
                        PUtils.crtModel.sentence_end_scope
                    ) {
                      gutils.win_alert(
                        t(`Start value cannot greater than the end value`)
                      );
                      return;
                    }
                    let sentences_len = _.random(
                      PUtils.crtModel.sentence_start_scope,
                      PUtils.crtModel.sentence_end_scope,
                      false
                    );
                    let eachSetencSize = _.random(
                      PUtils.crtModel.word_per_sentence_start_scope,
                      PUtils.crtModel.word_per_sentence_end_scope,
                      false
                    );
                    let totalLen = _.random(
                      PUtils.crtModel.sentence_start_scope,
                      PUtils.crtModel.sentence_end_scope,
                      false
                    ); // parseInt(eachSetencSize * sentences_len * 2);
                    crt_p.push(Mock.Random.cparagraph(totalLen));
                    root_p.push(crt_p.join(""));
                  }
                  let finalVal = _.join(
                    _.map(
                      root_p,
                      (x) =>
                        `<${PUtils.crtModel.tag_value}>${x}</${PUtils.crtModel.tag_value}>`
                    ),
                    "\n\n"
                  );
                  PUtils.crtModel.textArr = finalVal;
                  PUtils.editor.setValue({
                    id: "lc_text_content",
                    value: finalVal,
                  });
                },
              },
              // {
              //   text: t(`Reset `),
              //   intent: "none",
              //   loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
              //   onClick: async () => {
              //     await gutils.sleep(3000);
              //     gutils.alertOk(`Refreshed.`);
              //   },
              // },
            ],
            // rightControls: [],
            //   {
            //     text: t(`Test-2`),
            //     intent: "none",
            //     minimal: true,
            //     outlined: true,
            //     icon: "data-connection",
            //     //
            //     onClick: () => {
            //       // identify
            //     },
            //   },
            // ],
            body: (
              <div className="w100 h100">
                {React.createElement(
                  observer((props) => {
                    return PUtils.jsx.tabWithDefinition({
                      default_select_tab: "str",
                      key: "ROOT_EXTENSION_ADDONS_console",
                      list: [
                        {
                          label: t(`Text`),
                          id: "visual_text",
                          jsx: observer((props) => {
                            return (
                              <div style={{ padding: "10px" }}>
                                {_.isEmpty(PUtils.crtStore.model.textArr)
                                  ? t("The content is empty at present.")
                                  : ""}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: PUtils.crtStore.model.textArr + "",
                                  }}
                                ></div>
                                {/* {_.map(
                                  PUtils.crtStore.model.textArr,
                                  (x, d, n) => {
                                    return <p key={d}>{x}</p>;
                                  }
                                )} */}
                              </div>
                            );
                          }),
                        },
                        {
                          label: t(`HTML`),
                          id: "html",
                          jsx: observer((props) => {
                            return PUtils.jsx.createGEditor({
                              fontSize: 11,
                              title: t(`Result Viewer`),
                              key: "lc_text_content",
                              language: "html",
                              wordWrap: "on",
                              initContent: ``,
                            });
                          }),
                        },
                        {
                          label: t(`Lorem Options`),
                          id: "option",
                          jsx: observer((props) => {
                            return React.createElement(
                              PUtils.fn.fn_form_jsx_by_config(() => [
                                {
                                  label: t(
                                    `Starting with {0}`,
                                    "Lorem ipsum dolor sit amet"
                                  ),
                                  helperText: t(
                                    `By Default, CodeGen will turn it on.`
                                  ),
                                  tag: GFormSwitch,
                                  tagProps: {
                                    valtype: "tf",
                                    onChange(x) {
                                      PUtils.crtModel.start_with_legal = x;
                                    },
                                    value: PUtils.crtModel.start_with_legal,
                                  },
                                },
                                {
                                  label: t(`Tag for Each Paragraph`),
                                  helperText: t(
                                    `By Default, CodeGen uses {0} as its tag name`,
                                    "p"
                                  ),
                                  tag: GFormInput,
                                  tagProps: {
                                    small: true,
                                    placeholder: `e.g. p`,
                                    onChange(x) {
                                      PUtils.crtModel.tag_value = x;
                                    },
                                    value: PUtils.crtModel.tag_value,
                                  },
                                },
                                {
                                  label: t(`Paragraph`),
                                  helperText: t(
                                    `This field can be used for specifying the size of generated paragraphs.`
                                  ),
                                  tag: GFormInput,
                                  tagProps: {
                                    type: "number",
                                    small: true,
                                    placeholder: `e.g. 5`,
                                    onChange(x) {
                                      PUtils.crtModel.num_p = x;
                                    },
                                    value: PUtils.crtModel.num_p,
                                  },
                                },
                                {
                                  label:
                                    t(`Sentences Size Per Paragraph`) +
                                    ` - ` +
                                    t(`Random Start`),
                                  helperText: t(
                                    `CodeGen will generate sentences randomly, this is the begin value of random scope.`
                                  ),
                                  tag: GFormInput,
                                  tagProps: {
                                    type: "number",
                                    small: true,
                                    placeholder: `e.g. 6`,
                                    onChange(x) {
                                      PUtils.crtModel.sentence_start_scope = x;
                                    },
                                    value: PUtils.crtModel.sentence_start_scope,
                                  },
                                },
                                {
                                  label:
                                    t(`Sentences Size Per Paragraph`) +
                                    ` - ` +
                                    t(`Random End`),
                                  helperText: t(
                                    `CodeGen will generate sentences randomly, this is the end value of random scope.`
                                  ),
                                  tag: GFormInput,
                                  tagProps: {
                                    type: "number",
                                    small: true,
                                    placeholder: `e.g. 20`,
                                    onChange(x) {
                                      PUtils.crtModel.sentence_end_scope = x;
                                    },
                                    value: PUtils.crtModel.sentence_end_scope,
                                  },
                                },

                                {
                                  label:
                                    t(`Word Size Per Sentence`) +
                                    ` - ` +
                                    t(`Random Start`),
                                  helperText: t(
                                    `CodeGen will generate word randomly, this is the begin value of random scope.`
                                  ),
                                  tag: GFormInput,
                                  tagProps: {
                                    type: "number",
                                    small: true,
                                    placeholder: `e.g. 3`,
                                    onChange(x) {
                                      PUtils.crtModel.word_per_sentence_start_scope =
                                        x;
                                    },
                                    value:
                                      PUtils.crtModel
                                        .word_per_sentence_start_scope,
                                  },
                                },
                                {
                                  label:
                                    t(`Word Size Per Paragraph`) +
                                    ` - ` +
                                    t(`Random End`),
                                  helperText: t(
                                    `CodeGen will generate word randomly, this is the end value of random scope.`
                                  ),
                                  tag: GFormInput,
                                  tagProps: {
                                    type: "number",
                                    small: true,
                                    placeholder: `e.g. 10`,
                                    onChange(x) {
                                      PUtils.crtModel.word_per_sentence_end_scope =
                                        x;
                                    },
                                    value:
                                      PUtils.crtModel
                                        .word_per_sentence_end_scope,
                                  },
                                },
                              ])
                            );
                          }),
                        },
                      ].map((x) => {
                        x.mode_jsx_func = true;
                        return x;
                      }),
                    });
                  })
                )}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
