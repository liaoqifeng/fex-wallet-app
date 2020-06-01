<template>
	<view>
		<view class="transfer-info">
			<view class="w-title little-line">在线{{type==0?'购买':'出售'}}</view>
			<view class="order-list">
				<empty v-if="list == null || list.length <= 0"></empty>
				<view v-for="(item, index) in list" :key="item.id" class="order-item little-line">
					<view class="row user-info">
						<view class="name"><view class="profile">{{item.nickname | sub}}</view>{{item.coin}}</view>
					</view>
					<view class="row">
						<view class="nomarl">数量 {{item.volume - item.dealVolume}} BTC</view>
						<view class="nomarl">单价</view>
					</view>
					<view class="row">
						<view class="nomarl">限额￥{{item.minTrade}}-￥{{item.maxTrade}}</view>
						<view class="price">￥{{item.price}}</view>
					</view>
					<view class="row opt">
						<view class="pay">
							<image v-for="(t, index) in JSON.parse(item.payment)" :key="index" :src="t | formatIconUrl"></image>
						</view>
						<view class="btns">
							<button v-if="item.status == 1" @click="pause(item, 0, index)" class="btn buy">开启</button>
							<button v-if="item.status == 0" @click="pause(item, 1, index)" class="btn sell">暂停</button>
							<button type="warn" class="btn" @click="close(item, index)">关闭</button>
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
	export default {
		components: {uniPopup, empty},
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
				type: Array,
				default: null
			}
		},
		methods: {
			...mapActions('otc', ['closeAdvert', 'pauseAdvert']),
			close(item, index){
				let $this = this
				uni.showModal({
				    title: '提示',
				    content: '确定关闭广告?',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({ title: '处理中...' });
							$this.closeAdvert(item.id).then(res =>{
								uni.hideLoading()
								$this.list.splice(index, 1)
								this.$api.msg('关闭广告成功')
							}).catch(error =>{
								uni.hideLoading()
								this.$api.msg('关闭广告失败')
							})
				        } else if (res.cancel) {
				        }
				    }
				});
				
			},
			pause(item, status, index){
				let $this = this
				let tip = status == 0 ? '开启' : '暂停'
				uni.showLoading({ title: '处理中...' });
				$this.pauseAdvert(item.id).then(res =>{
					uni.hideLoading()
					$this.list[index].status = status
					this.$api.msg(tip + '广告成功')
				}).catch(error =>{
					uni.hideLoading()
					this.$api.msg(tip + '广告失败')
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
