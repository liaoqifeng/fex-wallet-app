import G from '../../../../utils/global.js'
// let baseUrl = "https://captcha.anji-plus.com/captcha-api"
let baseUrl = G.REQUEST_URL

export const myRequest = (option={})=>{
	return new Promise((reslove,reject)=>{
		uni.request({
			url: baseUrl + option.url, 
			data :option.data,
			method:option.method || "GET",
			success: (result) => {
				reslove(result)
			},
			fail:(error)=>{
				reject(error)
			}
		})
	})
}
