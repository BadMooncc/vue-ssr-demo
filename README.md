# vue-cli2 服务端渲染脚手架

> 开发环境不会走服务端渲染，只会在项目打包后，运行server.js(node服务)会走服务端渲染。
> 需要使用服务端渲染的数据，需要写在组件的asyncData方法中，使用vuex进行数据的存储。

## Build Setup

``` bash
# 安装所需依赖
npm install

# 开发环境启动，不走服务端渲染，只是正常的客户端渲染
npm run dev

# build for production with minification
npm run build

# 打包后启动node服务，此时会走服务端渲染，需要服务端预先获取数据的请求在开发时需要写在asyncData中。这部分请求会由服务端发送
node server.js
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
