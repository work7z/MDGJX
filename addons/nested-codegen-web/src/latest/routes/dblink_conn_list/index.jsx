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
  MenuDivider,
  NonIdealState,
  NavbarDivider,
  ContextMenuTarget,
  NavbarGroup,
  Menu,
  MenuItem,
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
import React from "react";
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
import GTree from "../../components/GTree/index.jsx";

export default observer(() => {
  const showContextMenuForBody = (e) => {
    // must prevent default to cancel parent's context menu
    gutils.stop_e(e);
    // gutils.stop_e(e);
    // invoke static API, getting coordinates from mouse event
    // eslint-disable-next-line deprecation/deprecation
    if (window.ackByTree) {
      window.ackByTree = false;
      return;
    }
    if (true) {
      // return;
    }
    ContextMenu.show(
      <Menu>
        <MenuItem
          onClick={() => {
            gutils.api.dblink.create_folder();
          }}
          icon="folder-new"
          text={t("Create Folder")}
        />
        <MenuItem
          onClick={() => {
            gutils.api.dblink.create_connection();
          }}
          icon="add-to-artifact"
          text={t("Create Connection")}
        />
        <MenuDivider />
        {/* <MenuItem
          onClick={() => {
            gutils.api.dblink.openAllConnections();
          }}
          icon="data-connection"
          text={t("Open All Connections")}
        />
        <MenuItem
          onClick={() => {
            gutils.api.dblink.closeAllConnections();
          }}
          icon="remove-column-left"
          text={t("Close All Connections")}
        />
        <MenuDivider /> */}
        <MenuItem
          onClick={() => {
            gutils.api.dblink.refresh();
          }}
          icon="refresh"
          text={t("Refresh")}
        />
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => {}
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="db_conn_project_title">
        <span>{t("Connections")}</span>
        <span>
          <Button
            outlined={true}
            minimal={true}
            small={true}
            icon="minus"
            onClick={() => {
              gutils.confirmIfNotClickOk(
                "minus-ds-panel",
                "If you want to show this panel again, please find related controls in editor's menu on the right",
                () => {
                  gstore.localSettings.isShowDataSourceLeftPanel = false;
                }
              );
            }}
            className="noborder"
          ></Button>
        </span>
      </div>
      <div
        className="db_conn_project_body"
        onContextMenu={showContextMenuForBody}
      >
        <div>
          <GTree
            onDbClick={(node, { cancelSelectAll }) => {
              if (node.isLeaf == true) {
                // // console.log("double click", node);
                gutils.api.dblink.openNewEditor(node.meta.ID);
                // gutils.defer(() => {
                //   onSltKeys([]);
                // });
                gutils.defer(() => {
                  cancelSelectAll();
                });
              }
            }}
            chgfunc={() => {
              gutils.defer(() => {
                gutils.api.dblink.saveTreeAndRefreshIt(false);
              });
            }}
            unikey="db_conn_tree"
            onRightClick={({ event, node }) => {
              const e = event;
              // // console.log("right click menu", event, node);
              window.ackByTree = true;
              // open context menu
              // must prevent default to cancel parent's context menu
              // gutils.stop_e(e);;
              // invoke static API, getting coordinates from mouse event
              // eslint-disable-next-line deprecation/deprecation
              const isFolder = node.isLeaf == false;
              const crtTree = gstore.databaseAllData.data.connectionList.tree;

              function nextChildren(arr) {
                return _.map(
                  _.filter(arr, (x) => x.isLeaf != true),
                  (x, d, n) => {
                    let myval = nextChildren(x.children || []);
                    if (_.isEmpty(myval)) {
                      myval = [];
                    }
                    myval = [
                      <MenuItem
                        onClick={() => {
                          // // console.log("move the item to root");
                          gutils.api.dblink.menu_moveto(node, x.key);
                        }}
                        icon="folder-close"
                        text={t("<Folder Root>")}
                      ></MenuItem>,
                      ...myval,
                    ];
                    let commonProps = {
                      key: x.key,
                      onClick() {
                        // // console.log("move the item to", x.key);
                        gutils.api.dblink.menu_moveto(node, x.key);
                      },
                      icon: "folder-close",
                      text: x.title,
                    };
                    return _.isEmpty(myval) ? (
                      <MenuItem {...commonProps}></MenuItem>
                    ) : (
                      <MenuItem {...commonProps}>{myval}</MenuItem>
                    );
                  }
                );
              }
              let crtChildren = nextChildren(crtTree);
              crtChildren = [
                <MenuItem
                  onClick={() => {
                    // // console.log("move the item to root");
                    gutils.api.dblink.menu_moveto(node, null);
                  }}
                  icon="folder-close"
                  text={t("<Root>")}
                ></MenuItem>,
                ...crtChildren,
              ];
              let menu_moveto = (
                <MenuItem icon="share" text={t("Move to")}>
                  {crtChildren}
                </MenuItem>
              );
              if (isFolder) {
                ContextMenu.show(
                  <Menu>
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.create_folder(node);
                      }}
                      icon="folder-new"
                      text={t(`Create Folder`)}
                    />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.create_connection(node);
                      }}
                      icon="add-to-artifact"
                      text={t("Create Connection")}
                    />
                    <MenuItem icon="annotation" text={t("Edit")}>
                      {/* <MenuItem
                        onClick={() => {
                          gutils.api.dblink.rename_folder(node);
                        }}
                        icon="array"
                        text="Name"
                      /> */}
                      <MenuItem
                        onClick={() => {
                          gutils.api.dblink.create_folder(null, node);
                        }}
                        icon="cog"
                        text={t("Folder Info")}
                      />
                    </MenuItem>
                    {menu_moveto}
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.duplicate_folder(node);
                      }}
                      icon="duplicate"
                      text={t("Duplicate Folder")}
                    />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.delete_folder(node);
                      }}
                      intent="danger"
                      icon="remove-column-left"
                      text={t("Delete Folder")}
                    />
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.refresh();
                      }}
                      icon="refresh"
                      text={t("Refresh")}
                    />
                  </Menu>,
                  { left: e.clientX, top: e.clientY },
                  () => {}
                );
              } else {
                const isConn = node.meta.IS_CONNECTION;
                ContextMenu.show(
                  <Menu>
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.connectAllConnByNodeId(
                          node.meta.ID,
                          node
                        );
                      }}
                      intent={"none"}
                      icon={"th"}
                      text={t("Connect")}
                      disabled={isConn}
                    />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.reConnectionAllConnByNodeId(
                          node.meta.ID,
                          node
                        );
                      }}
                      intent={"none"}
                      icon={"th-derived"}
                      text={t("Reconnection")}
                      disabled={!isConn}
                    />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.destroyAllConnByNodeId(
                          node.meta.ID,
                          node
                        );
                      }}
                      intent={"danger"}
                      icon={"th-disconnect"}
                      text={t("Disconnect")}
                      disabled={!isConn}
                    />
                    <MenuDivider />
                    <MenuItem icon="panel-table" text={t("SQL Editor")}>
                      <MenuItem
                        onClick={() => {
                          gutils.api.dblink.openNewEditor(node.meta.ID);
                          //  await myapi.openNewEditor(connID);
                        }}
                        icon="document"
                        text={t("New Script")}
                      />
                      <MenuItem
                        onClick={() => {
                          gutils.api.dblink.open_recent_scripts(node);
                        }}
                        icon="history"
                        text={t("Recent Scripts")}
                      />
                    </MenuItem>
                    <MenuItem icon="annotation" text={t("Edit")}>
                      {/* <MenuItem
                        onClick={() => {
                          gutils.api.dblink.edit_name(node);
                        }}
                        icon="array"
                        text="Name"
                      /> */}
                      <MenuItem
                        onClick={() => {
                          gutils.api.dblink.create_connection(null, node);
                        }}
                        icon="cog"
                        text={t("Config")}
                      />
                    </MenuItem>
                    {menu_moveto}
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.duplicate_connection(node);
                      }}
                      icon="duplicate"
                      text={t("Duplicate Connection")}
                    />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.delete_connection(node);
                      }}
                      intent="danger"
                      icon="remove-column-left"
                      text={t("Delete Connection")}
                    />
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        gutils.api.dblink.refresh();
                      }}
                      icon="refresh"
                      text={t("Refresh")}
                    />
                  </Menu>,
                  { left: e.clientX, top: e.clientY },
                  () => {}
                );
              }
            }}
            obj={gstore.databaseAllData.data.connectionList}
            index="tree"
          />
        </div>
      </div>
      <div className="db_conn_project_foot doflex">
        <div>
          <Button
            onClick={() => {
              gutils.api.dblink.create_folder();
            }}
            icon="folder-new"
            minimal={true}
          ></Button>
          <Button
            onClick={() => {
              gutils.api.dblink.create_connection();
            }}
            icon="add-to-artifact"
            minimal={true}
          ></Button>
        </div>
        <div>
          <Button
            onClick={() => {
              gutils.api.dblink.refresh();
            }}
            icon="refresh"
            loading={gstore.databaseAllData.data.loadingTree}
            minimal={true}
          ></Button>
        </div>
      </div>
    </div>
  );
});
