const view_logs_task_utils = {
  fn_logDynamic({ prop }) {
    gutils.wrapErrAlert(async () => {
      gutils.alert(`Reading the logs...`);
      let mRes = await gutils.opt("/ran_task/get_logs", {
        prop: prop,
      });
      let splitLine = `-------------`;
      let fullArr = [
        splitLine + " [ERROR] " + splitLine,
        mRes.content.errMsg,
        splitLine + " [ERROR] " + splitLine,
        "",
        "",
        "",
        splitLine + " [INFO] " + splitLine,
        mRes.content.outMsg,
        splitLine + " [INFO] " + splitLine,
      ];
      gutils.alertOk(`Done.`);
      let hasErrType = !_.isEmpty(_.trim(mRes.content.errMsg));
      gutils.openCodePanel({
        title:
          t(`Process Logs`) +
          (hasErrType ? " " + `(${t(`Ops! An Error Occurred`)})` : ""),
        language: "markdown",
        subTitle: t(`Updated at {0}`, moment().format("YYYY-MM-DD HH:mm:ss")),
        data: fullArr.join("\n"),
      });
    })();
  },
};
export default view_logs_task_utils;
