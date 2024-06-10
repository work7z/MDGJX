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
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let appTitle = "Regex Tester";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: !gutils.dev(),
    // willReadyVersion: `v1.6.6`,
    initialState() {
      return {
        config_json_flatten_type: "flatten_deeply",
        config_text_sort_order: "asc",
        myvalue: 12345,
        ipt_text: "",
        rpl_text: "",
        ipt_mode_arr: ["g"],
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            ...fn_otherPages.menu.getTextMatchMenu(),
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
      {
        ...fn_otherPages.menu.obj_trans_playground,
        children: [
          {
            ...fn_otherPages.menu.obj_playground_exps,
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
      fn_leftPanelProps: fn_otherPages.jsx.createProcedurePanel(
        ({ PUtils }) => {
          return {
            index: "regex_settings",
            arr: [
              {
                label: t(`Settings`),
                id: "regex_settings",
                mode_jsx_func: true,
                jsx: observer((props) =>
                  React.createElement(
                    observer(
                      PUtils.fn.fn_form_jsx_by_config(() => [
                        {
                          label: t(`Regular Expression`),
                          helperText: t(
                            `To start matching and replacing text, please provide a regular expression firstly.`
                          ),
                          tag: GFormInput,
                          tagProps: {
                            small: true,
                            rightElement: [
                              <Popover minimal={true} placement="bottom">
                                <Button
                                  small={true}
                                  text={(
                                    PUtils.crtModel.ipt_mode_arr || []
                                  ).join("")}
                                ></Button>
                                <Menu className={Classes.ELEVATION_1}>
                                  {[
                                    {
                                      label: t(`Global Search`),
                                      text: "g",
                                    },
                                    {
                                      label: t(`Case Insensitive`),
                                      text: "i",
                                    },
                                    {
                                      label: t(`Multiple Lines`),
                                      text: "m",
                                    },
                                    {
                                      label: t(`Includes new line characters`),
                                      text: "s",
                                    },
                                  ].map((x, d, n) => {
                                    let hasCrtIndex =
                                      (
                                        PUtils.crtModel.ipt_mode_arr || []
                                      ).indexOf(x.text) != -1;
                                    return (
                                      <MenuItem
                                        label={x.label}
                                        text={x.text}
                                        intent={
                                          hasCrtIndex ? "primary" : "none"
                                        }
                                        onClick={() => {
                                          if (hasCrtIndex) {
                                            PUtils.crtModel.ipt_mode_arr =
                                              _.filter(
                                                PUtils.crtModel.ipt_mode_arr,
                                                (xxx, ddd) => {
                                                  return xxx != x.text;
                                                }
                                              );
                                          } else {
                                            PUtils.crtModel.ipt_mode_arr = [
                                              ...PUtils.crtModel.ipt_mode_arr,
                                              x.text,
                                            ];
                                          }
                                        }}
                                      ></MenuItem>
                                    );
                                  })}
                                </Menu>
                              </Popover>,
                              <Popover minimal={true} placement="bottom">
                                <Button
                                  small={true}
                                  text={t("Example")}
                                ></Button>
                                <Menu className={Classes.ELEVATION_1}>
                                  {_.map(
                                    [
                                      {
                                        label: t(`Common Usages`),
                                        children: [
                                          {
                                            label: t(
                                              `Match Chinese Characters`
                                            ),
                                            text: "[\\u4e00-\\u9fa5]",
                                          },
                                          {
                                            label: t(
                                              `Match double-byte Characters`
                                            ),
                                            text: `[^\\x00-\\xff]`,
                                          },
                                          {
                                            label: t(`Match Empty Lines`),
                                            text: `\\n\\s*\\r`,
                                          },
                                          {
                                            label: t(`Match E-Mail Address`),
                                            reg: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g,
                                          },
                                          {
                                            label: t(`Match URL`),
                                            text: `[a-zA-z]+://[^\\s]*`,
                                          },
                                          {
                                            label: t(
                                              `Match PhoneNumber on China MainLand`
                                            ),
                                            reg: /\d{3}-\d{8}|\d{4}-\{7,8}/g,
                                          },
                                          {
                                            label: t(`Match Social Number(QQ)`),
                                            reg: /[1-9][0-9]{4,}/g,
                                          },
                                          {
                                            label: t(
                                              `Match Year-Month-Date formatting text`
                                            ),
                                            reg: /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/g,
                                          },
                                          {
                                            label: t(`Match Positive Integer`),
                                            reg: /^[1-9]\d*$/g,
                                          },
                                          {
                                            label: t(`Match Negative Integer`),
                                            reg: /^-[1-9]\d*$/g,
                                          },
                                          {
                                            label: t(`Match Integer`),
                                            reg: /^-?[1-9]\d*$/g,
                                          },
                                          {
                                            label: t(`Match Positive Float`),
                                            reg: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/g,
                                          },
                                          {
                                            label: t(`Match Negative Float`),
                                            reg: /^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/g,
                                          },
                                          {
                                            label: t(
                                              `Match Text whose length ranges from 3 to 30`
                                            ),
                                            reg: /^.{3,20}$/g,
                                          },
                                          {
                                            label: t(`Domain Name`),
                                            reg: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g,
                                          },
                                          {
                                            label: t(`District PhoneNumber`),
                                            text: "^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$",
                                          },
                                          {
                                            label: t(
                                              `Identity Card in China MainLand`
                                            ),
                                            reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g,
                                          },
                                          {
                                            label: t(`Strong Password`),
                                            reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/g,
                                          },
                                          {
                                            label: t(`China Postal Code`),
                                            reg: /[1-9]\d{5}(?!\d)/g,
                                          },
                                          {
                                            label: t(`IPv4 Address`),
                                            reg: /\d+\.\d+\.\d+\.\d+/g,
                                          },
                                          {
                                            label: t(`IPv6 Address`),
                                            reg: /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/g,
                                          },
                                        ],
                                      },
                                    ],
                                    (eachItem) => {
                                      return [
                                        <MenuDivider title={eachItem.label} />,
                                        ..._.map(
                                          eachItem.children,
                                          (xxx, ddd) => {
                                            let finalTxt =
                                              xxx.text || xxx.reg.source;
                                            return (
                                              <MenuItem
                                                key={xxx.label}
                                                label={_.truncate(finalTxt, 8)}
                                                text={xxx.label}
                                                icon={xxx.icon}
                                                onClick={() => {
                                                  PUtils.crtModel.ipt_text =
                                                    finalTxt;
                                                }}
                                              ></MenuItem>
                                            );
                                          }
                                        ),
                                      ];
                                    }
                                  )}
                                </Menu>
                              </Popover>,
                            ],
                            leftElement: [<Icon icon="new-text-box" />],
                            noTranslate: true,
                            placeholder: ``,
                            onChange(x) {
                              PUtils.crtModel.ipt_text = x;
                            },
                            value: PUtils.crtModel.ipt_text || "",
                          },
                        },
                        () => {
                          return {
                            label: t(`Replace Text`),
                            helperText: t(
                              `If you need to replace these result with the text you wanted, you can provide it in this form field.`
                            ),
                            // tag: observer(() => {
                            //   return (
                            //     <div
                            //       style={{
                            //         width: "100%",
                            //         border:
                            //           "1px solid var(--app-border-bg-gray-tran)",
                            //         height: "150px",
                            //       }}
                            //     >
                            //       {PUtils.jsx.createGEditor({
                            //         title: `Replace Text Content`,
                            //         fontSize: 11,
                            //         key: `rpl_text`,
                            //         language: "plaintext",
                            //         wordWrap: "off",
                            //         initContent: ``,
                            //       })}
                            //     </div>
                            //   );
                            // }),
                            tag: GFormInput,
                            tagProps: {
                              // type: "textarea",
                              style: {
                                width: "100%",
                              },
                              small: true,
                              // rightElement: [
                              //   <Button small={true} text={"G"}></Button>,
                              // ],
                              noTranslate: true,
                              placeholder: ``,
                              onChange(x) {
                                PUtils.crtModel.rpl_text = x;
                              },
                              value: PUtils.crtModel.rpl_text || "",
                            },
                          };
                        },
                      ])
                    )
                  )
                ),
              },
              {
                label: t(`About Regex`),
                id: "wiki",
                jsx: fn_otherPages.createAboutPage({
                  list: [
                    {
                      title: `${t(`Basic Concept`)}(wikipedia)`,
                      sub: [
                        t(
                          ` regular expression (shortened as regex or regexp; sometimes referred to as rational expression) is a sequence of characters that specifies a search pattern in text. Usually such patterns are used by string-searching algorithms for "find" or "find and replace" operations on strings, or for input validation. Regular expression techniques are developed in theoretical computer science and formal language theory.`
                        ),
                        t(
                          `The concept of regular expressions began in the 1950s, when the American mathematician Stephen Cole Kleene formalized the concept of a regular language. They came into common use with Unix text-processing utilities. Different syntaxes for writing regular expressions have existed since the 1980s, one being the POSIX standard and another, widely used, being the Perl syntax.`
                        ),
                        t(
                          `Regular expressions are used in search engines, in search and replace dialogs of word processors and text editors, in text processing utilities such as sed and AWK, and in lexical analysis. Most general-purpose programming languages support regex capabilities either natively or via libraries, including Python, C, C++, Java, Rust, OCaml, and JavaScript.`
                        ),
                      ],
                    },
                    {
                      title: t(`Syntax Introduction`),
                      sub: [
                        <FormEasyTable
                          column={[
                            {
                              label: t(`Definition`),
                              value: (x) => (
                                <span
                                  style={{
                                    fontSize: "15px",
                                    color: "var(--app-text-darkred)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {x.definition}
                                </span>
                              ),
                            },
                            {
                              label: t(`Description`),
                              value: (x) => x.desc,
                            },
                          ]}
                          data={[
                            {
                              definition: `.`,
                              desc: t(
                                `Match all characters except for the new line character.`
                              ),
                            },
                            {
                              definition: `\d,\s,\w`,
                              desc: t(
                                `Separately Match for digits, Space && tab, Alphanumeric characters && "_"`
                              ),
                            },
                            {
                              definition: `\D,\S,\W`,
                              desc: t(
                                `Separately Match for non-digits, Non-Space && non-tab, Non-Alphanumeric characters`
                              ),
                            },
                            {
                              definition: `^`,
                              desc: t(`Match the beginning of text`),
                            },
                            {
                              definition: `$`,
                              desc: t(`Match the ending of text`),
                            },
                            {
                              definition: `[abc]`,
                              desc: t(
                                `Match one of the three elements: a, b or c`
                              ),
                            },
                            {
                              definition: `[a-c]`,
                              desc: t(
                                `Match one element which is in order from a to c`
                              ),
                            },
                            {
                              definition: `[^abc]`,
                              desc: t(
                                `Match the one that is NOT equal with any one of the three elements`
                              ),
                            },
                            {
                              definition: `aa|cc`,
                              desc: t(`Match aa or cc`),
                            },
                            {
                              definition: `?`,
                              desc: t(
                                `The question mark indicates zero or one occurrences of the preceding element. `
                              ),
                            },
                            {
                              definition: `*`,
                              desc: t(
                                `	The asterisk indicates zero or more occurrences of the preceding element. `
                              ),
                            },

                            {
                              definition: `+`,
                              desc: t(
                                `	The plus sign indicates one or more occurrences of the preceding element.`
                              ),
                            },
                            {
                              definition: `{n}`,
                              desc: t(
                                `	The preceding item is matched exactly {0} times.`,
                                "n"
                              ),
                            },
                            {
                              definition: `{min,}`,
                              desc: t(
                                `The preceding item is matched {0} or more times.`,
                                "min"
                              ),
                            },
                            {
                              definition: `{,max}`,
                              desc: t(
                                `The preceding item is matched up to {0} times.`,
                                "max"
                              ),
                            },
                            {
                              definition: `{min,max}`,
                              desc: t(
                                `The preceding item is matched at least {0} times, but not more than {1} times.`,
                                "min",
                                "max"
                              ),
                            },
                            {
                              definition: `( )`,
                              desc: t(
                                `Defines a marked subexpression. The string matched within the parentheses can be recalled later (see the next entry, {0}). A marked subexpression is also called a block or capturing group. You can {1} to use it.`,
                                "\n",
                                "\\1"
                              ),
                            },
                            {
                              definition: `(?:expr)`,
                              desc: t(`Ignore this marked subexpression`),
                            },
                            {
                              definition: `(?=expr)`,
                              desc: t(`Positive Lookahead`),
                            },
                            {
                              definition: `(?!expr)`,
                              desc: t(`Negative Lookahead`),
                            },
                          ]}
                        ></FormEasyTable>,
                      ],
                    },
                  ],
                }),
              },
            ],
          };
        }
      ),
      fn_rightPanelProps: ({ PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtStoreName = PUtils.crtStoreName;
        let commonSave = PUtils.commonSave;
        return {
          percent: 0.5,
          jsx: React.createElement(
            observer((props) =>
              PUtils.jsx.tabWithDefinition({
                default_select_tab: "lang_javascript",
                key: "lang_console",
                list: [
                  {
                    label: `JavaScript`,
                    id: "javascript",
                  },
                  {
                    label: `PHP`,
                    id: "php",
                    lang: "php",
                  },
                  {
                    label: `Go`,
                    id: "golang",
                    lang: "go",
                  },
                  {
                    label: `Java`,
                    id: "java",
                  },
                  {
                    label: `Ruby`,
                    id: "ruby",
                  },
                  {
                    label: `Python`,
                    id: "python",
                  },
                ]
                  .map((x) => {
                    return {
                      label: x.label,
                      jsx: observer((props) => {
                        return PUtils.jsx.createGEditor({
                          title: t(`Example for {0}`, x.label),
                          fontSize: 11,
                          key: "lang_" + x.id,
                          language: x.lang || x.id,
                          wordWrap: "on",
                          initContent: ``,
                        });
                      }),
                    };
                  })
                  .map((x) => {
                    x.mode_jsx_func = true;
                    return x;
                  }),
              })
            )
          ),
        };
      },
      noTriggerWhenCall: true,
      type: "plaintext",
      fontSize: 12,
      totalTitle: appName,
      noSources: false,
      exampleStr: gutils.example_json,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate, PUtils }) => {
        return [
          {
            cid: "match",
            onClick: fn_formatSelfTranslate("highlight_match"),
            label: t(`Highlight Matched Result`),
            intent: "primary",
          },

          {
            cid: "replace",
            onClick: fn_formatSelfTranslate("replace"),
            label: t(`Replace Text`),
            intent: "primary",
          },
          {
            cid: "match",
            onClick: fn_formatSelfTranslate("output_as_json"),
            label: t(`Output as JSON`),
            intent: "primary",
          },
          {
            cid: "generate_code",
            onClick: () => {
              gutils.alertOk(
                `Generated code successfully! You check them in the bottom right panel.`
              );
              let v_ipt_text = PUtils.crtModel.ipt_text;
              PUtils.editor.setValue({
                id: "lang_javascript",
                value: `var pattern = /${v_ipt_text}/${(
                  PUtils.crtModel.ipt_mode_arr || []
                ).join("")},
var targetStr = '';
console.log(pattern.test(targetStr));`,
              });
              PUtils.editor.setValue({
                id: "lang_php",
                value: `<? 
$targetStr = '';
$isMatched = preg_match('/${v_ipt_text}/', $targetStr, $matches);
var_dump($isMatched, $matches);
?>`,
              });
              PUtils.editor.setValue({
                id: "lang_golang",
                value: `package main

import (
  "fmt"
  "regexp"
)

func main() {
  targetStr := ""
  matched, err := regexp.MatchString("${v_ipt_text}", targetStr)
  fmt.Println(matched, err)
}                
`,
              });
              //               PUtils.editor.setValue({
              //                 id: "lang_php",
              //                 value: `package main

              // import (
              //   "fmt"
              //   "regexp"
              // )

              // func main() {
              //   targetStr := ""
              //   matched, err := regexp.MatchString("${v_ipt_text}", targetStr)
              //   fmt.Println(matched, err)
              // }
              // `,
              //               });

              PUtils.editor.setValue({
                id: "lang_java",
                value: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {
	
	public static void main(String args[]) {
		String targetStr = "";
		String pattern = "${v_ipt_text}";
		Pattern r = Pattern.compile(pattern);
		Matcher m = r.matcher(targetStr);
		System.out.println(m.matches());
	}

}`,
              });
              PUtils.editor.setValue({
                id: "lang_ruby",
                value: `pattern = /${v_ipt_text}/
targetStr = ''
p pattern.match(targetStr)
                `,
              });
              PUtils.editor.setValue({
                id: "lang_python",
                value: `import re
pattern = re.compile(ur'${v_ipt_text}')
targetStr = u''
print(pattern.search(targetStr))
                `,
              });
            },
            label: t(`Generate Code`),
            intent: "warning",
          },
        ];
      },
      mainBtnText: "HTML to React",
      language: "markdown",
      handle: async (
        { leftValue, type = "match" },
        { crtStoreName, PUtils }
      ) => {
        let v_ipt_text = PUtils.crtModel.ipt_text;
        if (_.isNil(v_ipt_text) || v_ipt_text == "") {
          throw new Error("Regular Expression Cannot be Empty.");
        }
        let mode = (PUtils.crtModel.ipt_mode_arr || []).join("");
        let regex = new RegExp(v_ipt_text, mode);
        let model = PUtils.crtStore.editor_right.getModel();
        monaco.editor.setModelMarkers(model, "owner", []);
        let result = `Unknown Operation for ${type}`;
        let fn_getAllMatchedResult = (result) => {
          let allMatchedResult = [];
          if (regex.test(leftValue)) {
            let n1 = null;
            while ((n1 = regex.exec(leftValue))) {
              allMatchedResult.push({
                start: n1.index,
                end: n1.index + n1[0].length,
                text: n1[0],
                groups: n1.groups,
              });
            }
          }
          return allMatchedResult;
        };
        let allMatchedResult = [];
        switch (type) {
          case "highlight_match":
            result = leftValue;
            let marr111 = [];
            allMatchedResult = fn_getAllMatchedResult(result);
            _.forEach(allMatchedResult, (x, d, n) => {
              let pos = model.getRangeAt(x.start, x.end);
              marr111.push({
                ...pos,
                message: t("Matched Result" + " - " + d),
                severity: monaco.MarkerSeverity.Info,
              });
            });
            let b = () => {
              model = PUtils.crtStore.editor_right.getModel();
              monaco.editor.setModelMarkers(model, "owner", [
                // {
                //   message: "not a number",
                //   severity: monaco.MarkerSeverity.Info,
                //   startLineNumber: 2,
                //   startColumn: 1,
                //   endLineNumber: 3,
                //   endColumn: 3,
                // },
                ...marr111,
              ]);
            };
            setTimeout(b, 1500);
            setTimeout(b, 3000);
            break;
          case "output_as_json":
            result = leftValue;
            allMatchedResult = fn_getAllMatchedResult(result);
            result = JSON.stringify(allMatchedResult, 0, 4);

            break;
          case "replace":
            let v_rpl_text = PUtils.crtModel.rpl_text;
            result = leftValue.replaceAll(regex, v_rpl_text);
            break;
        }
        return {
          result: result,
        };
      },
      fn_configItem: ({ crtStoreName, PUtils }) => [],
    }),
  };
};
