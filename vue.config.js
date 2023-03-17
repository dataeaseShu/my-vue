const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const UselessFile = require('./check')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // page 的入口(必选项，除此之外就是可选项)
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: {
      // page 的入口(必选项，除此之外就是可选项)
      entry: "src/webpackLibrary.js",
      // 模板来源
      template: "public/webpackLibrary.html",
      // 在 dist/index.html 的输出
      filename: "webpackLibrary.html",
      library: {
        name: 'webpackLibrary',
        type: 'umd',
      },
    }
  },
  configureWebpack: {
    resolveLoader: {
      modules: [path.resolve(__dirname, './src/customLoader')],
    },
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    },
    plugins: [new UselessFile({
      root: './src', // 项目目录
      output: './unused-files.json', // 输出文件列表
      clean: false, // 是否删除文件,
      exclude: [/node_modules/] // 排除文件列表
    })],
    devServer: {
      proxy: {
        '/dev-api': {
          target: 'http://api.fanyi.baidu.com/api/trans/vip/translate', // 配置要替换的后台接口地址
          changOrigin: true, // 配置允许改变Origin
          ws: true, // proxy websockets
          pathRewrite: {
            '^/dev-api': '/'
          }
        },
      }
    }
  },
  /* svg 相关配置 */
  chainWebpack: config => {
    config.module
      .rule('kl')
      .test(/\.kl$/)
      .use('custom-loader')
      .loader('custom-loader');
    const svgRule = config.module.rule('svg');
    // 清空默认svg规则
    svgRule.uses.clear();
    //针对svg文件添加svg-sprite-loader规则
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');
  }
})
