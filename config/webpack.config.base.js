const path = require('path');
const utils = require('./util')
const nodeExternals = require("webpack-node-externals")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require('webpack');

const webpackConfig = {
    target: "node",
    entry: {
        server: path.join(utils.APP_PATH, "index.js")
    },
    output: {
        filename: "[name].bundle.js",
        path: utils.DIST_PATH
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: [path.join(utils.APP_PATH, "/node_modules")]
            }
        ]
    },
    externals: [
        nodeExternals()
    ],
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') ? "'production'" : "'development'"
            }
        })
    ],
    node: {// 这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量。 此功能由 webpack 内部的 NodeStuffPlugin 插件提供。
        // console: true,
        global: true,
        // process: true,
        // Buffer: true,
        __filename: true,
        __dirname: true,
        // setImmediate: true,
        // path: true,
    },
}

module.exports = webpackConfig
