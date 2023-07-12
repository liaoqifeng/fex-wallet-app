<template>
	<view class="contaner">
		<!-- 这里的fixed建议设置为true，设置为true则无需设置z-paging的高度及其父view的高度 -->
		<z-paging ref="paging" v-model="dataList" fixed @query="queryList">
			<!-- 将不需要参与滚动的部分，放在slot="top"的view中，如果只有一个标签，可以直接在此标签上写slot="top"，将自定义的导航栏放到里面即可 -->
			<view slot="top">
				<view class="header">
					<view class="side">
						<view class="navbar">
							<view class="nav-item" :class="{current: sideIndex === 0}" @click="sideTabClick('BUY', 0)">{{i18n.otc.buyTab}}</view>
							<view class="nav-item" :class="{current: sideIndex === 1}" @click="sideTabClick('SELL', 1)">{{i18n.otc.sellTab}}</view>
						</view>
						<view class="order"><u-icon size="40" name="order" color="#ffffff" @click="navTo('/pages/otc/order/list', true)"></u-icon></view>
					</view>
					<view class="coinNavbar little-line">
						<view 
							v-for="(item, index) in fiatCoins" :key="index" 
							class="nav-item" 
							:class="{current: coinIndex === index}"
							@click="coinTabClick(index)"
						>
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view class="list">
				<view class="item">
					<view v-for="(item, index) in dataList" class="order-item little-line">
							<view class="row user-info">
								<view class="name"><view class="profile">{{item.nickname | sub}}</view>{{item.nickname}}</view>
								<view class="nomarl"></view>
							</view>
							<view class="row">
								<view class="nomarl">{{i18n.otc.vol}} {{(item.volume - item.dealVolume) | fixed(2)}} {{item.coin}}</view>
								<view class="nomarl">{{i18n.otc.price}}</view>
							</view>
							<view class="row">
								<view class="nomarl">{{i18n.otc.limit}}{{currencysMap[item.paycoin]}}{{item.minTrade}}-{{currencysMap[item.paycoin]}}{{item.maxTrade}}</view>
								<view class="price">{{currencysMap[item.paycoin]}}{{item.price}}</view>
							</view>
							<view class="row opt">
								<view class="pay">
									<view class="pay">
										<view class="item" v-for="(t, index) in JSON.parse(item.payment)" :key="index">
											<text class="icon" :style="{backgroundColor: paymentsMap[t]}"></text>{{i18n.payment.method[t]}}
										</view>
									</view>
								
								</view>
								<view>
									<button class="btn buy" v-if="item.side == 'BUY'" @click="create(item)">{{i18n.otc.buy}}</button>
									<button class="btn sell" v-if="item.side == 'SELL'" @click="create(item)">{{i18n.otc.sell}}</button>
								</view>
							</view>
						</view>
				</view>
			</view>
		</z-paging>
		
		<view class="modal" v-if="showModal">
			<view class="box">
				<view class="coin">
					<view>
						<view class="name">{{sideMap[ad.side]}}{{ad.coin}}</view>
						<view>{{i18n.otc.price}}:<text class="price">{{currencysMap[ad.paycoin]}}{{ad.price}}</text></view>
					</view>
					<!-- <view><image class="icon" :src="coinMap[ad.coin].icon"></image></view> -->
				</view>
				<view class="type">
					<view @click="changeType(0)" :class="form.type == 0 ? 'active' : ''">{{i18n.otc.byAmount}}{{sideMap[ad.side]}}</view>
					<view @click="changeType(1)" :class="form.type == 1 ? 'active' : ''">{{i18n.otc.byVol}}{{sideMap[ad.side]}}</view>
				</view>
				<view class="input">
					<view><input @blur="blur" @focus="focus" class="uni-input" cursor-spacing="0" :adjust-position="false" v-model="form.volume" type="number" :placeholder="placeholder[form.type]"/></view>
					<view><!-- <text class="i cny">{{ad.paycoin}}</text> --> | <text @click="allBuy" class="i all">{{i18n.otc.all}}{{sideMap[ad.side]}}</text></view>
				</view>
				<view class="limit">{{i18n.otc.limit}}：{{currencysMap[ad.paycoin]}}{{ad.minTrade}} - {{currencysMap[ad.paycoin]}}{{ad.maxTrade}}</view>
				<view class="num">{{i18n.otc.tradeVol}}：{{showVolume}} {{ad.coin}}</view>
				<view class="amount">
					<view class="t-p">{{i18n.otc.payAmount}}</view>
					<view class="p">{{currencysMap[ad.paycoin]}}{{showAmount}}</view>
				</view>
				<view class="btns">
					<view @click="cancel" class="btn cancel">{{i18n.common.cancel}}</view>
					<view @click="submit" class="btn" :class="form.volume ? 'submit' : 'cancel'">{{i18n.otc.submit}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin], // 使用mixin (在main.js注册全局组件)
		components: {},
		data() {
			let _this = this;
			return {
				dataList: [],
				tabIndex: 0,
				sideIndex: 0,
				coinIndex: 0,
				fiatCoins: [],
				currencys: [],
				currencysMap: {},
				paymentsMap: {},
				page:{
					page: 1,
					limit: 10,
					side: 'BUY',
					coin: undefined,
					paycoin: undefined,
					payment: undefined
				},
				list: [],
				showModal: false,
				ad: {},
				form: {
					type: 0,
					side: undefined,
					volume: undefined,
					advertId: undefined
				},
				unit: {
					0: 'CNY',
					1: ''
				},
				showVolume: 0,
				showAmount: 0,
				placeholder: {
					0: '请输入购买金额',
					1: '请输入购买数量'
				},
				sideMap: {
					'BUY': '购买',
					'SELL': '出售'
				}
			}
		},
		filters:{
			sub(v){
				if(v){
					return v.substring(0, 1);
				}
				return '';
			},
			formatIconUrl(v){
				return `../../../static/${v}.png`
			}
		},
		computed: {
			...mapState('common', ['coinMap'])
		},
		onLoad() {
			this.fiatList().then(res =>{
				this.fiatCoins = res.data
				this.page.coin = this.fiatCoins[0]
				this.$refs.paging.reload();
			}).catch(error =>{
			})
		},
		onShow(){
			this.placeholder = {
				0: this.i18n.otc.inputAmount,
				1: this.i18n.otc.inputVol
			},
			this.sideMap = {
				'BUY': this.i18n.otc.buy,
				'SELL': this.i18n.otc.sell
			}
			this.loadConfig()
			this.$fire.$emit('refreshCoin')
		},
		onUnload() {
			
		},
		watch: {
			'form.volume'(v) {
				if(!v){
					return
				}
				console.log(this.coinMap)
				if(this.form.type == 0){
					this.showVolume = (this.form.volume / this.ad.price).toFixed(this.coinMap[this.ad.coin].showPrecision)
					this.showAmount = this.form.volume
				} else {
					
					this.showVolume = parseFloat(this.form.volume).toFixed(this.coinMap[this.ad.coin].showPrecision)
					this.showAmount = parseFloat(this.form.volume) * this.ad.price
				}
			}
		},
		methods: {
			...mapActions('common', ['fiatList', 'currencyList']),
			...mapActions('otc', ['advertList', 'createOrder', 'getPaymentSetting']),
			loadConfig(){
				this.currencyList().then(res => {
					let currencyList = res.data.currency
					let map = {}
					for(let i = 0; i < currencyList.length; i++){
						map[currencyList[i].code] = currencyList[i].symbol
					}
					this.currencysMap = map
					this.currencys = currencyList
				})
				this.getPaymentSetting().then(res => {
					let paymentSettingList = res.data
					let map = {}
					for(let i = 0; i < paymentSettingList.length; i++){
						map[paymentSettingList[i].symbol] = paymentSettingList[i].color
					}
					this.paymentsMap = map
				})
			},
			//顶部tab点击
			sideTabClick(side, index){
				this.sideIndex = index
				this.page.side = side
				this.$refs.paging.reload();
			},
			//顶部tab点击
			coinTabClick(index){
				this.coinIndex = index;
				this.page.coin = this.fiatCoins[index]
				this.$refs.paging.reload();
			},
			filter(){},
			tabChange(index) {
				this.tabIndex = index;
				//当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				//组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//模拟请求服务器获取分页数据，请替换成自己的网络请求
				let $this = this;
				this.page.page = pageNo
				this.page.limit = pageSize
				this.advertList(this.page).then(res =>{
					console.log(this.page, res.rows);
					let list = []
					if(res.total == 0){
						list = [];
					} else {
						list = list.concat(res.rows)
					}
					this.$refs.paging.complete(list);
				}).catch(error =>{
				})
			},
			create(ad){
				
				if(this.isLogin()){
					this.showModal = true
					this.ad = ad
					this.unit[1] = ad.coin
					this.form.volume = undefined
				}
			},
			focus(e){},
			blur(){},
			priceCancel(){
				this.form.volume = undefined
			},
			priceChange(val){
				if(!this.form.volume){
					this.form.volume = val + ''
				} else {
					this.form.volume = this.form.volume + val
				}
			},
			changeType(type){
				this.form.type = type
				this.form.volume = undefined
				this.showAmount = 0
				this.showVolume = 0
			},
			allBuy(){
				if(this.form.type == 0){
					this.form.volume = (this.ad.volume - this.ad.dealVolume) * this.ad.price
				} else {
					this.form.volume = this.ad.volume - this.ad.dealVolume
				}
			},
			cancel(){
				this.showModal = false
				this.form.volume = 0
				this.showVolume = 0
				this.showAmount = 0
			},
			submit(){
				let $this = this
				if(!this.form.volume){
					return;
				}
				this.form.advertId = this.ad.id
				this.form.side = this.ad.side
				this.form.volume = parseFloat(this.form.volume)
				uni.showModal({
				    title: '提示',
				    content: '是否确认下单?',
				    success: function (res) {
				        if (res.confirm) {
				            $this.createOrder($this.form).then(res =>{
				            	$this.showModal = false
				            	//this.$api.msg('下单成功')
				            	uni.navigateTo({
				            		url: '/pages/otc/order/detail?id='+res.data
				            	})
				            	uni.$emit("refresh")
				            }).catch(error =>{
				            	
				            })
				        } else if (res.cancel) {
				        }
				    }
				});
				
			}
		}
	}
