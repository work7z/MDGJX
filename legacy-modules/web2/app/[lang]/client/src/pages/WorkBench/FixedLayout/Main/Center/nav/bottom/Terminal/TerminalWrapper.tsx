// LafTools
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3


import { Button, Card, Popover } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import { Dot } from "../../../../../../../../utils/cTranslationUtils";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../../../../../../types/workbench-types";
import { Allotment, AllotmentHandle } from "allotment";
import { FN_GetDispatch, FN_GetState, getAjaxResPayloadValue, getAjaxResPayloadValueAsString } from "../../../../../../../../nocycle";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { useCallback, useMemo, useRef, useState } from "react";
import _ from 'lodash'
import { useGetI18nLangList } from "../../../../../../../../containers/UserAskMultipleDialogs";
import { SessionViewProp } from "../../../../../../../../containers/MultipleSessionLeftView";
import { NoAvailableDataPanel, NoAvailablePanel } from "../../../../../../../../types/workbench-hook";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import SessionSlice, { SessionAttr } from "../../../../../../../../reducers/container/sessionSlice";
import { EachLang } from "../../../../../../../../types/purejs-types-READ_ONLY";
import Blink from "../../../../../../../../components/Blink";
import React, { useEffect, } from 'react';
import { Terminal } from 'xterm';
import "xterm/css/xterm.css";
import * as Xterm from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import { SerializeAddon } from "xterm-addon-serialize";
import { CanvasAddon } from "xterm-addon-canvas";
import { AttachAddon } from "xterm-addon-attach";
import zmodem from "zmodem.js/src/zmodem_browser";
import { Unicode11Addon } from "xterm-addon-unicode11";
import ResizeUtils from "../../../../../../../../utils/ResizeUtils";
import gutils from "../../../../../../../../utils/GlobalUtils";
import { loop } from "../../../../../../../../utils/SyncUtils";
import SpinLoading from "../../../../../../../../components/SpinLoading";
import moment from "moment";
import FileUtils from "../../../../../../../../utils/FileUtils";
import { getWSLink } from "../../../../../../../../reducers/websocketSlice";
import './TerminalWrapper.scss'
import queryString from "query-string";

// this is shit mountain from CodeGen ToolBox v1.x.x
// TODO: refactor it with hook and fcp

let fontSize = 13;
let themeConfig = {
    foreground: "#bbbbbb",
    background: "#141314",
    cursor: "#b5bd68",
    cursorAccent: "#1d1f21",
    selectionBackground: "rgba(255, 255, 255, 0.3)",
    black: "#575757",
    red: "#FF2C6D",
    green: "#19f9d8",
    yellow: "#FFB86C",
    blue: "#45A9F9",
    magenta: "#FF75B5",
    cyan: "#B084EB",
    white: "#CDCDCD",
    brightBlack: "#757575",
    brightRed: "#FF2C6D",
    brightGreen: "#19f9d8",
    brightYellow: "#FFCC95",
    brightBlue: "#6FC1FF",
    brightMagenta: "#FF9AC1",
    brightCyan: "#BCAAFE",
    brightWhite: "#E6E6E6",
}
let termProps = {
    themeConfig,
};
let config = {
    hotkey: "Control+2",
    sshReadyTimeout: 50000,
    scrollback: 3000,
    onStartSessions: [],
    fontSize: fontSize,
    fontFamily: "mono, courier-new, courier, monospace",
    execWindows: "System32/WindowsPowerShell/v1.0/powershell.exe",
    execMac: "zsh",
    execLinux: "bash",
    execWindowsArgs: [],
    execMacArgs: [],
    execLinuxArgs: [],
    enableGlobalProxy: false,
    disableSshHistory: false,
    disableTransferHistory: false,
    terminalBackgroundImagePath: "",
    terminalBackgroundFilterOpacity: 1,
    terminalBackgroundFilterBlur: 1,
    terminalBackgroundFilterBrightness: 1,
    terminalBackgroundFilterGrayscale: 0,
    terminalBackgroundFilterContrast: 1,
    rendererType: "canvas",
    // terminalType: "xterm-256color",
    terminalType: "xterm-color",
    keepaliveCountMax: 10,
    saveTerminalLogToFile: false,
    checkUpdateOnStart: true,
    cursorBlink: false,
    cursorStyle: "block",
    useSystemTitleBar: false,
    opacity: 1,
    defaultEditor: "",
    confirmBeforeExit: false,
    initDefaultTabOnStart: true,
};

