import {
	payInfoList, 
	addPayInfo, 
	getPayInfo, 
	getUsePayInfo,
	updatePayInfo, 
	activePayInfo,
	deletePayInfo,
	isMerchant,
	getMerchant,
	applyMerchant,
	merchantDetail,
	advertList,
	addAdvert,
	myAdvertList,
	closeAdvert,
	pauseAdvert,
	createOrder,
	cancelOrder,
	payOrder,
	completeOrder,
	orderList,
	getOrder,
	getPaymentSetting,
	getPaymentSettingDetail,
	getPaymentMethodList,
	getPaymentMethod,
	getActivePaymentMethodList,
	addPaymentMethod,
	updatePaymentMethod,
	activePaymentMethod,
	deletePaymentMethod,
	appealOrder,
	getAppealDetail,
	appealOrderCancel
} from '@/api/otc'
import {} from './../mutations_type'


const otc = {
	state: {

	},

	mutations: {

	},

	actions: {
		getPaymentSetting({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getPaymentSetting().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getPaymentSettingDetail({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				getPaymentSettingDetail(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getPaymentMethodList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getPaymentMethodList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getActivePaymentMethodList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getActivePaymentMethodList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getPaymentMethod({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				getPaymentMethod(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		addPaymentMethod({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				addPaymentMethod(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		updatePaymentMethod({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				updatePaymentMethod(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		activePaymentMethod({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				activePaymentMethod(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		deletePaymentMethod({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				deletePaymentMethod(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		
		
		
		
		
		payInfoList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				payInfoList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getPayInfo({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				getPayInfo(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getUsePayInfo({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getUsePayInfo().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		addPayInfo({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				addPayInfo(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		updatePayInfo({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				updatePayInfo(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		activePayInfo({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				activePayInfo(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		deletePayInfo({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				deletePayInfo(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		isMerchant({
			commit
		}) {
			return new Promise((resolve, reject) => {
				isMerchant().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getMerchant({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getMerchant().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		merchantDetail({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				merchantDetail(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		applyMerchant({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				applyMerchant(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		advertList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				advertList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		addAdvert({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				addAdvert(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		myAdvertList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				myAdvertList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		closeAdvert({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				closeAdvert(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		pauseAdvert({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				pauseAdvert(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		createOrder({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				createOrder(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		orderList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				orderList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getOrder({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				getOrder(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		cancelOrder({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				cancelOrder(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		payOrder({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				payOrder(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		completeOrder({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				completeOrder(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		appealOrder({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				appealOrder(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getAppealDetail({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				getAppealDetail(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		appealOrderCancel({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				appealOrderCancel(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}

export default otc
