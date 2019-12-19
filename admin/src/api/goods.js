import request from '@utils/io';

/**
 * 创建商品
 */

export function createGoods(goodsInfo) {
  return request.sendRequest('post', {
    path: '/v1/goods',
    params: goodsInfo
  });
}

/**
 * 删除商品
 */

export function deleteGoods(id) {
  return request.sendRequest('delete', {
    path: '/v1/goods/' + id
  });
}

/**
 * 更新商品
 */

export function updateGoods(id, goodsInfo) {
  return request.sendRequest('put', {
    path: '/v1/goods/' + id,
    params: goodsInfo
  });
}

/**
 * 获取商品列表
 */
export function goodsList() {
  return request.sendRequest('get', {
    path: '/v1/goods'
  });
}

/**
 * 查询商品详情
 */

export function goodsDetail(id) {
  return request.sendRequest('get', {
    path: '/v1/goods/' + id
  });
}
