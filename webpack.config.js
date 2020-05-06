const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: 'production',
    entry: {
        // 多入口：输出多个文件
        // 问题：如果有100个js，就要写100个键值对
        index: './src/js/index',
        test: './src/js/test'
    },
    output: {
        filename: "js/[name]/[name]-[contenthash].js",
        path: resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin({}),
    ],
}

module.exports = config
