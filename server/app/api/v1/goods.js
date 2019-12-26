const Router = require("koa-router");

const {
  GoodsValidator,
  PositiveIdParamsValidator,
  GoodsSearchValidator
} = require("../../validators/goods");

const { Auth } = require("../../../middlewares/auth");
const { GoodsService } = require("../../service/goods");
const { CommentService } = require("../../service/comment");

const { Resolve } = require("../../lib/helper");
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/v1"
});

/**
 * 创建商品
 */
router.post("/goods", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new GoodsValidator().validate(ctx);

  // 创建商品
  await GoodsService.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success("创建商品成功");
});

/**
 * 删除商品
 */
router.delete("/goods/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get("path.id");
  // 删除商品
  await GoodsService.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success("删除商品成功");
});

/**
 * 更新商品
 */
router.put("/goods/:id", new Auth(AUTH_ADMIN).m, async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get("path.id");
  // 更新商品
  await GoodsService.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success("更新商品成功");
});

/**
 * 获取商品列表
 */
router.get("/goods", async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询商品列表
  const goodsList = await GoodsService.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(goodsList);
});

/**
 * 查询商品详情
 */
router.get("/goods/:id", async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get("path.id");
  // 查询商品
  const goods = await GoodsService.detail(id);

  // 获取关联此商品的评论列表
  const commentList = await CommentService.targetComment({
    target_id: id,
    target_type: "goods"
  });

  // 更新商品浏览
  await GoodsService.updateBrowse(id, ++goods.browse);
  await goods.setDataValue("goods_comment", commentList);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(goods);
});

/**
 * 返回商品库分析
 */
router.get("/goodsAnalysis", async ctx => {
  // 查询商品
  const goodsAnalysis = await GoodsService.analysis();
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json({
    stockGoodsNum: { title: "商品数", value: goodsAnalysis.stockGoodsNum },
    stockAllNum: { title: "库存总量", value: goodsAnalysis.stockAllNum },
    stockAllValue: { title: "库存总值", value: goodsAnalysis.stockAllValue },
    stockOriginalValue: {
      title: "库存总成本",
      value: goodsAnalysis.stockOriginalValue
    },
    list: [
      { title: "商品数", value: goodsAnalysis.stockGoodsNum },
      { title: "库存总量", value: goodsAnalysis.stockAllNum },
      { title: "库存总值", value: goodsAnalysis.stockAllValue },
      { title: "库存总成本", value: goodsAnalysis.stockOriginalValue }
    ]
  });
});

/**
 * 返回首页的商品和专栏
 */
router.get("/home", async ctx => {
  // 查询商品
  const goods = await GoodsService.list();

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json({
    goods: goods.data
  });
});

module.exports = router;
