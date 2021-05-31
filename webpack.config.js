const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000,     
        watchOptions: {
          ignored: /node_modules/
        }
    },
    entry: {
        'goong-maps-component': [
        './src/index.js',
        './styles/index.scss',
        '@goongmaps/goong-js/dist/goong-js.css'
        ]
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
        {
          test: /\.js$/,
          use: [
            {loader: "babel-loader"}
          ]
        },
        {
            test: /\.css$/,
            use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
                loader: "css-loader"
            }
            ]
        },
        {
            test: /\.(sa|sc)ss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: "css-loader"
            },
            {
                loader: 'sass-loader'
            }
            ]
        }
        ]
    },

    plugins: [
      new MiniCssExtractPlugin({
          filename: '[name].min.css'
      })
    ]
};
