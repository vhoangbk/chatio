const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/';

const {
    NODE_ENV = 'production',
  } = process.env;

module.exports = {
    entry: {
        index: './src/index.js'
    },
    mode: NODE_ENV,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ASSET_PATH,
    },
    devServer: {
        open: true,
        port: 3000
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
          },
          {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ],
          },
        ]
      },
    plugins:[
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
    ]
}