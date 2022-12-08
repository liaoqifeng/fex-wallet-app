<template>
	<view class="popup-wrap" v-show="showPopup">
		<view class="mask"></view>
		<view class="popup">
			<view class="header little-line">
				<text class="title">{{i18n.common.verifyTitle}}</text>
				<text class="cancel" @click="close">{{i18n.common.cancel}}</text>
			</view>
			<text class="tip">{{tips[type]}}</text>
			<view class="input-wrap" v-if="type == 'mobile'">
				<input type="number" v-model="auth.code" class="input"  :placeholder="placeholders[type]"/>
				<view class="captcha" v-show="isSend">重新发送({{interval}})</view>
				<view @click="toSend" class="captcha send" v-show="!isSend">发送验证码</view>
			</view>
			<view class="input-wrap" v-if="type == 'google'">
				<input type="number" v-model="auth.code" class="input"  :placeholder="placeholders[type]"/>
			</view>
			<view class="input-wrap" v-if="type == 'password' || type == 'capitalPasswd'">
				<input type="password" v-model="auth.code" class="input"  :placeholder="placeholders[type]"/>
			</view>
			<button type="primary" :disabled="disabled" @click="submit" class="btn">{{i18n.common.ok}}</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
    export default {
        name: 'UniValidPopup',
		mixins: [commonMixin],
        props: {
        	// 开启动画
        	animation: {
        		type: Boolean,
        		default: true
        	},
        	// 弹出层类型，可选值，password: 密码验证；capitalPasswd: 资金密码; mobile：手机验证；email：邮箱验证; google: Google验证
        	type: {
        		type: String,
        		default: 'password'
        	}
        },
		data(){
			return {
				showPopup: false,
				disabled: false,
				tips: {
					password: '验证你的登录密码',
					capitalPasswd: '验证你的资金密码',
					mobile: '验证你的短信验证码',
					email: '验证你的邮箱验证码',
					google: '验证你的Google验证码'
				},
				placeholders: {
					password: '登录密码',
					capitalPasswd: '资金密码',
					mobile: '短信验证码',
					email: '邮箱验证码',
					google: 'Google验证码'
				},
				isSend: false,
				interval: 0,
				auth: {
					code: undefined,
					token: undefined,
					type: undefined
				},
				timer: undefined
			}
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		mounted() {
			this.tips.capitalPasswd = this.i18n.accountsafe.tradepwd.title
			this.placeholders.capitalPasswd = this.i18n.accountsafe.tradepwd.title
		},
		methods:{
			...mapActions('common', ['sendSms']),
			toSend(){
				this.isSend = true
				let data = {
					type: this.$g.CAPTCHA_TYPE.COMMON,
					number: this.loginInfo.mobile
				}
				let $this = this
				this.sendSms(data).then(res => {
					this.auth.token = res.data
					var i = 120;
					this.timer = setInterval(() => {
						this.interval = i + 's'
						i = i - 1;
						if(i == 0){
							clearInterval($this.timer);
							this.isSend = false
						}
					}, 1000)
				}).catch(error => {
					this.isSend = false
				})
			},
			open(type) {
				this.disabled = false
				this.showPopup = true
				this.auth.code = undefined
				this.auth.token = undefined
				if(type){
					this.type = type
				}
				if(this.type === 'mobile'){
					this.toSend()
				}
			},
			enable() {
				this.disabled = false
			},
			close() {
				this.showPopup = false
				this.disabled = false
				this.$emit('cancel', {})
			},
			submit(){
				this.disabled = true
				if(this.timer){
					clearInterval(this.timer);
				}
				this.auth.type = this.type
				this.$emit('ok', this.auth)
			}
			
		}
    }
</script>

<style lang="scss" >
	.mask{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(105,105,105, 0.5);
		z-index: 9998;
	}
	.popup{
		position: fixed;
		max-width: 720px;
		width: 100%;
		height: 450upx;
		background-color: #ffffff;
		bottom: 0upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		padding: 0 30upx;
		font-size: $font-md;
		z-index: 9999;
		.header{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30upx 0;
			.title{
				font-size: $font-md + 4upx;
				font-weight: bold;
			}
			.cancel{
				color: $font-color-light;
			}
		}
		.tip{
			display: block;
			padding: 30upx 0;
		}
		.input-wrap{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 1upx solid #999999;
			height: 80upx;
			line-height: 80upx;
			.captcha{
				color: $font-color-light;
			}
			.send{
				color: $font-color-spec;
			}
		}
		.input{
			height: 80upx;
			line-height: 80upx;
			font-size: $font-md;
		}
		.btn{
			margin-top: 50upx;
		}
	}
</style>
