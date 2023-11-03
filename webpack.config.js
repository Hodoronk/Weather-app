const path = require("path");
const Dotenv = require('dotenv-webpack');

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
    new Dotenv()
  ]
};
