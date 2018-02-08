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
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.common.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}