const path = require('path')

const config = {
    // 入口文件
    entry: './src/index',
    // 输出目录，输出文件名
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist')
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
                    'sass-loader'
                ]
            }
        ]
    },
    // plugin 的配置
    plugins: [
        // 详细plugin的配置
    ],
    // 模式
    mode: 'development' // production
}

module.exports = config
