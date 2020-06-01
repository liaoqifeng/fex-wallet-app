<template>
	<view class="content">
		<view class="header">
			<view class="navbar">
				<view class="nav-item" :class="{current: sideIndex === 0}" @click="sideTabClick(0)">我要买</view>
				<view class="nav-item" :class="{current: sideIndex === 1}" @click="sideTabClick(1)">我要卖</view>
			</view>
			<view class="menu">
				<image src="../../static/icon-filter.png" @click="filter"></image>
				<image src="../../static/icon-order.png" @click="navTo('/pages/otc/order/list')"></image>
			</view>
		</view>
		<view class="coinNavbar">
			<view 
				v-for="(item, index) in fiatCoins" :key="index" 
				class="nav-item" 
				:class="{current: coinIndex === index}"
				@click="coinTabClick(index)"
			>
				{{item}}
			</view>
		</view>
		<!-- <otc-list-item ref="advertList"></otc-list-item> -->
		<view class="list" :style="{top: mercrollTop+ 'px'}">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" >
				<view v-for="(item, i) in dataList" class="order-list little-line" style="height: 80upx;">
					{{i}}
				</view>
			</mescroll-body>
		</view>
		<!-- <uni-drawer :visible="true" mode="right">
		    <view class="filter">
		        <view class="uni-title">金额</view>
				<view><input type="number" class="price" placeholder="系统会为您筛选包含目标金额的商品"/></view>
		    </view>
		</uni-drawer> -->
	</view>
</template> 

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {uniDrawer} from '@dcloudio/uni-ui'
	import otcListItem from "./components/otc-list-item.vue";
	import Json from '@/Json';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		components: {
			otcListItem,
			uniDrawer
		},
		
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		data() {
			return {
				sideIndex: 0,
				coinIndex: 0,
				fiatCoins: [],
				form:{
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
					isBounce: true,
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					empty:{
						tip: '~ 空空如也 ~'
					}
				},
				mescroll: null,
				mercrollTop: 0
			};
		},
		
		onLoad(options){
			let _this = this
			this.mercrollTop = 130
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success:function(data){
					_this.mercrollTop= 116 - data.statusBarHeight;
				}
			})
			// #endif 
			this.fiatList().then(res =>{
				this.fiatCoins = res.data
				this.form.coin = this.fiatCoins[0]
				this.$refs.advertList.init(this.form)
			}).catch(error =>{
				
			})
		},
		 
		methods: {
			...mapActions('common', ['fiatList']),
			mescrollInit (mescroll) {
			  this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
			},
			loadData(){
				
			},
			//获取订单列表
			filter(){
				uni.getSubNVueById('otcFilterDrawer').show('slide-in-right', 200);
			}, 

			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			sideTabClick(index){
				this.sideIndex = index;
			},
			//顶部tab点击
			coinTabClick(index){
				this.coinIndex = index;
				this.form.coin = this.fiatCoins[index]
				this.$refs.advertList.init(this.form)
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.dataList = []
				this.mescroll.resetUpScroll()
				//this.loadData()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log(111111111122222222222222222)
				/* 
				this.loadData() */
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				//联网加载数据
				console.log(pageNum + "," + pageSize)
				uni.showToast({
					title: pageNum + "," + pageSize
				})
				this.dataList = this.dataList.concat([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
				
				this.mescroll.endSuccess(16);
				
				//this.mescroll.endSuccess(10, true);
				//this.mescroll.endBySize(this.page.pageSize, 100);
			}
			
		},
	}
</script>

<style lang="scss" scoped>
	page, .content{
		height: 100%;
	}
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	.header{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		.menu{
			image {
				width: 20px;
				height: 20px;
				margin: 0upx 30upx 0upx 10upx;
			}
		}
	}
	.navbar{
		display: flex;
		height: 40px;
		background: #fff;
		position: relative;
		margin: 0 30upx 20upx 30upx;
		padding-bottom: 30upx;
		.nav-item{
			height: 100%;
			font-size: 30upx;
			color: $font-color-light;
			margin-right: 15px;
			display:flex;
			align-items:flex-end;
			&.current{
				color: $font-color-dark;
				font-size: 40upx;
				font-weight: bold;
			}
		}
	}
	.filter{
		padding: 30upx 30upx;
		.uni-title{
			font-size: $font-lg;
			padding: 20upx 0;
		}
		.price{
			border: 1upx solid $border-color-light;
			font-size: $font-sm;
			padding: 30upx 20upx;
		}
	}
	.coinNavbar{
		display: flex;
		height: 30px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		overflow-x: scroll;
		padding-left: 30upx;
		padding-right: 30upx;
		.nav-item{
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			margin-right: 15px;
			position: relative;
			&.current{
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
	.list{
		position: fixed;
		width: 100%;
		height: 100px;
	}
	
</style>
