const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        background: './src/background.js',
        content: './src/content.js',
        popup: './src/popup.js',
        popup: './src/popup.js',
        signin: './src/signin.js',
        add_definition: './src/add_definition.js'
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
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify("development"),
                APIKEY : JSON.stringify("AIzaSyASj3oiyk2htYYFzjI6CuAaFkDRps2OgE0"),
                AUTHDOMAIN : JSON.stringify("savedef-70734.firebaseapp.com"),
                PROJECTID :  JSON.stringify("savedef-70734"),
                STORAGEBUCKET : JSON.stringify("savedef-70734.appspot.com"),
                MESSAGINGSENDERID : JSON.stringify("238601540911"),
                APPID : JSON.stringify("1=238601540911=web=77dcea7230638c49debdda"),
                MEASUREMENTID : JSON.stringify("G-6PC875M72C")
            },
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
    }
}