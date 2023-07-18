<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="s-row">
				<view class="col">
					<image :src="coin.icon" mode="widthFix" class="icon"></image>
					<text class="coin">{{coin.symbol}}</text>
				</view>
				<view class="col r light" @click="navTo('/pages/public/coinList')">
					<text class="subtitle">{{i18n.withdraw.selectCoin}}</text>
					<uni-icons type="forward" size="20" class="arrow"></uni-icons>
				</view>
			</view>
			<view class="chain" v-show="isChain">
				<view class="label">{{i18n.withdraw.chainName}}</view>
				<view class="row">
					<view @click="selectChain(item)" class="item" :class="{'selected': item.tokenBase == chain.tokenBase}" v-for="(item, i) in config.chains">{{item.chain}}</view>
				</view>
			</view>
			<view class="form">
				<text class="label">{{i18n.withdraw.withdrawwAddr}}</text>
				<view class="input little-line">
					<input type="text" v-model="form.address" :placeholder="i18n.withdraw.inputAddr" class="address" maxlength="128"/>
				</view>
				<text class="label" v-if="config.isMemo">tag/memo</text>
				<view class="input little-line" v-if="config.isMemo">
					<input type="text" v-model="form.memo" placeholder="tag/memo" class="address" maxlength="30"/>
				</view>
				<text class="label">{{i18n.withdraw.vol}}</text>
				<view class="input little-line">
					<input type="number" v-model="form.amount" :placeholder="`${i18n.withdraw.minWithdrawVol}${config.minWithdraw}`" maxlength="20" class="volume"/>
					<view class="all" @click="all">{{i18n.withdraw.all}}</view>
				</view>
				<view class="balance">{{i18n.withdraw.avalible}} {{account.normalBalance | fixD(config.showPrecision)}} {{account.symbol}}</view>
				<text class="label">{{i18n.withdraw.fee}} {{config.fee}} {{coin.symbol}}</text>
			</view>
			<button class="submit" @click="handleSubmit">{{i18n.common.ok}}</button>
			<view class="desc">
				{{i18n.withdraw.tip1}}：{{config.minWithdraw}} {{coin.symbol}} <span v-if="isChain">({{chain.chain}})</span>。<br/>
				{{i18n.withdraw.tip2}}。<br/>
				{{i18n.withdraw.tip3}}。
			</view>
		</view>
		<uni-valid-popup type="capitalPasswd" ref="validPopup" @ok="ok"></uni-valid-popup>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {uniIcons} from '@dcloudio/uni-ui'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniIcons, uniValidPopup},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				coin: {},
				account: {},
				coins: [],
				tips: {},
				config: {},
				chain: {},
				isChain: false,
				form: {
					symbol: undefined,
					amount: undefined,
					address: undefined,
					authCode: ''
				}
			};
		},
		onNavigationBarButtonTap(e) {
			this.navTo(`/pages/wallet/detail?coin=${this.coin.symbol}&filterIndex=0`);
		},
		onUnload(){
			uni.$off('selectCoin', this.selectCoin)
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.wallet.withdraw
			})
		},
		onLoad(){
			uni.$on('selectCoin', this.selectCoin)
			this.coinList().then(res =>{
				this.coins = res.data
				this.coin = res.data[0]
				
				this.loadData()
			})
		},
		methods: {
			...mapActions('common', ['coinList', 'coinTips']),
			...mapActions('account', ['getAccount']),
			...mapActions('user', ['withdraw', 'withdrawConfig']),
			//请求数据
			async loadData(){
				
				this.coinTips(this.coin.symbol).then(res =>{
					this.tips = res.data
				})
				this.withdrawConfig(this.coin.symbol).then(res =>{
					this.config = res.data
					this.isChain = (this.config.chains && this.config.chains.length > 0)
					if(this.isChain){
						this.chain = this.config.chains[0]
					}
					
					this.getAccount(this.coin.symbol).then(res =>{
						this.account = res.data
					})
				})
			},
			selectChain(item){
				this.chain = item
				this.config.fee = item.withdrawFee
				this.config.minWithdraw = item.minWithdraw
				this.form.address = undefined
				this.form.amount = undefined
			},
			selectCoin(data){
				for(let i = 0; i < this.coins.length; i++){
					let item = this.coins[i]
					if(item.symbol === data.coin.item.name){
						this.coin = item;
						break;
					}
				}
				this.loadData()
			},
			handleSubmit(){
				this.form.symbol = this.coin.symbol
				if(!this.form.symbol){
					this.$api.msg(this.i18n.withdraw.selectCoin)
					return;
				}
				if(!this.form.address){
					this.$api.msg(this.i18n.withdraw.inputAddr)
					return;
				}
				if(!this.form.amount){
					this.$api.msg(this.i18n.withdraw.inputAmount)
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
				uni.showLoading();
				this.form.chain = this.chain.tokenBase ? this.chain.tokenBase : ''
				this.withdraw(this.form).then(res =>{
					uni.hideLoading()
					this.$refs.validPopup.close()
					this.$api.msg(this.i18n.toast.withdrawSuccess, 1000, false, 'none', function() {})
				}).catch(error => {
					uni.hideLoading()
					this.$refs.validPopup.enable()
				})
			},
			all(){
				this.form.amount = this.account.normalBalance
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		
	}
	.coin-section{
		background: #fff;
		padding: $page-row-spacing;
		.chain{
			padding: 30rpx 0rpx 10rpx 0rpx;
		}
		.chain .label{
			font-size: $font-sm;
		}
		.chain .row{
			display: flex;
			padding-top: 20rpx;
			.item{
				width: 160rpx;
				height: 70rpx;
				line-height: 70rpx;
				background-color: $uni-color-subbg;
				border-radius: 10rpx;
				margin-right: 20rpx;
				text-align: center;
			}
			.selected{
				border: 1rpx solid #007AFF;
				background-color: #ffffff;
				color: #007AFF;
			}
		}
		.s-row{
			background-color: $uni-color-subbg;
			display:flex;
			align-items:center;
			padding: 20rpx 10rpx 20rpx 10rpx;
			.col{
				font-size: $font-lg;
				color: $font-color-dark;
				flex:1;
				.icon{
					width: 60rpx;
					height: 60rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}
				.coin{
					font-weight: 400;
					vertical-align: middle;
				}
				.subtitle{
					font-size: $font-sm;
					font-weight: 400;
				}
			}
			.coinLogo {
			    width: 46rpx;
				height: 46rpx;
			    margin-right: 8px;
			    display: inline-block;
			    vertical-align: middle;
			    float: left;
			}
			.light{
				font-weight: 100;
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.r{
				text-align: right;
			}
			.arrow{
				vertical-align: middle;
			}
		}
		.form{
			padding: 10rpx 0;
			display: flex;
			flex-direction: column;
			.label{
				margin-top: 30rpx;
				color: $font-color-dark;
				font-size: $font-sm;
			}
			.balance{
				margin-top: 10rpx;
				color: $font-color-light;
				font-size: $font-sm;
			}
			.address{
				width: 100%;
			}
			.volume{
				width: 400rpx;
			}
			.input{
				padding: 10rpx 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.all{
					flex: 0.5;
					text-align: right;
					font-size: $font-base;
					color: $font-color-dark;
					font-weight: bold;
				}
			}
			input{
				color: $font-color-light;
				font-size: $font-base;
			}
		}
		.desc{
			margin-top: 30rpx;
			margin-bottom: 20rpx;
			font-size: $font-base;
			color: $font-color-light;
			display: flex;
			flex-direction: column;
		}
	}
	.submit{
		margin: 60rpx 0rpx;
		background: $uni-color-blue;
		color: #fff;
		font-size: $font-md;
	}
	
</style>
