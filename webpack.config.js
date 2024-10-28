const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: path.resolve(__dirname, "example/src/index.tsx"),
  output: {
    path: path.resolve(__dirname, 'example/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'example/tsconfig.json')
            }
          }
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "example/public/index.html"),
    }),
  ].concat(prod ? [new MiniCssExtractPlugin()] : []),
};
