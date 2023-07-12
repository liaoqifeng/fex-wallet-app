import request from '@/utils/request'

// 市场列表
export function optionMarketList() {
  return request({
    url: '/v1/option/market/list',
    method: 'GET'
  })
}

// 置顶市场列表
export function optionTopMarketList() {
  return request({
    url: '/v1/option/top/list',
    method: 'GET'
  })
}

// 创建订单
export function createOptionOrder(data) {
  return request({
    url: '/v1/option/order/create',
    method: 'POST',
	data: data
  })
}

//订单详情
export function optionOrderDetail(id) {
  return request({
    url: '/v1/option/order/' + id,
    method: 'GET'
  })
}

//查询订单列表
export function optionOrderList(data) {
  return request({
    url: '/v1/option/order/list',
    method: 'GET',
	data: data
  })
}