<template>
	<view class="content">
		<view style="padding: 200upx 0;" v-if="records.length <= 0">
			<u-empty :text="i18n.common.noData" mode="list"></u-empty>
		</view>
		<view class="row" v-for="(item, i) in records">
			<view class="title">{{i18n.prediction.betRecord}}</view>
			<view class="table">
				<view class="item">
					<text>RoundID:</text>
					<text>#{{item.round.id}}</text>
				</view>
				<view class="item">
					<text>{{i18n.prediction.betSide}}:</text>
					<text>{{i18n.prediction.guess}} {{positionMap[item.position]}}</text>
				</view>
				<view class="item">
					<text>{{i18n.prediction.betVol}}:</text>
					<text>{{item.amount}}</text>
				</view>
				<view class="item">
					<text>{{i18n.prediction.reward}}:</text>
					<text>{{item.rewardAmount}}</text>
				</view>
			</view>
			<view class="title">{{i18n.prediction.roundRecord}}</view>
			<view class="table">
				<view class="item">
					<text>{{i18n.prediction.rewardPool}}:</text>
					<text>{{item.round.bullAmount + item.round.bearAmount}}</text>
				</view>
				<view class="item">
					<text>{{i18n.prediction.bull}}:</text>
					<text>{{item.round | setPayout('bull')}}x | {{item.round.bullAmount}}</text>
				</view>
				<view class="item">
					<text>{{i18n.prediction.bear}}:</text>
					<text>{{item.round | setPayout('bear')}}x | {{item.round.bearAmount}}</text>
				</view>
				<view class="item">
					<text>{{i18n.prediction.lockPrice}}:</text>
					<text>{{item.round.lockPrice}}</text>
				</view>
				<view class="item">
					<text>{{i18n.prediction.overPrice}}:</text>
					<text>{{item.round.closePrice}}</text>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
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
				pageForm: {
					page: 1,
					limit: 10
				},
				positionMap: {
					'bull': '涨',
					'bear': '跌'
				},
				records: [],
				isLastPage: false,
				status: 'loadmore',
			}
		},
		filters: {
			setPayout(item, position){
				let total = item.bullAmount + item.bearAmount
				if(position == 'bull'){
					return item.bullAmount == 0 ? 0.00 : (total / item.bullAmount).toFixed(2)
				} else {
					return item.bearAmount == 0 ? 0.00 : (total / item.bearAmount).toFixed(2)
				}
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.prediction.recordTitle
			})
			this.positionMap = {
				'bull': this.i18n.prediction.up,
				'bear': this.i18n.prediction.down
			}
			this.getHistory()
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.pageForm.page += 1
				this.getHistory()
			}
		},
		onPullDownRefresh() {
			this.records = []
			this.pageForm.page = 1
			this.getHistory();
		},
		methods: {
			...mapActions('prediction', ['predictionHistory']),
			getHistory(){
				this.status = 'loading'
				this.predictionHistory(this.pageForm).then(res =>{
					this.records = this.records.concat(res.data.records)
					this.isLastPage = (this.pageForm.page == res.data.pages)
					if(this.isLastPage){
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.content{
		width: 100%;
		height: 100%;
		padding: 0upx 20upx;
	}
	.row{
		padding: 20upx 30upx;
		border: 1upx solid #EEF2F5;
		border-radius: 20upx;
		margin-bottom: 20upx;
		.title{
			font-weight: bold;
			font-size: 30upx;
			border-bottom: 1upx solid #EEF2F5;
			padding: 10upx 0;
		}
		.table .item{
			display: flex;
			justify-content: space-between;
			padding: 10upx 0;
		}
	}
</style>
