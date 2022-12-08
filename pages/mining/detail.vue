<template>
  <view class="container">
	<view class="header">
		<view class="bg"></view>
		<view class="box">
			<view class="name">{{machine.name}}</view>
			<view class="tags">
				<text class="i" v-for="(tag, i) in  splitTag(machine.tags)">{{tag}}</text>
			</view>
			<view class="profit">
				<view class="l">
					<view class="vol">{{machine.buyAmount}} <text class="unit">{{machine.buyCoin}}</text></view>
					<text>{{i18n.miner.price}}</text>
				</view>
				<view class="l">
					<view class="vol">{{machine.fee * 100}}%</view>
					<text>{{i18n.miner.glf}}</text>
				</view>
			</view>
		</view>
	</view>
	<view class="list">
		<view class="item">
			<view class="params">
				<view class="row">
					<view class="label">{{i18n.miner.power}}</view>
					<view class="val">{{machine.powerVol}}{{machine.powerUnit}}</view>
				</view>
				<view class="row">
					<view class="label">{{i18n.miner.mfjsy}}</view>
					<view class="val">{{machine.produceAmount}}{{machine.produceCoin}}</view>
				</view>
				<view class="row">
					<view class="label">{{i18n.miner.mintTime}}</view>
					<view class="val">{{machine.effectiveTime | moment('YYYY-MM-DD')}}</view>
				</view>
				<view class="row">
					<view class="label">{{i18n.miner.lifeCycle}}</view>
					<view class="val">{{machine.lifeCycle}}{{i18n.miner.day}}</view>
				</view>
				<view class="row">
					<view class="label">{{i18n.miner.buyVol}}</view>
					<view class="val">
						<u-number-box v-model="form.quantity" :min="1" :max="machine.quantity"></u-number-box>
					</view>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="tip">-- {{i18n.miner.gdxq}} --</view>
			<view class="intro">{{machine.intro ? machine.intro : ""}}</view>
		</view>
	</view>
	<view class="buy">
		<view class="price">{{i18n.miner.zj}}: <text class="b">{{machine.buyAmount * form.quantity}}</text></view>
		<view class="btn" @click="buy">{{i18n.miner.qrgm}}</view>
	</view>
  </view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
  import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
  export default {
    components: {
    },
	mixins: [commonMixin, authMixin],
    data () {
      return {
		  machine: {},
		  form: {
			  machineId: undefined,
			  quantity: 1
		  }
      }
    },
	onLoad(options) {
		this.form.machineId = options.id
		this.getMachineDetail()
	},
	onShow() {
		
	},
    methods: {
		...mapActions('mining', ['machineDetail', 'machineBuy']),
		splitTag(tags){
			if(tags){
				return JSON.parse(tags)
			}
			return []
		},
		buy(){
			let _this = this
			uni.showModal({
			    title: _this.i18n.common.tip,
			    content: _this.i18n.popup.buytext,
				cancelText: _this.i18n.common.cancel,
				confirmText: _this.i18n.common.ok,
			    success: function (res) {
			        if (res.confirm) {
			            uni.showLoading({
			            	mask: true,
			            	title: _this.i18n.common.request
			            })
			            _this.machineBuy(_this.form).then(res =>{
			            	_this.$api.msg(_this.i18n.toast.buySuccess)
			            	uni.hideLoading()
			            }).catch(error => {
			            	uni.hideLoading()
			            })
			        } else if (res.cancel) {
			        }
			    }
			});
		},
		getMachineDetail(){
			this.machineDetail({id: this.form.machineId}).then(res =>{
				this.machine = res.data
				uni.hideLoading()
			}).catch(error => {
				uni.hideLoading()
			})
		},
    }
  }
</script>

<style lang="less" scoped>
	page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.container{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
	.list{
		margin-top: 100upx;
		padding: 30upx 30upx;
		.item{
			padding: 20upx 20upx ;
			background-color: #ffffff;
			border-radius: 20upx;
			margin-bottom: 30upx;
		}
		.tip{
			text-align: center;
			font-size: 26upx;
		}
		.intro{
			font-size: 24upx;
		}
		.params .row{
			padding: 20upx 0 0 0;
			display: flex;
			justify-content: space-between;
			.label{
				font-size: 26upx;
			}
			.val{
				font-weight: bold;
				padding-top: 10upx;
			}
		}
	}
	.buy{
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100upx;
		line-height: 100upx;
		background-color: #ffffff;
		padding: 0 30upx;
		.price{
			color: #1866fe;
		}
		.price .b{
			font-size: 34upx;
			font-weight: bold;
			margin-left: 10upx;
		}
		.btn{
			background-color: #1866fe;
			height: 60upx;
			line-height: 60upx;
			padding: 0 50upx;
			color: #ffffff;
			border-radius: 50upx;
			margin-top: 20upx;
		}
	}
	.header{
		position: relative;
		.bg{
			width: 100%;
			height: 230upx;
			background-color: #1866fe;
			border-bottom-left-radius: 40upx;
			border-bottom-right-radius: 40upx;
		}
		.box{
			position: absolute;
			width: 100%;
			top: 0upx;
			left: 0;
			padding: 0 30upx;
			.name{
				font-size: 40upx;
				font-weight: bold;
				color: #ffffff;
			}
			.tags .i{
				background-color: #fedcd2;
				margin-right: 10upx;
				font-size: 23upx;
				padding: 4upx 10upx;
				border-radius: 8upx;
				color: #ff6539;
			}
		}
		.profit{
			width: 100%;
			height: 200upx;
			background-color: #ffffff;
			margin-top: 30upx;
			padding-top: 50upx;
			border-radius: 20upx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			.l{
				width: 50%;
				.vol{
					padding: 10upx 0;
					font-size: 32upx;
					font-weight: bold;
					color: #ff6539;
				}
				.vol .unit{
					font-size: 24upx;
					font-weight: normal;
					margin-left: 10upx;
				}
			}
		}
	}
</style>