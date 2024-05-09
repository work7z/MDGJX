
// Date: Sun, 8 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import TokenUtils from "./TokenUtils";

const SystemUtils = {
  logout() {
    TokenUtils.clearSystemToken();
    SystemUtils.reloadPage();
  },
  reloadPage() {
    location.reload();
  },
};

export default SystemUtils;
