import {
	sendSms,
	coinList,
	coinTips,
	marketList,
	marketTicker,
	adList,
	noticeList,
	noticeDetail,
	currencyList,
	fiatList,
	getAppVersion,
	getConfig
} from '@/api/common'
import {
	COMMON_COIN_LIST,
	COMMON_CONFIG_LIST
} from './../mutations_type'


const common = {
	state: {
		coins: null,
		coinMap: {},
		commonConfigMap: {}
	},

	mutations: {
		[COMMON_COIN_LIST](state, payload) {
			if (payload.code == 200) {
				state.coins = payload.data,
				state.coins.forEach((item, i) =>{
					state.coinMap[item.symbol] = item
				})
			}
		},
		[COMMON_CONFIG_LIST](state, payload) {
			if (payload.code == 200) {
				state.commonConfigMap = payload.data
			}
		}
	},

	actions: {
		getAppVersion({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getAppVersion().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		coinList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				coinList().then(res => {
					commit(COMMON_COIN_LIST, res)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		coinTips({
			commit
		}, coin) {
			return new Promise((resolve, reject) => {
				coinTips(coin).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		marketList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				marketList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		marketTicker({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				marketTicker(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 手机验证码发送
		sendSms({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				sendSms(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		adList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				adList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		noticeList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				noticeList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		noticeDetail({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				noticeDetail(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		currencyList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				currencyList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		fiatList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				fiatList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getConfig({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getConfig().then(res => {
					commit(COMMON_CONFIG_LIST, res)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default common
