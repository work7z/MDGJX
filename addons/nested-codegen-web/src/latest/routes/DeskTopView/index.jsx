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
  ContextMenu,
  Menu,
  MenuItem,
  MenuDivider,
  TextArea,
  Intent,
  Position,
  Toaster,
  Checkbox,
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
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState, useEffect } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
import Qs from "querystring";
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
import moment from "moment";
import Draggable, { DraggableCore } from "react-draggable";
import PluginLoadView from "../PluginLoadView";

let pad_for_width = () => gstore.desktop.bounds.width * (1 - 0.7);
let pad_for_height = () => gstore.desktop.bounds.height * (1 - 0.7);

let cpt_mapping = {};

let updateDesktop = () => {
  gstore.desktop.windows = [...gstore.desktop.windows];
};

let MyTime = (props) => {
  let [myvalue, onmyvalue] = useState("");
  useEffect(() => {
    let fn_a = () => {
      onmyvalue(moment().format("YYYY-MM-DD HH:mm:ss"));
    };
    let myref = window.setInterval(fn_a, 1000);
    fn_a();
    return () => {
      window.clearInterval(myref);
    };
  }, []);
  return <span>{myvalue}</span>;
};

const MenuBar = observer(() => {
  return (
    <div className="desktopview-btm">
      <div
        className={"btn-menu"}
        onClick={() => {
          gstore.desktop.isMenuOpen = !gstore.desktop.isMenuOpen;
        }}
      >
        {/* <Icon icon="menu" size={12} /> */}
        <span>{t("Menu")}</span>
      </div>
      <div className={"btn-center"}>
        {_.chain(gstore.desktop.windows)
          .slice(0, 4)
          .map((x, d, n) => {
            let win = x;
            return (
              <div
                className={
                  "each-menu-item" +
                  " " +
                  (win.id == gstore.desktop.win_max_active_id
                    ? " active-menu-label "
                    : "")
                }
                onClick={() => {
                  console.log(
                    "onclick",
                    win.id,
                    gstore.desktop.win_max_active_id
                  );
                  // gstore.desktop.windows[0].open = !gstore.desktop.windows[0].open
                  let myidx = _.findIndex(
                    gstore.desktop.windows,
                    (x) => x.id == win.id
                  );
                  gstore.desktop.windows[myidx].open =
                    !gstore.desktop.windows[myidx].open;
                  gstore.desktop.win_max_active_id = win.id;
                  updateDesktop();
                }}
                key={x.id}
              >
                <div className={"menu-label" + " "}>{win.label}</div>
                <Button
                  minimal={true}
                  outlined={true}
                  small={true}
                  icon="small-cross"
                  onClick={() => {
                    let idx = _.findIndex(
                      gstore.desktop.windows,
                      (x) => x.id == win.id
                    );
                    gstore.desktop.windows = gutils.pickArr(
                      gstore.desktop.windows,
                      idx
                    );
                    updateDesktop();
                  }}
                ></Button>
              </div>
            );
            // return <EachProcessMenu win={x} key={x.id} />;
          })
          .value()}
      </div>
      {!_.isEmpty(gstore.desktop.windows) ? (
        <div
          className={"btn-list-tabs"}
          onClick={(e) => {
            gutils.stop_e(e);
            ContextMenu.show(
              <Menu style={{ zIndex: 13 }}>
                <MenuDivider title={t(`Windows`)} />
                {_.map(gstore.desktop.windows, (x, d, n) => {
                  return (
                    <MenuItem
                      onClick={(e) => {
                        gutils.stop_e(e);
                        console.log("files");
                      }}
                      icon={x.icon}
                      text={x.label}
                    >
                      <MenuItem
                        icon="document-open"
                        text={t(`Toggle`)}
                        onClick={() => {
                          x.open = true;
                          gstore.desktop.win_max_active_id = x.id;
                        }}
                      ></MenuItem>
                      <MenuItem
                        onClick={() => {
                          let win = x;
                          let idx = _.findIndex(
                            gstore.desktop.windows,
                            (x) => x.id == win.id
                          );
                          gstore.desktop.windows = gutils.pickArr(
                            gstore.desktop.windows,
                            idx
                          );
                        }}
                        icon="small-cross"
                        text={t(`Close`)}
                      ></MenuItem>
                    </MenuItem>
                  );
                })}
              </Menu>,
              { left: e.clientX, top: e.clientY },
              () => {}
            );
          }}
        >
          <Button
            outlined={true}
            small={true}
            minimal={true}
            icon="list"
          ></Button>
        </div>
      ) : (
        ""
      )}
      <div className={"btn-time"}>
        <MyTime />
      </div>
    </div>
  );
});

