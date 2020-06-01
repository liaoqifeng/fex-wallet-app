<template>
	<view class="content">
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content">
				
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
			}
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
	
	
	
</style>
