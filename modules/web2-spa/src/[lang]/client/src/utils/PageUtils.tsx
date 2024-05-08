
// Date: Thu, 28 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import gutils from "./GlobalUtils";
import staticDevJson from "../static/dev.json";
import { useHistory } from "react-router";
import TranslationUtils, { Dot } from "./cTranslationUtils";
import { useEffect } from "react";
import { APPINFOJSON } from "../nocycle";

class Header {
  Name: string = "";
  Value: string = "";
}
class Request {
  Inited: boolean = false;
  UsingHTTPSProtocol: boolean = false;
  Host: string = "";
  Port: number = -1;
  Token: string = "";
  BaseCtxAPI: string = "";
}
const VAL_REQUEST_OBJ: Request = {
  Inited: false,
  UsingHTTPSProtocol: false,
  Host: "",
  Port: -1,
  Token: "",
  BaseCtxAPI: "",
};
const PageUtils = {
  useUpdateTitle(title, eff: string[]) {
    return;
    // useEffect(() => {
    //   let suffix = Dot("5srFq", "LafTools") + `(${APPINFOJSON.version})`;
    //   let newTitle = "";
    //   if (gutils.empty(title)) {
    //     newTitle = suffix;
    //   } else {
    //     newTitle = title + " - " + suffix;
    //   }
    //   if (document.title != newTitle) {
    //     document.title = newTitle + "";
    //   }
    // }, [title + TranslationUtils.CurrentLanguage, ...eff]);
  },
  // GetRoutePath(subPath: string): string {
  //   return "/app/en" + subPath;
  // },
  UpdateRequestObj: (newRequestObj: Request) => {
    _.merge(VAL_REQUEST_OBJ, newRequestObj);
  },
  GetBaseURL: (): string => {
    return `${VAL_REQUEST_OBJ.UsingHTTPSProtocol ? `http` : `https`}://${VAL_REQUEST_OBJ.Host
      }:${VAL_REQUEST_OBJ.Port}${VAL_REQUEST_OBJ.BaseCtxAPI}`;
  },
  isFullScreen: (): boolean => {
    return document.fullscreenElement != null;
  },
  toggleFullScreen: () => {
    if (PageUtils.isFullScreen()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  },
};

export default PageUtils;
