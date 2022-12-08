<template>
	<view class="empty-content">
		<image class="empty-content-image" :src="setSrc" mode="aspectFit"></image>
		<text class="label">{{i18n.common.noData}}</text>
	</view>
</template>

<script>
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		props: {
			src: {
				type: String,
				default: 'empty'
			},
		},

		data() {
			return {
				typeSrc: {
					empty: "/static/empty.jpg"
				},
			}
		},

		computed: {
			setSrc() {
				return this.typeSrc[this.src];
			},
		}
	}
</script>

<style lang="scss">
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background: #ffffff;
		padding-top: 240upx;

		&-image {
			width: 200upx;
			height: 200upx;
		}
		.label{
			font-size: $font-base;
			color: $font-color-light;
		}
	}
</style>
