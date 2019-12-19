const Router = require("koa-router");

const {
  OrdersValidator,
  PositiveIdParamsValidator,
  OrdersSearchValidator
} = require("../../validators/orders");

const { Auth } = require("../../../middlewares/auth");
const { OrdersDao } = require("../../dao/orders");
const { CommentDao } = require("../../dao/comment");

const { Resolve } = require("../../lib/helper");
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/v1"
});

/**
 * 创建商品
 */
router.post("/orders", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new OrdersValidator().validate(ctx);

  // 创建商品
  await OrdersDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success("创建商品成功");
});

/**
 * 删除商品
 */
router.delete("/orders/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get("path.id");
  // 删除商品
  await OrdersDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success("删除商品成功");
});

/**
 * 更新商品
 */
router.put("/orders/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get("path.id");
  // 更新商品
  await OrdersDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success("更新商品成功");
});

/**
 * 获取商品列表
 */
router.get("/orders", async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询商品列表
  const ordersList = await OrdersDao.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(ordersList);
});

/**
 * 查询商品详情
 */
router.get("/orders/:id", async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get("path.id");
  // 查询商品
  const orders = await OrdersDao.detail(id);

  // 获取关联此商品的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: id,
    target_type: "orders"
  });

  // 更新商品浏览
  await OrdersDao.updateBrowse(id, ++orders.browse);
  await orders.setDataValue("orders_comment", commentList);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(orders);
});

/**
 * 返回首页的商品和专栏
 */
router.get("/home", async ctx => {
  // 查询商品
  const orders = await OrdersDao.list();

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json({
    orders: orders.data
  });
});

module.exports = router;
