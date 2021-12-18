module.exports = {
    extends: "electron-snowpack/config/snowpack.js",
    plugins: ["@snowpack/plugin-react-refresh"],
    mount: {
      'src/commons': '/commons',
    },
    alias: {
      '@/': './src/',
    },
};
