import request from '@/utils/request'

// 产品列表
export function productList() {
  return request({
    url: '/v1/finance/deposit/product',
    method: 'GET'
  })
}
// 产品详情
export function productDetail(id) {
  return request({
    url: '/v1/finance/deposit/product/' + id,
    method: 'GET'
  })
}
// 产品认购
export function productBuy(data) {
  return request({
    url: '/v1/finance/deposit/buy',
    method: 'POST',
	data: data
  })
}

// 领取收益
export function productDraw() {
  return request({
    url: '/v1/finance/deposit/draw',
    method: 'POST'
  })
}

//理财订单列表
export function orderList(data) {
  return request({
    url: '/v1/finance/deposit/order',
    method: 'GET',
	data: data
  })
}
// 获取理财收益
export function getProfit() {
  return request({
    url: '/v1/finance/deposit/profit',
    method: 'POST'
  })
}

// 获取待领取数量
export function getDrawCount() {
  return request({
    url: '/v1/finance/deposit/count',
    method: 'GET'
  })
}