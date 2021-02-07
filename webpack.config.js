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
// {
//   entry: {
//     web: './web/index.tsx',
//     server: './server/server.ts'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.jsx', '.js'],
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   target: 'node',
//   // externals: {
//   //   express: 'express',
//   //   util: 'utils',
//   //   fs: 'fs',
//   //   events: 'events',
//   //   path: 'path',
//   //   http: 'http',
//   //   https: 'https',
//   //   url: 'url',
//   //   zlib: 'zlib',
//   //   stream: 'stream',
//   //   assert: 'assert',
//   //   tty: 'tty',
//   //   os: 'os',
//   // },
//   mode: process.env.NODE_ENV || 'development'
// };