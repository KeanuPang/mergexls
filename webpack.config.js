'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let webpackPlugins = [
    new ExtractTextPlugin({filename: 'bundle.css'}),
];

if ('production' === process.env.NODE_ENV) {
    webpackPlugins = webpackPlugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}})
    ]);
} else {
    webpackPlugins = webpackPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),
    ]);
}

module.exports = {
    watch: true,
    target: 'electron',

    entry: {
        app: ['webpack/hot/dev-server', './app/src/entry.js']
    },

    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: path.resolve(__dirname, 'build/'),
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'app/src'),
                ],
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: '/assets/',
                    name: '[name].[ext]?[hash]'
                },
            }
        ]
    },

    plugins: webpackPlugins
};
