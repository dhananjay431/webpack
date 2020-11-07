const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = {
    mode: 'production',
    entry: {
        prod: './src/index.ts',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //     title: 'Production',
    // }),
    // ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
}