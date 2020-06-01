import { USER_LOGIN, USER_UPDATE_PAY_PWD } from './../mutations_type'
import { register, login, updatePayPwd, updatePwd, encryptBookList, addEncryptBook, deleteEncryptBook } from '@/api/user'

const user = {
  state: {
	  loginInfo: {
		  nickname: null,
		  profile: null,
		  hasLogin: false
	  }
  },

  mutations: {
	  [USER_LOGIN](state, payload) {
	  		if(payload.code == 200){
	  			state.loginInfo = payload.data
				state.loginInfo.hasLogin = true
	  			uni.setStorageSync('token', payload.data.token);
	  		}
	  },
	  [USER_UPDATE_PAY_PWD](state, payload) {
	  		if(payload.code == 200){
	  			state.loginInfo.isCapitalPasswd = true
	  			
	  		}
	  },
  },

  actions: {
	  hasLogin(){
	  	const token = uni.getStorageSync('token');
	  	if(token != undefined && token != null && token != ''){
	  		return true;
	  	}
	  	return false;
	  },
    // 注册
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
	login({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    login(data).then(res => {
			commit(USER_LOGIN, res)
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	updatePwd({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    updatePwd(data).then(res => {
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	updatePayPwd({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    updatePayPwd(data).then(res => {
			commit(USER_UPDATE_PAY_PWD, res)
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	encryptBookList({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    encryptBookList(data).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	addEncryptBook({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    addEncryptBook(data).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	deleteEncryptBook({ commit }, id) {
	  return new Promise((resolve, reject) => {
	    deleteEncryptBook(id).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	}
  }
}

export default user
