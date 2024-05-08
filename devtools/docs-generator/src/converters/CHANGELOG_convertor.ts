import _ from "lodash";
import { FnInternalConverter } from "..";
import fs, { writeFileSync } from "fs";
import { join } from "path";
export type ReleasePreInfoType = {
  version: string;
  date: string;
  lines: string[];
};
let example_crtVer = JSON.stringify(
  {
    currentDesktopVersion: "1",
    currentTerminalVersion: "1",
    currentDockerVersion: "1",
  },
  null,
  2,
);
export let fn: FnInternalConverter = (content: string, lang: string) => {
  let identifier = "@PEN@";
  let lines = content.split("\n");
  let newContent: string[] = [];
  let lastObj: ReleasePreInfoType | null = null;
  let allLastObj: ReleasePreInfoType[] = [];
  for (let eachLine of lines) {
    if (eachLine.indexOf(identifier) != -1) {
      let [____, __, version, date] = eachLine.split("@");
      version = version.trim();
      date = date.trim();
      if (!version.startsWith("v")) {
        throw new Error("Version should start with 'v'");
      }
      if (!date.match(/\d{4}-\d{2}-\d{2}/)) {
        throw new Error("Date should be in format 'YYYY-MM-DD'");
      }
      eachLine = `## Release ${version} (${date})`;
      if (lastObj != null) {
        allLastObj.push(lastObj);
      }
      lastObj = {
        version,
        date,
        lines: [],
      };
    } else {
      if (!lastObj) {
        throw new Error("Incorrect format in CHANGELOG.md, please check");
      }
      lastObj?.lines.push(eachLine);
    }
    newContent.push(eachLine);
  }
  if (lastObj) {
    allLastObj.push(lastObj);
  }
  if (allLastObj.length == 0) {
    throw new Error("No release found in CHANGELOG.md");
  }
  let LAFTOOLS_ROOT = process.env.LAFTOOLS_ROOT;
  if (!LAFTOOLS_ROOT) {
    throw new Error("LAFTOOLS_ROOT is not defined");
  }
  LAFTOOLS_ROOT = "" + LAFTOOLS_ROOT;
  let subDir = join(LAFTOOLS_ROOT, "modules", "meta", "versions");
  let releaseJSONFile = join(LAFTOOLS_ROOT, "modules", "meta", "release.json");
  if (!fs.existsSync(releaseJSONFile)) {
    throw new Error("release.json not found in meta folder");
  }
  let releaseJSON = JSON.parse(fs.readFileSync(releaseJSONFile, "utf-8"));
  let latestVersionJSONFile = join(
    LAFTOOLS_ROOT,
    "modules",
    "meta",
    releaseJSON.latestVersion + ".json",
  );
  if (!fs.existsSync(latestVersionJSONFile)) {
    fs.writeFileSync(latestVersionJSONFile, example_crtVer);
    console.log(
      "latest version JSON file not found! " + releaseJSON.latestVersion,
    );
  }

  let p = _.find(allLastObj, (eachLastObj) => {
    if (eachLastObj.version == releaseJSON.latestVersion) {
      return true;
    }
    return false;
  });
  if (!p) {
    throw new Error(
      "latest version " +
        releaseJSON.latestVersion +
        " not found in CHANGELOG.md",
    );
  }

  console.log("subDir", subDir);
  if (!fs.existsSync(subDir)) {
    fs.mkdirSync(subDir);
  }
  let subFile = join(subDir, `${lang}.json`);
  writeFileSync(
    subFile,
    JSON.stringify(
      allLastObj.map((x) => {
        return {
          ...x,
          lines: undefined,
        };
      }),
      null,
      2,
    ),
  );
  _.forEach(allLastObj, (eachLastObj) => {
    if (eachLastObj.lines.length == 0) {
      throw new Error("Empty release found in CHANGELOG.md");
    }
    let eachVersionJSONFile = join(
      LAFTOOLS_ROOT + "",
      "modules",
      "meta",
      eachLastObj.version + ".json",
    );
    if (!fs.existsSync(eachVersionJSONFile)) {
      console.log("each version JSON file not found -> " + eachLastObj.version);
      // fs write
      writeFileSync(eachVersionJSONFile, example_crtVer);
    }
    let eachVersionJSON = JSON.parse(
      fs.readFileSync(eachVersionJSONFile, "utf-8"),
    );
    let validateFields = [
      "currentDesktopVersion",
      "currentTerminalVersion",
      "currentDockerVersion",
    ];
    _.forEach(validateFields, (eachField) => {
      if (!eachVersionJSON[eachField]) {
        throw new Error(eachField + " not found in " + eachVersionJSONFile);
      }
    });
    if (_.size(validateFields) != _.size(eachVersionJSON)) {
      throw new Error("Extra fields found in " + eachVersionJSONFile);
    }

    console.log(
      "Release",
      eachLastObj.version,
      eachLastObj.date,
      _.size(eachLastObj.lines),
    );
    let subsubDir = join(subDir, lang);
    if (!fs.existsSync(subsubDir)) {
      fs.mkdirSync(subsubDir);
    }
    let subMarkdownFile = join(subsubDir, `${eachLastObj.version}.md`);
    writeFileSync(subMarkdownFile, eachLastObj.lines.join("\n"));
  });
  return newContent.join("\n");
};
