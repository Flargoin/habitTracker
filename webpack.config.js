const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    mode: argv.mode || "development",
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
        // TypeScript rule
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        // Sass/SCSS rule
        {
          test: /\.(scss|sass)$/i,
          use: [
            // В production извлекаем CSS в отдельные файлы
            // В development используем style-loader для горячей перезагрузки
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },

        // CSS rule (если еще используете обычный CSS)
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },

        // Images and fonts
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[hash][ext][query]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "TypeScript + Sass App",
        minify: isProduction,
      }),

      // Extract CSS только в production
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
              chunkFilename: "[id].[contenthash].css",
            }),
          ]
        : []),
    ],

    output: {
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      assetModuleFilename: "assets/[hash][ext][query]",
    },

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
          styles: {
            test: /\.(css|scss|sass)$/,
            name: "styles",
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
  };
};
