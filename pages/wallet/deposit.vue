<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="s-row">
				<view class="col">
					<image :src="coin.icon" class="coinLogo"></image>
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
					<view @click="selectChain(item)" class="item" :class="{'selected': item.tokenBase == deposit.chain}" v-for="(item, i) in deposit.chains">{{item.chain}}</view>
				</view>
			</view>
			<view class="s-row qrcode">
				<tki-qrcode ref="qrcode" :size="400" :onval="true" cid="qrcode" :val="qrcode.val" />
				<view class="save" @click="save">{{i18n.recharge.qrcode}}</view>
				<text class="title">{{i18n.recharge.rechargeAddr}}</text>
				<text class="address">{{deposit.address}}</text>
				<view class="copy" @click="paste">{{i18n.common.copy}}</view>
			</view>
			<view class="desc">
				{{i18n.recharge.tip1}} {{isChain ? chain.chain+'_'+coin.symbol : coin.symbol}} {{i18n.recharge.tip2}}。<br/><br/>
				{{i18n.recharge.tip3}}，{{coin.depositConfirm}} {{i18n.recharge.tip4}}。<br/><br/>
				<!--{{i18n.recharge.tip5}}：{{config.minWithdraw}} {{coin.symbol}}，{{i18n.recharge.tip6}}。<br/><br/>-->
				{{i18n.recharge.tip7}}。<br/><br/>
				{{i18n.recharge.tip8}}。<br/>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {uniIcons} from '@dcloudio/uni-ui'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {tkiQrcode, uniIcons},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				coin: {},
				chain: '',
				isChain: false,
				fee: 0,
				showPrecision: 0,
				chains: [],
				account: {},
				coins: [],
				tips: {},
				deposit: {},
				qrcode: {
					val: ''
				}
			};
		},
		onUnload(){
			uni.$off('selectCoin', this.selectCoin)
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.wallet.recharge
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
		onNavigationBarButtonTap(e) {
			this.navTo(`/pages/wallet/detail?coin=${this.coin.symbol}&filterIndex=1`);
		},
		methods: {
			...mapActions('common', ['coinList', 'coinTips']),
			...mapActions('user', ['depositAddress']),
			async loadData(){
				this.depositAddress({coin: this.coin.symbol, chain: this.chain}).then(res =>{
					this.deposit = res.data
					this.isChain = (this.deposit.chains && this.deposit.chains.length > 0)
					this.qrcode.val = res.data.address
					this.$refs.qrcode & this.$refs.qrcode._makeCode()
				})
				this.coinTips(this.coin.symbol).then(res =>{
					this.tips = res.data
				})
			},
			selectChain(item){
				this.chain = item.tokenBase
				this.loadData()
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
			save(){
				this.$refs.qrcode._saveCode()
			},
			paste() {
				let $this = this
				uni.setClipboardData({
				    data: this.deposit.address,
				    success: function () {
				        $this.$api.msg($this.toast.copySuccess)
				    }
				});
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 20upx 20upx;
	}
	.coin-section{
		background: #fff;
		.chain{
			padding: 30upx 30upx 10upx 30upx;
		}
		.chain .row{
			display: flex;
			padding-top: 20upx;
			.item{
				width: 160upx;
				height: 70upx;
				line-height: 70upx;
				background-color: $uni-color-subbg;
				border-radius: 10upx;
				margin-right: 20upx;
				text-align: center;
			}
			.selected{
				border: 1upx solid #007AFF;
				background-color: #ffffff;
				color: #007AFF;
			}
		}
		.s-row{
			background-color: $uni-color-subbg;
			display:flex;
			align-items:center;
			padding: 20upx 30upx 20upx 30upx;
			.col{
				font-size: $font-lg;
				color: $font-color-dark;
				flex:1;
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
			    width: 46upx;
				height: 46upx;
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
		.qrcode{
			margin-top: 30upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 50upx 0upx;
			.img{
				width: 380upx;
				height: 380upx;
			}
			.save{
				width: 350upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: $font-base;
				color: #256AC2;
				background-color: #E9F0F8;
				border: 1px solid #BDD5E8;
				margin: 20upx 0;
			}
			.title{
				color: $font-color-light;
				font-size: $font-sm;
				margin: 20upx 0;
			}
			.address{
				display: block;
				width: 580upx;
				word-wrap: break-word;
				font-size: $font-base;
				text-align: center;
			}
			.copy{
				margin: 30upx 0 0 0;
				background-color: #E7EBEE;
				padding: 10upx 30upx;
				font-size: $font-base;
				color: $font-color-light;
			}
		}
		.desc{
			margin-top: 30upx;
			margin-bottom: 20upx;
			font-size: $font-base;
			color: $font-color-light;
			display: flex;
			flex-direction: column;
		}
	}
	
	
</style>
