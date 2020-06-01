import request from '@/utils/request'

// 资讯列表
export function newsList(data) {
  return request({
    url: '/v1/news/list',
    method: 'GET',
	data: data
  })
}
