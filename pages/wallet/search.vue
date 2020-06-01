<template>
	<view class="container">
		<view class="coin-list">
			<view class="row little-line">
				<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="icon"></image>
				<text class="name">BTC</text>
				<text class="full">Bitcoin</text>
			</view>
			<view class="row little-line">
				<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="icon"></image>
				<text class="name">BTC</text>
				<text class="full">Bitcoin</text>
			</view>
			<view class="row little-line">
				<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="icon"></image>
				<text class="name">BTC</text>
				<text class="full">Bitcoin</text>
			</view>
			<view class="row little-line">
				<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="icon"></image>
				<text class="name">BTC</text>
				<text class="full">Bitcoin</text>
			</view>
			<view class="row little-line">
				<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="icon"></image>
				<text class="name">BTC</text>
				<text class="full">Bitcoin</text>
			</view>
			<view class="row little-line">
				<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="icon"></image>
				<text class="name">BTC</text>
				<text class="full">Bitcoin</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniList, uniListItem} from '@dcloudio/uni-ui'
	export default {
		components: {uniList, uniListItem},
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
		onNavigationBarSearchInputChanged(e) {
			console.log(JSON.stringify(e));
		},
		onNavigationBarSearchInputConfirmed(e) {
			console.log('Search:'+e.text)
		},
		onNavigationBarButtonTap:function(e){
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData(){
				let list = await this.$api.json('cartList'); 
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				});
			},
			navToDetail(){
				uni.navigateTo({
					url: '/pages/wallet/detail'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 0upx 20upx;
	}
	.coin-list{
		.row{
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 80upx;
			line-height: 80upx;
			image{
				height: 40upx;
				width: 40upx;
				vertical-align: middle;
			}
			.name{
				font-size: font-xl;
				vertical-align: middle;
				padding: 0upx 20upx;
			}
			.full{
				font-size: $font-base;
				color: $font-color-light;
			}
		}
	}
	
</style>
