<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<u-empty :text="i18n.common.noData" :show="empty" mode="data" margin-top="200"></u-empty>
			<view v-for="(item, i) in list" :key="`row${item.id}`" class="block little-line" @click="navTo(`/pages/otc/order/detail?id=${item.id}`, true)">
				<view class="s-row">
					<view class="col">
						<text class="coin" :class="item.side | formatSideClass(item)">{{item.side | formatSide(item, i18n.otc.buy, i18n.otc.sell)}}</text>
						<text class="coin">{{item.coin}}</text>
					</view>
					<view class="col r light">
						<text class="status">{{statusMap[item.status]}}</text>
						<uni-icons type="forward" size="20" class="gt"></uni-icons>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">{{i18n.otc.order.time}}</view>
					<view class="col subtitle row-title">{{i18n.otc.vol}}(USDT)</view>
					<view class="col r subtitle row-title">{{i18n.otc.order.totalAmount}}(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">{{item.ctime | moment('HH:mm MM/DD')}}</view>
					<view class="col subtitle row-amount">{{item.volume}}</view>
					<view class="col r subtitle row-amount">{{item.totalPrice}}</view>
				</view>
			</view>
			<u-loadmore v-if="!empty" :load-text="loadText" :status="loadingStatus" :margin-top="30"/>
			
		</view>
		
		<uni-popup ref="popup" type="top">
			<view class="filter-wrapper">
				<view class="filter">
					<view class="filter-title">{{i18n.otc.order.tradeType}}</view>
					<view class="filter-pay">
						<text @click="filter('BUY', undefined)" class="filter-pay-item" :class="{'filter-active': query.side == 'BUY'}">{{i18n.otc.buy}}</text>
						<text @click="filter('SELL', undefined)" class="filter-pay-item" :class="{'filter-active': query.side == 'SELL'}">{{i18n.otc.sell}}</text>
						<text class="placeholder"></text>
					</view>
					<view class="filter-title">{{i18n.otc.order.statusLabel}}</view>
					<view class="filter-pay">
						<text class="filter-pay-item" v-for="(v, k) in statusMap" :key="k" @click="filter(undefined, k)" :class="{'filter-active': query.status == k}" >{{v}}</text>
					</view>
				</view>
				
				<view class="btn-wrapper">
					<view class="btn" @click="reset">{{i18n.common.reset}}</view>
					<view class="btn submit" @click="search">{{i18n.common.filter}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {uniPopup, uniIcons} from '@dcloudio/uni-ui'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniPopup, uniIcons},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				query: {
					page: 1,
					limit: 10,
					side: undefined,
					status: undefined,
					isMerchant: true
				},
				empty: false,
				list: [],
				isLastPage: false,
				loadingStatus: 'loadmore',
				statusMap: {
					0: '待支付',
					1: '已支付',
					2: '交易成功',
					3: '取消',
					4: '申诉',
					5: '申诉完成',
					6: '异常订单'
				}
			};
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.otc.order.orderList
			})
			this.statusMap = {
				0: this.i18n.otc.order.status.pedding,
				1: this.i18n.otc.order.status.payed,
				2: this.i18n.otc.order.status.success,
				3: this.i18n.otc.order.status.cancel,
				4: this.i18n.otc.order.status.appeal,
				5: this.i18n.otc.order.status.appealDone,
				6: this.i18n.otc.order.status.except
			}
			this.list = []
			this.query.page = 1
			this.loadingStatus = 'loadmore'
			this.loadData();
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.query.page += 1
				this.loadData()
			}
		},
		onPullDownRefresh() {
			this.list = []
			this.query.page = 1
			this.loadingStatus = 'loadmore'
			this.loadData();
		},
		filters: {
			formatSideClass(v, item){
				if(item.creator == item.buyerId){
					return 'buy'
				} else {
					return 'sell'
				}
			},
			formatSide(v, item, buy, sell){
				if(item.creator == item.buyerId){
					return buy
				} else {
					return sell
				}
			}
		},
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
		},
		methods: {
			...mapActions('otc', ['orderList']),
			filter(side, status){
				if(side){
					this.query.side = side
				}
				if(status){
					this.query.status = status
				}
			},
			reset(){
				this.query.status = undefined
				this.query.side = undefined
			},
			search(){
				this.query.page = 1
				this.list = []
				this.loadingStatus = 'loadmore'
				this.loadData()
				this.$refs.popup.close();
			},
			async loadData(){
				this.loadingStatus = 'loading'
				this.orderList(this.query).then(res =>{
					uni.stopPullDownRefresh();
					this.empty = (res.total == 0)
					this.isLastPage = (this.query.page == res.pages)
					if(this.isLastPage){
						this.loadingStatus = 'nomore'
					} else {
						this.loadingStatus = 'loadmore'
					}
					if(this.empty){
						this.list = [];
					} else {
						this.list = this.list.concat(res.rows)
					}
				}).catch(error => {
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 0upx 0upx;
	}
	.filter-wrapper{
		background-color: #ffffff;
	}
	.btn-wrapper{
		display: flex;
		flex-direction: row;
		padding-top: 30upx;
		.btn{
			width: 50%;
			height: 90upx;
			line-height: 90upx;
			text-align: center;
			border-radius: 0upx;
			border: 0upx;
			background: #F8F8F8;
			font-size: $font-lg;
		}
		.submit{
			color: #ffffff;
			background-color: $uni-color-blue;
		}
	}
	.filter{
		display: flex;
		flex-direction: column;
		padding: 40upx 30upx 30upx 30upx;
		width: 100%;
		.filter-title{
			font-size: $font-md;
			padding-bottom: 20upx;
			padding-top: 30upx;
		}
		.filter-active{
			border-width: 2rpx;
			border-color: $font-color-blue;  
			border-style: solid;
			color: $font-color-blue;
		}
		.filter-pay{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			width: 100%;
			.filter-pay-item{
				display: block;
				width: 30%;
				background-color: $border-color-base;
				height: 70upx;
				line-height: 70upx;
				font-size: $font-sm;
				text-align: center;
				margin-top: 10upx;
				margin-bottom: 10upx;
				
			}
			.placeholder{
				width: 30%;
				height: 0;
			}
		}
	}
	.coin-section{
		background: #fff;
		.block{
			padding: 20upx 0;
			.s-row{
				display:flex;
				align-items:center;
				padding: 10upx 30upx 0upx 30upx;
				.subtitle{
					padding: 4upx 0 10upx 0;
				}
				.col{
					font-size: $font-base;
					color: $font-color-dark;
					flex:1;
					.coin{
						font-weight: bold;
						padding-right: 10upx;
					}
					.buy{
						color: $font-color-blue;
					}
					.sell{
						color: $font-color-red;
					}
					.status{
						font-size: $font-base;
						font-weight: 10;
					}
				}
				.coinLogo {
				    width: 36upx;
					height: 36upx;
				    margin-right: 8px;
				    display: inline-block;
				    vertical-align: middle;
				    float: left;
				}
				.light{
					font-weight: bold;
					font-size: $font-lg;
					color: $font-color-dark;
				}
				.r{
					text-align: right;
				}
				.row-title{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-light;
				}
				.row-amount{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-dark;
				}
				.gt{
					font-weight: 10;
				}
			}
		}
		
		
	}
	
	
</style>
