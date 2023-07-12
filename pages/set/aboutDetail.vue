<template>
	<view class="container">
		<view class="content" v-html="content"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				type: '',
				content: ''
			};
		},
		onLoad(options) {
			this.type = options.type ? options.type : 'service'
			this.getHelpList().then(res => {
				this.content = res.data.links[this.type]
			})
			uni.setNavigationBarTitle({
				title: this.i18n.about[this.type]
			})
		},
		onShow() {
			
		},
		methods:{
			...mapActions('common', ['getHelpList']),
		}
	}
</script>

<style lang='scss' scoped>
	.content{
		padding: 30rpx 30rpx
	}
	
</style>
