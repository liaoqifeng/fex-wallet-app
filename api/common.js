import request from '@/utils/request'

// App版本
export function getAppVersion(data) {
  return request({
    url: '/v1/version/app',
    method: 'GET'
  })
}

// 币种列表
export function coinList(data) {
  return request({
    url: '/v1/coin/list',
    method: 'GET'
  })
}

// 币种提示
export function coinTips(coin) {
  return request({
    url: `/v1/coin/tips/${coin}`,
    method: 'GET'
  })
}

// 行情列表
export function marketList() {
  return request({
    url: '/v1/market/list',
    method: 'GET'
  })
}

export function marketTicker(data) {
  return request({
    url: '/v1/market/ticker',
    method: 'GET',
	data: data
  })
}

// 手机验证码
export function sendSms(data) {
  return request({
    url: '/v1/common/captcha/sms',
    method: 'POST',
    data: data
  })
}

// 广告列表
export function adList() {
  return request({
    url: '/v1/ad/list',
    method: 'GET'
  })
}

// 公告列表
export function noticeList(data) {
  return request({
    url: '/v1/notice/list',
    method: 'GET',
	data: data
  })
}

//公告详情
export function noticeDetail(data) {
  return request({
    url: '/v1/notice/detail',
    method: 'GET',
	data: data
  })
}

// 支付信息列表
export function currencyList() {
  return request({
    url: '/v1/common/currency',
    method: 'GET'
  })
}

// OTC法币列表
export function fiatList() {
  return request({
    url: '/v1/common/fiat',
    method: 'GET'
  })
}

export function getConfig() {
  return request({
    url: '/v1/common/config',
    method: 'GET'
  })
}