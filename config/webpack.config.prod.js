const {merge} = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");
//压缩代码 新：Terser     旧：Uglify
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    stats: { children : false,  warnings: false },// webpack 关闭日志消息
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        comparisons: false,
                        // 是否注释掉 console
                        drop_console: false,
                        dead_code: true,
                        drop_debugger: true,
                    },
                    parse: {},
                    mangle: true,
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
                parallel: true,
                // cache: true,
                // sourceMap: true,
            })
        ],
        splitChunks: {// 避免依赖重复使用
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true,
                }
            },
        },

    }
})

module.exports = webpackConfig;
