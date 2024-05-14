// LafTools
// 
// Date: Fri, 2 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash'
import { SignInCredentials } from "./apiSlice";

export class S2UserMembership {
  declare id?: number;
  declare userId: number;
  declare lifelong: number; // 1->lifelong, 0->not lifelong
  declare totalDays: number;
  declare whenToStart: Date;
  declare whenToExpire: Date;
  declare systemRemark: string;
  declare sourceType: string;
  declare createdAt: Date | null;
  declare updatedAt: Date | null;
  declare deleteAt: Date | null;
}

export type DisplayUserInfo = {
  name: string,
  email: string,
  createdAt: Date,
  proUserList: S2UserMembership[]
}

type UsersState = {
  hasSignIn: boolean;
  credentials: SignInCredentials | null
  userInfo: DisplayUserInfo | null
};
const initialState: UsersState = {
  hasSignIn: false,
  credentials: null,
  userInfo: null
};

export type PUserState = Partial<UsersState>
const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateOneOfParamState: function (state: UsersState, action: PayloadAction<PUserState>) {
      _.merge(state, action.payload)
    },
  },
});
export default UsersSlice;
