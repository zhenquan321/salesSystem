## 数据库
启动项目前一定要在创建好 `boblog` 数据库。
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 wxapp 数据库
$ CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 修改 Koa2 项目数据库配置
请在根目录下的 [|——config/config.js](https://github.com/liangfengbo/nodejs-koa-blog/blob/master/config/config.js) 文件下修改您本地的数据库名字（`boblog`）和数据库密码。

### 克隆项目
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。

```
# 克隆项目代码
$ git clone https://github.com/liangfengbo/nodejs-koa-blog.git

# 进入项目根目录
$ cd nodejs-koa-blog

# 安装依赖包
$ npm install

# 启动 Node.js Koa2 项目
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000/v1/
# 可以查看目录下的 ./app/api/v1 下的接口 或者 看 doc 目录下的markdown 接口文档，在 postman 测试接口
