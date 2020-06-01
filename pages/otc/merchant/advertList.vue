<template>
	<view class="container">
		<view class="line"></view>
		<!-- 列表 -->
		<advert-list-item title="在线出售" :list.sync="advert.buys" :payments.sync="payments" :type="0"></advert-list-item>
		<view class="line"></view>
		<!-- 列表 -->
		<advert-list-item title="在线购买" :list.sync="advert.sells" :payments.sync="payments" :type="1"></advert-list-item>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	import advertListItem from "../components/advert-list-item.vue";
	export default {
		components: {advertListItem},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				advert: {
					buys: [],
					sells: []
				},
				currencys: [],
				payments: []
			};
		},
		onShow(){
			this.loadData();
		},
		methods: {
			...mapActions('otc', ['myAdvertList']),
			...mapActions('common', ['currencyList']),			
			//请求数据
			async loadData(){
				this.currencyList().then(res => {
					this.currencys = res.data.currency
					this.payments = res.data.payment
				})
				this.myAdvertList().then(res => {
					this.advert = res.data
					console.log(this.advert)
				}).catch(error =>{
					console.log(error);
				})
				
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
