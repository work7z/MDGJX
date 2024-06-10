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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import _ from "lodash";

const contentSizing = {
  popoverProps: { popoverClassName: Popover2Classes.POPOVER2_CONTENT_SIZING },
};

export default observer((props) => {
  const [crtExpandArrIdx, onCrtExpandArrIdxChange] = useState([]);
  const [refm, onRefM] = useState(0);

  const { nodes = [] } = props;
  let hist = useHistory();

  let nodeClick = (x, path, e) => {
    if (!_.isEmpty(x.rawobj.children)) {
    } else {
      let goPath = x.rawobj.pathname;
      if (e && e.metaKey) {
        window.open(gutils.wrapLink(goPath));
      } else {
        hist.push(goPath);
      }
    }
    gstore.localSettings.using_desktop_mode = false;
  };

  const latestRoutePath = gstore.sysinfo.latestRoutePath;
  let str_a =
    hist.location.pathname +
    (hist.location.search == null ||
    _.startsWith(hist.location.search, "?token=")
      ? ""
      : hist.location.search);
  let formattingFunc = (nodesArr = [], len = 0, hist, tmpCache = {}) => {
    return _.chain(nodesArr)
      .map((x) => {
        len++;
        const haschild = !_.isEmpty(x.children);
        if (_.isNil(latestRoutePath)) {
          setTimeout(() => {
            gstore.sysinfo.latestRoutePath = str_a;
          }, 0);
        }
        let crtobj = {
          rawobj: x,
          title: x.label,
          id: len,
          title: t(
            `Press the {0} Key and Click Item will open a tab window for you`,
            `Meta/Option`
          ),
          icon: x.icon ? x.icon : haschild ? "folder-close" : "application",
          isExpanded: !crtExpandArrIdx[x.id],
          isSelected: latestRoutePath != null && x.pathname == latestRoutePath,
          hasCaret: haschild,
          label: x.label || (
            <Tooltip2 content={x.desc} placement="right">
              {x.label}
            </Tooltip2>
          ),
          childNodes: formattingFunc(x.children, len + 1, hist),
        };
        return crtobj;
      })
      .thru((arr) => {
        // console.log("chking item for arr", arr);
        if (props.need_filter && props.fn_filter) {
          return _.filter(arr, (x, d, n) => {
            return props.fn_filter(x, d, n);
          });
        } else {
          return arr;
        }
      })
      .value();
  };
  let cacheArr = [
    nodes,
    "" + str_a + 1,
    props.need_filter,
    gstore.settings.filter_for_left_menu_search_bar,
    JSON.stringify(crtExpandArrIdx),
  ];
  let formattedNodes = React.useMemo(() => {
    return formattingFunc(nodes, 1, hist);
  }, cacheArr);
  if (props.fn_finalFilter && props.need_filter) {
    formattedNodes = _.get(
      props.fn_finalFilter([
        {
          childNodes: formattedNodes,
        },
      ]),
      "0.childNodes"
    );
  }

  let fn_col = (x, path, e) => {
    console.log("rawobj", x);
    crtExpandArrIdx[x.rawobj.id] = true;
    onCrtExpandArrIdxChange({
      ...crtExpandArrIdx,
    });
    onRefM(Math.random());
    // x.rawobj.expand = false;
  };
  let fn_exp = (x) => {
    crtExpandArrIdx[x.rawobj.id] = false;
    onCrtExpandArrIdxChange({
      ...crtExpandArrIdx,
    });
    console.log("rawobj", x, crtExpandArrIdx);
    onRefM(Math.random());
    // x.rawobj.expand = true;
  };
  return (
    <Tree
      mmmkey={refm}
      contents={formattedNodes}
      onNodeClick={(x, path, e) => {
        if (!_.isEmpty(x.rawobj.children)) {
          if (crtExpandArrIdx[x.rawobj.id] == true) {
            fn_exp(x);
          } else {
            fn_col(x, path, e);
          }
        }
        nodeClick(x, path, e);
      }}
      onNodeCollapse={fn_col}
      onNodeExpand={fn_exp}
      className={Classes.ELEVATION_0}
    />
  );
});
