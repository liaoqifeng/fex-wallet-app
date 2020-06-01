<template>
	<view class="container">
		<view class="list-cell b-b m-t"  @click="navTo('交易密码')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">手机号</text>
			<text class="cell-more">{{loginInfo.mobile}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input class="cell-input" v-model="authCode.captchaCode" placeholder="请输入验证码"/>
			<button :class="[isDisableCode?'cell-btn btn-disabled':'cell-btn']" :disabled="isDisableCode" @click="toSendSms">{{captchaTxt}}</button>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input class="cell-input" v-model="form.newPwd" placeholder="请输入新密码"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input class="cell-input" v-model="form.againPwd" placeholder="请重新输入密码"/>
		</view>
		<view class="list-cell tip" hover-class="cell-hover" :hover-stay-time="50">
			<text>支付密码为6位数字</text>
		</view>
		<button :disabled="loading" class="submit" @click="submit">确认</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {isPayPassword} from '../../utils/validate'
	export default {
		data() {
			return {
				loading: false,
				isDisableCode: false,
				captchaTxt: '获取验证码',
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
		methods:{
			...mapActions('common', ['sendSms']),
			...mapActions('user', ['updatePayPwd']),
			toSendSms(){
				let data = {
					type: this.$g.CAPTCHA_TYPE.COMMON,
					number: this.loginInfo.mobile
				}
				this.isDisableCode = true
				this.sendSms(data).then(res => {
					this.authCode.token = res.data
					let i = 120;
					var timer = setInterval(() => {
						this.captchaTxt = i + 's'
						i = i - 1;
						if(i == 0){
							clearInterval(timer);
							this.isDisableCode = false
							this.captchaTxt = '获取验证码'
						}
					}, 1000)
				}).catch(error => {
					this.isDisableCode = false
				})
			},
			submit(){
				if(!this.authCode.captchaCode){
					this.$api.msg('请输入验证码')
					return;
				}
				if(!this.form.newPwd){
					this.$api.msg('请输入密码')
					return;
				}
				if(!isPayPassword(this.form.newPwd)){
					this.$api.msg('支付密码必须为6位数字')
					return;
				}
				if(!this.form.againPwd){
					this.$api.msg('请输入密码')
					return;
				}
				if(this.form.againPwd !== this.form.newPwd){
					this.$api.msg('两次密码输入不一致')
					return;
				}
				this.loading = true
				this.form.authCode = this.authCode.token + ":" + this.authCode.captchaCode
				console.log(this.form)
				this.updatePayPwd(this.form).then(res => {
					this.$api.msg('修改支付密码成功', 1000, false, 'none', function() {
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
