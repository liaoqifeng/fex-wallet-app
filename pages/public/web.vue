<template>
	<view class="container">
		<web-view :webview-styles="webviewStyles" :src="src"></web-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default{
		data(){
			return {
				src: '',
				webviewStyles: {
					progress: {
						color: '#1866fe'
					}
				}
			}
		},
		onLoad(options) {
			this.src = options.url
		},
		methods: {
			
		}

	}
</script>

<style lang='scss'>
	
</style>
