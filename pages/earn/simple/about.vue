<template>
	<view class="container">
		<view class="tabs little-line">
			<u-tabs :list="list" :current="current" @change="change" bar-width="120" active-color="#000000" inactive-color="#606266"></u-tabs>
		</view>
		<view class="content" v-show="current == 0">
			<view class="qustion">{{i18n.simpleearn.about.cpjs1}}</view>
			<view class="answer">{{i18n.simpleearn.about.cpjs2}}</view>
			<view class="qustion">{{i18n.simpleearn.about.cpjs3}}</view>
			<view class="answer">
				<view class="h2">{{i18n.simpleearn.about.cpjs4}}</view>
				<text>{{i18n.simpleearn.about.cpjs5}}</text>
			</view>
			<view class="answer">
				<view class="h2">{{i18n.simpleearn.about.cpjs6}}</view>
				<text>{{i18n.simpleearn.about.cpjs7}}</text>
			</view>
		</view>
		<view class="content"  v-show="current == 1">
			<view class="qustion">{{i18n.simpleearn.about.cpjs8}}</view>
			<view class="answer">{{i18n.simpleearn.about.cpjs9}}</view>
			<view class="qustion">{{i18n.simpleearn.about.cpjs10}}</view>
			<view class="answer">{{i18n.simpleearn.about.cpjs11}}</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				list: [{
					name: '产品概览'
				}, {
					name: '收益来源'
				}],
				current: 0
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.simpleearn.about.bt
			})
			this.list = [{
				name: this.i18n.simpleearn.about.cpgl
			}, {
				name: this.i18n.simpleearn.about.syly
			}]
		},
		onPullDownRefresh() { },
		onLoad() { },
		onHide() { },
		onUnload() { },
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		font-size: 26rpx;
		.content{
			padding: 0rpx 30rpx;
		}
		.qustion{
			font-size: 30rpx;
			font-weight: bold;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}
		.h2{
			font-size: 28rpx;
			font-weight: bold;
			margin: 10rpx 0;
		}
	}
</style>
