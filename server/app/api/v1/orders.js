const Router = require("koa-router");

const {
  OrdersValidator,
  PositiveIdParamsValidator,
  OrdersSearchValidator
} = require("../../validators/orders");

const { Auth } = require("../../../middlewares/auth");
const { OrdersService } = require("../../service/orders");
const { CommentService } = require("../../service/comment");

const { Resolve } = require("../../lib/helper");
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/api/v1"
});

/**
 * 创建订单
 */
router.post("/orders", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new OrdersValidator().validate(ctx);

  // 创建订单
  await OrdersService.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success("创建订单成功");
});

/**
 * 删除订单
 */
router.delete("/orders/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取订单ID参数
  const id = v.get("path.id");
  // 删除订单
  await OrdersService.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success("删除订单成功");
});

/**
 * 更新订单
 */
router.put("/orders/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取订单ID参数
  const id = v.get("path.id");
  // 更新订单
  await OrdersService.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success("更新订单成功");
});

/**
 * 获取订单列表
 */
router.get("/orders", async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询订单列表
  const ordersList = await OrdersService.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(ordersList);
});

/**
 * 查询订单详情
 */
router.get("/orders/:id", async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取订单ID参数
  const id = v.get("path.id");
  // 查询订单
  const orders = await OrdersService.detail(id);

  // 获取关联此订单的评论列表
  const commentList = await CommentService.targetComment({
    target_id: id,
    target_type: "orders"
  });

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(orders);
});

/**
 * 返回商品库分析
 */
router.get("/dailyData", async ctx => {
  // 查询商品
  const dailyData = await OrdersService.dailyData(ctx);
  // 返回结果
  ctx.response.status = 200;

  ctx.body = res.json(dailyData);
});
/**
 * 返回商品库分析
 */
router.get("/ordersAnalysis", async ctx => {
  // 查询商品
  const ordersAnalysis = await OrdersService.analysis(ctx);
  // 返回结果
  ctx.response.status = 200;

  ctx.body = res.json({
    goodsAmount: {
      title: "已售商品数",
      value: ordersAnalysis.goodsAmount
    },
    salesVolume: {
      title: "销售总额",
      value: ordersAnalysis.salesVolume
    },
    ordersAmount: {
      title: "总订单数",
      value: ordersAnalysis.ordersAmount
    },
    ordersVolume: {
      title: "订单总原价",
      value: ordersAnalysis.ordersVolume
    },
    originalVolume: {
      title: "订单总成本",
      value: ordersAnalysis.originalVolume
    }
  });
});

module.exports = router;
