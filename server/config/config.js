module.exports = {
  environment: "dev",
  database: {
    dbName: "salesystem",
    host: "106.12.28.41",
    port: 3306,
    user: "root",
    password: "Quan5.20"
  },
  security: {
    secretKey: "secretKey",
    // 过期时间 7天
    expiresIn: 7 * 24 * 60 * 60
  },
  wx: {
    appId: "",
    appSecret: "",
    loginUrl:
      "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
  }
};
