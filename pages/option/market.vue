<template>
	<view class="container">
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="row">
				<u-row gutter="16">
					<u-col span="6">
						<view class="label title">{{i18n.option.name}}</view>
					</u-col>
					<u-col span="3">
						<view class="label title">{{i18n.option.price}}</view>
					</u-col>
					<u-col span="3">
						<view class="label title r">{{i18n.option.zd}}</view>
					</u-col>
				</u-row>
			</view>
		</u-sticky>
		<!-- 列表 -->
		<view class="coin-section m-t">
			<u-empty :text="i18n.common.noData" :show="empty" mode="data" margin-top="200"></u-empty>
			<view class="popup-symbol">
				<scroll-view :scroll-y="true" class="scroll-Y">
					<view class="row cell little-line" @click="onChangeSymbol(item)" v-for="(item, index) in list" :key="`market${index}`">
						<u-row gutter="16">
							<u-col span="6">
								<view class="label b">{{item.baseCoin}}/{{item.pricingCoin}}</view>
							</u-col>
							<u-col span="3">
								<view class="label b">${{item.close}}</view>
							</u-col>
							<u-col span="3">
								<view class="label r"><view class="change-tag" :class="{'upper-bg': item.close > item.open, 'lower-bg': item.close < item.open, 'equals-bg': item.close == item.open}">{{item | formatChange}}%</view></view>
							</u-col>
						</u-row>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	import {uniTag} from '@dcloudio/uni-ui'
	export default {
		components: {uniTag},
		mixins: [commonMixin],
		data() {
			return {
				query: {},
				empty: false,
				list: [],
				isLastPage: false,
				loadingStatus: 'loadmore',
				current: 0,
				timer: null
			};
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.option.title
			})
			this.list = []
			this.loadData();
			this.timer = setInterval(() => {
				this.loadData();
			}, 3000)
		},
		onLoad() {
			this.$fire.$emit('refreshCoin')
		},
		onUnload() {
			if(this.timer){
				clearInterval(this.timer)
			}
		},
		onHide() {
			if(this.timer){
				clearInterval(this.timer)
			}
		},
		onReachBottom(){
		},
		onPullDownRefresh() {
			this.list = []
			this.query.page = 1
			this.loadingStatus = 'loadmore'
			this.loadData();
		},
		filters: {
			formatSideClass(v, item){
				if(item.creator == item.buyerId){
					return 'buy'
				} else {
					return 'sell'
				}
			},
			formatChange(item){
				let v = parseFloat((item.close - item.open) / item.open * 100).toFixed(2)
				if(v > 0){
					v = '+' + v;
				}
				return v;
			}
		},
		onNavigationBarButtonTap(e) {},
		methods: {
			...mapActions('option', ['optionMarketList']),
			async loadData(){
				this.loadingStatus = 'loading'
				this.optionMarketList(this.query).then(res =>{
					uni.stopPullDownRefresh();
					this.empty = (res.total == 0)
					this.list = res.data
				}).catch(error => {
					uni.stopPullDownRefresh();
				})
			},
			onChangeSymbol(item){
				uni.navigateTo({
					url: '/pages/option/index?symbol=' + item.symbol.toLowerCase()
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.cell{
		padding: 25rpx 10rpx;
	}
	.change-tag{
		width: 120rpx;
		height: 50rpx;
		border-radius: 6rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 26rpx;
		color: #ffffff;
	}
	.row{
		width: 100%;
		.title{
			font-size: $font-sm;
			color: $font-color-light;
			padding: 0rpx 10rpx;
		}
		.r{
			text-align: right;
			display: flex;
			justify-content: right;
		}
		.b{
			color: #000000;
			font-weight: bold;
		}
	}
	
</style>
