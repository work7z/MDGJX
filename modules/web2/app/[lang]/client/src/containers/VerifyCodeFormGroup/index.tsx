
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
import { LANG_EN_US, LANG_ZH_CN, LANG_ZH_HK } from "../../types/constants";
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

export default (props: {
    verifyCode: string | undefined;
    setVerifyCode: (val: string) => any;
}) => {
    let [timestamp, setTimestamp] = useState(Date.now());
    let { verifyCode, setVerifyCode } = props;
    let [verified, setVerified] = useState(false);
    return (
        <FormGroup
            label={Dot("i6hMN", "Image Verification Code")}
            style={{ marginBottom: "20px" }}
        >
            <InputGroup
                large
                intent={"none"}
                placeholder={Dot(
                    "2qdin8",
                    "Please enter the verification code"
                )}
                value={props.verifyCode}
                onChange={(e) => {
                    setVerifyCode(e.target.value);
                }}
            />
            <div style={{ float: "left", textAlign: "right", marginTop: "10px" }}>
                <img src={"/blob/verify-code/get?timestamp=" + timestamp.toString()} />
                <div
                    className="chgvalidctl"
                    style={{
                        marginTop: "3px",
                    }}
                >
                    <a
                        href="javascript:void(0);"
                        onClick={() => {
                            setTimestamp(Date.now());
                        }}
                    >
                        {Dot("_z3lR", "Refresh Code")}
                    </a>
                </div>
            </div>
            <div className="clearfix"></div>
        </FormGroup>
    );
};