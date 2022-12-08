import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import otc from './modules/otc'
import common from './modules/common'
import exchange from './modules/exchange'
import account from './modules/account'
import cms from './modules/cms'
import websocket from './modules/websocket'
import finance from './modules/finance'
import lottery from './modules/lottery'
import prediction from './modules/prediction'
import mining from './modules/mining'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	websocket: websocket,
	user: {
	  namespaced: true,
	  ...user
	},
	otc: {
	  namespaced: true,
	  ...otc
	},
	common: {
	  namespaced: true,
	  ...common
	},
	exchange: {
	  namespaced: true,
	  ...exchange
	},
	account: {
	  namespaced: true,
	  ...account
	},
	cms: {
	  namespaced: true,
	  ...cms
	},
	finance: {
	  namespaced: true,
	  ...finance
	},
	lottery: {
	  namespaced: true,
	  ...lottery
	},
	prediction: {
	  namespaced: true,
	  ...prediction
	},
	mining: {
	  namespaced: true,
	  ...mining
	}
  }
})

export default store
