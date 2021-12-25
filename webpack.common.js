const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const main = {
    entry: "./src/main/index.ts",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js"
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
    entry: "./src/renderer/index.tsx",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "renderer.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", "..."]
    },
    target: "electron-renderer",
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: "ts-loader" }]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    })]
};

module.exports = { main, renderer };
