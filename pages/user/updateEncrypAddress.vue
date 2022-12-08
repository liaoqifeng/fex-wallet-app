<template>
	<view class="container">
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.coin" class="cell-input" :placeholder="i18n.my.address.selectCoin" disabled="true" readonly="true"/>
			<text class="cell-more" @click="navTo('/pages/public/coinList')">{{i18n.common.select}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.address" class="cell-input" style="width: 99%;" :placeholder="i18n.my.address.inputAddr"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<input v-model="form.remark" class="cell-input" style="width: 99%;" :placeholder="i18n.my.address.inputName"/>
		</view>
		<button class="submit" @click="handleSubmit">{{i18n.common.ok}}</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {},
		mixins: [commonMixin],
		data() {
			return {
				form: {
					coin: undefined,
					remark: undefined,
					address: undefined
				}
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.my.address.addAddress
			})
		},
		onLoad(){
			uni.$on('selectCoin', this.selectCoin)
		},
		onUnload(){
			uni.$off('selectCoin', this.selectCoin)
		},
		methods:{
			...mapActions('user', ['addEncryptBook']),
			
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
					this.$api.msg(this.i18n.my.address.selectCoin)
					return;
				}
				if(!this.form.address){
					this.$api.msg(this.i18n.my.address.inputAddr)
					return;
				}
				if(!this.form.remark){
					this.$api.msg(this.i18n.my.address.inputName)
					return;
				}
				let data = this.form
				uni.showLoading({ title: this.i18n.common.request });
				this.addEncryptBook(data).then(res =>{
					uni.hideLoading()
					this.$api.msg(this.i18n.toast.addSuccess, 1000, false, 'none', function() {
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
