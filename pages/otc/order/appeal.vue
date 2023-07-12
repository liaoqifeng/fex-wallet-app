<template>
	<view class="container">
		<view class="amount-wrapper">
			<text class="total">{{i18n.otc.order.orderAmount}}: {{currencysMap[order.paycoin]}}{{order.totalPrice | fixed(2)}}</text>
			<view class="info">
				<view class="price">
					<view><text class="label">{{i18n.otc.price}}</text><text class="num">{{currencysMap[order.paycoin]}}{{order.price | fixed(2)}}</text></view>
					<view><text class="label">{{i18n.otc.vol}}</text><text class="num">{{order.volume | fixed(2)}} {{order.coin}}</text></view>
				</view>
				<view class="coin">
					<image :src="coinMap[order.coin] ? coinMap[order.coin].icon : ''" class="coinLogo"></image>
					<view>{{order.coin}}</view>
				</view>
			</view>
		</view>
		
		<view class="line"></view>
		<view class="transfer-info">
			<view class="list">
				<view class="item little-line">
					<view class="left">{{i18n.otc.order.orderNo}}</view>
					<view class="right">{{order.number}}</view>
				</view>
				<view class="item">
					<view class="left">{{i18n.otc.order.orderTime}}</view>
					<view class="right">{{order.ctime | moment('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
				<view class="item" v-if="order.status == 4">
					<view class="left">{{i18n.common.status}}</view>
					<view class="right">{{i18n.otc.order.appealStatus[appealDetail.status ? appealDetail.status + '' : '0']}}</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="remark">
			<u-input v-model="form.remark" type="textarea" :placeholder="i18n.otc.order.inputContent" :border="false" :height="`200`"/>
		</view>
		<view class="line"></view>
		<view class="image">
			<image v-for="(item, index) in images" :key="index" :src="item" @click="handleUpload(index)"></image>
			<image v-if="images.length < 3 && !appealDetail" @click="handleUpload()" class="plus" src="../../../static/images/otc/icon-plus.png"></image>
		</view>
		<view class="footer" v-if="!appealDetail">
			<view class="btns">
				<button @click="submit" class="pay">{{i18n.otc.order.submitAppeal}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	import {uniIcons,uniList,uniListItem} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons,uniList,uniListItem},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				id: undefined,
				order: {
					totalPrice: 0,
					number: '',
					coin:  ''
				},
				currencysMap: {},
				currencys: [],
				paymentSettingList: [],
				paymentMethodList: [],
				form: {
					orderId: undefined,
					remark: '',
					images: ''
				},
				appealDetail: {},
				images: [],
				currentIndex: undefined
			};
		},
		onShow() {
			this.$fire.$emit('refreshCoin')
			uni.setNavigationBarTitle({
				title: this.i18n.otc.order.orderAppeal
			})
		},
		onLoad(options){
			this.currencyList().then(res => {
				let currencyList = res.data.currency
				let map = {}
				for(let i = 0; i < currencyList.length; i++){
					map[currencyList[i].code] = currencyList[i].symbol
				}
				this.currencysMap = map
				this.currencys = currencyList
				
				this.id = options.id
				this.loadData();
			})
			
		},
		computed: {
			...mapState('common', ['coinMap'])
		},
		methods: {
			...mapActions('common', ['currencyList']),
			...mapActions('otc', ['getOrder', 'appealOrder', 'getAppealDetail']),
			handleUpload(index){
				this.currentIndex = index != undefined ? index : undefined
				this.$upload(this.uploadSuccess, this.uploadProgress)
			},
			uploadSuccess(res){
				if(this.currentIndex != undefined){
					this.images.splice(this.currentIndex,this.currentIndex+1, res.url)
				} else {
					this.images.push(res.url)
				}
			},
			uploadProgress(res){},
			submit(){
				if(!this.form.remark){
					this.$api.msg(this.i18n.otc.order.inputContent)
					return
				}
				this.form.images = JSON.stringify(this.images)
				if(!this.form.images){
					this.$api.msg(this.i18n.otc.order.uploadImage)
					return
				}
				this.form.orderId = this.order.id
				let _this = this
				uni.showModal({
				    title: this.i18n.common.tip,
				    content: this.i18n.popup.submittext,
					confirmText: this.i18n.common.ok,
					cancelText: this.i18n.common.cancel,
				    success: function (res) {
				        if (res.confirm) {
				            _this.appealOrder(_this.form).then(res => {
				            	_this.$api.msg(_this.i18n.toast.submitSuccess)
				            })
				        }
				    }
				});
				
			},
			async loadData(){
				this.getAppealDetail(this.id).then(res => {
					this.appealDetail = res.data
					if(this.appealDetail){
						this.form.remark = res.data.remark
						this.images = JSON.parse(res.data.images)
					}
				})
				this.getOrder(this.id).then(res =>{
					this.order = res.data.order
					this.nickname = res.data.nickname
					this.side = res.data.side
					this.merchantPays = res.data.payments
					
					for(let key in this.merchantPays){
						this.payCodes.push(key)
						this.payLabels.push(this.i18n.payment.method[key])
					}
					this.getPayInfo(this.payCodes[0])
					this.account = JSON.parse(this.merchantPays[this.currentPay.symbol])
				}).catch(error =>{
					
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 0rpx 0rpx 240rpx 0rpx;
	}
	.image{
		padding: 20rpx 30rpx;
		image{
			width: 200rpx;
			height: 200rpx;
			margin-right: 10rpx;
		}
	}
	.remark{
		padding: 20rpx 30rpx;
	}
	.amount-wrapper{
		padding: 30rpx 30rpx 30rpx 30rpx;
		.total{
			display: block;
			color: $font-color-blue;
			padding: 20rpx 0 20rpx 0;
			font-weight: bold;
			font-size: $font-lg;
		}
		.info{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.price{
				font-size: $font-base;
				view{
					padding-top: 10rpx;
					padding-bottom: 10rpx;
				}
				.label{
					color: $font-color-light;
					padding-right: 30rpx;
				}
			}
			.coin{
				font-size: $font-base;
				text-align: center;
				image{
					width: 56rpx;
					height: 56rpx;
				}
			}
		}
	}
	.transfer-info{
		padding: 0rpx 30rpx;
		.change{
			color: $font-color-blue;
		}
	}
	.list{
		.item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 0 30rpx 0;
			.left{
				font-size: $font-base;
			}
			.right{
				font-size: $font-base;
			}
			.qrcode{
				width: 160rpx;
				height: 160rpx;
			}
		}
	}
	.footer{
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		.safe-tip{
			font-size: $font-sm;
			color: $font-color-blue;
			background: $uni-color-tip;
			padding: 20rpx 30rpx;
		}
		.btns{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20rpx 30rpx;
			.cancel{
				width: 35%;
				font-size: $font-base;
			}
			.appy{
				background: $uni-color-warning !important;
				width: 35% !important;
			}
			.pay{
				width: 55%;
				border: 0px;
				border-radius: 0;
				background-color: $uni-color-blue;
				color: #ffffff;
				font-size: $font-base;
			}
		}
	}	
	
	
</style>
