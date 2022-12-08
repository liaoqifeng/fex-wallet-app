<template>
	<view class="container">
		<view class="base-wrapper">
			<view class="b">
				<view class="profile">{{merchant.nickname | sub}}</view>
				<view class="nr">
					<text class="name">{{merchant.nickname}}</text>
					<text class="datetime">注册时间 {{merchant.ctime | moment('YYYY-MM-DD HH:mm:ss')}}</text>
				</view>
			</view>
			<view class="t">
				<view class="item">
					<text class="label">交易次数</text>
					<text class="value">{{indicator.turnoverCount}}次</text>
				</view>
				<view class="item">
					<text class="label">信用度</text>
					<text class="value">{{indicator.creditGrade}}%</text>
				</view>
				<view class="item">
					<text class="label">总申诉</text>
					<text class="value">{{indicator.complainCount}}次</text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<!-- 列表 -->
		<business-list-item title="在线出售" :type="0" :list.sync="buyAdverts"></business-list-item>
		<view class="line"></view>
		<!-- 列表 -->
		<business-list-item title="在线购买" :type="1" :list.sync="sellAdverts"></business-list-item>
	
	</view>
	
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	import businessListItem from "../components/business-list-item.vue";
	export default {
		components: {businessListItem},
		mixins: [ commonMixin],
		data() {
			return {
				merchantId: undefined,
				merchant: {},
				indicator: {},
				buyAdverts: [],
				sellAdverts: []
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
				return `../../static/${v}.png`
			}
		},
		onLoad(options){
			console.log("options", options)
			this.merchantId = options.merchantId
			this.loadData();
		},
		methods: {
			...mapActions('otc', ['merchantDetail']),
			//请求数据
			async loadData(){
				this.merchantDetail(this.merchantId).then(res =>{
					this.merchant = res.data.merchant
					this.buyAdverts = res.data.buys
					this.sellAdverts = res.data.sells
					this.indicator = res.data.indicator
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
