import request from '@/utils/request'

// 收款方式列表
export function payInfoList() {
  return request({
    url: '/v1/otc/payment/list',
    method: 'GET'
  })
}
// 获取收款信息详情
export function getPayInfo(id) {
  return request({
    url: `/v1/otc/payment/${id}`,
    method: 'GET'
  })
}
// 添加收款方式
export function addPayInfo(data) {
  return request({
    url: '/v1/otc/payment/create',
    method: 'POST',
	data: data
  })
}
// 修改收款方式
export function updatePayInfo(data) {
  return request({
    url: '/v1/otc/payment/update',
    method: 'PUT',
	data: data
  })
}
// 激活收款方式
export function activePayInfo(id) {
  return request({
    url: `/v1/otc/payment/avtive/${id}`,
    method: 'PUT'
  })
}
// 删除收款信息
export function deletePayInfo(id) {
  return request({
    url: `/v1/otc/payment/${id}`,
    method: 'DELETE'
  })
}
//是否是商家
export function isMerchant() {
  return request({
    url: `/v1/otc/merchant/isMerchant`,
    method: 'GET'
  })
}
//获取商家信息
export function getMerchant() {
  return request({
    url: `/v1/otc/merchant`,
    method: 'GET'
  })
}
// 申请商家
export function applyMerchant(data) {
  return request({
    url: '/v1/otc/merchant/apply',
    method: 'POST',
	data: data
  })
}

export function addAdvert(data) {
  return request({
    url: '/v1/otc/advert/create',
    method: 'POST',
	data: data
  })
}