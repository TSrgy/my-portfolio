const { merge } = require("webpack-merge");
const { main, renderer}  = require("./webpack.common.js");

module.exports = [
    merge(main, {
        mode: "development",
        devtool: "inline-source-map"
    }),
    merge(renderer, {
        mode: "development",
        devtool: "inline-source-map"
    })
];
