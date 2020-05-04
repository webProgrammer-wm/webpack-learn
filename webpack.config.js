const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
    loader：1.下载     2.使用（配置loader）
    plugins：1.下载    2.引入    3.使用
 */

const config = {
    // 入口文件
    entry: './src/index',
    // 输出目录，输出文件名
    output: {
        filename: "index.js",
        path: resolve(__dirname, 'dist')
    },
    // loader 的配置
    module: {
        // 详细loader配置
        rules: [
            {
                // 匹配规则
                test: /\.css$/,
                use: [
                    // 创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将sass文件编译成css文件
                    'sass-loader'
                ]
            }
        ]
    },
    // plugin 的配置
    plugins: [
        // html-webpack-plugin
        // 功能：默认会创建一个空的html，引入打包输出的所有资源（ JS / CSS ）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 以 template 路径的文件为模板，并引入打包输出的所有资源（ JS / CSS ）
            template: './src/index.html'
        })
    ],
    // 模式
    mode: 'development' // production
}

module.exports = config
