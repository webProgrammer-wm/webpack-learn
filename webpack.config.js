const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 定义nodejs的环境变量，决定使用browserslist的哪个环境
// process.env.NODE_ENV = 'development'

/*
    缓存：
        babel缓存
            cacheDirectory: true
            -> 让第二次打包构建速度更快
        文件资源缓存
            hash：每次webpack构建时会生成一个唯一的hash值
                问题：因为js和css同时使用一个hash值。
                    如果重新打包，会导致所有缓存失效。（可能我只改动了一个文件）
            chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
                问题：因为css是在js里引入的，所有它们的hash值一样，属于同一个chunk
            contenthash：根据文件内容生成的hash值，不同文件、不同文件内容hash值一定不一样
            -> 让代码上线运行的缓存
 */

const config = {
    // 生产模式下自动压缩js代码
    mode: 'development',
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
                    // 自动修复
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
