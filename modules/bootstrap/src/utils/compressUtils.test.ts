import { expect, test } from "vitest";
import path from "path";
import { logger } from "../utils/logger";
import { deleteDLinkConfig, getDLinkConfig } from "../fn";
import { join } from "path";
import compressUtils from "./compressUtils";
let examplesDIR = join(__dirname, "examples");
let distDIR = join(__dirname, "dist");
import fs from "fs";

test(
  "test-logger",
  async () => {
    logger.info("get info");
    logger.debug("get debug");
    logger.warn("get warn");
    logger.error("get warn");
  },
  {
    timeout: 500000,
  },
);

test(
  "test-unexact-targz",
  async () => {
    let inputPath = join(examplesDIR, "testdata.tar.gz");
    let outputDIR4targz = join(distDIR, "d-targz");
    await compressUtils.decompress(inputPath, outputDIR4targz);
    expect(fs.existsSync(join(outputDIR4targz, "testdata"))).toBe(true);
    expect(
      fs.existsSync(join(outputDIR4targz, "testdata", "version.txt")),
    ).toBe(true);
  },
  {
    timeout: 500000,
  },
);

test(
  "test-unexact-zip",
  async () => {
    let inputPath = join(examplesDIR, "testdata.zip");
    let outputDIR4targz = join(distDIR, "d-zip");
    await compressUtils.decompress(inputPath, outputDIR4targz);
    expect(fs.existsSync(join(outputDIR4targz, "testdata"))).toBe(true);
    expect(
      fs.existsSync(join(outputDIR4targz, "testdata", "version.txt")),
    ).toBe(true);
  },
  {
    timeout: 500000,
  },
);

// , "corruptedTestData.tar.gz"
test(
  "test-unexact-targz-should-fall-not-found",
  async () => {
    for (let item of ["testdat2a.tar.gz"]) {
      try {
        logger.info("item:" + item);
        // incorrect file, file not exist
        let inputPath = join(examplesDIR, item);
        let outputDIR4targz = join(distDIR, "d-targz-should-fail");
        await compressUtils.decompress(inputPath, outputDIR4targz);
        // should fail
        logger.error("how come it is not failed?" + item);
      } catch (e) {
        logger.debug("expected error:" + e.message);
        continue;
      }
      expect(1).toBe(0);
    }
  },
  {
    timeout: 500000,
  },
);
