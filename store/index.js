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
import option from './modules/option'
import tio from './modules/tio'

const context = require.context('./modules', false, /\.js$/);
const moduleStores = {};

context.keys().forEach(key => {
    // 获取读取到的文件名字并且截取
    const fileName = key.slice(2, -3);
	if(fileName == 'websocket' || fileName == 'tio'){
		return;
	}
    //通过 context(key)导出文件内容
    const fileModule = context(key).default;
    moduleStores[fileName] = {
		namespaced: true,
        ...fileModule,
    };
});

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	websocket: websocket,
	tio: tio,
	...moduleStores
  }
})

export default store
