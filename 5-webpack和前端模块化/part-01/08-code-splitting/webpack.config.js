const path = require("path");
// 构造函数或者类，大写命名
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const toml = require("toml");
const yaml = require("yaml");
const json5 = require("json5");

module.exports = {
  // 之前的entry 配置
  // entry: "./src/index.js",

  /**
   * !! 第一种代码分离的配置
   * */
  // entry: {
  //   index: "./src/index.js",
  //   another: "./src/another-module.js",
  // },

  /**
   * !! 第二种代码分离的配置
   * */
  // entry: {
  //   index: {
  //     import: "./src/index.js",
  //     dependOn: "shared",
  //   },
  //   another: {
  //     import: "./src/another-module.js",
  //     dependOn: "shared",
  //   },
  //   shared: "lodash",
  // },

  /**
   * !! 第二种代码分离的配置, 利用插件实现
   * 需要搭配 optimization.splitChunks.chunks = 'all' 实现
   * */
  // entry: {
  //   index: "./src/index.js",
  //   another: "./src/another-module.js",
  // },

  /**
   * !! 第三种代码分离的配置, 利用插件实现
   * 动态静态可以一起抽离
   * 需要搭配 optimization.splitChunks.chunks = 'all' 实现
   * */
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext]",
  },

  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "app.html",
      inject: "body",
    }),
  ],

  devServer: {
    static: "./dist",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        /* !! node_modules 中的js文件不使用babel-loader 进行编译 */
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime"]],
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin({
        // filename: "styles/[contenthash].css", // !! 自定义生成的css文件位置/名称
      }),
    ],

    splitChunks: {
      chunks: "all",
    },
  },
};
