## 云生活超市管理系统（完整的后台管理系统）
React后台项目：react + react-router4 + redux + antd + axios + sass

### 技术栈
1. react 16.2.0
2. react-router-dom 4.2.2 (react-router 4)
3. redux
4. ant-design
5. axios
6. sass
7. es6 + babel ( 配了babel-plugin-transform-decorator-legacy 装饰器)

### 项目启动
1. ***首先你可以安装一下yarn，并使用taobao registry***
```bash
npm install -g yarn
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
2. ***克隆项目并安装环境***
```bash
git clone https://github.com/dekvos123/cms_community_e_commerce.git
cd cms_community_e_commerce
yarn
```
3. ***直接运行***
```bash
npm start
```

### 目录结构介绍
```js
### 目录结构介绍
***├── config                              // webpack配置文件***
***├── public                              ***
***├── dist                                ***
***├── node_modules                        // 项目的包依赖***
***├── src                                 // 源码目录***
***│   ├── assets                          // 存放项目的一些资源和SCSS文件***
***│   ├── components                      // 页面组件***
***│   ├── containers                      // 页面（容器） ***
***│   ├── constants                       // 项目全局配置***
***│   ├── services                        // 服务器端接口数据映射***
***│   ├── reducers                        // reducers***
***│   ├── actions                         // actions***
***│   ├── utils                           // 封装的一些常用工具 ***
***│   ├── Routes.js                       // 页面路由 ***
***│   ├── index.js                        // 程序入口文件，加载各种公共组件***
***├── .babelrc                            // babel配置文件 ***
```
### 使用说明
* 管理员默认账号：admin 密码：admin
