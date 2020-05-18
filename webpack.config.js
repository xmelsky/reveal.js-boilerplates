const path = require('path');

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
        test: /\.(html|pug)$/,
        exclude: /node_modules/,
        loaders: ['html-loader', 'pug-html-loader'],
      },
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
              plugins: () => [autoprefixer()],
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
        use: ['file-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: require.resolve('./src/ts/index.ts'),
        use: [
          {
            loader: 'pug-slides-loader',
            options: {
              from: './src/slides',
            },
          },
        ],
      },
      {
        test: require.resolve('reveal.js'),
        use: {
          loader: 'expose-loader',
          options: 'Reveal',
        },
      },
    ],
  },
  plugins: [

    new CopyPlugin({
      patterns: [
        { from: './src/assets/images', to: 'images' },
        { from: './node_modules/reveal.js/plugin/highlight/highlight.js', to: 'plugin/highlight/highlight.js' },
        { from: './node_modules/reveal.js/plugin/notes/notes.js', to: 'plugin/notes/notes.js' },
        { from: './node_modules/reveal.js/plugin/notes/notes.html', to: 'plugin/notes/notes.html' },

      ],
    }),
    new HTMLWebpackPlugin({
      title: 'Reveal.js project with Webpack, TypeScript and SASS',
      filename: 'index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      environment: process.env,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:
        env.production ? '[name].css'
          : '[name].[hash].css',
      chunkFilename:
        env.production ? '[name].css'
          : '[name].[hash].css',
    }),
  ],
  resolve: {
    alias: {
      sass: path.resolve(__dirname, 'src/sass/'),
      slides: path.resolve(__dirname, 'src/slides'),
    },
    extensions: ['.ts', '.js', '.scss', '.css'],
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
