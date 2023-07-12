<template>
	<view>
		<view class="transfer-info">
			<view class="w-title little-line">{{type==0? i18n.otc.advert.onlineBuy: i18n.otc.advert.onlineSell}}</view>
			<view class="order-list">
				<empty v-if="list == null || list.length <= 0"></empty>
				<view v-for="(item, index) in list" :key="item.id" class="order-item little-line">
					<view class="row user-info">
						<view class="name"><view class="profile">{{item.coin | sub}}</view>{{item.coin}}</view>
					</view>
					<view class="row">
						<view class="nomarl">{{i18n.otc.vol}} {{item.volume - item.dealVolume}} {{item.coin}}</view>
						<view class="nomarl">{{i18n.otc.price}}</view>
					</view>
					<view class="row">
						<view class="nomarl">{{i18n.otc.limit}}{{currencys[item.paycoin]}}{{item.minTrade}}-{{currencys[item.paycoin]}}{{item.maxTrade}}</view>
						<view class="price">{{currencys[item.paycoin]}}{{item.price}}</view>
					</view>
					<view class="row opt">
						<view class="pay">
							<view class="item" v-for="(t, index) in JSON.parse(item.payment)" :key="index">
								<text class="icon" :style="{backgroundColor: payments[t]}"></text>{{i18n.payment.method[t]}}
							</view>
						</view>
						<view class="btns">
							<button v-if="item.status == 1" @click="pause(item, 0, index)" class="btn buy">{{i18n.common.open}}</button>
							<button v-if="item.status == 0" @click="pause(item, 1, index)" class="btn sell">{{i18n.common.stop}}</button>
							<button type="warn" class="btn" @click="close(item, index)">{{i18n.common.close}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template> 

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {uniPopup} from '@dcloudio/uni-ui'
	import empty from '../../../components/empty.vue'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniPopup, empty},
		mixins: [commonMixin],
		data() {
			return {
			};
		},
		filters:{
			sub(v){
				if(v){
					return v.substring(0, 1);
				}
				return '';
			},
			formatIconUrl(v){
				return `../../../static/${v}.png`
			}
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default: null
			},
			payments: {
				type: Object,
				default: {}
			},
			currencys: {
				type: Object,
				default: {}
			}
		},
		methods: {
			...mapActions('otc', ['closeAdvert', 'pauseAdvert']),
			close(item, index){
				let $this = this
				uni.showModal({
				    title: this.i18n.popup.tips,
				    content: this.i18n.otc.advert.confirmCannel,
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({ title: this.i18n.common.request});
							$this.closeAdvert(item.id).then(res =>{
								uni.hideLoading()
								$this.list.splice(index, 1)
								this.$api.msg(this.i18n.otc.advert.cancelSuccess)
							}).catch(error =>{
								uni.hideLoading()
								this.$api.msg(this.i18n.otc.advert.cancelFail)
							})
				        } else if (res.cancel) {
				        }
				    }
				});
				
			},
			pause(item, status, index){
				let $this = this
				let tip = status == 0 ? this.i18n.common.open : this.i18n.common.stop
				uni.showLoading({ title: this.i18n.common.request });
				$this.pauseAdvert(item.id).then(res =>{
					uni.hideLoading()
					$this.list[index].status = status
					this.$api.msg($this.i18n.toast.optSuccess)
				}).catch(error =>{
					uni.hideLoading()
					this.$api.msg($this.i18n.toast.optFail)
				})
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.empty-content{
		margin-top: -150upx;
	}
	.transfer-info{
		.w-title{
			font-size: $font-md;
			font-weight: bold;
			padding: 20upx 30upx 20upx 30upx;
		}
		.order-list {
			padding-bottom: 50upx;
			.order-item {
				width: 100%;
				padding: 20upx 30upx;
				display: block;
				.user-info{
					margin: 40upx 0 20upx 0;
					height: 50upx;
					line-height: 50upx;
					.name{
						font-size: $font-md;
						font-weight: bold;
						display: flex;
						flex-direction: row;
					}
					.profile{
						width: 50upx;
						height: 50upx;
						line-height: 50upx;
						border-radius: 50%;
						text-align: center;
						background: $uni-color-blue;
						color: #fff;
						font-weight: 100;
						font-size: $font-sm;
						margin-right: 10upx;
					}
				}
				.opt{
					margin: 20upx 0;
				}
				.row{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					padding: 2upx 0;
					align-items:flex-end;
					.price{
						color: $font-color-blue;
					}
					.nomarl{
						font-size: $font-sm;
						color: $font-color-light;
					}
					.pay{
						image{
							width: 25px;
							height: 25px;
						}
						.item{
							float: left;
							margin-right: 10rpx;
							font-size: $font-sm;
							display: flex;
							align-items: center;
						}
						.icon{
							display: block;
							height: 24rpx;
							width: 6rpx;
							margin-right: 6rpx;
						}
					}
					.buy{
						background: $uni-color-blue;
					}
					.sell{
						background: #475F78;
					}
					.btns{
						width: 300upx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
					}
					.btn{
						border: 0;
						color: #fff;
						font-size: $font-sm;
						height: 60upx;
						line-height: 60upx;
						padding: 0 50upx;
					}
				}
			}
		}
	}
	
</style>
