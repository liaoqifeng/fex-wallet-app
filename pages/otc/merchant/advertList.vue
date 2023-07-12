<template>
	<view class="container">
		<view class="line"></view>
		<!-- 列表 -->
		<advert-list-item :title="i18n.otc.advert.onlineSell" :currencys.sync="currencys" :list.sync="advert.buys" :payments.sync="payments" :type="0"></advert-list-item>
		<view class="line"></view>
		<!-- 列表 -->
		<advert-list-item :title="i18n.otc.advert.onlineBuy" :currencys.sync="currencys" :list.sync="advert.sells" :payments.sync="payments" :type="1"></advert-list-item>
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
				currencys: {},
				payments: []
			};
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.otc.advert.advertList
			})
			this.loadData();
		},
		methods: {
			...mapActions('otc', ['myAdvertList', 'getPaymentSetting']),
			...mapActions('common', ['currencyList']),			
			//请求数据
			async loadData(){
				this.getPaymentSetting().then(res => {
					let paymentSettingList = res.data
					let map = {}
					for(let i = 0; i < paymentSettingList.length; i++){
						map[paymentSettingList[i].symbol] = paymentSettingList[i].color
					}
					this.payments = map
				})
				this.currencyList().then(res => {
					let currencyList = res.data.currency
					let map = {}
					for(let i = 0; i < currencyList.length; i++){
						map[currencyList[i].code] = currencyList[i].symbol
					}
					this.currencys = map
				})
				this.myAdvertList().then(res => {
					this.advert = res.data
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