let DesktopMenuWrapper = observer((props) => {
  window.desktop_props = props;
  return gstore.desktop.isMenuOpen ? (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "280px",
        height: "430px",
      }}
      className="menu-wrapper"
      onClick={(e) => {
        gutils.stop_e(e);
        e.stopPropagation();
        window.desktop_clicked = true;
        return false;
      }}
    >
      <div className="menulist-wrapper">
        <Menu>
          {_.chain(gstore.nav_menu)
            .map((x) => {
              console.log("rendering nav menu");
              if (_.isEmpty(gstore.desktop.search.lower_text)) {
                return x;
              }
              return {
                ...x,
                children: _.filter(x.children, (eachChild) => {
                  return (
                    (
                      eachChild.pystr ||
                      _.toLower(eachChild.label) ||
                      ""
                    ).indexOf(gstore.desktop.search.lower_text) != -1
                  );
                }),
              };
            })
            .filter((x) => {
              return !_.isEmpty(x.children);
            })
            .map((x) => {
              return [
                <MenuDivider title={x.label} />,
                ..._.map(x.children, (xx, dd, nn) => {
                  let fn_click = (e) => {
                    gstore.desktop.isMenuOpen = false;
                    gutils.defer(() => {
                      gstore.desktop.draggingObj.show = false;
                    }, 50);
                    console.log("click item");
                    let myfin = _.find(gstore.desktop.windows, (eachWin) => {
                      return eachWin.pathname == xx.pathname;
                    });
                    if (myfin == null) {
                      myfin = {
                        ..._.cloneDeep(xx),
                        // left: pad_for_width() / 2,
                        // top: pad_for_height() / 2,
                        // width: gstore.desktop.bounds.width - pad_for_width(),
                        // height: gstore.desktop.bounds.height - pad_for_height(),
                        left: 0,
                        top: 0,
                        width: gstore.desktop.bounds.width,
                        height: gstore.desktop.bounds.height,
                        open: true,
                        timestamp: gstore.desktop.timestamp,
                        id: xx.pathname,
                        // cpt: null,
                      };
                      let willComponents = React.createElement(
                        _.get(
                          _.find(
                            props.allRoutesArr,
                            (eachRoute) => eachRoute.path == xx.pathname
                          ),
                          "cpt"
                        )
                      );
                      window.xxxx = xx;
                      console.log("will components");
                      if ((xx.pathname || "").indexOf("/exts") != -1) {
                        willComponents = (
                          <PluginLoadView
                            {...Qs.parse(
                              xx.pathname.substring(
                                xx.pathname.indexOf("?") + 1
                              )
                            )}
                            id={xx.pathname.replace("/exts/", "")}
                          />
                        );
                      }
                      cpt_mapping[myfin.id] = willComponents;
                      gstore.desktop.windows.push(myfin);
                      gstore.desktop.win_max_active_id = myfin.id;
                    } else {
                      myfin.open = true;
                      myfin.id = xx.pathname;
                      gstore.desktop.win_max_active_id = myfin.id;
                    }
                  };

                  if (gutils.dev()) {
                    // debugger;
                    if (_.isNil(window.a)) {
                      window.a = 0;
                    }
                    if (window.a < 5) {
                      // fn_click();
                    }
                    window.a++;
                  }

                  return (
                    <MenuItem
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          gutils.stop_e(e);
                          fn_click();
                        }
                      }}
                      onClick={fn_click}
                      icon={xx.icon || "application"}
                      text={xx.label}
                    />
                  );
                }),
              ];
            })
            .value()}
        </Menu>
      </div>
      <div className="search-wrapper">
        <InputGroup
          small={true}
          id="win_search_all"
          ref={(e) => {
            if (e) {
              gutils.defer(() => {
                e.focus();
              });
            }
          }}
          placeholder={t("searching items...")}
          value={gstore.desktop.search.text}
          onChange={(e) => {
            gstore.desktop.search.text = e.target.value;
            gstore.desktop.search.lower_text = _.toLower(e.target.value);
          }}
        ></InputGroup>
      </div>
    </div>
  ) : (
    ""
  );
});

