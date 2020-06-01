import {
	newsList
} from '@/api/cms'


const cms = {
	state: {
	},

	mutations: {
		
	},

	actions: {
		newsList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				newsList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default cms
