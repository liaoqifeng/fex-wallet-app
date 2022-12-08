<template>
	<view class="container">
		<u-parse :html="info.coindesc"></u-parse>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
		},
		data() {
			return {
				code: '',
				info: {}
			};
		},
		onLoad(options){
			this.code = options.code
			this.getInfo()
		},
		methods: {
			getInfo(){
				this.$u.post('https://dncapi.gomynft.com/api/coin/web-coininfo', {"webp":1,"code":this.code}).then(res => {
					this.info = res.data
					uni.setNavigationBarTitle({
						title: res.data.name_zh + (res.data.name)
					})
				});
			}  
		}
	}
</script>

<style lang='scss'>
	.container{
		padding: 20upx 20upx;
	}
</style>
