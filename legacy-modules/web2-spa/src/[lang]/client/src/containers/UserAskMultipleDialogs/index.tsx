'use client'

// Date: Sat, 30 Sep 2023
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
  DialogStepProps,
  Callout,
} from "@blueprintjs/core";
import _ from "lodash";
import {
  Example,
  ExampleProps,
  handleBooleanChange,
  handleStringChange,
  handleValueChange,
} from "@blueprintjs/docs-theme";
import gutils from "../../utils/GlobalUtils";
import { Dot } from "../../utils/cTranslationUtils";
import exportUtils from "../../utils/ExportUtils";
import { LAFTOOLS_DEFAULT_USERNAME, LANG_EN_US, LANG_ZH_CN, LANG_ZH_HK, URL_WORKBENCH } from "../../types/constants";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../reducers/forgeSlice";
import TakeUtils from "../../utils/TakeUtils";
import { logutils } from "../../utils/LogUtils";
import {
  ACTION_getLangData,
  ACTION_initAllDataAtOnce,
} from "../../reducers/systemSlice";
import LinkHref from "../../components/LinkHref";
import PasswordInput from "../../components/PasswordInput";
import { useState, useContext, useCallback, useRef } from "react";
import {
  ACTION_createAdminAccount,
  ACTION_signInLocalAccount,
} from "../../reducers/userSlice";
import AlertUtils from "../../utils/AlertUtils";
import {
  PutNewDialogReqProp,
  TOOL_PutNewDialog,
} from "../../reducers/dialogSlice";
import { FN_ForgotPassword, FN_ShowNewLocalAccount } from "../../types/dialog-fn";
import apiSlice from "../../reducers/apiSlice";
import MutationResLabel from "../../components/MutationResLabel";
import QueryResLabel from "../../components/QueryResLabel";
import TokenUtils from "../../utils/TokenUtils";
import FormSelect from "../../components/FormSelect";
import AuthHookUtils from "../../utils/AuthHookUtils";
import QueryUtils from "../../utils/QueryUtils";
import PageUtils from "../../utils/PageUtils";
import { EachLang } from "../../types/purejs-types-READ_ONLY";
import IDUtils from "../../utils/IDUtils";
import { useHistory } from "react-router-dom";
import { fn_Geti18n, getFormattedLang } from "../../i18n";
import i18n from "@/[lang]/client/src/impl/translation/i18n";
// import i18nItems from "@/__CORE__/config/i18n";

export interface MultistepDialogExampleState {
  autoFocus: boolean;
  canEscapeKeyClose: boolean;
  canOutsideClickClose: boolean;
  enforceFocus: boolean;
  hasTitle: boolean;
  isCloseButtonShown: boolean;
  showCloseButtonInFooter: boolean;
  isOpen: boolean;
  navPosition: MultistepDialogNavPosition;
  usePortal: boolean;
  value?: string;
  initialStepIndex: number;
}

const NAV_POSITIONS = ["left", "top", "right"];

interface PassProps { }

const STEP_LANG = "LANG";
const STEP_THEME = "THEME";
const STEP_FINAL = "FINAL";

