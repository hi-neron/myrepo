module.exports = {
  module: {
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['env']
      }
    }]
  },
  output: {
    filename: 'app.js'
  }
}