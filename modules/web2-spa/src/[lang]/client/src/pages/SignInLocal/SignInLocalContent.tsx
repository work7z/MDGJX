// LafTools
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import localforage from "localforage";
import {
    Callout,
    PanelStack,
    ProgressBar,
    AnchorButton,
    Tooltip,
    Dialog,
    Drawer,
    Overlay,
    Alert,
    RadioGroup,
    MenuItem,
    Radio,
    ButtonGroup,
    TextArea,
    HotkeysProvider,
    Intent,
    Position,
    Toaster,
    Checkbox,
    NumericInput,
    FormGroup,
    HTMLSelect,
    ControlGroup,
    InputGroup,
    Navbar,
    NavbarHeading,
    NonIdealState,
    NavbarDivider,
    NavbarGroup,
    Alignment,
    Classes,
    Icon,
    Card,
    Elevation,
    Button,
} from "@blueprintjs/core";
import gutils from "../../utils/GlobalUtils";
import "./index.scss";
import { Dot } from "../../utils/cTranslationUtils";
import { useHistory } from "react-router";
import { useEffect, useRef, useState } from "react";
import { CSS_TEXT_ANCHOR_CSS, LAFTOOLS_DEFAULT_USERNAME, URL_WORKBENCH, VAL_CSS_MENU_TITLE_PANEL } from "../../types/constants";
import LanguageFlowList from '../../containers/LanguageFlowList'
import RouteUtils from "../../utils/RouteUtils";
import PageUtils from "../../utils/PageUtils";
import MottoLine from "../../components/MottoLine";
import { AdminUserPassProp, AdministratorSetupPanel, LocalUserPanel, UserPassProp } from "../../containers/UserAskMultipleDialogs";
import apiSlice from "../../reducers/apiSlice";
import { ACTION_callRefreshAll } from "../../reducers/systemSlice";
import { APPINFOJSON, FN_GetDispatch } from "../../nocycle";
import exportUtils from "../../utils/ExportUtils";
import AlertUtils from "../../utils/AlertUtils";
import { fmtURL_Server } from "@/__CORE__/utils/routeUtils";

export let FooterContent = () => {
    return <div className='  w-8/12 space-y-3 mx-auto bp5-text-muted  break-words pt-8 flex flex-col pb-6 ' style={{
        minWidth: '50vw'
    }} >
        <LanguageFlowList></LanguageFlowList>
        <i className="text-xs">            <MottoLine singleLineMode={true}></MottoLine></i>
        <div className='space-x-3'>
            {
                [
                    {
                        label: Dot("V6U_f", "Terms of Service"),
                        link: "https://codegen.cc/main/license/main"
                    },
                    {
                        label: Dot("OQWm4", "Report a Bug"),
                        link: "https://github.com/work7z/LafTools/issues"
                    },
                    {
                        // label: Dot("d5LAU", "Licensed under AGPLv3"),
                        label: Dot("4PIqD", "Code Review"),
                        link: "https://github.com/work7z/LafTools/"
                        // link: 'https://en.wikipedia.org/wiki/Affero_General_Public_License'
                    },
                    {
                        label: Dot("zmDWx", "Contact Us"),
                        link: "mailto:work7z@outlook.com"
                    },
                    {
                        label: Dot("13pmE", "Support Us"),
                        link: "https://github.com/work7z/LafTools/"
                    },
                    // {
                    //     label: Dot("13pmE", "Support Us"),
                    //     link: "javascript:void(0);",
                    //     onClick: () => {
                    //         AlertUtils.win_alert({
                    //             id: "W1z_B",
                    //             msg: <p>
                    //                 <h1>{Dot("qHoktx", "Thank You!")}</h1>
                    //                 <p>
                    //                     {Dot("CidOqAZ", "As the creator of LafTools, I am so touched that you are willing to support us. We have good people on our team who work hard to continuously improve LafTools.")}
                    //                 </p>
                    //                 <p>
                    //                     {Dot("6hsnqWe", "Although LafTools is free and open source, maintaining it still requires a significant amount of time and energy. In particular, we need funds to pay for certain cloud APIs. If you appreciate LafTools, please consider supporting us.")}
                    //                 </p>
                    //                 <p>
                    //                     {Dot("5qPOJL", "To support LafTools, consider either giving a star to our repository on GitHub or upgrading to our professional version through a monthly subscription. We would greatly appreciate your help, and we promise that LafTools will become even better with the funds raised.")}</p>
                    //                 <p
                    //                     className='bp5-text-muted'
                    //                 >{'Ryan Laf'}
                    //                     <br />
                    //                     {Dot("qWemXE4", "Jan, 1st, 2024")}
                    //                 </p>
                    //             </p>
                    //         })
                    //     }
                    // },
                    // {
                    //     label: Dot("TET4xnxBT", "Easter Egg"),
                    //     link: fmtURL_Server(['/client']),
                    // }
                    //  onClick = { x.onClick }
                ].map(x => {
                    // x.onClick ? '' : 
                    return <a href={x.link} className={CSS_TEXT_ANCHOR_CSS} target={'_blank'}>{x.label}</a>
                })
            }
        </div>
        <div>
            <b>
                <a className={CSS_TEXT_ANCHOR_CSS} href="https://laftools.dev" target='_blank'>{''} {

                    Dot("ZbD3F", "{0}, crafted by the LafTools team", "LafTools@" + APPINFOJSON.version + "")
                    // Dot("rK6cx", "{0}, designed and developed by the LafTools team", "LafTools@" + APPINFOJSON.version + "")


                }</a>
            </b>
        </div>
        {/* <div>
        LafTools <a href="https://laftools.dev">https://laftools.dev</a>
    </div> */}
    </div>
}

