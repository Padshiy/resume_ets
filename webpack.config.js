const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            loader: ExtractTextPlugin.extract('css!stylus?resolve url')
        }, {
            test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=[path][name].[ext]?[hash]'
        }]

    },

    plugins: [
        new ExtractTextPlugin('css/[name].css', {allChunks: true}),
        new HtmlWebpackPlugin({filename: 'index.html', template: './index.pug'})
    ]
};