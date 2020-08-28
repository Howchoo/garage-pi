module.exports = {
  entry: [
    './entry.js'
  ],
  output: {
    path: __dirname + '/assets',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/react', '@babel/env']
        }
      }
    ]
  },
}
