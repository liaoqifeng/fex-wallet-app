// import Event from './event.js'
var pako = window.pako
var socket = {
	socket: null, // socket name
	realTimeData: null, // 请求实时数据的参数
	intervalObj: null, // 定时器的名字
	lastRealTimeData: null, // 上一次请求的产品
	sendData(historyData, realTimeDatas, history) {
		// 储存历史数据
		this.historyData = historyData
		this.realTimeData = realTimeDatas
		// 如果上一次订阅过产品
		if (this.lastRealTimeData) {
			// 如果不是订阅历史产品 那么肯定就是切换周期咯 或者 切换产品
			// 那么就取消订阅上一次的产品实时数据
			if (!history) {
				console.log('取消订阅'+ this.lastRealTimeData)
				this.sendWsRequest({
				  "unsub": this.lastRealTimeData,
				  "id": "id1"
				})
			}
		
			// 请求这一次的历史
			this.sendWsRequest(this.historyData)
			
			// 如果不是订阅历史产品 那么肯定就是切换周期咯 或者切换产品咯 
			// 那么就订阅一下 这次产品的或者周期的 实时数据
			if (!history) {
				console.log('订阅新的'+ realTimeDatas)
				this.sendWsRequest({
					"sub": realTimeDatas,
					"id": "id1"
				})
			}
		} else {
			// 如果是第一次订阅，就是说刚进入交易所，
			// 先存起来这一次请求的产品 作为历史产品
			this.lastRealTimeData = this.realTimeData
			// 然后 初始化一下websocket
			this.initWs()
		}
	},
	initWs() {
		this.socket = new WebSocket('wss://www.huobi.qa/-/s/pro/ws')
		this.socket.onopen = () => {
			this.sendWsRequest(this.historyData)
			this.sendWsRequest({
				"sub": this.historyData.req,
				"id": "id1"
			})
			
			var symbol = this.historyData.req.split('.')[1]
			let ch = 'market.'+symbol+'.detail'
			let data = { "sub": ch, "id": Date.now() + "" }
			socket.sendWsRequest(data)
		}
		this.socket.onmessage = resp => {
			this.message(resp)
		}
		this.socket.onclose = () => {
			this.close()
		}
		this.socket.onerror = err => {
			this.error(err)
		}
	},
	error(err) {
		console.log(err, 'depth-socket::error')
	},
	close() {
		// 如果websocket关闭的话，就从新打开一下。
		this.initWs()
		console.log('depth-socket::close')
	},
	message(resp) {
		let this_ = this
		let reader = new FileReader()
		reader.onload = function(e) {
			// 对数据进行解压
			let msg = JSON.parse(pako.ungzip(reader.result, {
				to: 'string'
			}))
			console.log("huobi ws:", msg)
			if(msg.ch && msg.ch.indexOf('.detail') > 0){
				Event.emit('market-detail', msg.tick)
				return
			}
			// 如果是实时数据触发Event('realTime') 喂数据
			if (msg.tick) {
				Event.emit('realTime', msg.tick)
			}
		
			//响应服务器，避免断开连接
			if (msg.ping) {
				this_.socket.send(JSON.stringify({
					pong: msg.ping
				}));
				this_.hasCheck = true
			}
			
			this_.lastRealTimeData = this_.realTimeData
			// 如果是历史数据触发Event('data') 绘制数据
			if (msg.data && Array.isArray(msg.data)) {
				Event.emit('data', msg.data)
			}
		
		}
		// //将返回的数据解析为字符串格式
		reader.readAsArrayBuffer(resp.data);
	},
	checkSendMessage(options) {
		// 这里处理websocket 连接不上的问题
		var checkTimes = 10
		var i = 0
		this.intervalObj = setInterval(() => {
			i += 1
			if (this.socket.readyState === 1) {
				// ...
				this.socket.send(options)
				clearInterval(this.intervalObj)
				return
			}
			if (i >= checkTimes) {
				clearInterval(this.intervalObj)
				console.log('send post_data_str timeout.')
			}
		}, 500)
	},
	sendWsRequest(options) {
		switch (this.socket.readyState) {
			case 0:
				this.checkSendMessage(JSON.stringify(options))
				break
			case 1:
				this.socket.send(JSON.stringify(options))
				break
			case 2:
				console.log('ws关闭状态')
				break
			case 3:
				this.initWs()
				break
			default:
				console.log('ws未知错误')
		}
	}
}

// export default socket
