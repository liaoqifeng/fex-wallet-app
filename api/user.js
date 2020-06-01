import request from '@/utils/request'

// 注册
export function register(data) {
  return request({
    url: '/v1/register',
    method: 'POST',
    data: data
  })
}
//登录
export function login(data) {
  return request({
    url: '/v1/login',
    method: 'POST',
    data: data
  })
}
//修改密码
export function updatePwd(data) {
  return request({
    url: '/v1/user/update/pwd',
    method: 'POST',
    data: data
  })
}
//修改资金密码
export function updatePayPwd(data) {
  return request({
    url: '/v1/user/update/payPwd',
    method: 'POST',
    data: data
  })
}
//查询加密地址簿列表
export function encryptBookList(data) {
  return request({
    url: '/v1/encrypt/book/list',
    method: 'GET',
    data: data
  })
}
//添加加密地址
export function addEncryptBook(data) {
  return request({
    url: '/v1/encrypt/book',
    method: 'POST',
    data: data
  })
}
//删除加密地址
export function deleteEncryptBook(id) {
  return request({
    url: `/v1/encrypt/book/${id}`,
    method: 'DELETE'
  })
}