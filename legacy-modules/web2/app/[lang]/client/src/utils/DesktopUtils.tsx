
// Date: Thu, 30 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { FN_GetDispatch } from "../nocycle";
import apiSlice from "../reducers/apiSlice";
import AjaxUtils from "./AjaxUtils";
import AlertUtils from "./AlertUtils";
import QueryUtils, { getAjaxValueRes } from "./QueryUtils";
import { Dot } from "./cTranslationUtils";

export default {
  checkExistAndAskAndMkdir: async function (dir: string): Promise<boolean> {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      isPOST: true,
      url: "/os/fileExist",
      data: {
        Dir: dir,
      },
    });
    if (r.error) {
      AlertUtils.popError(r.error);
      return false;
    }
    let exist = getAjaxValueRes<any>(r) as boolean;
    if (!exist) {
      let createOrNot = await new Promise((r, e) => {
        AlertUtils.win_confirm({
          id: "Lt0-a",
          msg: Dot(
            "Ahrjc",
            "The directory does not exist, do you want to create it?"
          ),
          fn(yesOrNo, obj) {
            r(yesOrNo);
          },
        });
      });
      if (!createOrNot) {
        AlertUtils.popCancelled();
        return false;
      }
      if (createOrNot) {
        await this.mkdirFile(dir);
      }
    }
    return true;
  },
  mkdirFile: async function (dir: string) {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      isPOST: true,
      url: "/os/mkdirDir",
      data: {
        Dir: dir,
      },
    });
    if (r.error) {
      AlertUtils.popError(r.error);
    }
  },
  existFile: async function (dir: string): Promise<boolean> {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      isPOST: true,
      url: "/os/fileExist",
      data: {
        Dir: dir,
      },
    });
    if (r.error) {
      AlertUtils.popError(r.error);
      return false;
    }
    return getAjaxValueRes<any>(r) as boolean;
  },
  openDir: async function (dir: string) {
    AlertUtils.popMsg("success", {
      message: Dot(
        "dkarh",
        "Okie, toolbox opened the directory. If there's no window pop up, please check if your platform support this function, or the directory is in the server."
      ),
    });
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      isPOST: true,
      url: "/os/openDir",
      data: {
        Dir: dir,
      },
    });
    if (r.error) {
      AlertUtils.popError(r.error);
    }
  },
};
