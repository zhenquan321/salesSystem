const Router = require("koa-router");

const {
  ReplenishmentValidator,
  PositiveIdParamsValidator,
  ReplenishmentSearchValidator
} = require("../../validators/replenishment");

const { Auth } = require("../../../middlewares/auth");
const { ReplenishmentService } = require("../../service/replenishment");
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
router.post("/replenishment", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new ReplenishmentValidator().validate(ctx);

  // 创建订单
  await ReplenishmentService.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success("创建订单成功");
});

/**
 * 删除订单
 */
router.delete("/replenishment/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取订单ID参数
  const id = v.get("path.id");
  // 删除订单
  await ReplenishmentService.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success("删除订单成功");
});

/**
 * 更新订单
 */
router.put("/replenishment/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取订单ID参数
  const id = v.get("path.id");
  // 更新订单
  await ReplenishmentService.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success("更新订单成功");
});

/**
 * 获取订单列表
 */
router.get("/replenishment", async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询订单列表
  const replenishmentList = await ReplenishmentService.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(replenishmentList);
});

/**
 * 查询订单详情
 */
router.get("/replenishment/:id", async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取订单ID参数
  const id = v.get("path.id");
  // 查询订单
  const replenishment = await ReplenishmentService.detail(id);

  // 获取关联此订单的评论列表
  const commentList = await CommentService.targetComment({
    target_id: id,
    target_type: "replenishment"
  });

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(replenishment);
});

/**
 * 返回商品库分析
 */
router.get("/replenishmentAnalysis", async ctx => {
  // 查询商品
  const replenishmentAnalysis = await ReplenishmentService.analysis();
  // 返回结果
  ctx.response.status = 200;

  ctx.body = res.json({
    goodsAmount: {
      title: "已售商品数",
      value: replenishmentAnalysis.goodsAmount
    },
    salesVolume: {
      title: "销售总额",
      value: replenishmentAnalysis.salesVolume
    },
    replenishmentAmount: {
      title: "总订单数",
      value: replenishmentAnalysis.replenishmentAmount
    },
    replenishmentVolume: {
      title: "订单总原价",
      value: replenishmentAnalysis.replenishmentVolume
    },
    originalVolume: {
      title: "订单总成本",
      value: replenishmentAnalysis.originalVolume
    }
  });
});

module.exports = router;
