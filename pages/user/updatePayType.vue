<template>
	<view class="container">
		<block v-if="config.type == 0">
			<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{i18n.payType.username}}</text>
				<input v-model="form.username" class="cell-input" :placeholder="`${i18n.payType.input}${i18n.payType.username}`"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{i18n.payType.bankNo}}</text>
				<input v-model="form.accountNo" class="cell-input" :placeholder="`${i18n.payType.input}${i18n.payType.bankNo}`"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{i18n.payType.bankName}}</text>
				<input v-model="form.bankName" class="cell-input" :placeholder="`${i18n.payType.input}${i18n.payType.bankName}`"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{i18n.payType.subBranch}}</text>
				<input v-model="form.subBranch" class="cell-input" :placeholder="`${i18n.payType.input}${i18n.payType.subBranch}`"/>
			</view>
		</block>
		<block v-if="config.type == 1">
			<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{i18n.payType.username}}</text>
				<input v-model="form.username" class="cell-input" :placeholder="`${i18n.payType.input}${i18n.payType.username}`"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{i18n.payType.account}}</text>
				<input v-model="form.accountNo" class="cell-input" :placeholder="`${i18n.payType.input}${i18n.payType.account}`"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{i18n.payType.qrcode}}</text>
				<view class="placeholder" v-show="form.payQrcode != undefined">
					<image :src="form.payQrcode"></image>
				</view>
				<view class="upload" @click="handleUpload" v-show="form.payQrcode == undefined">
					<image src="../../static/icon-upload.png"></image>
					<view class="tip">
						{{i18n.payType.tip1}}
					</view>
				</view>
			</view>
		</block>
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
				config: undefined,
				form: {
					id: undefined,
					type: undefined,
					username: undefined,
					bankName: undefined,
					subBranch: undefined,
					accountNo: undefined,
					payQrcode: undefined
				}
			};
		},
		onLoad(options) {
			this.config = JSON.parse(options.data)
			uni.setNavigationBarTitle({
				title: this.config.name
			});
			if(this.config.id){
				this.getPayInfo(this.config.id).then(res =>{
					this.form = Object.assign({}, this.form, res.data)
				}).catch(error => {
				})
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.payType.options[this.config.code]
			})
		},
		methods:{
			...mapActions('otc', ['addPayInfo', 'getPayInfo', 'updatePayInfo']),
			handleUpload(){
				this.$upload(this.uploadSuccess, this.uploadProgress)
			},
			uploadSuccess(res){
				this.form.payQrcode = res.url
			},
			uploadProgress(res){
				console.log("上传进度:", res)
			},
			handleSubmit(){
				if(!this.form.username){
					this.$api.msg(this.i18n.toast.inputName)
					return;
				}
				if(!this.form.accountNo){
					if(this.config.code == 'UnionPay'){
						this.$api.msg(this.i18n.toast.inputBankNo)
					} else {
						this.$api.msg(this.i18n.toast.inputAccount)
					}
					return;
				}
				if(this.config.code == 'UnionPay' && !this.form.bankName){
					this.$api.msg(this.i18n.toast.inputBank)
					return;
				}
				if(this.config.code == 'UnionPay' && !this.form.subBranch){
					this.$api.msg(this.i18n.toast.inputSubBank)
					return;
				}
				if(this.config.code != 'UnionPay'){
					this.form.bankName = this.config.name
				}
				this.form.type = this.config.code
				if(this.config.id){
					uni.showLoading({ title: this.i18n.common.request });
					this.updatePayInfo(this.form).then(res => {
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
					this.addPayInfo(this.form).then(res => {
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
	.list-cell{
		display:flex;
		flex-direction: row;
		align-items: center;
		padding: 30upx $page-row-spacing;
		line-height:80upx;
		position:relative;
		background: #fff;
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
			width: 25%;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		.placeholder{
			display: flex;
			image{
				width: 150upx;
				height: 150upx;
			}
		}
		.upload{
			width: 75%;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: 1px dashed $border-color-dark;
			border-radius: 6upx;
			padding: 20upx 20upx;
			image{
				width: 60upx;
				height: 60upx;
			}
			.tip{
				font-size: $font-sm;
				color: $font-color-spec;
				line-height:normal;
			}
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
		.cell-input{
			font-size: $font-base;
			width: 75%;
		}
		.cell-btn{
			margin-right: 0;
			font-size: $font-base;
			border: 1upx solid $font-color-blue;
			color: $font-color-blue;
			background: #fff;
			height: 68upx;
			line-height: 68upx;
			padding: 0 10upx 0 10upx;
		}
	}
	.submit{
		margin: 60upx 20upx;
		background: $uni-color-blue;
		color: #fff;
		font-size: $font-md;
	}
</style>
