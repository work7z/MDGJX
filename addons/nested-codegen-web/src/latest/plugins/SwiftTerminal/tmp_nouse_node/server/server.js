const express = require("express");
const app = express();
const cors = require("cors");
const log = require("../common/log");
const _ = require("lodash");
// const logs = {}
const bodyParser = require("body-parser");
const { verifyWs, initWs } = require("./dispatch-center");
const pty = require("node-pty-prebuilt-multiarch");
const os = require("os");
const fs = require("fs");
const appUtils = require("../very/appUtils");
const path = require("path");
function getErrMsg(e) {
  console.log(e);
  try {
    return _.get(e, "data.message", _.get(e, "message", JSON.stringify(e)));
  } catch (e) {
    return _.toString(e);
  }
}
try {
  let shell = null;
  if (os.platform() === "win32") {
    shell = "powershell.exe";
  } else {
    let checkArr = ["zsh", "bash", "sh"];
    for (let eachItem of checkArr) {
      if (fs.existsSync("/bin/" + eachItem)) {
        shell = eachItem;
        break;
      }
    }
    if (shell == null) {
      throw new Error("Unknown Operation System");
    }
  }
  appUtils.modifyConfigIfHas((map) => {
    map.message = "Using the shell: " + shell;
    map.status = "PENDING";
  });

  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  require("express-ws")(app, undefined, {
    wsOptions: {
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024 * 8,
          memLevel: 7,
          level: 3,
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024,
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 * 8, // Size (in bytes) below which messages
        // should not be compressed.
      },
    },
  });
  const termInstObj = {};
  function killTermByUid(uid) {
    try {
      let term = termInstObj[uid];
      if (term) {
        term.kill();
      }
      delete termInstObj[uid];
    } catch (e) {
      log.error("Error when killing the term");
    }
  }
  function closeWs(uid, ws) {
    try {
      if (ws) {
        ws.close && ws.close();
      }
    } catch (e) {
      log.error("Error when closing the ws");
    }
  }
  app.ws("/opt", (ws, req) => {
    verifyWs(req, ws);
    let { token, uid } = req.query;

    ws.on("message", (data) => {
      try {
        let dataJSON = JSON.parse(data);
        switch (dataJSON.type) {
          case "resize":
            console.log("term-message", dataJSON);
            let term = termInstObj[uid];
            console.log("current terminal keys", _.keys(termInstObj));
            if (term) {
              term.resize(dataJSON.cols, dataJSON.rows);
            } else {
              console.log("no term");
            }
            break;
        }
      } catch (e) {
        console.log("err", e);
      }
    });
  });
  app.ws("/socket", (ws, req) => {
    const { token, uid } = req.query;
    if (_.isNil(uid)) {
      console.log("Invalid Request owing to an empty uid", uid);
      throw new Error("Invalid Request");
    }
    verifyWs(req, ws);

    // virtual terminal instance
    console.log("connected, uid is ", uid);
    let term = termInstObj[uid];
    if (_.isNil(term)) {
      term = pty.spawn(shell, ["--login"], {
        name: "xterm",
        cols: 50,
        rows: 24,
        // cwd: "/users/jerrylai",
        env: process.env,
        // cwd: process.env.HOME,
        cwd: os.homedir(),
      });
      termInstObj[uid] = term;
    }
    ws.on("open", (data) => {
      // open the websocket
    });
    // send to client
    term.on("data", function (data) {
      ws.send(data);
    });
    // received from client
    ws.on("message", (data) => {
      term.write(data);
    });
    // closed
    ws.on("close", function () {
      closeWs(uid, ws);
    });
    ws.on("exit", function () {
      closeWs(uid, ws);
    });
  });

  app.get("/run", function (req, res) {
    verifyWs(req);
    res.send("ok");
  });

  appUtils.modifyConfigIfHas((map) => {
    map.message = "Initializing the websocket app...";
  });

  initWs(app);

  const runServer = function () {
    let electermHost = "127.0.0.1";
    let config = appUtils.getConfigObject();
    let electermPort = config.port;
    appUtils.modifyConfigIfHas((map) => {
      map.message =
        "Using the address and port, " + `${electermHost}:${electermPort}` + "";
    });
    let successCallback = () => {
      log.info("server", "runs on", electermHost, electermPort);
      appUtils.modifyConfigIfHas((map) => {
        map.status = "OK";
        map.message = "The server is running.";
      });
    };
    let server = app.listen(electermPort, electermHost);
    let errorCallback = (err) => {
      console.log("an error", err);
      appUtils.modifyConfigIfHas((map) => {
        map.status = "ERROR";
        map.message = err.message;
      });
    };
    process.on("uncaughtException", errorCallback);
    server.on("listening", successCallback);
    server.on("clientError", errorCallback);
    server.on("error", errorCallback);
    server.on("close", errorCallback);
  };

  // start
  runServer();
} catch (err) {
  console.log("An Error Occurred", err);
  appUtils.modifyConfigIfHas((map) => {
    map.status = "ERROR";
    map.message = "" + getErrMsg(err);
  });
  throw err;
}