type TerminalState = {
    id: string,
    loading: boolean,
    loadingMsg: string | null,
    lines: string[],
    terminalService: {
        status: string,
        message: string,
        token: string,
        timestamp: number,
    }
}
type Fn = () => any
class TerminalWrapper extends React.PureComponent<{ SessionId: string }, TerminalState> {
    term: Terminal | null = null;
    fitAddon: FitAddon | null = null;
    searchAddon: SearchAddon | null = null;
    unicode11Addon: Unicode11Addon | null = null;
    serializeAddon: SerializeAddon | null = null;
    attachAddon: AttachAddon | null = null;
    mainSocket: WebSocket | null = null;
    optSocket: WebSocket | null = null;
    cleanUpArr: Fn[] = [];
    _initialized: boolean = false;

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.SessionId,
            loading: false,
            loadingMsg: null,
            lines: [],
            terminalService: {
                status: "OK",
                message: "N/A",
                token: "N/A",
                timestamp: 0,
            },
        };
    }
    // life cycle
    componentWillUnmount() {
        this.__isComponentUnmounted = true;
        this.closeTerminal();
    }

    componentDidMount() {
        this.initTerminal();
    }

    // internal functions
    initTerminal = async () => {
        try {
            await this.___updateSocketConfig({ silent: true });
            const { id } = this.state;
            const term = new Terminal({
                allowProposedApi: true,
                scrollback: config.scrollback,
                rightClickSelectsWord: false,
                fontFamily: config.fontFamily,
                theme: themeConfig,
                allowTransparency: true,
                cursorStyle: "block",
                cursorBlink: config.cursorBlink,
                fontSize: config.fontSize,
                // rendererType: "canvas" as any,
            });
            this.term = term;
            this.fitAddon = new FitAddon();
            this.searchAddon = new SearchAddon();
            this.unicode11Addon = new Unicode11Addon();
            this.serializeAddon = new SerializeAddon();
            if (!term) {
                throw new Error("term is null");
            };
            term.loadAddon(this.serializeAddon);
            term.loadAddon(this.unicode11Addon);
            // activate the new version
            term.unicode.activeVersion = "11";
            term.loadAddon(this.fitAddon);
            term.loadAddon(this.searchAddon);
            term.loadAddon(new WebLinksAddon());
            let ele = document.getElementById(id)
            if (!ele) { throw new Error("ele is null") }
            term.open(ele);
            term.loadAddon(new CanvasAddon());
            if (!term.textarea) { throw new Error("term.textarea is null") }
            term.textarea.addEventListener("focus", this.___setActive);
            term.onResize(this.___onResizeTerminal);
            ResizeUtils.register(this.state.id, () => {
                this.___onFitTerminalLayout();
            })
            await this.___resumeHistory(term);
            // init websocket
            await this.___initTerm();
            await this.___initOpt();
            gutils.defer(() => {
                this.fitAddon && this.fitAddon.fit();
            });
            let fn = async (times: number): Promise<boolean> => {
                console.log('idx', times)
                if (this.__isComponentUnmounted) {
                    return false;
                }
                await this.___updateSocketConfig();
                return true;
            }
            let r = loop(fn, 2000)
            this.cleanUpArr.push(r)
        } catch (e) {
            console.log("e", e);
            if (e instanceof Error) {
                AlertUtils.popError(e as Error)
            } else {
                // To check, AlertUtils.popError(e)
            }
            throw e;
        }
    };

    __isComponentUnmounted = false;

    closeTerminal = async () => {
        _.forEach(this.cleanUpArr, (x, d, n) => {
            x();
        });
        ResizeUtils.unregister(this.state.id)
        if (this.optSocket) {
            this.optSocket.send(
                JSON.stringify({
                    type: "quit",
                    uid: this.state.id,
                })
            );
        }
        this.mainSocket?.close()
        this.optSocket?.close()
        this.___clearTerminal();
    };

    ___clearTerminal = () => {
        this.term?.clear();
        this.term?.focus();
    };

    ___updateSocketConfig = async (execArg: { silent?: boolean } = {}) => {
        _.defaultsDeep(execArg, {
            silent: false,
        });
        try {
            if (execArg.silent) {
                this.setState({
                    loading: true,
                    loadingMsg: Dot("cQqwI8r", `Loading the status of Terminal Service`),
                });
            }
            // let content = await cutils.getTaskInfo({
            //     prop: "SwiftTerminal",
            // });
            // let terminalService = _.get(content, "task.configFileAsMap");
            // if (
            //     _.isEmpty(terminalService) ||
            //     _.get(terminalService, "status") != "OK"
            // ) {
            //     if (_.isNil(this.___key_triggerStart)) {
            //         this.___key_triggerStart = true;
            //         gutils.defer(async () => {
            //             await cutils.enableTaskInfo({
            //                 prop: "SwiftTerminal",
            //             });
            //             gutils.defer(async () => {
            //                 this.reconnectTerminal();
            //             });
            //             setTimeout(() => {
            //                 fn_refresh_tabs();
            //             }, 3000);
            //         });
            //     }
            // }
            // if (
            //     !_.isEmpty(terminalService) &&
            //     !_.isEqual(this.state.terminalService, terminalService)
            // ) {
            //     this.setState({
            //         terminalService: terminalService,
            //     });
            // }
            // this.setState({
            //     terminalService: terminalService,
            // });
            this.setState({
                loading: false,
                loadingMsg: null,
            });
            // return content;
        } catch (e) {
            this.setState({
                loading: false,
                loadingMsg: null,
            });
            throw e;
        }
    };

    ___getWsHost = () => {
        return `ws://${window.location.host}`;
    };
    getConcatParams = (): string => {
        // TODO: combine sessionId
        return queryString.stringify({
            SessionId: this.props.SessionId
        })
    }

    ___initOpt = async () => {
        if (true) {
            return;
        }
        // const wsUrl = getWSLink('/ws/pty/opt', this.getConcatParams());
        // const socket = new WebSocket(wsUrl);
        // this.optSocket = socket;
        // // alert("Inited");
        // await new Promise<void>((e) => {
        //     if (this.optSocket) {
        //         this.optSocket.onopen = () => {
        //             e();
        //         };
        //     }
        // });
    };

    ___onResizeTerminal = async (size) => {
        if (size) {
            if (!this.term || !this.optSocket) {
                return;
            }
            if (!_.isEmpty(size)) {
                const { cols, rows } = size;
                this.term.resize(cols, rows);
                this.optSocket.send(
                    JSON.stringify({
                        type: "resize",
                        uid: this.state.id,
                        cols,
                        rows,
                    })
                );
            }
            this.___onFitTerminalLayout();
        }
    };

    ___onFitTerminalLayout = () => {
        this.fitAddon && this.fitAddon.fit();
    };

    ___getQueryStrForSocket = () => {
        return `?token=${this.state.terminalService.token}`;
    };

    ___initTerm = async () => {
        if (true) {
            return;
        }
        // const { term } = this;
        // if (!term) { return; }
        // const wsUrl = getWSLink("/ws/pty/term");
        // const socket = new WebSocket(wsUrl);
        // socket.binaryType = "arraybuffer";
        // this.attachAddon = new AttachAddon(socket);
        // term.loadAddon(this.attachAddon);
        // this.mainSocket = socket;
        // await new Promise<void>((e, r) => {
        //     if (!this.mainSocket) {
        //         return;
        //     }
        //     this.mainSocket.onopen = () => {
        //         socket.addEventListener("message", () => {
        //             this.___notifyOnData();
        //         });
        //         this._initialized = true;
        //         e();
        //     };
        // });
    };

    ___resumeHistory = async (term) => {
        // TODO: resume your history if needed
        const str = '' // await ls.getItem(this.state.id);
        if (str) {
            term.write(str);
        }
    };

    ___serializeTerminalData = () => {
        if (!this.serializeAddon) { return null; }
        return this.serializeAddon.serialize();
    };

    ___notifyOnData = _.throttle(() => {
        gutils.defer(async () => {
            // TODO: resume your history if needed
            // const str = this.___serializeTerminalData();
            // const id = createLsId(this.state.id);
            // await ls.setItem(id, str);
        });
    }, 1500);

    ___setActive = () => {
        //
    };

    destroyTerminal = async () => { };

    reconnectTerminal = async () => {
        try {
            await this.destroyTerminal();
            await this.closeTerminal();
            await this.initTerminal();
            this.___onFitTerminalLayout();
        } catch (e) {
            console.log("e", e);
        }
    };

    render() {
        let isLoading = this.state.loading;
        let terminalService = this.state.terminalService;
        let notOK = terminalService.status != "OK";
        let fn_mapBtn = (x, d, n) => {
            return (
                <Button
                    small={true}
                    outlined={true}
                    text={x.text}
                    icon={x.icon}
                    intent={'none'
                    }
                    className="btn-white"
                    minimal={false}
                    onClick={x.onClick}
                ></Button >
            );
        };
        let processArr = [
            // {
            //     intent: "primary",
            //     text: Dot("pA_feeJ", `Reconnect Terminal`),
            //     onClick: async () => {
            //         await this.reconnectTerminal();
            //         AlertUtils.popOK(Dot("JQLmSq", "Completed."))
            //     },
            // },
            {
                intent: "none",
                text: Dot("dsdpA_eJ", `Adjust Size`),
                onClick: () => {
                    this.___onFitTerminalLayout();
                    AlertUtils.popOK(Dot("JQLmS", "Adjusted the size"))
                },
            },
            {
                intent: "none",
                text: Dot("pA_qweJ", `Clear Buffer`),
                onClick: () => {
                    this.___clearTerminal();
                },
            },
            {
                intent: "none",
                text: Dot("pA_deJ", `Export to Clipboard`),
                onClick: () => {
                    const str = this.___serializeTerminalData();
                    AlertUtils.copyWithAlertCopied(str || "")
                },
            },
            {
                intent: "none",
                text: Dot("psA_eJ", `Export as File`),
                onClick: () => {
                    const str = this.___serializeTerminalData();
                    FileUtils.exportAsFile(`${Date.now()}-term.txt`, str || "N/A");
                },
            },
        ]

        return (
            <SpinLoading
                loadingJSX={
                    <p>
                        {this.state.loadingMsg ||
                            Dot("8mn_qa", `Retrieving the data from terminal services...`)}
                    </p>
                }
                loading={isLoading}
            >
                <div
                    style={{ opacity: notOK ? 0 : 1 }}
                    className={`relative ${["gterm-global-wrapper"]} `}
                >

                    <div
                        id={this.state.id}
                        style={{
                            background: _.get(themeConfig, "background"),
                        }}
                        className={` ${"gterm-core-body"} z-40 `}
                    ></div>

                    <div className={`${["gterm-header"]} `}>
                        <div className="sub-ml-5 ">
                            {
                                processArr.map(fn_mapBtn)
                            }

                        </div>
                        <div className="sub-ml-5">
                            {[
                                {
                                    intent: "none",
                                    text: ``,
                                    icon: "plus",
                                    onClick: () => {
                                        // fontSize ++ for term
                                        if (this.term) {
                                            let opt = this.term?.options
                                            opt.fontSize++;
                                            this.___onFitTerminalLayout();
                                        }
                                        // this.props.PUtils.crtModel.config.fontSize++;
                                    },
                                },
                                {
                                    intent: "none",
                                    text: ``,
                                    icon: "minus",
                                    onClick: () => {
                                        if (this.term) {
                                            let opt = this.term?.options
                                            opt.fontSize--;
                                            this.___onFitTerminalLayout();
                                        }
                                        // this.props.PUtils.crtModel.config.fontSize--;
                                    },
                                },
                                // {
                                //     intent: "primary",
                                //     text: ``,
                                //     icon: "cog",
                                //     onClick: () => {
                                //         // gstore.localUserConfig.drawer.open = true;
                                //         // gstore.localUserConfig.drawer.tabId = "processes";
                                //     },
                                // },
                            ].map(fn_mapBtn)}
                        </div>
                    </div>
                    {/* <div className="absolute right-2 bottom-2 z-50" >
                        <Button minimal icon="cog"></Button>
                    </div> */}
                </div>
            </SpinLoading>
        );
    }
}

export default TerminalWrapper;