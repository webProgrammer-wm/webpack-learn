const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*

 */

const config = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        // 文件名称（指定名称 + 目录）
        filename: "js/[name].js",
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'dist'),
        // 所有输出资源引入的公共路径的前缀 -> 路径的前面
        publicPath: "/",
        // 非入口chunk的名称
        chunkFilename: '[name]_chunk.js',
        // library: '[name]', // 整个库向外暴露的变量名
        // libraryTarget: 'window', // 变量名添加到window上，browser端
        // libraryTarget: 'global' // 变量名添加到global上，node端
        // libraryTarget: 'commonjs'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}

module.exports = config
