<template>
	<view class="container">
		<view class="head-wrapper">
			<view class="status">
				<view class="s">
					<text class="iconfont s0"></text>
					<text class="v">请付款</text>
				</view>
				请在<text class="t">14:00</text>内付款给卖家
			</view>
			<view class="concat">
				<text class="iconfont icon-telephone"></text>
				<view>电话</view>
			</view>
		</view>
		<view class="amount-wrapper">
			<text class="total">￥100,1000</text>
			<view class="info">
				<view class="price">
					<view><text class="label">单价</text><text class="num">￥1.00</text></view>
					<view><text class="label">数量</text><text class="num">100000 HT</text></view>
				</view>
				<view class="coin">
					<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
					<view>HT</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="secrity-tip little-line">请使用本人(***)银行卡向以下帐号自行转账</view>
		<!-- 列表 -->
		<view class="transfer-info">
			<view class="list">
				<view class="item little-line">
					<view class="left">银行卡</view>
					<view class="right"><text class="change" @click="changePay()">切换支付方式</text></view>
				</view>
				<view class="item little-line">
					<view class="left">收款人</view>
					<view class="right">隔壁老王</view>
				</view>
				<view class="item little-line">
					<view class="left">银行卡号</view>
					<view class="right">123245345635642342</view>
				</view>
				<view class="item little-line">
					<view class="left">开户银行</view>
					<view class="right">招商银行</view>
				</view>
				<view class="item">
					<view class="left">开户支行</view>
					<view class="right">深圳支行</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="transfer-info">
			<view class="list">
				<view class="item little-line">
					<view class="left">卖家昵称</view>
					<view class="right">隔壁老王</view>
				</view>
				<view class="item little-line">
					<view class="left">卖家实名</view>
					<view class="right">隔壁老王</view>
				</view>
				<view class="item little-line">
					<view class="left">订单号</view>
					<view class="right">029942459830485</view>
				</view>
				<view class="item little-line">
					<view class="left">付款参考号</view>
					<view class="right">098765</view>
				</view>
				<view class="item">
					<view class="left">下单时间</view>
					<view class="right">2020-03-15 12:00:00</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="safe-tip">
				在转账过程中请勿备注BTC、USDT、交易所等信息,防止汇款被拦截、银行卡被冻结等问题
			</view>
			<view class="btns">
				<button class="cancel">取消订单</button>
				<button class="pay">我已付款成功</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniIcons,uniList,uniListItem} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons,uniList,uniListItem},
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
			change(){
				uni.showActionSheet({
					title:'支付方式',
				    itemList: ['银行卡', '微信', '支付宝'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
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
			padding: 30upx 0 30upx 0;
			.left{
				font-size: $font-base;
			}
			.right{
				font-size: $font-base;
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
