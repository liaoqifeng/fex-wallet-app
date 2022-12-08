<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/user/updateLoginPwd')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.accountsafe.loginpwd.title}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/user/updatePayPwd')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.accountsafe.tradepwd.title}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/user/googleSetting')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.accountsafe.googleset.title}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!--<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">手势密码</text>
			<switch color="#fa436a" @change="switchChange" />
		</view>
		<view v-show="isFingerprint" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">指纹登录</text>
			<switch color="#fa436a" @change="fingerprint" />
		</view>-->
		
		<!-- <view class="list-cell" @click="navTo('/pages/user/updateMobile')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">绑定/修改手机号码</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">{{i18n.my.exit}}</text>
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
		mixins: [authMixin, commonMixin],
		data() {
			return {
				isFingerprint: false
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.accountsafe.title
			})
		},
		onLoad() {
			// #ifdef APP-PLUS
			if(plus.fingerprint && plus.fingerprint.isSupport()) {
				this.isFingerprint = true
			}
			// #endif
		},
		methods:{
			...mapActions('user', ['logout']),
			//退出登录
			toLogout(){
				let $this = this
				uni.showModal({
				    content: $this.i18n.popup.exittext,
					cancelText: $this.i18n.popup.cancel,
					confirmText: $this.i18n.popup.confirm,
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
				    		setTimeout(()=>{
				    			$this.navTo('/pages/public/login')
				    		}, 200)
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				
				//let statusTip = e.detail.value ? '打开': '关闭';
				//this.$api.msg(`${statusTip}消息推送`);
			},
			
			fingerprint: function() {
				// #ifdef APP-PLUS
				plus.fingerprint.authenticate(function(e) {
					console.log(e)
					plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
					plus.nativeUI.alert('指纹识别成功');
				}, function(e) {
					switch (e.code) {
						case e.AUTHENTICATE_MISMATCH:
							plus.nativeUI.toast('指纹匹配失败，请重新输入');
							break;
						case e.AUTHENTICATE_OVERLIMIT:
							plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
							plus.nativeUI.alert('指纹识别失败次数超出限制，请使用其它方式进行认证');
							break;
						case e.CANCEL:
							plus.nativeUI.toast('已取消识别');
							break;
						default:
							plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
							plus.nativeUI.alert('指纹识别失败，请重试');
							break;
					}
				});
				// Android平台手动弹出等待提示框 
				if ('Android' == plus.os.name) {
					plus.nativeUI.showWaiting('指纹识别中...').onclose = function(){
						plus.fingerprint.cancel();
					}
				}
				// #endif
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
