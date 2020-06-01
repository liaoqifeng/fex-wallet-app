<template>
	<view class="container">
		<view class="line"></view>
		<!-- 列表 -->
		<advert-list-item title="在线出售" type="0"></advert-list-item>
		<view class="line"></view>
		<!-- 列表 -->
		<advert-list-item title="在线购买" type="1"></advert-list-item>
	
	</view>
	
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import advertListItem from "../components/advert-list-item.vue";
	export default {
		components: {advertListItem},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
			};
		},
		onLoad(){
			this.loadData();
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			change(){
				uni.showActionSheet({
					title:'支付方式',
				    itemList: ['银行卡', '微信', '支付宝'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			//请求数据
			async loadData(){
				
			},
			navTo(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	
</style>
