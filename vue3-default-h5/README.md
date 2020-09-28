# vue3 h5项目
```
  基于vue3的h5基础项目, 路由懒加载, axios封装拦截,vuex状态持久化,多环境打包api
```

## 安装项目依赖
```
yarn install
```

### 启动项目
```
yarn run serve
```

### 测试环境打包
```
yarn run build:test
```

### 正式环境打包
```
yarn run build
```

### Api配置

```
.env 文件: 开发环境api
.env.test 文件: 测试环境api
.env.production 文件: 正式环境api
```


### 项目依赖说明
- [x] sass 预处理器
- [x] postcss-px2rem 移动端适配插件
- [x] normalize.css 去除浏览器默认样式的差异
- [x] vuex-persistedstate vuex状态持久化插件
- [x] axios http请求库
- [x] cross-env 修改build:test的环境变量