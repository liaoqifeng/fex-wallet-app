import request from '@/utils/request'

// 预言详情
export function predictionDetail(data) {
  return request({
    url: '/v1/prediction/detail',
    method: 'GET',
	data: data
  })
}

// 查询回合
export function predictionRounds(data) {
  return request({
    url: '/v1/prediction/rounds',
    method: 'GET',
	data: data
  })
}

//下注
export function predictionBet(data) {
  return request({
    url: '/v1/prediction/bet',
    method: 'POST',
	data: data
  })
}

//查询历史
export function predictionHistory(data) {
  return request({
    url: '/v1/prediction/history',
    method: 'GET',
	data: data
  })
}