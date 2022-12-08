<template>
	<view class="container">
		<view class="container__tip">
			<u-icon name="info-circle"/>
			<text>{{i18n.payment.require}}</text>
		</view>
		<view class="container__row" v-for="(item, index) in setting.fieldDetail" :key="item.symbol">
			<view class="container__row__label">
				<text class="star" v-if="item.required">*</text>
				<text>{{i18n.payment[item.field]}}</text>
			</view>
			<input v-if="item.type == 'text'" v-model="form[item.field]" maxlength="100" :placeholder="i18n.payment.toast[item.field]" class="container__row__input"/>
			<view v-if="item.type == 'qrcode'" class="container__row__upload" @click="handleUpload(item.field)">
				<image v-show="form[item.field]" :src="form[item.field]"></image>
				<image v-show="!form[item.field]" src="../../../static/images/otc/icon-plus.png"></image>
			</view>
		</view>
		
		<view class="container__tip1">
			<view>{{i18n.payment.reminder}}:</view>
			<view>{{i18n.payment.reminder1}}</view>
		</view>
		<button class="submit" @click="handleSubmit">{{i18n.common.ok}}</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex' 
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				setting: [],
				form: {},
				submitForm: {},
				uploadField: '',
				validMap: {}
			};
		},
		onLoad(options) {
			let id = options.id
			let settingId = options.settingId ? options.settingId : 1
			this.getPaymentSettingDetail(settingId).then(res => {
				
				if(id){
					this.getPaymentMethod(id).then(res =>{
						this.submitForm = Object.assign({}, this.submitForm, res.data)
						this.form = JSON.parse(this.submitForm.detail)
					}).catch(error => {
					})
				}
				
				res.data.fieldDetail = JSON.parse(res.data.fieldDetail)
				let form = {}
				let validMap = {}
				for(let i = 0; i < res.data.fieldDetail.length; i++){
					form[res.data.fieldDetail[i].field] = ''
					validMap[res.data.fieldDetail[i].field] = res.data.fieldDetail[i].required
				}
				
				this.form = form
				this.validMap = validMap
				this.setting = res.data
				
				this.submitForm.id = id
				this.submitForm.settingId = settingId
				this.submitForm.symbol = res.data.symbol
				
				uni.setNavigationBarTitle({
					title: this.i18n.payment.method[this.setting.symbol]
				});
			})
			
			
		},
		onShow() {
		},
		methods:{
			...mapActions('otc', ['getPaymentSettingDetail', 'addPaymentMethod', 'getPaymentMethod', 'updatePaymentMethod']),
			handleUpload(field){
				this.uploadField = field
				this.$upload(this.uploadSuccess, this.uploadProgress)
			},
			uploadSuccess(res){
				this.form[this.uploadField] = res.url
			},
			uploadProgress(res){
				console.log("上传进度:", res)
			},
			handleSubmit(){
				for(let key in this.form){
					if(this.validMap[key] && !this.form[key]){
						this.$api.msg(this.i18n.payment.toast[key])
						return
					}
				}
				this.submitForm.detail = JSON.stringify(this.form)
				
				if(this.submitForm.id){
					uni.showLoading({ title: this.i18n.common.request });
					this.updatePaymentMethod(this.submitForm).then(res => {
						uni.hideLoading()
						this.$api.msg(this.i18n.toast.submitSuccess, 1000, false, 'none', function() {
							setTimeout(function() {
								uni.navigateBack({})
							}, 1000)
						})
					}).catch(error => {
						uni.hideLoading()
					})
				} else {
					uni.showLoading({ title: this.i18n.common.request });
					this.addPaymentMethod(this.submitForm).then(res => {
						uni.hideLoading()
						this.$api.msg(this.i18n.toast.submitSuccess, 1000, false, 'none', function() {
							setTimeout(function() {
								uni.navigateBack({})
							}, 1000)
						})
					}).catch(error => {
						uni.hideLoading()
					})
				}
				
			}

		}
	}
</script>

<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.container{
		height: 100%;
		padding: 20rpx 20rpx;
		background-color: #ffffff;
		&__tip{
			color: #dd6161;
		}
		&__tip1{
			font-size: 20rpx;
			padding-top: 50rpx;
		}
		&__row{
			&__label{
				display: block;
				padding: 20rpx 0;
				.star{
					color: #dd6161;
					padding-right: 10rpx;
				}
			}
			&__input{
				border: 1rpx solid #cdcdcd;
				height: 68rpx;
				border-radius: 6rpx;
				padding: 0 10rpx;
				font-size: 28rpx;
			}
			&__upload{
				image{
					width: 150rpx;
					height: 150rpx;
				}
				
			}
		}
	}
	.submit{
		margin: 60upx 0upx;
		background: $uni-color-blue;
		color: #fff;
		font-size: $font-md;
	}
</style>
