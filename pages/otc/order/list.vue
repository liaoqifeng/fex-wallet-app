<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="block little-line" @click="navTo('/pages/otc/order/detail')">
				<view class="s-row">
					<view class="col">
						<text class="buy coin">购买</text>
						<text class="coin">BTC</text>
					</view>
					<view class="col r light">
						<text class="status">已完成</text>
						<uni-icons type="forward" size="20" class="gt"></uni-icons>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">时间</view>
					<view class="col subtitle row-title">数量(USDT)</view>
					<view class="col r subtitle row-title">交易总合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">08:27 03/20</view>
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col r subtitle row-amount">100.00</view>
				</view>
			</view>
			
			<view class="block little-line" @click="navTo('/pages/wallet/detail')">
				<view class="s-row">
					<view class="col">
						<text class="sell coin">出售</text>
						<text class="coin">BTC</text>
					</view>
					<view class="col r light">
						<text class="status">已完成</text>
						<uni-icons type="forward" size="20" class="gt"></uni-icons>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">时间</view>
					<view class="col subtitle row-title">数量(USDT)</view>
					<view class="col r subtitle row-title">交易总合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">08:27 03/20</view>
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col r subtitle row-amount">100.00</view>
				</view>
			</view>
			
		</view>
		
		<uni-popup ref="popup" type="top">
			<view class="filter-wrapper">
				<view class="filter">
					<view class="filter-title">交易类型</view>
					<view class="filter-pay">
						<text class="filter-pay-item filter-active">购买</text>
						<text class="filter-pay-item">出售</text>
						<text class="placeholder"></text>
					</view>
					<view class="filter-title">订单状态</view>
					<view class="filter-pay">
						<text class="filter-pay-item filter-active">未付款</text>
						<text class="filter-pay-item">已付款</text>
						<text class="filter-pay-item">已完成</text>
						<text class="filter-pay-item">已取消</text>
						<text class="filter-pay-item">申诉中</text>
						<text class="filter-pay-item">申诉完成</text>
					</view>
				</view>
				
				<view class="btn-wrapper">
					<view class="btn">重置</view>
					<view class="btn submit">筛选</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniPopup, uniIcons} from '@dcloudio/uni-ui'
	export default {
		components: {uniPopup, uniIcons},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
			};
		},
		onLoad(){
			this.loadData();
		},
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData(){
				let list = await this.$api.json('cartList'); 
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				});
			},
			navTo(url){
				uni.navigateTo({
					url: url
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
