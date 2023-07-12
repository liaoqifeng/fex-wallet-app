<template>
	<view class="container">
		<view class="title">{{i18n.simpleearn.qx}}</view>
		<view class="period">
			<scroll-view class="scroll-view" scroll-x="true" >
				<view class="body">
					<view class="scroll-view-item" @click="product = item" :class="{'active': item.id == product.id}" v-for="(item, index) in products" :key="index">
						<view class="rate">{{(item.referRate * 100).toFixed(2)}}%</view>
						<view class="type">{{typeMap[item.type]}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="title">{{i18n.simpleearn.sgsl}}</view>
		<view class="buy">
			<view class="input-wrap">
				<u-input type="number" v-model="form.amount" :placeholder="`${i18nParse(i18n.simpleearn.zxsg, [product.minAmount])}`" :border="false" />
				<text @click="form.amount = Math.min(account.normalBalance, (product.totalAmount - product.buyAmount))">{{i18n.simpleearn.zd}}</text> 
			</view>
			<view class="balance">{{i18n.simpleearn.kyye}}: {{account.normalBalance}} {{product.coin}}</view>
			<view class="balance">{{i18n.simpleearn.sykt}}: {{product.totalAmount - product.buyAmount}} {{product.coin}}</view>
		</view>
		<view class="refer">
			<text class="tip">{{i18n.simpleearn.yglx}}</text>
			<text class="value">{{referAmount}} {{product.coin}}/{{i18n.common.day}}</text>
		</view>
		<view class="title">{{i18n.simpleearn.gz}}</view>
		<view class="rule">
			<u-steps :list="numList" mode="number" direction="column" :current="-1"></u-steps>
		</view>
		<view class="apply">
			<view class="prot">
				<u-checkbox v-model="checked" size="28" label-size="26">{{i18n.simpleearn.xy1}}<text class="link">{{i18n.simpleearn.xy2}}</text></u-checkbox>
			</view>
			<u-button class="submit" @click="onApply" :disabled="!checked">{{i18n.simpleearn.sg}}</u-button>
		</view>
		<uni-valid-popup ref="validPopup" @ok="ok" type="capitalPasswd"></uni-valid-popup>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin, coinMixin} from '@/common/mixin/mixin.js'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	export default {
		mixins: [commonMixin, coinMixin],
		components: {uniValidPopup},
		data() {
			return {
				numList: [{
					name: ''
				}, {
					name: ''
				}, {
					name: ''
				}, ],
				coin: '',
				products: {},
				product: {},
				typeMap: {
					0: '活期',
					1: '定期'
				},
				account: {},
				referAmount: '',
				form: {
					amount: null
				},
				checked: false
			};
		},
		onShow() {
			this.typeMap = this.i18n.simpleearn.cplx
			uni.setNavigationBarTitle({
				title: this.coin
			})
		},
		onNavigationBarButtonTap() {
			this.navTo('/pages/earn/simple/order')
		},
		onPullDownRefresh() { },
		onLoad(options) { 
			this.coin = options.coin
			this.getProductDetail()
			this.initAccount()
		},
		watch: {
			'form.amount': {
				handler(newV, oldV) {
					if(newV){
						this.referAmount = (newV * this.product.referRate / 365).toFixed(this.account.showPrecision)
					} else {
						this.referAmount = ''
					}
				},
				immediate: true,
				deep: true
			},
			product: {
				handler(newV, oldV) {
					let numList = [{
						name: this.i18n.simpleearn.sgsj + ': ' + this.i18n.simpleearn.xz
					}, {
						name: this.i18n.simpleearn.qxsj + ': ' + newV.startDate
					}]
					if(newV.type == 1){
						numList.push({
							name: this.i18n.simpleearn.jssj + ': ' + newV.endDate
						})
					}
					this.numList = numList
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			...mapActions('simpleearn', ['productDetail', 'productBuy']),
			...mapActions('account', ['getAccount']),
			getProductDetail(){
				this.productDetail(this.coin).then(res => {
					this.products = res.data
					if(this.products.length > 0){
						this.product = this.products[0]
					}
					
				})
			},
			initAccount(){
				this.getAccount(this.coin).then(res => {
					this.account = res.data
				})
			},
			onApply(){
				if(!this.form.amount){
					this.$api.msg(this.i18n.financial.inputVol)
					return;
				}
				if(this.form.amount <= 0){
					this.$api.msg(this.i18n.financial.volError)
					return;
				}
				this.$refs.validPopup.open('capitalPasswd')
			},
			ok(data){
				if(!data.code){
					this.$api.msg(this.i18n.toast.inputCapthError)
					return;
				}
				let form = {id: this.product.id, amount: this.form.amount, capitalPasswd: data.code}
				this.productBuy(form).then(res =>{
					this.initAccount()
					this.product.buyAmount = parseFloat(this.product.buyAmount) + parseFloat(this.form.amount)
					this.$refs.validPopup.close()
					this.$api.msg(this.i18n.financial.subscribeSuccess)
				}).catch(error => {
					this.$refs.validPopup.enable()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-bottom: 160rpx;
		.title{
			padding: 10rpx 30rpx;
		}
		.apply{
			position: fixed;
			background-color: #ffffff;
			bottom: 0;
			width: 100%;
			padding: 20rpx 30rpx;
			.prot{
				.link{
					color: #000000;
					text-decoration: underline;
				}
			}
			.submit{
				margin-top: 10rpx;
			}
		}
		.rule{
			padding: 0 30rpx;
		}
		.refer{
			background: #fafafa;
			padding: 20rpx 20rpx;
			border-radius: 10rpx;
			margin: 20rpx 30rpx;
			justify-content: space-between;
			display: flex;
			font-size: 26rpx;
			.tip{
				color: #8a8a8a;
			}
		}
		.buy{
			padding: 10rpx 30rpx;
			.input-wrap{
				border: 1rpx solid #dbdbdb;
				border-radius: 10rpx;
				padding: 10rpx 20rpx;
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
			}
			.balance{
				font-size: 24rpx;
				margin-bottom: 10rpx;
			}
		}
		.period{
			padding-bottom: 30rpx;
			.scroll-view{
				white-space: nowrap;
				.active{
					border: 1rpx solid #000000 !important;
				}
				.scroll-view-item{
					display: inline-block;
					width: 200rpx;
					height: 150rpx;
					border: 1rpx solid #dbdbdb;
					border-radius: 10rpx;
					margin-left: 30rpx;
					padding-top: 30rpx;
					padding-left: 20rpx;
					.rate{
						font-weight: bold;
					}
					.type{
						font-size: 25rpx;
						color: #8a8a8a;
					}
				}
				
			}
		}
	}
</style>
