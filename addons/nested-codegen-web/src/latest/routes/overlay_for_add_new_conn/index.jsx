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
  Tabs,
  Tab,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  Menu,
  MenuItem,
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
import React from "react";
import ReactDOM from "react-dom";
import { Select } from "@blueprintjs/select";
import gutils from "../../utils";
import { useState, useEffect } from "react";

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
import {autorun, observable, reaction}  from 'mobx'
import gstore from "../../store.jsx";
import "./index.less";
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
import DialogCommon from "../dialog_common";
import GTabCentreView from "../../components/GTabCentreView/index";
import GFormBoundView from "../../components/GFormBoundView/index";
import GSyncSelectWithFilter from "../../components/GSyncSelectWithFilter";
import DownloadStatus from "../../components/DownloadStatus";
import GFormInput from "../../components/GFormInput";
import GFormCheckbox from "../../components/GFormCheckbox";
import _ from "lodash";
import CallOutAndView from "../../components/CallOutAndView";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";

export default observer(() => {
  const [updateRef, onUpdateRef] = useState(10);
  useEffect(() => {
    let stopRef2 = reaction(
      () => {
        return [
          gstore.databaseAllData.addNewConnPageData.updateRef,
          gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP,
        ];
      },
      () => {
        console.log("func update now", updateRef);
        onUpdateRef(updateRef + 1);
      }
    );
    return () => {
      stopRef2();
    };
  }, [
    gstore.databaseAllData.addNewConnPageData.updateRef,
    gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP,
  ]);

  let checkAndConcatJdbcLink = async () => {
    // const addModel = gstore.databaseAllData.addNewConnPageData.addModel;
    // let chkReturnJdbcRes = await gutils.opt("/dblink/check-and-return-jdbc", {
    //   MODEL: addModel,
    // });
    // if (
    //   chkReturnJdbcRes &&
    //   chkReturnJdbcRes.content &&
    //   !_.isEmpty(chkReturnJdbcRes.content)
    // ) {
    //   let { JDBC_URL, JDBC_PROPER_USERNAME, JDBC_PROPER_PASSWORD } =
    //     chkReturnJdbcRes.content;
    //   addModel.JDBC_URL = JDBC_URL;
    //   addModel.JDBC_PROPER_USERNAME = JDBC_PROPER_USERNAME;
    //   addModel.JDBC_PROPER_PASSWORD = JDBC_PROPER_PASSWORD;
    //   // if (addModel.JDBC_URL != JDBC_URL) {
    //   // console.log("chkReturnJdbcRes content", JDBC_URL);
    //   // }
    // }
  };
  // let checkAndConcatJdbcLink_wrap = _.throttle(checkAndConcatJdbcLink, 3000);

  useEffect(() => {
    const stopRef = autorun(() => {
      const addModel = gstore.databaseAllData.addNewConnPageData.addModel;
      let confirmDisable = true;
      let authTypeProp =
        gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP;

      const onDisableRight = (val) => {
        // gstore.databaseAllData.addNewConnPageData.isAddModelPass = val;
        // gstore.databaseAllData.overlay_addNewConn.confirmDisable = val;
        gstore.databaseAllData.addNewConnPageData.isAddModelPass = !val;
      };
      let connectionValidConditions = [
        {
          value: addModel.CONNECTION_NAME,
          max: 90,
        },
        {
          value: addModel.CONNECTION_BRIEF,
          max: 450,
        },
      ];
      let c_host = {
        value: addModel.HOST,
        max: 100,
      };
      let c_password = {
        value: addModel.PASSWORD,
        max: 200,
      };
      let c_port = {
        value: addModel.PORT,
        max: 100,
      };
      let c_username = {
        value: addModel.USERNAME,
        max: 100,
      };
      let c_database = {
        value: addModel.DEFAULT_DATABASE,
        max: 100,
      };
      let is_h2embedded = addModel.DBTYPE_ID == "h2embedded";
      window.temp_addModel = addModel;
      switch (authTypeProp) {
        case "custom":
          confirmDisable = is_h2embedded
            ? gutils.anyEmpty([addModel.JDBC_URL, addModel.CONNECTION_NAME]) ||
              gutils.anyMax([...connectionValidConditions])
            : gutils.anyEmpty([
                addModel.USERNAME,
                addModel.JDBC_URL,
                addModel.CONNECTION_NAME,
              ]) || gutils.anyMax([...connectionValidConditions]);
          break;
        case "pg_native":
        case "general":
          confirmDisable =
            gutils.anyEmpty([
              addModel.HOST,
              addModel.PORT,
              addModel.DEFAULT_DATABASE,
              addModel.USERNAME,
              addModel.CONNECTION_NAME,
            ]) ||
            gutils.anyMax([
              ...connectionValidConditions,
              c_host,
              c_password,
              c_port,
              c_username,
              c_database,
            ]);
          break;
        case "h2_fs_system":
          confirmDisable =
            gutils.anyEmpty([addModel.H2_FILEPATH, addModel.CONNECTION_NAME]) ||
            gutils.anyMax([...connectionValidConditions]);
          break;
        case "oracle_sid":
        case "oracle_service_name":
          confirmDisable =
            gutils.anyEmpty([
              addModel.HOST,
              addModel.ORACLE_ROLE_STR,
              addModel.PORT,
              addModel.DEFAULT_DATABASE,
              addModel.USERNAME,
              addModel.CONNECTION_NAME,
            ]) ||
            gutils.anyMax([
              ...connectionValidConditions,
              c_host,
              c_password,
              c_port,
              c_username,
              c_database,
            ]);
          break;
      }

      console.log("act that logic", authTypeProp, confirmDisable, addModel);

      checkAndConcatJdbcLink();

      onDisableRight(confirmDisable);
    });
    // console.log("handling current logic", addModel)
    return () => {
      stopRef();
    };
  }, []);
  let jsx_username_password = (
    <GFormBoundView
      label={t("Authentication")}
      jsx={() => {
        return (
          <div>
            <div className="full-one-box">
              <FormGroup
                label={gutils.fn_createWithRed("Username")}
                inline={true}
              >
                <GFormInput
                  small={true}
                  placeholder={t("i.e. database username")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME =
                      val;
                  }}
                />
              </FormGroup>
            </div>
            <div className="server-config-check-box">
              <FormGroup label={t("Password")} inline={true}>
                <GFormInput
                  small={true}
                  type={"password"}
                  placeholder={t("i.e. database password")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD =
                      val;
                  }}
                />
              </FormGroup>
              <div>
                <GFormCheckbox
                  list={[
                    {
                      label: t("Save Password Locally"),
                      value: "SAVE",
                    },
                  ]}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel
                      .SAVE_PASSWORD_LOCALLY == 1
                      ? ["SAVE"]
                      : []
                  }
                  onChange={() => {
                    gstore.databaseAllData.addNewConnPageData.addModel.SAVE_PASSWORD_LOCALLY =
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .SAVE_PASSWORD_LOCALLY == 1
                        ? 0
                        : 1;
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  let jsx_username_password_with_not_mandatory = (
    <GFormBoundView
      label={t("Authentication")}
      jsx={() => {
        return (
          <div>
            <div className="full-one-box">
              <FormGroup label={t("Username")} inline={true}>
                <GFormInput
                  small={true}
                  placeholder={t("i.e. database username (Optional)")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME =
                      val;
                  }}
                />
              </FormGroup>
            </div>
            <div className="server-config-check-box">
              <FormGroup label={t("Password")} inline={true}>
                <GFormInput
                  small={true}
                  type={"password"}
                  placeholder={t("i.e. database password (Optional)")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD =
                      val;
                  }}
                />
              </FormGroup>
              <div>
                <GFormCheckbox
                  list={[
                    {
                      label: t("Save Password Locally"),
                      value: "SAVE",
                    },
                  ]}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel
                      .SAVE_PASSWORD_LOCALLY == 1
                      ? ["SAVE"]
                      : []
                  }
                  onChange={() => {
                    gstore.databaseAllData.addNewConnPageData.addModel.SAVE_PASSWORD_LOCALLY =
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .SAVE_PASSWORD_LOCALLY == 1
                        ? 0
                        : 1;
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  let jsx_username_password_with_role_for_oracle = (
    <GFormBoundView
      label={t("Authentication")}
      jsx={() => {
        return (
          <div>
            <div className="server-config-box">
              <FormGroup
                label={gutils.fn_createWithRed("Username")}
                inline={true}
              >
                <GFormInput
                  small={true}
                  placeholder={t("i.e. database username")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME =
                      val;
                  }}
                />
              </FormGroup>
              <FormGroup label={gutils.fn_createWithRed("Role")} inline={true}>
                <GSyncSelectWithFilter
                  list={
                    gstore.databaseAllData.addNewConnPageData.formNeeds
                      .oracleRoleList
                  }
                  loading={
                    gstore.databaseAllData.addNewConnPageData.formNeeds
                      .relatedDrivers_loading
                  }
                  obj={gstore.databaseAllData.addNewConnPageData.addModel}
                  index={"ORACLE_ROLE_STR"}
                  whenChg={whenChg}
                />
              </FormGroup>
            </div>

            <div className="server-config-check-box">
              <FormGroup label={t("Password")} inline={true}>
                <GFormInput
                  small={true}
                  type={"password"}
                  placeholder={t("i.e. database password")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD =
                      val;
                  }}
                />
              </FormGroup>
              <div>
                <GFormCheckbox
                  list={[
                    {
                      label: t("Save Password Locally"),
                      value: "SAVE",
                    },
                  ]}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel
                      .SAVE_PASSWORD_LOCALLY == 1
                      ? ["SAVE"]
                      : []
                  }
                  onChange={() => {
                    gstore.databaseAllData.addNewConnPageData.addModel.SAVE_PASSWORD_LOCALLY =
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .SAVE_PASSWORD_LOCALLY == 1
                        ? 0
                        : 1;
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  let jsx_username_password_with_role_for_postgresql = (
    <GFormBoundView
      label={t("Authentication")}
      jsx={() => {
        return (
          <div>
            <div className="full-one-box">
              {/* server-config-box  */}
              <FormGroup
                label={gutils.fn_createWithRed("Username")}
                inline={true}
              >
                <GFormInput
                  small={true}
                  placeholder={t("i.e. database username")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.USERNAME =
                      val;
                  }}
                />
              </FormGroup>
              {/* <FormGroup label={"Role"} inline={true}>
                <GFormInput
                  small={true}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel
                      .PG_ROLE_STR
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.PG_ROLE_STR =
                      val;
                  }}
                />
              </FormGroup> */}
            </div>

            <div className="server-config-check-box">
              <FormGroup label={t("Password")} inline={true}>
                <GFormInput
                  small={true}
                  type={"password"}
                  placeholder={t("i.e. database password")}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD
                  }
                  onChangeDelay={(val) => {
                    gstore.databaseAllData.addNewConnPageData.addModel.PASSWORD =
                      val;
                  }}
                />
              </FormGroup>
              <div>
                <GFormCheckbox
                  list={[
                    {
                      label: t("Save Password Locally"),
                      value: "SAVE",
                    },
                  ]}
                  value={
                    gstore.databaseAllData.addNewConnPageData.addModel
                      .SAVE_PASSWORD_LOCALLY == 1
                      ? ["SAVE"]
                      : []
                  }
                  onChange={() => {
                    gstore.databaseAllData.addNewConnPageData.addModel.SAVE_PASSWORD_LOCALLY =
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .SAVE_PASSWORD_LOCALLY == 1
                        ? 0
                        : 1;
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  let form_general_jsx = (
    <div>
      <GFormBoundView
        label={t("Server")}
        jsx={() => {
          return (
            <div>
              <div className="server-config-box">
                <FormGroup
                  label={gutils.fn_createWithRed("Host")}
                  inline={true}
                >
                  <GFormInput
                    small={true}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel.HOST
                    }
                    onChangeDelay={gutils.delay((val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.HOST =
                        val;
                    })}
                    placeholder={t("e.g. 192.168.2.10")}
                  />
                </FormGroup>
                <FormGroup
                  label={gutils.fn_createWithRed("Port")}
                  inline={true}
                >
                  <GFormInput
                    type={"number"}
                    small={true}
                    placeholder={t("e.g. 3306")}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel.PORT
                    }
                    onChangeDelay={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.PORT =
                        val;
                    }}
                  />
                </FormGroup>
              </div>
              <div className="full-one-box">
                <FormGroup
                  label={gutils.fn_createWithRed("Database")}
                  inline={true}
                >
                  <GFormInput
                    small={true}
                    placeholder={t("e.g. testdb")}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .DEFAULT_DATABASE
                    }
                    onChangeDelay={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.DEFAULT_DATABASE =
                        val;
                    }}
                  />
                </FormGroup>
              </div>
            </div>
          );
        }}
      />
      {jsx_username_password}
    </div>
  );
  let form_custom_jsx = (
    <div>
      <GFormBoundView
        label={t("JDBC Configuration")}
        jsx={() => {
          return (
            <div>
              <div className="full-one-box-with-long-name">
                <FormGroup
                  label={gutils.fn_createWithRed("Jdbc URL")}
                  inline={true}
                >
                  <GFormInput
                    small={true}
                    placeholder={t("e.g. jdbc:xxx://xxxx...")}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .JDBC_URL
                    }
                    onChangeDelay={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.JDBC_URL =
                        val;
                    }}
                  />
                </FormGroup>
              </div>
            </div>
          );
        }}
      />
      {gstore.databaseAllData.addNewConnPageData.addModel.DBTYPE_ID ==
      "h2embedded"
        ? jsx_username_password_with_not_mandatory
        : jsx_username_password}
    </div>
  );
  let mychgval_oracle =
    gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP ==
    "oracle_sid"
      ? "SID"
      : "Service Name";
  let form_oracle_servicename_jsx = (
    <div>
      <GFormBoundView
        label={"Oracle Server(" + mychgval_oracle + ")"}
        jsx={() => {
          return (
            <div>
              <div className="server-config-box">
                <FormGroup
                  label={gutils.fn_createWithRed("Host")}
                  inline={true}
                >
                  <GFormInput
                    small={true}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel.HOST
                    }
                    onChangeDelay={gutils.delay((val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.HOST =
                        val;
                    })}
                    placeholder={t("e.g. 192.168.2.10")}
                  />
                </FormGroup>
                <FormGroup
                  label={gutils.fn_createWithRed("Port")}
                  inline={true}
                >
                  <GFormInput
                    type={"number"}
                    small={true}
                    placeholder={t("e.g. 1521")}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel.PORT
                    }
                    onChangeDelay={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.PORT =
                        val;
                    }}
                  />
                </FormGroup>
              </div>
              <div className="full-one-box">
                <FormGroup
                  label={gutils.fn_createWithRed("Database")}
                  inline={true}
                >
                  <GFormInput
                    small={true}
                    placeholder={t("e.g. test")}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .DEFAULT_DATABASE
                    }
                    onChangeDelay={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.DEFAULT_DATABASE =
                        val;
                    }}
                  />
                </FormGroup>
              </div>
            </div>
          );
        }}
      />
      {jsx_username_password_with_role_for_oracle}
    </div>
  );

  let form_pg_native_jsx = (
    <div>
      <GFormBoundView
        label={"PostgreSQL Server"}
        jsx={() => {
          return (
            <div>
              <div className="server-config-box">
                <FormGroup
                  label={gutils.fn_createWithRed("Host")}
                  inline={true}
                >
                  <GFormInput
                    small={true}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel.HOST
                    }
                    onChangeDelay={gutils.delay((val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.HOST =
                        val;
                    })}
                    placeholder={t("e.g. 192.168.2.10")}
                  />
                </FormGroup>
                <FormGroup
                  label={gutils.fn_createWithRed("Port")}
                  inline={true}
                >
                  <GFormInput
                    type={"number"}
                    small={true}
                    placeholder={t("e.g. 5432")}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel.PORT
                    }
                    onChangeDelay={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.PORT =
                        val;
                    }}
                  />
                </FormGroup>
              </div>
              <div className="full-one-box">
                <FormGroup
                  label={gutils.fn_createWithRed("Database")}
                  inline={true}
                >
                  <GFormInput
                    small={true}
                    placeholder={t("e.g. test")}
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .DEFAULT_DATABASE
                    }
                    onChangeDelay={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.DEFAULT_DATABASE =
                        val;
                    }}
                  />
                </FormGroup>
              </div>
            </div>
          );
        }}
      />
      {jsx_username_password_with_role_for_postgresql}
    </div>
  );

  const form_h2_fs_system_jsx = (
    <div>
      <GFormBoundView
        label={"H2 Database"}
        jsx={() => {
          return (
            <div>
              <div className="full-one-box">
                <FormGroup
                  label={gutils.fn_createWithRed("DataFile")}
                  inline={true}
                >
                  <GFormFilePathSelect
                    selectFn="selectFile"
                    value={
                      gstore.databaseAllData.addNewConnPageData.addModel
                        .H2_FILEPATH
                    }
                    onChange={(val) => {
                      gstore.databaseAllData.addNewConnPageData.addModel.H2_FILEPATH =
                        val;
                    }}
                    placeholder={"i.e. the absolute path of datafile (*.mv.db)"}
                  />
                </FormGroup>
              </div>
            </div>
          );
        }}
      />
      {jsx_username_password_with_not_mandatory}
    </div>
  );
  const formMappings = {
    general: form_general_jsx,
    pg_native: form_pg_native_jsx,
    h2_fs_system: form_h2_fs_system_jsx,
    oracle_sid: form_oracle_servicename_jsx,
    oracle_service_name: form_oracle_servicename_jsx,
    custom: form_custom_jsx, // jdbc
  };
  const authTypeProp =
    gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP;
  const crtViewForm_jsx = formMappings[authTypeProp];
  if (!_.isNil(authTypeProp)) {
    // debugger;
  }
  console.log(
    "init log",
    crtViewForm_jsx,
    formMappings,
    gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP
  );
  const whenChg = () => {
    onUpdateRef(updateRef + 1);
  };
  return (
    <div>
      <DialogCommon
        clzname="tiny-view addnewconn-box"
        // confirmDisable={
        //   !gstore.databaseAllData.addNewConnPageData.isAddModelPass
        // }
        confirm={async () => {
          await checkAndConcatJdbcLink();
          await gutils.api.dblink.confirm_create_connection();
        }}
        style={{}}
        resize={true}
        noBackdrop={true}
        pageData={gstore.databaseAllData.addNewConnPageData}
        obj={gstore.databaseAllData.overlay_addNewConn}
        left2Content={(props) => (
          <Button
            disabled={props.confirmDisable}
            text={t("Test Connection")}
            onClick={async () => {
              await checkAndConcatJdbcLink();
              gutils.api.dblink.testConn();
            }}
            style={{ left: 0, position: "absolute" }}
          ></Button>
        )}
        jsx={(props) => (
          <div className="gform-addconn tiny-form-box">
            <GTabCentreView
              viewObj={gstore.databaseAllData.addNewConnPageData}
              viewKey={"viewkey"}
              tab={[
                {
                  label: "Main",
                  id: "main",
                  jsx: () => {
                    return (
                      <div>
                        <GFormBoundView
                          label={t("Database")}
                          jsx={() => {
                            return (
                              <div>
                                <FormGroup
                                  label={t("Database Type")}
                                  inline={true}
                                >
                                  <GSyncSelectWithFilter
                                    obj={
                                      gstore.databaseAllData.addNewConnPageData
                                        .addModel
                                    }
                                    list={
                                      gstore.databaseAllData.addNewConnPageData
                                        .formNeeds.dbTypes
                                    }
                                    loading={
                                      gstore.databaseAllData.addNewConnPageData
                                        .formNeeds.dbTypes_loading
                                    }
                                    icon="database"
                                    index={"DBTYPE_ID"}
                                    whenChg={whenChg}
                                  />
                                  {/* <span style={{ marginLeft: "5px" }}>
                                    <GSyncSelectWithFilter
                                      obj={
                                        gstore.databaseAllData
                                          .addNewConnPageData.addModel
                                      }
                                      list={_.map(
                                        gstore.databaseAllData
                                          .addNewConnPageData.formNeeds
                                          .dbVersions,
                                        (x, d, n) => {
                                          return {
                                            ...x,
                                            label: t(x.label),
                                          };
                                        }
                                      )}
                                      loading={
                                        gstore.databaseAllData
                                          .addNewConnPageData.formNeeds
                                          .dbVersions_loading
                                      }
                                      index={"VERSION_PROP"}
                                      whenChg={whenChg}
                                    />
                                  </span> */}
                                </FormGroup>
                                {/* <FormGroup
                                  label={t("Database Driver")}
                                  inline={true}
                                >
                                  <div>
                                    <GSyncSelectWithFilter
                                      list={
                                        gstore.databaseAllData
                                          .addNewConnPageData.formNeeds
                                          .relatedDrivers
                                      }
                                      loading={
                                        gstore.databaseAllData
                                          .addNewConnPageData.formNeeds
                                          .relatedDrivers_loading
                                      }
                                      icon="codicon-plug"
                                      obj={
                                        gstore.databaseAllData
                                          .addNewConnPageData.addModel
                                      }
                                      index={"DRIVER_ID"}
                                      whenChg={whenChg}
                                    />
                                  </div>
                                </FormGroup> */}
                                <FormGroup
                                  label={t("Connection Type")}
                                  inline={true}
                                >
                                  <div>
                                    <GSyncSelectWithFilter
                                      list={
                                        gstore.databaseAllData
                                          .addNewConnPageData.formNeeds
                                          .authTypeList
                                      }
                                      loading={
                                        gstore.databaseAllData
                                          .addNewConnPageData.formNeeds
                                          .relatedDrivers_loading
                                      }
                                      obj={
                                        gstore.databaseAllData
                                          .addNewConnPageData.addModel
                                      }
                                      index={"AUTH_TYPE_PROP"}
                                      whenChg={whenChg}
                                    />
                                  </div>
                                </FormGroup>
                              </div>
                            );
                          }}
                        />
                        {/* <Button
                              outlined={true}
                              style={{ marginLeft: "3px" }}
                              icon="add"
                            />
                            <Button
                              outlined={true}
                              style={{ marginLeft: "3px" }}
                              icon="cog"
                            /> */}
                        <DownloadStatus
                          obj={
                            gstore.databaseAllData.addNewConnPageData.formNeeds
                              .driver_downloadStatus
                          }
                          label={t("Driver")}
                          desc={t("Initializing files for the connection")}
                          uid={
                            gstore.databaseAllData.addNewConnPageData.formNeeds
                              .driver_download_uid
                          }
                          retry={() => {
                            gstore.databaseAllData.addNewConnPageData.formNeeds.driver_download_uid =
                              null;
                            gutils.defer(() => {
                              gutils.api.dblink.downloadDriver();
                            }, 300);
                          }}
                        />
                        {gstore.databaseAllData.addNewConnPageData
                          .isLoadingTestConn ? (
                          <CallOutAndView
                            title={t("Testing the Connection")}
                            desc={t("This action is being processed")}
                            extraJSXLabel="Cancel"
                            extraJSXFunc={() => {
                              gstore.databaseAllData.addNewConnPageData.isLoadingTestConn = false;
                              if (window.cancelTheTestConn) {
                                window.cancelTheTestConn();
                              }
                            }}
                            intent="primary"
                          />
                        ) : (
                          ""
                        )}
                        {crtViewForm_jsx || ""}
                        <GFormBoundView
                          label={t("Basic Information")}
                          jsx={() => {
                            return (
                              <div>
                                <div className="full-one-box ">
                                  <FormGroup
                                    require={true}
                                    label={gutils.fn_createWithRed("Name")}
                                    inline={true}
                                  >
                                    <GFormInput
                                      small={true}
                                      placeholder={t("e.g. test connection")}
                                      value={
                                        gstore.databaseAllData
                                          .addNewConnPageData.addModel
                                          .CONNECTION_NAME
                                      }
                                      onChangeDelay={(val) => {
                                        gstore.databaseAllData.addNewConnPageData.addModel.CONNECTION_NAME =
                                          val;
                                        gstore.databaseAllData.addNewConnPageData.addModel.EXTRA_DATA_IS_SYS_IPT_NAME = 2;
                                      }}
                                    />
                                  </FormGroup>
                                </div>
                                <div className="full-one-box">
                                  <FormGroup
                                    label={t("Description")}
                                    inline={true}
                                  >
                                    <GFormInput
                                      type="text"
                                      small={true}
                                      placeholder={t(
                                        "e.g. it's used as a test connection"
                                      )}
                                      value={
                                        gstore.databaseAllData
                                          .addNewConnPageData.addModel
                                          .CONNECTION_BRIEF
                                      }
                                      onChangeDelay={(val) => {
                                        gstore.databaseAllData.addNewConnPageData.addModel.CONNECTION_BRIEF =
                                          val;
                                      }}
                                    />
                                  </FormGroup>
                                </div>
                              </div>
                            );
                          }}
                        />
                      </div>
                    );
                  },
                },
                // {
                //   label: "Editor",
                //   id: "editor",
                //   jsx: () => {
                //     return <div>Sorry, this panel is still under testing.</div>;
                //   },
                // },
                // {
                //   label: "Other",
                //   id: "other",
                //   jsx() {
                //     return <div>Sorry, this panel is still under testing.</div>;
                //   },
                // },
              ]}
            />
          </div>
        )}
      />
    </div>
  );
});

// password is not mandatory
// if (
//   (gutils.empty(addModel.CONNECTION_NAME) ||
//     addModel.EXTRA_DATA_IS_SYS_IPT_NAME == 1) &&
//   (!gutils.empty(addModel.HOST) || !gutils.empty(addModel.PORT))
// ) {
//   addModel.CONNECTION_NAME = `${
//     !_.isNil(addModel.HOST) ? addModel.HOST : ""
//   }:${!_.isNil(addModel.PORT) ? addModel.PORT : ""}`;
//   addModel.EXTRA_DATA_IS_SYS_IPT_NAME = 1;
// }
