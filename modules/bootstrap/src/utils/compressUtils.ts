// write a compressutils for tar.gz and unzip/zip, using 3rd library
import fs from "fs";
import { logger } from "./logger";
import { createGunzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
// unzip/zip
import { writeFileSync } from "fs";
import decompress from "decompress";
import decompressTargz from "decompress-targz";
import _ from "lodash";
const extract = require("extract-zip");

let compressUtils = {
  // compress: async (inputPath: string, outputPath: string) => {
  //   // compress inputPath to outputPath
  //   // using 3rd library
  //   // TODO:
  //   throw new Error("not implemented");
  // },
  decompress: async (inputPath: string, outputDIR: string) => {
    // delete directory
    if (fs.existsSync(outputDIR)) {
      fs.rmdirSync(outputDIR, { recursive: true });
    }
    // decompress tar.gz
    if (!fs.existsSync(outputDIR)) {
      fs.mkdirSync(outputDIR, { recursive: true });
    }

    // decompress inputPath to outputPath
    // using 3rd library
    if (inputPath.endsWith(".tar.gz")) {
      // do untar and ungzip
      logger.debug("untar and ungzip for " + inputPath + " to " + outputDIR);

      let result = await decompress(inputPath, outputDIR, {
        plugins: [decompressTargz()],
      });
      logger.debug("decompress result:" + _.size(result));
    } else if (inputPath.endsWith(".zip")) {
      await extract(inputPath, { dir: outputDIR });
      // var unzipper = new DecompressZip(inputPath);
      // unzipper.on("error", (err) => {
      //   logger.error("error:" + err);
      // });
      // logger.debug("unzip for " + inputPath + " to " + outputDIR);
      // // await unzipper.extract({
      // //   path: "/",
      // // });
      // await unzipper.on("list", function (files) {
      //   console.log("The archive contains:");
      //   console.log(files);
      // });
      // TODO: todo
    } else {
      throw new Error("unsupported file type");
    }
  },
};

export default compressUtils;
