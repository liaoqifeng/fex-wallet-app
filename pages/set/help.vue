<template>
	<view class="app">
		<view class="bg">
			<image src="../../static/help_bg.jpg" mode="widthFix"></image>
		</view>
		<view class="title little-line">
			{{i18n.help.title}}
		</view>
		<view class="list">
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-safe.png" mode="widthFix"></image>
					<text class="label">{{i18n.help.account}}</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip1}}</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip2}}</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip3}}</text>
					</view>
				</view>
			</view>
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-ex.png" mode="widthFix"></image>
					<text class="label">{{i18n.help.exchange}}</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip4}}</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip5}}</text>
					</view>
				</view>
			</view>
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-fiat.png" mode="widthFix"></image>
					<text class="label">{{i18n.help.otc}}</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip6}}USDT</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip7}}USDT</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip8}}</text>
					</view>
				</view>
			</view>
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-wc.png" mode="widthFix"></image>
					<text class="label">{{i18n.help.wc}}</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip9}}</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>{{i18n.help.tip10}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				payType: 1,
				orderInfo: {}
			};
		},
		computed: {
		
		},
		onShow(options) {
			uni.setNavigationBarTitle({
				title: this.i18n.my.help
			})
		},
		methods: {}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
		font-size: $font-lg - 2upx;
	}
	.bg{
		background-color: #466EE8;
		padding-top: 100upx;
		width: 100%;
		image{
			width: 100%;
		}
	}
	.title{
		padding: $page-row-spacing;
	}
	.list{
		.row{
			display: flex;
			flex-direction: row;
			padding: 60upx 0;
		}
		.left{
			display: flex;
			flex-direction: column;
			flex: 1;
			padding-left: $page-row-spacing;
			align-content: center;
			justify-content:center;
			image{
				width: 80upx;
				height: 80upx;
				margin-left: 28upx;
			}
		}
		.right{
			flex: 2;
			justify-content:center;
			.col{
				display: flex;
				flex-direction: row;
				align-items: center;
				align-content: center;
				padding: 10upx 0;
			}
			.circle{
				width: 20upx;
				height: 20upx;
				background: #d8d8d8;
				border-radius: 50%;
				margin-right: 16upx;
			}
		}
	}
</style>
