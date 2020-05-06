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
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin({}),
    ],
    /*
        source-map：一种提供源代码到构建后代码映射技术（如果构建后代码出错了，可以通过映射追踪源代码错误）
        [inline-|hidden-|eval-|nosources-|cheap-[module-]]source-map

        source-map：外部
            错误代码准确信息 和 源代码的错误位置
        inline-source-map：内联
            只生成一个内联source-map
            错误代码准确信息 和 源代码的错误位置
        hidden-source-map：外部
            错误代码错误原因，但是没有错误位置，不能追踪到源代码错误，只能提示到构建后代码的位置
        eval-source-map：内联
            每一个文件都生成对应的source-map，都在eval函数里
            错误代码准确信息 和 源代码的错误位置
        nosources-source-map：外部
            错误代码准确信息，但是没有任何源代码信息
        cheap-source-map：外部
            错误代码准确信息 和 源代码的错误位置
            只能准确到行
        cheap--module-source-map：外部
            错误代码准确信息 和 源代码的错误位置
            module会将loader的source map 加入

        内联和外部的区别：1.外部生成了文件，内联没有 2.内联构建速度更快

        开发环境：速度快，调试更友好
            速度快（eval>inline>cheap...)
                eval-cheap-source-map
                eval-source-map
            调试更友好、
                souce-map
                cheap-module-source-map
                cheap-source-map

            eval-source-map / eval-cheap-module-source-map

        生产环境：源代码要不要隐藏？调试要不要更友好
            内联会让代码体积非常大，所以在生产环境不用内联
            nosources-source-map 全部隐藏
            hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

            source-map / cheap-module-source-map
     */
    devtool: 'eval-source-map'
}

module.exports = config
