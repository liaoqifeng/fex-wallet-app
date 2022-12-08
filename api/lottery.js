import request from '@/utils/request'

// 配置列表
export function lotteryConfig() {
  return request({
    url: '/v1/lottery/config',
    method: 'GET'
  })
}
// 抽奖
export function lotteryDraw() {
  return request({
    url: '/v1/lottery/draw',
    method: 'GET'
  })
}
// 抽奖次数
export function lotteryCount() {
  return request({
    url: '/v1/lottery/count',
    method: 'GET'
  })
}

// 购买抽奖次数
export function lotteryBuyCount() {
  return request({
    url: '/v1/lottery/buy',
    method: 'GET'
  })
}