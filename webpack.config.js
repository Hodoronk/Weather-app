const path = require("path");
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    usedExports: true,
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    alias: {
      'date-fns': path.resolve(__dirname, 'node_modules/date-fns/esm'),
    },
  },
  plugins: [
    new Dotenv(), // Load environment variables from .env file
    new webpack.DefinePlugin({
      AUTH_KEY: JSON.stringify(process.env.AUTH_TOKEN),
      WEATHERAPI_KEY: JSON.stringify(process.env.WEATHERAPI_KEY)
    }),
  ],
};
