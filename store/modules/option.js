import {
	optionTopMarketList,
	optionMarketList, 
	createOptionOrder,
	optionOrderDetail,
	optionOrderList
} from '@/api/option'
import {} from './../mutations_type'


const exchange = {
	state: {

	},

	mutations: {

	},

	actions: {
		optionTopMarketList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				optionTopMarketList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		optionMarketList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				optionMarketList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		createOptionOrder({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				createOptionOrder(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		optionOrderDetail({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				optionOrderDetail(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		optionOrderList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				optionOrderList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default exchange
