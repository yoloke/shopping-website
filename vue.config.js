const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭eslint校验工具
  //配置指定的端口号
  devServer: {
    host: 'localhost',
    port: 8080
  }
})
