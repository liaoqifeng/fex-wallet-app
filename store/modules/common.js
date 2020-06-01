import {
	sendSms,
	coinList,
	marketList,
	adList,
	noticeList,
	currencyList,
	fiatList
} from '@/api/common'
import {
	COMMON_COIN_LIST
} from './../mutations_type'


const common = {
	state: {
		coins: null
	},

	mutations: {
		[COMMON_COIN_LIST](state, payload) {
			if (payload.code == 200) {
				state.coins = payload.data
			}
		}
	},

	actions: {
		coinList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				coinList().then(res => {
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
		}
	}
}

export default common
