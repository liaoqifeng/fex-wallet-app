<template>
	<view class="content">
		<view class="header">
			<view class="navbar">
				<view class="nav-item" :class="{current: tabCurrentIndex === 0}" @click="tabClick(0)">我要买</view>
				<view class="nav-item" :class="{current: tabCurrentIndex === 1}" @click="tabClick(1)">我要卖</view>
			</view>
			<view class="menu">
				<image src="../../static/icon-filter.png" @click="filter"></image>
				<image src="../../static/icon-order.png" @click="navTo('/pages/otc/order/list')"></image>
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content">
				<otc-list></otc-list>
			</swiper-item>
			<swiper-item class="tab-content">
				<otc-list></otc-list>
			</swiper-item>
		</swiper>
		
		<!-- <uni-drawer :visible="true" mode="right">
		    <view class="filter">
		        <view class="uni-title">金额</view>
				<view><input type="number" class="price" placeholder="系统会为您筛选包含目标金额的商品"/></view>
		    </view>
		</uni-drawer> -->
	</view>
</template> 

<script>
	import otcList from "./components/otc-list.vue";
	import {uniDrawer} from '@dcloudio/uni-ui'
	import Json from '@/Json';
	export default {
		components: {
			otcList,
			uniDrawer
		},
		data() {
			return {
				tabCurrentIndex: 0
			};
		},
		
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = 0;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if(options.state == 0){
				this.loadData()
			}
			// #endif
			
		},
		 
		methods: {
			navTo(url){
				uni.navigateTo({
					url: url
				})
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
			tabClick(index){
				this.tabCurrentIndex = index;
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
</style>
