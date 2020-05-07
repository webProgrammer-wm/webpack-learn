const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
    entry：入口起点
        1.string -> './src/index.js'
            单入口
            打包形成一个chunk，输出一个bundle文件
            chunk名称默认是 main
        2.array -> ['./src/index.js', './src/add.js']
            多入口
            所有入口文件最终只会形成一个chunk，输出出去只有一个文件
                -> 只有在HMR功能中让html热更新生效
        3.object
            {
                 index: './src/index.js',
                 add: './src/add.js'
            }
            多入口
            有几个入口文件就形成几个chunk，输出几个bundle文件
            此时的chunk名称是key
                -> 特殊用法
                    {
                         多个入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
                         index: ['./src/index.js', './src/mul.js'],
                         形成一个chunk，输出一个bundle文件
                         add: './src/add.js'
                    }
 */

const config = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: "js/[name].js",
        path: resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}

module.exports = config
