
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AjaxUtils from "../utils/AjaxUtils";
import {
  AdminUserPassProp as LocalAdminUserPassProp,
  UserPassProp as LocalUserPassProp,
  UserPassCreateProp,
} from "../containers/UserAskMultipleDialogs";
import gutils from "../utils/GlobalUtils";
import { PayloadValueData } from "../types/constants";
import { Dot } from "../utils/cTranslationUtils";
import TokenUtils from "../utils/TokenUtils";
import { withPrefixOpenAPI } from "./func";

export interface UserConfig {
  Id: string;
  Username: string;
  Password: string;
  Token: string;
  CreateTime: number;
  IsAdmin: boolean;
  NewUserToken: string;
}

interface UserState {
  currentUser: UserConfig | null;
  refreshTokenStatus: number;
}

const initialState: UserState = {
  currentUser: null,
  refreshTokenStatus: 0,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateTokenStatus(state, action: PayloadAction) {
      state.refreshTokenStatus++;
    },
    updateUserObject(state, action: PayloadAction<{ userConfig: UserConfig }>) {
      state.currentUser = action.payload.userConfig;
      TokenUtils.setLocalUserId(state.currentUser.Id);
    },
  },
});

export const ACTION_signInLocalAccount = ({
  localAccountObject,
}: {
  localAccountObject: LocalUserPassProp;
}) => {
  return async (dispatch) => {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: withPrefixOpenAPI("/user/local/verify"),
      isPOST: true,
      data: localAccountObject,
    });
    if (r.error) {
      throw new Error(gutils.getErrAxiosMsg(r.error));
    } else {
      let data = r.response?.data as PayloadValueData<{ token: string }>;
      let token = data?.payload?.value?.token;
      if (gutils.empty(token)) {
        throw new Error(Dot("3umnB", "Unknown token"));
      } else {
        TokenUtils.setLocalUserToken(token);
      }
    }
  };
};

export const ACTION_createAdminAccount = ({
  localAccountObject,
}: {
  localAccountObject: LocalAdminUserPassProp;
}) => {
  return async (dispatch) => {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: withPrefixOpenAPI("/admin/init/create"),
      isPOST: true,
      data: localAccountObject,
    });
    if (r.error) {
      throw new Error(gutils.getErrAxiosMsg(r.error));
    } else {
      // r.response;
    }
  };
};

export const ACTION_createLocalAccount = ({
  localAccountObject,
}: {
  localAccountObject: UserPassCreateProp;
}) => {
  return async (dispatch) => {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: withPrefixOpenAPI("/user/local/new"),
      isPOST: true,
      data: localAccountObject,
    });
    if (r.error) {
      throw new Error(gutils.getErrAxiosMsg(r.error));
    } else {
      // r.response;
    }
  };
};

export default UserSlice;
