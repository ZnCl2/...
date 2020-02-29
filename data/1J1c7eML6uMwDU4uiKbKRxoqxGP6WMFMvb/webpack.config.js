// var webpack = require('webpack');
// var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: `${__dirname}`,
    filename: 'all.js',
    chunkFilename:'chunks/[id].app-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        },
        exclude: /node_modules/
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },{
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader?name=chunks/[name].[ext]'
          },
        ],
      },{ test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000&name=chunks/[name].[ext]' }
    ]
  }
};
