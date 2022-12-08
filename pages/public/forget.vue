<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="welcome">
				<image mode="widthFix" src="../../static/images/public/logo.png" class="logo"></image>
				<view class="txt">
					<text class="b">{{i18n.login.welcome}} {{siteName}}</text>
				</view>
			</view>
			<view class="input-content">
				<view class="input-item">
					<image src="../../static/images/public/icon-mobile.png" class="icon"></image>
					<input placeholder-style="color: #ffffff"
						type="mobile" 
						v-model="form.username" 
						:placeholder="i18n.login.inputAccount"
						maxlength="11"
						data-key="username"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<image src="../../static/images/public/icon-pwd.png" class="icon"></image>
					<input placeholder-style="color: #ffffff"
						type="password" 
						v-model="form.password" 
						:placeholder="i18n.login.pwdRule"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<image src="../../static/images/public/icon-pwd.png" class="icon"></image>
					<input placeholder-style="color: #ffffff"
						type="number" 
						v-model="form.googleCode" 
						:placeholder="i18n.toast.inputGoogleCode"
						placeholder-class="input-empty"
						maxlength="20"
						@input="inputChange"
					/>
				</view>
			</view>
			<view class="link"></view>
			<button class="confirm-btn" @click="useVerify" :disabled="logining">{{i18n.common.update}}</button>
			<view class="link">
				<view class="forget-section"></view>
				<view class="register-section">
					<text @click="navToLogin">{{i18n.login.logining}}</text>
				</view>
			</view>
		</view>
		
		<Verify
				:title="verifyTitle"
				:explain="explain"
				@success="success"
				:mode="'pop'"
				:captchaType="'blockPuzzle'"
				:imgSize="{ width: '300px', height: '155px' }"
				ref="verify"></Verify>
		
		<uni-valid-popup ref="validPopup" @ok="ok" type="google"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {isAccount, isMobile, isPassword} from '../../utils/validate'
	import Verify from "../../components/verifition/verify/verify";
	import uniValidPopup from '../../components/uni-valid-popup.vue';
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default{
		components: {
			Verify,
			uniValidPopup
		},
		mixins: [commonMixin],
		data(){
			return {
				form: {
					username: '',
					password: '',
					googleCode: ''
				},
				logining: false,
				redirect: undefined,
				verifyTitle: '',
				explain: '',
				verifySuccess: '',
				verifyFail: ''
			}
		},
		onShow() {
			this.verifyTitle = this.i18n.common.verifyTitle;
			this.explain = this.i18n.common.explain;
			this.verifySuccess = this.i18n.common.verifySuccess;
			this.verifyFail = this.i18n.common.verifyFail;
		},
		onLoad(options) {
			this.redirect = options.redirect
		},
		methods: {
			...mapActions('user', ['forget']),
			success(params){
				this.form.captchaVerify = params.captchaVerification
				console.log("success: ", params)
				this.toLogin()
			},
			useVerify(){
				this.logining = true;
				if(this.form.username == ''){
					this.$api.msg(this.i18n.login.inputAccount)
					this.logining = false
					return;
				}
				if (!isAccount(this.form.username)) {
					this.$api.msg(this.i18n.login.accountError)
					this.logining = false
					return;
				}
				if(this.form.password == ''){
					this.$api.msg(this.i18n.login.password)
					this.logining = false
					return;
				}
				if(!this.form.googleCode){
					this.$api.msg(this.i18n.toast.inputGoogleCode)
					this.logining = false
					return;
				}
				this.toForget()
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			toRegist(){
				uni.navigateTo({
					url: '/pages/public/register'
				})
			},
			ok(data){
				if(!data.code){
					this.$api.msg(this.i18n.toast.inputGoogleCode)
					return;
				}
				this.form.googleCode = data.code
			},
			toForget(){
				let $this = this
				this.forget(this.form).then(res => {
					this.$api.msg(this.i18n.toast.submitSuccess, 1000, false, 'none', function() {
						$this.$refs.verify.hiddle()
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/public/login'
							})
						}, 2000)
					})
				}).catch(error => {
					console.log(error)
					if(error.code == -100){
						this.$refs.validPopup.open('google')
					}
					this.$refs.validPopup.enable()
					this.logining = false
				})
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
		width: 100%;
		height: 100%;
	}
	.container{
		padding-top: 100px;
		position:relative;
		overflow: hidden;
		background: url(../../static/images/public/bg.png);
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: #ffffff;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		padding-left: 40upx;
		padding-bottom: 50upx;
		.logo{
			width: 150upx;
		}
		.txt{
			display: flex;
			flex-direction: column;
			color: #ffffff;
			padding-left: 20upx;
			padding-bottom: 40upx;
			font-size: 26upx;
			.b{
				font-size: 40upx;
				font-weight: bold;
			}
		}
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 10upx;
		height: 80upx;
		line-height: 80upx;
		margin-bottom: 50upx;
		border-bottom: 1px solid rgba(255,255,255,0.6);
		&:last-child{
			margin-bottom: 0;
		}
		.icon{
			width: 13px;
			height: 17px;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: #ffffff;
			width: 100%;
			padding-left: 20upx;
		}	
	}
	.link{
		display: flex;
		justify-content: space-between;
		padding: 30upx 70upx;
		color: #ffffff;
	}
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 40upx;
		background: #FFFFFF;
		color: #4E46D2;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		color: #ffffff;
		margin-top: 30rpx;
	}
	.register-section{
		font-size: $font-sm+2upx;
		color: #4E46D2;
		text-align: center;
		margin-top: 30rpx;
		text{
			margin-left: 10upx;
		}
	}
</style>
