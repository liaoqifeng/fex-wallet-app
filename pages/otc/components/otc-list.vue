<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<otc-list-item></otc-list-item>
			</swiper-item>
		</swiper>
	</view>
</template> 

<script>
	import otcListItem from "./otc-list-item.vue";
	export default {
		components: {
			otcListItem
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: 'USDT',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: 'EOS',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: 'ETH',
						loadingType: 'more',
						orderList: []
					}
				]
			};
		},
		
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			this.loadData()
			
		},
		 
		methods: {
			//获取订单列表
			loadData(source){
				this.dataList = this.dataList.concat([1])
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
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
	
	.navbar{
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
	
</style>
