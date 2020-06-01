import request from '@/utils/request'

// 兑换列表
export function exchangeList(data) {
  return request({
    url: '/v1/exchange/list',
    method: 'GET',
	data: data
  })
}
// 添加兑换
export function addExchange(data) {
  return request({
    url: '/v1/exchange',
    method: 'POST',
	data: data
  })
}
//兑换记录列表
export function exchangeRecordList(data) {
  return request({
    url: '/v1/exchange/records',
    method: 'GET',
	data: data
  })
}