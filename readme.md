# 🔥 商铺售货系统

- 服务端：基于 `Node.js`,`koa2`实战开发的一套完整的商铺售货系统，采用 RESTful API 接口设计方案。
- 前端：采用`react`、`antd`、`react-router`、`mobx`、`typeScript`等框架开发
- 小程序：采用`Taro`框架开发

## 后端

#### 数据库

启动项目前一定要在创建好 `salesystem` 数据库。

```
# 登录数据库
$ mysql -uroot -p密码

# 创建数据库
$ CREATE DATABASE IF NOT EXISTS salesystem DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

```

#### 修改 Koa2 项目数据库配置

请在根目录下的 config/config.js 文件下修改您本地的数据库名字（`salesystem`）和数据库密码。

#### 克隆项目

首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。

```

# 进入项目根目录
$ cd /server

# 安装依赖包
$ npm install

# 启动 Node.js Koa2 项目
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000/v1/
# 可以查看目录下的 ./app/api/v1 下的接口 或者 看 doc 目录下的markdown 接口文档，在 postman 测试接口

```

## 前端

#### 依赖模块

- [react](https://facebook.github.io/react/)(搭积木的必备玩具)
- [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react 路由，4.x 的版本</span>)
- [mobx](https://github.com/mobxjs/mobx)(Mobx 是一个功能强大,上手非常容易的状态管理工具)
- [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard)(记住，要是背后有人偷看到这个画面，就假装在为美国国家航天局工作。)
- [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的 react ui 组件框架</span>)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http 请求模块</span>)
- [echarts](https://github.com/apache/incubator-echarts)(<span style="color: rgb(243,121,52);">百度开源可视化图表工具</span>)
- [nprogress](https://github.com/rstacruz/nprogress)(<span style="color: rgb(243,121,52);">顶部加载条</span>)
- [animate.css](https://daneden.github.io/animate.css/)(<span style="color: rgb(243,121,52);">css 动画库</span>)
- [moment](http://momentjs.cn/)(<span style="color: rgb(243,121,52);">时间工具库</span>)
- [lodash](https://www.lodashjs.com/)(<span style="color: rgb(243,121,52);">是一个一致性、模块化、高性能的 JavaScript 实用工具库。</span>)
- 其余省略

#### 功能模块

- 商品管理
- 订单管理
- 销售数据看板

#### 如何启动

1. yarn 或者 npm 安装相关包文件

```bash
yarn install  Or  npm install
```

2. 启动项目

```bash
yarn start  Or  npm run start
```

4. 启动完成后打开浏览器访问 [http://localhost:9527](http://localhost:9527)，如果需要更改启动端口，可在 .env 文件中配置。

5. 打包项目

```bash
yarn build or npm run build
```
