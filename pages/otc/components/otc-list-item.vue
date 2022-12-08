<template>
	<view class="order-item little-line">
		<view class="row user-info" @click="navTo(`/pages/otc/business/business?merchantId=${data.uid}`)">
			<view class="name"><view class="profile">{{data.nickname | sub}}</view>{{data.nickname}}</view>
			<view class="nomarl">1091 | 99%</view>
		</view>
		<view class="row">
			<view class="nomarl">数量 {{(data.volume - data.dealVolume) | fixed(2)}} {{data.coin}}</view>
			<view class="nomarl">单价</view>
		</view>
		<view class="row">
			<view class="nomarl">限额￥{{data.minTrade}}-￥{{data.maxTrade}}</view>
			<view class="price">￥{{data.price}}</view>
		</view>
		<view class="row opt">
			<view class="pay">
				<i v-for="(t, index) in JSON.parse(data.payment)" :key="index" :class="`fexfont icon-${t}`"></i>
			</view>
			<view>
				<button class="btn buy" v-if="data.side == 'BUY'" @click="buy">购买</button>
				<button class="btn sell" v-if="data.side == 'SELL'" @click="buy">出售</button>
			</view>
		</view>
		<u-keyboard ref="uKeyboard" @confirm="priceCancel" @cancel="priceCancel" @backspace="backspace" @change="priceChange" mode="number" :mask="true" v-model="showKeyboard">
			<view class="box">
				<view class="coin">
					<view>
						<view class="name">{{sideMap[data.side]}}{{data.coin}}</view>
						<view>单价:<text class="price">￥{{data.price}}</text></view>
					</view>
					<view><image class="icon" :src="coinMap[data.coin].icon"></image></view>
				</view>
				<view class="type">
					<view @click="changeType(0)" :class="form.type == 0 ? 'active' : ''">按金额{{sideMap[data.side]}}</view>
					<view @click="changeType(1)" :class="form.type == 1 ? 'active' : ''">按数量{{sideMap[data.side]}}</view>
				</view>
				<view class="input">
					<view><input :disabled="true" readonly="true" @blur="blur" @focus="focus" class="uni-input" cursor-spacing="0" :adjust-position="false" v-model="form.volume" type="number" :placeholder="placeholder[form.type]"/></view>
					<view><text class="i cny">{{unit[form.type]}}</text> | <text @click="allBuy" class="i all">全部{{sideMap[data.side]}}</text></view>
				</view>
				<view class="limit">限额：￥{{data.minTrade}} - ￥{{data.maxTrade}}</view>
				<view class="num">交易数量：{{showVolume}} {{data.coin}}</view>
				<view class="amount">
					<view class="t-p">实付款</view>
					<view class="p">￥{{showAmount}}</view>
				</view>
				<view class="btns">
					<view @click="cancel" class="btn cancel">取消</view>
					<view @click="submit" class="btn submit">下单</view>
				</view>
			</view>
		</u-keyboard>
	</view>
</template> 

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		mixins: [commonMixin],
		components: {
			uniPopup
		},
		data() {
			return {
				bottom: 0,
				showKeyboard: false,
				form: {
					type: 0,
					side: undefined,
					volume: undefined,
					advertId: undefined
				},
				showVolume: 0,
				showAmount: 0,
				placeholder: {
					0: '请输入购买金额',
					1: '请输入购买数量'
				},
				unit: {
					0: 'CNY',
					1: this.data.coin
				},
				sideMap: {
					'BUY': '购买',
					'SELL': '出售'
				}
			}
		},
		props: {
			data: {
				type: Object,
				default: null
			}
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
		created() {
				
		},
		watch: {
			'form.volume'(v) {
				if(!v){
					return
				}
				if(this.form.type == 0){
					this.showVolume = (this.form.volume / this.data.price).toFixed(2)
					this.showAmount = this.form.volume
				} else {
					this.showVolume = this.form.volume
					this.showAmount = this.form.volume * this.data.price
				}
			}
		},
		computed: {
			...mapState('common', ['coinMap'])
		},
		methods: {
			...mapActions('otc', ['createOrder']),
			submit(){
				this.form.advertId = this.data.id
				this.form.side = this.data.side
				this.form.volume = parseFloat(this.form.volume)
				this.createOrder(this.form).then(res =>{
					this.showKeyboard = false
					//this.$api.msg('下单成功')
					uni.navigateTo({
						url: '/pages/otc/order/detail?id='+res.data
					})
					uni.$emit("refresh")
				}).catch(error =>{
					
				})
			},
			focus(e){},
			blur(){},
			buy(){
				if(this.isLogin()){
					this.showKeyboard = true
				}
			},
			priceCancel(){
				this.form.volume = undefined
			},
			priceChange(val){
				if(!this.form.volume){
					this.form.volume = val + ''
				} else {
					this.form.volume = this.form.volume + val
				}
			},
			backspace() {
				if(this.form.volume) this.form.volume = this.form.volume.substr(0, this.form.volume.length - 1);
			},
			changeType(type){
				this.form.type = type
				this.form.volume = undefined
				this.showAmount = 0
				this.showVolume = 0
			},
			allBuy(){
				if(this.form.type == 0){
					this.form.volume = (this.data.volume - this.data.dealVolume) * this.data.price
				} else {
					this.form.volume = this.data.volume - this.data.dealVolume
				}
			},
			cancel(){
				this.showKeyboard = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.order-item {
		width: 100%;
		padding: 20upx $page-row-spacing;
		.user-info{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 80upx;
			line-height: 80upx;
			.name{
				font-size: $font-md;
				font-weight: bold;
				display: flex;
				flex-direction: row;
				align-items: center;
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
				font-weight: bold;
				font-size: $font-md;
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
			}
			.buy{
				background: $uni-color-blue;
			}
			.sell{
				background: #475F78;
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
	.box{
		background: #fff;
		display: flex;
		flex-direction: column;
		height: 280px;
		padding: 30upx 30upx;
		font-size: $font-base;
		color: $font-color-light;
		.coin{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 10upx;
			.name{
				font-size: $font-lg;
				color: $font-color-base;
				padding-bottom: 10upx;
			}
			.price{
				color: $font-color-blue;
			}
			.icon{
				width: 40px;
				height: 40px;
			}
		}
		.type{
			display: flex;
			flex-direction: row;
			padding: 10upx 0;
			view{
				margin-right: 30upx;
				position: relative;
				padding: 10upx 0;
				&.active{
					color: $uni-color-blue;
					&:after{
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 100%;
						height: 0;
						border-bottom: 2px solid $uni-color-blue;
					}
				}
			}
		}
		.input{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			padding: 14upx 10upx;
			margin: 20upx 0;
			border: 1upx solid #8B9FAA;
			input{
				color: $font-color-light;
				font-size: $font-base;
			}
			.cny{
				margin-right: 20upx;
				color: $font-color-base;
			}
			.all{
				margin-left: 20upx;
				color: $font-color-blue;
			}
		}
		.amount{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 10upx 0;
			.p{
				font-size: $font-lg;
				color: $font-color-blue;
			}
		}
		.btns{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			padding: 10upx 0;
			.btn{
				display: block;
				width: 48%;
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				color: #fff;
				border-radius: 0;
				font-size: $font-base;
			}
			.cancel{
				background: #96A7BA;
			}
			.submit{
				background: $uni-color-blue;
			}
		}
	}
</style>
