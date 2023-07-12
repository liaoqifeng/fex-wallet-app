import Vue from 'vue'
import store from './store'
import App from './App'
import global from './utils/global'
import {fixD, formatD} from './utils/utils'
import ws from './utils/ws.js'
import Json from './Json' //测试用数据

// #ifdef H5
import lottery from './utils/lottery.js'
// #endif

import uView from "uview-ui";
Vue.use(uView);

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.use(require('vue-moment'));

let Chinese = require('./static/locales/zh-CN.js')
let English = require('./static/locales/en-US.js')
let Tradition = require('./static/locales/zh-HK.js')

// VueI18n
import VueI18n from 'vue-i18n'
// VueI18n
Vue.use(VueI18n)

const lang = uni.getStorageSync('language');
// VueI18n
// 注意下述代码务必放在代码 "Vue.prototype._i18n = i18n" 上方
const i18n = new VueI18n({
	// 默认语言
	locale: lang?lang:'zh_CN',
	// 引入语言文件
	messages: {
		'zh_CN': Chinese,
		'en_US': English,
        'zh_TW': Tradition
	}
})
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const navTo = (url)=>{
	uni.navigateTo({
		url: url
	})
}
const msg = (title, duration=1500, mask=false, icon='none', success)=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon,
		success
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

const upload = (successCallback, progressCallback)=>{
	uni.chooseImage({
		success: function (chooseImageRes) {
			const tempFilePaths = chooseImageRes.tempFilePaths;
			uni.showLoading({
			    title: '正在上传中...'
			});
			let token = uni.getStorageSync('token')
			const uploadTask = uni.uploadFile({
				url: global.REQUEST_URL + '/v1/common/upload', //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				name: 'file',
				header: {'Authorization': token},
				success: function (response) {
					uni.hideLoading()
					let res = JSON.parse(response.data)
					if(res.code === 200){
						uni.showToast({title: '上传成功', duration: 2000, icon: 'none'});
					} else {
						uni.showToast({title: res.msg, duration: 2000, icon: 'none'});
					}
					if(successCallback){
						successCallback(res)
					}
				},
				fail: function(error){
					uni.hideLoading()
					uni.showToast({title: '上传失败', duration: 2000, icon: 'none'});
				}
			});
		
			uploadTask.onProgressUpdate(function (res) {
				if(progressCallback){
					progressCallback(res)
				}
				//console.log('上传进度' + res.progress);
				//console.log('已经上传的数据长度' + res.totalBytesSent);
				//console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			});
		}
	})
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage, navTo};
Vue.prototype.$g = global;
Vue.prototype.$upload = upload;
Vue.prototype.$fixD = fixD;
Vue.prototype.$ws = ws

Vue.filter('fixD', function (value, precision) {
  if (!value) {
	  value = 0
  }
  return fixD(value, precision)
})

Vue.filter('formatD', function (value) {
  if (!value) return ''
  return formatD(value)
})

// VueI18n
Vue.prototype._i18n = i18n

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})
app.$mount()