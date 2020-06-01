<template>
	<view class="order-item little-line">
		<view class="row user-info" @click="navTo('/pages/otc/business/business')">
			<view class="name"><view class="profile">{{data.nickname | sub}}</view>{{data.nickname}}</view>
			<view class="nomarl">1091 | 99%</view>
		</view>
		<view class="row">
			<view class="nomarl">数量 {{data.volume - data.dealVolume}} {{data.coin}}</view>
			<view class="nomarl">单价</view>
		</view>
		<view class="row">
			<view class="nomarl">限额￥{{data.minTrade}}-￥{{data.maxTrade}}</view>
			<view class="price">￥{{data.price}}</view>
		</view>
		<view class="row opt">
			<view class="pay">
				<image v-for="(t, index) in JSON.parse(data.payment)" :key="index" :src="t | formatIconUrl"></image>
			</view>
			<view><button class="btn" @click="buy">购买</button></view>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="box">
				<view class="coin">
					<view>
						<view class="name">购买BTC</view>
						<view>单价:<text class="price">￥10000</text></view>
					</view>
					<view><image class="icon" src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67"></image></view>
				</view>
				<view class="type">
					<view class="active">按金额购买</view>
					<view>按数量购买</view>
				</view>
				<view class="input">
					<view><input type="number" placeholder="请输入购买金额"/></view>
					<view><text class="i cny">CNY</text> | <text class="i all">全部买入</text></view>
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
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {uniPopup} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
			}
		},
		props: {
			data: {
				type: Object,
				default: null
			}
		},
		filters:{
			sub(v){
				if(v){
					return v.substring(0, 1);
				}
				return '';
			},
			formatIconUrl(v){
				return `../../static/${v}.png`
			}
		},
		methods: {
			buy(){
				this.$refs.popup.open()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.order-item {
		width: 100%;
		padding: 20upx $page-row-spacing;
		.user-info{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 80upx;
			line-height: 80upx;
			.name{
				font-size: $font-md;
				font-weight: bold;
				display: flex;
				flex-direction: row;
				align-items: center;
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
				font-weight: bold;
				font-size: $font-md;
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
			.btn{
				border: 0;
				background: $uni-color-blue;
				color: #fff;
				font-size: $font-sm;
				height: 60upx;
				line-height: 60upx;
				padding: 0 50upx;
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
