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
import ReloadPageLogic from "../../components/ReloadPageLogic";

class HandlerClz extends React.Component {
  state = {
    isErr: false,
    message: [],
  };
  render() {
    if (this.state.isErr && this.props.nochk != true) {
      if (this.state.isErr) {
        setTimeout(() => {
          window.tried_times++;
          if (window.tried_times < 5) {
            this.setState({
              isErr: false,
            });
          }
        }, 800);
        window.t10000 = this.state;
        return <ReloadPageLogic errmsg={_.join(this.state.message, "\n")} />;
        return (
          <div className="sys-card-wrapper">
            <Card style={{ overflow: "auto", padding: "10px" }}>
              <div
                className="consoletext"
                dangerouslySetInnerHTML={{
                  __html: _.join(
                    _.map(this.state.message, (x) => "<div>" + x + "</div>"),
                    " "
                  ),
                }}
              ></div>
            </Card>
          </div>
        );
      }
    }
    return this.props.children;
  }

  static getDerivedStateFromError(error) {
    console.log("got error", error);
    let tmparr = [];
    window.collectErrors(error, tmparr);
    return { isErr: true, message: tmparr };
  }

  componentDidCatch() {
    this.setState({
      isErr: true,
    });
  }
}

export default HandlerClz;
