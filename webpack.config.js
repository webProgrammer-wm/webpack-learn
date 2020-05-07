const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: "js/[name].js",
        path: resolve(__dirname, 'dist'),
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
