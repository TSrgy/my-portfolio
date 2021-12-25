const { merge } = require("webpack-merge");
const { main, renderer } = require("./webpack.common.js");

module.exports = [
    merge(main, {
        mode: "production"
    }),
    merge(renderer, {
        mode: "production"
    })
];
