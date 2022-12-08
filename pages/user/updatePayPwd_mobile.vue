<template>
	<view class="container">
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.accountsafe.loginpwd.mobile}}</text>
			<text class="cell-more">{{loginInfo.mobile}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input class="cell-input" v-model="authCode.captchaCode" :placeholder="i18n.accountsafe.loginpwd.validPlacehold"/>
			<view>
				<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
				<u-button @tap="getCode" class="code-btn">{{tips}}</u-button>
			</view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input class="cell-input" maxlength="6" v-model="form.newPwd" :placeholder="i18n.accountsafe.loginpwd.pwdPlacehold"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input class="cell-input" maxlength="6" v-model="form.againPwd" :placeholder="i18n.accountsafe.loginpwd.againPlacehold"/>
		</view>
		<view class="list-cell tip" hover-class="cell-hover" :hover-stay-time="50">
			<text>{{i18n.accountsafe.tradepwd.tip}}</text>
		</view>
		<button :disabled="loading" class="submit" @click="submit">{{i18n.common.ok}}</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {isPayPassword} from '../../utils/validate'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				loading: false,
				seconds: 60,
				tips: '',
				authCode: {
					captchaCode: undefined,
					token: undefined
				},
				form: {
					newPwd: undefined,
					againPwd: undefined
				}
			};
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.common.update + this.i18n.accountsafe.tradepwd.title
			})
		},
		methods:{
			...mapActions('common', ['sendSms']),
			...mapActions('user', ['updatePayPwd']),
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: this.i18n.toast.coding
					})
					let data = {
						type: this.$g.CAPTCHA_TYPE.COMMON,
						number: this.loginInfo.mobile,
						countryCode: this.loginInfo.countryCode
					}
					this.sendSms(data).then(res => {
						this.authCode.token = res.data
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast(this.i18n.toast.codeSend);
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}).catch(error => {
					})
				} else {
				}
			},
			end() {},
			start() {},
			submit(){
				if(!this.authCode.captchaCode){
					this.$api.msg(this.i18n.toast.inputCode)
					return;
				}
				if(!this.form.newPwd){
					this.$api.msg(this.i18n.toast.inputPwd)
					return;
				}
				if(!isPayPassword(this.form.newPwd)){
					this.$api.msg(this.i18n.tradepwd.tip)
					return;
				}
				if(!this.form.againPwd){
					this.$api.msg(this.i18n.toast.inputPwd)
					return;
				}
				if(this.form.againPwd !== this.form.newPwd){
					this.$api.msg(this.i18n.toast.againPwdError)
					return;
				}
				this.loading = true
				this.form.authCode = this.authCode.token + ":" + this.authCode.captchaCode
				console.log(this.form)
				this.updatePayPwd(this.form).then(res => {
					this.$api.msg(this.i18n.toast.updatePwdSuccess, 1000, false, 'none', function() {
						setTimeout(function() {
							this.logining = false
							uni.navigateBack({})
						}, 1000)
					})
				}).catch(error => {
					this.loading = false
				})
			}

		}
	}
</script>

<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		flex-direction: row;
		align-items:baseline;
		padding: 30upx $page-row-spacing;
		line-height:80upx;
		position:relative;
		background: #fff;
		justify-content: space-between;
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
			font-size: $font-base;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			font-size: $font-base + 2upx;
			color: $font-color-dark;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
		.cell-input{
			font-size: $font-base;
		}
		.cell-btn{
			margin-right: 0;
			font-size: $font-base;
			border: 1upx solid $font-color-blue;
			color: $font-color-blue;
			background: #fff;
			width: 180upx;
			height: 68upx;
			line-height: 68upx;
			padding: 0 10upx 0 10upx;
		}
		.btn-disabled{
			border: 0upx;
			color: $font-color-disabled;
		}
		.code-btn{
			font-size: $font-sm;
		}
	}
	.tip{
		line-height:60upx;
		font-size: $font-sm;
		padding: 4upx $page-row-spacing;
	}
	.submit{
		margin: 60upx 20upx;
		background: $uni-color-blue;
		color: #fff;
		font-size: $font-md;
	}
</style>
