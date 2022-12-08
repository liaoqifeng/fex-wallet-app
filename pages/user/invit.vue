<template>
	<view class="container">
		<view class="tips">
			<view class="item"><image class="step" src="../../static/images/invit/icon-invit-step1.png" mode="widthFix"/></view>
			<view class="item"><image class="line" src="../../static/images/invit/icon-invit-line.png" mode="widthFix"/></view>
			<view class="item"><image class="step" src="../../static/images/invit/icon-invit-step2.png" mode="widthFix"/></view>
			<view class="item"><image class="line" src="../../static/images/invit/icon-invit-line.png" mode="widthFix"/></view>
			<view class="item"><image class="step" src="../../static/images/invit/icon-invit-step3.png" mode="widthFix"/></view>
		</view>
		<view class="tips">
			<view class="item"><text class="desc">{{i18n.invit.tip1}}</text></view>
			<view class="item"></view>
			<view class="item"><text class="desc">{{i18n.invit.tip2}}</text></view>
			<view class="item"></view>
			<view class="item"><text class="desc">{{i18n.invit.tip3}}</text></view>
		</view>
		<view class="user-info">
			<view class="top">
				<view class="item">
					<text class="mobile">{{loginInfo.mobile}}</text>
					<text class="sub">{{i18n.invit.tip4}}: {{loginInfo.registerTime | moment('YYYY-MM-DD')}}</text>
				</view>
				<view class="item" @click="copy">
					<text class="sub">{{i18n.invit.tip5}}</text>
					<text class="code">{{loginInfo.invitCode}}</text>
				</view>
			</view>
			<view class="bottom">
				<view class="item" @click="shareImageShare">
					<image src="../../static/icon-invit1.jpg"></image>
					<text>{{i18n.invit.tip6}}</text>
				</view>
				<view class="item" @click="shareLink">
					<image src="../../static/icon-invit2.jpg"></image>
					<text>{{i18n.invit.tip7}}</text>
				</view>
				<view class="item" @click="shareWord">
					<image src="../../static/icon-invit3.jpg"></image>
					<text>{{i18n.invit.tip8}}</text>
				</view>
				<view class="item" @click="shareFace">
					<image src="../../static/icon-invit4.jpg"></image>
					<text>{{i18n.invit.tip9}}</text>
				</view>
			</view>
		</view>
		
		<view class="rank">
			<view class="title">{{i18n.invit.tip10}}</view>
			<u-empty :text="i18n.invit.tip11" :show="records.length <= 0" mode="data" margin-top="10"></u-empty>
			<view class="item" v-for="(item, i) in records" :key="item.uid">
				<image :src="`../../static/icon-rank${i + 1}.jpg`"></image>
				<text>{{item.username}}</text>
				<text>{{item.invitUid1}} {{i18n.invit.tip14}}</text>
			</view>
			<!-- 
			<view class="item">
				<image src="../../static/icon-rank2.jpg"></image>
				<text>老王</text>
				<text>1人</text>
			</view>
			<view class="item">
				<image src="../../static/icon-rank3.jpg"></image>
				<text>老王</text>
				<text>1人</text>
			</view> -->
		</view>
		<view class="face" v-show="showFace">
			<view class="bg">
				<view class="qrcode"><tki-qrcode ref="qrcode" :showLoading="false" :size="250" cid="qrcode" :val="qrcode.val" /></view>
			</view>
			<view class="close" @click="shareFace"><u-icon name="close-circle" color="#ffffff" size="60"></u-icon></view>
		</view>
		<view class="face" v-show="showImgShare">
			<view class="img">
				<lPainter :board="posterObj" ref="painter"></lPainter>
				<view class="footer-btn">
					<view class="" @click="shareImageShare">{{i18n.invit.tip12}}</view>
					<view class="save" @click="toSave">{{i18n.invit.tip13}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import lPainter from '../../components/lime-painter/index.vue'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin, authMixin],
		components: {tkiQrcode, lPainter},
		data() {
			return {
				records: [],
				showFace: false,
				showImgShare: false,
				qrcode: {
					val: ''
				},
				show_poster:false,//显示海报
				path: '', //生成的图片地址
				posterObj: {
					width: '670rpx',
					height: '928rpx',
					background: '#fff',
					borderRadius: '16rpx',
					views: []
				}
			};
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.i18n.invit.title
			})
			this.invitRank().then(res =>{
				this.records = res.data
			})
			this.posterObj.views = [{
				type: 'image',
				src: 'https://s.yun-live.com/images/20210201/39ae4d9d8ad0b1acac7c224e845c641f.png',
				css: {
					left: '0',
					top: '0',
					width: '100%',
					height: '100%'
				}
			},
			{
				type: 'image',
				src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
				css: {
					left: '32rpx',
					top: '32rpx',
					borderRadius: '50%',
					width: '80rpx',
					height: '80rpx'
				}
			},
			{
				type: 'text',
				text: 'FEXCOIN',
				css: {
					fontSize: '28rpx',
					fontWeight: 'bold',
					color: '#D8AB87',
					lineHeight: '28rpx',
					left: '136rpx',
					top: '39rpx'
				}
			},
			{
				type: 'text',
				text: 'Welcom to fexcoin',
				css: {
					fontSize: '24rpx',
					color: '#FFFFFF',
					lineHeight: '24rpx',
					left: '136rpx',
					top: '80rpx'
				}
			},
			{
				type: 'image',
				src: 'https://s.yun-live.com/images/20210201/d88d56843d43b917e2a28550b2a62723.png',
				css: {
					left: '551rpx',
					top: '111rpx',
					width: '103rpx',
					height: '103rpx',
				}
			},
			{
				type: 'image',
				src: 'https://s.yun-live.com/images/20210201/247736ffd279276b891ec14db8ed0fd0.png',
				css: {
					left: '43rpx',
					top: '432rpx',
					width: '56.4rpx',
					height: '56.4rpx',
				}
			},
			{
				type: 'text',
				text: '',
				css: {
					fontSize: '32rpx',
					color: '#fff',
					fontWeight: 'bold',
					lineHeight: '45rpx',
					left: '71rpx',
					top: '292rpx',
					width: '528rpx'
				}
			},
			{
				type: 'image',
				src: 'https://s.yun-live.com/images/20210201/63a9b504fb745b43b9fe5c0adef8fddb.png',
				css: {
					left: '50%',
					top: '750rpx',
					transform: 'translate(-50%,0)',
					width: '192rpx',
					height: '78rpx',
				}
			},
			{
				type: 'view',
				css: {
					left: '50%',
					top: '630rpx',
					transform: 'translate(-50%,0)',
					width: '160rpx',
					height: '160rpx',
					background: '#fff',
				}
			},
			{
				type: 'qrcode',
				text: this.loginInfo.registerUrl,
				css: {
					left: '50%',
					top: '638rpx',
					transform: 'translate(-50%,0)',
					width: '144rpx',
					height: '144rpx',
				}
			},
			{
				type: 'text',
				text: '————  FEXCOIN  ————',
				css: {
					left: '0',
					top: '863rpx',
					width: '100%',
					textAlign: 'center',
					fontSize: '24rpx',
					color: '#B3A498',
					lineHeight: '33rpx'
				}
			},
		]
		},
		onShow() {
			this.qrcode.val = this.loginInfo.registerUrl
		},
		methods:{
			...mapActions('user', ['invitRank']),
			toSave(){
				// #ifdef APP-PLUS
				uni.showLoading({
					title: this.i18n.common.request,
				})
				// #endif
				const painter = this.$refs.painter;
				painter.canvasToTempFilePath().then(res => {
					this.path = res.tempFilePath;
					// #ifdef H5
					return;
					// #endif
					uni.previewImage({
						current:this.path,
						urls: [this.path]
					});
					uni.hideLoading()
				});
			},
			copy(){
				let _this = this
				uni.setClipboardData({
				    data: _this.loginInfo.invitCode,
				    success: function () {
				        _this.$api.msg(_this.i18n.toast.copySuccess)
				    }
				});
			},
			shareImageShare(){
				const painter = this.$refs.painter
				painter.render(this.posterObj)
				this.showImgShare = !this.showImgShare
			},
			shareFace(){
				this.showFace = !this.showFace
				setTimeout(() => {
					this.$refs.qrcode._makeCode()
				}, 100)
			},
			shareLink(){
				let _this = this
				uni.setClipboardData({
					data: _this.loginInfo.registerUrl,
					success: function () {
					    _this.$api.msg(_this.i18n.toast.copySuccess)
					}
				})
			},
			shareWord(){
				let _this = this
				uni.setClipboardData({
					data: `[${_this.loginInfo.registerUrl}] ${_this.i18n.invit.tip5}【${_this.loginInfo.invitCode}】【FEXCOIN APP】`,
					success: function () {
					    _this.$api.msg(_this.i18n.toast.copySuccess)
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	%section{
		padding: 20upx 20upx;
		background-color: #ffffff;
		border-radius: 20upx;
		margin-top: 30upx;
	}
	.container{
		width: 100%;
		height: 100%;
		font-size: $font-base;
		background-color: #1866fe;
		padding: 70upx 30upx 0 30upx;
	}
	.top-bg{
		width: 100%;
	}
	.tips{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.item{
			display: flex;
			flex-direction: column;
			.desc{
				display: block;
				width: 120upx;
				text-align: center;
				color: #ffffff;
				padding: 20upx 0;
			}
		}
		.step{
			width: 120upx;
		}
		.line{
			width: 100upx;
		}
	}
	.user-info{
		@extend %section;
		.bottom{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-top: 20upx;
			.item{
				width: 25%;
				display: flex;
				flex-direction: column;
				text-align: center;
				justify-content: center;
				padding: 20upx 0;
				image{
					width: 100upx;
					height: 100upx;
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
			.item{
				display: flex;
				flex-direction: column;
			}
		}
		.info{
			display: flex;
			flex-direction: row;
		}
		.detail{
			display: flex;
			flex-direction: column;
		}
		.invit{
			display: flex;
			flex-direction: column;
			text-align: right;
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
			color: #1866fe;
			padding-top: 12upx;
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
	.face{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		padding-top: 200upx;
		.bg{
			background: url(../../static/images/invit/invit-bg.jpg);
			background-size: 100% 100%;
			width: 500upx;
			height: 700upx;
			margin: 0 auto;
			border-radius: 20upx;
			padding-top: 100upx;
			text-align: center;
		}
		.close{
			text-align: center;
			padding-top: 60upx;
		}
		.img{
			padding: 24rpx 40rpx;
		}
		.footer-btn{
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view{
				width: 319rpx;
				height: 66rpx;
				border-radius: 40rpx;
				border: 1px solid #4070FF;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4070FF;
				line-height: 66rpx;
				text-align: center;
			}
			.save{
				background: #4070FF;
				color: #FFFFFF;
			}
		}
	}

</style>
