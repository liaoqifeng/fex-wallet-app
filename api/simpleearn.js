import request from '@/utils/request'

// 列表
export function productList(data) {
  return request({
    url: '/v1/simpleEarn/list',
    method: 'GET',
	data: data
  })
}

// 产品详情
export function productDetail(coin) {
  return request({
    url: '/v1/simpleEarn/' + coin,
    method: 'GET'
  })
}

// 产品认购
export function productBuy(data) {
  return request({
    url: '/v1/simpleEarn/buy',
    method: 'POST',
	data: data
  })
}

//订单列表
export function orderList(data) {
  return request({
    url: '/v1/simpleEarn/order',
    method: 'GET',
	data: data
  })
}

//订单赎回
export function orderRedeem(id) {
  return request({
    url: '/v1/simpleEarn/redeem/'+id,
    method: 'GET'
  })
}