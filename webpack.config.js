const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
  output: {
    path: path.resolve(__dirname + '/dist/')
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
  ,plugins: [
    new VueLoaderPlugin()
  ]
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-suggest.plugin.js',
      libraryTarget: 'window',
      library: 'VueSuggest',
    }/*,
    plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
    ]*/
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/Suggest.vue'),
    output: {
      filename: 'vue-suggest.js',
      libraryTarget: 'umd',
      library: 'vue-suggest',
      umdNamedDefine: true
    }
  })
];