const Router = require("koa-router");
const fs = require("fs");
const path = require("path");

const { Auth } = require("../../../middlewares/auth");

const { Resolve } = require("../../lib/helper");
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/v1"
});

/**
 * 创建分类
 */
router.post("/uploadImg", async ctx => {
  // 通过验证器校验参数是否通过
  const files = ctx.request.files; // 获取上传文件
  let filePathList = [];
  for (let file in files) {
    // 创建可读流
    const reader = fs.createReadStream(files[file].path);
    let filePath =
      path.join(__dirname, "../../../uploadResources") +
      `/${new Date().getTime() + "_" + files[file].name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    let pathUrl =
      ctx.origin +
      "/uploadResources/" +
      new Date().getTime() +
      "_" +
      files[file].name;
    filePathList.push(pathUrl);
  }

  // 返回结果
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    msg: "上传成功！",
    filePathList
  };
});

module.exports = router;
