<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<view class="order-list">
			<view class="order-item little-line" v-for="(item, index) in dataList" :key="index">
				{{index}}<!-- <view class="row user-info" @click="navTo('/pages/otc/business/business')">
					<view class="name"><view class="profile"></view>{{index}}</view>
					<view class="nomarl">1091 | 99%</view>
				</view>
				<view class="row">
					<view class="nomarl">数量 0.0111 BTC</view>
					<view class="nomarl">单价</view>
				</view>
				<view class="row">
					<view class="nomarl">限额￥10,000-￥55,877</view>
					<view class="price">￥61,889344</view>
				</view>
				<view class="row opt">
					<view class="pay">
						<image src="../../../static/pay-alipay.png"></image>
						<image src="../../../static/pay-wechat.png"></image>
					</view>
					<view><button class="btn" @click="buy">购买</button></view>
				</view> -->
			</view>
		
		</view>
		
	</mescroll-uni>
</template> 

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {uniPopup} from '@dcloudio/uni-ui'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin],
		components: {
			uniLoadMore,
			uniPopup
		},
		data() {
			return {
				mescroll: null,
				page:{
					page: 1,
					limit: 10,
					total: 100,
					side: 'BUY',
					coin: undefined,
					paycoin: undefined,
					payment: undefined
				},
				dataList: [],
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					empty:{
						tip: '~ 空空如也 ~'
					}
				}
			};
		},
		
		onLoad(options){
			
		},
		 
		methods: {
			...mapActions('otc', ['advertList']),
			mescrollInit (mescroll) {
			  this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
			},
			init(form){
				/* this.page.page = 1
				this.page = Object.assign(this.page, form)
				this.mescroll.triggerDownScroll() */
			},
			//获取订单列表
			loadData(){
				this.advertList(this.page).then(res =>{
					if(res.total == 0){
						this.dataList = [];
					} else {
						this.dataList = this.dataList.concat(res.rows)
					}
					this.$nextTick(() => {
					  this.mescroll.endSuccess(res.rows.length, true)
					})
				}).catch(error =>{
					this.mescroll.endErr()
				})
			}, 
			/*下拉刷新的回调 */
			downCallback() {
				this.dataList = []
				this.mescroll.resetUpScroll()
				//this.loadData()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page, mescroll) {
				/* console.log(111111111122222222222222222)
				this.loadData() */
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				//联网加载数据
				console.log(pageNum + "," + pageSize)
				uni.showToast({
					title: pageNum + "," + pageSize
				})
				this.dataList = this.dataList.concat([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
				
				this.mescroll.endSuccess(10, true);
				
				//this.mescroll.endSuccess(10, true);
				//this.mescroll.endBySize(this.page.pageSize, 100);
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
			navTo(url){
				uni.navigateTo({
					url: url
				})
			},
			buy(){
				this.$refs.popup.open()
			}
		},
	}
</script>

<style lang="scss" scoped>
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
	}
</style>
