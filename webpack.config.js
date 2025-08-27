// webpack.config.js
const path = require("path");
const Dotenv = require("webpack-dotenv-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",

    // mode будет установлен из CLI аргументов
    mode: argv.mode || "development",

    // Разные source maps для разных режимов
    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
        watch: true,
      },
      hot: true,
      port: 3000,
      open: true,
      devMiddleware: {
        writeToDisk: true,
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
      new Dotenv({
        sample: "./.env.example",
        path: "./.env",
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "TypeScript Webpack App",
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
            }
          : false,
      }),
    ],

    output: {
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },

    // Оптимизации только для production
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};
