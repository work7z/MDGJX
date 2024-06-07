let run_task_utils = {
  labelMappingList: [
    {
      label: t("Not yet ran"),
      value: "NOT_YET_RAN",
    },
    {
      label: t("Closing"),
      value: "CLOSING",
    },
    {
      label: t("Pending"),
      value: "PENDING",
    },
    {
      label: t("Stopped"),
      value: "STOPPED",
    },
    {
      label: t("An Error Occurred"),
      value: "ERROR",
    },
    {
      label: t("OK, it's running."),
      value: "OK",
    },
  ],
  isEmpty(obj, name) {
    if (_.isNil(obj[name])) {
      return true;
    } else {
      return false;
    }
  },
  isRunning(obj, name) {
    if (_.isNil(obj[name])) {
      return false;
    }
    return _.get(obj, [name, "status"]) !== "NOT_YET_RAN";
  },
};
export default run_task_utils;
