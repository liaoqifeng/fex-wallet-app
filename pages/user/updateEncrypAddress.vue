<template>
	<view class="container">
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.coin" class="cell-input" placeholder="请选择币种" disabled="true" readonly="true"/>
			<text class="cell-more" @click="navTo('/pages/public/coinList')">请选择</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.address" class="cell-input" placeholder="请输入地址"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.remark" class="cell-input" placeholder="请输入地址名称"/>
		</view>
		<button class="submit" @click="handleSubmit">确认</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		components: {},
		data() {
			return {
				form: {
					coin: undefined,
					remark: undefined,
					address: undefined
				}
			};
		},
		methods:{
			...mapActions('user', ['addEncryptBook']),
			onLoad(){
				uni.$on('selectCoin', this.selectCoin)
			},
			onUnload(){
				uni.$off('selectCoin', this.selectCoin)
			},
			selectCoin(data){
				this.form.coin = data.coin.item.name
			},
			navTo(url){
				uni.navigateTo({
					url: url
				})
			},
			handleSubmit(){
				if(!this.form.coin){
					this.$api.msg('请选择币种')
					return;
				}
				if(!this.form.address){
					this.$api.msg('请输入地址')
					return;
				}
				if(!this.form.remark){
					this.$api.msg('请输入地址名称')
					return;
				}
				let data = this.form
				uni.showLoading({ title: '添加中' });
				this.addEncryptBook(data).then(res =>{
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
			color:$font-color-blue;
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
