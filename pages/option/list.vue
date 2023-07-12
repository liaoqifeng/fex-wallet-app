<template>
	<view class="container">
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="sticky">
				<u-subsection :list="subsectionData" :current="current" @change="sectionChange"></u-subsection>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="coin-section m-t">
			<u-empty :text="i18n.common.noData" :show="empty" mode="data" margin-top="200"></u-empty>
			<view v-for="(item, i) in list" :key="`row${item.id}`" class="block little-line">
				<view class="s-row">
					<view class="col subtitle row-title">{{i18n.option.order.jyd}}</view>
					<view class="col subtitle row-title">{{i18n.option.order.xzfx}}</view>
					<view class="col r subtitle row-title">{{i18n.option.zt}}</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">{{item.symbol}}</view>
					<view class="col subtitle row-amount" :class="{upText: (item.side == 'bull'), downText: (item.side == 'bear')}">{{sideMap[item.side]}}</view>
					<view class="col r subtitle row-amount">{{statusMap[item.status]}}</view>
					
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">{{i18n.option.order.xzsl}}({{item.betCoin}})</view>
					<view class="col subtitle row-title">{{i18n.option.order.xzzq}}</view>
					<view class="col r subtitle row-title">{{i18n.option.order.pl}}</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">{{item.amount}}</view>
					<view class="col subtitle row-amount">{{item.odds * 100 | fixed(2)}}%</view>
					<view class="col r subtitle row-amount">{{item.period}}</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">{{i18n.option.order.kcjg}}({{item.pricingCoin}})</view>
					<view class="col subtitle row-title">{{i18n.option.order.pcjg}}({{item.pricingCoin}})</view>
					<view class="col r subtitle row-title">{{i18n.option.order.sxf}}({{item.betCoin}})</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">{{item.beginPrice}}</view>
					<view class="col subtitle row-amount">{{item.endPrice}}</view>
					<view class="col r subtitle row-amount">{{item.fee}}</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">{{i18n.option.order.sysl}}({{item.betCoin}})</view>
					<view class="col r subtitle row-title">{{i18n.option.order.jgsj}}</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">{{item.profitAmount}}</view>
					<view class="col r subtitle row-amount">{{item.expireTime | moment('HH:mm:ss YYYY/MM/DD')}}</view>
				</view>
			</view>
			<u-loadmore v-if="!empty" :load-text="loadText" :status="loadingStatus" :margin-top="30"/>
			
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				query: {
					page: 1,
					limit: 10,
					status: 0
				},
				empty: false,
				list: [],
				isLastPage: false,
				loadingStatus: 'loadmore',
				statusMap: {
					0: '进行中',
					1: '已平仓',
					2: '异常'
				},
				sideMap: {
					'bull': '买涨',
					'bear': '买跌'
				},
				subsectionData: [
					{name: '交易中'}, 
					{name: '已平仓'}
				],
				current: 0
			};
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.option.order.title
			})
			this.sideMap = this.i18n.option.sideMap
			this.statusMap = this.i18n.option.order.status
			this.subsectionData = [
				{name: this.i18n.option.order.status[0]}, 
				{name: this.i18n.option.order.status[1]}
			]
			
			this.list = []
			this.query.page = 1
			this.loadingStatus = 'loadmore'
			this.loadData();
		},
		onLoad() {
			this.$fire.$emit('refreshCoin')
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
		},
		methods: {
			...mapActions('option', ['optionOrderList']),
			reset(){
				this.query.status = undefined
			},
			sectionChange(index){
				this.query.status = index
				this.search()
			},
			search(){
				this.query.page = 1
				this.list = []
				this.loadingStatus = 'loadmore'
				this.loadData()
			},
			async loadData(){
				this.loadingStatus = 'loading'
				this.optionOrderList(this.query).then(res =>{
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
	$upColor: rgb(37,175,142);
	$downColor: rgb(210,73,99);
	.container{
		padding: 0upx 0upx;
	}
	.upText{
		color: $upColor !important;
	}
	.downText{
		color: $downColor !important;
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
					font-size: 24rpx;
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
