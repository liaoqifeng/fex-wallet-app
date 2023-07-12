<template>
	<view class="container">
		<view class="banner">
			<view class="left">
				<view class="title">{{i18n.simpleearn.dhbt}}: </view>
				<view class="title">{{i18n.simpleearn.ts1}}</view>
				<view class="qustion" @click="navTo('/pages/earn/simple/about')">{{i18n.simpleearn.zbjj}}</view>
			</view>
			<view class="right">
				<image class="icon" src="../../../static/images/earn/icon-earn-banner.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="product-title">{{i18n.simpleearn.qbcp}}</view>
		<view class="product-search">
			<u-search :placeholder="i18n.simpleearn.sscp" :show-action="false" @change="onSearch"></u-search>
			<view class="subsection">
				<u-subsection :list="subsection" :current="current" @change="onTypeChange"></u-subsection>
			</view>
		</view>
		<view class="product-list">
			<view class="title">
				<text>{{i18n.simpleearn.bz}}</text>
				<text>{{i18n.simpleearn.cknh}}</text>
			</view>
			<view class="row" @click="navTo('/pages/earn/simple/detail?coin='+item.coin)" v-for="(item, index) in products" :key="index">
				<view class="left">
					<image class="icon" :src="parseCoinIcoin(item.coin)"></image>
					<text>{{item.coin}}</text>
				</view>
				<view class="right">
					<text v-if="item.minRate == item.maxRate">{{(item.minRate * 100).toFixed(2)}}%</text>
					<text v-else>{{(item.minRate * 100).toFixed(2)}}% ~ {{(item.maxRate * 100).toFixed(2)}}% </text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin, coinMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin, coinMixin],
		data() {
			return {
				subsection: [{name: '全部'}, {name: '活期'},{name: '定期'}],
				current: 0,
				products: [],
				originProducts: []
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.simpleearn.dhbt
			})
			this.subsection = this.i18n.simpleearn.tabs
			this.getProductList()
		},
		onNavigationBarButtonTap() {
			this.navTo('/pages/earn/simple/order')
		},
		onPullDownRefresh() { },
		onLoad() { },
		onHide() { },
		onUnload() { },
		methods: {
			...mapActions('simpleearn', ['productList']),
			getProductList(){
				let form = {}
				if(this.current > 0){
					form.type = this.current - 1
				}
				this.productList(form).then(res => {
					this.products = res.data
					this.originProducts = res.data
				})
			},
			onTypeChange(index){
				this.current = index;
				this.getProductList()
			},
			onSearch(v){
				if(v){
					v = v.toUpperCase()
					this.products = this.originProducts.filter(item => item.coin.indexOf(v) >= 0)
				} else {
					this.products = this.originProducts
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.product-title{
			padding: 30rpx 30rpx;
			font-size: 34rpx;
			font-weight: bold;
		}
		.product-search{
			padding: 0rpx 30rpx;
			.subsection{
				padding: 30rpx 0;
			}
		}
		.product-list{
			padding: 0rpx 30rpx;
			.title{
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
			}
			.row{
				border-radius: 10rpx;
				border: 1rpx solid #e6e6e6;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 20rpx;
				.left{
					display: flex;
					align-items: center;
					font-weight: bold;
					.icon{
						width: 40rpx;
						height: 40rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
	.banner{
		background: #fafafa;
		padding: 40rpx 30rpx;
		display: flex;
		.left{
			flex: 3;
			.title{
				font-size: 38rpx;
				font-weight: bold;
			}
			.qustion{
				border: 1rpx solid #000000;
				border-radius: 50rpx;
				width: 280rpx;
				padding: 10rpx 20rpx;
				text-align: center;
				margin-top: 30rpx;
				font-size: 24rpx;
			}
		}
		.right{
			flex: 1;
			.icon{
				width: 130rpx;
			}
		}
	}
</style>