export default (props: PassProps) => {
  const [open, onOpen] = React.useState(true);
  const [nextLoad, onNextLoad] = React.useState(false);
  let forgeObj = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
    lang: val.forge.Language,
  }));
  // let sysObj = exportUtils.useSelector((val) => ({
  //   LoadSystemData: val.system.LoadSystemData,
  // }));
  let dis = exportUtils.dispatch();
  React.useEffect(() => {
    dis(ACTION_getLangData());
  }, []);
  type T3 = {
    cref: MultistepDialog | null;
  };
  let refObj: T3 = {
    cref: null,
  };
  let ref = useRef(refObj);
  const [stepIdx, onStepIndex] = useState(0);
  const fn_UpdateStep = (newIdx) => {
    if (newIdx >= IDX_MAX_IDX) {
      return;
    }
    ref.current.cref?.setState({
      lastViewedIndex: newIdx,
      selectedIndex: newIdx,
    });
    onStepIndex(newIdx);
  };
  const localAccountObject: { current: UserPassProp } = useRef({
    username: LAFTOOLS_DEFAULT_USERNAME,
    password: "",
  });
  const admin_localAccountObject: { current: AdminUserPassProp } = useRef({
    username: LAFTOOLS_DEFAULT_USERNAME,
    password: "",
    confirmPassword: "",
    token: "",
    NeedAdminInit: true,
  });


  PageUtils.useUpdateTitle(Dot("YOYTp", "Quick Setup"), []);

  const [loadLeftPage, onloadLeftPage] = useState("");

  let dialogArr: {
    id: string;
    panel: JSX.Element;
    panelClassName?: string;
    title?: React.ReactNode;
    fn?: () => any;
  }[] = [
      {
        id: "select",
        panel: (
          <LanguagePanel
            onChange={(e) => {
              let newValue = e.currentTarget.value;
              let splitArr = location.pathname.split("/")
              let m = [...splitArr]
              m[2] = getFormattedLang(newValue)
              location.replace(m.join("/"))
              location.reload()
            }}
            selectedValue={forgeObj?.lang || LANG_EN_US}
          />
        ),
        title: Dot(`TD7DA`, "Languages"),
      },
      {
        id: "dark_or_light",
        panel: (
          <DarkOrLightPanel
            onChange={(e) => {
              let newValue = e.currentTarget.value;
              logutils.debug("newvalue", newValue);
              dis(
                forgeSlice.actions.updateDarkMode({
                  isDark: newValue == "dark" ? true : false,
                })
              );
            }}
            selectedValue={forgeObj?.dark ? "dark" : "light"}
          />
        ),
        title: Dot(`-Rj3y`, "Themes"),
      },
      {
        id: "setup_adminstrator",
        panel: (
          <AdministratorSetupPanel
            stepIdx={stepIdx}
            loadLeftPage={loadLeftPage}
            localAccountObject={localAccountObject.current}
            admin_localAccountObject={admin_localAccountObject.current}
            selectedValue="0"
            onChange={(v) => v}
          />
        ),
        title: Dot(`dxLQq`, "Root Permission"),
        fn: async () => {
          if (!admin_localAccountObject.current.NeedAdminInit) {
            return;
          }
          // return {
          //   nextIdx:
          //     _.findIndex(
          //       dialogArr,
          //       (x) => x.id == "sign_in_or_create_local_user"
          //     ) + 1,
          // };
        },
      },
      {
        id: "sign_in_or_create_local_user",
        panel: (
          <LocalUserPanel
            localAccountObject={localAccountObject.current}
            loadLeftPage={loadLeftPage}
            selectedValue="0"
            onChange={(v) => v}
          />
        ),
        title: Dot(`-Jx4J`, "Local Account"),
        fn: async () => {
        },
      },
      {
        id: "confirm",
        panel: <ConfirmPanel selectedValue={"OK"} />,
        title: Dot("MrgmU", "Confirm"),
      },
    ];
  // const IDX_LOCAL_ACCOUNT_SIGN_IDX = _.findIndex(
  //   dialogArr,
  //   (x) => x.id == "sign_in_or_create_local_user"
  // );
  const IDX_MAX_IDX = _.size(dialogArr);

  return (
    <MultistepDialog
      onChange={(v) => {
        onStepIndex(_.findIndex(dialogArr, (x) => x.id == v.toString()));
      }}
      ref={(cref) => {
        _.set(window, "cref", cref);
        gutils.ExposureIt("cref", cref, true);
        ref.current.cref = cref as any;
      }}
      transitionDuration={0}
      isOpen={open}
      className={"bp3-dark"}
      icon="info-sign"
      navigationPosition={"left"}
      onClose={() => { }}
      backButtonProps={{
        text: Dot("5ZBYR", "Back"),
        onClick() {
          fn_UpdateStep(stepIdx - 1);
        },
      }}
      nextButtonProps={{
        text: Dot(`wI1eh`, "Next"),
        disabled: false,
        loading: nextLoad,
        tooltipContent: Dot("XLWoR", `Select your preferred one and continue`),
        onClick: async (...a) => {
          let nextStepIdx = stepIdx + 1;
          let fn = _.get(dialogArr, [stepIdx])?.fn;
          logutils.info("onClick", a, stepIdx, dialogArr, fn);
          if (fn) {
            try {
              onNextLoad(true);
              let o = await fn();
              if (o && o.nextIdx) {
                nextStepIdx = o.nextIdx;
              }
              await gutils.sleep(500);
              fn_UpdateStep(nextStepIdx);
            } catch (e) {
              onloadLeftPage(
                Dot("tIy3Q", "Encountered an error") +
                ": " +
                gutils.getErrMsg(e as Error)
              );
              onNextLoad(false);
            } finally {
              onNextLoad(false);
            }
          } else {
            fn_UpdateStep(nextStepIdx);
          }
        },
      }}
      finalButtonProps={{
        text: Dot(`Dxlw0`, "Complete"),
        onClick() {
          dis(
            forgeSlice.actions.updateHasUserSelectedOption({
              HasUserSelectedOption: true,
            })
          );
        },
      }}
      title={
        Dot("F-OUm", `Quick Setup for LafTools`) +
        `[${Dot("LFdvM", "Not Logged In")}]`
      }
      isCloseButtonShown={false}
    >
      {_.map(dialogArr, (x) => {
        return <DialogStep key={x.id} {...x} />;
      })}
    </MultistepDialog>
  );
};