let InnerContent = () => {
    const localAccountObject: { current: UserPassProp } = useRef({
        username: LAFTOOLS_DEFAULT_USERNAME,
        password: "",
    });
    let hist = useHistory()
    const admin_localAccountObject: { current: AdminUserPassProp } = useRef({
        username: LAFTOOLS_DEFAULT_USERNAME,
        password: "",
        confirmPassword: "",
        token: "",
        NeedAdminInit: true,
    });
    let stepIdx = 1
    const [loadLeftPage, onloadLeftPage] = useState("");
    // const infoQueryObj = apiSlice.useGetVisitAdminInitInfoQuery(
    //     {
    //         stepIdx,
    //         ...exportUtils.refresh_v1()
    //     },
    //     {
    //         refetchOnMountOrArgChange: true,
    //     }
    // );
    const infoQueryObj: any = {}


    let showDoAdminStuff = !(
        infoQueryObj.isSuccess
        && infoQueryObj.data?.payload?.value?.HasAdminInit
    )
    let showJSX = <div>not yet defined</div>
    if (showDoAdminStuff) {
        showJSX = <AdministratorSetupPanel
            stepIdx={stepIdx}
            loadLeftPage={loadLeftPage}
            admin_localAccountObject={admin_localAccountObject.current}
            localAccountObject={localAccountObject.current}
            notifyCreatedOK={() => {
                infoQueryObj.refetch()
            }}
            selectedValue="0"
            onChange={(v) => v}
        ></AdministratorSetupPanel>
    } else {
        showJSX = <LocalUserPanel
            localAccountObject={localAccountObject.current}
            loadLeftPage={loadLeftPage}
            selectedValue="0"
            notifyCreatedOK={() => {
                FN_GetDispatch()(
                    ACTION_callRefreshAll(false)
                )
                // TODO: remove the ugly reload code
                // location.reload()
            }}
            onChange={(v) => v}
        />
    }

    return showJSX
}

export default () => {
    PageUtils.useUpdateTitle(Dot("SGs7B", "Setup Your LafTools Quickly"), [])

    return <div
        className="flex flex-col bg-slate-200 dark:bg-gray-800  text-center p-8 pb-0"
        style={{
            height: `calc(100vh - ${VAL_CSS_MENU_TITLE_PANEL}px)`,
            // paddingBottom:'30px',
            paddingBottom: '0px',
            overflow: 'auto',
        }}
    >
        <div className="" style={{
            flex: 1
        }}>
            <Card style={{
                // minHeight: '400px'
            }} className='w-6/12 flex  mx-auto text-left  '>
                <InnerContent></InnerContent>
            </Card>
        </div>
        <FooterContent></FooterContent>
    </div>
}