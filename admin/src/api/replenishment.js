import request from '@utils/io';

/**
 * 创建进货单
 */

export function createReplenishment(replenishmentInfo) {
  return request.sendRequest('post', {
    path: '/api/v1/replenishment',
    params: replenishmentInfo
  });
}

/**
 * 删除进货单
 */

export function deleteReplenishment(id) {
  return request.sendRequest('delete', {
    path: '/api/v1/replenishment/' + id
  });
}

/**
 * 更新进货单
 */

export function updateReplenishment(id, replenishmentInfo) {
  return request.sendRequest('put', {
    path: '/api/v1/replenishment/' + id,
    params: replenishmentInfo
  });
}

/**
 * 获取进货单列表
 */
export function replenishmentList(searchData) {
  return request.get('/api/v1/replenishment', {
    params: searchData
  });
}
/**
 * 获取正在进行中的进货单
 */
export function replenishmentGoing(searchData) {
  return request.get('/api/v1/replenishmentGoing', {
    params: searchData
  });
}

/**
 * 查询进货单详情
 */

export function replenishmentDetail(id) {
  return request.sendRequest('get', {
    path: '/api/v1/replenishment/' + id
  });
}

/**
 * 查询进货单分析
 */

export function replenishmentAnalysis() {
  return request.sendRequest('get', {
    path: '/api/v1/replenishmentAnalysis'
  });
}

/**
 * 每日销售概况
 */

export function dailyDataAnalysis() {
  return request.sendRequest('get', {
    path: '/api/v1/dailyData'
  });
}
