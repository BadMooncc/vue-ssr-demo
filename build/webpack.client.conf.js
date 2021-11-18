const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.conf");
const HTMLPlugin = require("html-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = merge(base, {
  entry: "./src/entry-client.js",
  devtool: 'source-map',
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'manifest'
    // }),
    new VueSSRClientPlugin()
    // generate output HTML
    // new HTMLPlugin({
    //   template: 'src/index.template.html'
    // })
  ]
});

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    // auto generate service worker
    // new SWPrecachePlugin({
    //   cacheId: 'vue-hn',
    //   filename: 'service-worker.js',
    //   dontCacheBustUrlsMatching: /./,
    //   staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    // })
  );
}

module.exports = config;
