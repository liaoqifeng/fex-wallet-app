<template>
	<view>
		<view class="transfer-info">
			<view class="w-title little-line">在线{{type==0?'购买':'出售'}}</view>
			<view class="order-list">
				<view v-for="(item, i) in list" :key="item.id">
					<otc-list-item :data.sync="item"></otc-list-item>
				</view>
			</view>
		</view>
		
	</view>
	
</template> 

<script>
	import {uniPopup} from '@dcloudio/uni-ui'
	import otcListItem from './../components/otc-list-item.vue'
	export default {
		components: {uniPopup, otcListItem},
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
			list: {
				type: Array,
				default: null
			}
			
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