export interface SelectPanelProps {
  selectedValue: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}
export type UserPassProp = {
  username: string;
  password: string;
};
export type AdminUserPassProp = {
  username: string;
  password: string;
  confirmPassword: string;
  token: string;
  NeedAdminInit: boolean;
};
export type UserPassCreateProp = {
  username: string;
  password: string;
  NewUserToken: string;
};

const NoteMsg = () => {
  return (
    <b>
      {Dot(
        "LnJ4H",
        "Note that the local account is totally not same as the registered user on our website, the former is defined only on your PC whereas the latter can be used for cloud sync."
      )}
    </b>
  );
};

export const AdministratorSetupPanel: React.FC<
  SelectPanelProps & {
    admin_localAccountObject: AdminUserPassProp;
    localAccountObject: UserPassProp,
    loadLeftPage: string;
    notifyCreatedOK?: () => any;
    stepIdx: number;
  }
> = (props) => {
  const infoQueryObj: any = {}

  // apiSlice.useGetVisitAdminInitInfoQuery(
  //   {
  //     stepIdx: props.stepIdx,
  //   },
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );
  let jsx_skipAdmin = (
    <DialogBody className="docs-multistep-dialog-example-step">
      <p>
        <b>{Dot("SBsDz", "Setup for Your Admin Account.")}</b>
        <p>
          {Dot(
            "y8Ir5",
            "This part is used for initializing your administrator account, however, for now, there's nothing that needs to be created or adjusted here as it was previously set up by your administrator, please neglect this part and proceed with your remain steps."
          )}
        </p>
        <p>
          <ButtonGroup style={{ textAlign: "right", display: "block" }}>
            <Button
              small={true}
              onClick={() => {
                FN_ForgotPassword();
              }}
            >
              {Dot("Y_k0z", "Forgot Password?")}
            </Button>
          </ButtonGroup>
        </p>
      </p>
    </DialogBody>
  );
  let dis = exportUtils.dispatch();
  let [loadLeftPage, onloadLeftPage] = useState("");
  let [loading, onLoading] = useState(false)

  if (infoQueryObj.isSuccess) {
    let HasAdminInit = infoQueryObj.data?.payload?.value?.HasAdminInit;
    props.admin_localAccountObject.NeedAdminInit = !HasAdminInit;

    if (HasAdminInit) {
      return jsx_skipAdmin;
    } else {
      let systemInitToken = TokenUtils.getSystemInitToken();
      if (_.isEmpty(systemInitToken)) {
        return (
          <DialogBody className="docs-multistep-dialog-example-step">
            <p>
              <b>{Dot("7q40W", "Unable to initialize the administrator")}</b>
              <p>
                {Dot(
                  "DIQFq",
                  "Please check if the URL parameter has been provided properly, it looks like that you don't have the permission to fill this form. By default, you shall be able to see below message in the output of service when it just launched."
                )}
              </p>
              <code>
                ----------------------------------------------- <br></br>PLEASE ACCESSTHE
                LINK BELOW IN BROWSER. <br />请复制下方链接并在浏览器端打开(for zh-hans
                users) <br />請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
                http://127.0.0.18080/app/entry?t=YOUR_AUTH_ID<br></br>
                -----------------------------------------------
              </code>
              <p>
                <ButtonGroup style={{ textAlign: "right", display: "block" }}>
                  <Button
                    small={true}
                    onClick={() => {
                      FN_ForgotPassword();
                    }}
                  >
                    {Dot("dl4kr", "Forgot Password?")}
                  </Button>
                </ButtonGroup>
              </p>
            </p>
          </DialogBody>
        );
      }
    }
  }

  return (
    <QueryResLabel
      jsx={
        <DialogBody className="docs-multistep-dialog-example-step">
          <h1 className="text-center mt-0">{Dot("SZgXb", "Setup Local Password")}</h1>
          <p>
            {Dot(
              "c7Uoqqe",
              "Before using LafTools, please provide and confirm your local password as below."
            )}
          </p>
          {/* <p> */}
          {/* <b>
              {Dot("K1qJZI", "Welcome to the LafTools, Your Excellency.")}
            </b> */}
          {/* </p> */}
          {/* <p> */}
          {/* {Dot("L49kCq", "Please provide and confirm lock password in this form to secure your LafTools.")} */}
          {/* {Dot(              "bp_-b",
              "To fully manage the LafTools, you need to set up your administrator at the beginning of setup flow. We have verified your identification by the URL parameter token, please be assured that there's nobody else can setup your root permission unless he or she obtains setup token."
            )}
            {Dot(
              "I8FLi",
              "Now, it's time to setup your administrator, please set the password as complex as you can so that you can perplex those impolite attackers."
            )} */}
          {/* </p> */}
          <p>
            {/* <FormGroup label={Dot("lIn3_", "Admin Username")}>
              <InputGroup
                asyncControl={true}
                placeholder={Dot(
                  "kcHxr",
                  "Please provide admin account username here"
                )}
                onChange={(val) => {
                  props.admin_localAccountObject.username = val.target.value;
                }}
              ></InputGroup>
            </FormGroup> */}
            <FormGroup label={Dot("OSqZQM", "Local Password")}>
              <PasswordInput
                asyncControl={true}
                placeholder={Dot(
                  "H-qA75",
                  "Please provide local password."
                )}
                type="password"
                strong={true}
                onChange={(val) => {
                  props.admin_localAccountObject.password = val.target.value;
                }}
              ></PasswordInput>
            </FormGroup>
            <FormGroup label={Dot("qtpmvP", "Confirm Local Password")}>
              <PasswordInput
                asyncControl={true}
                placeholder={Dot(
                  "H-Ae75",
                  "Please confirm your local password."
                )}
                type="password"
                strong={true}
                onChange={(val) => {
                  props.admin_localAccountObject.confirmPassword = val.target.value;
                }}
              ></PasswordInput>
            </FormGroup>
            {gutils.empty(props.loadLeftPage) ? (
              ""
            ) : (
              <div
                className="text-right"
                style={{ paddingTop: "8px", paddingBottom: "8px" }}
              >
                {props.loadLeftPage}
              </div>
            )}

            <div className="pt-form-helper-text mb-2 mt-2 text-right">
              <a href={'javascript:void(0)'} onClick={() => {
                let systemInitToken = TokenUtils.getSystemInitToken();

                AlertUtils.win_alert({
                  id: "jZGbQ",
                  msg: <p>
                    <p>
                      {Dot("wAxtg", "Initially, we generated an UUID as an authorinized token for you to do this setup. From what LafTools has received, the token you provided is {0}, it's verified by LafTools successfully and consequently you can continue to setup this form.",
                        systemInitToken
                      )}
                    </p>
                    <p>{Dot("mjHoR", "Also, technically, nobody can read this token otherwise he/she has attacked and controlled your computer.")}</p>
                    <p>
                      {Dot("Nqc0LqwX", "If you think there's an vulnerability in this process, please feel free to contact us via EMail or GitHub at any time, we would like to enhance it urgently.")}
                    </p>
                  </p>
                })
              }}>
                {Dot("2D9qdk6", "Is it Secure Enough?")}
              </a>
            </div>
            {
              loadLeftPage != "" ? <p>{loadLeftPage}</p> : ''
            }

            <div>
              <Button
                type="button"
                loading={loading}
                onClick={async () => {
                  try {
                    onLoading(true)
                    let admin_localAccountObject = {
                      current: props.admin_localAccountObject
                    }
                    if (_.isEmpty(props.admin_localAccountObject.password)) {
                      AlertUtils.popMsg("danger", {
                        message: Dot("L71q_N", "The password you provided is empty, please check and try again.")
                      })
                      onLoading(false)
                      return
                    }
                    if (props.admin_localAccountObject.confirmPassword != props.admin_localAccountObject.password) {
                      AlertUtils.popMsg("danger", {
                        message: Dot("Le71_N-", "The password you provided is not same as the confirmed one, please check and try again.")
                      })
                      onLoading(false)
                      return
                    }

                    // do create things

                    onloadLeftPage(
                      Dot("44Ntqw-", "Handling the operation.")
                    );
                    await ACTION_createAdminAccount({
                      localAccountObject: admin_localAccountObject.current,
                    })(dis);
                    AlertUtils.popOK(Dot(
                      "vaP0vq",
                      "Setup the local password successfully."
                    ))
                    // onloadLeftPage(
                    // );
                    props.localAccountObject.username =
                      admin_localAccountObject.current.username;
                    props.localAccountObject.password =
                      admin_localAccountObject.current.password;
                    props.notifyCreatedOK && props.notifyCreatedOK()
                    onloadLeftPage("");
                    onLoading(false)
                  } catch (e) {
                    onLoading(false)
                    onloadLeftPage(Dot("tIyq3Q", "Encountered an error") +
                      ": " +
                      gutils.getErrMsg(e as Error));
                  }
                }}
                // loading={result.isLoading}
                intent="success"
                fill
                large
                text={Dot("DIweGq", "Secure Your LafTools")}
              />

            </div>
          </p>
        </DialogBody>
      }
      obj={infoQueryObj}
    ></QueryResLabel>
  );
};

