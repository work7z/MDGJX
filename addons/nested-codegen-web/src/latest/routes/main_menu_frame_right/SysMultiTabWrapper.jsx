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
  Breadcrumb,
  Tab,
  Tabs,
  Radio,
  PanelStack2,
  ContextMenu,
  MenuItem,
  ButtonGroup,
  Slider,
  Menu,
  MenuDivider,
  TextArea,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  Breadcrumbs,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  Boundary,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
  Portal,
  Popover,
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
import _ from "lodash";
import StaticServerAdded from "../static_server_added/index.jsx";
import StaticServerView from "../static_server_view/index.jsx";
import ProxyServerAdded from "../proxy_server_added/index.jsx";
import ProxyServerView from "../proxy_server_view/index.jsx";
import Database_connections from "../dblink_global_view";
import TextCompare from "../../components/TextCompare";
import TextSearch from "../../components/TextSearch";
import Home from "../../components/Home";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BeautifyHtml from "../../components/BeautifyHtml";
import BeautifyXml from "../../components/BeautifyXml";
import BeautifyGraphql from "../../components/BeautifyGraphql";
import BeautifyOtherCommon from "../../components/BeautifyOtherCommon";
import XMLOtherCommon from "../../components/XMLOtherCommon";
import JSONOtherCommon from "../../components/JsonOtherCommon";
import TransOtherCommon from "../../components/TransOtherCommon";
import CodecOtherCommon from "../../components/CodecOtherCommon";
import NotesSnippet from "../../components/NotesSnippet";
import NotesClipboard from "../../components/NotesClipboard";
import TimeLogicPage from "../../components/TimeLogicPage";
import RandomLogicPage from "../../components/RandomLogicPage";
import CaseLogicPage from "../../components/CaseLogicPage";
import GenLogicPage from "../../components/GenLogicPage";
import DeskTopView from "../DeskTopView";
import PluginLoadView from "../PluginLoadView";
import HandlerClz from "../WrapError";
import TokenPatch from "../TokenPatch";
import GTabs from "../../components/GTabs";
import "./index.less";
import { Popover2 } from "@blueprintjs/popover2";
import Main_menu_frame_left from "../main_menu_frame_left";
import ScrollMemWrapper from "../main_menu_frame/ScrollMemWrapper";
import moment from "moment";
import localforage from "localforage";
import sys_func_maxim from "../../store/sys_func_maxim";
import HomeNavigator from "../../components/HomeNavigator";
import RunningTaskWrapper from "../RunningTaskWrapper";

