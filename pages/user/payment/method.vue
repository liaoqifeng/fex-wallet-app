<template>  
    <view class="container">
		<view class="empty" v-if="list.length <= 0">
			<u-empty :text="i18n.common.noData" mode="data" margin-top="300"></u-empty>
		</view>
		<view class="container__card" v-for="(item, index) in list" :key="index">
			<view class="container__card__header">
				<view class="container__card__header__name">
					<view class="bg" :style="{backgroundColor: settingMap[item.symbol].color}"></view>
					<text class="txt">{{i18n.payment.method[item.symbol]}}</text>
				</view>
				<view class="container__card__header__opt">
					<u-checkbox @change="handleActive(item)" v-model="item.actived" shape="circle">{{i18n.payment.active}}</u-checkbox>
					<u-icon @click="handleDelete(item.id)" color="#fa3534" name="close-circle" size="40"></u-icon>
				</view>
			</view>
			<view @click="handleView(item)" class="container__card__field" v-if="set.show" v-for="(set, i) in settingMap[item.symbol].fieldDetail" :key="`field${i}`">
				<view class="label">{{i18n.payment[set.field]}}</view>
				<view class="value">{{item.detail[set.field]}}</view>
			</view>
		</view>
		<u-action-sheet @click="onClickSheet" :cancel-text="i18n.common.cancel" :list="actionSheetList" v-model="showSheet"></u-action-sheet>
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
				settingList: [],
				actionSheetList: [],
				showSheet: false,
				checked: true,
				settingMap: {}
			}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.my.payin
			})
			this.getSetting()
			
		},
		onNavigationBarButtonTap(e) {
			let $this = this;
			$this.showSheet = true
		},
        methods: {
			...mapActions('otc', ['getPaymentSetting', 'getPaymentMethodList', 'activePaymentMethod', 'deletePaymentMethod']),
			getSetting(){
				this.getPaymentSetting().then(res =>{
					let actionSheetList = []
					let settingMap = {}
					for(let i = 0; i < res.data.length; i++){
						res.data[i].fieldDetail = JSON.parse(res.data[i].fieldDetail)
						settingMap[res.data[i].symbol] = res.data[i]
						
						actionSheetList.push({text: this.i18n.payment.method[res.data[i].symbol]})
					}
					this.actionSheetList = actionSheetList
					this.settingList = res.data
					this.settingMap = settingMap
					
					this.getList()
				})
			},
			getList(){
				this.getPaymentMethodList().then(res =>{
					for(let i = 0; i < res.data.length; i++){
						res.data[i].detail = JSON.parse(res.data[i].detail)
						res.data[i].actived = (res.data[i].active == 1)
					}
					this.list = res.data
				})
			},
			onClickSheet(index){
				console.log(index)
				uni.navigateTo({
					url: "/pages/user/payment/update?settingId="+this.settingList[index].id
				})
			},
			handleView(item){
				uni.navigateTo({
					url: `/pages/user/payment/update?settingId=${item.settingId}&id=${item.id}`
				})
			},
			handleActive(item){
				this.activePaymentMethod(item.id).then(res =>{
					this.getList()
				}).catch(error =>{
					item.actived = false
				})
			},
			handleDelete(id){
				let $this = this;
				uni.showModal({
				    title: this.i18n.popup.tips,
				    content: this.i18n.popup.deletetext,
				    success: function (res) {
				        if (res.confirm) {
				            $this.deletePaymentMethod(id).then(res =>{
				            	$this.getList()
				            }).catch(error =>{
				            })
				        }
				    }
				});
				
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.container{
		&__card{
			width: 100%;
			height: 300rpx;
			padding: 20rpx 30rpx;
			background-color: #ffffff;
			margin-top: 20rpx;
			
			&__header{
				display: flex;
				justify-content: space-between;
				align-items: center;
				&__opt{
					display: flex;
					align-items: center;
				}
				&__name{
					display: flex;
					align-items: center;
					.bg{
						width: 10rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}
				}
			}
			
			&__field{
				margin-top: 20rpx;
				.label{
					font-size: 24rpx;
					color: $font-color-light;
					padding-bottom: 10rpx;
				}
			}
		}
	}
</style>