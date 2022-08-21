const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {
  name: NAME, version: VERSION,
} = require('./package.json');

const PORT = 3000;

const getDevTool = (env) => (env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : 'source-map');

const getPlugins = (env) => {
  const server = env.TARGET_ENV === 'production' ? 'https://www.acil.info/lg/lgapi/' : 'https://www.acil.info/lg/lgapi/';

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: './public/images/lg_logo.jpg',
      filename: './index.html',
      inject: 'body',
      template: path.resolve('./index.html'),
      title: NAME,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.EnvironmentPlugin({
      API_SERVER_URL: server,
      TARGET_ENV: env.TARGET_ENV,
    }),
    new MiniCssExtractPlugin({
      filename: `${NAME}-${VERSION}.css`,
      linkType: 'text/css',
    }),
  ];

  if (env.NODE_ENV !== 'development') {
    plugins.push(new CompressionWebpackPlugin());
  }

  return plugins;
};

module.exports = (env) => ({
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    open: env.TARGET_ENV === 'development',
    port: PORT,
  },
  devtool: getDevTool(env.TARGET_ENV),
  entry: [
    '@babel/polyfill',
    'slick-carousel/slick/slick.css',
    'slick-carousel/slick/slick-theme.css',
    'ag-grid-community/dist/styles/ag-grid.css',
    'ag-grid-community/dist/styles/ag-theme-alpine.css',
    'react-datepicker/dist/react-datepicker.css',
    './public/css/bootstrap-datetimepicker.min.css',
    './public/css/bootstrap-select.min.css',
    './public/css/main.min.css',
    './public/css/select2.min.css',
    './public/css/slick-theme.css',
    './public/css/slick.css',
    './public/css/style.css',
    './public/css/react-styles.css',
    './public/css/errors.css',
    './public/css/loader.css',
    './public/css/ag-grid-lib.scss',
    './index.js',
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|jsx)$/i,
      },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|otf|ttf|woff|woff2|eot)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 100000000 },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: env.NODE_ENV === 'development',
    minimizer: [new TerserWebpackPlugin({ test: /\.js(\?.*)?$/i })],
  },
  output: {
    chunkFilename: '[id].js',
    filename: `${NAME}-${VERSION}.js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  performance: {
    hints: env.NODE_ENV === 'production' ? 'warning' : false,
    maxAssetSize: 2048000,
    maxEntrypointSize: 2048000,
  },
  plugins: getPlugins(env),
  profile: env.NODE_ENV === 'development',
  resolve: { extensions: ['.js', '.jsx', '.scss', '.css'] },
});