export const LocalUserPanel: React.FC<
  SelectPanelProps & {
    notifyCreatedOK?: () => any,
    loadLeftPage: string; localAccountObject: UserPassProp
  }
> = (props) => {
  let dis = exportUtils.dispatch();
  let userQuery: any = {}
  // apiSlice.useListUserNamesQuery(
  //   exportUtils.refresh_v1(),
  //   exportUtils.refresh_v2()
  // );
  let [loading, onLoading] = useState(false)
  let [loadLeftPage, onloadLeftPage] = useState("")
  let hist = useHistory()
  let r = QueryUtils.validateResult(userQuery, {
    label: Dot("LM715", "Retrieving usernames from local server API"),
  });
  let doAction = async (showMsg: boolean) => {
    try {
      onLoading(true)
      // TODO: do unlock logic
      let localAccountObject = {
        current: props.localAccountObject
      }
      if (localAccountObject.current.password == "") {
        throw new Error(Dot("DrbEr", "The password you provided is empty, please check and try again."))
      }
      if (_.isEmpty(localAccountObject.current.username)) {
        throw new Error(Dot("qDrbEr", "The username you provided is empty, please check and try again."))
      }
      await ACTION_signInLocalAccount({
        localAccountObject: localAccountObject.current,
      })(dis);
      // AlertUtils.popOK(Dot("y3qjdd", "Your local password has been successfully verified."))
      props.notifyCreatedOK && props.notifyCreatedOK()
      onLoading(false)
      hist.push(URL_WORKBENCH)
    } catch (e) {
      if (showMsg) {
        AlertUtils.popError(e as any);
      }
      onLoading(false)
    }
  }
  if (r) {
    return r;
  }
  let usernames_list_if_have = userQuery.data?.payload?.value?.Usernames;
  if (_.isEmpty(props.localAccountObject.username)) {
    if (!_.isNil(_.first(usernames_list_if_have))) {
      props.localAccountObject.username = _.first(
        usernames_list_if_have
      ) as string;
    }
  }
  return (
    <DialogBody className="docs-multistep-dialog-example-step">
      {/* <p>
        {Dot(          "nTvw4", "To protect and separately save your data and settings, you may use your local account to achieve that. Besides, LafTools will support instant message widgets amongst users in the future. ")}
      </p>
      <p>
        {Dot(          "e8Crq","Please fill up below username and password field to continue."        )}{" "}
        <NoteMsg></NoteMsg>
      </p> */}
      {/* <FormGroup label={Dot("fBP5h", "Username")}> */}
      {/* <FormSelect
          list={_.map(usernames_list_if_have, (x) => {
            return {
              label: x,
              value: x,
            };
          })}
          value={props.localAccountObject.username}
          onChange={(val) => {
            props.localAccountObject.username = val;
          }}
        ></FormSelect> */}
      {/* <InputGroup
          asyncControl={true}
          placeholder={Dot("Y9mQ2", "Please provide account username here")}
          defaultValue={props.localAccountObject.username}
          onChange={(val) => {
            props.localAccountObject.username = val.target.value;
          }}
        ></InputGroup> */}
      {/* </FormGroup> */}
      <h1 className="text-center mt-0">{Dot("rQkas", "Welcome to LafTools")}</h1>
      <FormGroup label={Dot("YAAU3q", "Local Password")}
        helperText={
          Dot("2giYv", "Test Password: {0}", "1234")
        }
      >
        <PasswordInput
          large
          asyncControl={true}
          // placeholder={Dot("Sm9tq", "Please provide account password here")}
          placeholder={Dot("Sm9tqq", "Please provide password to unlock your LafTools")}
          type="password"
          defaultValue={props.localAccountObject.password}
          onChange={(val) => {
            props.localAccountObject.password = val.target.value;
            // doAction(false)
          }}
        // onKeyDown={()=>{
        // setTimeout(() => {
        //   doAction(false)
        // }, 100);
        // }}
        ></PasswordInput>
      </FormGroup>
      <div className="pt-form-helper-text mb-2 mt-2 text-right">
        <a href={'javascript:void(0)'} onClick={() => {
          FN_ForgotPassword();
        }}>
          {Dot("2D9a6", "Forgot Password?")}
        </a>
      </div>

      {
        loadLeftPage != "" ? <p>{loadLeftPage}</p> : ''
      }
      <div>
        <Button
          type="button"
          loading={loading}
          onClick={async () => {
            doAction(true)
          }}
          // loading={result.isLoading}
          intent="primary"
          fill
          large
          text={Dot("fqV_1P", "Unlock Your LafTools")}
        />

      </div>

      {/* <ButtonGroup style={{ textAlign: "right", display: "block" }}> */}
      {/* <Button
          small={true}
          intent="success"
          onClick={() => {
            FN_ShowNewLocalAccount();
          }}
        >
          {Dot("UZ2Ig", "New Local Account")}
        </Button> */}
      {/* <Button
          small={true}
          onClick={() => {
            FN_ForgotPassword();
          }}
        >
          {Dot("04SSf", "Forgot Password?")}
        </Button> */}
      {/* </ButtonGroup> */}

      {gutils.empty(props.loadLeftPage) ? (
        ""
      ) : (
        <div
          className="text-right"
          style={{ paddingTop: "8px", paddingBottom: "8px" }}
        >
          {props.loadLeftPage}
        </div>
      )}
      <Callout style={{ marginTop: '20px' }}>
        <p>
          <b>
            {Dot("JYqxz2", "Welcome to LafTools, this is an insider version.")}
          </b>
        </p>
        <p>
          {Dot("_LFF3", "Should you encounter any issue or have any suggestion while using LafTools, please feel free to contact us via EMail or GitHub at any time, we are willing to enhance it.")}
        </p>
        <p><a href={'https://laftools.dev'} target="_blank">https://laftools.dev</a></p>
      </Callout>
    </DialogBody>
  );
};

