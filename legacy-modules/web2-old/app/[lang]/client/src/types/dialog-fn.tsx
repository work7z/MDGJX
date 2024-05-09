
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import * as React from "react";

import {
  Button,
  DialogFooter,
  ButtonProps,
  Code,
  DialogBody,
  InputGroup,
  FormGroup,
  ButtonGroup,
  DialogStep,
  Dialog,
  H5,
  HTMLSelect,
  Label,
  MultistepDialog,
  MultistepDialogNavPosition,
  NumericInput,
  Radio,
  RadioGroup,
  Switch,
} from "@blueprintjs/core";
import _ from "lodash";
import {
  Example,
  ExampleProps,
  handleBooleanChange,
  handleStringChange,
  handleValueChange,
} from "@blueprintjs/docs-theme";
import gutils from "../utils/GlobalUtils";
import { Dot } from "../utils/cTranslationUtils";
import exportUtils from "../utils/ExportUtils";
import { LAFTOOLS_DEFAULT_USERNAME, LANG_EN_US, LANG_ZH_CN, LANG_ZH_HK } from "./constants";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../reducers/forgeSlice";
import TakeUtils from "../utils/TakeUtils";
import { logutils } from "../utils/LogUtils";
import {
  ACTION_getLangData,
  ACTION_initAllDataAtOnce,
} from "../reducers/systemSlice";
import LinkHref from "../components/LinkHref";
import PasswordInput from "../components/PasswordInput";
import { useState, useContext, useCallback, useRef } from "react";
import {
  ACTION_createLocalAccount,
  ACTION_signInLocalAccount,
} from "../reducers/userSlice";
import AlertUtils from "../utils/AlertUtils";
import { PutNewDialogReqProp, TOOL_PutNewDialog } from "../reducers/dialogSlice";
import ALL_NOCYCLE, { FN_GetDispatch } from "../nocycle";
import { UserPassCreateProp } from "../containers/UserAskMultipleDialogs";
import apiSlice from "../reducers/apiSlice";
import MutationResLabel from "../components/MutationResLabel";

export const FN_testDialogHere = () => {
  // FN_ForgotPassword();
};

export const FN_ForgotPassword = () => {
  TOOL_PutNewDialog({
    dispatch: FN_GetDispatch(),
    id: "COCWa",
    Dialog: (props: PutNewDialogReqProp) => {
      return <div>not yet defined</div>
      // let [pw, onPW] = useState("");
      // let [pw_e, onPW_e] = useState("");
      // let [load, onLoad] = useState(false);
      // const gui_info_query = apiSlice.useGetGuiSystemInfoQuery({});
      // let UserConfigDir = gui_info_query.isSuccess
      //   ? _.get(gui_info_query, "data.payload.value.UserConfigDir")
      //   : gutils.getErrMsg(gui_info_query.error);
      // let UserPWDir = gui_info_query.isSuccess
      //   ? _.get(gui_info_query, "data.payload.value.UserPWDir")
      //   : gutils.getErrMsg(gui_info_query.error);
      // let username = "jerry";
      // const [pw_calc_fn, pw_calc_res] = apiSlice.usePostLocalPwCalcMutation({});
      // gutils.ExposureIt(
      //   "dialog",
      //   {
      //     pw_calc_fn,
      //     pw_calc_res,
      //   },
      //   true
      // );

      // return (
      //   <Dialog
      //     onClose={props.obj.close}
      //     isOpen={true}
      //     title={Dot("bP_6qG", "Tips for Forgot Your Password")}
      //     icon="info-sign"
      //   >
      //     <DialogBody>
      //       <p>
      //         <b>{Dot("Apx8D", "How to Reset Your Password Manually?")}</b>
      //         <p>
      //           {Dot(
      //             "Hflf2",
      //             "For the sake of cyber security, we would not help reset your password via APIs or pages here unless you update the system-protected file manually."
      //           )}
      //           {Dot(
      //             "JTBRh",
      //             `LafTools stored the password value into the local file, but no worries, we adopted a One-way password encryption mechanism, that is to say that nobody can read the password of the plain text version. To reset the password, please follow below instruments to manually reset your password. `
      //           )}
      //           <ol>
      //             <li>
      //               {Dot(
      //                 "PqazM-",
      //                 "First of all, please use below form controls to encrypt your password"
      //               )}
      //             </li>
      //             <li>
      //               {Dot(
      //                 "b0qjSL",
      //                 "Please enter the directory {1} and create a file {2}, put your encrypted password as its entire file content.",
      //                 'N/A',
      //                 UserPWDir,
      //                 LAFTOOLS_DEFAULT_USERNAME + ".txt"
      //               )}
      //             </li>
      //             <li>
      //               {Dot(
      //                 "KGS2-",
      //                 "Once you completed above steps, you may use your new password to sign in your system. If you could not access the file system, please ask your administrator or IT support to create that file. If the file already existed, then deleted it and re-new one."
      //               )}
      //             </li>
      //           </ol>
      //         </p>
      //         <b>{Dot("FhVWl", "Encrypt Your Password")}</b>
      //         <p>
      //           <FormGroup
      //             label={Dot("ttAre", "Input your plaintext password here")}
      //           >
      //             <InputGroup
      //               small={true}
      //               placeholder={Dot("AfPC0", "Your plain text password")}
      //               value={pw}
      //               onChange={(e) => {
      //                 onPW(e.target.value);
      //                 pw_calc_fn({ pw: e.target.value });
      //               }}
      //             ></InputGroup>
      //           </FormGroup>
      //           <FormGroup
      //             label={Dot("g2_aX", "Copy encrypted password into file")}
      //           >
      //             <InputGroup
      //               small={true}
      //               placeholder={Dot(
      //                 "zwgYx",
      //                 "Encrypted password value will be displayed here."
      //               )}
      //               value={_.get(pw_calc_res.data, "payload.value.CalcPW")}
      //             ></InputGroup>
      //           </FormGroup>
      //           <MutationResLabel obj={pw_calc_res}></MutationResLabel>
      //         </p>
      //         <p>
      //           {Dot(
      //             "IOOrz",
      //             `(Would it be harmful to your system? We do not think so, as long as you can modify the system preserved config file, that means you are granted to read everything about LafTools data files.)`
      //           )}
      //         </p>
      //       </p>
      //     </DialogBody>
      //     <DialogFooter actions={[props.closeBtnJSX]} />
      //   </Dialog>
      // );
    },
  });
};

