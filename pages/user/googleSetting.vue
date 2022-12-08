<template>
	<view class="container">
		<view class="row">
			<view @click="open">{{i18n.accountsafe.googleset.downloadTip}}</view>
			<button v-if="!isGoogle" class="btn" @click="navTo('/pages/user/googleBind')">{{i18n.accountsafe.googleset.bindTip}}</button>
			<button v-else class="btn" @click="unbind">{{i18n.accountsafe.googleset.unbindTip}}</button>
		</view>
		
		<uni-valid-popup ref="validPopup" @ok="ok" type="google"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin, commonMixin],
		components: {uniValidPopup},
		data() {
			return {
				form: {
					googleCode: ''
				},
				isGoogle: false
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.accountsafe.googleset.navTitle
			})
			this.load()
		},
		onLoad() {
			
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		methods:{
			...mapActions('user', ['unbindGoogle', 'getUserInfo']),
			load(){
				this.getUserInfo().then(res => {
					this.isGoogle = res.data.googleAuthStatus == 1
				})
			},
			unbind(){
				this.$refs.validPopup.open('google')
			},
			ok(data){
				if(!data.code){
					this.$api.msg(this.i18n.toast.inputGoogleCode)
					return;
				}
				this.form.googleCode = data.code
				this.unbindGoogle(this.form).then(res =>{
					this.$api.msg(this.i18n.toast.unbindGoodsSuccess)
					this.load()
					this.$refs.validPopup.close()
				}).catch(error =>{
					this.$refs.validPopup.enable()
				})
			},
			open(){
				// #ifdef H5
				window.open('https://exspot.oss-cn-hongkong.aliyuncs.com/Gen_Signature_Android2.apk', '_blank');
				// #endif
				
				// #ifdef APP-PLUS
				let port = uni.getSystemInfoSync().platform
				switch (port) {
					case 'android':
						plus.runtime.openURL('https://exspot.oss-cn-hongkong.aliyuncs.com/Gen_Signature_Android2.apk');
						break;
					case 'ios':
						plus.runtime.openURL('https://apps.apple.com/cn/app/google-authenticator/id388497605');
						break;
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
	.row{
		background: #ffffff;
		padding: 60upx 30upx;
		margin-top: 20upx;
		color: $font-color-blue;
		font-size: $font-base;
	}
	.btn{
		margin-top: 60upx;
		background-color: $uni-color-blue;
		color: #ffffff;
		font-size: $font-md;
	}
</style>
