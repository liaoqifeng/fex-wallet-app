import request from '@/utils/request'

// 矿机列表
export function machineList(data) {
  return request({
    url: '/v1/machine/list',
    method: 'GET',
	data: data
  })
}

// 矿机详情
export function machineDetail(data) {
  return request({
    url: '/v1/machine/detail',
    method: 'GET',
	data: data
  })
}

// 购买矿机
export function machineBuy(data) {
  return request({
    url: '/v1/machine/buy',
    method: 'POST',
	data: data
  })
}

//我的矿机
export function machineMy(data) {
  return request({
    url: '/v1/machine/pool/list',
    method: 'GET',
	data: data
  })
}

//矿机流水
export function machineFlows(data) {
  return request({
    url: '/v1/machine/flow/list',
    method: 'GET',
	data: data
  })
}

// 矿机总收益
export function machineProfit(data) {
  return request({
    url: '/v1/machine/profit',
    method: 'GET',
	data: data
  })
}