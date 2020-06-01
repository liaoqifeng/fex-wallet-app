import request from '@/utils/request'

// 币种列表
export function coinList(data) {
  return request({
    url: '/v1/coin/list',
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

// 法币列表
export function currencyList() {
  return request({
    url: '/v1/common/currency',
    method: 'GET'
  })
}