'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 内部插件
const webpack = require('webpack');
// 压缩混淆
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {

    //入口
    entry: {
        main: './src/main.js',
        vendors:['vue','vue-router','moment','axios','vue-preview']
    },
    output: {
        //所有产出资源路径
        path: path.join(__dirname, 'dist'),

        // 设置资源路径的请求地址
        publicPath:'/',

        // filename: 'build.js'
        filename:'js/[name].[chunkhash:6].js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                // loader: 'style-loader!css-loader!autoprefixer-loader'
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!autoprefixer-loader"
                })
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096, //4096字节以上生成文件，否则base6
                    name: 'assets/[name].[ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                // options: {
                //     presets: ['es2015'], //关键字
                //     plugins: ['transform-runtime'], //函数
                // }
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                // options: {
                //     presets: ['es2015'], //关键字
                //     plugins: ['transform-runtime'], //函数
                // }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        // 混淆压缩
        new UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            // 清单,用来记录使用者和第三方包
            names:['vendors','mainfest']
        }),
        new ExtractTextPlugin("css/style.[contenthash:6].css"),
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}