let DesktopWindowPanel = observer((props) => {
  let [win_id] = useState(_.uniqueId("uxid"));
  let [crtWinWidth, onCrtWinWidth] = useState(0);
  let [crtWinHeight, onCrtWinHeight] = useState(0);
  let recalcWidthHeight = () => {
    let rect = $("#" + win_id)[0].getBoundingClientRect();
    onCrtWinWidth(rect.width);
    onCrtWinHeight(rect.height);
  };
  let { win } = props;
  let cpt = cpt_mapping[win.id];
  if (_.isNil(cpt) || win.timestamp != gstore.desktop.timestamp) {
    window.allmydeskprop = props;
    cpt = _.get(
      _.find(props.allRoutesArr, (x) => x.path == win.id),
      "cpt"
    );
    if (_.isNil(cpt)) {
      cpt = (props) => (
        <div>{t(`The session had been expired, please reload this page`)}</div>
      );
    }
    if (!_.isNil(cpt)) {
      cpt = React.createElement(cpt);
    } else {
      cpt = "N/A";
    }
    gutils.defer(() => {
      win.timestamp = gstore.desktop.timestamp;
      cpt_mapping[win.id] = cpt;
      // win.cpt = cpt;
      gutils.delayUpdateResize();
    });
  }
  let pad_w = crtWinWidth / 2;
  let pad_h = crtWinHeight / 2;
  let activeItem = _.maxBy(gstore.desktop.windows, (x) => x.max);
  let isFullNow =
    win.width == gstore.desktop.bounds.width &&
    win.height == gstore.desktop.bounds.height;

  let fn_show_ctx_menu = (e) => {
    gutils.stop_e(e);
    ContextMenu.show(
      <Menu>
        <MenuDivider title={t(`Scale`)} />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            win.width = win.width / 2;
          }}
          icon="remove-column-left"
          text={t("Move to the Left") + "(50%)"}
        />

        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            let cut_val = win.width / 2;
            win.width = cut_val;
            win.left += cut_val;
          }}
          icon="remove-column-right"
          text={t("Move to the Right") + "(50%)"}
        />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            win.height = win.height / 2;
          }}
          icon="remove-row-top"
          text={t("Move to the Top") + "(50%)"}
        />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            let cut_val = win.height / 2;
            win.height = cut_val;
            win.top += cut_val;
          }}
          icon="remove-row-bottom"
          text={t("Move to the Bottom") + "(50%)"}
        />
        <MenuDivider />

        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            let ccval = win.width;
            win.width += ccval;
            win.left -= ccval;
          }}
          icon="add-column-left"
          text={t("Extend to the Left") + "(50%)"}
        />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            let cut_val = win.width;
            win.width += cut_val;
            // win.left += cut_val;
          }}
          icon="add-column-right"
          text={t("Extend to the Right") + "(50%)"}
        />

        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            let ccval = win.height;
            win.height += ccval;
            win.top -= ccval;
          }}
          icon="add-row-top"
          text={t("Extend to the Top") + "(50%)"}
        />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            let cut_val = win.height;
            win.height += cut_val;
          }}
          icon="add-row-bottom"
          text={t("Extend to the Bottom") + "(50%)"}
        />
        <MenuDivider title={t(`Window`)} />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            _.merge(win, {
              left: pad_for_width() / 2,
              top: pad_for_height() / 2,
              width: gstore.desktop.bounds.width - pad_for_width(),
              height: gstore.desktop.bounds.height - pad_for_height(),
            });
          }}
          icon="align-center"
          text={t("Center View")}
        />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            _.merge(win, {
              left: 0,
              top: 0,
              width: gstore.desktop.bounds.width,
              height: gstore.desktop.bounds.height,
            });
          }}
          icon="maximize"
          text={t("Full Screen View")}
        />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            win.open = false;
          }}
          icon="minimize"
          text={t("Minimize the Window")}
        />
        <MenuItem
          onClick={(e) => {
            gutils.stop_e(e);
            let idx = _.findIndex(
              gstore.desktop.windows,
              (x) => x.id == win.id
            );
            gstore.desktop.windows = gutils.pickArr(
              gstore.desktop.windows,
              idx
            );
          }}
          icon="small-cross"
          text={t("Close the Window")}
        />
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => {}
    );
  };

  return (
    <Draggable
      bounds={{
        left: 0 - pad_w,
        top: 0,
        right: gstore.desktop.bounds.right - pad_w,
        bottom: gstore.desktop.bounds.bottom - pad_h,
      }}
      position={{
        position: "absolute",
        x: win.left,
        y: win.top,
      }}
      handle=".desktop-window-title-box"
      onStop={(e, data) => {
        console.log("drag stop", e, data);
        // let orect = document.getElementById(win_id).getBoundingClientRect();
        win.left = data.x;
        win.top = data.y;
        // console.log("when dragging");
        // let ele_main = $("#" + gstore.desktop.main_id)[0];
        // let ele_crt_win = $("#" + win_id)[0];
        // console.log("dragging", ele_main, ele_crt_win);
      }}
      onDrag={() => {
        gstore.desktop.isMenuOpen = false;
        gstore.desktop.win_max_active_id = win.id;
      }}
    >
      <Resizable
        {...gutils.allResizeProps()}
        enable={_.merge(gutils.enableResize(), {
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        })}
        size={{
          width: win.width,
          height: win.height,
        }}
        // className={props.leftClz + " halfresize-hori-left-box"}
        // size={{
        //   height: "100%",
        //   width: thewidth,
        //   overflow: "auto",
        // }}
        // location={{
        //   left: 0,
        //   top: 0
        // }}
        onResize={(event, direct, refToEle, delta) => {
          console.log("action delta.width", delta.width);
          if (direct == "top") {
            win.top += (win.last_delta_top || 0) - delta.height;
            win.last_delta_top = delta.height;
          }
          if (direct == "left") {
            win.left += (win.last_delta_left || 0) - delta.width;
            win.last_delta_left = delta.width;
          }
          let rect = refToEle.getBoundingClientRect();
          win.width = rect.width;
          win.height = rect.height;
          gstore.desktop.isMenuOpen = false;
          gstore.desktop.win_max_active_id = win.id;
        }}
        boundsByDirection={true}
        onResizeStop={(event, direct, refToEle, delta) => {
          // win.left -= delta.width;
          // win.width = refToEle.getBoundingClientRect().width;
          win.last_delta_left = 0;
          win.last_delta_right = 0;
          win.last_delta_top = 0;
          console.log("resize func", event, direct, refToEle, delta);

          gutils.defer(() => {
            recalcWidthHeight();
          });

          gutils.delayUpdateResize();
        }}
        className={
          "desktop-window-box" +
          " " +
          (gstore.desktop.win_max_active_id == win.id ? "active-win" : "")
        }
        style={{
          display: !win.open ? "none" : null,
          background: `var(--app-bg-white)`,
          border: `1px solid var(--app-border-white-dd)`,
          position: "absolute",
          zIndex: gstore.desktop.win_max_active_id == win.id ? 16 : 15,
          resize: "both",
        }}
        ref={(e) => {
          if (e) {
            recalcWidthHeight();
          }
        }}
        id={win_id}
        onClick={(e) => {
          gutils.stop_e(e);
          e.stopPropagation();
          gstore.desktop.isMenuOpen = false;
          gstore.desktop.win_max_active_id = win.id;
        }}
        onDrag={() => {
          gstore.desktop.isMenuOpen = false;
          gstore.desktop.win_max_active_id = win.id;
        }}
      >
        <div
          onContextMenu={fn_show_ctx_menu}
          onDoubleClick={() => {
            if (
              win.width == gstore.desktop.bounds.width &&
              win.height == gstore.desktop.bounds.height
            ) {
              win.left = pad_for_width() / 2;
              win.top = pad_for_height() / 2;
              win.width = gstore.desktop.bounds.width - pad_for_width();
              win.height = gstore.desktop.bounds.height - pad_for_height();
            } else {
              win.left = 0;
              win.top = 0;
              win.width = gstore.desktop.bounds.width;
              win.height = gstore.desktop.bounds.height;
            }
          }}
          className="desktop-window-title-box"
        >
          <div class="title-left">
            <Button
              icon={win.icon || "application"}
              minimal={true}
              small={true}
              outlined={true}
              onClick={fn_show_ctx_menu}
            ></Button>
            {/* <span style={{ marginLeft: "3px" }} className="titleleft">
              {win.label || ""}
            </span> */}
          </div>
          <div class="title-center">{win.label || ""}</div>
          <div class="title-right">
            <Button
              minimal={true}
              small={true}
              outlined={true}
              icon="minus"
              onClick={() => {
                win.open = false;
              }}
            ></Button>
            <Button
              minimal={true}
              small={true}
              outlined={true}
              onClick={() => {
                if (isFullNow) {
                  win.left = pad_for_width() / 2;
                  win.top = pad_for_height() / 2;
                  win.width = gstore.desktop.bounds.width - pad_for_width();
                  win.height = gstore.desktop.bounds.height - pad_for_height();
                } else {
                  win.left = 0;
                  win.top = 0;
                  win.width = gstore.desktop.bounds.width;
                  win.height = gstore.desktop.bounds.height;
                }
              }}
              icon={isFullNow ? "minimize" : "maximize"}
            ></Button>
            <Button
              minimal={true}
              small={true}
              outlined={true}
              icon="small-cross"
              onClick={() => {
                let idx = _.findIndex(
                  gstore.desktop.windows,
                  (x) => x.id == win.id
                );
                gstore.desktop.windows = gutils.pickArr(
                  gstore.desktop.windows,
                  idx
                );
              }}
            ></Button>
          </div>
        </div>
        <div className="destop-window-ctn-box">{cpt || ""}</div>
      </Resizable>
    </Draggable>
  );
});

