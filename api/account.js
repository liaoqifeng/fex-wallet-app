import request from '@/utils/request'

// 资产列表
export function accountList() {
  return request({
    url: '/v1/account/list',
    method: 'GET'
  })
}
// 获取单个资产
export function getAccount(coin) {
  return request({
    url: `/v1/account/${coin}`,
    method: 'GET'
  })
}