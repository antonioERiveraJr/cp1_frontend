const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = {
  transpileDependencies: true
};

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    }
  }
}
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // modify the options...
        return options
      });
  }
};
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true, // Add this line
      }),
    ],
  },
};

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Define your feature flags or other global constants here
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false)
      })
    ]
  }
};
