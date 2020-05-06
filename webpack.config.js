const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 定义nodejs的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

/*
    tree shaking：去除无用代码
        前提：1.必须使用ES6模块化 2.开启production环境

        在package.json 中配置
            "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking)
                问题：可能会把css / @babel/polyfill（副作用）文件干掉
            "sideEffects": ["*.css"]
 */

const config = {
    mode: 'production',
    entry: {
         index: ['./src/js/index', './src/index.html'],
    },
    output: {
        filename: "js/[name]-[contenthash].js",
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
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: "pre",
                options: {
                    fix: true
                }
            },
            {
                oneOf: [
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
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
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
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
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
            filename: 'assets/css/[name]-[contenthash].css',
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin({}),
    ],
    devtool: 'eval-source-map'
}

module.exports = config
