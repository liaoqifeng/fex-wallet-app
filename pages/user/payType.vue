<template>  
    <view class="container">  
		<view class="pay-group" v-for="(item, i) in list" :key="item.configPaymentInfo.code">
			<view class="header">
				<text class="title">{{ i18n.payType.options[item.configPaymentInfo.code]}}<text class="count">({{item.payInfos.length}})</text></text>
				<!-- <text class="add" @click="navTo('/pages/user/updatePayType')">添加</text> -->
			</view>
			<view v-for="(info, j) in item.payInfos" :key="info.id" class="item" :class="'item-bg-' + info.type">
				<view class="top">
					<view class="bank">{{info.bankName}}</view>
					<view class="opt">
						<switch @change="handleActive(info.id)" :checked="info.isActive == 1" style="transform:scale(0.7);" color="rgb(255, 204, 51)"/>
						<view @click="handleDelete(info.id)" class="del"><icon type="cancel" size="26" color="#ffffff"/></view>
					</view>
				</view>
				<view class="center"  @click="handleView(item, info.id)">
					<view class="name">
						<text class="a">{{info.username}}</text>
						<text class="b" v-if="item.configPaymentInfo.type == 0">{{info.accountNo | formatBankCard}}</text>
						<text class="b" v-if="item.configPaymentInfo.type != 0">{{info.accountNo}}</text>
					</view>
					<view class="qrcode" v-if="item.configPaymentInfo.type != 0">
						<image src="../../static/icon-qrcode.png"></image>
					</view>
				</view>
			</view>
			<view class="empty" v-if="item.payInfos.length <= 0">
				{{i18n.common.noData}}
			</view>
		</view>
		<u-action-sheet @click="onClickSheet" :cancel-text="i18n.common.cancel" :list="payTypeNames" v-model="showSheet"></u-action-sheet>
    </view>  
</template>  
<script>  
    import {
    	mapState,
    	mapActions
    } from 'vuex'  
	import {commonMixin} from '@/common/mixin/mixin.js'
    export default {
		mixins: [commonMixin],
		data(){
			return {
				list: [],
				payTypeNames: [],
				showSheet: false
			}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.my.payin
			})
			this.getList()
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			let $this = this;
			$this.showSheet = true
			// uni.showActionSheet({
			//     itemList: this.payTypeNames,
			//     success: function (res) {
			//         let i = res.tapIndex
			// 		uni.navigateTo({
			// 			url: "/pages/user/updatePayType?data=" + encodeURIComponent(JSON.stringify($this.list[i].configPaymentInfo))
			// 		})
			//     },
			//     fail: function (res) {
			//     }
			// });
		},
		// #endif
		filters: {
			formatBankCard(str){
			    return str.replace(/(\d{4})(?=\d)/g, '$1 ') 
			}
		},
        methods: {
			...mapActions('otc', ['payInfoList', 'activePayInfo', 'deletePayInfo']),
			getList(){
				this.payInfoList().then(res =>{
					this.list = res.data
					let arr = []
					for(let i = 0; i < this.list.length; i++){
						arr.push({text: this.i18n.payType.options[this.list[i].configPaymentInfo.code]})//this.list[i].configPaymentInfo.name
					}
					this.payTypeNames = arr
				})
			},
			onClickSheet(index){
				console.log(index)
				uni.navigateTo({
					url: "/pages/user/updatePayType?data=" + encodeURIComponent(JSON.stringify(this.list[index].configPaymentInfo))
				})
			},
			handleView(item, id){
				item.configPaymentInfo.id = id
				uni.navigateTo({
					url: "/pages/user/updatePayType?data=" + encodeURIComponent(JSON.stringify(item.configPaymentInfo))
				})
			},
			handleActive(id){
				this.activePayInfo(id).then(res =>{
					this.getList()
				}).catch(error =>{
					
				})
			},
			handleDelete(id){
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确定删除?',
				    success: function (res) {
				        if (res.confirm) {
				            $this.deletePayInfo(id).then(res =>{
				            	$this.getList()
				            }).catch(error =>{
				            	
				            })
				        }
				    }
				});
				
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.container{
		padding: 30upx 30upx;
		height: 100%;
	}
	.pay-group{
		width: 100%;
		margin-bottom: 40upx;
		.header{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.title{
				font-size: $font-md;
			}
			.count{
				margin-left: 20upx;
				font-size: $font-sm;
				color: $font-color-light;
			}
			.add{
				font-size: $font-md;
				color: $font-color-spec;
			}
		}
		.empty{
			margin: 20upx 0upx;
			width: 100%;
			height: 180upx;
			line-height: 180upx;
			background: $uni-color-subbg;
			border-radius: 20upx;
			text-align: center;
			font-size: $font-md;
		}
		.item-bg-Alipay{
			background: linear-gradient(50deg, rgba(55, 131, 217,0.7), rgba(55, 131, 217,1));
		}
		.item-bg-UnionPay{
			background: linear-gradient(50deg, rgba(255,0,0,0.7), rgba(255,0,0,1));
		}
		.item-bg-Wechat{
			background: linear-gradient(50deg, rgba(42, 189, 119,0.7), rgba(42, 189, 119,1));
		}
		.item{
			margin: 20upx 0upx;
			padding: 30upx 30upx;
			width: 100%;
			border-radius: 20upx;
			text-align: left;
			font-size: $font-md;
			display: flex;
			flex-direction: column;
			color: #fff;
			.top{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30upx;
				.opt{
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				.del{
					padding-top: 14upx;
				}
			}
			.center{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}
			.name{
				display: flex;
				flex-direction: column;
				font-size: $font-base;
				.b{
					font-size: $font-xl;
					padding-top: 10upx;
				}
			}
			.qrcode{
				background: #fff;
				padding: 10upx 10upx;
				width: 84upx;
				height: 84upx;
			}
			image{
				width: 64upx;
				height: 64upx;
			}
		}
	}
</style>