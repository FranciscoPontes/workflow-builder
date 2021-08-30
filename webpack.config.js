/* eslint-disable no-var, strict, prefer-arrow-callback */
"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",

  entry: ['babel-polyfill', "./src/index.js"],

  devServer: {
    port: 3000
  },

  output: {
    path: path.resolve("dist"),
    filename: "graphical_workflow.js",
    libraryTarget: "var",
    library: "GraphicalWorkflow",
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true
            }
          }
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Graphical Workflow",
      template: "public/index.html",
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],

  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
};
