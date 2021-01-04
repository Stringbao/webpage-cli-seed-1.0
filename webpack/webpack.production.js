const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const argv = require('yargs-parser')(process.argv.slice(2));

console.log(argv.mode);

module.exports = merge(common,{
    mode:"production",
    // devtool:"source-map",
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].min.js",
        library: "leRegister",
        libraryTarget: "umd",
        libraryExport: 'default',
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "pcRegister.html",
            template: "./src/origin/ejs/pc/pcRegister.ejs",
            minify: false,
            mode: argv.mode,
            inject: false,
            chunks:["register"]
        }),
        new HtmlWebpackPlugin({
            filename: "mRegister.html",
            template: "./src/origin/ejs/mobile/mRegister.ejs",
            minify: false,
            mode: argv.mode,
            inject: false,
            chunks:["mregister"]
        }),
        new HtmlWebpackPlugin({
            filename: "tRegister.html",
            template: "./src/origin/ejs/tablet/tRegister.ejs",
            minify: false,
            mode: argv.mode,
            inject: false,
            chunks:["tregister"]
        }),
        new CleanWebpackPlugin(),
        new SimpleProgressWebpackPlugin()
    ]
})