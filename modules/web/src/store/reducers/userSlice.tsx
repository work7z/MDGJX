// LafTools
// 
// Date: Fri, 2 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash'

export type UserCredential = {
  avatar: string;
  name: string
}

type UsersState = {
  signIn: boolean,
  m: boolean,
  credential?: UserCredential
};
const initialState: UsersState = {
  m: false,
  signIn: false,
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
