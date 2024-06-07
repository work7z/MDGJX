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
  Radio,
  ButtonGroup,
  TextArea,
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
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import GFormInput from "../../components/GFormInput";
import GFormSelect from "../../components/GFormSelect";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormSwitch from "../../components/GFormSwitch";
import GDataTable from "../../components/GDataTable";
import GFormSlider from "../../components/GFormSlider";
import GFormCheckbox from "../../components/GFormCheckbox";
// import GFormSelect from "../../components/GFormSelect";
import _ from "lodash";
import Simple_table from "../simple_table";

const LibraryRuntimeViewer = observer(() => {
  return (
    <div className="each-settings">
      <h2 className="each-setting-title">{t("Node.js Environment")}</h2>
      <div className="each-setting-content">
        <GFormSelect
          list={gstore.preliAllData.formList.lang}
          onChange={(e) => {
            console.log("value is chaging", e, e.target.value);
            gutils.changeLang(e.target.value);
          }}
          value={gstore.preliAllData.configs.lang}
        />
      </div>
    </div>
  );
});

export default observer((props) => {
  let [listVal, onListVal] = useState([]);
  let [chg, onChg] = useState(0);
  useEffect(() => {
    if (props.fn_initWhenMount && _.size(listVal) != 0) {
      props.fn_initWhenMount({
        downloadAll,
      });
    }
  }, [_.size(listVal)]);
  // useEffect(() => {
  // }, [listVal]);
  let thatfunc = async () => {
    let { content } = await gutils.opt("/env_init/list");
    if (props.filterContent) {
      content = props.filterContent(content);
    }
    onListVal(content);
    if (props.fn_checkListVal) {
      props.fn_checkListVal(content);
    }
  };
  let ref_1 = useRef({
    r: 0,
  });
  const [currentLoadingText, on_currentLoadingText] = useState(``);
  useEffect(() => {
    let tmpval = gutils.run_async_loop(async () => {
      let { content } = await gutils.opt("/env_init/msg");
      on_currentLoadingText(content);
      await thatfunc();
    }, 800);
    thatfunc();
    return () => {
      tmpval();
    };
  }, []);
  useEffect(() => {
    let tmpval = gutils.run_async_loop(async () => {
      await thatfunc();
    }, 1000);
    thatfunc();
    return () => {
      tmpval();
    };
  }, []);
  let fn_ischina = gutils.ask_isChina;
  let fn_callDownload = async (x, arg_obj = {}) => {
    let isBasedOnChina = await fn_ischina();
    await gutils.opt(`/env_init/push`, {
      ...x,
      ...(arg_obj || {}),
      isBasedOnChina,
      // files: _.map(x.files, (x) => {
      //   return (
      //     (isBasedOnChina ? nx.base_china : nx.base_global) + x
      //   );
      // }),
    });
    if (arg_obj.noMsgView != true) {
      gutils.alertOk(`Action is pushed, it will be executed soon`);
    }
  };
  let downloadAll = async (optObj) => {
    _.forEach(listVal, (x, d, n) => {
      fn_callDownload(x, { noMsgView: true });
    });
    if (optObj.noMsgView != true) {
      gutils.alertOk(
        `Downloading ${_.size(listVal)} dependencies, please wait a moments...`
      );
    }
  };
  return (
    <div className="settings_general_wrapper">
      <Simple_table
        column={[
          {
            label: t("Library Name"),
            value: (x) => x["label"],
          },
          {
            label: t("Version"),
            value: (x) => x["version"],
          },
          {
            label: t("Installed?"),
            value: (x) =>
              x["val_status"] ? (
                <b>{t(x["status"])}</b>
              ) : (
                <span>{t(x["status"])}</span>
              ),
          },
          {
            label: t("File Size"),
            value: (x) => x["file_size"],
          },
          p_mode()
            ? null
            : {
                label: t("Operation"),
                value: (x) => (
                  <div className="sub-mr-5">
                    <a
                      onClick={async () => {
                        fn_callDownload(x);
                      }}
                    >
                      {t(`Download Library`)}
                    </a>
                    <a
                      onClick={async () => {
                        if (
                          await gutils.confirm(
                            `If you want to reinstall or just delete this library, please click confirm button to continue.`
                          )
                        ) {
                          await gutils.opt("/env_init/del", {
                            prop: x.prop,
                          });
                        }
                      }}
                    >
                      {t(`Delete Library`)}
                    </a>
                    <a
                      onClick={async () => {
                        let isBasedOnChina = await fn_ischina();
                        gutils.w_alertMsgGlobal({
                          cancelText: "Close",
                          icon: "info-sign",
                          width: "600px",
                          s_clzname: "white-app-view",
                          confirmText: "Install",
                          confirmIntent: "primary",
                          title: "Offline Installation",
                          jsx: () => {
                            let [uploadedFiles = [], p_on_uploadedFiles] =
                              useState([]);
                            let on_uploadedFiles = (val) => {
                              window.crt_uploaded_files = val;
                              p_on_uploadedFiles(val);
                            };
                            return (
                              <div>
                                <h2>
                                  {t(`Download Sources`) +
                                    (isBasedOnChina ? `(China)` : `(Global)`)}
                                </h2>
                                <ul>
                                  {_.map(x.files, (xx, dd) => {
                                    xx = isBasedOnChina
                                      ? xx.link_china
                                      : xx.link_global;
                                    return (
                                      <li key={dd}>
                                        <a href={xx} target="_blank">
                                          {xx}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <p>
                                  {t(
                                    `If you cannot access the internet on this PC currently, please download the file on another PC by the link above, copy it to this PC via USB or another medium, then you can install this library by uploading these files. Meanwhile, please keep these file's names so as to distinguish them.`
                                  )}
                                </p>
                                <h2>
                                  {t(
                                    `Please add these required files into the listings below`
                                  )}
                                </h2>
                                <p>
                                  <ul>
                                    {_.map(uploadedFiles, (x, d, n) => {
                                      return (
                                        <li key={d} title={x.uid}>
                                          {x.name}
                                          <a
                                            style={{ marginLeft: "5px" }}
                                            onClick={() => {
                                              on_uploadedFiles(
                                                gutils.pickArr(uploadedFiles, d)
                                              );
                                            }}
                                          >
                                            {t(`Remove`)}
                                          </a>
                                        </li>
                                      );
                                    })}
                                    <li>
                                      <a
                                        href={"javascript:void(0);"}
                                        onClick={() => {
                                          gutils.selectFile(
                                            (fileUidRef, fileInst) => {
                                              let { name, type } = fileInst;
                                              on_uploadedFiles([
                                                ...uploadedFiles,
                                                {
                                                  name: name,
                                                  uid: fileUidRef,
                                                },
                                              ]);
                                              console.log(
                                                "uploaded files",
                                                fileUidRef,
                                                fileInst
                                              );
                                            }
                                          );
                                        }}
                                      >
                                        {t(`Add New Item`)}
                                      </a>
                                    </li>
                                  </ul>
                                </p>
                              </div>
                            );
                          },
                          onCancel() {},
                          onConfirm: async () => {
                            let uploaded_files = window.crt_uploaded_files;
                            window.testing_x = x;
                            if (!_.isEmpty(uploaded_files)) {
                              let allFileLinks = _.map(x.files, (xx, dd) => {
                                return _.chain(
                                  isBasedOnChina
                                    ? xx.link_china
                                    : xx.link_global
                                )
                                  .split("/")
                                  .last()
                                  .trim()
                                  .value();
                              });
                              let findNoAddArr = [];
                              _.forEach(allFileLinks, (x, d, n) => {
                                let myidx = _.findIndex(
                                  uploaded_files,
                                  (eachItem) => eachItem.name == x
                                );
                                if (myidx === -1) {
                                  findNoAddArr.push(x);
                                }
                              });
                              if (!_.isEmpty(findNoAddArr)) {
                                await gutils.win_alert(
                                  `Cannot handle this action due to fact that there are some required files that cannot be found in your added files, please ensure the file name is matched exactly. \n {0}`,
                                  _.join(findNoAddArr, "\n")
                                );
                                return false;
                              } else {
                                gutils.alertOk(
                                  `Added the files successfully, the action will be triggered soon.`
                                );
                                fn_callDownload(x, {
                                  localBundles: uploaded_files,
                                });
                              }
                            } else {
                              await gutils.win_alert(
                                `Please add the required files`
                              );
                              return false;
                              // window.crt_uploaded_files
                            }
                          },
                        });
                      }}
                    >
                      {t(`Offline Install`)}
                    </a>
                  </div>
                ),
              },
        ].filter((x) => !_.isNil(x))}
        data={listVal}
      ></Simple_table>
      <div className="mt-5 fr beflex">
        <div>{currentLoadingText}</div>
        <div>
          <ButtonGroup>
            {props.fn_initWhenMount || p_mode() ? (
              ""
            ) : (
              <Button
                intent="primary"
                icon="download"
                onClick={downloadAll}
                text={t(`Download All`)}
              ></Button>
            )}
            {!p_mode() ? (
              <Button
                intent="success"
                icon="folder-open"
                onClick={async () => {
                  let { content } = await gutils.opt("/env_init/getLibDir");
                  console.log("content", content);
                  gutils.openDir(content);
                }}
                text={t(`Open Folder`)}
              ></Button>
            ) : (
              ""
            )}
            <Button
              icon="refresh"
              onClick={async () => {
                await thatfunc();
                gutils.alertOk(`Refreshed`);
              }}
              text={t(`Refresh`)}
            ></Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
});
