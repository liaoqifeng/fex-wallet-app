<template>
	<view class="container">
		<image class="top-bg" src="../../static/invit-bg.jpg" mode="widthFix"></image>
		<view class="user-info">
			<view class="top">
				<view class="info">
					<image class="portrait" src="/static/missing-face.png"></image>
					<view class="detail">
						<text class="mobile">135****4345</text>
						<text class="sub">注册时间: 2019-09-23</text>
					</view>
				</view>
				<view class="invit">
					<text class="code">FKGOXS</text>
					<text class="sub">我的邀请码</text>
				</view>
			</view>
			<view class="bottom">
				<view class="item">
					<image src="../../static/icon-invit1.jpg"></image>
					<text>海报邀请</text>
				</view>
				<view class="item">
					<image src="../../static/icon-invit2.jpg"></image>
					<text>分享链接</text>
				</view>
				<view class="item">
					<image src="../../static/icon-invit3.jpg"></image>
					<text>分享口令</text>
				</view>
				<view class="item">
					<image src="../../static/icon-invit4.jpg"></image>
					<text>面对面</text>
				</view>
			</view>
		</view>
		
		<view class="rank">
			<view class="title">排行榜</view>
			<view class="item">
				<image src="../../static/icon-rank1.jpg"></image>
				<text>老王</text>
				<text>1人</text>
			</view>
			<view class="item">
				<image src="../../static/icon-rank2.jpg"></image>
				<text>老王</text>
				<text>1人</text>
			</view>
			<view class="item">
				<image src="../../static/icon-rank3.jpg"></image>
				<text>老王</text>
				<text>1人</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	%section{
		margin: 20upx 30upx;
		padding: 20upx 20upx;
		background-color: #ffffff;
		border-radius: 20upx;
	}
	.container{
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		font-size: $font-base;
		background-color: #2780ff;
	}
	.top-bg{
		width: 100%;
	}
	.user-info{
		@extend %section;
		.bottom{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.item{
				width: 25%;
				display: flex;
				flex-direction: column;
				text-align: center;
				justify-content: center;
				padding: 20upx 0;
				image{
					width: 80upx;
					height: 80upx;
					margin: 0 auto;
				}
				text{
					padding-top: 10upx;
				}
			}
		}
		.top{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.info{
			display: flex;
			flex-direction: row;
		}
		.detail, .invit{
			display: flex;
			flex-direction: column;
		}
		.mobile{
			font-size: $font-md;
			font-weight: 600;
			padding-top: 10upx;
			padding-bottom: 10upx;
		}
		.code{
			font-size: $font-xl;
			font-weight: 600;
			color: $font-color-red;
		}
		.sub{
			color: $font-color-light;
			margin-top: 10upx;
		}
		.portrait{
			width: 100upx;
			height: 100upx;
			margin: 10upx;
			margin-right: 20upx;
		}
	}
	.rank{
		@extend %section;
		padding: 0 0 20upx 0;
		.title{
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			background-color: #f4f7fe;
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			padding-left: 30upx;
			font-size: $font-md;
		}
		.item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20upx 30upx 0 30upx;
			image{
				width: 48upx;
				height: 60upx;
			}
		}
	}
</style>
