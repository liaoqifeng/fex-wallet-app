<template>
	<view class="uni-swiper-msg">
		<uni-icons type="sound" size="20" class="notice"></uni-icons>
		<swiper vertical="true" autoplay="true" circular="true" interval="3000">
			<swiper-item v-for="(item, index) in list_" :key="index" @click="onClick()">
				<navigator>{{item.noticeTitle}}</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons},
		data() {
			return {
			};
		},
		props:{
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		computed: {
			list_(){
				return this.list;
			}
		},
		methods: {
			onClick(e) {
				console.log("=====================================")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-swiper-msg{padding:0upx 10upx; flex-wrap:nowrap; display:flex;positon : relative;font-size: $font-base;font-weight: bold;}
	.uni-swiper-msg-icon{width:50upx; margin-right:20upx;}
	.uni-swiper-msg-icon image{width:100%; flex-shrink:0;}
	.uni-swiper-msg swiper{width:100%; height:50upx; line-height:50upx; text-align: left;}
	.uni-swiper-msg swiper-item{line-height:50upx;}
	.notice{
		margin-top: 4upx;
		margin-right: 10upx;
	}
</style>
