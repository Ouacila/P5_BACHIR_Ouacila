const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "shop.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    historyApiFallback:true,
    proxy: {
    api: {
        target : "http://localhost:3000",
        secure: false
      }
    }
  }
};