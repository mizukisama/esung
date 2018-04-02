/**
 * 生产环境配置
 */

const webpack = require("webpack");
const path = require("path");

// 引入基础配置
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 清理 dist 文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin")
//代码压缩代替内置 压缩工具能压缩es6代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 提取js中的css



// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    
    devtool: "none",
    plugins:[
    
   
        // 代码压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     // 开启 sourceMap
        //     // sourceMap: true,
        //     compress: {
                // warnings: false,
                // drop_debugger: true,
                // drop_console: true,
        //         pure_funcs: ['console.log']//移除console
        //     },
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                }
            },
            parallel: true
        }),

        // }),
       
        new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(['dist'], {
          root: path.resolve(__dirname, '../'),  //根目录

          verbose: true,    //开启在控制台输出信息

          dry: false　　　　  //启用删除文件
        }),
    ]
});
