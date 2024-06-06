// utils and node.js api
const fs = require("fs");
const sh = require("shelljs");
const _ = require("lodash");
const os = require("os");
const path = require("path");
// webpack import
const webpack = require("webpack");
const compiler = webpack.compiler;
const HappyPack = require("happypack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// webpack init
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
});
// function declare
const utils = {
  getCrtPath: (relativePath) => {
    return path.join(__dirname, relativePath);
  },
};
function createStyleUseObject(isModule = true) {
  return [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader: "css-loader",
      query:
        isModule && false
          ? {
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            }
          : { modules: false },
    },
    { loader: "less-loader" },
  ];
}
// variables declare
var babelrc = JSON.parse(
  fs.readFileSync(utils.getCrtPath(".babelrc"), "UTF-8")
);
var entryobj = {};
var htmlPlugins = [];
var distdir = utils.getCrtPath("dist");
// add page by read dir
var pagesPath = utils.getCrtPath("./pages");
var pagesArr = fs.readdirSync(pagesPath);
_.forEach(pagesArr, (eachPage) => {
  var chunkName = eachPage;
  var indexHtmlPath = utils.getCrtPath(`./pages/${chunkName}/index.html`);
  var indexPageArg = {
    template: indexHtmlPath,
    filename: utils.getCrtPath(`./dist/${chunkName}/index.html`),
    chunks: [chunkName],
  };
  var indexPagePlugin = new HtmlWebpackPlugin(indexPageArg);
  htmlPlugins.push(indexPagePlugin);
  entryobj[chunkName] = utils.getCrtPath(`./pages/${chunkName}/index.js`);
});
if (entryobj["index"]) {
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: utils.getCrtPath(`./pages/index/index.html`),
      filename: utils.getCrtPath(`./dist/index.html`),
      chunks: ["index"],
    })
  );
}

var configureWebpack = require("./config/configureWebpack");

let prePlugins = [];

// 自动引入 dll 中的文件
const files = fs.readdirSync(path.resolve(__dirname, "dll"));
// prePlugins.push(
//   new AddAssetHtmlWebpackPlugin({
//     publicPath: "https://lib.baomitu.com/babel-polyfill/7.12.1/polyfill.min.js",
//   })
// );
files.forEach((file) => {
  if (/.*\.dll.js/.test(file)) {
    prePlugins.push(
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, "dll", file),
      })
    );
  }
  if (/.*\.manifest.json/.test(file)) {
    prePlugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dll", file),
      })
    );
  }
});

module.exports = (mode) => {
  var isDev = mode === "dev";
  if (isDev) {
    prePlugins = [];
  }
  // environment
  process.env.NODE_ENV = isDev ? "development" : "production";
  var contentHashValue = isDev ? "hash" : "contenthash";
  var webpackConfig = {
    devServer: {
      writeToDisk: true,
      inline: true,
      hot: true,
      inline: true,
      progress: true,
      publicPath: "/",
      contentBase: utils.getCrtPath("dist"),
      compress: true,
      port: 1234,
    },
    entry: {
      ...entryobj,
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
      alias: {},
    },
    plugins: _.filter(
      [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin([distdir], {
          allowExternal: true,
        }),
        ...htmlPlugins,
        new webpack.ProvidePlugin({
          _: "lodash",
          moment: "moment",
          axios: "axios",
          vue: ["vue", "default"],
          Vue: ["vue", "default"],
          vuex: "vuex",
          Vuex: "vuex",
          VueRouter: "vue-router",
          ELEMENT: "element-ui",
          // gutils: path.join(__dirname, 'gutils.js'),
          // gapi: [path.join(__dirname, 'gapi.js'),'default'],
        }),
        new MiniCssExtractPlugin({
          filename: "[name].[" + contentHashValue + "].css",
        }),
        ...prePlugins,
        new HappyPack({
          id: "happybabel",
          loaders: ["babel-loader", "xml-loader"],
          threadPool: happyThreadPool,
          verbose: true,
        }),
        // new CopyWebpackPlugin([
        //   {
        //     from: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/editor_dist/e",
        //     to: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/web/dist/e",
        //   },
        // ]),
        // new CopyWebpackPlugin([
        //   {
        //     from: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/plugins_dist",
        //     to: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/web/dist/plugins_dist",
        //   },
        // ]),
        // new CopyWebpackPlugin([
        //   {
        //     from: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/web/node_modules/@vscode/codicons/dist",
        //     to: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/web/dist",
        //   },
        // ]),
        new CopyWebpackPlugin([
          {
            from: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/static",
            to: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/web/dist/static",
          },
        ]),
        // new CopyWebpackPlugin([
        //   {
        //     from: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/infra/lang",
        //     to: "/users/jerrylai/mincontent/PersonalProjects/denote-fe/web/dist/infra_lang",
        //   },
        // ]),
      ],
      (x, d, n) => {
        return !_.isNil(x);
      }
    ),
    output: {
      filename: "[name].[" + contentHashValue + "].js",
      publicPath: "../",
      // publicPath: './',
      path: distdir,
    },
    optimization: {},
    module: {
      rules: [
        {
          test: /\.vue$/,
          // exclude: /node_modules/,
          loader: "vue-loader",
        },
        {
          test: /\.(ts|tsx)$/,
          // exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: babelrc,
            },
            {
              loader: "ts-loader",
            },
          ],
        },
        // {
        //   test: /node_modules\.(ts|tsx)$/,
        //   use: [
        //     {
        //       loader: "babel-loader",
        //       options: babelrc,
        //     },
        //     {
        //       loader: "ts-loader",
        //     },
        //   ],
        // },
        {
          test: /\.css$/,
          // exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.less$/,
          // exclude: /node_modules/,
          use: createStyleUseObject(),
        },
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components|link_react)/,
          use: [
            {
              loader: "babel-loader",
              options: babelrc,
            },
          ],
        },
        // ...(_.isEmpty(prePlugins)
        //   ? []
        //   : [
        //       {
        //         test: /node_modules\/monaco-editor\/.*js$/,
        //         exclude: /(node_modules|bower_components|link_react)/,
        //         use: [
        //           {
        //             loader: "babel-loader",
        //             options: babelrc,
        //           },
        //         ],
        //       },
        //       {
        //         test: /\.(js|jsx)$/,
        //         use: [
        //           {
        //             loader: "babel-loader",
        //             options: babelrc,
        //           },
        //         ],
        //       },
        //     ]),
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          // exclude: /node_modules/,
          use: ["file-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          // exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "./[name].[ext]",
              },
            },
          ],
        },
        {
          test: /codicon\.(ttf)$/,
          // exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "./codicon.[ext]",
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          // exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "./[name].[ext]",
              },
            },
          ],
        },
      ].filter((x) => !_.isNil(x)),
    },
  };

  return configureWebpack(webpackConfig, mode);
};
