<template>
	<view class="container">
		<block v-if="config.type == 0">
			<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">姓名</text>
				<input v-model="form.username" class="cell-input" placeholder="请输入姓名"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">银行卡号</text>
				<input v-model="form.accountNo" class="cell-input" placeholder="请输入银行卡号"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">开户银行</text>
				<input v-model="form.bankName" class="cell-input" placeholder="请输入开户行"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">开户支行</text>
				<input v-model="form.subBranch" class="cell-input" placeholder="请输入开户支行"/>
			</view>
		</block>
		<block v-if="config.type == 1">
			<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">姓名</text>
				<input v-model="form.username" class="cell-input" placeholder="请输入姓名"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">账号</text>
				<input v-model="form.accountNo" class="cell-input" placeholder="请输入账号"/>
			</view>
			<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">二维码</text>
				<view class="upload">
					<image src="../../static/icon-upload.png"></image>
					<view class="tip">
						请上传你的收款码图片(jpg/jpeg/png格式,大小不超过2M)
					</view>
				</view>
			</view>
		</block>
		<button class="submit" @click="handleSubmit">确认</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex' 
	export default {
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
			console.log(this.config)
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
		methods:{
			...mapActions('otc', ['addPayInfo', 'getPayInfo', 'updatePayInfo']),
			handleSubmit(){
				if(!this.form.username){
					this.$api.msg('请输入姓名')
					return;
				}
				if(!this.form.accountNo){
					if(this.config.code == 'UnionPay'){
						this.$api.msg('请输入银行卡号')
					} else {
						this.$api.msg('请输入帐号')
					}
					return;
				}
				if(this.config.code == 'UnionPay' && !this.form.bankName){
					this.$api.msg('请输入开户银行')
					return;
				}
				if(this.config.code == 'UnionPay' && !this.form.subBranch){
					this.$api.msg('请输入开户支行')
					return;
				}
				if(this.config.code != 'UnionPay'){
					this.form.bankName = this.config.name
				}
				this.form.type = this.config.code
				if(this.config.id){
					uni.showLoading({ title: '修改中' });
					this.updatePayInfo(this.form).then(res => {
						uni.hideLoading()
						this.$api.msg('修改成功', 1000, false, 'none', function() {
							setTimeout(function() {
								uni.navigateBack({})
							}, 1000)
						})
					}).catch(error => {
						uni.hideLoading()
					})
				} else {
					uni.showLoading({ title: '添加中' });
					this.addPayInfo(this.form).then(res => {
						uni.hideLoading()
						this.$api.msg('添加成功', 1000, false, 'none', function() {
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
		align-items:baseline;
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
