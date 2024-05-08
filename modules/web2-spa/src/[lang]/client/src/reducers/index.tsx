
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import testSlice from "./testSlice";
import apiSlice from "./apiSlice";
import systemSlice from "./systemSlice";
import forgeSlice from "./forgeSlice";
import routeSlice from "./routeSlice";
import statusSlice from "./statusSlice";
import ToolSlice from "./toolSlice";
import UserSlice from "./userSlice";
import DialogSlice from "./dialogSlice";
import ExtSlice from "./extSlice";
import wsSlice from "./websocketSlice";
import BigTextSlice from "./bigTextSlice";
import layoutSlice from "./layoutSlice";
import WorkspaceSlice from "./workspaceSlice";
import PreWorkSpaceSlice from "./preWorkSpace";
import onlineAPISlice from "./onlineAPISlice";
import RuntimeStatusSlice from "./runtimeStatusSlice";
import SessionSlice from "./container/sessionSlice";
import settingsSlice from "./settingsSlice";
import LocalStateSlice from "./state/localStateSlice";
import ParamStateSlice from "./state/paramStateSlice";
import memoryStateSlice from "./state/memoryStateSlice";

export default {
  settings: settingsSlice,
  session: SessionSlice,
  online: onlineAPISlice,
  preWorkspace: PreWorkSpaceSlice,
  workspace: WorkspaceSlice,
  layout: layoutSlice,
  bigtext: BigTextSlice,
  ws: wsSlice,
  ext: ExtSlice,
  user: UserSlice,
  status: statusSlice,
  runtimeStatus: RuntimeStatusSlice,
  api: apiSlice,
  system: systemSlice,
  test: testSlice,
  forge: forgeSlice,
  route: routeSlice,
  tool: ToolSlice,
  dialog: DialogSlice,
  // for settings/status
  localState: LocalStateSlice,
  paramState: ParamStateSlice,
  memoryState: memoryStateSlice,
};
