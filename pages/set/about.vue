<template>
	<view class="container">
		<view class="logo">
			<image src="../../static/about_logo.png" mode="widthFix"></image>
		</view>
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.about.protocol}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.about.privacy}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.about.law}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="onAPPUpdate" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.about.checkVer}}</text>
			<text class="cell-tip">{{i18n.about.currentVer}} {{version}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	import APPUpdate, { getCurrentNo } from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	export default {
		mixins: [commonMixin],
		data() {
			return {
				version: ''
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.my.about
			})
		},
		onLoad() {
			// #ifdef APP-PLUS
			getCurrentNo(res => {
				// 进页面获取当前APP版本号（用于页面显示）
				this.version = res.versionName;
			});
			// #endif
		},
		methods:{
			// 检查APP是否有新版本
			onAPPUpdate() {
				// true 没有新版本的时候有提示，默认：false
				APPUpdate(true);
			}
		}
	}
</script>

<style lang='scss' scoped>
	.logo{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 60upx;
		padding-bottom: 60upx;
		image{
			width: 200upx;
		}
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:80upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-md + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-md;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
