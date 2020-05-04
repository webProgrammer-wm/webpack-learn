/*
    开发环境的配置：能让代码运行
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: './src/js/index',
    output: {
        filename: "js/index.js",
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出问题：图片路径为[object Module]
                    // 解决：关闭 url-loader的es6模块化，使用commonjs解析
                    // tips：在我的机器上未遇到这种问题，猜测应该是url-loader的版本问题
                    esModule: false,
                    outputPath: 'src/images'
                    // name: '[path][name]-[hash:8].[ext]',
                    // context:'src'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(ttf|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name]-[hash:8].[ext]',//path为相对于context的路径
                    outputPath: 'src/font'
                    // context:'src'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 以 template 路径的文件为模板，并引入打包输出的所有资源（ JS / CSS ）
            template: './src/index.html'
        })
    ],
    mode: 'development',

    devServer: {
        compress: true,
        port: 8000
    }
}

module.exports = config
