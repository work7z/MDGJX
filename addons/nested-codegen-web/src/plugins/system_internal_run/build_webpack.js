let isDev = process.argv[2] == "DEV";
process.env.NODE_ENV = isDev ? "development" : "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

let compilePluginFolder =
  "/Users/jerrylai/mincontent/PersonalProjects/denote-fe/plugins";
//   process.argv[3] ||
// ;

let crtFolderName = process.argv[3];
if (crtFolderName == null || "" == crtFolderName) {
  console.log("ERROR, no validated folder name", crtFolderName);
  exit(-1);
} else {
  console.log("got folder name", crtFolderName);
}

let mysubfiles = fs.readdirSync(compilePluginFolder);
mysubfiles = mysubfiles.filter((x) => {
  let isDir = fs.lstatSync(path.join(compilePluginFolder, x)).isDirectory();
  return (
    x == crtFolderName &&
    isDir &&
    x != "@common" &&
    x != ".idea" &&
    x != "run" &&
    x != "node_modules"
  );
});
console.log(mysubfiles);

function buildByWebpack({ entry, dist }) {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true });
  }
  fs.rmdirSync(dist, { recursive: true });
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true });
  }
  const config = {
    devtool: isDev ? "source-map" : undefined,
    entry: {
      entry: entry,
    },
    output: {
      // filename: "[name].[" + contentHashValue + "].js",
      filename: "[name]" + ".js",
      publicPath: "../",
      path: dist,
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
      alias: {},
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name]" + ".css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          exclude: /antd/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              query: { modules: true },
            },
            { loader: "less-loader" },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components|link_react)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["react-app", "es2017"],
                plugins: [
                  "transform-decorators-legacy",
                  "transform-class-properties",
                ],
              },
            },
          ],
        },
      ],
    },
  };

  webpack(
    {
      ...config,
    },
    (err, stats) => {
      // [Stats Object](#stats-object)
      if (err || (stats != null && stats.hasErrors())) {
        // [Handle errors here](#error-handling)
        console.log("got err", err);
        if (stats) {
          console.log("stats err", stats.hasErrors(), stats.toString());
        }
      } else {
        console.log("finish config", stats);
      }
    }
  );
}

mysubfiles.forEach((eachFileName) => {
  let eachFilePath = path.join(compilePluginFolder, eachFileName);
  buildByWebpack({
    entry: path.join(eachFilePath, "frontend", "PluginEntry.js"),
    dist: path.join(
      eachFilePath.replace("plugins", "plugins_dist"),
      "frontend"
    ),
  });
});
