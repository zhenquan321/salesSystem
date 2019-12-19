const Router = require("koa-router");

const {
  ArticleValidator,
  PositiveIdParamsValidator,
  ArticleSearchValidator
} = require("../../validators/article");

const { Auth } = require("../../../middlewares/auth");
const { ArticleService } = require("../../service/article");
const { CommentService } = require("../../service/comment");

const { Resolve } = require("../../lib/helper");
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/v1"
});

/**
 * 创建文章
 */
router.post("/article", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new ArticleValidator().validate(ctx);

  // 创建文章
  await ArticleService.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success("创建文章成功");
});

/**
 * 删除文章
 */
router.delete("/article/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get("path.id");
  // 删除文章
  await ArticleService.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success("删除文章成功");
});

/**
 * 更新文章
 */
router.put("/article/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get("path.id");
  // 更新文章
  await ArticleService.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success("更新文章成功");
});

/**
 * 获取文章列表
 */
router.get("/article", async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询文章列表
  const articleList = await ArticleService.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(articleList);
});

/**
 * 查询文章详情
 */
router.get("/article/:id", async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get("path.id");
  // 查询文章
  const article = await ArticleService.detail(id);

  // 获取关联此文章的评论列表
  const commentList = await CommentService.targetComment({
    target_id: id,
    target_type: "article"
  });

  // 更新文章浏览
  await ArticleService.updateBrowse(id, ++article.browse);
  await article.setDataValue("article_comment", commentList);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(article);
});

/**
 * 返回首页的文章和专栏
 */
router.get("/home", async ctx => {
  // 查询文章
  const article = await ArticleService.list();
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json({
    article: article.data
  });
});

module.exports = router;
