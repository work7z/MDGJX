
// Date: Sun, 8 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import UserSlice from "../reducers/userSlice";
import ALL_NOCYCLE from "../nocycle";
const SYSTEM_INIT_TOKEN_LOCAL_KEY = "LOCAL_KEY_SYSTEM_INIT";
const USER_TOKEN_LOCAL_KEY = "LOCAL_KEY_USER_TOKEN";
const USER_TOKEN_LOCAL_ID = "LOCAL_KEY_USER_ID";

const TokenUtils = {
  cleanAndSignOut() {
    localStorage.clear()
    location.reload() // TODO: other way is to use history.push('/login')
  },
  // system
  getSystemInitToken() {
    // if (typeof localStorage == 'undefined') { return }

    // return localStorage.getItem(SYSTEM_INIT_TOKEN_LOCAL_KEY);
    return ''
  },
  clearSystemToken() {
    // if (typeof localStorage == 'undefined') { return }

    // localStorage.removeItem(SYSTEM_INIT_TOKEN_LOCAL_KEY);
  },
  setSystemInitToken(str: string) {
    // if (typeof localStorage == 'undefined') { return }

    // localStorage.setItem(SYSTEM_INIT_TOKEN_LOCAL_KEY, str);
  },
  // local
  getLocalUserToken() {
    // if (typeof localStorage == 'undefined') { return }

    // return localStorage.getItem(USER_TOKEN_LOCAL_KEY);
    return ''

  },
  clearLocalUserToken() {
    // if (typeof localStorage == 'undefined') { return }
    // localStorage.removeItem(USER_TOKEN_LOCAL_KEY);
  },
  setLocalUserToken(str: string) {
    // if (typeof localStorage == 'undefined') { return }

    // localStorage.setItem(USER_TOKEN_LOCAL_KEY, str);
    // setTimeout(() => {
    //   ALL_NOCYCLE.store?.dispatch(UserSlice.actions.updateTokenStatus());
    // });
  },
  // write similar as above for local user id
  // write for USER_TOKEN_LOCAL_ID
  getLocalUserId() {
    // return localStorage.getItem(USER_TOKEN_LOCAL_ID);
    return ''
  },
  clearLocalUserId() {
    // localStorage.removeItem(USER_TOKEN_LOCAL_ID);w
  },
  setLocalUserId(str: string) {
    // localStorage.setItem(USER_TOKEN_LOCAL_ID, str);
    return ''

  },
  // getLocalUserId(): string | undefined {
  //   let st = ALL_NOCYCLE.store?.getState();
  //   return st?.user?.currentUser?.Id;
  // },
  getLocalUserName(): string | undefined {
    // let st = ALL_NOCYCLE.store?.getState();
    // return st?.user?.currentUser?.Username;
    return ''
  },
};

// verify if its token mode
// setTimeout(() => {
//   let b = window.location.href.match(/t=([A-Za-z0-9]+)/);
//   if (!_.isNil(b) && b && b[1]) {
//     let systemToken = _.trim(b[1]);
//     let hasEntry = window.location.href.indexOf("/app/entry") != -1;
//     if (hasEntry && systemToken) {
//       TokenUtils.setSystemInitToken(systemToken);
//     }
//   }
// });
export default TokenUtils;
