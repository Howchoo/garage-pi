const path = require('path');

module.exports = 
[
  {
    name: 'server',
    entry: './server/server.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
      output: {
      path: __dirname + '/dist/server',
      filename: 'server.js'
    },
    mode: process.env.NODE_ENV || 'development',
    externals: {
      // rpio: 'rpio'
    }
  },
  {
    name: 'web',
    entry: './entry.tsx',
    target: 'web',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
      path: __dirname + '/dist/web',
      filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV || 'development'
  }
]
