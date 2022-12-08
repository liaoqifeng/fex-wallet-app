<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="block">
				<view class="s-row">
					<view class="col">
						<image :src="account.icon" class="coinLogo"></image>
						<text class="coin">{{account.symbol}}</text>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">可用</view>
					<view class="col subtitle row-title">冻结</view>
					<view class="col r subtitle row-title">折合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">{{account.normalBalance | fixed(account.showPrecision)}}</view>
					<view class="col subtitle row-amount">{{account.frozenBalance | fixed(account.showPrecision)}}</view>
					<view class="col r subtitle row-amount">{{account.priceCny | fixed(2)}}</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="list">
			<!-- <empty></empty> -->
			<view class="coin-section">
				<view class="block">
					<view class="s-row">
						<view class="col">
							<text class="coin">{{filters[filterIndex]}}</text>
						</view>
					</view>
					<view class="s-row s-title">
						<view class="col subtitle row-title">数量</view>
						<view class="col subtitle row-title">状态</view>
						<view class="col r subtitle row-title">时间</view>
					</view>
					<scroll-view class="s-list" :enableBackToTop="enableBackToTop" :scroll-y="scrollY" @scrolltolower="loadMore">
						<u-empty text="暂无记录" :show="empty" mode="data" margin-top="10"></u-empty>
						<view class="s-row little-line" v-for="(item, i) in records" :key="item.id">
							<view class="col subtitle row-amount">{{item.amount | fixed(account.showPrecision)}}</view>
							<view class="col subtitle row-amount">{{currentStatusMap[item.status]}}</view>
							<view class="col r subtitle row-amount">{{item.ctime | moment('HH:mm MM/DD')}}</view>
						</view>
						<u-loadmore v-if="!empty" :load-text="loadText" :status="loadingStatus" :margin-top="30" :margin-bottom="20"/>
					</scroll-view>
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
	import {uniIcons} from '@dcloudio/uni-ui'
	import empty from '../../components/empty.vue'
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniIcons, empty},
		mixins: [authMixin, commonMixin],
		data() {
			return {
				coin: undefined,
				account: {},
				total: 0, //总价格
				empty: false, //空白页现实  true|false
				query: {
					page: 1,
					limit: 10,
					symbol: undefined
				},
				records: [],
				loadingStatus: 'loadmore',
				isLastPage: false,
				scrollY: true,
				enableBackToTop: true,
				filters: ['提币', '充币'],
				filterIndex: 0,
				currentStatusMap: {},
				withdrawStatusMap: {
					0: '未审核',
					1: '审核通过',
					2: '转账中',
					3: '转账失败',
					4: '已完成',
					5: '审核拒绝', 
					6: '已撤销'
				},
				depositStatusMap: {
					0: '未确认',
					1: '已完成',
					2: '异常'
				}
			};
		},
		onShow(){
			this.coin = 'ETH'
			this.query.symbol = 'ETH'
			this.loadData()
			this.initStatuMap()
			this.records = []
			this.loadRecords()
		},
		onHide() {
			
		},
		onNavigationBarButtonTap(e) {
			uni.showActionSheet({
				title:'全部',
			    itemList: filters,
			    success: function (res) {
					this.filterIndex = res.tapIndex
					this.loadingStatus = 'loadmore'
					this.isLastPage =false
			        this.initStatuMap()
			        this.records = []
			        this.loadRecords()
			    },
			    fail: function (res) {
			        
			    }
			});
		},
		watch:{
		},
		methods: {
			...mapActions('account', ['getAccount']),
			...mapActions('user', ['withdrawList', 'depositList']),
			//请求数据
			async loadData(){
				this.getAccount(this.coin).then(res =>{
					this.account = res.data
				}).catch(error =>{
					
				})
			},
			initStatuMap(){
				if(this.filterIndex == 0){
					this.currentStatusMap = this.withdrawStatusMap
				} else if(this.filterIndex == 1){
					this.currentStatusMap = this.depositStatusMap
				}
			},
			loadMore(){
				if(!this.isLastPage && this.loadingStatus != 'loading'){
					this.loadingStatus = 'loading'
					this.query.page += 1
					this.loadRecords()
				}
			},
			async loadRecords(){
				this.loadWithdraw()
			},
			loadDeposit(){
				this.depositList(this.query).then(res =>{
					this.empty = res.total <= 0
					this.isLastPage = (this.query.page == res.pages)
					if(this.isLastPage){
						this.loadingStatus = 'nomore'
					} else {
						this.loadingStatus = 'loadmore'
					}
					if(this.empty){
						this.records = [];
					} else {
						this.records = this.records.concat(res.rows)
					}
				}).catch(error =>{
					
				})
			},
			loadWithdraw(){
				this.withdrawList(this.query).then(res =>{
					this.empty = res.total <= 0
					this.isLastPage = (this.query.page == res.pages)
					
					console.log(this.query.page, res.pages)
					if(this.isLastPage){
						this.loadingStatus = 'nomore'
					} else {
						this.loadingStatus = 'loadmore'
					}
					if(this.empty){
						this.records = [];
					} else {
						this.records = this.records.concat(res.rows)
					}
				}).catch(error =>{
					
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 0upx 0upx;
	}
	.coin-section{
		background: #fff;
		.block{
			padding: 20upx 0;
			.s-list{
				position: absolute;
				width: 100%;
				top: 500upx;
				bottom: 0upx;
			}
			.s-row{
				display:flex;
				align-items:center;
				padding-top: 20upx;
				padding-bottom: 20upx;
				margin: 0upx 30upx;
				.subtitle{
					padding: 4upx 0 10upx 0;
				}
				.col{
					font-size: $font-base;
					color: $font-color-dark;
					flex:1;
					.coin{
						font-weight: bold;
						font-size:  $font-md;
					}
				}
				.coinLogo {
				    width: 36upx;
					height: 36upx;
				    margin-right: 8px;
				    display: inline-block;
				    vertical-align: middle;
				    float: left;
				}
				.light{
					font-weight: bold;
					font-size: $font-lg;
					color: $font-color-dark;
				}
				.r{
					text-align: right;
				}
				.row-title{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-light;
				}
				.row-amount{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-dark;
				}
			}
		}
		
		
	}
	
	
</style>
