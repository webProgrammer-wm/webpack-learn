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
            },
            {
                // 问题：默认不能处理html中img图片
                // 处理图片资源
                test: /\.(jpg|png|gif|jpeg)$/,
                // 需要下载 url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，就会被转换成base64编码
                    // 优点：减少http请求（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度会更慢）
                    limit: 20 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出问题：图片路径为[object Module]
                    // 解决：关闭 url-loader的es6模块化，使用commonjs解析
                    // tips：在我的机器上未遇到这种问题，猜测应该是url-loader的版本问题
                    esModule: false,
                    // 给图片进行重命名
                    // [name]取原文件名
                    // [hash:12]取图片的hash前12位
                    // [ext]取文件的原扩展名
                    name: '[name]-[hash:12].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件里的img图片（负责引入img，从而能被url-loader进行处理
                loader: 'html-loader'
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
