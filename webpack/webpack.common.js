const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const webpack = require("webpack");

console.log(argv.mode);

module.exports = {
    context: path.resolve(__dirname, ".."),
    entry: {
        register: './src/origin/entry/pc/pcRegister.js',
        mregister: './src/origin/entry/mobile/mRegister.js',
        tregister: './src/origin/entry/tablet/tRegister.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(c|sc|sa)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModules: true,
                            hmr: argv.mode == 'development',
                            reloadAll: true,
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ],
                sideEffects:true
            }
        ]
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname,'..','./src'),
            "@assets": path.resolve(__dirname,'..','./src/assets'),
            "@constant":path.resolve(__dirname,"..","./src/constant"),
            "@model":path.resolve(__dirname,"..","./src/main/model"),
            "@helper":path.resolve(__dirname,"..","./src/main/helper"),
            "@util": path.resolve(__dirname,'..','./src/util'),
            "@observer": path.resolve(__dirname,'..','./src/main/observer'),
            "@vpc": path.resolve(__dirname,'..','./src/main/view/pc'),
            "@vmobile": path.resolve(__dirname,'..','./src/main/view/mobile'),
            "@vtablet": path.resolve(__dirname,'..','./src/main/view/tablet'),
            "@factory": path.resolve(__dirname,'..','./src/main/factory'),
            "@api": path.resolve(__dirname,'..','./src/api'),
            "@css": path.resolve(__dirname,'..','./src/origin/css'),
            "@services": path.resolve(__dirname,'..','./src/origin/services')
        },
        extensions: ['.js','.json']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            chunkFilename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            Ajax: [path.resolve(__dirname,'../src/util/http.js'), "default"],
        }),
        new webpack.ProvidePlugin({
            CONSTANT: [path.resolve(__dirname,'../src/constant/index.js'), "default"],
        }),
        new webpack.DefinePlugin({
            $PRODUCTION: argv.mode === 'production',
        })
    ],
}
