<template>
	<view class="container">
		<view class="total-box">
			<view class="title">总资产折合(BTC)</view>
			<view class="asset">
				<text class="amount">0.000090058</text>
				<text class="cny">≈￥40.5</text>
			</view>
			<view class="operat">
				<view class="btn" @click="navTo('/pages/wallet/deposit')">充币</view>
				<view class="btn" @click="navTo('/pages/wallet/withdraw')">提币</view>
				<view class="btn" @click="navTo('/pages/exchange/index')">兑换</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="block little-line" @click="navTo('/pages/wallet/detail')">
				<view class="s-row">
					<view class="col">
						<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
						<text class="coin">BTC</text>
					</view>
					<view class="col r light">
						<uni-icons type="forward" size="20" class="notice"></uni-icons>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">可用</view>
					<view class="col subtitle row-title">冻结</view>
					<view class="col r subtitle row-title">折合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col r subtitle row-amount">100.00</view>
				</view>
			</view>
			
			<view class="block little-line">
				<view class="s-row">
					<view class="col">
						<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
						<text class="coin">BTC</text>
					</view>
					<view class="col r light">
						<uni-icons type="forward" size="20" class="notice"></uni-icons>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">可用</view>
					<view class="col subtitle row-title">冻结</view>
					<view class="col r subtitle row-title">折合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col r subtitle row-amount">100.00</view>
				</view>
			</view>
			
			<view class="block little-line">
				<view class="s-row">
					<view class="col coin">
						<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
						<text class="coin">BTC</text>
					</view>
					<view class="col r light">
						<uni-icons type="forward" size="20" class="gt"></uni-icons>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">可用</view>
					<view class="col subtitle row-title">冻结</view>
					<view class="col r subtitle row-title">折合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col r subtitle row-amount">100.00</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons},
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

<style lang='scss'>
	.container{
		padding: 0upx 0upx;
	}
	.total-box{
		background: #0952C3;
		font-size: $font-base;
		padding: 100upx 30upx 40upx 30upx;
		color: $font-color-light;
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
			padding-top: 20upx;
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
			}
		}
		
		
	}
	
	
</style>
