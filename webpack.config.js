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
      'goong-maps-component': './src/index.js'
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist'),
      library: "GoongMap",
      libraryTarget: "umd"
    },
    module: {
        rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
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
          filename: 'goong-maps-component.min.css'
      })
    ]
};
