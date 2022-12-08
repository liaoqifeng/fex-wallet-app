import G from './global.js'
//  http 请求配置项
export default {
    //  填自己的开发者服务器接口地址 
    //url: "http://47.107.100.112",
	url: G.REQUEST_URL,
    //  请求的参数   
    data: {},
    //  设置请求的 header，header 中不能设置 Referer。
    header: {},
    //  （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    method: "POST",
    //  json    如果设为json，会尝试对返回的数据做一次 JSON.parse    
    dataType: "json",
    //  text    设置响应的数据类型。合法值：text、arraybuffer  1.7.0
    responseType: "text",
    //  收到开发者服务成功返回的回调函数    
    success() {},
    //  接口调用失败的回调函数 
    fail() {},
    //  接口调用结束的回调函数（调用成功、失败都会执行）
    complete() {},
}