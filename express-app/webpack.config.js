const path = require('path');
const nodeExternals = require('webpack-node-externals');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  watch: NODE_ENV === 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  plugins: [
    
  ]
}