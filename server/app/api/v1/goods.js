const Router = require('koa-router');

const {
  GoodsValidator,
  PositiveIdParamsValidator,
  GoodsSearchValidator
} = require('../../validators/goods');

const {Auth} = require('../../../middlewares/auth');
const {GoodsDao} = require('../../dao/goods');
const {CommentDao} = require('../../dao/comment');
const {ColumnDao} = require('../../dao/column');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建商品
 */
router.post('/goods', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new GoodsValidator().validate(ctx);

  // 创建商品
  await GoodsDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建商品成功');
});

/**
 * 删除商品
 */
router.delete('/goods/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get('path.id');
  // 删除商品
  await GoodsDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除商品成功');
})

/**
 * 更新商品
 */
router.put('/goods/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get('path.id');
  // 更新商品
  await GoodsDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新商品成功');
})


/**
 * 获取商品列表
 */
router.get('/goods', async (ctx) => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询商品列表
  const goodsList = await GoodsDao.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(goodsList);
});

/**
 * 查询商品详情
 */
router.get('/goods/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get('path.id');
  // 查询商品
  const goods = await GoodsDao.detail(id);

  // 获取关联此商品的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: id,
    target_type: 'goods'
  });

  // 更新商品浏览
  await GoodsDao.updateBrowse(id, ++goods.browse);
  await goods.setDataValue('goods_comment', commentList);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(goods);
})

/**
 * 返回首页的商品和专栏
 */
router.get('/home', async (ctx) => {
  // 查询商品
  const goods = await GoodsDao.list();
  const column = await ColumnDao.list({
    pageSize: 2
  })
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json({
    column: column.data,
    goods: goods.data
  });
})


module.exports = router
