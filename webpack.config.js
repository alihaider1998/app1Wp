const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const PORT = 3001;

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction
        ? "https://alihaider1998.github.io/app1/"
        : "auto",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app1",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        remotes: {
          mainApp: isProduction
            ? "mainApp@https://alihaider1998.github.io/mainappwp/remoteEntry.js"
            : "mainApp@http://localhost:3000/remoteEntry.js",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: isProduction,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
            eager: isProduction,
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: false,
            eager: isProduction,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        templateParameters: {
          BASE_URL: isProduction ? "/app1/" : "/",
        },
      }),
    ],
    optimization: {
      moduleIds: "deterministic",
      chunkIds: isProduction ? "deterministic" : "named",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      port: PORT,
      historyApiFallback: true,
      open: true,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      client: {
        logging: "warn",
        overlay: true,
      },
      onListening: function (devServer) {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }
        console.log(
          "\x1b[36m%s\x1b[0m",
          `Development server is running on port: ${PORT}`
        );
      },
    },
    stats: {
      preset: "minimal",
      moduleTrace: false,
      errorDetails: true,
      chunks: false,
      colors: true,
      assets: false,
      modules: false,
      version: false,
      hash: false,
      builtAt: false,
    },
    infrastructureLogging: {
      level: "error",
    },
    performance: {
      hints: isProduction ? "warning" : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
