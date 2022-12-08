<template>
	<view class="container">
		<view class="head-wrapper">
			<view class="status" v-if="order.status == 0">
				<view class="s">
					<text class="iconfont s0"></text>
					<text class="v">{{i18n.otc.order.plzPay}}</text>
				</view>
				<view v-if="side == 'BUY'">{{i18n.otc.order.tip1}} <text class="t">{{order.limitTime}} {{i18n.otc.order.tip2}}</text> {{i18n.otc.order.tip3}}</view>
				<view v-if="side == 'SELL'">{{i18n.otc.order.tip4}} {{order.limitTime}}{{i18n.otc.order.tip5}}</view>
			</view>
			<view class="status" v-if="order.status == 1">
				<view class="s">
					<text class="iconfont s0"></text>
					<text class="v">{{i18n.otc.order.payed}}</text>
				</view>
				<view v-if="side == 'BUY'">{{i18n.otc.order.tip6}}</view>
				<view v-if="side == 'SELL'">{{i18n.otc.order.tip7}} {{order.totalPrice | fixed(2)}}</view>
			</view>
			<view class="status" v-if="order.status == 2">
				<view class="s">
					<text class="v">{{i18n.otc.order.done}}</text>
				</view>
				{{i18n.otc.order.tip8}}
			</view>
			<view class="status" v-if="order.status == 3">
				<view class="s">
					<text class="v">{{i18n.otc.order.cancel}}</text>
				</view>
				{{i18n.otc.order.tip9}}
			</view>
			<view class="status" v-if="order.status == 4">
				<view class="s">
					<text class="v">{{i18n.otc.order.appeal}}</text>
				</view>
				{{i18n.otc.order.tip10}}
			</view>
			<view class="concat" v-if="order.status == 0 || order.status == 1">
				<text class="iconfont icon-telephone"></text>
				<view>{{i18n.otc.order.phone}}</view>
			</view>
		</view>
		<view class="amount-wrapper">
			<text class="total">{{i18n.otc.order.orderAmount}}: ￥{{order.totalPrice | fixed(2)}}</text>
			<view class="info">
				<view class="price">
					<view><text class="label">{{i18n.otc.price}}</text><text class="num">￥{{order.price | fixed(2)}}</text></view>
					<view><text class="label">{{i18n.otc.vol}}</text><text class="num">{{order.volume | fixed(2)}} {{order.coin}}</text></view>
				</view>
				<view class="coin">
					<image :src="coinMap[order.coin] ? coinMap[order.coin].icon : ''" class="coinLogo"></image>
					<view>{{order.coin}}</view>
				</view>
			</view>
		</view>
		
		<view class="line"></view>
		<view class="transfer-info">
			<view class="list">
				<view class="item little-line">
					<view class="left">{{i18n.otc.order.orderNo}}</view>
					<view class="right">{{order.number}}</view>
				</view>
				<view class="item">
					<view class="left">{{i18n.otc.order.orderTime}}</view>
					<view class="right">{{order.ctime | moment('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view v-if="side == 'BUY' && order.status != 3" class="secrity-tip little-line">{{i18n.otc.order.tip11}} {{currentPay.name}} {{i18n.otc.order.tip12}}</view>
		<!-- 列表 -->
		<view v-if="order.status != 3" class="transfer-info">
			<view class="list">
				<view class="item little-line">
					<view class="left">{{currentPay.name}}</view>
					<view class="right"><text v-if="side == 'BUY' && order.status == 0" class="change" @click="changePay()">{{i18n.otc.order.tip13}}</text></view>
				</view>
				<view class="item little-line">
					<view class="left">{{i18n.otc.order.username}}</view>
					<view class="right">{{account.username}}</view>
				</view>
				<view class="item little-line">
					<view class="left">{{currentPay.name}} {{i18n.otc.order.account}}</view>
					<view class="right">{{account.accountNo}}</view>
				</view>
				<view class="item little-line" v-if="currentPay.payQrcode != null">
					<view class="left">{{currentPay.name}}{{i18n.otc.order.qrcode}}</view>
					<view class="right"><image class="qrcode" :src="currentPay.payQrcode" /></view>
				</view>
				<view v-show="currentPay.code == 'UnionPay'" class="item little-line">
					<view class="left">{{i18n.otc.order.bank}}</view>
					<view class="right">{{account.bankName}}</view>
				</view>
				<view v-show="currentPay.code == 'UnionPay'" class="item">
					<view class="left">{{i18n.otc.order.branch}}</view>
					<view class="right">{{account.subBranch}}</view>
				</view>
			</view>
		</view>
		<view class="footer" v-if="side == 'BUY' && order.status == 0">
			<view class="safe-tip">
				{{i18n.otc.order.tip14}}
			</view>
			<view class="btns">
				<button @click="cancel" class="cancel">{{i18n.otc.order.cancelOrder}}</button>
				<button @click="pay" class="pay">{{i18n.otc.order.tip15}}</button>
			</view>
		</view>
		<view class="footer" v-if="side == 'BUY' && order.status == 1">
			<view class="btns">
				<!-- <button class="pay appy">申诉</button> -->
			</view>
		</view>
		<view class="footer" v-if="side == 'SELL' && order.status == 1">
			<view class="btns">
				<!-- <button class="pay appy">申诉</button> -->
				<button @click="complete" class="pay">{{i18n.otc.order.tip16}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	import {uniIcons,uniList,uniListItem} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons,uniList,uniListItem},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				id: undefined,
				order: {
					totalPrice: 0,
					number: '',
					coin:  ''
				},
				nickname: undefined,
				side: undefined,
				merchantPays: undefined,
				payment: undefined,
				payCodes: [],
				payLabels: [],
				currentPay: {
					code: undefined,
					name: undefined
				},
				account: {}
			};
		},
		onShow() {
			this.$fire.$emit('refreshCoin')
		},
		onLoad(options){
			this.currencyList().then(res => {
				this.payment = res.data.payment
				this.id = options.id
				this.loadData();
			})
			
		},
		computed: {
			...mapState('common', ['coinMap'])
		},
		methods: {
			...mapActions('common', ['currencyList']),
			...mapActions('otc', ['getOrder', 'cancelOrder', 'payOrder', 'completeOrder']),
			cancel(){
				let $this = this;
				uni.showModal({
				    title: $this.i18n.common.tip,
				    content: $this.i18n.otc.order.confirmCannel,
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({})
							$this.cancelOrder($this.id).then(res =>{
								$this.loadData()
								uni.hideLoading()
								$this.$api.msg($this.i18n.otc.order.cannelSuccess, 1000, false, 'none', function() {})
							}).catch(error =>{
								uni.hideLoading()
							})
				        }
				    }
				});
				
			},
			pay(){
				let $this = this;
				uni.showModal({
				    title: $this.i18n.common.tip,
				    content: $this.i18n.otc.order.confirmPay,
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({})
							$this.payOrder({id: $this.id, payment: $this.currentPay.code}).then(res =>{
								$this.loadData()
								uni.hideLoading()
								$this.$api.msg($this.i18n.otc.order.paySuccess, 1000, false, 'none', function() {})
							}).catch(error =>{
								uni.hideLoading()
							})
				        }
				    }
				});
			},
			complete(){
				let $this = this;
				uni.showModal({
				    title: $this.i18n.common.tip,
				    content: $this.i18n.otc.order.confirmComplete,
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({})
							$this.completeOrder($this.id).then(res =>{
								$this.loadData()
								uni.hideLoading()
								$this.$api.msg($this.i18n.otc.order.doneSuccess, 1000, false, 'none', function() {})
							}).catch(error =>{
								uni.hideLoading()
							})
				        }
				    }
				});
			},
			changePay(){
				let $this = this
				uni.showActionSheet({
					itemList: this.payLabels,
					success: function (res) {
						$this.currentPay = {
							code: $this.payCodes[res.tapIndex],
							name: $this.payLabels[res.tapIndex]
						}
						$this.account = JSON.parse($this.merchantPays[$this.currentPay.code].account)
					}
				})
			},
			async loadData(){
				this.getOrder(this.id).then(res =>{
					this.order = res.data.order
					this.nickname = res.data.nickname
					this.side = res.data.side
					this.merchantPays = res.data.payments
					for(let key in this.merchantPays){
						for(let i = 0; i < this.payment.length; i++){
							if(key === this.payment[i].code){
								this.payCodes.push(key)
								this.payLabels.push(this.payment[i].name)
							}
						}
					}
					this.currentPay = {
						code: this.payCodes[0],
						name: this.payLabels[0]
					}
					this.account = JSON.parse(this.merchantPays[this.currentPay.code])
				}).catch(error =>{
					
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	@font-face {
	  font-family: 'iconfont';
	  src: url('../../../static/font/otc-detail.ttf') format('truetype');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 70upx;
	  color: #ffffff;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.s0:before {
	  content: "\e6db";
	}
	.s1:before {
	  content: "\e69b";
	}
	.s2:before {
	  content: "\e6e6";
	}
	.s3:before {
	  content: "\e698";
	}
	.s4:before {
	  content: "\e69e";
	}
	
	.icon-telephone:before {
	  content: "\e6a2";
	}
	.icon-message:before {
	  content: "\e6df";
	}
	.container{
		padding: 0upx 0upx 240upx 0upx;
	}
	.head-wrapper{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #0952C3;
		font-size: $font-base;
		padding: 160upx 30upx 40upx 30upx;
		color: $font-color-light;
		.status{
			font-size: $font-sm;
			.s{
				display: flex;
				flex-direction: row;
				align-items: center;
				.v{
					font-size: $font-xl;
					color: #ffffff;
				}
			}
			.t{
				color: #ffffff;
			}
		}
		.concat{
			font-size: $font-sm;
		}
		
	}
	.secrity-tip{
		padding: 20upx 30upx;
		font-size: $font-sm;
	}
	.amount-wrapper{
		padding: 30upx 30upx 30upx 30upx;
		.total{
			display: block;
			color: $font-color-blue;
			padding: 20upx 0 20upx 0;
			font-weight: bold;
			font-size: $font-lg;
		}
		.info{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.price{
				font-size: $font-base;
				view{
					padding-top: 10upx;
					padding-bottom: 10upx;
				}
				.label{
					color: $font-color-light;
					padding-right: 30upx;
				}
			}
			.coin{
				font-size: $font-base;
				text-align: center;
				image{
					width: 56upx;
					height: 56upx;
				}
			}
		}
	}
	.transfer-info{
		padding: 0upx 30upx;
		.change{
			color: $font-color-blue;
		}
	}
	.list{
		.item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 30upx 0 30upx 0;
			.left{
				font-size: $font-base;
			}
			.right{
				font-size: $font-base;
			}
			.qrcode{
				width: 160upx;
				height: 160upx;
			}
		}
	}
	.footer{
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		.safe-tip{
			font-size: $font-sm;
			color: $font-color-blue;
			background: $uni-color-tip;
			padding: 20upx 30upx;
		}
		.btns{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20upx 30upx;
			.cancel{
				width: 35%;
				font-size: $font-base;
			}
			.appy{
				background: $uni-color-warning !important;
				width: 35% !important;
			}
			.pay{
				width: 55%;
				border: 0px;
				border-radius: 0;
				background-color: $uni-color-blue;
				color: #ffffff;
				font-size: $font-base;
			}
		}
	}	
	
	
</style>
