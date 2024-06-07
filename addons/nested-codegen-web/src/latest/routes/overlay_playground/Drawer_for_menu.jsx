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
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";

import { Provider, observer, inject, useLocalStore } from "mobx-react";
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
import AlertForStaticDelete from "../alert_for_static_delete/index";
import AlertForProxyDelete from "../alert_for_proxy_delete/index";
import OverlayForAddStaticServer from "../overlay_for_add_static_server/index";
import OverlayForAddProxyServer from "../overlay_for_add_proxy_server/index";
import Overlay_for_add_proxy_rule from "../overlay_for_add_proxy_rule";
import Overlay_for_add_proxy_rule_path_rewrite from "../overlay_for_add_proxy_rule_path_rewrite";
import Drawer_for_settings from "../drawer_for_settings";
import Overlay_for_user_panel from "../overlay_for_user_panel/index";
import Overlay_for_user_info_login from "../overlay_for_user_info_login/index";
import Overlay_for_add_new_conn from "../overlay_for_add_new_conn/index";
import Overlay_for_add_new_folder from "../overlay_for_add_new_folder/index";
import Overlay_for_alertaction from "../overlay_for_alertaction";
import Overlay_for_add_new_local_project from "../overlay_for_add_new_local_project";
import Overlay_for_conn_recent_scripts from "../overlay_for_conn_recent_scripts";
import Overlay_for_update_tab_name from "../overlay_for_update_tab_name";
import Overlay_for_create_workspace from "../overlay_for_create_workspace";
import Overlay_for_manage_workspace from "../overlay_for_manage_workspace";
import Overlay_for_enter_private_key from "../overlay_for_enter_private_key";
import Overlay_for_rollback_version from "../overlay_for_rollback_version";
import MainFrameLeft from "../main_menu_frame_left";

const Drawer_for_menu = observer(() => {
  let lc_st = useLocalStore(() => {
    return {
      shouldViewTree: false,
    };
  });
  window.lc_st100 = lc_st;
  useEffect(() => {
    let a = reaction(
      () => {
        return {
          a: gstore.show_left_menu_obj.isOpen,
        };
      },
      () => {
        if (gstore.show_left_menu_obj.isOpen) {
          setTimeout(() => {
            lc_st.shouldViewTree = true;
          }, 50);
        } else {
          // lc_st.shouldViewTree = false;
        }
      }
    );
    return () => {};
  }, []);
  // let m1 = React.useMemo(() => {
  //   return ;
  // }, []);

  return (
    <Drawer
      isOpen={
        gstore.show_left_menu_obj.isOpen &&
        gstore.localSettings.app_multiple_tab_mode
      }
      position={"left"}
      lazy={false}
      canEscapeKeyClose={true}
      size={"280px"}
      icon="menu"
      canOutsideClickClose={true}
      hasBackdrop={true}
      usePortal={true}
      autoFocus={true}
      onClose={() => {
        gstore.show_left_menu_obj.isOpen = false;
      }}
      transitionDuration={0}
      title={t(`Switch Function`)}
    >
      {!(
        gstore.show_left_menu_obj.isOpen &&
        gstore.localSettings.app_multiple_tab_mode
      ) ? (
        "Exited"
      ) : false && !lc_st.shouldViewTree ? (
        "Loading..."
      ) : (
        <MainFrameLeft mtag={ScrollMemWrapper}></MainFrameLeft>
      )}
    </Drawer>
  );
});

export default Drawer_for_menu;
