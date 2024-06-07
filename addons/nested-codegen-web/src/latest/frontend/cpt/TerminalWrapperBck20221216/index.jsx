const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GSyncSelectWithFilter,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  GFormInput,
  ButtonGroup,
  TextArea,
  Intent,
  observer,
  Position,
  Toaster,
  Checkbox,
  ContextMenu,
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
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
  Spinner,
  Callout,
  PanelStack,
  gstore,
  AnchorButton,
  Tooltip,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Menu,
  MenuItem,
  MenuDivider,
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
  BluePrintDocs,
  BluePrintCpt,
  observable,
  gutils,
  ReactDOM,
  useStores,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  Provider,
  Router,
  inject,
  Html_select,
  BeautifyCodeCommon,
  prettier,
  xmlutils,
  createHistory,
  withRouter,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import "./index.less";
import createLsId from "./build-ls-term-id";
import * as ls from "./safe-local-storage";
import myfileLess from "./index.less";
import SpinLoading from "../SpinLoading";
import cutils from "../../kit/common_utils";
let { Terminal } = window.Xterm;
let classnames = (...arr) => {
  return arr.join(" ");
};

class TerminalWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: _.uniqueId("id"),
      loading: false,
      loadingMsg: null,
      lines: [],
      terminalService: {
        port: "-1",
        status: "NOT_YET_RAN",
        message: "N/A",
        token: "N/A",
        timestamp: 0,
      },
    };
  }
  fitAddon = null;
  searchAddon = null;
  serializeAddon = null;
  cleanUpArr = [];
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
    await this.___updateSocketConfig({ silent: true });
    let { PUtils } = this.props;
    const { id } = this.state;
    const { themeConfig, tab = {}, config = {} } = this.props;
    const term = new Terminal({
      allowProposedApi: true,
      scrollback: config.scrollback,
      rightClickSelectsWord: config.rightClickSelectsWord || false,
      fontFamily: tab.fontFamily || config.fontFamily,
      theme: themeConfig,
      allowTransparency: true,
      cursorStyle: config.cursorStyle,
      cursorBlink: config.cursorBlink,
      fontSize: tab.fontSize || config.fontSize,
      rendererType: config.rendererType,
    });
    this.term = term;
    this.fitAddon = new FitAddon();
    this.searchAddon = new SearchAddon();
    this.unicode11Addon = new Unicode11Addon();
    this.serializeAddon = new SerializeAddon();
    term.loadAddon(this.serializeAddon);
    term.loadAddon(this.unicode11Addon);
    // activate the new version
    term.unicode.activeVersion = "11";
    term.loadAddon(this.fitAddon);
    term.loadAddon(this.searchAddon);
    term.loadAddon(new WebLinksAddon());
    term.open(document.getElementById(id), true);
    term.loadAddon(new CanvasAddon());
    term.textarea.addEventListener("focus", this.___setActive);
    term.onResize(this.___onResizeTerminal);
    gutils.anyResizeTriggerArr["uid" + this.props.uid] = () => {
      gutils.defer(() => {
        this.___onFitTerminalLayout();
      }, 10);
    };
    await this.___resumeHistory(term);
    // init websocket
    await this.___initOpt();
    await this.___initSocket();
    gutils.defer(() => {
      this.fitAddon.fit();
    });
    this.cleanUpArr.push(
      PUtils.loop(async () => {
        if (this.__isComponentUnmounted) {
          return false;
        }
        await this.___updateSocketConfig();
      }, 2000)
    );
  };

  __isComponentUnmounted = false;

  closeTerminal = async () => {
    _.forEach(this.cleanUpArr, (x, d, n) => {
      x();
    });
    delete gutils.anyResizeTriggerArr["uid" + this.props.uid];
    this.optSocket.send(
      JSON.stringify({
        type: "quit",
        uid: this.props.uid,
      })
    );
    cutils.close(this.mainSocket);
    cutils.close(this.optSocket);
    this.___clearTerminal();
  };

  ___clearTerminal = () => {
    this.term.clear();
    this.term.focus();
  };

  ___updateSocketConfig = async (execArg = {}) => {
    _.defaultsDeep(execArg, {
      silent: false,
    });
    try {
      if (execArg.silent) {
        this.setState({
          loading: true,
          loadingMsg: t(`Loading the status of Terminal Service`),
        });
      }
      let content = await cutils.getTaskInfo({
        prop: "SwiftTerminal",
      });
      let terminalService = _.get(content, "task.configFileAsMap");
      if (
        _.isEmpty(terminalService) ||
        _.get(terminalService, "status") != "OK"
      ) {
        if (_.isNil(this.___key_triggerStart)) {
          this.___key_triggerStart = true;
          gutils.defer(async () => {
            await cutils.enableTaskInfo({
              prop: "SwiftTerminal",
            });
            gutils.defer(async () => {
              this.reconnectTerminal();
            });
            setTimeout(() => {
              fn_refresh_tabs();
            }, 3000);
          });
        }
      }
      if (
        !_.isEmpty(terminalService) &&
        !_.isEqual(this.state.terminalService, terminalService)
      ) {
        this.setState({
          terminalService: terminalService,
        });
      }
      this.setState({
        loading: false,
        loadingMsg: null,
      });
      return content;
    } catch (e) {
      this.setState({
        loading: false,
        loadingMsg: null,
      });
    }
  };

  ___getWsHost = () => {
    return `ws://${location.hostname}:${this.state.terminalService.port}`;
  };

  ___initOpt = async () => {
    const wsUrl = `${this.___getWsHost()}/opt${this.___getQueryStrForSocket()}`;
    const socket = new WebSocket(wsUrl);
    this.optSocket = socket;
    await new Promise((e) => {
      this.optSocket.onopen = () => {
        e();
      };
    });
  };

  ___onResizeTerminal = async (size) => {
    if (size) {
      if (!_.isEmpty(size)) {
        const { cols, rows } = size;
        this.term.resize(cols, rows);
        this.optSocket.send(
          JSON.stringify({
            type: "resize",
            uid: this.props.uid,
            cols,
            rows,
          })
        );
      }
      this.___onFitTerminalLayout();
    }
  };

  ___onFitTerminalLayout = (size) => {
    this.fitAddon.fit();
  };

  ___getQueryStrForSocket = () => {
    return `?uid=${this.props.uid}&token=${this.state.terminalService.token}`;
  };

  ___initSocket = async () => {
    const { term } = this;
    const wsUrl = `${this.___getWsHost()}/socket${this.___getQueryStrForSocket()}`;
    const socket = new WebSocket(wsUrl);
    this.attachAddon = new AttachAddon(socket);
    term.loadAddon(this.attachAddon);
    this.mainSocket = socket;
    await new Promise((e, r) => {
      this.mainSocket.onopen = () => {
        socket.addEventListener("message", () => {
          this.___notifyOnData();
        });
        term._initialized = true;
        e();
      };
    });
  };

  ___resumeHistory = async (term) => {
    const str = await ls.getItem(this.props.uid);
    if (str) {
      term.write(str);
    }
  };

  ___serializeTerminalData = () => {
    return this.serializeAddon.serialize();
  };
  ___notifyOnData = _.throttle(() => {
    gutils.defer(async () => {
      const str = this.___serializeTerminalData();
      const id = createLsId(this.props.uid);
      await ls.setItem(id, str);
      // notify some data to the user
    });
  }, 1500);

  ___setActive = () => {
    //
  };

  destroyTerminal = async () => {
    // await new Promise((ok) => {
    //   this.optSocket.onmessage((ev) => {
    //     window.ev__000 = ev;
    //   });
    // });
    // this.___initSocket.send(
    //   JSON.stringify({
    //     type: "kill",
    //   })
    // );
  };

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
    if (gutils.dev()) {
      window.tmp_0 = this;
    }
    // if (gstore.apiInfo.server_using_windows) {
    //   return (
    //     <div style={{ padding: "15px" }} className="wp-fixed-plugin-load-view">
    //       <h1>
    //         {t(`Sorry, this extension has not yet supported Windows platform.`)}
    //       </h1>
    //       <p>
    //         {t(`Extension ID: `)}
    //         {this.props.PUtils.crtStoreName}
    //       </p>
    //       <p>
    //         {t(`This extension is still evolving...`)}
    //         {t(
    //           `Since the limitation of performance and native supports, the extension is currently only available on Linux or Darwin OS, you use it on other platforms.`
    //         )}
    //         {t(
    //           `Regarding Windows platform supports, we are firmly convinced that it will be released in the future, please kindly stay tuned.`
    //         )}
    //       </p>
    //     </div>
    //   );
    // }
    window.test009 = this;
    const { themeConfig } = this.props;
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
          intent={x.intent}
          onClick={x.onClick}
        ></Button>
      );
    };
    if (notOK) {
      if (_.isNil(localStorage.getItem("fixedthem"))) {
        localStorage.setItem("fixedthem", "ok");
        setTimeout(() => {
          gutils.alertOk("System will reload later, please wait a moments.");
          location.reload();
        }, 2000);
      }
    }
    return (
      <SpinLoading
        loadingJSX={
          <p>
            {this.state.loadingMsg ||
              t(`Retrieving the data from terminal services...`)}
          </p>
        }
        loading={isLoading}
      >
        {notOK ? (
          <div className="sys-card-wrapper" style={{ padding: "0 30px" }}>
            <h1 style={{ textAlign: "center" }}>
              {t(`The terminal service is loading or being suspended`)}
            </h1>
            <p style={{ textAlign: "center" }}>
              {t(
                `It appears that the terminal is loading or being suspended, trouble you wait a moment. If the UI keeps showing this message, you can restart services and check the logs by clicking the button below.`
              )}
            </p>
            <ul>
              <li>
                {t(`Status: `)}
                {terminalService.status}
              </li>
              <li>
                {t(`Message: `)}
                {terminalService.message}
              </li>
              <li>
                {t(`Token: `)}
                {terminalService.token}
              </li>
              <li>
                {t(`Port: `)}
                {terminalService.token}
              </li>
              <li>
                {t(`Timestamp: `)}
                {Moment(parseInt(terminalService.timestamp)).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </li>
            </ul>
            <p>
              <div style={{ marginBottom: "5px" }}>{t(`More Operations`)}:</div>
              <div>
                <Button
                  onClick={() => {
                    gstore.localUserConfig.drawer.open = true;
                    gstore.localUserConfig.drawer.tabId = "processes";
                  }}
                  text={t(`View Integrated Service Panel`)}
                ></Button>
              </div>
            </p>
          </div>
        ) : (
          ""
        )}
        <div
          style={{ opacity: notOK ? 0 : 1 }}
          className={` ${myfileLess["gterm-global-wrapper"]} `}
        >
          <div className={`${myfileLess["gterm-header"]} `}>
            <div className="sub-mr-5 ">
              {[
                {
                  intent: "primary",
                  text: t(`Reconnect Terminal`),
                  onClick: async () => {
                    await this.reconnectTerminal();
                    gutils.alertOk(`Done.`);
                  },
                },
                {
                  intent: "none",
                  text: t(`Adjust Size`),
                  onClick: () => {
                    this.___onFitTerminalLayout();
                    gutils.alertOk("Adjusted the size");
                  },
                },
                {
                  intent: "none",
                  text: t(`Clear Buffer`),
                  onClick: () => {
                    this.___clearTerminal();
                  },
                },
                {
                  intent: "none",
                  text: t(`Export to Clipboard`),
                  onClick: () => {
                    const str = this.___serializeTerminalData();
                    gutils.copy(str);
                    gutils.alertOk(`Copied`);
                  },
                },
                {
                  intent: "none",
                  text: t(`Export as File`),
                  onClick: () => {
                    const str = this.___serializeTerminalData();
                    cutils.exportAsFile(`${Date.now()}-term.txt`, str);
                  },
                },
              ].map(fn_mapBtn)}
            </div>
            <div className="sub-ml-5 ">
              {[
                {
                  intent: "none",
                  text: ``,
                  icon: "plus",
                  onClick: () => {
                    this.props.PUtils.crtModel.config.fontSize++;
                  },
                },
                {
                  intent: "none",
                  text: ``,
                  icon: "minus",
                  onClick: () => {
                    this.props.PUtils.crtModel.config.fontSize--;
                  },
                },
                {
                  intent: "primary",
                  text: ``,
                  icon: "cog",
                  onClick: () => {
                    gstore.localUserConfig.drawer.open = true;
                    gstore.localUserConfig.drawer.tabId = "processes";
                  },
                },
              ].map(fn_mapBtn)}
            </div>
          </div>
          <div
            id={this.state.id}
            style={{
              background: _.get(themeConfig, "background"),
            }}
            className={` ${myfileLess["gterm-core-body"]}  `}
          ></div>
          {/* <div className={` ${myfileLess["gterm-footer"]} `}>footer</div> */}
        </div>
      </SpinLoading>
    );
  }
}

export default observer(TerminalWrapper);
