const todo_read_putils = {
  getCtxPUtils({ crtStoreName }, callBck) {
    setTimeout(() => {
      let v = _.get(window, ["g_putils_" + crtStoreName]);
      window.tmp_v___001 = { v, crtStoreName };
      if (!_.isNil(v) && !_.isNil(callBck)) {
        setTimeout(() => {
          callBck(v);
        }, 0);
      }
      return v;
    }, 0);
  },
};

export default todo_read_putils;
