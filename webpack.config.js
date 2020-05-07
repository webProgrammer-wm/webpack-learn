const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const config = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, 'dist'),
        chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
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
    optimization: {
        splitChunks: {
            chunks: "all",
            // 默认值
            // minSize: 30 * 1024, // 分割的chunk最小为30kb
            // maxSize: 0, // 最大没有限制
            // minChunks: 1, // 至少被引用了一次才会被分割
            // maxAsyncRequests: 5, // 按需加载时并行加载文件的最大数量
            // maxInitialRequests: 3, // 入口js文件最大并行请求数量
            // automaticNameDelimiter: "~", // 名称连接符
            // cacheGroups: { // 分割chunk的组
            //     // node_modules 文件会被打包到 vendors 组的chunk中。 -> vendors~xxx.js
            //     // 满足上面的公共规则
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         // 优先级
            //         priority: -10
            //     },
            //     default: {
            //         // 要提取的chunk最少被引用2次
            //         minChunks: 2,
            //         priority: -20,
            //         // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
            //         reuseExistingChunk: true
            //     }
            // }
        },
        // 将当前模块记录其他模块的hash单独打包为一个文件：runtime
        // 解决问题：修改a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: [
            // 配置生产环境的压缩方案：js和css
            new TerserWebpackPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 启动source-map
                sourceMap: true
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}

module.exports = config
