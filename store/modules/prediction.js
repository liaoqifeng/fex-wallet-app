import {
	predictionDetail, 
	predictionRounds,
	predictionBet,
	predictionHistory
} from '@/api/prediction'
import {} from './../mutations_type'


const exchange = {
	state: {

	},

	mutations: {

	},

	actions: {
		predictionDetail({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				predictionDetail(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		predictionRounds({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				predictionRounds(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		predictionBet({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				predictionBet(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		predictionHistory({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				predictionHistory(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default exchange
