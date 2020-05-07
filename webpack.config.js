const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// process.env.NODE_ENV = 'development'

const config = {
    mode: 'development',
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
                    'sass-loader',
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
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    /* 开启多进程打包
                       进程启动大概为600ms，进程通信也有开销
                       只有工作消耗时间比较长，才需要多进程打包
                     */
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2 // 2个进程
                        }
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash].css',
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer: {
        compress: true,
        port: 8000
    }
}

module.exports = config
