
// Date: Tue, 3 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import gutils from "./GlobalUtils";
import staticDevJson from "../static/dev.json";
import { useHistory, useParams } from "react-router";
import PageUtils from "./PageUtils";

const RouteUtils = {
  hist_ref: null,
  useHistory: useHistory,
  usePathVariablesList: () => {
    let hist = RouteUtils.useHistory();
    RouteUtils.hist_ref = hist as any;
    return hist.location;
  },
  getHistoryByHistRefDirect(): ReturnType<typeof useHistory> {
    return RouteUtils.hist_ref as unknown as ReturnType<typeof useHistory>;
  },
};

export default RouteUtils;
