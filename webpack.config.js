const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');

const dev = process.env.NODE_ENV === 'development';
const prod = !dev;

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  build: path.resolve(__dirname, 'build'),
  styles: 'styles/',
  assets: 'assets/',
  js: 'js/',
};

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      minChunks: 2,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  };
  if (prod) {
    // eslint-disable-next-line no-unused-expressions,no-sequences
    (config.minimize = true),
      (config.minimizer = [
        new CssMinimizerPlugin({
          parallel: true,
          sourceMap: true,
          minimizerOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
        new TerserPlugin({
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
      ]);
  }
  return config;
};

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: prod ? 'source-map' : 'inline-source-map',
  context: PATHS.src,
  entry: {
    main: './js/main.js',
  },

  output: {
    filename: `${PATHS.js}[name].[hash:8].js`,
    path: dev ? PATHS.dist : PATHS.build,
  },

  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    port: 4200,
    // hot: true,
    open: true,
    // hotOnly: dev,
    // liveReload: true,
    watchContentBase: true,
    overlay: dev,
  },

  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  optimization: optimization(),

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      title: 'E&K',
      inject: true,
      template: `${PATHS.src}/template.html`,
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.styles}[name].[hash:8].css`,
      chunkFilename: '[id].css',
    }),
    new HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: `${PATHS.src}/static`,
          to: prod ? `${PATHS.build}/static` : `${PATHS.dist}/static`,
        },
      ],
    }),
    new HappyPack({
      id: 'eslint',
      threads: 3,
      loaders: [
        {
          path: 'eslint-loader',
          query: { happyPackMode: true },
        },
      ],
    }),
    new HappyPack({
      id: 'babel',
      threads: 3,
      loaders: [
        {
          path: 'babel-loader',
          happyPackMode: true,
          query: {
            plugins: [['module:fast-async', { spec: true }]],
            cacheDirectory: true,
          },
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader', options: { minimize: prod } }],
      },
      {
        test: /\.(css|scss|sass)$/,
        exclude: /\.module\.(css|scss|sass)$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.module\.(css|scss|sass)$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.assets}fonts`,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: `${PATHS.assets}images`,
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: `${PATHS.assets}icons`,
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: `${PATHS.assets}audio`,
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'happypack/loader?id=eslint' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'happypack/loader?id=babel' },
      },
    ],
  },
};
