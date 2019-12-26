import request from '@utils/io';

/**
 * 创建商品
 */

export function createOrders(ordersInfo) {
  return request.sendRequest('post', {
    path: '/v1/orders',
    params: ordersInfo
  });
}

/**
 * 删除商品
 */

export function deleteOrders(id) {
  return request.sendRequest('post', {
    path: '/v1/orders/' + id
  });
}

/**
 * 更新商品
 */

export function updateOrders(id, ordersInfo) {
  return request.sendRequest('post', {
    path: '/v1/orders/' + id,
    params: ordersInfo
  });
}

/**
 * 获取商品列表
 */
export function ordersList(searchData) {
  return request.get('/v1/orders', {
    params: searchData
  });
}

/**
 * 查询商品详情
 */

export function ordersDetail(id) {
  return request.sendRequest('get', {
    path: '/v1/orders/' + id
  });
}

/**
 * 查询商品分析
 */

export function ordersAnalysis() {
  return request.sendRequest('get', {
    path: '/v1/ordersAnalysis'
  });
}
