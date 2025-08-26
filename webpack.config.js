// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // Точка входа
  entry: './src/index.ts',
  
  // Режим разработки или production
  mode: 'development',
  
  // Devtool для source maps
  devtool: 'inline-source-map',
  
  // Dev server настройки
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
    open: true
  },
  
  // Модули и правила
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  // Разрешение расширений
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  
  // Плагины
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'TypeScript Webpack App',
    }),
  ],
  
  // Output настройки
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  
  // Оптимизация
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};