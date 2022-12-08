<template>
	<view class="content">
		<swiper class="swiper" 
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="https://exspot.oss-cn-hongkong.aliyuncs.com/images/guide1.jpg" mode="widthFix"></image></view>
				</view>
				<!-- <view class="jump-over" @tap="launchFlag()">{{jumpover}}</view> -->
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="https://exspot.oss-cn-hongkong.aliyuncs.com/images/guide2.jpg" mode="widthFix"></image></view>
				</view>
				<!-- <view class="jump-over" @tap="launchFlag()">{{jumpover}}</view> -->
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="https://exspot.oss-cn-hongkong.aliyuncs.com/images/guide3.jpg" mode="widthFix"></image></view>
				</view>
				<view class="experience" @tap="launchFlag()">&nbsp;</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.switchTab({
					url: '/pages/index/index'
				});
				
			}
		}
	}
</script>
<style>
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 100%;
		background: #ffffff;
		position: relative;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		display: flex;
		/* justify-content: center; */
		align-items:flex-end;
		flex-direction:column-reverse
	}
	.swiper-item-img{
		width: 100%;
		height: auto;
		margin: 0 auto;
	}
	.swiper-item-img image{
		width: 100%;
	}
	.uniapp-img{
		height: 20%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 40%;
	}
	
	.jump-over,.experience{
		position: fixed;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #454343;
		border: 1px solid #454343;
		z-index: 9999999;
	}
	.jump-over{
		right: 45upx;
		top: 125upx;
		z-index: 999999;
	}
	.experience{
		width: 100%;
		height: 150upx;
		bottom: 12%;
		border: 0;
	}
</style>
