<template>
	<view class="container">
		<view class="row">
			<text class="m">{{i18n.accountsafe.googleset.bindTip1}}</text>
			<text class="s">{{i18n.accountsafe.googleset.bindTip2}}</text>
		</view>
		<view class="row center">
			<text class="s">{{i18n.accountsafe.googleset.bindTip3}}</text>
			<tki-qrcode ref="qrcode" :size="300" :onval="true" cid="qrcode" :val="`otpauth://totp/${siteName}?secret=${form.googleKey}`" />
		</view>
		<view class="row center">
			<text class="m">{{i18n.common.secritKey}}: {{form.googleKey}}</text>
			<text class="copy m" @click="paste">{{i18n.common.copy}}</text>
			<button class="btn" @click="bind">{{i18n.accountsafe.googleset.bindBtn}}</button>
		</view>
		
		<uni-valid-popup ref="validPopup" @ok="ok" type="google"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin, commonMixin],
		components: {tkiQrcode, uniValidPopup},
		data() {
			return {
				form: {
					googleKey: '',
					authCode: '',
					googleCode: ''
					
				}
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.accountsafe.googleset.bindNavTitle
			})
		},
		onLoad() {
			this.getGoogleKey().then(res =>{
				this.form.googleKey = res.msg;
			})
		},
		methods:{
			...mapActions('user', ['getGoogleKey', 'bindGoogle']),
			bind(){
				this.$refs.validPopup.open('google')
			},
			ok(data){
				if(!data.code){
					this.$api.msg(this.i18n.toast.inputGoogleCode)
					return;
				}
				this.form.googleCode = data.code
				this.bindGoogle(this.form).then(res =>{
					this.$api.msg(this.i18n.toast.bindGoodsSuccess)
					uni.navigateBack({})
				}).catch(error =>{
					this.$refs.validPopup.enable()
				})
			},
			paste() {
				let $this = this
				uni.setClipboardData({
				    data: this.form.googleKey,
				    success: function () {
				        $this.$api.msg(this.i18n.toast.copySuccess)
				    }
				});
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.row{
		background: #ffffff;
		padding: 30upx 30upx 0upx 30upx;
		margin-top: 20upx;
		.m{
			font-size: $font-md;
		}
		.s{
			font-size: $font-base;
			display: block;
			padding-top: 20upx;
			padding-bottom: 30upx;
		}
		.copy{
			color: $font-color-blue;
			margin-left: 10upx;
		}
	}
	.center{
		text-align: center;
	}
	.btn{
		margin-top: 60upx;
		background-color: $uni-color-blue;
		color: #ffffff;
		font-size: $font-base;
	}
</style>
