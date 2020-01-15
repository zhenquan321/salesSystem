const Router = require("koa-router");

const {
  ReplenishmentValidator,
  PositiveIdParamsValidator,
  ReplenishmentSearchValidator
} = require("../../validators/replenishment");

const { Auth } = require("../../../middlewares/auth");
const { ReplenishmentService } = require("../../service/replenishment");
const { GoodsService } = require("../../service/goods");
const { CommentService } = require("../../service/comment");

const { Resolve } = require("../../lib/helper");
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/api/v1"
});

/**
 * 创建进货单
 */
router.post("/replenishment", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new ReplenishmentValidator().validate(ctx);

  // 创建进货单
  let replenishment = await ReplenishmentService.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(replenishment);
});

/**
 * 删除进货单
 */
router.delete("/replenishment/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取进货单ID参数
  const id = v.get("path.id");
  // 删除进货单
  await ReplenishmentService.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success("删除进货单成功");
});

/**
 * 更新进货单
 */
router.put("/replenishment/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取进货单ID参数
  const id = v.get("path.id");

  // 更新进货单
  await ReplenishmentService.update(id, v);
  if (v.get("body.replenishment_status") == 3) {
    let goods = v.get("body.replenishment_goods");
    goods = JSON.parse(goods) || [];
    for (let i = 0; i < goods.length; i++) {
      let oldGoods = await GoodsService.detail(goods[i].id);
      let newGoods = goods[i];
      let goodsNum = newGoods.replenishment_num_now + oldGoods.stock_num;
      oldGoods.original_price = Number(
        (
          (newGoods.original_price * newGoods.replenishment_num_now +
            oldGoods.stock_num * oldGoods.original_price) /
          goodsNum
        ).toFixed(2)
      );
      oldGoods.stock_num = goodsNum;

      await GoodsService.update(oldGoods.id, oldGoods, "ht");
    }
  }
  ctx.response.status = 200;
  ctx.body = res.success("入库成功");
});

/**
 * 获取进货单列表
 */
router.get("/replenishment", async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询进货单列表
  const replenishmentList = await ReplenishmentService.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(replenishmentList);
});

/**
 * 获取正在进行中的进货单
 */
router.get("/replenishmentGoing", async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询进货单列表
  const replenishmentListGet = await ReplenishmentService.list(ctx.query);
  let rtReplenishment = {};
  let replenishmentList = replenishmentListGet.data;
  console.log(replenishmentList);
  for (let i = 0; i < replenishmentList.length; i++) {
    if (replenishmentList[i].replenishment_status != 3) {
      rtReplenishment = replenishmentList[i];
      break;
    }
  }
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(rtReplenishment);
});
/**
 * 查询进货单详情
 */
router.get("/replenishment/:id", async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取进货单ID参数
  const id = v.get("path.id");
  // 查询进货单
  const replenishment = await ReplenishmentService.detail(id);

  // 获取关联此进货单的评论列表
  const commentList = await CommentService.targetComment({
    target_id: id,
    target_type: "replenishment"
  });

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(replenishment);
});

/**
 * 返回进货库分析
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
      title: "总进货单数",
      value: replenishmentAnalysis.replenishmentAmount
    },
    replenishmentVolume: {
      title: "进货单总原价",
      value: replenishmentAnalysis.replenishmentVolume
    },
    originalVolume: {
      title: "进货单总成本",
      value: replenishmentAnalysis.originalVolume
    }
  });
});

module.exports = router;
