/**
 * Created by sunhongyan on 2018/11/25.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path        : __dirname + '/dist/',
        filename    : 'js/[name].js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname + '/src'),
            '@page': path.resolve(__dirname + '/src/page'),
            '@api': path.resolve(__dirname + '/src/api'),
            '@assets': path.resolve(__dirname + '/src/assets'),
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/vender.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '登录'))
    ],
    devServer: {
        port: 8088,
        inline: true,
        contentBase: "./",
        historyApiFallback:true,
        hot:true
        // proxy : {
        //     '**/*.do' : {
        //         target: 'http://test.happymmall.com',
        //         changeOrigin : true
        //     }
        // }
    },
    module: {
        rules: [
            // 用于规定在不同模块被创建时如何处理模块的规则数组
            {
                test: /\.js$/,// 匹配特定文件的正则表达式或正则表达式数组
                include: path.resolve(__dirname, 'src'),// 指定需要转译的文件夹
                exclude: path.resolve(__dirname, 'node_modules'),// 指定转译时忽略的文件夹
                use: {
                    loader: 'babel-loader', // 依赖的loader
                    options: {
                        presets: ['env'] // 最新标准
                    }
                }
            },
            {
                test: /\.css$/,// 匹配特定文件的正则表达式或正则表达式数组
                use: [ // 应用于模块的 loader 使用列表
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader', // 兼容一些需要写前缀的css并压缩空格
                    }
                ]
            },
            {
                test: /\.less$/,// 匹配特定文件的正则表达式或正则表达式数组
                use: [ // 应用于模块的 loader 使用列表
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {// 转译html文件
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {// 转译ejs/tpl文件
                test: /\.ejs$/,
                use: [
                    'ejs-loader'
                ]
            },
            {// 处理写在css中的图片
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        // 将图片处理成base64时候使用
                        loader: 'url-loader',
                        // loader: 'file-loader',
                        options: {
                            // 小于2k的图片处理成64编码，大于就交给file-loader处理
                            limit: 200,
                            // 图片打包后存在assets文件下[名称]-[5位哈希值].[自身文件类型]
                            name: 'images/[name]-[hash:5].[ext]'
                        }
                    },
                    {// 压缩图片 右左顺序放到最前面
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    }
};

module.exports = config;