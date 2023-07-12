import {
	productList,
	productDetail,
	productBuy,
	orderList,
	orderRedeem
} from '@/api/simpleearn'


const cms = {
	state: {
	},

	mutations: {
		
	},

	actions: {
		productList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				productList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		productDetail({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				productDetail(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		productBuy({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				productBuy(data).then(res => {
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
		orderRedeem({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				orderRedeem(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default cms
