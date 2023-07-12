<template>
	<view class="container">
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{form.coin == null ? i18n.otc.advert.coin : form.coin}}</text>
			<text class="cell-more" @click="selectCoin">{{i18n.common.select}}</text>
		</view>
		<!-- <view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{lable.paycoin == null ? '法币' : lable.paycoin}}</text>
			<text class="cell-more" @click="selectCurrency">请选择</text>
		</view> -->
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{lable.payment == null ? i18n.otc.advert.payMethod : lable.payment}}</text>
			<checkbox-group @change="selectPayment">
				<label v-for="(item, i) in payments" :key="item.code">
					<checkbox :value="item.code" style="transform:scale(0.7)" /><text class="cell-side">{{item.name}}</text>
				</label>
			</checkbox-group>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.advert.orderType}}</text>
			<radio-group name="side" @change="selectSide">
				<label>
					<radio value="BUY" :checked="form.side == 'BUY'"/><text class="cell-side">{{i18n.otc.sell}}</text>
				</label>
				<label>
					<radio value="SELL" :checked="form.side == 'SELL'"/><text class="cell-side">{{i18n.otc.buy}}</text>
				</label>
			</radio-group>
		</view>
		<view class="safe-tip">
			{{i18n.otc.advert.safeTip}}
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.price}}</text>
			<input v-model="form.price" type="number" class="cell-input" :placeholder="i18n.otc.advert.inputPrice"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.vol}}</text>
			<input v-model="form.volume" type="number" class="cell-input" :placeholder="i18n.otc.advert.inputVol"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{i18n.otc.limit}}</text>
			<view class="cell-cust">
				<input v-model="form.minTrade" type="number" class="cell-input limit-l" :placeholder="i18n.otc.advert.minAmount"/>
				<text class="gap">-</text>
				<input v-model="form.maxTrade" type="number" class="cell-input limit-r" :placeholder="i18n.otc.advert.maxAmount"/>
			</view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{form.limitTime==null ? i18n.otc.advert.overtime : form.limitTime}}</text>
			<text @click="selectlimitTime" class="cell-more">{{i18n.common.select}}</text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50">
			<textarea :placeholder="i18n.otc.advert.inputRemark" style="width: 100%; font-size: 28upx;"></textarea>
		</view>
		<button class="submit" @click="submit">{{i18n.common.ok}}</button>
		
		<uni-valid-popup ref="validPopup" @ok="ok"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniValidPopup},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				form: {
					coin: undefined,
					side: 'SELL',
					paycoin: 'CNY',
					payment: undefined,
					price: undefined,
					volume: undefined,
					minTrade: undefined,
					maxTrade: undefined,
					limitTime: undefined,
					description: undefined,
					capitalPasswd: undefined,
					endDate: undefined
				},
				lable: {
					paycoin: undefined,
					payments: []
				},
				currencys: [],
				payments: [],
				payTypes: [],
				fiatCoins: []
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.otc.advert.addAdvert
			})
		},
		onLoad(){
			this.currencyList().then(res => {
				this.currencys = res.data.currency
				//this.payments = res.data.payment
				this.getUsePayInfo().then(pay =>{
					let p = res.data.payment
					for(let i = 0; i < p.length; i++){
						if(pay.data[p[i].code]){
							this.payments.push(p[i])
						}
					}
					if(!this.payments || this.payments.length <= 0){
						this.navTo('/pages/user/payType')
						return
					}
				}).catch(error =>{
					
				})
			})
			
			this.fiatList().then(res =>{
				this.fiatCoins = res.data
			})
			
		},
		onUnload(){
			
		},
		methods:{
			...mapActions('common', ['currencyList', 'fiatList']),
			...mapActions('otc', ['addAdvert', 'getUsePayInfo']),
			submit(){
				if(!this.loginInfo.isCapitalPasswd){
					uni.showModal({
					    title: this.i18n.common.tip,
					    content: this.i18n.popup.setpaypwdtext,
						confirmText: this.i18n.common.set,
						cancelText: this.i18n.common.cancel,
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url: '/pages/user/updatePayPwd'
					            })
					        }
					    }
					});
					return
				}
				if(!this.form.coin){
					this.$api.msg(this.i18n.otc.advert.selectCoin)
					return;
				}
				if(!this.form.paycoin){
					this.$api.msg(this.i18n.otc.advert.selectFiat)
					return;
				}
				if(!this.form.payment){
					this.$api.msg(this.i18n.otc.advert.selectPayType)
					return;
				}
				if(!this.form.price){
					this.$api.msg(this.i18n.otc.advert.inputPrice)
					return;
				}
				if(!this.form.volume){
					this.$api.msg(this.i18n.otc.advert.inputVol)
					return;
				}
				if(!this.form.minTrade || !this.form.maxTrade){
					this.$api.msg(this.i18n.otc.advert.inputLimit)
					return;
				}
				if(this.form.minTrade > this.form.maxTrade){
					this.$api.msg(this.i18n.otc.advert.limitError)
					return;
				}
				if(!this.form.limitTime){
					this.$api.msg(this.i18n.otc.advert.selectOvertime)
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
				this.addAdvert(this.form).then(res =>{
					this.$refs.validPopup.close()
					this.$api.msg(this.i18n.toast.addSuccess)
					this.formReset()
				}).catch(error => {
					this.$refs.validPopup.enable()
				})
			},
			formReset(){
				this.form = {
					coin: undefined,
					side: 'SELL',
					paycoin: 'CNY',
					payment: undefined,
					price: undefined,
					volume: undefined,
					minTrade: undefined,
					maxTrade: undefined,
					limitTime: undefined,
					description: undefined,
					capitalPasswd: undefined,
					endDate: '2020-05-26 22:04:00'
				}
			},
			selectSide(e){
				this.form.side = e.target.value
			},
			selectPayment(e){
				let values = e.detail.value
				if(values != null && values.length > 0){
					this.form.payment = JSON.stringify(values)
				} else {
					this.form.payment = undefined
				}
			},
			selectCoin(){
				let $this = this
				uni.showActionSheet({
					itemList: $this.fiatCoins,
					success: function (res) {
						$this.form.coin = $this.fiatCoins[res.tapIndex]
					}
				})
			},
			selectlimitTime(){
				let form = this.form
				let array = [5, 10, 15, 20]
				uni.showActionSheet({
					itemList: array,
					success: function (res) {
						form.limitTime = array[res.tapIndex]
					}
				})
			},
			selectCurrency(){
				let array = []
				let currencyList = this.currencys
				currencyList.forEach((item, i) => {
					array.push(item.name)
				})
				let form = this.form
				let lable = this.lable
				uni.showActionSheet({
					itemList: array,
					success: function (res) {
						let d = currencyList[res.tapIndex]
						lable.paycoin = d.name
						form.paycoin = d.code
						//console.log(this.form.paycoin)
					}
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
		line-height:60upx;
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
		.cell-cust{
			width: 60%;
			height: 60upx;
			line-height: 60upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.limit-r{
				text-align: right;
				width: 150upx;
			}
			.limit-l{
				text-align: left;
				width: 150upx;
			}
		}
		.cell-side{
			font-size: $font-base;
		}
		radio{
			transform:scale(0.7);
			margin-left: 20upx;
		}
		.cell-input{
			font-size: $font-base;
			text-align: right;
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