let DesktopWindowListWrapper = observer((props) => {
  return (
    <div className="desktop-window-list-wrapper">
      {_.map(gstore.desktop.windows, (x, d, n) => {
        return <DesktopWindowPanel {...props} win={x} key={x.pathname} />;
      })}
    </div>
  );
});

let DesktopViewMain = observer((props) => {
  let draggingObj = gstore.desktop.draggingObj;
  let myleft = Math.min(draggingObj.left, draggingObj.right);
  let mytop = Math.min(draggingObj.top, draggingObj.bottom);
  let mystyle = {
    width: Math.abs(draggingObj.right - draggingObj.left) + "px",
    height: Math.abs(draggingObj.bottom - draggingObj.top) + "px",
    position: "absolute",
    left: myleft + "px",
    top: mytop + "px",
    background: "#48aff0",
    opacity: 0.4,
    display: !draggingObj.show ? "none" : null,
  };
  console.log("mystyle", mystyle);
  let [nx_id] = useState(_.uniqueId("ux"));
  let menu_fn = (fn) => {
    return (e) => {
      gutils.stop_e(e);
      gutils.defer(() => {
        draggingObj.show = false;
      }, 50);
      window.ctxmenu = true;
      return fn(e);
    };
  };
  let fn_init_desktop = () => {
    let $ele = $("#" + gstore.desktop.main_id);
    if ($ele.length == 0) {
      return;
    }
    let rect = $ele[0].getBoundingClientRect();

    let bounds = gstore.desktop.bounds;
    bounds.left = 0;
    bounds.right = rect.width;
    bounds.width = rect.width;
    bounds.top = 0;
    bounds.bottom = rect.height;
    bounds.height = rect.height;
  };
  window.fn_init_desktop = fn_init_desktop;
  gutils.defer(() => {
    gutils.once("init_desktop_view", () => {
      autorun(() => {
        if (gstore.desktop.isMenuOpen) {
          gutils.defer(() => {
            $("#win_search_all").focus();
          }, 100);
        }
      });
      gutils.keyDownListenObj["desktop_down"] = (e) => {
        console.log("keydown", e);
      };
      gutils.anyResizeTriggerArr["init_desktop"] = () => {
        fn_init_desktop();
      };
      fn_init_desktop();
    });
  });
  return (
    <div
      onClick={() => {
        gutils.defer(() => {
          if (window.desktop_clicked) {
            window.desktop_clicked = false;
            return;
          }
          gstore.desktop.isMenuOpen = false;
          gstore.desktop.win_max_active_id = null;
        }, 50);
      }}
      onContextMenu={(e) => {
        console.log("contextmenu trigger");
        gutils.stop_e(e);
        if (e.target.id != gstore.desktop.main_id) {
          return;
        }
        console.log(e.target, e.target.id);
        window.ctxmenu = true;
        let myref_ctx_menu = ContextMenu.show(
          <Menu>
            <MenuDivider title={t(`Desktop`)} />
            <MenuItem
              onClick={menu_fn((e) => {})}
              icon="refresh"
              text={t("Refresh")}
            />
            <MenuItem
              onClick={menu_fn((e) => {
                gstore.desktop = window.fn_desktop();
              })}
              icon="reset"
              text={t("Reset")}
            />
            <MenuDivider title={t(`Operation`)} />
            <MenuItem
              onClick={menu_fn((e) => {
                // gutils.stop_e(e);;
                // e.stopPropagation();
                window.ctxmenu = true;
                _.forEach(gstore.desktop.windows, (x) => (x.open = true));
                gstore.desktop.windows = [...gstore.desktop.windows];
                gstore.desktop.windows = _.map(
                  [...gstore.desktop.windows],
                  (x, d, n) => {
                    return {
                      ...x,
                      open: true,
                    };
                  }
                );
              })}
              icon="circle-arrow-up"
              text={t("Show All Windows")}
            />
            <MenuItem
              onClick={menu_fn((e) => {
                // gutils.stop_e(e);;
                // e.stopPropagation();
                _.forEach(gstore.desktop.windows, (x) => (x.open = false));
                gstore.desktop.windows = _.map(
                  [...gstore.desktop.windows],
                  (x, d, n) => {
                    return {
                      ...x,
                      open: false,
                    };
                  }
                );
              })}
              icon="collapse-all"
              text={t("Hide All Windows")}
            />
            <MenuItem
              onClick={menu_fn((e) => {
                // gutils.stop_e(e);;
                window.ctxmenu = true;
                gstore.desktop.windows = [];
              })}
              icon="collapse-all"
              text={t("Close All Windows")}
            />
            <MenuItem
              onClick={menu_fn((e) => {
                // gutils.stop_e(e);;
                window.ctxmenu = true;
                gstore.localSettings.using_desktop_mode = false;
              })}
              icon="page-layout"
              text={t("Exit Desktop Mode")}
            />
          </Menu>,
          { left: e.clientX, top: e.clientY },
          () => {}
        );
        window.myref_ctx_menu = myref_ctx_menu;
      }}
      id={nx_id}
      ref={(e) => {
        gstore.desktop.main_id = nx_id;
        gutils.defer(() => {
          fn_init_desktop();
        });
      }}
      className="desktopview-main"
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onMouseDown={(e) => {
        if (e.target.id != gstore.desktop.main_id) {
          return;
        }
        draggingObj.show = true;
        let rect = document.getElementById(nx_id).getBoundingClientRect();
        draggingObj.left = e.pageX - rect.x;
        draggingObj.top = e.pageY - rect.y;
        draggingObj.right = draggingObj.left;
        draggingObj.bottom = draggingObj.top;
        $(document.body).addClass("no-drag-select");
      }}
      onMouseUp={() => {
        draggingObj.show = false;
        $(document.body).removeClass("no-drag-select");
      }}
      onMouseMove={(e) => {
        if (!draggingObj.show) {
          return;
        }
        console.log("moving", e, e.pageX, e.pageY);
        let rect = document.getElementById(nx_id).getBoundingClientRect();
        draggingObj.right = e.pageX - rect.x;
        draggingObj.bottom = e.pageY - rect.y;
      }}
    >
      <div style={mystyle}></div>
      <DesktopWindowListWrapper {...props} />
      <DesktopMenuWrapper {...props} />
    </div>
  );
});

export default observer((props) => {
  window.switch_routes = props;
  return (
    <div className="deskTopView-wrapper">
      <DesktopViewMain {...props} />
      <MenuBar {...props} />
    </div>
  );
});
