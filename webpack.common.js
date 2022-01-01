const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const main = {
    entry: {
        main: "./src/main/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js"
    },
    target: "electron-main",
    resolve: {
        extensions: [".ts", "..."],
        alias: {
            "@store": path.resolve(__dirname, "./src/shared/store")
        }
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

const preload = {
    entry: {
        preload: "./src/main/preload.ts"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "preload.js"
    },
    target: "electron-preload",
    resolve: {
        extensions: [".ts", "..."],
        alias: {
            "@store": path.resolve(__dirname, "./src/shared/store")
        }
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
            "@components": path.resolve(__dirname, "./src/renderer/components"),
            "@store": path.resolve(__dirname, "./src/shared/store")
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

module.exports = { main, preload, renderer };
