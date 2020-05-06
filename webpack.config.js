const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: 'production',
    entry: './src/js/index.js',
    // entry: {
    //     index: './src/js/index.js',
    //     test: './src/js/test.js'
    // },
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
    /*
        可以将node_modules 中代码单独打包一个chunk，最终输出
        可以分析多入口chunk中，有没有公共的文件。如果有会打包成一个单独一个chunk
     */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}

module.exports = config
