/**
 * webpack 基础配置
 */
const webpack = require('webpack');
const glob = require('glob');
//去除未用的css
const PruifyCSSPlugin = require('purifycss-webpack');
const path = require("path");
// 引入模板插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 提取js中的css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//  环境变量
const env = process.env.NODE_ENV

// 引入config.js
const config = require("./config");
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
let CommonsChunkPlugin = [

  new webpack.optimize.CommonsChunkPlugin({
    // chunk 名为 vendor
    name: 'vendor',
    minChunks(module) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../node_modules')
        ) === 0
      )
    }

  }),
];
// 入口文件集合
let Entries = {
  vendor: ['axios']
}
//   

// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
  const htmlPlugin = new HTMLWebpackPlugin({
    title: `${page}`,
    filename: `${page}.html`,
    template: path.resolve(__dirname, `../src/page/${page}.html`),
    chunks: [page, 'vendor'],
    inject: 'body',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  });
  HTMLPlugins.push(htmlPlugin);
  Entries[page] = path.resolve(__dirname, `../src/${page}.js`);
  const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: `${page}`,
    async: 'vendor-async',
    children: true,
    minChunks: 3
  });
  CommonsChunkPlugin.push(commonsChunkPlugin)
})

module.exports = {
  // 入口文件
  entry: Entries,

  // 输出文件
  output: {
    filename: "js/[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: env == 'dev' ? '/' : config.serverPath,
    chunkFilename: 'js/[id].[hash].js'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
      "react": path.join(__dirname, "../node_modules", "react")
    },
    extensions: ['.web.js', '.js', '.jsx', '.json', '.vue'],// 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀

  },
  // 加载器
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href'],
          interpolate: true
        }
      }]
    },

    {
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    },
    {
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',//转换成node风格的js代码
        use: [{
          loader: 'css-loader',
          options: {
            localIdentName: 'purify_[hash:base64:5]',
          }
        }, {
          loader: "postcss-loader",
          options: {
            plugins() {
              return [
                require("postcss-px2rem-exclude")({
                  remUnit: 100,
                  exclude: /mint-ui/i 
                }),
                require("autoprefixer")(),
              ]
            }
          }
        }, 'sass-loader']//css-loader 把css打包成模块
      })
    },

    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 8192,
          // 打包生成图片的名字
          name: "image/[name].[hash].[ext]",
        }
      }],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ["url-loader?limit=8192&name=font/[hash:8].[ext]"]
    },
    // vue-loader
    {
      test: /\.vue$/,
      loader: "vue-loader",
      options: {
        loaders: [
          { "css": "style-loader!css-loader" },
          { "scss": "style-loader!css-loader!sass-loader" },
          // {"less":"style-loader!css-loader!less-loader"},
        ],
        postcss: function () {
          return [require("postcss-px2rem-exclude")({
            remUnit: 100,
            exclude: /mint-ui/i 
          })];
        }
      }
    }
    ],
  },
  // 插件
  plugins: [
    // 自动生成 HTML 插件
    ...HTMLPlugins,
    // 提取公共 JavaScript 代码
    ...CommonsChunkPlugin,
    new webpack.BannerPlugin('版权所有，翻版必究'),
    //全局配置变量axios
    new webpack.ProvidePlugin({
      axios: 'axios',
      Vue: 'vue'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true,
    }),
   
  ],
}