/**
 * 开发环境配置
 */

const webpack = require("webpack");
const path = require("path");
// 引入基础配置文件
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 引入配置文件
const config = require("./config");
// 合并配置文件
const openBrowserWebpackPlugin = require("open-browser-webpack-plugin");
module.exports = webpackMerge(webpackBase, {


     // 启用 sourceMap
    devtool: "eval-source-map",
    // 插件
   
    // 配置 webpack-dev-server
    devServer: {
        // 项目根目录
        contentBase: path.resolve(__dirname,"../dist"),
        compress:true,
        publicPath: "/",
        inline: true,//实时刷新
        host: '0.0.0.0',
        hot: true,
        // open:true,
        historyApiFallback: true ,//html5 history API
        disableHostCheck: true,
        // 错误、警告展示设置
        overlay: {
            errors: true,
            warnings: true,
        },
        // proxy: {
        //     'api/': {
        //         target: 'http://39.107.78.155:7777',//设置你调用的接口域名和端口号 别忘了加http
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^api/': ''
        //             //这里理解成用‘/api’代替target里面的地址，
        //             // 后面组件中我们掉接口时直接用api代替 比如我要调
        //             // 用'http://40.00.100.100:3002/user/add'，直接写‘/ api / user / add’即可
        //         }
        //     },
        // },
       
    },
    plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new openBrowserWebpackPlugin({   // 自动打开浏览器  
            url:"http://localhost:8080"
        }),
    ],
});