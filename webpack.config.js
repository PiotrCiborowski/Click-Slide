const webpack = require('webpack');
const path = require('path');
const config = {
  entry: './index.ts',
  /*entry: {
      game: './index.ts',
      player: './player.ts'
    },*/
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: path.resolve(),
    filename: 'bundle.js'
  }
};
module.exports = config;