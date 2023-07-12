import request from '@/utils/request'

// 收款方式列表
export function payInfoList() {
  return request({
    url: '/v1/otc/payment/list',
    method: 'GET'
  })
}
// 获取激活收款信息详情
export function getUsePayInfo() {
  return request({
    url: `/v1/otc/payment/use`,
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


// 获取收款方式设置
export function getPaymentSetting() {
  return request({
    url: '/v1/otc/pay/method/setting',
    method: 'GET'
  })
}

// 获取收款方式设置详情
export function getPaymentSettingDetail(id) {
  return request({
    url: '/v1/otc/pay/method/setting/' + id,
    method: 'GET'
  })
}

// 获取收款方式列表
export function getPaymentMethodList() {
  return request({
    url: '/v1/otc/pay/method/list',
    method: 'GET'
  })
}

// 获取激活收款方式列表
export function getActivePaymentMethodList() {
  return request({
    url: '/v1/otc/pay/method/use',
    method: 'GET'
  })
}

// 获取收款信息详情
export function getPaymentMethod(id) {
  return request({
    url: `/v1/otc/pay/method/${id}`,
    method: 'GET'
  })
}

// 添加收款方式
export function addPaymentMethod(data) {
  return request({
    url: '/v1/otc/pay/method/create',
    method: 'POST',
	data: data
  })
}

// 修改收款方式
export function updatePaymentMethod(data) {
  return request({
    url: '/v1/otc/pay/method/update',
    method: 'PUT',
	data: data
  })
}

// 激活收款方式
export function activePaymentMethod(id) {
  return request({
    url: `/v1/otc/pay/method/avtive/${id}`,
    method: 'PUT'
  })
}

// 删除收款信息
export function deletePaymentMethod(id) {
  return request({
    url: `/v1/otc/pay/method/${id}`,
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
// 商家详情
export function merchantDetail(id) {
  return request({
    url: `/v1/otc/advert/merchant/${id}`,
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
//广告列表
export function advertList(data) {
  return request({
    url: `/v1/otc/advert/list`,
    method: 'GET',
	data: data
  })
}
//添加广告
export function addAdvert(data) {
  return request({
    url: '/v1/otc/advert/create',
    method: 'POST',
	data: data
  })
}
//我的广告
export function myAdvertList() {
  return request({
    url: `/v1/otc/advert/my`,
    method: 'GET'
  })
}
//关闭广告
export function closeAdvert(id) {
  return request({
    url: `/v1/otc/advert/cancel/${id}`,
    method: 'PUT'
  })
}
//暂停开启广告
export function pauseAdvert(id) {
  return request({
    url: `/v1/otc/advert/pause/${id}`,
    method: 'PUT'
  })
}
//创建订单
export function createOrder(data) {
  return request({
    url: `/v1/otc/order/create`,
    method: 'POST',
	data: data
  })
}
//撤消订单
export function cancelOrder(id) {
  return request({
    url: `/v1/otc/order/cancel/${id}`,
    method: 'GET'
  })
}
//订单支付
export function payOrder(data) {
  return request({
    url: `/v1/otc/order/pay`,
    method: 'GET',
	data: data
  })
}
//订单放币
export function completeOrder(id) {
  return request({
    url: `/v1/otc/order/complete/${id}`,
    method: 'GET'
  })
}
//订单列表
export function orderList(data) {
  return request({
    url: `/v1/otc/order/list`,
    method: 'GET',
	data: data
  })
}
//订单列表
export function getOrder(id) {
  return request({
    url: `/v1/otc/order/${id}`,
    method: 'GET'
  })
}
//订单申诉
export function appealOrder(data) {
  return request({
    url: `/v1/otc/order/appeal`,
    method: 'POST',
	data: data
  })
}
//获取申诉详情
export function getAppealDetail(orderId) {
  return request({
    url: `/v1/otc/order/appeal/${orderId}`,
    method: 'GET'
  })
}
//取消订单申诉
export function appealOrderCancel(orderId) {
  return request({
    url: `/v1/otc/order/appeal/cancel/${orderId}`,
    method: 'POST'
  })
}