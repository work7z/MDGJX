import fn_newDbConfig from "./fn_newDbConfig.";

export default () => {
  return {
    eachConnStatusObj: {},
    url_params_redis: "",
    needNewEdit: true,
    uid: gutils.uuid(),
    view_type: "add",
    created: false,
    tmp_dbconfig: fn_newDbConfig(),
    dbconfig: fn_newDbConfig(),
    // increase
    increase_editor_num: 1,
    titleMsg: null,
    // editors
    allSQLEditors: [],
    conn_status_loading: false,
    crtConnectionStatus: {
      runningUserInstruction: false,
      closed: false,
      createHourTimeStr: "2022-08-01 10:01:30",
    },
    retrieveDefinitions: [],
    crtSQLResultId: null,
    activeSQLConnId: null,
  };
};
