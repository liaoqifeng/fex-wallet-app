import {
	productList,
	productDetail,
	productBuy,
	productDraw,
	orderList,
	getProfit,
	getDrawCount
} from '@/api/finance'


const finance = {
	state: {
	},

	mutations: {
		
	},

	actions: {
		productList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				productList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		productDetail({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				productDetail(id).then(res => {
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
		productDraw({
			commit
		}) {
			return new Promise((resolve, reject) => {
				productDraw().then(res => {
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
		getProfit({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getProfit().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getDrawCount({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getDrawCount().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default finance
