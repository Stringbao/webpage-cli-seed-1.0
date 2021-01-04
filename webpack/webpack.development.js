const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const path = require("path");
const SSICompileWebpackPlugin = require("ssi-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, `../dist`),
        filename: "scripts/[name].[hash].bundle.js",
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: ["./dist"],
        hot: true,
        watchContentBase: true,
        openPage: "./pcRegister.html",
        port: 9987,
        host:"t.gl.lenovouat.cn",
        proxy: {
            // "/openapi": {
            //     target: "https://openapi.lenovouat.cn/",
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         "^/openapi": "",
            //     },
            // },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "pcRegister.html",
            template: "./src/origin/ejs/pc/pcRegister.ejs",
            chunks: ["register", "runtime", "vendors"],
            inject: true,
            mode: argv.mode,
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: "mRegister.html",
            template: "./src/origin/ejs/mobile/mRegister.ejs",
            chunks: ["mregister", "runtime", "vendors"],
            inject: true,
            mode: argv.mode,
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: "tRegister.html",
            template: "./src/origin/ejs/tablet/tRegister.ejs",
            chunks: ["tregister", "runtime", "vendors"],
            inject: true,
            mode: argv.mode,
            minify: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new SSICompileWebpackPlugin({
            // localBaseDir: path.resolve(__dirname, '../Inc'),
            // publicPath: ''
            remoteBasePath:"https://j1-ofp.lenovouat.cn",
            minify: false
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\/]node_modules[\/]/,
                    minChunks: 1,
                    priority: -10,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
        runtimeChunk: {
            name: "runtime",
        },
    },
    watchOptions: {
        ignored: /node_modules/,
    },
});
