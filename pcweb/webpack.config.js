//webpack.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i, //测试匹配文件,
        include: /\/includes/, //包含哪些文件
        excluce: /\/excludes/, //不包含哪些文件
        //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。 
        //返回true以uglify块，否则返回false。
        chunkFilter: (chunk) => {
          // `vendor` 模块不压缩
          if (chunk.name === 'vendor') {
            return false;
          }
          return true;
        }
      }),
      cache: false, //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
      parallel: true, //使用多进程并行运行来提高构建速度
    ],
  },
};
