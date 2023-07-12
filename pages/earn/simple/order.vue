<template>
	<view class="container">
		<u-empty :text="i18n.common.noData" :show="empty" mode="data" margin-top="200"></u-empty>
		<view class="list-item little-line" v-for="(item, i) in list" :key="i" @click="navTo(`/pages/finance/depositDetail?id=${item.productId}`)">
			<view class="title">
				<view class="tl">
					<view class="period">{{typeMap[item.type]}}</view>
					<text class="name">{{i18n.financial.suscribe}}：{{item.amount}}{{item.coin}}</text>
				</view>
				<view class="tr">
					<u-button v-if="item.type == 0 && item.status == 0" @click="onRedeem(item.id)" type="primary" size="mini">{{i18n.simpleearn.sh}}</u-button>
					<text v-else>{{statusMap[item.status]}}</text>
				</view>
			</view>
			<view class="row">
				<view class="col label">{{i18n.simpleearn.qrfe}}</view>
				<view class="col label">{{i18n.simpleearn.zsy}}</view>
			</view>
			<view class="row">
				<view class="col">{{item.realAmount}} {{item.coin}}</view>
				<view class="col">{{item.profit}} {{item.coin}}</view>
			</view>
			<view class="row">
				<view class="col label">{{i18n.simpleearn.mrsxf}}</view>
				<view class="col label">{{i18n.simpleearn.shsxf}}</view>
			</view>
			<view class="row">
				<view class="col">{{item.buyFee}} {{item.coin}}</view>
				<view class="col">{{item.redeemFee}} {{item.coin}}</view>
			</view>
			<view class="row">
				<view class="col label">{{i18n.simpleearn.sgsj}}</view>
				<view class="col label">{{i18n.simpleearn.jssj}}</view>
			</view>
			<view class="row">
				<view class="col">{{item.ctime | moment('YYYY/MM/DD HH:mm:ss')}}</view>
				<view class="col">
					<view class="time" v-if="item.type == 1">{{i18n.simpleearn.jssj}}: {{item.endTime | moment('YYYY/MM/DD HH:mm:ss')}}</view>
					<view class="time" v-else>--</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="!empty" :load-text="loadText" :status="loadingStatus" :margin-top="30"/>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [ authMixin, commonMixin],
		data() {
			return {
				list: [],
				empty: false,
				totalCount: 0,
				loadingStatus: 'loadmore',
				isLastPage: false,
				query: {
					page: 1,
					limit: 20,
					status: null
				},
				statusMap: {
					0: '进行中',
					1: '已完成',
					2: '已撤消'
				},
				typeMap: {
					0: '活期',
					1: '定期'
				}
			};
		},
		onLoad(){
			this.typeMap = this.i18n.simpleearn.cplx
			this.statusMap = this.i18n.simpleearn.ddzt
			uni.setNavigationBarTitle({
				title: this.i18n.simpleearn.wddd
			})
			this.loadData();
			//uni.startPullDownRefresh();
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.query.page += 1
				this.getOrderList()
			}
		},
		onPullDownRefresh() {
			this.list = []
			this.query.page = 1
			this.loadData();
		},
		methods: {
			...mapActions('simpleearn', ['orderList', 'orderRedeem']),
			//请求数据
			loadData(){
				this.getOrderList()
			},
			onRedeem(id){
				let that = this
				uni.showModal({
				    title: this.i18n.common.tip,
				    content: this.i18n.simpleearn.sfqrsh,
					confirmText: this.i18n.common.ok,
					cancelText: this.i18n.common.cancel,
				    success: function (res) {
						if (res.confirm) {
							that.orderRedeem(id).then(rs => {
								that.$api.msg(that.i18n.simpleearn.shcg)
								
								uni.startPullDownRefresh({})
							})
						}
				    }
				});
			},
			getOrderList(){
				this.loadingStatus = 'loading'
				this.orderList(this.query).then(res =>{
					uni.stopPullDownRefresh();
					this.empty = res.total <= 0
					this.isLastPage = (this.query.page == res.pages)
					if(this.isLastPage){
						this.loadingStatus = 'nomore'
					} else {
						this.loadingStatus = 'loadmore'
					}
					if(this.empty){
						this.list = [];
					} else {
						this.list = this.list.concat(res.rows)
					}
				}).catch(error => {
					this.loadingStatus = 'more'
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		padding: 0;
		margin: 0;
	}
	.container{
		padding: 0;
		margin: 0;
	}
	.list-item{
		padding: 20upx 0;
		background: #ffffff;
		border-radius: 10upx;
		.row{
			display: flex;
			justify-content: space-between;
			padding: 0rpx 20rpx;
			.label{
				padding: 10rpx 0;
				color: $font-color-base;
				font-weight: normal !important;
			}
			.col{
				font-weight: bold;
				font-size: 26rpx;
			}
		}
		.title{
			padding: 0upx 20upx;
			height: 40upx;
			line-height: 40upx;
			display: flex;
			justify-content: space-between;
			.tl{
				display: flex;
				align-items: center;
				align-content: center;
				.name{
					font-size: $font-base;
					font-weight: bold;
				}
				.period{
					height: 40upx;
					line-height: 40upx;
					padding: 0upx 10upx;
					background-color: rgb(234, 242, 252);
					font-size: $font-sm;
					color: $font-color-blue;
					font-weight: normal;
					text-align: center;
				}
			}
			.tr{
				height: 40upx;
				line-height: 40upx;
				display: flex;
				align-items: center;
				font-size: $font-base;
				font-weight: bold;
			}
			
		}
		.info{
			display: flex;
			justify-content: space-between;
			padding: 0upx 20upx 0upx 20upx;
			height: 50upx;
			line-height: 50upx;
			.time{
				font-size: $font-sm;
			}
		}
	}
</style>
