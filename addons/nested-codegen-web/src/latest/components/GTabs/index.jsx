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
  Popover,
  ContextMenu,
  NumericInput,
  FormGroup,
  Menu,
  MenuDivider,
  MenuItem,
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
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useRef, cloneElement, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState, useEffect } from "react";

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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import Tabs, { TabPane } from "rc-tabs";
import "./rc-tabs.less";
import { Resizable } from "re-resizable";
import _ from "lodash";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import GButton from "../GButton";
import Blink from "../Blink";

const type = "DraggableTabNode";

const DraggableTabNode = ({ index, children, moveNode }) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: "rc-dropping",
      };
    },
    drop: (item) => {
      moveNode(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <div ref={ref} className={isOver ? dropClassName : ""}>
      {children}
    </div>
  );
};

class DraggableTabs extends React.Component {
  state = {
    order: [],
  };

  moveTabNode = (dragKey, hoverKey) => {
    const newOrder = this.state.order.slice();
    const { children } = this.props;

    React.Children.forEach(children, (c) => {
      if (newOrder.indexOf(c.key) === -1) {
        newOrder.push(c.key);
      }
    });

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);

    this.setState({
      order: newOrder,
    });
  };

  // renderTabBar

  render() {
    const { order } = this.state;
    const { children } = this.props;

    const tabs = [];
    React.Children.forEach(children, (c) => {
      tabs.push(c);
    });

    const orderTabs = tabs.slice().sort((a, b) => {
      const orderA = order.indexOf(a.key);
      const orderB = order.indexOf(b.key);

      if (orderA !== -1 && orderB !== -1) {
        return orderA - orderB;
      }
      if (orderA !== -1) {
        return -1;
      }
      if (orderB !== -1) {
        return 1;
      }

      const ia = tabs.indexOf(a);
      const ib = tabs.indexOf(b);

      return ia - ib;
    });
    return (
      <Tabs
        destroyInactiveTabPane={true}
        renderTabBar={(props, DefaultTabBar) => {
          return (
            <div
              className={
                "total-gtabs-box " +
                (this.props.noOptBtn ? " no-opt-btn " : "") +
                (this.props.small ? " my-small-gtab-wrapper " : "")
              }
            >
              <div className="main-left-gtabs-box">
                <DefaultTabBar {...props}>
                  {(node) => (
                    <DraggableTabNode
                      key={node.key}
                      index={node.key}
                      moveNode={this.moveTabNode}
                      closable={node.closable}
                    >
                      {node}
                    </DraggableTabNode>
                  )}
                </DefaultTabBar>
                <div class="right-control-bar">
                  {true ? (
                    <Popover
                      minimal={true}
                      // placement={"bottom"}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
                      portalClassName="mypopoverbtn"
                      enforceFocus={true}
                      placement="bottom-end"
                    >
                      <GButton
                        icon="cog"
                        small={true}
                        minimal={true}
                        outlined={false}
                      />
                      <div>
                        <Menu className={Classes.ELEVATION_1}>
                          <MenuDivider title={t("Editors")} />
                          <MenuItem
                            icon="remove-column-left"
                            text={t("Close Tab")}
                            onClick={() => {
                              this.props.closeCrt();
                            }}
                          />
                          <MenuItem
                            icon="remove-row-bottom"
                            text={t("Close All Tabs")}
                            onClick={() => {
                              this.props.closeAll();
                            }}
                          />
                          {this.props.otherFuncJSX
                            ? this.props.otherFuncJSX
                            : ""}
                          {/* <MenuDivider title="Other" />
                            <MenuItem icon="cut" text="Close Editor" onClick={() => {}} />
                            <MenuItem
                              icon="cut"
                              text="Close All Editor"
                              onClick={() => {}}
                            /> */}
                        </Menu>
                      </div>
                    </Popover>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        }}
        {...this.props}
      >
        {orderTabs}
      </Tabs>
    );
  }
}

export default observer((props) => {
  if (_.isNil(props.obj) || _.isEmpty(props.obj)) {
    return (
      <div>
        {t("Loading")}
        <Blink />
      </div>
    );
  }
  let value = props.obj.value;
  let list = props.obj.list;
  let [myid] = useState(_.uniqueId("myid"));

  let [preval, onPreval] = useState(value);

  if (!_.isEmpty(props.obj.list)) {
    let isNotFound = _.findIndex(props.obj.list, (x) => x.id == value) == -1;
    if (isNotFound) {
      value = _.get(list, "0.id");
    }
  }

  useEffect(() => {
    if (!_.isEmpty(props.obj.list)) {
      let isNotFound = _.findIndex(props.obj.list, (x) => x.id == value) == -1;
      if (isNotFound) {
        gutils.defer(() => {
          let firstVal = _.get(props.obj.list, "0.id");
          onPreval(firstVal);
          props.obj.value = firstVal;
        });
      }
    }
  }, [value, _.size(list)]);

  if (preval != value) {
    gutils.defer(() => {
      onPreval(value);
    });
  }

  useEffect(() => {
    gutils.defer(() => {
      // debugger;
      console.log("updating the temp value", preval);
      if (props.noAllowAutoAdjust) {
        return;
      }
      // gutils.callWhenResize();
    });
  }, [preval]);

  const onEditFunc = async function (type, info) {
    // console.log("onEditFunc", type, info);
    if (props.onEditFunc) {
      await props.onEditFunc(type, info);
    } else {
      let preVal = props.obj.value;
      await gutils.onEditForTab(type, info, {
        list: props.obj.list,
        crtvalue: props.obj.value,
        props,
        onRemove: props.onRemove,
        setValue(val) {
          props.obj.value = val;
        },
        setList(val) {
          props.obj.list = val;
        },
      });
      if (props.onChangeTab && preVal != props.obj.value) {
        props.onChangeTab(props.obj.value);
      }
    }
  };

  const closeAllFunc = async function () {
    // const tmplist = _.map(list, (x) => ({ id: x.id }));
    // for (let item of tmplist) {
    // }
    if (props.closeAll) {
      await props.closeAll();
    }
    props.obj.list = (props.init_config || {}).fn_init_list
      ? _.cloneDeep((props.init_config || {}).fn_init_list)
      : [];
    props.obj.value = (props.init_config || {}).fn_init_value
      ? (props.init_config || {}).fn_init_value
      : null;
    if (props.onChangeTab) {
      props.onChangeTab(props.obj.value);
    }
  };

  useEffect(() => {
    let myfuncForListen = (e) => {
      let myrandid = "focus_key_tabs_" + props.mapid;
      // console.log("keydown listening" + myrandid, e);
      if (
        gutils.isCloseAllAction(e) &&
        window[gutils.global_panel_db_page_focus] == props.mapid
      ) {
        closeAllFunc();
      } else if (
        gutils.isCloseAction(e) &&
        window[gutils.global_panel_db_page_focus] == props.mapid
      ) {
        onEditFunc("remove", { key: props.obj.value });
      }
    };
    gutils.keyDownListenObj[props.mapid] = myfuncForListen;
    return () => {
      delete gutils.keyDownListenObj[props.mapid];
    };
  }, []);

  useEffect(() => {
    // let a = reaction(
    //   () => {
    //     return {
    //       ...props.obj,
    //     };
    //   },
    //   () => {
    //     if (props.onChangeTab) {
    //       props.onChangeTab(props.obj.value);
    //     }
    //   }
    // );
    return () => {};
  }, []);

  const [tabContentHeight, onCrtTabContentHeight] = useState(0);

  function resizeNow($e) {}

  useEffect(() => {
    gutils.anyResizeTriggerArr["tabchg" + myid] = () => {
      resizeNow($("#" + myid));
    };
    gutils.keyDownListenObj[props.mapid] = (e) => {
      let crtpagefocusid = gutils.global_panel_db_page_focus;
      let crtPageFocusID = window[crtpagefocusid];
      console.log("user trigger key now", e);
      if (crtPageFocusID == props.mapid) {
        const obj = props.obj;
        gutils.scrollObjByE(obj, e);

        const isExecCtrl = (e) => e.ctrlKey || e.metaKey;
        if (isExecCtrl(e)) {
          console.log(
            "what code you are pressing",
            e.key,
            e.code,
            props.onSave
          );
          if (e.key == "s") {
            if (props.onSave) {
              props.onSave();
            }
          }
          if (e.key == "Enter") {
            const queryStr = window.getCrtDBLinkEditorSelectedText();
            let isExecType = e.altKey;
            console.log("user wants to trigger enter");
          }
        }
        if (gutils.isCloseAction(e)) {
        }
        if (e.ctrlKey) {
          if (e.key == "Enter") {
          }
        }
      }
    };
    return () => {
      delete gutils.anyResizeTriggerArr["tabchg" + myid];
      delete gutils.keyDownListenObj[props.mapid];
    };
  }, []);

  let allListInMemo = useMemo(() => {
    console.log("updating memo");
    return _.map(props.obj.list, (x, d, n) => {
      let RenderObjJsx = observer((propsxx) => props.renderTabPane(x, d, n));
      return <RenderObjJsx />;
    });
  }, [
    _.size(props.obj.list) +
      _.join(
        _.map(props.obj.list, (x) => x.id),
        ","
      ),
  ]);
  let cref = useRef({
    e: null,
  });
  function initEventForRcTabs() {
    if (props.hoverChange !== true) {
      return;
    }
    $(cref.current.e)
      .find(".rc-tabs-tab-btn")
      .off("mousemove")
      .on("mousemove", function (e) {
        let label = $(this).text().trim();
        let item = _.find(props.obj.list, (x) => x.label == label);
        if (!_.isNil(item)) {
          console.log("mouse moving now");
          props.obj.value = item.id;
          console.log("chaging value", item.id);
          // props.onChange(e);
          if (props.onChangeTab) {
            props.onChangeTab(item.id);
          }
        }
      });
  }
  useEffect(() => {
    if (!props.hoverChange) {
      return () => {};
    }
    let a = reaction(
      () => {
        return {
          n: _.get(props, "obj.list"),
        };
      },
      () => {
        gutils.defer(() => {
          initEventForRcTabs();
        }, 50);
      }
    );
    return () => {
      a();
    };
  }, []);
  return (
    <div
      key={myid}
      id={myid}
      class={"gtabs-root-box" + ` ${props.tabClz}`}
      style={{
        borderTop: props.borderTop
          ? "1px solid var(--app-border-gray-f3)"
          : null,
      }}
      onClick={(e) => {
        // let $dbAllCtnId = $("#" + myid);
        // let getFuncNow = $(e.target)
        //   .parents()
        //   .filter((a, b) => b == $dbAllCtnId[0]);
        // console.log("getFuncNow", getFuncNow);
        // let crtpagefocusid = gutils.global_panel_db_page_focus;
        // window[crtpagefocusid] = props.mapid || "none";
      }}
      onKeyDown={(e) => {}}
      ref={(e) => {
        if (e != null) {
          resizeNow($(e));
          cref.current.e = e;
          setTimeout(() => {
            initEventForRcTabs();
          }, 0);
        }
        // if (props.hoverChange) {
        //   setTimeout(() => {
        //     //
        //   }, 500);
        // }
      }}
    >
      <DraggableTabs
        animated={false}
        noOptBtn={props.noOptBtn}
        small={(true && props.large != true) || props.small}
        editable={{
          showAdd: false,
          onEdit: onEditFunc,
        }}
        activeKey={_.isEmpty(list) ? "mydft_system_root" : value}
        moreIcon={""}
        onChange={(e) => {
          props.obj.value = e;
          console.log("chaging value", e);
          // props.onChange(e);
          if (props.onChangeTab) {
            props.onChangeTab(e);
          }
        }}
        otherFuncJSX={props.otherFuncJSX}
        closeCrt={() => {
          onEditFunc("remove", { key: props.obj.value });
        }}
        closeAll={() => {
          closeAllFunc();
        }}
      >
        {_.isEmpty(list) ? (
          <TabPane
            closable={false}
            key="mydft_system_root"
            tab={props.defaultViewTitle || "Overview"}
            // style={{ borderBottom: "1px solid var()" }}
          >
            {props.defaultViewJsx || <div>{t("Default Page")}</div>}
          </TabPane>
        ) : (
          ""
        )}
        {_.map([...list], (x, d, n) => {
          return (
            <TabPane
              closable={x.closable}
              tab={
                (props.needTranslateEachLabelName || x.needTranslate
                  ? t(x.label)
                  : x.label) + (x.unsave && false ? " *" : "")
              }
              onMouseEnter={(e) => {
                console.log("entering the mouse");
              }}
              key={x.id}
              style={{ ...(x.style || {}) }}
            >
              {_.get(allListInMemo, d)}
            </TabPane>
          );
        })}
      </DraggableTabs>
    </div>
  );
});