export const FN_Example = () => {
  TOOL_PutNewDialog({
    dispatch: FN_GetDispatch(),
    id: "FjVeK",
    Dialog: (props: PutNewDialogReqProp) => {
      let ref: { current: UserPassCreateProp } = useRef({
        username: "",
        password: "",
        NewUserToken: "",
      });
      let [load, onLoad] = useState(false);
      return (
        <Dialog
          onClose={props.obj.close}
          isOpen={true}
          title={Dot("euaI8", "Create New Local Account")}
          icon="info-sign"
        >
          <DialogBody></DialogBody>
          <DialogFooter actions={[props.closeBtnJSX]} />
        </Dialog>
      );
    },
  });
};

export const FN_ShowNewLocalAccount = () => {
  TOOL_PutNewDialog({
    dispatch: FN_GetDispatch(),
    id: "_t1jR",
    Dialog: (props: PutNewDialogReqProp) => {
      let ref: { current: UserPassCreateProp } = useRef({
        username: "",
        password: "",
        NewUserToken: "",
      });
      let [load, onLoad] = useState(false);
      return (
        <Dialog
          onClose={props.obj.close}
          isOpen={true}
          title={Dot("2Ruh6", "Create New Local Account")}
          icon="info-sign"
        >
          <DialogBody>
            <FormGroup label={Dot("Y5GAC", "Your Username")}>
              <InputGroup
                asyncControl={true}
                placeholder={Dot(
                  "U7zP2",
                  "Please provide account username here"
                )}
                onChange={(val) => {
                  ref.current.username = val.target.value;
                }}
              ></InputGroup>
            </FormGroup>
            <FormGroup label={Dot("4kKe4", "Your Password")}>
              <PasswordInput
                asyncControl={true}
                placeholder={Dot(
                  "dzjTo",
                  "Please provide account password here"
                )}
                type="password"
                onChange={(val) => {
                  ref.current.password = val.target.value;
                }}
              ></PasswordInput>
            </FormGroup>
            <FormGroup
              label={Dot("5BOhl", "Invitation Code")}
              helperText={Dot(
                "58HQX",
                "If you don't know its value, please contact your administrator for further detail, which can be found in his settings."
              )}
            >
              <InputGroup
                asyncControl={true}
                placeholder={Dot(
                  "vTsQU",
                  "Please provide invitation code from your administrator"
                )}
                onChange={(val) => {
                  ref.current.username = val.target.value;
                }}
              ></InputGroup>
            </FormGroup>
          </DialogBody>
          <DialogFooter
            actions={[
              props.closeBtnJSX,
              <Button
                intent="primary"
                loading={load}
                text={Dot("6ClPV", "Create")}
                onClick={async () => {
                  onLoad(true);
                  try {
                    await ACTION_createLocalAccount({
                      localAccountObject: ref.current,
                    })(FN_GetDispatch());
                  } finally {
                    onLoad(false);
                  }
                }}
              />,
            ]}
          />
        </Dialog>
      );
    },
  });
};
export default {};
