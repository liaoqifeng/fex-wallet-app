import {
	lotteryConfig, 
	lotteryDraw,
	lotteryCount,
	lotteryBuyCount
} from '@/api/lottery'
import {} from './../mutations_type'


const lottery = {
	state: {

	},

	mutations: {

	},

	actions: {
		lotteryConfig({
			commit
		}) {
			return new Promise((resolve, reject) => {
				lotteryConfig().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		lotteryDraw({
			commit
		}) {
			return new Promise((resolve, reject) => {
				lotteryDraw().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		lotteryCount({
			commit
		}) {
			return new Promise((resolve, reject) => {
				lotteryCount().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		lotteryBuyCount({
			commit
		}) {
			return new Promise((resolve, reject) => {
				lotteryBuyCount().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default lottery
