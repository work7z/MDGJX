import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
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
  Tabs,
  Tab,
  Card,
  Elevation,
  Button,
  PanelStack2,
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import GTabs from "../GTabs";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import _ from "lodash";
import LocalProject from "../LocalProject";
import SoftwareUpdates from "../../routes/SoftwareUpdates";
import GTree from "../../components/tree/index.jsx";
import GFormSelect from "../GFormSelect";
import Simple_table from "../../routes/simple_table";
import GFormInput from "../GFormInput";

const HomeMain = observer((props) => {
  let hist = useHistory();
  gutils.defer(() => {
    try {
      let tokenValue = Qs.parse(hist.location.search.replace("?", ""))["token"];
      if (!_.isEmpty(tokenValue)) {
        ipc.store_set("token", tokenValue);
      }
    } catch (e) {
      console.log("err", e);
    }
  });
  // let [activeMenuId, on_activeMenuId] = useState(null);
  let activeMenuId = null;
  let on_activeMenuId = () => [];
  let str = gstore.localSettings.crt_functions_filter_str;
  let trim_str = _.toLower(_.trim(str));
  let fn_for_ipt = (e) => {
    gstore.localSettings.crt_functions_filter_str = e.target.value;
  };
  const [showCustomizerBtn = false, onShowCustomizer] = useState(false);
  const [showMarkBtn = true, onShowMarkBtn] = useState(true);
  return (
    <div className="">
      <Card
        className="myhomewrapper-global"
        style={{ margin: "0", padding: "0px", overflow: "auto" }}
      >
        <div className="myroadmap-controller-wrapper">
          <InputGroup
            value={str}
            onChange={fn_for_ipt}
            autoFocus={true}
            leftIcon={"search"}
            placeholder={t(`Searching the function that you're interested in`)}
            rightElement={
              <ButtonGroup>
                {
                  <Button
                    large={false}
                    minimal={true}
                    intent={"none"}
                    outlined={true}
                    text={
                      showCustomizerBtn ? t(`Exit Form`) : t(`Customize Menu`)
                    }
                    onClick={() => {
                      onShowCustomizer(!showCustomizerBtn);
                    }}
                  ></Button>
                }
                {/* {showCustomizerBtn ? (
                  ""
                ) : (
                  <Button
                    large={false}
                    minimal={true}
                    intent={"none"}
                    outlined={true}
                    text={showMarkBtn ? t(`Done`) : t(`Stickie`)}
                    title={t(
                      `If you need to remark some functions, please click here to edit.`
                    )}
                    onClick={() => {
                      onShowMarkBtn(!showMarkBtn);
                    }}
                  ></Button>
                )} */}
              </ButtonGroup>
            }
          ></InputGroup>
        </div>
        {showCustomizerBtn && !p_mode() ? (
          <Card
            style={{ marginTop: "0", marginBottom: "0", minHeight: "500px" }}
          >
            <div style={{ padding: " 0", margin: "0", paddingTop: "0" }}>
              {React.createElement(props.customJSXEle)}
            </div>
          </Card>
        ) : p_mode() ? (
          gstore.localSettings.hide_for_init_portal ? (
            ""
          ) : (
            <div
              style={{ padding: "10px 0", margin: "0 10px", paddingTop: "0" }}
            >
              <Callout
                intent={"primary"}
                icon={"star"}
                title={t(`A friendly reminder before using online version`)}
              >
                <p>
                  {t(
                    `Thank you for using CodeGen Online ToolBox! As far as you can see, this site you're visiting is an online application, and it will limit some feature or buttons due to the ability limitation of online page. Nonewithstanding, CodeGen Online ToolBox still can provides lots of useful features to improve your work efficiency, and please feel free to contact us if you have any question about CodeGen ToolBox. Lastly, you can download CodeGen ToolBox of an offline version so that you can enjoy latest and complete features on your own PC! Now, without further ado, let's go!`
                  )}
                </p>
                <div>
                  <Button
                    onClick={() => {
                      gstore.localSettings.hide_for_init_portal = true;
                      // localStorage.setItem("hidemsgfor1", "1");
                      // location.reload();
                    }}
                    intent={"primary"}
                  >
                    {t(`Hide`)}
                  </Button>
                </div>
              </Callout>
            </div>
          )
        ) : (
          ""
        )}
        {p_mode() || gutils.dev() ? (
          gstore.localSettings.hide_for_init_portal_email ? (
            ""
          ) : (
            <div
              style={{ padding: "10px 0", margin: "0 10px", paddingTop: "0" }}
            >
              <Callout
                intent={"success"}
                icon={"data-connection"}
                title={t(`Enabled Local Storage on Cloud ToolBox`)}
              >
                <p>
                  {t(
                    `Since v1.5.7, CodeGen Online ToolBox will temporarily not support saving your data on the cloud, instead, we will save your data on your browser side. It means that you can enjoy complete features without having to sign in. Please be noted it didn't mean there's any security issue, the main reason is we need to ensure there's no illicit information being stored in our cloud database, and we have to accompany to the regulation of CSP . Don't worry, there's no data loss or breach issue, if you have your own data stored on Cloud ToolBox previously, and you want to retrieve them back, please contact us via E-Mail, and then we will provide it to you.`
                  )}
                  <br />
                </p>
                <p>E-Mail: work7z@outlook.com</p>
                <div>
                  <Button
                    onClick={() => {
                      gstore.localSettings.hide_for_init_portal_email = true;
                      // localStorage.setItem("hidemsgfor1", "1");
                      // location.reload();
                    }}
                    intent={"primary"}
                  >
                    {t(`Hide`)}
                  </Button>
                </div>
              </Callout>
            </div>
          )
        ) : (
          ""
        )}
        <Card
          style={{
            display: showCustomizerBtn ? "none" : null,
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          <Example className="docs-tabs-example">
            <Tabs
              id="TabsExample2"
              onChange={(e) => {
                gstore.localSettings.idx_tab_value = gutils.getValueFromE(e);
              }}
              vertical={true}
              renderActiveTabPanelOnly={true}
              animate={true}
              selectedTabId={gstore.localSettings.idx_tab_value}
            >
              {/* <div style={{ minHeight: "10px" }}></div> */}
              {_.map(
                _.reverse([
                  ...gstore.roadmap.get(),
                  {
                    pid: "all",
                    label: t(`All Functions`),
                    type: "all",
                    children: _.reverse(
                      _.flattenDeep(
                        [
                          ..._.map(gstore.roadmap.get(), (x) => x.children),
                        ].filter((x) => !_.isNil(x))
                      )
                    ),
                    // children: [],
                  },
                ]),
                (x, d, n) => {
                  let mysubchildren = [];
                  let parent_x = x;
                  gutils.iterateTree(x.children, (x, d, n) => {
                    if (_.isNil(x.children)) {
                      mysubchildren.push({ parent: parent_x, ...x });
                    }
                  });
                  if (trim_str != "") {
                    mysubchildren = _.filter(mysubchildren, (x) => {
                      return _.toLower(x.pystr || "").indexOf(trim_str) != -1;
                    });
                  }
                  if (_.isEmpty(mysubchildren)) {
                    mysubchildren = [];
                  }
                  mysubchildren = _.sortBy(
                    mysubchildren,
                    (x) => gstore.localSettings.nav_menu_remark[x.pid]
                  );
                  return (
                    <Tab
                      id={x.pid}
                      title={x.label}
                      panel={
                        <div
                          className="btn-list-wrapper"
                          onMouseLeave={() => {
                            on_activeMenuId(null);
                          }}
                        >
                          {/* {showMarkBtn ? (
                            <p>
                              {t(
                                `You can click the star button to control whether the function will be stickied on the top or not.`
                              )}
                            </p>
                          ) : (
                            ""
                          )} */}
                          {_.map(mysubchildren, (xx, dd, nn) => {
                            let is_not_remark = _.isNil(
                              gstore.localSettings.nav_menu_remark[xx.pid]
                            );
                            let commonPropsForBtn = {
                              outlined: false, //is_not_remark,
                              large: false, //!_.get(props, "useSmallButton", false),
                              minimal: false, //is_not_remark,
                            };
                            let ThatBtnTag = Button;
                            if (
                              gstore.localSettings.app_multiple_tab_mode &&
                              !gstore.sysinfo.cs
                            ) {
                              ThatBtnTag = AnchorButton;
                            }
                            return (
                              <ButtonGroup
                                style={{
                                  marginLeft: "6px",
                                  marginBottom: "5px",
                                }}
                              >
                                <ThatBtnTag
                                  intent={is_not_remark ? "none" : "primary"}
                                  href={gutils.wrapLink(xx.pathname)}
                                  target={gstore.sysinfo.cs ? null : "_blank"}
                                  {...commonPropsForBtn}
                                  onClick={(e) => {
                                    if (
                                      !gstore.sysinfo.cs &&
                                      gstore.localSettings.app_multiple_tab_mode
                                    ) {
                                      return;
                                    }
                                    if (e && e.metaKey) {
                                      window.open(xx.pathname);
                                    } else {
                                      gutils.hist.push(xx.pathname);
                                    }
                                  }}
                                  // onMouseEnter={() => {
                                  //   on_activeMenuId(xx.pid);
                                  // }}
                                  // onMouseLeave={() => {
                                  //   // on_activeMenuId(null);
                                  // }}
                                  text={xx.label}
                                ></ThatBtnTag>
                                {/* true || is_not_remark  */}
                                {showMarkBtn ? (
                                  <Button
                                    intent={is_not_remark ? "none" : "primary"}
                                    icon={is_not_remark ? `star-empty` : `star`}
                                    onClick={() => {
                                      if (
                                        gstore.localSettings.nav_menu_remark[
                                          xx.pid
                                        ]
                                      ) {
                                        gstore.localSettings.nav_menu_remark[
                                          xx.pid
                                        ] = null;
                                      } else {
                                        gstore.localSettings.nav_menu_remark[
                                          xx.pid
                                        ] = "1";
                                      }
                                    }}
                                    {...commonPropsForBtn}
                                  ></Button>
                                ) : (
                                  ""
                                )}
                              </ButtonGroup>
                            );
                            // return <li key={xx.pid + dd}>{xx.label}</li>;
                          })}
                        </div>
                      }
                      panelClassName="ember-panel"
                    />
                  );
                }
              )}
              {/* <Tabs.Expander />
              <InputGroup
                className={Classes.FILL}
                type="text"
                value={str}
                onChange={fn_for_ipt}
                placeholder={"Search..."}
              /> */}
            </Tabs>
          </Example>
        </Card>
        <div
          style={{ display: showCustomizerBtn ? "none" : null }}
          className="myroadmap-wrapper"
        >
          {true ? (
            <div></div>
          ) : (
            _.map(_.reverse([...gstore.roadmap.get()]), (x, d, n) => {
              let mysubchildren = [];
              let parent_x = x;
              gutils.iterateTree(x.children, (x, d, n) => {
                if (_.isNil(x.children)) {
                  mysubchildren.push({ parent: parent_x, ...x });
                }
              });
              if (trim_str != "") {
                mysubchildren = _.filter(mysubchildren, (x) => {
                  return _.toLower(x.pystr || "").indexOf(trim_str) != -1;
                });
              }
              if (_.isEmpty(mysubchildren)) {
                return [];
              }
              return (
                <div
                  key={"" + _.size(mysubchildren) + d + ""}
                  className="myeachroadmap my-top-box"
                >
                  <div className="roadmap-label my-top-title no-border-top">
                    <span>{x.label}</span>
                  </div>
                  <div className="my-top-ctn ">
                    <div className="myeachroadmap-body">
                      {_.map(mysubchildren, (xx, dd, nn) => {
                        let mycrtlabel = xx.label;
                        let isJustMyOwnChild =
                          xx.parent &&
                          _.size(xx.parent.children) == 1 &&
                          _.has(xx, "parent.parent.label");
                        if (isJustMyOwnChild) {
                          // mycrtlabel = xx.parent.label + "-" + mycrtlabel;
                        }
                        return (
                          <div key={dd + xx.label} className="myroaditem">
                            <a
                              onClick={() => {
                                gutils.hist.push(xx.pathname);
                              }}
                              href={"javascript:void(0);"}
                            >
                              {mycrtlabel}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* <div
          className="home-root-ele"
          style={{ padding: "8px", width: "100%", height: "100%" }}
        >
          {_.map(roadmap, (eachRoad, eachRoadIdx) => {
            return (
              <div class="home-item">
                <div class="home-item-label">{eachRoad.label}</div>
                <div class="home-item-children">
                  <GTree nodes={eachRoad.children} />
                </div>
              </div>
            );
          })}
        </div> */}
      </Card>
    </div>
  );
});
export default observer((props) => {
  let thatkey = `sys_nav_home`;
  let localStoreValue = useLocalStore(() => {
    return {
      // tab_value: gutils.dev() ? "customizer" : "menus",
      tab_value: "menus",
      menu_list: [],
      add_model: {
        PARENT_MENU_PID: null,
        PARENT_MENU_NAME: null,
        MENU_NAME: null,
        MENU_PID: null,
        MENU_TYPE: "link",
        MENU_LINK: "",
      },
    };
  });
  async function updateLatestNavHome() {
    if (!p_mode()) {
      let { content } = await gutils.opt("/infra/customize-menu-query-all");
      console.log("ctn", content);
      if (!_.isEqual(localStoreValue.menu_list, content)) {
        localStoreValue.menu_list = content;
        gstore.sysinfo.customize_menu_list = content;
      }
    }
  }
  useEffect(() => {
    let c = gutils.run_async_loop(async () => {
      await updateLatestNavHome();
    }, 3000);
    return () => {
      c();
    };
  }, []);
  let model = localStoreValue.add_model;
  let parent_roadmap_list = gstore.parent_roadmap_list.get();
  let finalCtn = (
    <GTabs
      keym={gstore.localSettings[thatkey]}
      noOptBtn={true}
      calcAutoHeight={true}
      noAllowAutoAdjust={true}
      mapid={thatkey || "non"}
      obj={{
        value: localStoreValue.tab_value,
        list: [
          {
            label: t(`App Menus`),
            id: "menus",
            closable: false,
          },
          {
            label: t(`Customizer`),
            id: "customizer",
            closable: false,
          },
        ],
      }}
      renderTabPane={(x, d, n) => {
        // if (x.id == "menus") {
        //   return (
        //   );
        // }
        // return (
        // );
      }}
      onChangeTab={(e) => {
        localStoreValue.tab_value = e;
      }}
    ></GTabs>
  );
  // height: "100%"
  return (
    <div
    // className="sys-card-wrapper"
    // style={{ height: "auto!important", maxHeight: "auto!important" }}
    >
      <div style={{ width: "100%" }}>
        <div style={{}}>
          <HomeMain
            {...(props || {})}
            customJSXEle={observer((props) => {
              return (
                <div
                  style={{
                    width: "60%",
                    padding: "12px",
                    margin: "0 auto",
                    paddingTop: "20px",
                  }}
                >
                  <FormGroup
                    label={t(`Customize Menu`)}
                    helperText={t(
                      `If you want to add link menu item under a specified menu parent, please click the button above to start adding.`
                    )}
                  >
                    <div style={{ marginBottom: "5px" }}>
                      <Button
                        disabled={p_mode()}
                        intent="primary"
                        icon="add"
                        text={t("Add Link Menu")}
                        onClick={() => {
                          gutils.w_alertMsgGlobal(
                            _.merge({
                              noBackdrop: false,
                              icon: "add",
                              onConfirm: async () => {
                                model.MENU_TYPE = "link";
                                model.MENU_PID = `CG_MENU_LINK_${new Date().getTime()}`;
                                let {
                                  PARENT_MENU_PID,
                                  MENU_NAME,
                                  MENU_LINK,
                                  MENU_TYPE,
                                  MENU_PID,
                                } = model;
                                if (_.isNil(PARENT_MENU_PID)) {
                                  await gutils.win_alert(
                                    `Please select parent menu item.`
                                  );
                                  return false;
                                }
                                if (_.isEmpty(MENU_NAME)) {
                                  await gutils.win_alert(
                                    `Menu name cannot be empty`
                                  );
                                  return false;
                                }
                                if (
                                  !_.startsWith(MENU_LINK, "https") &&
                                  !_.startsWith(MENU_LINK, "http")
                                ) {
                                  await gutils.win_alert(
                                    `Menu link should start with HTTPS or HTTP protocol(https:// or http://).`
                                  );
                                  return false;
                                }
                                await gutils.opt("/infra/customize-menu-add", {
                                  ...model,
                                });
                                gutils.alertOk(`Added.`);
                                return true;
                              },
                              style: {
                                width: "500px",
                                height: "60vh",
                              },
                              otherJSX: {
                                noBackdrop: false,
                              },
                              confirmIntent: "primary",
                              s_clzname: "white-app-view",
                              title: `Add Link Menu`,
                              jsx: observer(() => {
                                let parent_roadmap_list_1 =
                                  gstore.parent_roadmap_list.get();
                                return (
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "calc(100% - 30px)",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <FormGroup
                                      helperText={t(
                                        "Select the parent menu where the new sub-menu will place"
                                      )}
                                      label={t("Parent Menu")}
                                    >
                                      <GFormSelect
                                        list={_.map(
                                          parent_roadmap_list_1,
                                          (x, d, n) => {
                                            return {
                                              label: x.label,
                                              value: x.pid,
                                            };
                                          }
                                        )}
                                        value={model.PARENT_MENU_PID}
                                        onChange={async (e) => {
                                          model.PARENT_MENU_PID =
                                            gutils.getValueFromE(e);
                                        }}
                                      />
                                    </FormGroup>
                                    <FormGroup
                                      helperText={t(
                                        "Name the menu that you will create"
                                      )}
                                      label={t("My Menu Name")}
                                    >
                                      <GFormInput
                                        onChange={(val) => {
                                          model["MENU_NAME"] = val;
                                        }}
                                        value={model["MENU_NAME"]}
                                      />
                                    </FormGroup>
                                    <FormGroup
                                      helperText={t(
                                        "Please specify a link to the new menu, e.g. API documentation, online tools, internal website, etc."
                                      )}
                                      label={t("My Menu Link")}
                                    >
                                      <GFormInput
                                        placeholder="e.g. https://codegen.cc"
                                        onChange={(val) => {
                                          model["MENU_LINK"] = val;
                                        }}
                                        value={model["MENU_LINK"]}
                                      />
                                    </FormGroup>
                                  </div>
                                );
                              }),
                              resize: true,
                            })
                          );
                        }}
                      ></Button>
                    </div>
                    <div>
                      <Simple_table
                        column={[
                          {
                            label: t("Parent Menu"),
                            value: (x) =>
                              _.get(
                                _.find(
                                  parent_roadmap_list,
                                  (xx) => xx.pid == x["PARENT_MENU_PID"]
                                ),
                                "label",
                                x["PARENT_MENU_PID"]
                              ),
                          },
                          {
                            label: t(`Name`),
                            value: (x) => x["MENU_NAME"],
                          },
                          {
                            label: t(`Link`),
                            value: (x) => x["MENU_LINK"],
                          },
                          {
                            label: t(`Create Time`),
                            value: (x) => x["CREATE_TIME_DESC"],
                          },
                          {
                            label: t(`Operation`),
                            value: (x) => (
                              <div>
                                <a
                                  onClick={async (e) => {
                                    if (await gutils.ask_danger_opt()) {
                                      await gutils.opt(
                                        `/infra/customize-menu-delete`,
                                        {
                                          ...x,
                                        }
                                      );
                                    }
                                  }}
                                >
                                  {t(`Delete`)}
                                </a>
                              </div>
                            ),
                          },
                        ]}
                        data={localStoreValue.menu_list}
                      ></Simple_table>
                    </div>
                  </FormGroup>
                </div>
              );
            })}
          />
        </div>
      </div>
    </div>
  );
});
