<template>  
    <view class="container">  
		
		<view class="user-section">
			<image mode="widthFix" class="bg" src="../../static/personal-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="'/static/missing-face.png'"></image>
				</view>
				<view class="info-box" @click="toLogin">
					<text class="username">{{loginInfo.nickname || '请登录'}}</text>
					<view class="tip">欢迎来到FEXCOIN.COM</view>
				</view>
			</view>
			<view class="vip-card-box">
				<view class="b-btn">
					暂未开通
				</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					Fex 会员
				</view>
				<text class="e-m">DCloud Union</text>
				<text class="e-b">开通会员</text>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
		>
			<image class="arc" src="/static/arc.png"></image>
			
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/notice/notice')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>公告</text>
				</view>
				<view class="order-item" @click="navTo('/pages/user/encrypAddress')"  hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>地址本</text>
				</view>
				<view class="order-item" @click="navTo('/pages/user/invit')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>推荐</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" @eventClick="navTo('/pages/user/safe', true)" title="账户与安全"></list-cell>
				<list-cell icon="icon-pingjia" iconColor="#4eb432" @eventClick="navTo('/pages/user/payType', true)" title="收款方式"></list-cell>
				<list-cell v-if="!isMer" icon="icon-shoucang2" iconColor="#9789f7" @eventClick="navTo('/pages/otc/merchant/apply', true)" title="承兑商申请"></list-cell>
				<list-cell v-if="isMer" icon="icon-tuandui" iconColor="#543632" @eventClick="navTo('/pages/otc/merchant/merchant', true)" title="承兑商管理"></list-cell>
				<list-cell icon="icon-bangzhu1" iconColor="#ee883b" title="帮助中心"></list-cell>
				<list-cell icon="icon-pinglun-copy" iconColor="#54b4ef" title="问题反馈"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/public/login')"></list-cell>
			</view>
		</view>
			
		
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
    import {
    	mapState,
    	mapActions
    } from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		mixins: [commonMixin],
		data(){
			return {
				userInfo: {},
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				isMer: false
			}
		},
		onShow(){
			if(this.loginInfo.hasLogin){
				this.isMerchant().then(res => {
					this.isMer = res.data
				})
			}
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			...mapState('user', ['loginInfo'])
		},
        methods: {
			...mapActions('otc', ['isMerchant']),
			toLogin(){
				if(!this.loginInfo.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
	.user-section{
		height: 510upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: #ffffff;
			margin-left: 20upx;
		}
		.tip{
			font-size: $font-sm + 2upx;
			color: #ffffff;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-base;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 58upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>