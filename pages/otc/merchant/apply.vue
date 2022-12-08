<template>
	<view class="container">
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.nickname" class="cell-input" :placeholder="i18n.otc.merchant.inputName"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.mobile" class="cell-input" :placeholder="i18n.otc.merchant.inputMobile"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.email" class="cell-input" :placeholder="i18n.otc.merchant.inputEmail"/>
		</view>
		<view v-if="merchant.id != null" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.common.status}}</text>
			<text class="cell-more">{{status[merchant.status]}}</text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.merchant.margin}}</text>
			<text class="cell-more">{{merchant.margin}} {{merchant.marginCoin}}</text>
		</view>
		<view class="safe-tip">
			{{i18n.otc.merchant.tip1}}
		</view>
		<button :disabled="merchant.id != null && merchant.status != 1" class="submit" @click="submit">{{i18n.common.ok}}</button>
		
		<uni-valid-popup ref="validPopup" @ok="ok"></uni-valid-popup>
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
		components: {uniValidPopup},
		mixins: [authMixin, commonMixin],
		data() {
			return {
				merchant: {},
				form: {
					id: undefined,
					nickname: undefined,
					mobile: undefined,
					email: undefined,
					capitalPasswd: undefined
				},
				status: {
					0: '待审核',
					1: '通过',
					2: '拒绝',
					3: '退出审核',
					4: '已退出'
				}
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.otc.merchant.apply
			})
			this.status = {
					0: this.i18n.otc.merchant.status.peeding,
					1: this.i18n.otc.merchant.status.pass,
					2: this.i18n.otc.merchant.status.reject,
					3: this.i18n.otc.merchant.status.exitAudit,
					4: this.i18n.otc.merchant.status.exit
				}
		},
		onLoad() {
			this.getMerchant().then(res => {
				this.merchant = res.data
				this.form.id = this.merchant.id
				this.form.nickname = this.merchant.nickname
				this.form.mobile = this.merchant.mobile
				this.form.email = this.merchant.email
			})
		},
		methods:{
			...mapActions('otc', ['getMerchant', 'applyMerchant']),
			submit(){
				if(!this.form.nickname){
					this.$api.msg(this.i18n.otc.merchant.inputName)
					return;
				}
				if(!this.form.mobile){
					this.$api.msg(this.i18n.otc.merchant.inputMobile)
					return;
				}
				if(!this.form.email){
					this.$api.msg(this.i18n.otc.merchant.inputEmail)
					return;
				}
				this.$refs.validPopup.open('capitalPasswd')
			},
			ok(data){
				if(!data.code){
					this.$api.msg(this.i18n.toast.inputCapthError)
					return;
				}
				this.form.capitalPasswd = data.code
				this.applyMerchant(this.form).then(res =>{
					this.$refs.validPopup.close()
					this.$api.msg(this.i18n.toast.submitSuccess)
				}).catch(error => {
					this.$refs.validPopup.enable()
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
		line-height:40upx;
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
			color: $font-color-blue;
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
			display: block;
			margin-right: 0;
			padding: 2upx 40upx;
			font-size: $font-base;
			border: 1upx solid $font-color-blue;
			color: $font-color-blue;
		}
	}
	.submit{
		margin: 60upx 20upx;
		background: $uni-color-blue;
		color: #fff;
		font-size: $font-md;
	}
	.safe-tip{
		font-size: $font-sm;
		color: $font-color-blue;
		background: $uni-color-tip;
		padding: 20upx 30upx;
	}
</style>
