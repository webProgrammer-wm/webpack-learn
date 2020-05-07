const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: "js/[name].js",
        path: resolve(__dirname, 'dist'),
    },
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, 'dist'),
        // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
        watchContentBase: true,
        watchOptions: {
            //
            ignored: /node_modules
        },
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 8000,
        // 域名
        host: 'localhost',
        open: false,
        // 开启HMR功能
        hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息意外，其他内容都不要显示
        quiet: true,
        // 如果出错了，是否全屏提示
        overlay: false,
        // 服务器代理 -> 解决的开发环境跨域问题
        proxy: {
            // 一旦devServer（8000）服务器接收到 /api/xxx 的请求，就会转发到 target
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写：将/api/login -> /login （去掉api）
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 多个loader用use
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名
        alias: {
            // 简写路径
            $css: resolve(__dirname, 'src/assets/css')
        },
        // 配置省略文件路径的后缀名
        extensions: ['.js', '.json', '.jsx', '.css'],
        // 告诉 webpack 解析模块的时候去找哪个目录
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}

module.exports = config
