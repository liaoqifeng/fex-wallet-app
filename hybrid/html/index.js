// 图表库实例化后储存的函数
var widget = null 
// 进入页面 默认展示的产品
var index_market = 'btcusdt'
// 进入页面 默认展示的产品周期
var index_activeCycle = '1D'

function GetQueryString(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 if(r!=null)return  unescape(r[2]); return null;
}
var symbol = GetQueryString("symbol");
if(symbol){
	index_market = symbol
}
document.title = symbol.toUpperCase()
//console.log(symbol)

Event.on('market-detail', data => {
	document.getElementById('close').innerText = data.close.toFixed(2)
	document.getElementById('cny').innerText = (data.close * 7.04).toFixed(2)
	var change = ((data.close - data.open) / data.open * 100).toFixed(2)
	document.getElementById('change').innerText = (change > 0 ? '+' : '') + change + '%'
	document.getElementById('high').innerText = data.high.toFixed(2)
	document.getElementById('low').innerText = data.low.toFixed(2)
	document.getElementById('amount').innerText = data.amount.toFixed(2)
	var color = ''
	if(change > 0){
		 color = "#00b45a"
	}
	if(change < 0){
		color = "#ff6059"
	}
	document.getElementById('close').style.color= color
	document.getElementById('change').style.color= color
})
console.log(window.TradingView)
// window.TradingView.onready 确保在html的dom加载完成后在调用

function initOnReady () {
  // chartConfig 在chartConfig.js里面
  // 给chartConfig添加展示周期
  chartConfig.interval = index_activeCycle
  // 给chartConfig添加展示产品
  chartConfig.symbol = index_market

  // 初始化 TradingView
  widget = new window.TradingView.widget(chartConfig)
  //console.log("widget", widget)
  widget && widget.onChartReady && widget.onChartReady(function () {
    // 这是k线图 展示的 7日均线和30日均线。
    widget.chart().createStudy('Moving Average', false, false, [7], null, {'Plot.linewidth': 2, 'Plot.color': '#2ba7d6'})
    widget.chart().createStudy('Moving Average', false, false, [30], null, {'Plot.linewidth': 2, 'Plot.color': '#de9f66'})
		setTimeout(() => {
			widget.chart().resetData()
		}, 1000)
	})
}

window.addEventListener('DOMContentLoaded', initOnReady, false);

var intervalDom = document.getElementById('interval')

// 切换产品周期
intervalDom.addEventListener('click', function (e) {
  // e.target.dataset.value 这个就是获取的产品的周期
	console.log(e.target.dataset.value)
	// 1 为平均K线； 3 为面积图
	widget.chart().setChartType(e.target.dataset.value == '1' ? 3 : 1)
  widget.chart().setResolution(e.target.dataset.value)
  // 这个函数不用看，我为了样式好看 写一个添加删除class
  addClass(intervalDom, e.target)
}, false)




// 单纯的写一个添加class的函数，这个不用看 没用
function addClass (fatherDom, dom) {
  [...fatherDom.getElementsByTagName('span')].forEach(function(item){
    item.className = ''
  })
  dom.className = 'active'
}