export let useGetI18nLangList = (): EachLang[] => {
  let a = i18n()
  return a
  // let i18nQ = apiSlice.useGeti18nConfigQuery(
  //   {},
  //   { refetchOnMountOrArgChange: true }
  // );
  // let r = QueryUtils.validateResult(i18nQ, {
  //   label: Dot("kjks1", "Retrieving i18n config from local server API"),
  // });
  // if (r) {
  //   return undefined;
  // }
  // let arr: EachLang[] | undefined = i18nQ.data?.payload?.value || [];
  // return arr;
};

const LanguagePanel: React.FC<SelectPanelProps> = (props) => {
  let i18nItems = fn_Geti18n(Dot);

  let arr = i18nItems
  return (
    <DialogBody className="docs-multistep-dialog-example-step">
      <p>{Dot("DrXAq", "Welcome to use LafTools! ")}</p>
      <p>{Dot("1YmJc", "Select one of options as your preferred language:")}</p>
      <RadioGroup onChange={props.onChange} selectedValue={props.selectedValue}>
        {arr.map((x) => {
          return <Radio label={x.LabelByLang} value={x.Value} key={x.Value} />;
        })}
      </RadioGroup>
    </DialogBody>
  );
};

const DarkOrLightPanel: React.FC<SelectPanelProps> = (props) => (
  <DialogBody className="docs-multistep-dialog-example-step">
    <p>
      {Dot(
        "YHCjT",
        `LafTools supports global light and dark theme, it's useful in particular with night shift coders.`
      )}
    </p>
    <p>{Dot("l6Djb", "Select one of options as your preferred theme:")}</p>
    <RadioGroup onChange={props.onChange} selectedValue={props.selectedValue}>
      <Radio label={Dot("jQXdi", `Light Mode`)} value={"light"} />
      <Radio label={Dot("5NCPT", `Dark Mode`)} value={"dark"} />
    </RadioGroup>
  </DialogBody>
);

