/*
    HMR：hot module replacement
    作用:一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
        极大提升构建速度
        样式文件：如果你使用的是style-loader，那么可以使用HMR，因为它内部已经实现了
        js文件：默认不能使用HMR功能 -> 需要修改js代码，添加支持HMR功能的代码
            注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
        html文件：默认不能使用hmr功能，同时会导致 html 文件不能热更新
            解决：修改entry入口，将html文件引入
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// process.env.NODE_ENV = 'development'

const config = {
    // 生产模式下自动压缩js代码
    mode: 'development',
    entry: ['./src/js/index', './src/index.html'],
    output: {
        filename: "js/index.js",
        path: resolve(__dirname, 'dist')
    },
    devServer: {
        compress: true,
        port: 8000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 需要正确配置publicPath，才能正常显示背景图片
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // postcss的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // postcss的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|)$/,
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:8].[ext]',
                    limit: 8 * 1024,
                    esModule: false,
                    outputPath: 'assets/images'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:8].[ext]',
                    outputPath: 'assets/font'
                }
            },
            /*
                正常来讲，一个文件只能被一个loader处理。
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
                先执行 eslint，再执行babel
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // 优先执行
                enforce: "pre",
                options: {
                    // 自动修复
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash].css',
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ]
}

module.exports = config
