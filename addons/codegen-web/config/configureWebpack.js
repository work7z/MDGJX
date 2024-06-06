var _ = require("lodash");

module.exports = (conf, mode) => {
  return _.merge(conf, {
    devServer: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3000",
          pathRewrite: { "^/api": "" },
        },
        "/tun": {
          target: "http://127.0.0.1:13838",
          pathRewrite: { "^/tun": "" },
        },
      },
    },
  });
};
