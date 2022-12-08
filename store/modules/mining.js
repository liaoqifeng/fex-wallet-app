import {
	machineList, 
	machineDetail,
	machineBuy,
	machineMy,
	machineFlows,
	machineProfit
} from '@/api/mining'
import {} from './../mutations_type'


const exchange = {
	state: {

	},

	mutations: {

	},

	actions: {
		machineList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				machineList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		machineDetail({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				machineDetail(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		machineBuy({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				machineBuy(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		machineMy({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				machineMy(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		machineFlows({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				machineFlows(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		machineProfit({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				machineProfit(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default exchange
