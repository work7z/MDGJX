var websocket = require("websocket");
import fs from "fs";
import { NodeReq, NodeRes } from "./node-types";
import JobDefinition from "./ext/job";
// command: node ./ws-index.ts --autoExitSeconds=10 --input-config-file=/users/ksdkfqw/rrqw
var inputConfigFile: string = "";
var autoExitSeconds: number = 20;
var mode: string = "";
var direct_call_config: string = "";
async function handleNodeReq(jobReq: NodeReq) {
  let res: NodeRes<any> | null = null;
  if (!JobDefinition[jobReq.Type]) {
    res = null;
  } else {
    res = await JobDefinition[jobReq.Type](jobReq);
  }
  if (res == null) {
    res = {
      Type: jobReq.Type,
      Id: jobReq.Id,
      Lang: jobReq.Lang,
      OutputValue: "No available data",
    };
  }
  return res;
}
process.argv.forEach((val, index) => {
  if (val.indexOf("--autoExitSeconds=") != -1) {
    autoExitSeconds = parseInt(val.split("=")[1]);
  }
  if (val.indexOf("--input-config-file=") != -1) {
    inputConfigFile = val.split("=")[1];
  }
  if (val.indexOf("--mode=") != -1) {
    mode = val.split("=")[1];
  }
  if (val.indexOf("--direct-call-config=") != -1) {
    direct_call_config = val.split("=")[1];
  }
});

type InputConfigFile = {
  WebSocketLink: string;
  NodeToken: string;
};

if (mode == "direct-call") {
  // NO OUTPUT BEGIN:
  // read the file as string from the file direct_call_config, and parse it as NodeReq
  let directCallConfigContent = fs.readFileSync(direct_call_config, "utf8");
  let jobReq: NodeReq = JSON.parse(directCallConfigContent);
  (async () => {
    try {
      let a = await handleNodeReq(jobReq);
      console.log(JSON.stringify(a));
    } catch (e) {
      console.log({
        error: e,
      });
    }
  })();
  // NO OUTPUT END:
} else {
  // using websocket to launch
  // console.log("* Arg_inputConfigFile", inputConfigFile);
  // console.log("* Arg_autoExitSeconds", autoExitSeconds);

  // parse inputConfigFile as InputConfigFile
  let inputConfigFileContent = fs.readFileSync(inputConfigFile, "utf8");
  let inputConfigFileJson: InputConfigFile = JSON.parse(inputConfigFileContent);

  // console.log("* Arg_inputContent", inputConfigFileJson);

  // delete inputConfigFile
  fs.unlinkSync(inputConfigFile);

  let wsLink = inputConfigFileJson.WebSocketLink;
  let token = inputConfigFileJson.NodeToken;

  // estbalish websocket connectivity
  var client = new websocket.client();

  client.connect(
    wsLink + "/api/ws/node-rpc" + "?node-token=" + token,
    null,
    null,
    null,
    null,
  );
  client.on("connectFailed", function (error: any) {
    console.log("Connect Error: " + error.toString());
    process.exit(99);
  });

  let sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  let ackJobTime: Date = new Date();
  let ackCtn = 0;
  // if Now - ackJobTime > autoExitSeconds, then quit the process
  let checkAutoExit = async function () {
    while (true) {
      await sleep(1000);
      // console.log("checking job time", ackJobTime);
      if (ackJobTime != null) {
        let diff = Date.now() - ackJobTime.getTime();
        // console.log("diff seconds", diff, autoExitSeconds! * 1000);
        if (diff > autoExitSeconds! * 1000) {
          // TODO: current make node worker never quit unless we find a way to reduce its startup time.
          // console.log("quit the program");
          // exit(0);
        }
      }
    }
  };
  setTimeout(checkAutoExit, 0);

  let onWSConnect = function (connection: any) {
    console.log("WebSocket Client Connected");

    connection.on("message", function (message: any) {
      if (message.type === "utf8") {
        // ackJobTime = new Date();
        (async function () {
          ackCtn++;
          try {
            let obj: any | null = null;
            try {
              obj = JSON.parse(message.utf8Data);
            } catch (eee) {
              obj = null;
            }
            if (obj != null) {
              let jobReq: NodeReq = obj.value;
              let res: NodeRes<any> | null = await handleNodeReq(jobReq);
              // send data
              connection.sendUTF(JSON.stringify(res));
            }
          } catch (e) {
            throw e;
          } finally {
            ackCtn--;
          }
        })();
      }
    });

    connection.on("error", function (error: any) {
      console.log("Connection Error: " + error.toString());
      process.exit(98);
    });
    connection.on("close", function () {
      console.log("echo-protocol Connection Closed");
      process.exit(0);
    });
  };

  client.on("connect", onWSConnect);
}
