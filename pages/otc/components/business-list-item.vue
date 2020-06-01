<template>
	<view>
		<view class="transfer-info">
			<view class="w-title little-line">在线{{type==0?'购买':'出售'}}</view>
			<view class="order-list">
				<view class="order-item little-line">
					<view class="row user-info">
						<view class="name"><view class="profile">111</view>1币币</view>
					</view>
					<view class="row">
						<view class="nomarl">数量 0.0111 BTC</view>
						<view class="nomarl">单价</view>
					</view>
					<view class="row">
						<view class="nomarl">限额￥10,000-￥55,877</view>
						<view class="price">￥61,889344</view>
					</view>
					<view class="row opt">
						<view class="pay">
							<image src="../../../static/pay-alipay.png"></image>
							<image src="../../../static/pay-wechat.png"></image>
						</view>
						<view>
							<button class="btn buy" @click="buy" v-if="type==0">购买</button>
							<button class="btn sell" @click="buy" v-if="type==1">出售</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="box">
				<view class="coin">
					<view>
						<view class="name">{{type==0?'购买':'出售'}}BTC</view>
						<view>单价:<text class="price">￥10000</text></view>
					</view>
					<view><image class="icon" src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67"></image></view>
				</view>
				<view class="type">
					<view class="active">按金额{{type==0?'购买':'出售'}}</view>
					<view>按数量{{type==0?'购买':'出售'}}</view>
				</view>
				<view class="input">
					<view><input type="number" placeholder="请输入金额"/></view>
					<view><text class="i cny">CNY</text> | <text class="i all">全部{{type==0?'买入':'售出'}}</text></view>
				</view>
				<view class="limit">限额：￥1000-￥10000</view>
				<view class="num">交易数量：0.123 BTC</view>
				<view class="amount">
					<view class="t-p">实付款</view>
					<view class="p">￥0.00</view>
				</view>
				<view class="btns">
					<view class="btn cancel">取消</view>
					<view class="btn submit">下单</view>
				</view>
			</view>
		</uni-popup>
	</view>
	
</template> 

<script>
	import {uniPopup} from '@dcloudio/uni-ui'
	export default {
		components: {uniPopup},
		data() {
			return {
				
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: 0
			},
		},
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.loadData()
			
		},
		 
		methods: {
			loadData(source){
				
			},
			
			buy(){
				this.$refs.popup.open()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.transfer-info{
		.w-title{
			font-size: $font-md;
			font-weight: bold;
			padding: 20upx 30upx 20upx 30upx;
		}
		.order-list {
			padding-bottom: 50upx;
			.order-item {
				width: 100%;
				padding: 20upx 30upx;
				display: block;
				.user-info{
					margin: 40upx 0 20upx 0;
					height: 50upx;
					line-height: 50upx;
					.name{
						font-size: $font-md;
						font-weight: bold;
						display: flex;
						flex-direction: row;
					}
					.profile{
						width: 50upx;
						height: 50upx;
						line-height: 50upx;
						border-radius: 50%;
						text-align: center;
						background: $uni-color-blue;
						color: #fff;
						font-weight: 100;
						font-size: $font-sm;
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
						color: $font-color-blue;
					}
					.nomarl{
						font-size: $font-sm;
						color: $font-color-light;
					}
					.pay{
						image{
							width: 25px;
							height: 25px;
						}
					}
					.buy{
						background: $uni-color-blue;
					}
					.sell{
						background: #475F78;
					}
					.btn{
						border: 0;
						color: #fff;
						font-size: $font-sm;
						height: 60upx;
						line-height: 60upx;
						padding: 0 50upx;
					}
				}
			}
		}
	}
	.box{
		background: #fff;
		display: flex;
		flex-direction: column;
		padding: 30upx 30upx;
		font-size: $font-base;
		color: $font-color-light;
		.coin{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 10upx;
			.name{
				font-size: $font-lg;
				color: $font-color-base;
				padding-bottom: 10upx;
			}
			.price{
				color: $font-color-blue;
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
					color: $uni-color-blue;
					&:after{
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 100%;
						height: 0;
						border-bottom: 2px solid $uni-color-blue;
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
				color: $font-color-light;
				font-size: $font-base;
			}
			.cny{
				margin-right: 20upx;
				color: $font-color-base;
			}
			.all{
				margin-left: 20upx;
				color: $font-color-blue;
			}
		}
		.amount{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 10upx 0;
			.p{
				font-size: $font-lg;
				color: $font-color-blue;
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
				font-size: $font-base;
			}
			.cancel{
				background: #96A7BA;
			}
			.submit{
				background: $uni-color-blue;
			}
		}
	}
	
</style>
