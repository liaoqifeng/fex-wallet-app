import pako from 'pako'
const websocket = {
	state: {
		socketTask: null,
		is_open_socket: false,
		tasks: []
	},

	mutations: {
		WEBSOCKET_INIT(state, url) {
			let _this = this
			// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
			console.log('websocket 连接 url: ' + url)
			state.socketTask = uni.connectSocket({
				url: url,
				// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
				success(data) {
					console.log("websocket连接成功", data);
				},
			});
			console.log(state.socketTask)
			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			state.socketTask.onOpen((res) => {
				console.log("WebSocket连接正常打开中...！");
				state.is_open_socket = true;
				// 注：只有连接正常打开中 ，才能正常收到消息
				setInterval(() => {
					if(state.tasks.length > 0){
						for(let i = 0; i < state.tasks.length; i++){
							_this.commit('WEBSOCKET_SEND', state.tasks[i])
							//_this.WEBSOCKET_SEND(state.tasks[i])
						}
						state.tasks = []
					}
				}, 3000)
			})
			state.socketTask.onMessage((res) => {
				//console.log("收到服务器内容：" + res.data);
				let ploydata = new Uint8Array(res.data);
				let msg = pako.inflate(ploydata, {to: 'string'});
				let result = JSON.parse(msg)
				//console.log("收到服务器内容：", result)
				if(result.ping){
					let data = {'pong': result.ping}
					state.socketTask.send({
						data: JSON.stringify(data),
						async success() {
							//console.log("pong消息发送成功");
						},
					});
					return
				}
				if(result && result.ch){
					uni.$emit("sub."+result.ch,{data: result})
				}
				if(result && result.rep){
					//console.log("req."+result.rep, result)
					uni.$emit("req."+result.rep,{data: result})
				}
			});
		},
		
		WEBSOCKET_SEND(state, p) {
			//console.log("ws发送:", p);
			if(!state.is_open_socket){
				state.tasks.push(p)
				return
			}
			state.socketTask.send({
				data: p,
				async success() {
					//console.log("消息发送成功");
				},
			});
		}
	},

	actions: {
		WEBSOCKET_INIT({
			commit
		}, url) {
			commit('WEBSOCKET_INIT', url)
		},
		WEBSOCKET_SEND({
			commit
		}, p) {
			commit('WEBSOCKET_SEND', p)
		}
	}
}

export default websocket