const InternalBreadCrumbs = observer((props) => {
  let parentArr = [];
  try {
    let node = null;
    const latestRoutePath = gstore.sysinfo.latestRoutePath;
    let now_pathstr = latestRoutePath;
    let val_roadmap = gstore.roadmap.get();

    parentArr.push({
      root: true,
      label: t("All"),
      icon: "rocket-slant",
      // sub_count: _.size(gstore.ext.sub_menu),
      sub_count: _.chain(gstore.roadmap_plain.get())
        .map((x) => _.size(x.children))
        .sum()
        .value(),
      arr: val_roadmap,
    });
    _.every(val_roadmap, (x, d, n) => {
      _.every(x.children, (xx, dd, nn) => {
        if (now_pathstr == xx.pathname) {
          let sub_count_for_x = 0;
          gutils.iterateTree([x], (x, d, n) => {
            if (x.pathname) {
              sub_count_for_x++;
            }
          });
          parentArr.push(
            {
              ...x,
              sub_count: sub_count_for_x,
            },
            {
              ...xx,
            }
          );
          node = xx;
          return false;
        }
        _.every(xx.children, (xxx, ddd, nnn) => {
          if (now_pathstr == xxx.pathname) {
            let sub_count_for_x = 0;
            gutils.iterateTree([x], (x, d, n) => {
              if (x.pathname) {
                sub_count_for_x++;
              }
            });
            let sub_count_for_xx = 0;
            gutils.iterateTree([xx], (x, d, n) => {
              if (x.pathname) {
                sub_count_for_xx++;
              }
            });
            parentArr.push(
              {
                ...x,
                sub_count: sub_count_for_x,
              },
              {
                ...xx,
                sub_count: sub_count_for_xx,
              },
              xxx
            );
            node = xxx;
          }
          return node == null;
        });
        return node == null;
      });
      return node == null;
    });
  } catch (e) {
    console.log(e);
  }
  return (
    <Breadcrumbs
      {...{
        breadcrumbRenderer: (props = {}) => {
          return (
            <Popover
              popoverClassName={Classes.POPOVER_CONTENT}
              enforceFocus={true}
              position={"bottom"}
              placement="bottom-end"
            >
              <Breadcrumb {...props}> </Breadcrumb>
              <Card
                style={{
                  minWidth: "260px",
                  padding: "0px",
                  maxHeight: "80vh",
                  overflow: "auto",
                }}
              >
                <Main_menu_frame_left
                  mtag={ScrollMemWrapper}
                  treemap={props.treemap}
                ></Main_menu_frame_left>
              </Card>
            </Popover>
          );
        },
        currentBreadcrumbRenderer: (props = {}) => {
          return (
            <Breadcrumb {...props} href={undefined} current={true}>
              {" "}
            </Breadcrumb>
          );
        },
      }}
      items={[
        // { href: "/users", icon: "folder-close", text: "Users" },
        // { href: "/users/janet", icon: "folder-close", text: "Janet" },
        // { icon: "document", text: "image.jpg" },
        ..._.map(parentArr, (x, d, n) => {
          let isLastOne = d != _.size(parentArr) - 1;
          return {
            treemap: x.root ? x.arr : [x],
            text: x.sub_count ? `${x.label}(${x.sub_count})` : x.label,
            icon: x.icon || "application",
            href: isLastOne ? "javascript:void(0);" : undefined,

            // onClick: isLastOne
            //   ? (e) => {
            //       //   <Menu>
            //       //   <MenuDivider title={t("Menu")} />
            //       //   <MenuItem
            //       //     onClick={() => {
            //       //       //
            //       //     }}
            //       //     intent={"none"}
            //       //     icon={"redo"}
            //       //     text={t(`Restore Layout`)}
            //       //   />
            //       // </Menu>,
            //       ContextMenu.show(
            //         <div>hello, world</div>,
            //         { left: e.clientX, top: e.clientY },
            //         () => {}
            //       );
            //     }
            //   : undefined,
          };
        }),
      ]}
    />
  );
});
const RecentUseFunction = observer(() => {
  let lc_st = useLocalStore(() => {
    return {
      arr: [],
    };
  });
  useEffect(() => {
    let a = gutils.run_async_loop(async () => {
      let recent_usages = await localforage.getItem(`recent_usages`);
      recent_usages = _.reverse(recent_usages);
      let maxValue = 7;
      if (_.size(recent_usages) >= maxValue) {
        recent_usages = _.slice(recent_usages, 0, maxValue);
      }
      if (!_.isNil(recent_usages)) {
        if (!_.isEqual(lc_st.arr, recent_usages)) {
          lc_st.arr = recent_usages;
        }
      } else {
        lc_st.arr = [];
      }
    }, 2000);
    return () => {
      a();
    };
  }, []);
  let finOK = _.filter(
    lc_st.arr,
    (x) => !_.isEmpty(x.label) && !_.isEmpty(x.path)
  );
  if (_.isEmpty(finOK)) {
    <div className="fixed-lately-use-wrapper" style={{ marginTop: "3px" }}>
      <span
        style={{ marginRight: "8px", display: "inline-block" }}
        className={`bp3-text-small bp3-text-muted ` + " fixed-lately-use-label"}
      >
        {t(
          `Welcome to use CodeGen ToolBox, current timestamp is {0}`,
          Date.now()
        )}
      </span>
    </div>;
  }
  return (
    <div className="fixed-lately-use-wrapper" style={{ marginTop: "3px" }}>
      <span
        style={{ marginRight: "8px", display: "inline-block" }}
        className={`bp3-text-small bp3-text-muted ` + " fixed-lately-use-label"}
      >
        {t(`You have recently used these:`)}
      </span>
      <span style={{ marginRight: "5px", display: "inline-block" }}>
        {_.map(finOK, (x, d, n) => {
          return (
            <AnchorButton
              href={gutils.wrapLink(x.path)}
              small={true}
              intent={"primary"}
              minimal={true}
              // outlined={true}
              key={x.label}
              target="_blank"
              style={{ marginRight: "8px" }}
            >
              {x.label}
            </AnchorButton>
          );
        })}
      </span>
    </div>
  );
});

