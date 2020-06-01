<template>
	<view>
		<view class="transfer-info">
			<view class="w-title little-line">在线{{type==0?'购买':'出售'}}</view>
			<view class="order-list">
				<view class="order-item little-line">
					<view class="row user-info">
						<view class="name"><view class="profile">111</view>ETH</view>
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
							<!-- <button class="btn buy" @click="buy">开启</button> -->
							<button class="btn sell" @click="buy">暂停</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
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
	
</style>
