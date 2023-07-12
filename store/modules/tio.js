import pako from 'pako'
const tio = {
	state: {
		tioSocketTask: null,
		is_open_tio_socket: false,
		tioTasks: []
	},

	mutations: {
		TIO_CONNECT(state, url) {
			let _this = this
			state.tioSocketTask = uni.connectSocket({
				url: url,
				success(data) {
					console.log("Tio Ws 连接成功", data);
				},
			});
			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			state.tioSocketTask.onOpen((res) => {
				console.log("Tio Ws 连接正常打开中...！");
				state.is_open_tio_socket = true;
				// 注：只有连接正常打开中 ，才能正常收到消息
				
				setInterval(() => {
					if(state.tioTasks.length > 0){
						for(let i = 0; i < state.tioTasks.length; i++){
							_this.commit('TIO_SEND', state.tioTasks[i])
						}
						state.tioTasks = []
					}
					_this.commit('TIO_SEND', JSON.stringify({'ping': new Date().getTime()}))
				}, 5000)
			})
			uni.onSocketError(function (res) {
			  console.log('Tio Ws 连接打开失败，请检查！', res);
			  _this.commit('TIO_CONNECT', url)
			})
			
			state.tioSocketTask.onMessage((res) => {
				let ploydata = new Uint8Array(res.data);
				let msg = pako.inflate(ploydata, {to: 'string'});
				let result = JSON.parse(msg)
				
				if(result.pong){
					return;
				}
				
				//console.log("收到服务器内容111111111111：", result.data)
				//
				//console.log(data)
				if(result && result.ch){
					//console.log("收到服务器内容111111111111：", result)
					uni.$emit("sub."+result.ch,{data: result})
				}
				if(result && result.rep){
					result.data = JSON.parse(result.data);
					//console.log("收到服务器内容111111111111：", data)
					uni.$emit("req."+result.rep,{data: result})
				}
			});
		},
		
		TIO_SEND(state, p) {
			if(!state.is_open_tio_socket){
				state.tioTasks.push(p)
				return
			}
			state.tioSocketTask.send({
				data: p,
				async success() {},
			});
		}
	},

	actions: {
		TIO_CONNECT({
			commit
		}, url) {
			commit('TIO_CONNECT', url)
		},
		TIO_SEND({
			commit
		}, p) {
			commit('TIO_SEND', p)
		}
	}
}

export default tio
