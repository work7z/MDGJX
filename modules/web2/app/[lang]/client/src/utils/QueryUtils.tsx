
// Date: Thu, 5 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { logutils } from "./LogUtils";
import {
  createApi,
  fetchBaseQuery,
  TypedUseQueryHookResult,
  TypedUseQueryStateResult,
  TypedUseQuerySubscriptionResult,
  TypedUseMutationResult,
} from "@reduxjs/toolkit/query/react";
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
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
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

import _ from "lodash";
import { Dot } from "./cTranslationUtils";
import gutils from "./GlobalUtils";
import AlertUtils from "./AlertUtils";
import { getAjaxResPayloadValue as getAjaxValueResInner } from "../nocycle";



export let getAjaxValueRes = getAjaxValueResInner;
const QueryUtils = {
  getDoAjaxValueRes: getAjaxValueResInner,
  validateResult: (
    res_toolCategory: TypedUseQueryHookResult<any, any, any>,
    options: { label: string; onlyErr?: boolean }
  ): React.JSX.Element | undefined => {
    let errObj = _.get(res_toolCategory, "data.errors");
    if (res_toolCategory.isFetching && !options.onlyErr) {
      return (
        <div className="p-2">
          {Dot("aHAfR", "Fetching data for {0}...", options.label)}
        </div>
        // <NonIdealState
        //   className="whitespace-break-spaces"
        //   title={}
        // ></NonIdealState>
      );
    } else if (res_toolCategory.isError) {
      return (
        <NonIdealState
          className="whitespace-break-spaces"
          title={Dot(
            "YQN9u",
            "An Error occurred while loading {0}, please check below detail.",
            options.label
          )}
          description={
            `[${res_toolCategory.status}] ` +
            gutils.getWebErrMsg(res_toolCategory.error)
          }
          action={
            <Button
              onClick={() => {
                res_toolCategory.refetch();
                AlertUtils.popMsg("success", {
                  message: Dot("jPNCb", "Retried."),
                });
              }}
            >
              {Dot("ySVf-", "Re-try this Request")}
            </Button>
          }
        ></NonIdealState>
      );
    }
    return undefined;
  },
};
export default QueryUtils;
