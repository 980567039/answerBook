module.exports = {
  css:{
    extract:false,
    sourceMap:false, // 用于开发人员定位问题
    loaderOptions:{
      postcss: {
        // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是375px的，用37.5就刚刚好。
         plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5
            })
          ]
      },
    },
    modules:false
  },
};