export interface ConfirmPanelProps {
  selectedValue: string;
}

const ConfirmPanel: React.FC<ConfirmPanelProps> = (props) => (
  <DialogBody className="docs-multistep-dialog-example-step">
    <p>{Dot(`d5KZH`, "Thanks for using LafTools! ")}</p>
    <p>
      {Dot(
        `HNDat`,
        `To make changes, please click the "{0}" button. Otherwise, click "{1}" to apply your changes. May you have a good time with this toolbox! `,
        Dot("-XZnW", "Back"),
        Dot("hyV-d", "Done")
      )}
    </p>
    <p>
      {Dot(
        "ERK7E",
        "If you encounter any issue or have any suggestion while using LafTools, please feel free to contact us via EMail or GitHub at any time, we are willing to enhance it urgently."
      )}
    </p>
    <p>
      <ul>
        <li>
          {Dot("kLH79", "EMail")}:{" "}
          <LinkHref
            link="mailto:work7z@outlook.com"
            label="work7z@outlook.com"
          ></LinkHref>
        </li>
        <li>
          {Dot("oNg3f", "Official Website")}:{" "}
          <LinkHref link="https://laftools.dev" />
        </li>
        <li>
          {Dot("f5bLC", "Documentation")}:
          <LinkHref
            link="https://laftools.dev/documentation/view?id=welcome"
            label={Dot("OSHOI", "Welcome Page")}
          />
        </li>
      </ul>
    </p>
  </DialogBody>
);
