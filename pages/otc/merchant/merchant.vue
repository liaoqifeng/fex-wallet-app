<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/otc/merchant/apply', true)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.merchant.edit}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/otc/merchant/addAdvert', true)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.merchant.publish}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/otc/merchant/advertList', true)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.merchant.advertList}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/otc/merchant/orderList', true)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.merchant.orderList}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!--<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">{{i18n.otc.merchant.exit}}</text>
		</view>-->
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
				
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.otc.merchant.title
			})
		},
		methods:{
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出承兑商?',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
				    		setTimeout(()=>{
				    			uni.navigateBack();
				    		}, 200)
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

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
