const { merge } = require("webpack-merge");
const { main, preload, renderer } = require("./webpack.common.js");

module.exports = [
    merge(main, {
        mode: "production"
    }),
    merge(preload, {
        mode: "production"
    }),
    merge(renderer, {
        mode: "production"
    })
];
