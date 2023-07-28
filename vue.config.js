// const { defineConfig } = require('@vue/cli-service')
// const devMode = process.env.NODE_ENV === "development";
module.exports = {
  publicPath: './',
  // transpileDependencies: true,
  lintOnSave: false,
  css: {
    // 启用 CSS modules
    //requireModuleExtension: true,
    // 是否使用css分离插件
    //extract: !devMode,
    // 开启 CSS source maps，一般不建议开启
    //sourceMap: devMode,
    // css预设器配置项
    loaderOptions: {
      sass: {
        //设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
        prependData: `
                    @import '@/assets/styles/_mixin.scss';
                `,
      },
    },
  },
  devServer: {
    proxy: {  //配置跨域
      '/ahzh': {
        target: 'http://localhost:8082/ahzh/',  //填写项目请求接口地址
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/supplier/getData/userInfo 时
            实际上访问的地址是：https://xxxxxx.com/supplier/getData/userInfo,因为重写了 /supplier
           */
          '^/ahzh': ''
        }
      },
    }
  },
}
