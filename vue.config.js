const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //打包关闭map  map主要是映射错误代码的位置
  productionSourceMap:false,
  lintOnSave: false,//关闭eslint校验工具
  //配置指定的端口号
  devServer: {
    host: 'localhost',
    // development server port 8000
    port: 8000,
    //代理服务器解决跨域
    proxy: {
      //会把请求路径中的/api换为后面的代理服务器
      '/api': {
        //提供数据的服务器地址
        target: 'http://gmall-h5-api.atguigu.cn',
      }
    },
  }
})
