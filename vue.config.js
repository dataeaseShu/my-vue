const path = require('path')
const { defineConfig } = require('@vue/cli-service')
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
        .test( /\.kl$/)
        .use('custom-loader')
        .loader('custom-loader');
    const svgRule = config.module.rule('svg');
    // 清空默认svg规则
    svgRule.uses.clear();
    //针对svg文件添加svg-sprite-loader规则
    svgRule
        .test( /\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader');
}
})
