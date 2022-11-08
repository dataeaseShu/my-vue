const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const UselessFile = require('./check')
module.exports = defineConfig({
  transpileDependencies: true,
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
