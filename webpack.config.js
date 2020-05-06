const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
                    /*
                        css 兼容性处理：postcss -> postcss-loader postcss-preset-env
                        帮 postcss 找到 package.json 中 browserslist里面的配置，通过配置加载指定的css兼容性样式

                        "browserslist": {
                            // 开发环境 --> 设置 node 环境变量：process.env.NODE_ENV = 'development'
                            "development": [
                                "last 1 chrome version",
                                "last 1 firefox version",
                                "laST 1 safari version"
                            ],
                            "production": [
                                ">0.2%",
                                "not dead",
                                "not op_mini all"
                            ]
                        }
                     */
                    // 使用loader的默认配置
                    // 'postcss-loader',
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
        })
    ],
    devServer: {
        compress: true,
        port: 8000
    }
}

module.exports = config
