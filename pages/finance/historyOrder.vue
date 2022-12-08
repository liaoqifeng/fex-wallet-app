<template>
	<view class="container">
		<u-empty :text="i18n.common.noData" :show="empty" mode="data" margin-top="200"></u-empty>
		<view class="list-item little-line" v-for="(item, i) in list" :key="i" @click="navTo(`/pages/finance/depositDetail?id=${item.productId}`)">
			<view class="title">
				<view class="tl">
					<view class="period">{{i18n.financial.the}} {{item.productNum}} {{i18n.financial.phase}}</view>
					<text class="name">{{item.productName}}</text>
				</view>
				<view class="tr">{{i18n.financial.suscribe}}：{{item.amount}} {{item.coin}}</view>
			</view>
			<view class="info">
				<view class="time">{{item.ctime | moment('YYYY-MM-DD HH:mm:ss')}}</view>
				<text class="status">{{i18n.financial.profit}}：{{item.profit}} {{item.coin}}</text>
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
					status: 2
				},
				statusMap: {
					0: '锁定中',
					1: '待领取',
					2: '已完成'
				}
			};
		},
		onLoad(){
			uni.setNavigationBarTitle({
				title: this.i18n.financial.record
			})
			this.statusMap = {
				0: this.i18n.financial.orderStatus.locking,
				1: this.i18n.financial.orderStatus.wait,
				2: this.i18n.financial.orderStatus.done
			}
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
			...mapActions('finance', ['orderList']),
			//请求数据
			loadData(){
				this.getOrderList()
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
