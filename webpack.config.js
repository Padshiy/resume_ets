const webpack = require('webpack');
const StylExtractTextPlugin = require("extract-text-webpack-plugin");
const CSSExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        main: './index'
    },

    output: {
        path:       __dirname + '/public',
        publicPath: '/',
        filename:   '[name].js'
    },
    
    watch: NODE_ENV == 'development ',

    watchOption: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development ' ? "cheap-inline-module-source-map" : null,
    
    module: {

        loaders: [{
            test:    /\.js$/,
            include: __dirname + '/frontend',
            loader:  "babel?presets[]=es2015"
        }, {
            test:   /\.pug$/,
            loader: "pug"
        }, {
            test:   /\.styl$/,
            loader: StylExtractTextPlugin.extract('css!stylus?resolve url')
        }, {
            test:   /\.css/,
            loader: 'style!css!autoprefixer?browsers=last 2 versions'
        }, {
            test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=[path][name].[ext]'
        }]

    },

    plugins: [
        new StylExtractTextPlugin('css/[name].[hash].css', {allChunks: true}),
        new CSSExtractTextPlugin('css/[name].[hash].css', {allChunks: true}),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.pug'
        })
    ]
};
