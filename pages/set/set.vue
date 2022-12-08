<template>
	<view class="container">
		
		<view class="list-cell m-t">
			<text class="cell-tit">{{i18n.set.push}}</text>
			<switch checked color="#fa436a" />
		</view>
		<view class="list-cell m-t b-b" @click="navTo('/pages/set/help')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.set.help}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/about')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.set.about}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				version: ''
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.my.set
			})
		},
		methods:{

		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
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
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
