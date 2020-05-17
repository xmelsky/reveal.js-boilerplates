const path = require('path');
const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => ({
  entry: {
    main: './src/ts/index.ts',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ autoprefixer() ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [ { from: './src/assets/images', to: 'images' } ],
    }),
    new HTMLWebpackPlugin({
      title: "Reveal.js project with Webpack, TypeScript and SASS",
      filename: 'index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      environment: process.env
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:
        env.production ? '[name].css' :
        '[name].[hash].css',
      chunkFilename:
        env.production ? '[name].css' :
        '[name].[hash].css',
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/ts/components/'),
      utils: path.resolve(__dirname, 'src/ts/utils/'),
      sass: path.resolve(__dirname, 'src/sass/components/'),
      "reveal-css": path.resolve(__dirname, './node_modules/reveal.js/css/'),
    },
    extensions: [ '.ts', '.js', '.scss', '.css' ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
