const path = require("path");
const webpack = require("webpack");
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
// process.env.NODE_ENV = 'development'
// if (process.env.NODE_ENV === "test") {
//   require("dotenv").config({ path: ".env.test" });
// } else if (process.env.NODE_ENV === "development") {
//   require("dotenv").config({ path: ".env.development" });
// }

module.exports = (env) => {
  const isProduction = env === "production";
  // const isProduction = false
  const CSSExtract = new ExtractTextPlugin("styles.css");

  return {
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        // {
        //   test: /\.(png|jpg)$/,
        //   loader: 'url?limit=25000'
        // },

        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "less-loader",
              options: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          ],
        },

        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      CSSExtract,
      // new webpack.DefinePlugin({
      //   "process.env.NODE_ENV": JSON.stringify(
      //     process.env.NODE_ENV || "development"
      //   ),
      // }),
      // new UglifyJSPlugin(),
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      port: 8082,
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/",
      proxy: {
        "/api": {
          target: "http://smartship-beta-api-server.herokuapp.com",
          // target: "http://[::1]:5050",
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
};
