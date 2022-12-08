<template>
	<view class="content">
		<!-- <web-view  src="/hybrid/html/index.html"></web-view> -->
		<web-view  :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url : '',
				symbol: undefined
			}
		},
		onLoad(options) {
			this.symbol = options.symbol
			this.url = `/hybrid/html/index.html?symbol=${options.symbol}`
			
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.symbol.toUpperCase()
			});
		},
		methods: {

		}
	}
</script>

<style>
</style>
