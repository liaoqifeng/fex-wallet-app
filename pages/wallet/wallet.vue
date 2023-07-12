<template>
	<view class="container">
		<!-- <u-navbar :is-back="false" height="20">
			<view class="slot-wrap">
			</view>
		</u-navbar> -->
		<view class="total-box">
			<view class="title">{{i18n.wallet.total}}(USDT)</view>
			<view class="asset">
				<text class="amount">{{data.totalUsdAmount | fixed(2)}}</text>
				<text class="cny">≈￥{{data.totalCnyAmount | fixed(2)}}</text>
			</view>
			<view class="operat">
				<view class="btn" @click="navTo('/pages/wallet/deposit')">{{i18n.wallet.recharge}}</view>
				<view class="btn" @click="navTo('/pages/wallet/withdraw')">{{i18n.wallet.withdraw}}</view>
				<view class="btn" @click="navTo('/pages/exchange/index')">{{i18n.wallet.exchange}}</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view v-for="(item, i) in data.list" :key="item.symbol" class="block little-line" >
				<view class="s-row">
					<view class="col">
						<image :src="item.icon" class="coinLogo"></image>
						<text class="coin">{{item.symbol}}</text>
					</view>
					<view class="col r light">
						<!--<uni-icons type="forward" size="20" class="gt"></uni-icons>-->
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">{{i18n.wallet.avalible}}</view>
					<view class="col subtitle row-title">{{i18n.wallet.frozen}}</view>
					<view class="col r subtitle row-title">{{i18n.wallet.amount}}(USD)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">{{item.normalBalance | fixed(item.showPrecision)}}</view>
					<view class="col subtitle row-amount">{{item.frozenBalance | fixed(item.showPrecision)}}</view>
					<view class="col r subtitle row-amount">{{item.priceUsd | fixed(2)}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {uniIcons} from '@dcloudio/uni-ui'
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniIcons},
		mixins: [authMixin, commonMixin],
		data() {
			return {
				data: {
					list: [],
					totalUsdAmount: 0,
					totalCnyAmount: 0
				}
			};
		},
		onShow(){
			if(this.loginInfo.hasLogin){
				this.loadData();
			}
			uni.setNavigationBarTitle({
				title: this.i18n.wallet.title
			})
		},
		onPullDownRefresh() {
			this.loadData();
		},
		methods: {
			...mapActions('account', ['accountList']),
			//请求数据
			async loadData(){
				this.accountList().then(res =>{
					this.data = res.data
					uni.stopPullDownRefresh();
				}).catch(error =>{
					
				})
			}
			
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 50rpx 20rpx 120rpx 20rpx;
	}
	.slot-wrap{
		padding: 20upx 20upx 0 20upx;
		font-size: 32upx;
		font-weight: bold;
	}
	.total-box{
		background: url(../../static/images/wallet/wallet-bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: $font-base;
		padding: 60upx 30upx 40upx 30upx;
		color: #8db3fe;
		.title{
			padding-bottom: 10upx;
		}
		.amount{
			font-size: $font-xxl;
			font-weight: 100upx;
			color: #ffffff;
		}
		.cny{
			padding-left: 20upx;
		}
		.operat{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: middle;
			padding-top: 40upx;
			.btn{
				text-align: center;
				flex: 0 0 32%;
				height: 60upx;
				line-height: 60upx;
				color: #ffffff;
				background-color: rgba(255,255,255,0.08);
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
				padding: 10upx 5upx 0upx 5upx;
				.subtitle{
					padding: 4upx 0 10upx 0;
				}
				.col{
					font-size: $font-base;
					color: $font-color-dark;
					flex:1;
					.coin{
						font-weight: bold;
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
