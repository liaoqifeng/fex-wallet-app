<template>
  <view class="container">
	<view class="list">
		<u-empty v-if="empty" :text="i18n.common.noData" mode="list" margin-top="120"></u-empty>
		<view class="item" v-for="(item, index) in records">
			<view class="title">
				<view class="name">{{item.machineName}}</view>
			</view>
			<view class="params">
				<view class="row">
					<view class="col">
						<view class="label">{{i18n.miner.sj}}</view>
						<view class="val">{{item.ctime | moment('YYYY-MM-DD')}}</view>
					</view>
					<view class="col">
						<view class="label">{{i18n.miner.jsy}}</view>
						<view class="val">{{item.amount}} {{item.coin}}</view>
					</view>
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
    components: {
    },
	mixins: [commonMixin, authMixin],
    data () {
      return {
		  current: 0,
		  list: [],
		  total: 0, //总价格
		  empty: false, //空白页现实  true|false
		  records: [],
		  catelogs: [],
		  query: {
		  	page: 1,
		  	limit: 10,
		  	catelog: undefined,
			machineId: undefined
		  },
		  totalCount: 0,
		  loadingStatus: 'more',
		  isLastPage: false
      }
    },
	onLoad(options) {
		uni.setNavigationBarTitle({
			title: this.i18n.miner.producerDetail
		})
		this.reset()
		this.query.machineId = options.id
		this.getMachineFlows()
	},
	onShow() {
	},
	onReachBottom(){
		if(!this.isLastPage){
			this.query.page += 1
			this.getMachineFlows()
		}
	},
	onPullDownRefresh() {
		this.records = []
		this.query.page = 1
		this.getMachineFlows();
	},
    methods: {
		...mapActions('mining', ['machineFlows']),
		reset(){
			this.records = []
			this.query = {
				page: 1,
				limit: 10,
				catelog: undefined,
				machineId: 1
			}
		},
		getMachineFlows(){
			this.machineFlows(this.query).then(res =>{
				console.log(res)
				uni.stopPullDownRefresh();
				this.empty = res.total <= 0
				this.isLastPage = (this.query.page == res.pages)
				if(this.isLastPage){
					this.loadingStatus = 'noMore'
				} else {
					this.loadingStatus = 'more'
				}
				if(this.empty){
					this.records = [];
				} else {
					this.records = this.records.concat(res.rows)
				}
				uni.hideLoading()
			}).catch(error => {
				this.loadingStatus = 'more'
				uni.stopPullDownRefresh();
				uni.hideLoading()
			})
		}
    }
  }
</script>

<style lang="less" scoped>
	page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.container{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
	.list{
		padding: 30upx 30upx;
		.item{
			padding: 20upx 20upx ;
			background-color: #ffffff;
			border-radius: 20upx;
			margin-bottom: 30upx;
		}
		.title{
			display: flex;
			justify-content: space-between;
			.name{
				font-size: 30upx;
				font-weight: bold;
			}
			.search{
				font-size: 24upx;
				padding-top: 8upx;
			}
		}
		.params .row{
			display: flex;
			padding: 20upx 0 0 0;
			.col{
				width: 50%;
			}
			.col .label{
				font-size: 26upx;
			}
			.col .val{
				font-weight: bold;
				padding-top: 10upx;
			}
		}
	}
</style>