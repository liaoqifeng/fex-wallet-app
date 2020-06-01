import {
	exchangeList, 
	addExchange,
	exchangeRecordList
} from '@/api/exchange'
import {} from './../mutations_type'


const exchange = {
	state: {

	},

	mutations: {

	},

	actions: {
		exchangeList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				exchangeList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		exchangeRecordList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				exchangeRecordList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		addExchange({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				addExchange(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default exchange
