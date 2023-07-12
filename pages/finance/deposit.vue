<template>
	<view class="container">
		<view class="total-box">
			<view class="title">{{i18n.financial.totalProfit}}</view>
			<view class="asset">
				<view><text class="cny">{{profit}}</text>USD</view>
			</view>
			<view class="operat">
				<view class="col" @click="navTo('/pages/finance/historyOrder')">
					<image src="../../static/icon-deposit-history.png" mode="widthFix"></image>
					<text>{{i18n.financial.record}}</text>
				</view>
				<view class="col" @click="navTo('/pages/finance/myOrder')">
					<image src="../../static/icon-deposit-ing.png" mode="widthFix"></image>
					<text>{{i18n.financial.myFinance}}</text>
				</view>
				<view class="col" @click="handleDraw">
					<image src="../../static/icon-deposit-draw.png" mode="widthFix"></image>
					<text>{{i18n.financial.receive}}</text>
					<view class="badge" v-show="drawCount > 0">{{drawCount}}</view>
				</view>
			</view>
		</view>
		<view class="ing-box">
			<view class="title">{{i18n.financial.regular}}</view>
			<view class="no-data" v-if="ingList.length <= 0">
				{{i18n.financial.soon}}
			</view>
			<view class="list-item" v-for="(item, i) in ingList" :key="i" @click="navTo(`/pages/finance/depositDetail?id=${item.id}`)">
				<view class="title little-line">
					<view class="tl">
						<text class="name">{{item.productName}}</text>
						<view class="tags">
							<view class="item">{{item.tags}}</view>
						</view>
					</view>
					<view class="tr">
						<view class="period">{{i18n.financial.the}} {{item.number}} {{i18n.financial.phase}}</view>
					</view>
				</view>
				<view class="info">
					<view class="col">
						<text class="rate t">{{item.profitRate * 100}}%</text>
						<text class="sub">{{i18n.financial.rate}}</text>
					</view>
					<view class="col">
						<text class="period t">{{item.period}} {{i18n.financial.day}}</text>
						<text class="sub">{{i18n.financial.period}}</text>
					</view>
					<view class="col">
						<text class="t">{{statusMap[item.status]}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="history-box">
			<view class="tt">----{{i18n.financial.history}}----</view>
			<view class="no-data" v-if="historyList.length <= 0">
				{{i18n.financial.soon}}
			</view>
			<view class="list-item" v-for="(item, i) in historyList" :ket="i" @click="navTo(`/pages/finance/depositDetail?id=${item.id}`)">
				<view class="title little-line">
					<view class="tl">
						<text class="name">{{item.productName}}</text>
						<view class="tags">
							<view class="item">{{item.tags}}</view>
						</view>
					</view>
					<view class="tr">
						<view class="period">{{i18n.financial.the}} {{item.number}} {{i18n.financial.phase}}</view>
					</view>
				</view>
				<view class="info">
					<view class="col">
						<text class="rate t">{{item.profitRate * 100}}%</text>
						<text class="sub">{{i18n.financial.rate}}</text>
					</view>
					<view class="col">
						<text class="period t">{{item.period}} {{i18n.financial.day}}</text>
						<text class="sub">{{i18n.financial.period}}</text>
					</view>
					<view class="col">
						<text class="t">{{statusMap[item.status]}}</text>
					</view>
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
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin, commonMixin],
		data() {
			return {
				ingList: [],
				historyList: [],
				profit: 0.00,
				statusMap: {
					0: '认购中',
					1: '锁定期',
					2: '已完成',
					3: '暂停'
				},
				data: {
					totalUsdAmount: 0,
					totalCnyAmount: 0,
				},
				drawCount: 0,
			};
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.financial.title
			})
			this.statusMap = {
				0: this.i18n.financial.status.ing,
				1: this.i18n.financial.status.lock,
				2: this.i18n.financial.status.done,
				3: this.i18n.financial.status.stop
			}
			this.loadData();
		},
		onLoad(){
			//this.loadData();
			//uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.loadData();
		},
		methods: {
			...mapActions('finance', ['productList', 'productDraw', 'getProfit', 'getDrawCount']),
			//请求数据
			loadData(){
				this.getProfit().then(res =>{
					this.profit = res.data.toFixed(2)
				}).catch(error =>{
					
				})
				this.productList().then(res =>{
					this.ingList = res.data.ingList
					this.historyList = res.data.historyList
					uni.stopPullDownRefresh();
				}).catch(error =>{
				})
				this.getDrawCount().then(res => {
					if(res.data){
						this.drawCount = res.data
					}
				})
			},
			handleDraw(){
				this.productDraw().then(res =>{
					this.$api.msg(this.i18n.financial.receiveSuccess)
				}).catch(error =>{
					
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		padding: 0;
		margin: 0;
		background: #EEF2F5;
		height: 100%;
	}
	.container{
		padding: 0;
		margin: 0;
		background: #EEF2F5;
		height: 100%;
	}
	.badge {
		background-color: red;
		border-radius: 50upx;
		padding: 0 10upx;
		color: white;
		font-size: 16upx;
		position: absolute;
		top: 0;
		right: 15upx;
	}
	.total-box{
		background: #5E7EEE;
		font-size: $font-base;
		padding: 30upx 30upx 170upx 30upx;
		color: #ffffff;
		text-align: center;
		position: relative;
		.title{
			padding-bottom: 10upx;
		}
		.cny{
			font-size: $font-xl;
			margin-right: 10upx;
		}
		.operat{
			position: absolute;
			left: 30upx;
			right: 30upx;
			margin-top: 40upx;
			height: 170upx;
			background-color: #ffffff;
			border-radius: 10upx;
			display: flex;
			justify-content: space-around;
			align-content: center;
			align-items: center;
			.col{
				position: relative;
				image{
					width: 80upx;
				}
				text{
					display: block;
					color: #000000;
				}
			}
		}
	}
	.ing-box{
		padding: 100upx 30upx 0 30upx;
		.title{
			font-size: $font-lg;
			font-weight: bold;
			padding: 0upx 0upx 30upx 0upx;
		}
	}
	.history-box{
		padding: 30upx 30upx;
		.tt{
			padding: 20upx 0upx;
			text-align: center;
		}
	}
	.no-data{
		background: #ffffff;
		height: 180upx;
		line-height: 180upx;
		text-align: center;
		border: 10upx;
	}
	.list-item{
		margin-top: 20upx;
		height: 260upx;
		background: #ffffff;
		border-radius: 10upx;
		.title{
			padding-left: 20upx;
			height: 100upx;
			line-height: 100upx;
			display: flex;
			justify-content: space-between;
			.tl{
				display: flex;
				.name{
					font-size: $font-md;
					font-weight: bold;
				}
				.tags {
					height: 100upx;
					line-height: 100upx;
					display: flex;
					align-items: center;
					.item{
						font-size: $font-sm;
						font-weight: normal;
						height: 50upx;
						line-height: 50upx;
						padding-left: 10upx;
						padding-right: 10upx;
						background-color: rgb(234, 242, 252);
						margin-left: 20upx;
						color: #3B414E;
					}
				}
			}
			.tr{
				height: 100upx;
				line-height: 100upx;
				display: flex;
				align-items: center;
				.period{
					background-color: rgb(234, 242, 252);
					font-size: $font-base;
					color: $font-color-blue;
					font-weight: normal;
					text-align: center;
					width: 150upx;
					height: 60upx;
					line-height: 60upx;
					border-top-left-radius: 50upx;
					border-bottom-left-radius: 50upx;
				}
			}
			
		}
		.info{
			display: flex;
			justify-content: space-between;
			padding: 40upx 20upx;
			.col{
				display: flex;
				flex-direction: column;
				.t{
					display: block;
					height: 50upx;
					line-height: 50upx;
				}
				.rate{
					font-size: $font-xl;
					color: $font-color-red;
				}
			}
		}
	}
</style>
