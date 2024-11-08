const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: false,
    entry: {
        background: './src/background.js',
        content: './src/content.js',
        popup: './src/popup.js',
        popup: './src/popup.js',
        signin: './src/signin.js',
        add_definition: './src/add_definition.js',
        dictionary_panel: './src/dictionary_panel.js',
        all_keys_panel: './src/all_keys_panel.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Clean the output directory before emit.
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: 'static' }],
        }),
    ],
    resolve: {
        extensions: ['.js', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}