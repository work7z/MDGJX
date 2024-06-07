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
  Menu,
  MenuItem,
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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import { Select } from "@blueprintjs/select";
import _ from "lodash";
import GButton from "../GButton";

export default observer((props) => {
  let autoFirst = props.autoFirst == true;
  const value = props.obj[props.index];
  const chgFunc = (val) => {
    props.obj[props.index] = val;
    if (props.whenChg) {
      props.whenChg(val);
    }
  };
  let list = props.list;
  if (autoFirst) {
    // debugger;
    if (
      (_.isNil(value) && !_.isEmpty(list)) ||
      (_.chain(list)
        .filter((x) => x.value == value)
        .size()
        .value() == 0 &&
        !_.isEmpty(list))
    ) {
      gutils.defer(() => {
        chgFunc[props.defaultValue || list[0].value];
      });
    }
  }
  if (_.isEmpty(list)) {
    // list = [
    //   {
    //     label: "Loading...",
    //     value: -1,
    //   },
    // ];
  }

  const crtViewLabel =
    props.view_label ||
    _.chain(list)
      .find((x) => x.value == value)
      .get("label")
      .value();
  function escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  function highlightText(text = "", query) {
    let lastIndex = 0;
    const words = query
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map(escapeRegExpChars);
    if (words.length === 0) {
      return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens = [];
    while (true) {
      const match = regexp.exec(text);
      if (!match) {
        break;
      }
      const length = match[0].length;
      const before = text.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
        tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(
        <span style={{ background: "yellow", color: "black" }} key={lastIndex}>
          {match[0]}
        </span>
      );
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
      tokens.push(rest);
    }
    return tokens;
  }

  const renderMenu = ({ items, itemsParentRef, query, renderItem }) => {
    const renderedItems = items.map(renderItem).filter((item) => item != null);
    return (
      <Menu ulRef={itemsParentRef}>
        <MenuItem
          disabled={true}
          text={t(
            `Found {0} items matching "{1}"`,
            renderedItems.length,
            query
          )}
        />
        {renderedItems}
      </Menu>
    );
  };

  return (
    <Select
      className="g-miniselect"
      // itemListRenderer={renderMenu}
      popoverProps={{
        minimal: false,
        className: "my-popover-mini",
      }}
      items={list || []}
      itemPredicate={(querystr, item, index) => {
        if (_.isNil(item.label) || !_.isString(item.label)) {
          return false;
        }
        return (
          item.label.toLowerCase().indexOf(querystr.toLowerCase()) != -1 ||
          item.label
            .toLowerCase()
            .replaceAll(/\W/g, "")
            .indexOf(querystr.toLowerCase()) != -1
        );
      }}
      itemRenderer={(x, { handleClick, modifiers, query }) => {
        const item = x;
        return (
          <MenuItem
            active={x.value == value}
            disabled={false}
            label={item.desc_label || item.label}
            key={item.value}
            onClick={handleClick}
            text={highlightText(item.label, query)}
          />
        );
      }}
      noResults={<MenuItem disabled={true} text={t("No results.")} />}
      onItemSelect={(item) => {
        // // console.log("item select");
        chgFunc(item.value);
      }}
    >
      <GButton
        intent={props.intent}
        loading={props.loading}
        small={props.small}
        style={{
          maxWidth: "380px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...(props.btn_style || {}),
        }}
        icon={props.icon}
        text={crtViewLabel || t("Click here to select")}
        rightIcon="double-caret-vertical"
      />
    </Select>
  );
});
