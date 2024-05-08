
// Date: Sun, 3 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { useParams } from "react-router-dom";
import _ from "lodash";
import { EachWorkSpace } from "../types/workbench-types";
import apiSlice from "../reducers/apiSlice";
import QueryUtils from "./QueryUtils";
import { Dot } from "./cTranslationUtils";
import ALL_NOCYCLE, { FN_GetDispatch } from "../nocycle";
import { URL_PREFIX_LOCAL, URL_WORKBENCH } from "../types/constants";
import AlertUtils from "./AlertUtils";
import systemSlice from "../reducers/systemSlice";
import SyncStateUtils from "./SyncStateUtils";
import exportUtils from "./ExportUtils";

export let useReadCurrentWorkspaceId = (): string => {
  return getWorkspaceIdFromPath();
};

export let getWorkspaceIdFromPath = (): string => {
  try {
    let { workspaceId = "" } = useParams() as any;
    if (workspaceId != "") {
      return workspaceId;
    }
  } catch (e) {
    // console.log(e);
  }
  // let reg = /workbench\/(\w+)/g;
  let reg = new RegExp(URL_WORKBENCH.replace("/", "") + '/(\\w+)', 'g');
  let arr = reg.exec(location.href);
  if (!arr) {
    return "";
  }
  let finalId = arr[1];
  ALL_NOCYCLE.workspaceId = finalId;
  return finalId;
};

export let useReadCurrentWorkspaceItem = (): EachWorkSpace | undefined => {
  let allWS = useWorkSpaceListGet();
  let id = useReadCurrentWorkspaceId();
  return _.find(allWS, (v) => v.Id == id);
};

export let useWorkSpaceListGet = (): EachWorkSpace[] => {
  let v1 = exportUtils.refresh_v1()
  // let workspaceListRes = apiSlice.useGetWorkspaceListByUserIdQuery({
  //   ...v1
  // }, {
  //   ...exportUtils.refresh_v2(),
  //   ...exportUtils.refresh_v2_only_for_user(),
  // });
  // let r = QueryUtils.validateResult(workspaceListRes, {
  //   label: Dot("RjCO3", "Workspace List"),
  // });
  // let allWorkspaces: EachWorkSpace[] =
  //   workspaceListRes.data?.payload?.value?.WorkSpaces || [];
  // return allWorkspaces;
  return [
  ]
};

export let setupWorkspaceData = async () => {
  await SyncStateUtils.retrieveAllIDsFromServer((item) => {
    return item.RunOnEnterWorkBench === true;
  });
};

export let pushToWorkSpace = (workspaceId: string) => {
  AlertUtils.popOK(Dot("Z7ALO", "Switched to the selected workspace"));
  ALL_NOCYCLE.history &&
    ALL_NOCYCLE.history.replace(URL_WORKBENCH + "/" + workspaceId);
  setTimeout(() => {
    setupWorkspaceData();
    FN_GetDispatch()(systemSlice.actions.updateIsWorkBenchPageAvailable(false));
  }, 0);
};
