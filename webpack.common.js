const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const main = {
    entry: {
        main: "./src/main/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
        clean: true
    },
    target: "electron-main",
    resolve: {
        extensions: [".ts", "..."]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: /src/,
                use: [{ loader: "ts-loader" }]
            }
        ]
    }
};

const renderer = {
    entry: {
        rendered: "./src/renderer/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "renderer.js",
    },
    resolve: {
        extensions: [".tsx", ".ts", "..."],
        alias: {
            "@components": path.resolve(__dirname, "./src/renderer/components")
        }
    },
    target: "electron-renderer",
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: "ts-loader" }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};

module.exports = { main, renderer };
