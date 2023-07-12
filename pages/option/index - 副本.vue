<template>
	<view class="contaier">
		<u-navbar back-text="" title="" :is-back="false" :background="background">
			<view class="slot-wrap">
				<view class="symbol" @click="showSymbol = true"><text class="label">{{currentMarket.baseCoin}}/{{currentMarket.pricingCoin}}</text><u-icon size="30" name="arrow-leftward"></u-icon></view>
				<view class="position" @click="navTo('/pages/option/list')"><text class="label">{{i18n.option.position}}</text><u-icon name="order"></u-icon></view>
			</view>
		</u-navbar>
		<view class="tick">
			<view class="left">
				<view class="price" :class="{upText: (tick != undefined && tick.change >= 0),downText: (tick != undefined && tick.change < 0)}">{{tick != undefined ? tick.close : 0.00}}</view>
				<view class="detail">
					<!--<text class="cny"> ≈ {{tick != undefined ? tick.cny : 0.00}} CNY</text>-->
					<text class="rise" :class="{upText: (tick != undefined && tick.change >= 0),downText: (tick != undefined && tick.change < 0)}">{{tick != undefined ? tick.change : 0.00}}%</text>
				</view>
			</view>
			<view class="right">
				<view class="b">
					<view class="col">
						<text>{{tick.high}}</text>
						<text>{{tick.low}}</text>
						<text>{{tick.vol | formatD}}</text>
					</view>
					<view class="col title">
						<text class="t">{{i18n.market.high}}</text>
						<text class="t">{{i18n.market.low}}</text>
						<text class="t">24H</text>
					</view>
				</view>
			</view>
		</view>
		<view class="tools">
			<view class="period">
				<u-tabs :list="list" class="klineId" bg-color="rgb(16, 23, 37)" inactive-color="rgb(88,116,152)" :bold="false"
				 :is-scroll="false" :current="current" @change="periodTabChange"></u-tabs>
			</view>
			<view class="flexBox">
				<view class="more" @click="showSet = !showSet"><u-icon name="setting-fill" size="34"></u-icon></view>
			</view>
			<view class="setting" v-show="showSet">
				<view class="row">
					<text class="title">类型</text>
					<view class="items">
						<view class="item" :class="{active: defaultPeriod == '5min'}" @tap="ChangeKLinePeriod('5min')">5min</view>
						<view class="item" :class="{active: defaultPeriod == '15min'}" @tap="ChangeKLinePeriod('15min')">15min</view>
						<view class="item" :class="{active: defaultPeriod == '30min'}" @tap="ChangeKLinePeriod('30min')">30min</view>
					</view>
				</view>
				<view class="row">
					<text class="title">主图</text>
					<view class="items">
						<view class="item" :class="{active: mainIndex == '0'}" @tap="ChangeKLineIndex('0', mainIndex)">MA</view>
						<view class="item" :class="{active: mainIndex == '1'}" @tap="ChangeKLineIndex('1', mainIndex)">BOLL</view>
					</view>
				</view>
				<view class="row">
					<text class="title">副图</text>
					<view class="items">
						<view class="item" :class="{active: subIndex == '2'}" @tap="ChangeKLineIndex('2', subIndex)">MACD</view>
						<view class="item" :class="{active: subIndex == '3'}" @tap="ChangeKLineIndex('3', subIndex)">RSI</view>
						<view class="item" :class="{active: subIndex == '4'}" @tap="ChangeKLineIndex('4', subIndex)">VOL</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view>
				<canvas id="kline2" canvas-id='kline2' class='kline2' v-bind:style="{width: KLine.Width+'px', height: KLine.Height+'px'}" 
				  @touchstart="KLineTouchStart" @touchmove='KLineTouchMove' @touchend='KLineTouchEnd' ></canvas>
			</view>
		</view>
		
		<view class="trade">
			<button @click="onTrade('bull')" class="trade-btn upBg">{{i18n.option.sideMap.bull}}</button>
			<button @click="onTrade('bear')" class="trade-btn downBg">{{i18n.option.sideMap.bear}}</button>
		</view>
		
		<u-popup v-model="showSymbol" mode="left">
			<view class="popup-symbol">
				<view class="title little-line">{{i18n.option.title}}</view>
				<scroll-view :scroll-y="true" class="scroll-Y">
					<view @click="onChangeSymbol(item)" class="cell little-line" v-for="(item, index) in markets" :key="`market${index}`">
						<view class="cell-item">{{item.baseCoin}}/{{item.pricingCoin}}</view>
						<view class="cell-item upText" :class="{upText: (item.close > item.open),downText: (item.close < item.open)}">{{item.close}}</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-popup v-model="showTrade" mode="bottom" :closeable="true" z-index="1">
			<view class="popup-trade">
				<view class="title little-line">{{currentMarket.baseCoin}}/{{currentMarket.pricingCoin}}</view>
				<view class="row">
					<view class="label">{{i18n.option.name}}</view>
					<view class="value">{{currentMarket.baseCoin}}</view>
				</view>
				<view class="row">
					<view class="label">{{i18n.option.side}}</view>
					<view class="value" :class="{upText: (form.tradeSide == 'bull'),downText: (form.tradeSide == 'bear')}">{{sideMap[form.tradeSide]}}</view>
				</view>
				<view class="row">
					<view class="label">{{i18n.option.price}}</view>
					<view class="value">{{tick != undefined ? tick.close : 0.00}}</view>
				</view>
				<view class="col">
					<view class="label">{{i18n.option.xzdqsj}} </view>
					<view class="value">
						<view class="item" v-for="(v, k) in currentMarket.periodMap" @click="form.period = k">
							<view class="time" :class="{'current': k == form.period}">{{k}}{{i18n.option.second}}</view>
							<view class="ratio">{{(v * 100) | fixed(2)}}%</view>
						</view>
					</view>
				</view>
				<view class="col">
					<view class="label">{{i18n.option.mrsl}}</view>
					<view class="value">
						<u-input maxlength="12" v-model="form.volume" type="number" :placeholder="i18n.option.srmrsl" :custom-style="{'color': '#ffffff'}" :border="true" />
					</view>
				</view>
				<view class="col">
					<view class="label">{{i18n.option.kyye}}: {{account.normalBalance | fixD(account.showPrecision)}} {{account.symbol}}</view>
				</view>
				<view class="col">
					<u-button @click="onTradeSubmit" type="primary">{{i18n.common.ok}}</u-button>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import {JSCommon} from '../../static/js/umychart.wechat.3.0.js'
	import {JSCommonHQStyle} from '../../static/js/umychart.style.wechat.js'
	
	import pako from '../../utils/pako.js'
	function DefaultData() {}

	DefaultData.GetKLineOption = function() {
		let data = {
			Type: '历史K线图',

			Windows: //窗口指标
				[{
						Index: "MA",
						Modify: false,
						Change: false
					},
					{
						Index: "VOL",
						Modify: false,
						Change: false
					}
				],
			IsShowRightMenu: false, //右键菜单
			IsShowCorssCursorInfo: false, //是否显示十字光标的刻度信息
			CorssCursorInfo: {
				Left: 1,
				Right: 1,
				Bottom: 1,
				IsShowCorss: true,
				PressTime: 300
			}, //十字光标刻度设置

			KLineTitle: //标题设置
			{
				IsShow: false,
				IsShowName: false, //不显示股票名称
				IsShowSettingInfo: false //不显示周期/复权
			},
			Border: //边框
			{
				Left: 1,
				Right: 1, //右边间距
				Top: 4,
				Bottom: 25,
			},

			KLine: {
				Right: 1, //复权 0 不复权 1 前复权 2 后复权
				Period: 0, //周期: 0 日线 1 周线 2 月线 3 年线 
				PageSize: 30, //一屏显示多少数据
				InfoPosition: 1, //显示位置
				KLineDoubleClick: false, //双击分钟走势图
				IsShowTooltip: true, //是否显示K线提示信息
				//FirstShowDate:20180401,             //首屏显示的起始日期   
				DrawType: 0,
			},

			Frame: //子框架设置 (Height 窗口高度比例值)
				[{
						SplitCount:4,			//最多输出5个分隔线
					  //Height:4,
					  IsShowLeftText:false, 	//不显示左边刻度文字
					  IsShowRightText:true,    	//显示右边刻度文字                      
					  Custom:
					  [
						  { 
							  Type:0,
							  Position:'right',
						  }
					  ]
					},
					{
						SplitCount: 2,
						//Height:2,
						IsShowLeftText: false,
						IsShowRightText: true
					},
					{
						SplitCount: 2,
						//Height:2,
						IsShowLeftText: false,
						IsShowRightText: true
					}
				],
			ExtendChart: [{
				Name: 'KLineTooltip'
			}, ],

		};

		return data;
	}

	//周期枚举
	var PERIOD_ID = {
		KLINE_DAY_ID: 0,
		KLINE_WEEK_ID: 1,
		KLINE_MONTH_ID: 2,
		KLINE_YEAR_ID: 3,

		KLINE_MINUTE_ID: 4,
		KLINE_5MINUTE_ID: 5,
		KLINE_15MINUTE_ID: 6,
		KLINE_30MINUTE_ID: 7,
		KLINE_60MINUTE_ID: 8
	}

	var PERIOD_VALUE = {
		//1min  5min  15min  30min  1hour  1day  1week  1month

	}

	var g_KLine = {
		JSChart: null
	};
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		name: 'HQChart',
		mixins: [commonMixin],
		data() {
			let data = {
				showSymbol: false,
				showTrade: false,
				background: {
					backgroundColor: '#101725',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				showSet: false,
				title: '',
				Symbol: 'ethusdt',
				KLine: {
					Option: DefaultData.GetKLineOption(),
					IsShow: true,
					Display: 'none',
					Width: 300,
					Height: 500,
				},
				KlineData: [],
				PERIOD_ID: PERIOD_ID,
				list: [{
						name: '1min'
					},
					{
						name: '1h'
					},
					{
						name: '1d'
					},
					{
						name: '1w'
					},
					{
						name: '1m'
					}
				],
				periodValue: {
					'1min': '1min',
					'5min': '5min',
					'15min': '15min',
					'30min': '30min',
					'1h': '60min',
					'1d': '1day',
					'1w': '1week',
					'1m': '1mon'
					//1min  5min  15min  30min  1hour  1day  1week  1month
				},
				chartPeriod: {
					'1min': 4,
					'5min': 5,
					'15min': 6,
					'30min': 7,
					'60min': 8,
					'1day': 0,
					'1week': 1,
					'1mon': 2
				},
				defaultPeriod: '1day',
				current: 2,
				tick: {
					open: 0,
					close: 0,
					low: 0,
					high: 0,
					vol: 0,
					amount: 0,
					change: 0
				},
				klineIndex: {
					"0": {
						index: 0,
						name: 'MA'
					},
					"1": {
						index: 0,
						name: 'BOLL'
					},
					"2": {
						index: 1,
						name: 'MACD'
					},
					"3": {
						index: 1,
						name: 'RSI'
					},
					"4": {
						index: 1,
						name: 'VOL'
					},
					"5": {
						index: 2,
						name: 'WR'
					}
				},
				mainIndex: "0",
				subIndex: "4",
				intro: {},
				currentMarket: {},
				markets: [],
				marketTimer: null,
				account: {},
				sideMap: {
					'bull': '买涨',
					'bear': '买跌'
				},
				form: {
					marketId: null,
					volume: null,
					tradeSide: null,
					period: null
				}
			}

			return data;
		},
		computed: {
		},
		watch: {
			currentMarket: {
				handler(newV, oldV) {
					if(newV && oldV){
						this.loadAccount()
					}
				},
				immediate: true,
				deep: true
			}
		},
		onLoad(options) {},
		//隐藏的时候 停止定时器和清空hqchart的实例
		onHide() {
			if (g_KLine.JSChart) {
				g_KLine.JSChart.StopAutoUpdate();
				g_KLine.JSChart = null;
			}
			this.syncCancelRealtimeKline();
			this.syncCancelMarketTicker();
			this.syncCancelMarketDetail();
			if(this.marketTimer){
				clearInterval(this.marketTimer)
			}
		},
		//退出的时候 停止定时器和清空hqchart的实例
		onUnload() {
			if (g_KLine.JSChart) {
				g_KLine.JSChart.StopAutoUpdate();
				//如果是WS 需要关闭WS
				g_KLine.JSChart = null;
			}
			this.syncCancelRealtimeKline();
			this.syncCancelMarketTicker();
			this.syncCancelMarketDetail();
			if(this.marketTimer){
				clearInterval(this.marketTimer)
			}
		},
		onReady()
		{	
			console.log("[KLineChart::onReady]");
			// #ifdef H5
			//this.OnSize();
			//this.CreateKLineChart(); 
			// #endif
		},
		onShow() {
			this.sideMap = this.i18n.option.sideMap
			
			this.init()
		},

		methods: {
			...mapActions('option', ['optionMarketList', 'createOptionOrder']),
			...mapActions('account', ['getAccount']),
			onChangeSymbol(item){
				this.syncCancelRealtimeKline();
				this.syncCancelMarketTicker();
				this.syncCancelMarketDetail();
				
				if(this.marketTimer){
					clearInterval(this.marketTimer)
				}
				this.currentMarket = item
				this.Symbol = this.currentMarket.symbol.toLowerCase()
				this.tick = {}
				this.syncSubMarketTicker()
				this.ChangeSymbol(this.Symbol)
				this.showSymbol = false
			},
			getMarketList(){
				this.optionMarketList().then(res => {
					this.markets = res.data
				})
			},
			loadAccount(){
				this.getAccount(this.currentMarket.betCoin).then(res =>{
					this.account = res.data
				})
			},
			onTrade(side){
				this.resetForm()
				this.form.marketId = this.currentMarket.marketId
				this.form.tradeSide = side
				for(let key in this.currentMarket.periodMap){
					if(this.form.period){
						break;
					}
					this.form.period = key
				}
				this.showTrade = true
			},
			onTradeSubmit(){
				let that = this
				if(!this.form.volume){
					this.$api.msg(this.i18n.option.srmrsl)
					return;
				}
				if(this.currentMarket.minAmount && this.form.volume < this.currentMarket.minAmount){
					this.$api.msg(this.i18nParse(this.i18n.option.tips.zxsl, [this.currentMarket.minAmount]))
					return;
				}
				if(this.currentMarket.maxAmount && this.form.volume > this.currentMarket.maxAmount){
					this.$api.msg(this.i18nParse(this.i18n.option.tips.zdsl, [this.currentMarket.maxAmount]))
					return;
				}
				uni.showModal({
				    title: this.i18n.common.tip,
				    content: this.i18n.popup.submittext,
					confirmText: this.i18n.common.ok,
					cancelText: this.i18n.common.cancel,
				    success: function (res) {
				        if (res.confirm) {
				            that.createOptionOrder(that.form).then(res => {
				            	that.$api.msg(this.i18n.option.tips.xdcg)
								this.showTrade = false
				            })
				        }
				    }
				});
			},
			resetForm(){
				this.form = {
					marketId: null,
					volume: null,
					tradeSide: null,
					period: null
				}
			},
			async init(){
				let that = this
				let res = await this.optionMarketList();
				this.tick = {
					open: 0,
					close: 0,
					low: 0,
					high: 0,
					vol: 0,
					amount: 0,
					change: 0
				}
				if(res.data && res.data.length > 0){
					this.markets = res.data
					this.currentMarket = this.markets[0]
					this.Symbol = this.currentMarket.symbol.toLowerCase()
					setTimeout(() => {
						that.syncSubMarketTicker()
					}, 1000)
					uni.getSystemInfo({
						success: function(res) {
							that.KLine.Width = res.windowWidth
							that.ChangeKLinePeriod(PERIOD_ID.KLINE_DAY_ID);
						}
					});
				}
				this.marketTimer = setInterval(() => {
					that.getMarketList()
				}, 3000)
			},
			
			capture() {
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				var bitmap = null;
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap, function() {
					bitmap.save("_doc/a.jpg", {}, function(i) {
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({
									title: '保存成功’',
									mask: false,
									duration: 1500
								});
							}
						});
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
				//currentWebview.append(amway_bit);    
			},
			syncSubRealtimeKline() {
				let that = this
				let ch = `market.${this.Symbol}.kline.${this.defaultPeriod}`
				let params = {
				  "id": new Date().getTime(),
				  "sub": ch,
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
				uni.$on("sub."+ch, (res) => {
					if (this.chartPeriod[this.defaultPeriod] > 3) {
						that.RecvMinuteRealtimeData(res.data, ch)
					} else {
						that.RecvRealtimeData(res.data, ch)
					}
				})
			},
			syncCancelRealtimeKline() {
				let ch = `market.${this.Symbol}.kline.${this.defaultPeriod}`
				let params = {
				  "id": new Date().getTime(),
				  "unsub": ch,
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
			},
			syncSubMarketTicker() {
				let that = this
				let ch = "market.overviewv2"
				let params = {"sub": ch}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
				uni.$on("sub."+ch, (res) => {
					if(!this.tick.close){
						let map = res.data.data
						if(map[this.Symbol]){
							let item = map[this.Symbol]
							let tick = {
								open: item.o,
								close: item.c,
								low: item.l,
								high: item.h,
								vol: item.v,
								amount: item.a
							}
							tick.change = parseFloat((tick.close - tick.open) / tick.open * 100).toFixed(2);
							tick.cny = parseFloat(tick.close * 6.4).toFixed(2)
							this.tick = tick
							this.syncSubMarketDetail()
						}
					}
				})
			},
			syncCancelMarketTicker() {
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify({"unsub": "market.overviewv2"}))
				let ch = `market.${this.Symbol}.detail`
				let params = {
				  "id": new Date().getTime(),
				  "unsub": ch,
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
			},
			syncSubMarketDetail(){
				let that = this
				let ch = `market.${this.Symbol}.detail`
				let params = {
				  "id": new Date().getTime(),
				  "sub": ch,
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
				uni.$on("sub."+ch, (res) => {
					let open = this.tick.open
					let tick = res.data.tick
					tick.open = open
					tick.change = parseFloat((tick.close - tick.open) / tick.open * 100).toFixed(2);
					tick.cny = parseFloat(tick.close * 6.4).toFixed(2)
					this.tick = tick
				})
			},
			syncCancelMarketDetail(){
				let that = this
				let ch = `market.${this.Symbol}.detail`
				let params = {
				  "id": new Date().getTime(),
				  "unsub": ch,
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
			},
			OnSize()
			{
				// #ifdef H5
				this.OnSize_h5();
				// #endif
			},
			
			OnSize_h5()
			{
				var chartHeight = this.KLine.Height;
				var chartWidth = this.KLine.Width;
				 
				var kline=this.$refs.kline;
				kline.style.width=chartWidth+'px';
				kline.style.height=chartHeight+'px';
				if (g_KLine.JSChart) g_KLine.JSChart.OnSize();
			},
			CreateKLineChart_app()
			{
				if (this.KLine.JSChart) return;
				
				let element = new JSCommon.JSCanvasElement();
				element.IsUniApp = true; //canvas需要指定下 是uniapp的app
				element.ID = 'kline2';
				element.Height = this.KLine.Height; //高度宽度需要手动绑定!!
				element.Width = this.KLine.Width;
				
				g_KLine.JSChart = JSCommon.JSChart.Init(element);
				
				var blackStyle = JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
				blackStyle.BGColor='rgb(12,23,37)';                 //背景
				blackStyle.FrameTitleBGColor='rgb(16,28,45)';       //指标标题背景
				blackStyle.FrameSplitTextColor='rgb(101,117,138)';  //刻度颜色
			
				//K线颜色
				blackStyle.UpBarColor='rgb(37,175,142)';   			//K线上涨柱子颜色
				blackStyle.UpTextColor= blackStyle.UpBarColor;		//上涨价格颜色
				blackStyle.DownBarColor='rgb(210,73,99)';			//K线下跌柱子颜色
				blackStyle.DownTextColor=blackStyle.DownBarColor;	//下跌价格颜色
			
				//指标线段颜色
				blackStyle.Index.LineColor[0]='rgb(88,106,126)';    
				blackStyle.Index.LineColor[1]='rgb(222,217,167)';
				blackStyle.Index.LineColor[2]='rgb(113,161,164)';
			
				//最新价格刻度颜色
				blackStyle.FrameLatestPrice.UpBarColor='rgb(37,175,142)';
				blackStyle.FrameLatestPrice.DownBarColor='rgb(210,73,99)';
			
				//面积图颜色
				blackStyle.CloseLineColor='rgb(113,121,133)';   //收盘价线颜色
				blackStyle.CloseLineAreaColor=['rgba(36,41,57,0.8)','rgba(22,34,53,0.3)'];  //收盘价面积图颜色
				
				//最高最低价颜色
				blackStyle.KLine.MaxMin.Color='rgb(255,250,240)';
				JSCommon.JSChart.SetStyle(blackStyle);
				
				this.KLine.Option.NetworkFilter = this.NetworkFilter;
				this.KLine.Option.Symbol = this.Symbol;
				this.KLine.Option.IsCorssOnlyDrawKLine = true; //十字光标只能在K线上
				this.KLine.Option.CorssCursorTouchEnd = true; //手势结束十字光标自动隐藏
				this.KLine.Option.IsClickShowCorssCursor = true; //手势点击出现十字光标
				//this.KLine.Option.EnableScrollUpDown = true; //允许手势上下操作滚动页面
				this.KLine.Option.IsFullDraw = true;
				this.KLine.Option.IsApiPeriod = true; //一定要设置为true不然会有意想不到的惊喜
				this.KLine.Option.ExtendChart = [{
					Name: 'KLineTooltip'
				}];
				g_KLine.JSChart.SetOption(this.KLine.Option);
				
				g_KLine.JSChart.AddEventCallback({
					event: JSCommon.JSCHART_EVENT_ID.ON_TITLE_DRAW,
					callback: this.OnTitleDraw
				});
			},
			
			CreateKLineChart()
			{
				this.CreateKLineChart_app();
			},
			OnTitleDraw(event, data, obj) //K线信息
			{
				/* console.log('[OnTitleDraw]', event, data);
				if (!data.Draw) {
					this.TestData = "隐藏";
				} else {
					var item = data.Draw;
					this.TestData = `日期:${item.Date} 收:${item.Close}`;
				} */
			},
			//K线周期切换
			ChangeKLinePeriod: function(period) {
				if (!g_KLine.JSChart) //不存在创建
				{
					this.KLine.Option.Period = period;
					this.CreateKLineChart();
				} else {
					this.syncCancelRealtimeKline()
					this.defaultPeriod = period;
					g_KLine.JSChart.ChangePeriod(this.chartPeriod[this.defaultPeriod]);
				}
				this.showSet = false;
			},
			//切换指标 windowIndex=窗口索引 0开始, name=指标名字/ID
			ChangeKLineIndex: function(windowIndex, tt) {
				if (!g_KLine.JSChart) return;
				let item = this.klineIndex[windowIndex]
				g_KLine.JSChart.ChangeIndex(item.index, item.name);
				if (windowIndex > 1) {
					this.subIndex = windowIndex
				} else {
					this.mainIndex = windowIndex
				}
				this.showSet = false;
			},
			//切换股票
			ChangeSymbol: function(symbol) {
				if (!g_KLine.JSChart) return;

				g_KLine.JSChart.ChangeSymbol(symbol);
			},
			RecvRealtimeData: function(recvData, ch) {
				//console.log("=========RecvMinuteRealtimeData", ch, recvData)
				if (recvData.ch != ch) return;
				
				var internalChart=g_KLine.JSChart.JSChartContainer;
				var period=internalChart.Period;
				var symbol=internalChart.Symbol;
	
				var hqChartData={code:0, stock:[]};
				//TODO:把recvData => hqchart内部格式 格式看教程
				//HQChart使用教程30-K线图如何对接第3方数据14-轮询增量更新日K数据
	
				var stock={symbol:internalChart.Symbol, name:internalChart.OriginalSymbol};
				var item=recvData.tick;
				var dateTime = new Date();
				dateTime.setTime(item.id*1000);
				var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
				var time=dateTime.getHours()*100+dateTime.getMinutes();
	
				stock.date=date;
				stock.yclose=null;
				stock.open=item.open;
				stock.high=item.high;
				stock.low=item.low;
				stock.price=item.close;
				stock.vol=item.vol;
				stock.amount=item.amount;
	
				hqChartData.stock.push(stock);
				
				internalChart.RecvRealtimeData({data: hqChartData});
			},
			RecvMinuteRealtimeData: function(recvData, ch) {
				//console.log("=========RecvMinuteRealtimeData", ch, recvData)
				if (recvData.ch!=ch) return;
				var internalChart = g_KLine.JSChart.JSChartContainer;
				var period = internalChart.Period;
				var symbol = internalChart.Symbol;

				var hqChartData = {
					code: 0,
					data: [],
					ver: 2.0
				}; //更新数据使用2.0版本格式
				hqChartData.symbol = this.Symbol;
				hqChartData.name = this.Symbol;
				//TODO:把recvData => hqchart内部格式 格式看教程
				//HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据

				var item = recvData.tick;
				//console.log("=========RecvMinuteRealtimeData", item)
				var timestamp = item.id * 1000;
				var dateTime = new Date();
				dateTime.setTime(timestamp);
				var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.getDate();
				var time = dateTime.getHours() * 100 + dateTime.getMinutes();
				
				var newItem = [date, null, item.open, item.high, item.low, item.close, item.vol, item.amount, time];
				hqChartData.data.push(newItem);
				
				internalChart.RecvMinuteRealtimeData({data: hqChartData});
				//console.log("=========RecvMinuteRealtimeData", recvData)
			},
			periodTabChange(index) {
				console.log(index);
				this.current = index;
				this.syncCancelRealtimeKline()
				this.defaultPeriod = this.periodValue[this.list[index].name];
				g_KLine.JSChart.ChangePeriod(this.chartPeriod[this.defaultPeriod]);
				console.log(this.periodValue[this.list[index].name], this.chartPeriod[this.defaultPeriod])
			},
			/* 0=日期 格式YYYYMMDD 如20190229=》 2019-02-29
			1=前收盘
			2=开盘价
			3=最高
			4= 最低
			5=收盘
			6=成交量
			7=成交金额
			8=时间格式 */
			NetworkFilter: function(data, callback) {
				//console.log('========================[HQChart:NetworkFilter] data', data);
				data.PreventDefault = true;
				switch (data.Name) {
					case 'KLineChartContainer::ReqeustHistoryMinuteData': //分钟全量数据下载
						this.RequestHistoryData(data, callback, true);
						break;
					case 'KLineChartContainer::RequestFlowCapitalData': //数字货币不会调用
						//this.RequestFlowCapitalData(data, callback);
						break;
					case 'KLineChartContainer::RequestHistoryData': //日线全量数据下载
						this.RequestHistoryData(data, callback, false);
						break;
				}
			},
			RequestHistoryData: function(data, callback, isMuite) {
				
				data.PreventDefault = true;
				let that = this;
				let ch = `market.${this.Symbol}.kline.${this.defaultPeriod}`
				let params = {
				  "id": new Date().getTime(),
				  "req": ch,
				}
				setTimeout(() =>{
					this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
				}, 1000)
				uni.$on("req." + ch, (res) => {
					let d = that.transferKlineData(res.data.data, isMuite)
					
					callback({data: d});
					this.syncSubRealtimeKline()
				})
			},
			transferKlineData: function(data, isMin) {
				var hqChartData = {
					code: 0,
					data: [],
					version: "2.0"
				};
				hqChartData.symbol = this.Symbol;
				hqChartData.name = this.Symbol;
				var yClose = null;
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
					var timestamp = item.id * 1000;
					var dateTime = new Date();
					dateTime.setTime(timestamp);
					var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.getDate();
					var time = dateTime.getHours() * 100 + dateTime.getMinutes();
					var newItem = [date, yClose, item.open, item.high, item.low, item.close, item.vol, item.amount];
					if (isMin) {
						newItem[8] = time
					}
					//console.log("============", date, time, isMin)
					yClose = item.close;
					hqChartData.data.push(newItem);
				}
				return hqChartData;
			},
			//KLine事件
			KLineTouchStart: function(event) {
				if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
			},

			KLineTouchMove: function(event) {
				if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
			},

			KLineTouchEnd: function(event) {
				if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
			},
		}
	}
</script>

<style lang="scss">
	$upColor: rgb(37,175,142);
	$downColor: rgb(210,73,99);
	$mainBgColor: #101725;
	page {
		background-color: $mainBgColor;
	}
	.upText{
		color: $upColor;
	}
	.downText{
		color: $downColor;
	}
	.upBg{
		background-color: $upColor;
	}
	.downBg{
		background-color: $downColor;
	}
	.klineId {
		.u-tab-bar {
			font-weight: none;
		}
	}
	.trade{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: $mainBgColor;
		display: flex;
		padding: 10rpx 0;
		.trade-btn{
			width: 45%;
			border: 0rpx !important;
			color: #ffffff;
			font-size: 30rpx;
		}
	}
	.popup-trade{
		background-color: $mainBgColor;
		height: 760rpx;
		color: #ffffff;
		overflow: hidden;
		.title{
			font-size: 30rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			padding: 20rpx 20rpx;
		}
		.row{
			display: flex;
			justify-content: space-between;
			padding: 10rpx 20rpx;
		}
		.col{
			padding: 10rpx 20rpx;
			.label{
				padding-bottom: 10rpx;
			}
			.value{
				display: flex;
				justify-content: space-between;
				.item{
					width: 24%;
					text-align: center;
					border: 1rpx solid #2979ff;
					border-radius: 10rpx;
					font-size: 24rpx;
					.current{
						background-color: #2979ff;
					}
					.time{
						border-bottom: 1rpx solid #2979ff;
						padding: 4rpx 0;
					}
					.ratio{
						padding: 4rpx 0;
					}
				}
			}
		}
	}
	.scroll-Y{
		height: 100%;
		padding-bottom: 30rpx;
	}
	.popup-symbol{
		background-color: $mainBgColor;
		width: 460rpx;
		height: 100%;
		overflow: hidden;
		.title{
			font-size: 34rpx;
			font-weight: bold;
			color: #ffffff;
			display: flex;
			align-items: center;
			padding: 0rpx 20rpx;
			height: 100rpx;
		}
		.cell{
			width: 100%;
			color: #ffffff;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx;
			.cell-item{
			}
		}
	}
	.solt-right {
		display: flex;
		align-items: center;

		.u-icon {
			margin-right: 20rpx;
		}
	}

	.contaier {
		padding-bottom: 140upx;
	}
	.slot-wrap{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #ffffff;
		padding: 0 30rpx;
		.symbol{
			font-size: 34rpx;
			font-weight: bold;
			.label{
				margin-right: 20rpx;
			}
		}
		.position{
			font-size: 28rpx;
			font-weight: bold;
			.label{
				margin-right: 10rpx;
			}
		}
	}
	.slot-content{
		
	}
	.setting {
		position: absolute;
		left: 0;
		top: 74upx;
		background-color: rgb(9, 17, 25);
		padding: 20upx 20upx 60upx 20upx;
		width: 100%;
		z-index: 9999999;
		.row {
			.title {
				display: block;
				font-size: $font-base;
				padding-bottom: 20upx;
				color: #ffffff;
				padding-top: 20upx;
			}

			.items {
				display: flex;
				flex-direction: row;

				.item {
					padding: 10upx 20upx;
					background-color: rgb(17, 30, 50);
					margin-right: 20upx;
					color: rgb(88, 116, 152);
					font-size: 24rpx;
					border: 2rpx solid transparent;
				}

				.active {
					border: 2upx solid rgb(41, 121, 255);
				}
			}
		}
	}

	.tick {
		display: flex;
		flex-direction: row;
		padding: 30upx 30upx;

		.left {
			flex: 1;

			.price {
				font-size: $font-xxl;
				font-weight: bold;
			}

			.detail {
				display: block;
				color: rgb(88, 116, 152);
				font-size: $font-base;
				padding-top: 10upx;

				.rise {
					margin-left: 0upx;
				}
			}
		}

		.right {
			flex: 1;

			.b {
				width: 100%;

				.col {
					float: right;
					display: flex;
					flex-direction: column;
					text-align: right;
					text {
						display: block;
						height: 40upx;
						font-size: $font-sm;
						color: #ffffff;
					}
				}

				.title {
					width: 60upx;
					text-align: left;
					.t {
						color: rgb(88, 116, 152);
					}
				}
			}
		}
	}

	.tools {
		display: flex;
		flex-direction: row;
		position: relative;
		width: 100%;
		.period {
			flex: 1;
		}

		.flexBox {
			width: 180rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			position: relative;
			color: rgb(88, 116, 152);
			.more{
				
			}
			.dept {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #587498;
			}

			.dropdown {
				// flex: 1;
			}
		}

	}
</style>
