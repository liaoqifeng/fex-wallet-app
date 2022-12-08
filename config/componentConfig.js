import request from '@/utils/request'
export default {
	/****************以下是zhouWei-APPUpdate插件配置*******************/
	// 发起ajax请求获取服务端版本号
	getServerNo: (version, isPrompt = false, callback) => {
		/* 接口入参说明
		 * version: 应用当前版本号（已自动获取）
		 * versionName: 应用当前版本名称（已自动获取）
		 * type：平台（1101是安卓，1102是IOS）
		 */
		/****************以下是示例*******************/
		// 可以用自己项目的请求方法
		request({
		  url: '/v1/version/app',
		  method: 'GET'
		}).then(res => {
			/* res的数据说明
			 * | 参数名称	     | 一定返回 	| 类型	    | 描述
			 * | -------------|--------- | --------- | ------------- |
			 * | versionCode	 | y	    | int	    | 版本号        |
			 * | versionName	 | y	    | String	| 版本名称      |
			 * | versionInfo	 | y	    | String	| 版本信息      |
			 * | updateType	     | y	    | String	| forcibly = 强制更新, solicit = 弹窗确认更新, silent = 静默更新 |
			 * | downloadUrl	 | y	    | String	| 版本下载链接（IOS安装包更新请放跳转store应用商店链接,安卓apk和wgt文件放文件下载链接）  |
			 */
			if(!res.data){
				return;
			}
			const platform = uni.getSystemInfoSync().platform;
			let data = res.data
			data.downloadUrl = platform == "android" ? data.androidUrl : data.iosUrl
			data.updateType = data.forceUpdate == 1 ? 'forcibly' : 'solicit'
			if(version.versionCode == data.versionCode){
				return;
			}
			
			if (data && data.downloadUrl) {
				// 兼容之前的版本（updateType是新版才有的参数）
				if(data.updateType){
					callback && callback(data);
				} else {
					if(data.forceUpdate == 1){
						data.updateType = "forcibly";
					} else {
						data.updateType = "solicit";
					}
					callback && callback(data);
				}
			} else if (isPrompt) {
				uni.showToast({
					title: "暂无新版本",
					icon: "none"
				});
			}
		});
		/****************以上是示例*******************/
	}
}