const FootControl = observer(() => {
  let maxims = React.useMemo(sys_func_maxim, []);
  window.m__maxims = maxims;
  const [moo, onMoo] = useState(false);
  const [t_val] = useState(parseInt("" + Math.random() * _.size(maxims)));
  return (
    <div
      className="bp3-text-small btmcontrols"
      style={{
        minHeight: "135px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        backgroundColor: "var(--app-bg-footpage)",
        // borderTop: "1px solid var(--app-bg-border-e1-gray-apptitle)",
      }}
    >
      <div>
        {t(
          `The Intelligent, Secure, and AD-Free ToolBox is Powered by CodeGen Official Team.`
        )}
      </div>
      <div
        onMouseEnter={() => {
          onMoo(true);
        }}
        onMouseLeave={() => {
          onMoo(false);
        }}
        onClick={() => {}}
        title={t(`pearls of wisdom from the master`)}
      >
        {/* {t(`App Version: {0}`, bp3 - text - small)} */}"
        {_.get(maxims, t_val)}"
        {/* {t(`Learn More Please Visit`, "")}{" "}
        <a className="bp3-text-small" href="https://codegen.cc" target="_blank">
          {`https://codegen.cc`}
        </a> */}
      </div>
      <div>
        Copyright © 2016-
        {moment().format("YYYY")} All rights reserved.{" "}
      </div>
      {p_mode() || gutils.dev() ? (
        <div>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow">
            粤ICP备16114169号-7
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

const ViewControls = observer(() => {
  let lc_st = useLocalStore(() => {
    return {
      obj: {
        value: null,
        list: [],
      },
    };
  });
  useEffect(() => {
    let fn_init_now = () => {
      // .children
      let baseHeaderArr = _.chain(_.map(gstore.roadmap.get(), (x) => x))
        .filter((x) => !_.isEmpty(x))
        .flatten()
        .filter((x) => !_.isEmpty(x.children))
        .map((x, d, n) => {
          let allSubMenus = [];
          gutils.iterateTree([x], (xx, dd, nn) => {
            if (xx && _.isEmpty(xx.children)) {
              allSubMenus.push(xx);
            }
          });
          return {
            ...x,
            children: allSubMenus,
          };
        })
        .sortBy((x) => _.size(x.children) * -1)
        .value();
      let baseHeader = [];
      let maximumSize = 12;
      let otherFunctions = {
        label: t(`Other`),
        id: "other",
        children: [],
      };
      _.forEach(baseHeaderArr, (x, d, n) => {
        if (d < 12) {
          baseHeader.push(x);
        } else {
          if (!_.isEmpty(x.children)) {
            otherFunctions.children.push(...x.children);
          }
        }
      });
      baseHeader.push(otherFunctions);
      lc_st.obj.list = _.map(baseHeader, (x, d, n) => {
        return {
          id: x.id,
          label: x.label,
          closable: false,
          meta: x,
        };
      });
      if (_.findIndex(lc_st.obj.list, (x) => x.id == lc_st.obj.value) == -1) {
        lc_st.obj.value = _.get(lc_st.obj.list, [0, "id"]);
      }
    };
    let a = reaction(() => {
      return [gstore.roadmap.get(), gstore.localSettings.app_multiple_tab_mode];
    }, fn_init_now);
    setTimeout(() => {
      fn_init_now();
    }, 0);
    return () => {
      a();
    };
  }, []);
  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "15px",
        border: `1px solid var(--app-bg-border-CED9E0)`,
      }}
    >
      {/* <Tabs
        animate={true}
        key={"horizontal"}
        renderActiveTabPanelOnly={false}
        vertical={false}
      >
        {_.map(lc_st.obj.list, (x, d, n) => {
          let crtItem = _.get(lc_st.obj.list, [d, "meta"]);
          return (
            <Tab
              id="ng"
              title="Angular"
              panel={
                <div style={{ padding: "10px", minHeight: "500px" }}>
                  {_.map(_.get(crtItem, "children"), (xx, dd, nn) => {
                    return (
                      <div style={{ display: "inline-block", width: "25%" }}>
                        <a href={gutils.wrapLink(xx.pathname)} key={xx.label}>
                          {xx.label}
                        </a>
                      </div>
                    );
                  })}
                </div>
              }
            />
          );
        })}
      </Tabs> */}
      <GTabs
        hoverChange={true}
        large={true}
        noAllowAutoAdjust={true}
        noOptBtn={true}
        obj={lc_st.obj}
        renderTabPane={(x, d, n) => {
          let crtItem = _.get(lc_st.obj.list, [d, "meta"]);
          return (
            <div
              style={{
                background: "var(--app-bg-white)",
                padding: "20px",
                minHeight: "350px",
              }}
            >
              {_.map(_.get(crtItem, "children"), (xx, dd, nn) => {
                return (
                  <div
                    style={{
                      height: "30px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "25%",
                    }}
                  >
                    <a
                      className={Classes.UI_TEXT}
                      target="_blank"
                      href={gutils.wrapLink(xx.pathname)}
                      key={xx.label}
                    >
                      {xx.label}
                    </a>
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
});

const MultiTabWrapper = observer((props) => {
  return (
    <div style={{ width: "100%" }}>
      <div className="fixed-width-for-multitab">
        <div
          className="multitab-controls-wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <InternalBreadCrumbs />
          </div>
          <div className="sub-ml-5">
            <Popover>
              <Button
                small={true}
                minimal={true}
                icon="app-header"
                title={t(`manage the view of application`)}
              ></Button>
              <div
                style={{
                  width: "50vw",
                  // height: "80vh",
                  //  maxHeight: "80vh",
                  padding: "15px",
                  minWidth: "550px",
                  minHeight: "auto",
                }}
              >
                <RunningTaskWrapper />
                {/* <HomeNavigator autoFocus={true} m_style={{}} /> */}
                {/* <h2>{t(`Welcome to use CodeGen!`)}</h2>
                <p>
                  {t(
                    `More useful features will be placed here, please kindly stay tuned. If you have any suggestion, please contact us at any time.`
                  )}
                </p> */}
                {/* <FormGroup label={t(`Height of this App View`)}>
                  <Slider
                    min={300}
                    max={2000}
                    stepSize={10}
                    labelStepSize={500}
                    onChange={(val) => {
                      gstore.localSettings.app_sys_app_view_height = parseInt(
                        "" + val
                      );
                    }}
                    labelRenderer={(val) => {
                      return `${val}px`;
                    }}
                    value={gstore.localSettings.app_sys_app_view_height}
                  ></Slider>
                </FormGroup> */}
              </div>
            </Popover>
            <AnchorButton
              small={true}
              minimal={true}
              href={location.href}
              target="_blank"
              icon="duplicate"
              title={t(`Share this page with my friends.`)}
              onClick={(e) => {
                gutils.stop_e(e);
                gutils.copy(location.href);
                gutils.alertOk(
                  t(
                    `Copied the URL successfully! You can share this page via the link you just copied.`
                  )
                );
              }}
            ></AnchorButton>
            {""}
            <AnchorButton
              href={location.href}
              small={true}
              minimal={true}
              target="_blank"
              icon="share"
              title={t(`Duplicate this page.`)}
            ></AnchorButton>
          </div>
        </div>
        <div style={{ display: "block", clear: "both" }}>{props.children}</div>

        <RecentUseFunction></RecentUseFunction>
        <ViewControls></ViewControls>
        <div>
          <Callout
            style={{
              display: localStorage.getItem("nosuggv160") ? "none" : null,
              marginTop: "10px",
              marginBottom: "15px",
            }}
            intent={"none"}
            icon="history"
            title={t("We're looking forward to your any suggestion.")}
          >
            <p>
              {t(
                `Since v1.6.0, we have adjusted the main layout as the browser page mode based, which means you can easily switch one of these tabs. Please click the mountain button on the top nav bar if you like the previous layout style.`
              )}
            </p>
            <p>
              {t(
                `If you have any suggestion, please feel free to send an E-Mail to us or create an issue on Github, the developer contact information as below:`
              )}
            </p>
            <ul>
              <li>
                E-Mail:{" "}
                <a target="_blank" href="mailto:work7z@outlook.com">
                  work7z@outlook.com
                </a>
              </li>
              <li>
                Github:{" "}
                <a
                  href="https://github.com/work7z/CodeGen/issues"
                  target="_blank"
                >
                  https://github.com/work7z/CodeGen/issues
                </a>
              </li>
              <li>{t(`QQ Group`)}: 106038310</li>
              <del>
                {" "}
                <li>
                  {t(`Telegram`)}: codegen_toolbox{" "}
                  {t(
                    `It is unavailable presently due to the network issue, please contact us via other ways`
                  )}
                </li>
              </del>
            </ul>
            <Button
              onClick={() => {
                localStorage.setItem("nosuggv160", "1");
                location.reload();
              }}
              intent={"none"}
            >
              {t(`Hide`)}
            </Button>
          </Callout>
        </div>
        <div>
          <Callout
            style={{
              display: localStorage.getItem("nosuggv160000") ? "none" : null,
              marginTop: "10px",
              marginBottom: "15px",
            }}
            intent={"none"}
            icon="key"
            title={t("Hot key makes CodeGen more perfect.")}
          >
            <p>
              {t(
                `You can invoke the core UI controls by simply pressing the corresponding key, which probably will highly improve the efficiency while using CodeGen ToolBox. So, How to use it? It's very simple, you can open the dialog by pressing {0} key, then you will be able to check how all of these key mappings will work.`,
                "?"
              )}
            </p>
            <Button
              onClick={() => {
                localStorage.setItem("nosuggv160000", "1");
                location.reload();
              }}
              intent={"none"}
            >
              {t(`Hide`)}
            </Button>
          </Callout>
        </div>
        {gstore.sysinfo.latestRoutePath != "/" &&
        gstore.sysinfo.latestRoutePath != "" &&
        !_.isNil(gstore.sysinfo.latestRoutePath) ? (
          <div style={{}}>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "15px",
              }}
            >
              <HomeNavigator
                fn_key_str={"crt_functions_filter_str_btm"}
                a={true}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <FootControl></FootControl>
    </div>
  );
});

export default MultiTabWrapper;
