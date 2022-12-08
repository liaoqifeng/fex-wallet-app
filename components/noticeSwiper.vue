<template>
	<view class="uni-swiper-msg">
		<u-icon name="volume-fill" size="30" class="notice"></u-icon>
		<swiper vertical="true" autoplay="true" circular="true" interval="3000">
			<swiper-item v-for="(item, index) in list_" :key="index" @click="navTo(`/pages/notice/detail?id=${item.noticeId}`)">
				<navigator><view style="padding-right: 10upx;">{{item.noticeTitle}}</view></navigator>
			</swiper-item>
		</swiper>
		<u-icon name="list" size="30" class="notice" @click="navTo(`/pages/notice/notice`)"></u-icon>
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
				console.log("list_,,,,", this.list)
				return this.list;
			}
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url: url
				})
			},
			onClick(e) {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-swiper-msg{
		padding: 10upx 10upx; 
		flex-wrap:nowrap; 
		display:flex;
		align-items: center;
		positon : relative;
		font-size: 26upx;
		font-weight: 500;
		background-color: #EEF2F5;
		border-radius: 10upx;
	}
	.uni-swiper-msg-icon{
		width:50upx; 
		margin-right:20upx;
	}
	.uni-swiper-msg-icon image{
		width:100%; 
		flex-shrink:0;
	}
	.uni-swiper-msg swiper{
		width:100%; 
		height:50upx; 
		line-height:50upx; 
		text-align: left;
	}
	.uni-swiper-msg swiper-item{
		line-height:50upx;
	}
	.notice{
		margin-top: 2upx;
		margin-right: 10upx;
	}
</style>
