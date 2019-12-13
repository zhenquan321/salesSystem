
Node 版本: 8.12.0
Npm 版本: 6.4.1
MySQL 版本: 5.7.22


```
cd server
```

```
npm i
```

## 初始化数据库

```
//需要先在本地建一个名为salesSystem的mysql数据库
数据库配置参考如下(salesSystem/server/src/configs/configs.dev.ts) 的dbConnection

npm run init_sql    //然后查看下数据库是否init成功
```

ps: 如果要使用github授权登录，发图片和发文件(使用七牛云cdn)，就要在文件(salesSystem/server/src/configs/configs.dev.ts)填充相应的配置了，否则默认无法使用


##  跑后端的代码
```
cd server
npm run start
```

### 生产环境使用

前提：创建secrets.ts文件
```
export default {
  port: '3000', // server 端口
  dbConnection: {
    host: '', // 数据库IP
    port: 3306, // 数据库端口
    database: 'salesSystem', // 数据库名称
    user: '', // 数据库用户名
    password: '', // 数据库密码
  },
  client_secret: '', // github的client_secret
  jwt_secret: '', // jwt的secret
  qiniu: { // 七牛云cdn配置
    accessKey: '',
    secretKey: '',
    bucket: ''
  }
};
```


1. build后端代码

```
cd sever
npm run build:prod
```
2. 把步骤1产生的文件夹放到你的服务器上, 把dist/index.js文件跑起来
(可以把/server/ecosystem.config.js 两个文件一并拷到到你的服务器上，然后执行`npm run start:prod`)
