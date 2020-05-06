const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash].css',
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer: {
        compress: true,
        port: 8000
    }
}

module.exports = config
