const { merge } = require("webpack-merge");
const { main, preload, renderer}  = require("./webpack.common.js");

module.exports = [
    merge(main, {
        mode: "development",
        devtool: "inline-source-map"
    }),
    merge(preload, {
        mode: "production"
    }),
    merge(renderer, {
        mode: "development",
        devtool: "inline-source-map"
    })
];
