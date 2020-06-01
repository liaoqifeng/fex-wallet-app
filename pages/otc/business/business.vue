<template>
	<view class="container">
		<view class="base-wrapper">
			<view class="b">
				<view class="profile">币</view>
				<view class="nr">
					<text class="name">币币1</text>
					<text class="datetime">注册时间 2019-12-10</text>
				</view>
			</view>
			<view class="t">
				<view class="item">
					<text class="label">交易次数</text>
					<text class="value">1073次</text>
				</view>
				<view class="item">
					<text class="label">信用度</text>
					<text class="value">100%</text>
				</view>
				<view class="item">
					<text class="label">总申诉</text>
					<text class="value">1次</text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<!-- 列表 -->
		<business-list-item title="在线出售" type="0"></business-list-item>
		<view class="line"></view>
		<!-- 列表 -->
		<business-list-item title="在线购买" type="1"></business-list-item>
	
	</view>
	
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import businessListItem from "../components/business-list-item.vue";
	export default {
		components: {businessListItem},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
			};
		},
		onLoad(){
			this.loadData();
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			change(){
				uni.showActionSheet({
					title:'支付方式',
				    itemList: ['银行卡', '微信', '支付宝'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			//请求数据
			async loadData(){
				let list = await this.$api.json('cartList'); 
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				});
			},
			navTo(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.base-wrapper{
		padding: 30upx 30upx 30upx 30upx;
		.b{
			display: flex;
			flex-direction: row;
			.profile{
				width: 70upx;
				height: 70upx;
				line-height: 70upx;
				background-color: $font-color-blue;
				color: #ffffff;
				text-align: center;
				border-radius: 50%;
				font-size: $font-lg;
			}
			.nr{
				padding-left: 20upx;
				display: flex;
				flex-direction: column;
				.name{
					font-size: $font-md;
					font-weight: bold;
				}
				.datetime{
					font-size: $font-sm;
				}
			}
		}
		.t{
			padding-top: 40upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.item{
				display: flex;
				flex-direction: column;
				font-size: $font-base;
				text-align: center;
				.label{
					color: $font-color-light;
					padding: 10upx 0 20upx 0;
				}
			}
		}
	}
	
	
	
</style>