</script>

<style lang="scss">
	.header{
		background: #0952C3;
		width: 100%;
	}
	.navbar{
		display: flex;
		position: relative;
		margin: 0 30upx;
		.nav-item{
			height: 100%;
			font-size: 30upx;
			margin-right: 15px;
			display:flex;
			align-items:flex-end;
			color: rgba(255, 255, 255, 0.5);
			&.current{
				color: #ffffff;
				font-size: 40upx;
				font-weight: bold;
			}
		}
	}
	.side{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		background-color: #0952C3;
		padding-bottom: 30upx;
		.order{
			padding-right: 30upx;
		}
	}
	.coinNavbar{
		display: flex;
		height: 40px;
		line-height: 40px;
		background: #ffffff;
		position: relative;
		z-index: 10;
		overflow-x: scroll;
		padding-left: 30upx;
		padding-right: 30upx;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		.nav-item{
			height: 100%;
			font-size: 15px;
			margin-right: 15px;
			position: relative;
			&.current{
				color: #0952C3;
				border-bottom: 6upx solid #0952C3;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 100%;
					height: 0;
				}
			}
		}
	}
	.order-item {
		width: 100%;
		height: 300upx;
		padding: 20upx 20upx;
		background: #fff;
		.user-info{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 80upx;
			line-height: 80upx;
			.name{
				font-weight: bold;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.profile{
				width: 50upx;
				height: 50upx;
				line-height: 50upx;
				border-radius: 50%;
				text-align: center;
				background: #0952C3;
				color: #fff;
				font-weight: 100;
				font-weight: bold;
				margin-right: 10upx;
			}
		}
		.opt{
			margin: 20upx 0;
		}
		.row{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 2upx 0;
			align-items:flex-end;
			.price{
				color: #0952C3;
				font-weight: bold;
				font-size: 32upx;
			}
			.nomarl{
				font-size: 28upx;
				color: #8B9FAA;
			}
			.pay{
				image{
					width: 25px;
					height: 25px;
				}
				.item{
					float: left;
					margin-right: 10rpx;
					font-size: $font-sm;
					display: flex;
					align-items: center;
				}
				.icon{
					display: block;
					height: 24rpx;
					width: 6rpx;
					margin-right: 6rpx;
				}
			}
			.buy{
				background: #0952C3;
			}
			.sell{
				background: #475F78;
			}
			.btn{
				border: 0;
				color: #fff;
				font-size: 26upx;
				height: 60upx;
				line-height: 60upx;
				padding: 0 50upx;
			}
		}
	}
	.modal{
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.box{
		position: fixed;
		bottom: 0;
		background: #fff;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 280px;
		padding: 30upx 30upx;
		font-size: 28upx;
		.coin{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 10upx;
			.name{
				font-size: 30upx;
				padding-bottom: 10upx;
			}
			.price{
				color: #0952C3;
			}
			.icon{
				width: 40px;
				height: 40px;
			}
		}
		.type{
			display: flex;
			flex-direction: row;
			padding: 10upx 0;
			view{
				margin-right: 30upx;
				position: relative;
				padding: 10upx 0;
				&.active{
					color: #0952C3;
					&:after{
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 100%;
						height: 0;
						border-bottom: 2px solid #0952C3;
					}
				}
			}
		}
		.input{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			padding: 14upx 10upx;
			margin: 20upx 0;
			border: 1upx solid #8B9FAA;
			input{
				color: #0952C3;
				font-size: 28upx;
			}
			.cny{
				margin-right: 20upx;
				color: #0952C3;
			}
			.all{
				margin-left: 20upx;
				color: #0952C3;
			}
		}
		.amount{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 10upx 0;
			.p{
				font-size: 30upx;
				color: #0952C3;
			}
		}
		.btns{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			padding: 10upx 0;
			.btn{
				display: block;
				width: 48%;
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				color: #fff;
				border-radius: 0;
				font-size: 28upx;
			}
			.cancel{
				background: #96A7BA;
			}
			.submit{
				background: #0952C3;
			}
		}
	}
</style>
